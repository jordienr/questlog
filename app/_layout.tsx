import "../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { useGameStore } from "~/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Silkscreen_400Regular: require("../assets/fonts/Silkscreen_400Regular.ttf"),
    Jacquard24_400Regular: require("../assets/fonts/Jacquard24_400Regular.ttf"),
  });

  const name = useGameStore((state) => state.player.name);
  const storeHydrated = useGameStore((state) => state.hydrated);

  useEffect(() => {
    if (!fontsLoaded || !storeHydrated) return;

    const hasName = typeof name === "string" && name.trim().length > 0;
    router.replace(hasName ? "/(tabs)" : "/(onboarding)");
    SplashScreen.hideAsync();
  }, [fontsLoaded, storeHydrated, name]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
