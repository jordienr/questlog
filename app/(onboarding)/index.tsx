import { router } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "~/components/Button";
import { PixelInput } from "~/components/pixel-input";
import { TextBubble } from "~/components/text-bubble";
import { TheWizard } from "~/components/the-wizard";
import { useThemeColors } from "~/components/ThemeProvider";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { useGameStore } from "~/store/store";

export default function Onboarding() {
  const { setName: saveName } = useGameStore();
  const theme = useThemeColors();

  const [name, setName] = useState("");

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
        <View className="flex-row items-center justify-center">
          <TheWizard />
          <TextBubble
            text={`Greetings, traveler.
I am the Wizard.
What may I call you?`}
          />
        </View>
        <View className="py-4">
          <PixelInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Button
          fullWidth
          disabled={name.length < 2}
          title="Continue"
          onPress={() => {
            saveName(name);
            router.replace("/(tabs)");
          }}
        />
      </View>
      <View className="mt-4 items-center justify-center">
        <Text className="font-silk text-lg text-center">Theme</Text>
        <ThemeSwitcher />
      </View>
    </View>
  );
}
