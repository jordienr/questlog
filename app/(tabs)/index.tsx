import { Stack } from "expo-router";
import { MainLayout } from "~/components/main-layout";
import { Text, View } from "react-native";
import { useThemeColors } from "~/components/ThemeProvider";
import { Button } from "~/components/Button";
import { QuestItem } from "~/components/quest-item";
import { useState } from "react";

export default function Home() {
  const colors = useThemeColors();

  const [quests, setQuests] = useState<{ title: string; isChecked: boolean }[]>(
    [
      {
        title: "Go to the gym",
        isChecked: false,
      },
      {
        title: "Groceries",
        isChecked: false,
      },
    ],
  );

  return (
    <>
      <Stack.Screen options={{ title: "Questlog" }} />
      <MainLayout
        title="Questlog"
        action={<Button title="+ Add Quest" onPress={() => {}} />}
      >
        <View>
          <Text
            className="text-xl font-silk p-4"
            style={{ color: colors.foreground }}
          >
            Welcome, traveler.
          </Text>
          {quests.map((quest) => (
            <QuestItem
              key={quest.title}
              title={quest.title}
              isChecked={quest.isChecked}
              onChange={(isChecked) => {
                setQuests(
                  quests.map((q) =>
                    q.title === quest.title ? { ...q, isChecked } : q,
                  ),
                );
              }}
            />
          ))}
        </View>
      </MainLayout>
    </>
  );
}
