import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "../providers/auth-provider";

export default function Layout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(shop)"
            options={{ headerShown: false, title: "Shop" }}
          />
          <Stack.Screen
            name="categories"
            options={{ headerShown: false, title: "Categories" }}
          />
          <Stack.Screen
            name="product"
            options={{ headerShown: false, title: "Product" }}
          />
          <Stack.Screen
            name="cart"
            options={{ presentation: "modal", title: "Shopping Cart" }}
          />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ToastProvider>
  );
}
