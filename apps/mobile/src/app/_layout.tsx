import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { UserRole } from "@food-delivery/types";
import { queryClient } from "@/api/client";
import { PopupProvider } from "@/context/popup-context";

SplashScreen.preventAutoHideAsync();


function RootNavigator() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="health" />

      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>

      <Stack.Protected guard={!!user && user?.role === UserRole.CUSTOMER}>
        <Stack.Screen name="(customer)" />
      </Stack.Protected>

      <Stack.Protected guard={!!user && user?.role === UserRole.RESTAURANT_OWNER}>
        <Stack.Screen name="(owner)" />
      </Stack.Protected>

      <Stack.Protected guard={!!user && user?.role === UserRole.DRIVER}>
        <Stack.Screen name="(driver)" />
      </Stack.Protected>
    </Stack>
  )
}

export default function TabLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PopupProvider>
          <AnimatedSplashOverlay />
          <RootNavigator />
        </PopupProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
