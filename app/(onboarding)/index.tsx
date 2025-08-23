import { router } from "expo-router";
import { View } from "react-native";
import { PixelInput } from "~/components/pixel-input";
import { PixelButton } from "~/components/PixelButton";
import { TextBubble } from "~/components/text-bubble";
import { TheWizard } from "~/components/the-wizard";
import { useThemeColors } from "~/components/ThemeProvider";
import { usePlayerStore } from "~/store/store";

export default function Onboarding() {
  const { name, setName } = usePlayerStore();
  const theme = useThemeColors();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        backgroundColor: theme.background,
      }}
    >
      <View
        className="max-w-full border-2 border-dashed p-2 mx-4"
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
        <View className="p-2">
          <PixelInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        {name.length >= 2 && (
          <PixelButton
            title="Continue"
            onPress={() => router.push("/(tabs)")}
          />
        )}
      </View>
    </View>
  );
}
