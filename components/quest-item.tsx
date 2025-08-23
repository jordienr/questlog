import { Text, Animated, Dimensions, Pressable, View } from "react-native";
import { useThemeColors } from "./ThemeProvider";
import { useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = () => {
    swipeableRef.current?.close();
    onDelete();
  };

  const handlePress = () => {
    onChange(!isChecked);
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [0, 80],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={{
          transform: [{ translateX: trans }],
          width: 80,
        }}
      >
        <Pressable
          style={{
            backgroundColor: colors.error,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          onPress={handleDelete}
        >
          <Text className="font-silk text-white text-lg">Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          // Logic for right swipe if needed
        }
      }}
      enabled={!isActive}
    >
      {/* Main quest item */}
      <Pressable onLongPress={drag} onPress={handlePress}>
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
      </Pressable>
    </Swipeable>
  );
}
