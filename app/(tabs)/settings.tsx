import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useThemeColors } from "../../components/ThemeProvider";

import { Container } from "~/components/Container";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { PixelSection } from "~/components/pixel-section";
import { PixelInput } from "~/components/pixel-input";
import { usePlayerStore } from "~/store/store";

export default function Settings() {
  const colors = useThemeColors();
  const { name, setName } = usePlayerStore();

  return (
    <Container>
      <Stack.Screen options={{ title: "Settings" }} />
      <PixelSection>
        <Text
          className="font-silk mb-4 text-xl"
          style={{ color: colors.foreground }}
        >
          Player Settings
        </Text>

        <View className="mb-6">
          <Text
            className="font-silk mb-2 text-lg"
            style={{ color: colors.foreground }}
          >
            Your Name
          </Text>
          <PixelInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-6">
          <Text
            className="font-silk mb-2 text-lg"
            style={{ color: colors.foreground }}
          >
            Theme
          </Text>
          <ThemeSwitcher />
        </View>
      </PixelSection>
    </Container>
  );
}
