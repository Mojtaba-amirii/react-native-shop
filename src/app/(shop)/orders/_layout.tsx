import { Stack } from "expo-router";

import { useOrderUpdatedSubscription } from "../../../api/subscriptions";

export default function OrdersLayout() {
  useOrderUpdatedSubscription();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
