import { Stack } from "expo-router";
import { MainLayout } from "~/components/main-layout";
import {
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  Alert,
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
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import SwipeableItem from "react-native-swipeable-item";
import { clock } from "~/lib/clock";

export default function Home() {
  const colors = useThemeColors();
  const {
    quests,
    toggleQuest,
    addQuest,
    removeQuest,
    reorderQuests,
    player: { name, xp, level },
    setXp,
    setLevel,
    newlyUnlockedAchievements,
    clearNewlyUnlockedAchievements,
    resetHabits,
    isQuestVisibleToday,
  } = useGameStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
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
  }, [newlyUnlockedAchievements, clearNewlyUnlockedAchievements]);

  // Reset habits when component mounts (daily reset)
  useEffect(() => {
    resetHabits();
  }, [resetHabits]);

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
        <View className="flex-1">
          <View className="mx-8">
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
              <View className="mt-4">
                <Button
                  title="Add Sample Quests"
                  variant="secondary"
                  onPress={() => {
                    addQuest("Complete the tutorial");
                    addQuest("Read a book");
                    addQuest("Go for a walk");
                    addQuest("Drink water", true, [0, 1, 2, 3, 4, 5, 6]); // Daily
                    addQuest("Exercise", true, [1, 3, 5]); // Mon, Wed, Fri
                  }}
                />
              </View>
            </View>
          )}
          <View
            className="flex-1 px-6 pt-6"
            style={{
              backgroundColor: colors.background,
            }}
          >
            <DraggableFlatList
              data={quests.filter(isQuestVisibleToday)}
              onDragEnd={({ data }) => reorderQuests(data)}
              keyExtractor={(item) => item.id}
              className="h-full"
              contentContainerStyle={{ paddingBottom: 24 }}
              renderItem={({ item, drag, isActive }) => {
                return (
                  <ScaleDecorator activeScale={0.98}>
                    <SwipeableItem
                      item={item}
                      swipeEnabled={!isActive}
                      activationThreshold={8}
                      overSwipe={12}
                      swipeDamping={0.85}
                      snapPointsLeft={[80]}
                      renderUnderlayLeft={() => (
                        <Pressable
                          onPress={() =>
                            Alert.alert(
                              "Vanish quest",
                              `This will delete "${item.title}" from your questlog.`,
                              [
                                { text: "Cancel", style: "cancel" },
                                {
                                  text: "Vanish",
                                  style: "destructive",
                                  onPress: () =>
                                    removeQuest(item.id ?? item.title),
                                },
                              ],
                            )
                          }
                          className="h-full ml-auto items-center justify-center"
                          style={{ backgroundColor: colors.error, width: 80 }}
                        >
                          <Text className="font-silk text-white text-sm">
                            VANISH
                          </Text>
                        </Pressable>
                      )}
                    >
                      <QuestItem
                        title={item.title}
                        isChecked={item.isChecked}
                        isRecurring={item.type === "recurring"}
                        streak={
                          item.type === "recurring" ? item.streak : undefined
                        }
                        activeDays={
                          item.type === "recurring"
                            ? item.activeDays
                            : undefined
                        }
                        onChange={(isChecked) => {
                          const wasCompleted = item.isChecked;

                          toggleQuest(item.id ?? item.title);

                          if (!wasCompleted) {
                            const xpModifier = level > 10 ? 10 : 20;
                            const newXp = xp + xpModifier;
                            const didLevelUp = newXp >= 100;
                            const finalXp = didLevelUp ? 0 : newXp;
                            const finalLevel = didLevelUp ? level + 1 : level;

                            if (didLevelUp) {
                              setLevel(finalLevel);
                              setXp(finalXp);
                            } else {
                              setXp(finalXp);
                            }

                            setCompletionData({
                              questTitle: item.title,
                              experienceGained: xpModifier,
                              didLevelUp,
                              newLevel: didLevelUp ? finalLevel : undefined,
                              newXp: finalXp,
                            });
                            setShowCompletionOverlay(true);
                          } else {
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
                        onDelete={() => removeQuest(item.id ?? item.title)}
                        drag={drag}
                        isActive={isActive}
                      />
                    </SwipeableItem>
                  </ScaleDecorator>
                );
              }}
            />
          </View>
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
                  addQuest(
                    newTitle,
                    isRecurring,
                    isRecurring ? selectedDays : undefined,
                  );
                  setNewTitle("");
                  setIsRecurring(false);
                  setSelectedDays([]);
                  setIsAddOpen(false);
                }}
                returnKeyType="done"
              />
              <View className="flex-row items-center mt-3">
                <Pressable
                  onPress={() => setIsRecurring(!isRecurring)}
                  className="flex-row items-center"
                >
                  <View
                    className="w-5 h-5 border-2 mr-2 items-center justify-center"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: isRecurring
                        ? colors.primary
                        : "transparent",
                    }}
                  >
                    {isRecurring && (
                      <Text className="text-white text-xs">✓</Text>
                    )}
                  </View>
                  <Text
                    className="font-silk text-sm"
                    style={{ color: colors.foreground }}
                  >
                    Recurring quest (habit)
                  </Text>
                </Pressable>
              </View>

              {isRecurring && (
                <View className="mt-3">
                  <Text
                    className="font-silk text-sm mb-2"
                    style={{ color: colors.foreground }}
                  >
                    Active on:
                  </Text>
                  <View className="flex-row flex-wrap gap-1">
                    {[
                      { day: 0, label: "Sun" },
                      { day: 1, label: "Mon" },
                      { day: 2, label: "Tue" },
                      { day: 3, label: "Wed" },
                      { day: 4, label: "Thu" },
                      { day: 5, label: "Fri" },
                      { day: 6, label: "Sat" },
                    ].map(({ day, label }) => (
                      <Pressable
                        key={day}
                        onPress={() => {
                          if (selectedDays.includes(day)) {
                            setSelectedDays(
                              selectedDays.filter((d) => d !== day),
                            );
                          } else {
                            setSelectedDays([...selectedDays, day]);
                          }
                        }}
                        className={`px-3 py-2 border-2 ${
                          selectedDays.includes(day)
                            ? "border-primary"
                            : "border-border"
                        }`}
                        style={{
                          backgroundColor: selectedDays.includes(day)
                            ? colors.primary
                            : "transparent",
                        }}
                      >
                        <Text
                          className="font-silk text-xs"
                          style={{
                            color: selectedDays.includes(day)
                              ? colors.background
                              : colors.foreground,
                          }}
                        >
                          {label}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}

              <View className="flex-row gap-3 mt-4">
                <Button
                  title="Add"
                  onPress={() => {
                    if (!canSubmit) return;
                    addQuest(
                      newTitle,
                      isRecurring,
                      isRecurring ? selectedDays : undefined,
                    );
                    setNewTitle("");
                    setIsRecurring(false);
                    setSelectedDays([]);
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
                    setIsRecurring(false);
                    setSelectedDays([]);
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
