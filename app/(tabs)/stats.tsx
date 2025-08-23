import { Stack } from "expo-router";
import { Container } from "~/components/Container";
import { Text, View, ScrollView } from "react-native";
import { useGameStore } from "~/store/store";
import { useThemeColors } from "~/components/ThemeProvider";
import { PixelSection } from "~/components/pixel-section";
import { AchievementToast } from "~/components/achievement-toast";
import { useEffect, useState } from "react";

export default function Stats() {
  const {
    player,
    achievements,
    newlyUnlockedAchievements,
    clearNewlyUnlockedAchievements,
  } = useGameStore();
  const colors = useThemeColors();

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

  const unlockedAchievements = achievements.filter((a) => a.isUnlocked);
  const lockedAchievements = achievements.filter((a) => !a.isUnlocked);

  return (
    <>
      <Stack.Screen options={{ title: "Stats" }} />
      <Container>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={true}
          bounces={true}
          alwaysBounceVertical={false}
          style={{ flex: 1 }}
        >
          <Text
            className="font-jac mb-6 text-4xl"
            style={{ color: colors.foreground }}
          >
            Player Stats
          </Text>

          {/* Player Stats */}
          <View className="mb-6">
            <Text
              className="font-silk text-lg mb-3"
              style={{ color: colors.foreground }}
            >
              Player Statistics
            </Text>
            <PixelSection>
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Name
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.name || "Unnamed"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Level
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.level}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    Current XP
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.xp} / {100 * player.level}
                  </Text>
                </View>
              </View>
            </PixelSection>
          </View>

          {/* Quest Stats */}
          <View className="mb-6">
            <Text
              className="font-silk text-lg mb-3"
              style={{ color: colors.foreground }}
            >
              Quest Statistics
            </Text>
            <PixelSection>
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Total Created
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.totalQuestsCreated}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Total Completed
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.totalQuestsCompleted}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Total Deleted
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.totalQuestsDeleted}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Current Streak
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.currentStreak}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Longest Streak
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.longestStreak}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Total XP Gained
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.totalXpGained}
                  </Text>
                </View>
              </View>
            </PixelSection>
          </View>

          {/* Achievements */}
          <View className="mb-6">
            <Text
              className="font-silk text-lg mb-3"
              style={{ color: colors.foreground }}
            >
              Achievements
            </Text>
            <PixelSection>
              <View className="space-y-3">
                <View className="flex-row justify-between mb-3">
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.secondary }}
                  >
                    Progress
                  </Text>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    {player.stats.achievementsUnlocked} /{" "}
                    {player.stats.totalAchievements}
                  </Text>
                </View>

                {/* Unlocked Achievements */}
                {unlockedAchievements.length > 0 && (
                  <View className="mb-4">
                    <Text
                      className="font-silk text-sm mb-2"
                      style={{ color: colors.accent }}
                    >
                      Unlocked ({unlockedAchievements.length})
                    </Text>
                    {unlockedAchievements.map((achievement) => (
                      <View
                        key={achievement.id}
                        className="bg-green-900/20 p-3 rounded mb-2"
                      >
                        <Text
                          className="font-silk text-sm font-bold"
                          style={{ color: colors.foreground }}
                        >
                          🏆 {achievement.title}
                        </Text>
                        <Text
                          className="font-silk text-xs"
                          style={{ color: colors.secondary }}
                        >
                          {achievement.description}
                        </Text>
                        {achievement.unlockedAt && (
                          <Text
                            className="font-silk text-xs mt-1"
                            style={{ color: colors.accent }}
                          >
                            Unlocked:{" "}
                            {achievement.unlockedAt.toLocaleDateString()}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {/* Locked Achievements */}
                {lockedAchievements.length > 0 && (
                  <View>
                    <Text
                      className="font-silk text-sm mb-2"
                      style={{ color: colors.secondary }}
                    >
                      Locked ({lockedAchievements.length})
                    </Text>
                    {lockedAchievements.map((achievement) => (
                      <View
                        key={achievement.id}
                        className="bg-gray-800/20 p-3 rounded mb-2"
                      >
                        <Text
                          className="font-silk text-sm"
                          style={{ color: colors.secondary }}
                        >
                          🔒 {achievement.title}
                        </Text>
                        <Text
                          className="font-silk text-xs"
                          style={{ color: colors.secondary }}
                        >
                          {achievement.description}
                        </Text>
                        {achievement.requirements.map((req, index) => (
                          <Text
                            key={index}
                            className="font-silk text-xs mt-1"
                            style={{ color: colors.secondary }}
                          >
                            {req.current} / {req.value}{" "}
                            {req.type.replace("_", " ")}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </PixelSection>
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
    </>
  );
}
