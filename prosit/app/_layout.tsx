import { Stack } from "expo-router";
import "./globals.css";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="verify"
        options={{
          headerShown: false,
          title: "Verify Email",
          headerBackVisible: false, // Prevent going back without verifying
        }}
      />
    </Stack>
  );
}
