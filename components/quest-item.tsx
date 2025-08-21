import { Pressable, Text } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export function QuestItem({
  title,
  isChecked,
  onChange,
  onLongPress,
}: {
  title: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  onLongPress?: () => void;
}) {
  const colors = useThemeColors();

  return (
    <Pressable
      className="flex-row items-center gap-2 p-4"
      onPress={() => onChange(!isChecked)}
      onLongPress={onLongPress}
    >
      <Text
        className="font-bold font-silk mt-2 text-3xl"
        style={{ color: colors.foreground, opacity: isChecked ? 0.5 : 1 }}
      >
        {isChecked ? "◆" : "◇"}
      </Text>
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
