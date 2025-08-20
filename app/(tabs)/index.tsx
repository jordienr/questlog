import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useThemeColors } from "../../components/ThemeProvider";

import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";

export default function Home() {
  const colors = useThemeColors();

  return (
    <>
      <Stack.Screen options={{ title: "Questlog" }} />
      <Container>
        <ScreenContent path="app/(tabs)/index.tsx" title="Questlog">
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
                Welcome to Questlog! 🎯
              </Text>
              <Text style={{ color: colors.secondary }}>
                This is a themed adventure app. Switch themes in the Settings
                tab to see the magic!
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.accent,
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontFamily: "Silkscreen_400Regular",
                }}
              >
                Current Theme Colors
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.error,
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontFamily: "Silkscreen_400Regular",
                }}
              >
                Error State Example
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.success,
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontFamily: "Silkscreen_400Regular",
                }}
              >
                Success State Example
              </Text>
            </View>
          </View>
        </ScreenContent>

        <View style={{ marginTop: 16 }}>
          <ThemeSwitcher />
        </View>
      </Container>
    </>
  );
}
