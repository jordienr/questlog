import {
  Text,
  Animated,
  Dimensions,
  Pressable,
  PanResponder,
  View,
} from "react-native";
import { useThemeColors } from "./ThemeProvider";
import { useRef, useCallback } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -80;

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
  const translateX = useRef(new Animated.Value(0)).current;
  const deleteOpacity = useRef(new Animated.Value(0)).current;
  const isSwiped = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (isActive) return false;
        return (
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 10
        );
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          handleSwipe(gestureState.dx);
        } else {
          handleSwipe(0);
        }
      },
    }),
  ).current;

  const handleSwipe = useCallback(
    (translationX: number) => {
      if (translationX < SWIPE_THRESHOLD) {
        // Show delete button
        isSwiped.current = true;
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: -80,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(deleteOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Reset position
        isSwiped.current = false;
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(deleteOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
    [translateX, deleteOpacity],
  );

  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(deleteOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete();
    });
  };

  const handlePress = () => {
    if (isSwiped.current) {
      // If swiped, reset position
      handleSwipe(0);
    } else {
      // Otherwise, toggle quest
      onChange(!isChecked);
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
      }}
      className="flex-row items-center"
      {...panResponder.panHandlers}
    >
      {/* Main quest item */}
      <Pressable onLongPress={drag} onPress={handlePress} style={{ flex: 1 }}>
        <Animated.View
          className="flex-row items-center gap-2 p-4 flex-1"
          style={{
            backgroundColor: colors.background,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
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
        </Animated.View>
      </Pressable>

      {/* Delete button */}
      <Animated.View
        style={{
          opacity: deleteOpacity,
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          backgroundColor: colors.error,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="font-silk text-white text-lg" onPress={handleDelete}>
          Delete
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
