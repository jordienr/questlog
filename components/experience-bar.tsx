import { View, Text, Animated } from "react-native";
import { useGameStore } from "~/store/store";
import { useThemeColors } from "./ThemeProvider";
import { useEffect, useRef } from "react";

export function ExperienceBar() {
  const {
    player: { xp, level },
  } = useGameStore();
  const colors = useThemeColors();
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetWidth = (xp / (100 * level)) * 100;

    Animated.timing(animatedWidth, {
      toValue: targetWidth,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [xp, level, animatedWidth]);

  return (
    <View className="p-2">
      <Text className="font-silk text-sm" style={{ color: colors.secondary }}>
        Level {level} - {xp} / {100 * level}
      </Text>
      <View
        className="h-2 border"
        style={{
          backgroundColor: colors.background2,
          borderColor: colors.border,
        }}
      >
        <Animated.View
          className="h-2"
          style={{
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: colors.accent,
          }}
        />
      </View>
    </View>
  );
}
