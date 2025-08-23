import { Stack } from "expo-router";
import { MainLayout } from "~/components/main-layout";
import { Text, View, Modal, TextInput, Pressable, Alert } from "react-native";
import { useThemeColors } from "~/components/ThemeProvider";
import { Button } from "~/components/Button";
import { QuestItem } from "~/components/quest-item";
import { useMemo, useRef, useState } from "react";
import { usePlayerStore, useQuestStore } from "~/store/store";

export default function Home() {
  const colors = useThemeColors();
  const { quests, toggleQuest, addQuest, removeQuest } = useQuestStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef<TextInput>(null);

  const { name } = usePlayerStore();

  const canSubmit = useMemo(() => newTitle.trim().length > 0, [newTitle]);

  return (
    <>
      <Stack.Screen options={{ title: "Quests" }} />
      <MainLayout
        title="Questlog"
        caption={`Welcome back, ${name}.`}
        action={
          quests.length >= 1 ? (
            <Button title="+ Add Quest" onPress={() => setIsAddOpen(true)} />
          ) : null
        }
      >
        <View>
          {quests.length === 0 && (
            <View className="p-8">
              <Text
                className="font-silk text-center text-lg mt-40"
                style={{ color: colors.secondary }}
              >
                Adventure awaits.
              </Text>
              <Text
                className="font-silk text-center text-lg mb-4"
                style={{ color: colors.secondary }}
              >
                Start by adding a quest.
              </Text>
              <Button title="+ Add Quest" onPress={() => setIsAddOpen(true)} />
            </View>
          )}
          {quests.map((quest) => (
            <QuestItem
              key={quest.title}
              title={quest.title}
              isChecked={quest.isChecked}
              onChange={() => toggleQuest(quest.title)}
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
        </View>
      </MainLayout>
      <Modal
        visible={isAddOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAddOpen(false)}
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
                title="Cancel"
                onPress={() => {
                  setIsAddOpen(false);
                  setNewTitle("");
                }}
                className="flex-1"
              />
              <Button
                title="Add"
                onPress={() => {
                  if (!canSubmit) return;
                  addQuest(newTitle);
                  setNewTitle("");
                  setIsAddOpen(false);
                }}
                disabled={!canSubmit}
                className="flex-1"
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
