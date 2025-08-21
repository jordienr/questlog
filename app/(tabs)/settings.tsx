import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useThemeColors } from "../../components/ThemeProvider";

import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";

export default function Settings() {
  const colors = useThemeColors();

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <Container>
        <ScreenContent path="app/(tabs)/settings.tsx" title="Settings">
          <View style={{ marginTop: 32, gap: 16 }}>
            <View
              style={{
                backgroundColor: colors.surface,
                padding: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 18,
                  fontFamily: "Silkscreen_400Regular",
                  marginBottom: 8,
                }}
              >
                Customize Your Experience 🎨
              </Text>
              <Text style={{ color: colors.secondary }}>
                Choose your preferred theme to personalize the app&apos;s
                appearance.
              </Text>
            </View>

            {/* Icon Showcase */}
            <View
              style={{
                backgroundColor: colors.surface,
                padding: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 16,
                  fontFamily: "Silkscreen_400Regular",
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                Available Icons
              </Text>
            </View>
          </View>
        </ScreenContent>

        <View style={{ marginTop: 24 }}>
          <ThemeSwitcher />
        </View>
      </Container>
    </>
  );
}
