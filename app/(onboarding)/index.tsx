import { router } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "~/components/Button";
import { PixelInput } from "~/components/pixel-input";
import { TextBubble } from "~/components/text-bubble";
import { TheWizard } from "~/components/the-wizard";
import { useThemeColors } from "~/components/ThemeProvider";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { useGameStore } from "~/store/store";

export default function Onboarding() {
  const {
    player: { name },
    setName,
  } = useGameStore();
  const theme = useThemeColors();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: theme.background,
      }}
    >
      <View
        className="max-w-full border-2 border-dashed p-4 mx-4"
        style={{
          borderColor: theme.accent,
        }}
      >
        <View className="flex-row items-center justify-center bg-white">
          <TheWizard />
          <TextBubble
            text={`Greetings, traveler.
I am the Wizard.
How may I call you?`}
          />
        </View>
        <View className="py-4">
          <PixelInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        {name.length >= 2 && (
          <Button
            fullWidth
            title="Continue"
            onPress={() => router.push("/(tabs)")}
          />
        )}
      </View>
      <View className="mt-4 items-center justify-center">
        <Text className="font-silk text-lg text-center">Theme</Text>
        <ThemeSwitcher />
      </View>
    </View>
  );
}
