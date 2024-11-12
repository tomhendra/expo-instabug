import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import "react-native-reanimated";
import Instabug, {
  CrashReporting,
  InvocationEvent,
  LogLevel,
  ReproStepsMode,
} from "instabug-reactnative";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  React.useEffect(() => {
    Instabug.init({
      token: "",
      invocationEvents: [
        InvocationEvent.shake,
        InvocationEvent.screenshot,
        InvocationEvent.floatingButton,
      ],
      debugLogsLevel: LogLevel.verbose,
    });
    CrashReporting.setNDKCrashesEnabled(true);

    Instabug.setReproStepsConfig({
      all: ReproStepsMode.enabled,
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
