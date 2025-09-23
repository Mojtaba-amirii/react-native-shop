import { PropsWithChildren, useEffect, useRef, useState } from "react";
import Constants from "expo-constants";

import { supabase } from "../lib/supabase";

// Check if running in Expo Go
const isExpoGo = Constants.executionEnvironment === "storeClient";

// Mock implementation for Expo Go
const mockNotificationProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    console.log(
      "Notifications disabled in Expo Go. Use a development build for full functionality."
    );
  }, []);

  return <>{children}</>;
};

// Real notification provider for development/production builds
const RealNotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any | undefined>(undefined);
  const notificationListener = useRef<any | null>(null);
  const responseListener = useRef<any | null>(null);

  const saveUserPushNotificationToken = async (token: string) => {
    if (!token.length) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase
      .from("users")
      .update({
        expo_notification_token: token,
      })
      .eq("id", session.user.id);
  };

  useEffect(() => {
    // Import notifications dynamically
    const setupNotifications = async () => {
      try {
        const Notifications = require("expo-notifications");
        const registerForPushNotificationsAsync =
          require("../lib/notifications").default;

        // Set notification handler
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
          }),
        });

        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token ?? "");
        await saveUserPushNotificationToken(token ?? "");

        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification: any) => {
            setNotification(notification);
          });

        responseListener.current =
          Notifications.addNotificationResponseReceivedListener(
            (response: any) => {
              console.log(response);
            }
          );
      } catch (error) {
        console.log("Error setting up notifications:", error);
      }
    };

    setupNotifications();

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return <>{children}</>;
};

// Export the appropriate provider based on environment
const NotificationProvider = isExpoGo
  ? mockNotificationProvider
  : RealNotificationProvider;

export default NotificationProvider;
