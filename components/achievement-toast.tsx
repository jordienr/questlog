import { View, Text, Animated, Pressable } from "react-native";
import { useEffect, useRef } from "react";
import { useThemeColors } from "./ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

interface AchievementToastProps {
  achievement: {
    title: string;
    description: string;
  };
  visible: boolean;
  onHide: () => void;
}

export function AchievementToast({
  achievement,
  visible,
  onHide,
}: AchievementToastProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const isDismissing = useRef(false);

  useEffect(() => {
    if (visible) {
      // Reset state when becoming visible
      isDismissing.current = false;
      slideAnim.setValue(-100);
      opacityAnim.setValue(0);

      // Slide in from top
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    // Prevent multiple calls
    if (isDismissing.current) return;
    isDismissing.current = true;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Use requestAnimationFrame to ensure this runs after the current render cycle
      requestAnimationFrame(() => {
        onHide();
      });
    });
  };

  const handlePress = () => {
    // Navigate first, then hide toast
    router.push("/(tabs)/stats");

    // Use a small delay to ensure navigation starts before hiding
    setTimeout(() => {
      hideToast();
    }, 100);
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: insets.top,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: [{ translateY: slideAnim }],
        opacity: opacityAnim,
      }}
    >
      <Pressable
        className="mx-4 p-4 rounded-lg border-2"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.accent,
        }}
        onPress={handlePress}
      >
        <View className="flex-row items-center gap-3">
          <Text className="text-2xl">🏆</Text>
          <View className="flex-1">
            <Text
              className="font-silk text-sm font-bold"
              style={{ color: colors.foreground }}
            >
              Achievement Unlocked!
            </Text>
            <Text
              className="font-silk text-xs"
              style={{ color: colors.accent }}
            >
              {achievement.title}
            </Text>
            <Text
              className="font-silk text-xs mt-1"
              style={{ color: colors.secondary }}
            >
              {achievement.description}
            </Text>
          </View>
          <Text className="font-silk text-xs" style={{ color: colors.accent }}>
            Tap to view
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
