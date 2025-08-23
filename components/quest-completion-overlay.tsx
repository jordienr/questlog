import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useThemeColors } from "./ThemeProvider";

interface QuestCompletionOverlayProps {
  visible: boolean;
  onComplete: () => void;
  questTitle: string;
  experienceGained: number;
  didLevelUp: boolean;
  newLevel?: number;
}

export function QuestCompletionOverlay({
  visible,
  onComplete,
  questTitle,
  experienceGained,
  didLevelUp,
  newLevel,
}: QuestCompletionOverlayProps) {
  const colors = useThemeColors();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isDismissing = useRef(false);

  useEffect(() => {
    if (visible) {
      // Reset state when becoming visible
      isDismissing.current = false;
      fadeAnim.setValue(0);

      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        hideOverlay();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideOverlay = () => {
    // Prevent multiple calls
    if (isDismissing.current) return;
    isDismissing.current = true;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Use requestAnimationFrame to ensure this runs after the current render cycle
      requestAnimationFrame(() => {
        onComplete();
      });
    });
  };

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  // Don't render if invalid data
  if (!questTitle || typeof experienceGained !== "number") {
    return null;
  }

  return (
    <View
      className="absolute inset-0 z-50 justify-center items-center"
      style={{
        backgroundColor: colors.overlayBg,
      }}
      onTouchEnd={hideOverlay}
    >
      <Animated.View
        className="items-center px-8"
        style={{
          opacity: fadeAnim,
        }}
      >
        {/* Main Quest Completed Text */}
        <Text
          className="font-jac text-6xl text-center mb-4"
          style={{
            color: colors.overlayText,
          }}
        >
          Quest Completed
        </Text>

        {/* Animated Line */}
        <View
          className="h-1.5 mb-6 w-80"
          style={{
            backgroundColor: colors.overlayLine,
          }}
        />

        {/* Quest Title */}
        <Text
          className="font-silk text-2xl text-center mb-6"
          style={{
            color: colors.overlayText,
          }}
        >
          {questTitle}
        </Text>

        {/* Experience and Level Info */}
        <View className="items-center">
          <Text
            className="font-silk text-3xl text-center mb-2"
            style={{
              color: colors.overlayAccent,
              fontWeight: "bold",
            }}
          >
            +{experienceGained} XP
          </Text>

          {didLevelUp && newLevel && (
            <Text
              className="font-silk text-xl text-center"
              style={{
                color: colors.overlayAccent,
                fontWeight: "bold",
              }}
            >
              Level {newLevel} Reached
            </Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
}
