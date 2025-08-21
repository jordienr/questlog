import { Pressable, Text } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export function QuestItem({
  title,
  isChecked,
  onChange,
}: {
  title: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}) {
  const colors = useThemeColors();

  return (
    <Pressable
      className="flex-row items-center gap-2 p-4"
      onPress={() => onChange(!isChecked)}
    >
      <Text
        className="text-lg font-bold font-silk"
        style={{
          color: colors.foreground,
          opacity: isChecked ? 0.5 : 1,
          textDecorationLine: isChecked ? "line-through" : "none",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
