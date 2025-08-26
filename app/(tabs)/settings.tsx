import { Stack } from "expo-router";
import { View, Text, Alert, ScrollView } from "react-native";
import { useThemeColors } from "../../components/ThemeProvider";
import { useEffect, useState } from "react";

import { Container } from "~/components/Container";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";
import { PixelSection } from "~/components/pixel-section";
import { PixelInput } from "~/components/pixel-input";
import { PixelButton } from "~/components/PixelButton";
import { useGameStore } from "~/store/store";
import { AchievementToast } from "~/components/achievement-toast";
import { TextBubble } from "~/components/text-bubble";
import { TheWizard } from "~/components/the-wizard";

export default function Settings() {
  const colors = useThemeColors();
  const {
    player: { name },
    setName,
    reset,
    newlyUnlockedAchievements,
    clearNewlyUnlockedAchievements,
  } = useGameStore();

  // Achievement toast state
  const [showAchievementToast, setShowAchievementToast] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<{
    title: string;
    description: string;
  } | null>(null);

  // Check for newly unlocked achievements
  useEffect(() => {
    if (newlyUnlockedAchievements.length > 0) {
      const achievement = newlyUnlockedAchievements[0];
      setCurrentAchievement({
        title: achievement.title,
        description: achievement.description,
      });
      setShowAchievementToast(true);
      clearNewlyUnlockedAchievements();
    }
  }, [newlyUnlockedAchievements]);

  const handleResetAllData = () => {
    Alert.alert(
      "Reset All Data",
      "This will reset your player progress, quests, and all local data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Everything",
          style: "destructive",
          onPress: () => {
            reset();
            Alert.alert(
              "Data Reset",
              "All local data has been reset successfully. You may need to restart the app.",
              [{ text: "OK" }],
            );
          },
        },
      ],
    );
  };

  return (
    <Container>
      <Stack.Screen options={{ title: "Settings" }} />
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <Text
          className="font-jac mb-4 text-4xl"
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

        {/* Reset All Data Section - Available for all users */}
        <View className="mt-8 mb-6 px-4">
          <PixelButton
            title="Reset All Data"
            variant="error"
            onPress={handleResetAllData}
          />
          <Text
            className="font-silk text-xs text-center mt-2"
            style={{ color: colors.secondary }}
          >
            This will reset your player progress, quests, and all local data
          </Text>
        </View>
        <View
          className="flex-row"
          style={{
            borderColor: colors.accent,
          }}
        >
          <TheWizard />
          <TextBubble text="This is where I come to rest." />
        </View>
      </ScrollView>
      {/* Achievement Toast */}
      {currentAchievement && (
        <AchievementToast
          visible={showAchievementToast}
          onHide={() => setShowAchievementToast(false)}
          achievement={currentAchievement}
        />
      )}
    </Container>
  );
}
