import "../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Redirect, router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { usePlayerStore } from "~/store/store";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Silkscreen_400Regular: require("../assets/fonts/Silkscreen_400Regular.ttf"),
    Jacquard24_400Regular: require("../assets/fonts/Jacquard24_400Regular.ttf"),
  });

  const { name } = usePlayerStore();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();

      setTimeout(() => {
        if (!name || name.length === 0) {
          router.replace("/(onboarding)");
        }
      }, 1000);
    }
  }, [fontsLoaded, name]);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
