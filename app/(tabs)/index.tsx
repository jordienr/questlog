import { Stack } from "expo-router";
import { MainLayout } from "~/components/main-layout";
import {
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useThemeColors } from "~/components/ThemeProvider";
import { Button } from "~/components/Button";
import { QuestItem } from "~/components/quest-item";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { useGameStore } from "~/store/store";
import { ExperienceBar } from "~/components/experience-bar";
import { QuestCompletionOverlay } from "~/components/quest-completion-overlay";
import { AchievementToast } from "~/components/achievement-toast";

export default function Home() {
  const colors = useThemeColors();
  const {
    quests,
    toggleQuest,
    addQuest,
    removeQuest,
    player: { name, xp, level },
    setXp,
    setLevel,
    achievements,
    newlyUnlockedAchievements,
    clearNewlyUnlockedAchievements,
  } = useGameStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef<TextInput>(null);

  // Quest completion overlay state
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [completionData, setCompletionData] = useState<{
    questTitle: string;
    experienceGained: number;
    didLevelUp: boolean;
    newLevel?: number;
    newXp: number;
  } | null>(null);

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

  // Handle quest completion overlay dismissal
  const handleOverlayComplete = useCallback(() => {
    setShowCompletionOverlay(false);
    setCompletionData(null);
  }, []);

  const canSubmit = useMemo(() => newTitle.trim().length > 0, [newTitle]);

  return (
    <>
      <Stack.Screen options={{ title: "Quests" }} />
      <MainLayout
        title="Questlog"
        action={
          quests.length >= 1 ? (
            <Button title="+" onPress={() => setIsAddOpen(true)} size="icon" />
          ) : null
        }
      >
        <View>
          <View className="p-2">
            <ExperienceBar />
          </View>
          {quests.length === 0 && (
            <View className="p-8 mt-40">
              <Text
                className="text-xs font-silk text-center"
                style={{ color: colors.secondary }}
              >
                The Wizard says
              </Text>
              <Text
                className="font-silk text-center text-lg mb-4"
                style={{ color: colors.foreground }}
              >
                Adventure awaits, {name}.
              </Text>
              <Button title="+ Add Quest" onPress={() => setIsAddOpen(true)} />
            </View>
          )}
          <SafeAreaView
            className="p-4 pt-12 mt-2"
            style={{ backgroundColor: colors.background2 }}
          >
            <ScrollView className="">
              {quests.map((quest) => (
                <QuestItem
                  key={quest.title}
                  title={quest.title}
                  isChecked={quest.isChecked}
                  onChange={() => {
                    const wasCompleted = quest.isChecked;
                    toggleQuest(quest.title);

                    // Only show completion modal when completing a quest (not uncompleting)
                    if (!wasCompleted) {
                      const xpModifier = level > 10 ? 10 : 20;
                      const newXp = xp + xpModifier;
                      const didLevelUp = newXp >= 100;
                      const finalXp = didLevelUp ? 0 : newXp;
                      const finalLevel = didLevelUp ? level + 1 : level;

                      // Update player state
                      if (didLevelUp) {
                        setLevel(finalLevel);
                        setXp(finalXp);
                      } else {
                        setXp(finalXp);
                      }

                      // Show completion modal
                      setCompletionData({
                        questTitle: quest.title,
                        experienceGained: xpModifier,
                        didLevelUp,
                        newLevel: didLevelUp ? finalLevel : undefined,
                        newXp: finalXp,
                      });
                      setShowCompletionOverlay(true);
                    } else {
                      // Uncompleting a quest
                      const xpModifier = level > 10 ? 10 : 20;
                      const xpChange = -xpModifier;
                      const newXp = xp + xpChange;

                      if (newXp < 0 && level > 1) {
                        setLevel(level - 1);
                        setXp(100 + newXp);
                      } else if (newXp < 0) {
                        setXp(0);
                      } else {
                        setXp(newXp);
                      }
                    }
                  }}
                  onLongPress={() => {
                    Alert.alert(
                      "Delete quest",
                      `Are you sure you want to delete "${quest.title}"?`,
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => removeQuest(quest.title),
                        },
                      ],
                    );
                  }}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </MainLayout>
      <Modal
        visible={isAddOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAddOpen(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Pressable
            className="flex-1 justify-end"
            onPress={() => setIsAddOpen(false)}
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            <Pressable
              className="px-4 pt-4 pb-8"
              onPress={(e) => e.stopPropagation()}
              style={{
                backgroundColor: colors.background,
                borderTopWidth: 2,
                borderTopColor: colors.border,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            >
              <Text
                className="font-silk text-xl mb-3"
                style={{ color: colors.foreground }}
              >
                New Quest
              </Text>
              <TextInput
                ref={inputRef}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Enter quest name"
                placeholderTextColor={colors.secondary}
                className="border px-3 py-3 font-silk"
                style={{
                  borderColor: colors.border,
                  color: colors.foreground,
                  backgroundColor: colors.surface,
                  borderRadius: 8,
                }}
                autoFocus
                onSubmitEditing={() => {
                  if (!canSubmit) return;
                  addQuest(newTitle);
                  setNewTitle("");
                  setIsAddOpen(false);
                }}
                returnKeyType="done"
              />
              <View className="flex-row gap-3 mt-4">
                <Button
                  title="Add"
                  onPress={() => {
                    if (!canSubmit) return;
                    addQuest(newTitle);
                    setNewTitle("");
                    setIsAddOpen(false);
                  }}
                  disabled={!canSubmit}
                />
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => {
                    setIsAddOpen(false);
                    setNewTitle("");
                  }}
                />
              </View>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

      {/* Quest Completion Overlay */}
      {completionData && (
        <QuestCompletionOverlay
          visible={showCompletionOverlay}
          onComplete={handleOverlayComplete}
          questTitle={completionData.questTitle}
          experienceGained={completionData.experienceGained}
          didLevelUp={completionData.didLevelUp}
          newLevel={completionData.newLevel}
        />
      )}

      {/* Achievement Toast */}
      {currentAchievement && (
        <AchievementToast
          visible={showAchievementToast}
          onHide={() => setShowAchievementToast(false)}
          achievement={currentAchievement}
        />
      )}
    </>
  );
}
