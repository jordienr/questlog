import { Text, TouchableHighlight, View } from "react-native";
import { useSwipeableItemParams } from "react-native-swipeable-item";
import { useThemeColors } from "./ThemeProvider";
import * as Haptics from "expo-haptics";

export function QuestItem({
  title,
  isChecked,
  isRecurring,
  streak,
  activeDays,
  onChange,
  onDelete,
  drag,
  isActive,
}: {
  title: string;
  isChecked: boolean;
  isRecurring?: boolean;
  streak?: number;
  activeDays?: number[];
  onChange: (isChecked: boolean) => void;
  onDelete: () => void;
  drag?: () => void;
  isActive?: boolean;
}) {
  const colors = useThemeColors();
  const { percentOpenLeft, percentOpenRight } = useSwipeableItemParams<any>();

  const handlePress = () => {
    const leftOpen = percentOpenLeft?.value ?? 0;
    const rightOpen = percentOpenRight?.value ?? 0;
    if (leftOpen > 0.01 || rightOpen > 0.01) return;
    onChange(!isChecked);
  };

  return (
    <TouchableHighlight
      onLongPress={() => {
        drag?.();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
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
          {isRecurring && (
            <View className="flex-row items-center mt-1">
              <Text
                className="text-xs font-silk mr-2"
                style={{ color: colors.secondary }}
              >
                🔄 Habit
              </Text>
              {activeDays && activeDays.length > 0 && (
                <Text
                  className="text-xs font-silk mr-2"
                  style={{ color: colors.secondary }}
                >
                  {activeDays.length === 7
                    ? "Daily"
                    : activeDays.length === 5 &&
                        activeDays.includes(1) &&
                        activeDays.includes(5)
                      ? "Weekdays"
                      : activeDays.length === 2 &&
                          activeDays.includes(0) &&
                          activeDays.includes(6)
                        ? "Weekends"
                        : `Days: ${activeDays.map((d) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]).join(", ")}`}
                </Text>
              )}
              {streak !== undefined && streak > 0 && (
                <Text
                  className="text-xs font-silk"
                  style={{ color: colors.primary }}
                >
                  🔥 {streak} day{streak === 1 ? "" : "s"}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}
