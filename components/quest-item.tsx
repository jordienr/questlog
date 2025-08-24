import { Text, Pressable, View, TouchableOpacity } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export function QuestItem({
  title,
  isChecked,
  onChange,
  onDelete,
  drag,
  isActive,
}: {
  title: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  onDelete: () => void;
  drag?: () => void;
  isActive?: boolean;
}) {
  const colors = useThemeColors();

  const handlePress = () => {
    onChange(!isChecked);
  };

  return (
    <TouchableOpacity
      onLongPress={drag}
      onPress={handlePress}
      disabled={isActive}
    >
      <View
        className="flex-row items-center gap-2 p-4 flex-1"
        style={{
          backgroundColor: colors.background,
          minHeight: 60,
        }}
      >
        <Text
          className="font-bold font-silk mt-2 text-3xl"
          style={{ color: colors.foreground, opacity: isChecked ? 0.5 : 1 }}
        >
          {isChecked ? "◆" : "◇"}
        </Text>
        <View className="flex-1 justify-center">
          <Text
            className="text-lg font-bold font-silk"
            style={{
              color: colors.foreground,
              opacity: isChecked ? 0.5 : 1,
              textDecorationLine: isChecked ? "line-through" : "none",
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
