import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useThemeColors } from "./ThemeProvider";

interface PixelButtonProps {
  title: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "success"
    | "warning";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const colors = useThemeColors();

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return {
          background: colors.primary,
          text: colors.background,
          border: colors.primary,
        };
      case "secondary":
        return {
          background: colors.surface,
          text: colors.primary,
          border: colors.border,
        };
      case "accent":
        return {
          background: colors.accent,
          text: "#ffffff",
          border: colors.accent,
        };
      case "error":
        return {
          background: colors.error,
          text: "#ffffff",
          border: colors.error,
        };
      case "success":
        return {
          background: colors.success,
          text: "#ffffff",
          border: colors.success,
        };
      case "warning":
        return {
          background: colors.warning,
          text: "#ffffff",
          border: colors.warning,
        };
      default:
        return {
          background: colors.primary,
          text: colors.background,
          border: colors.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 14,
        };
      case "large":
        return {
          paddingHorizontal: 20,
          paddingVertical: 16,
          fontSize: 18,
        };
      default: // medium
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
        };
    }
  };

  const variantColors = getVariantColors();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: disabled ? colors.surface : variantColors.background,
          borderWidth: 2,
          borderColor: disabled ? colors.border : variantColors.border,
          borderRadius: 0, // Pixel art - no rounded corners
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 0,
          elevation: 3,
          // Pixel art effect with multiple borders
          borderRightWidth: 4,
          borderBottomWidth: 4,
        },
        sizeStyles,
        style,
      ]}
      activeOpacity={0.8}
    >
      <Text
        style={[
          {
            color: disabled ? colors.secondary : variantColors.text,
            fontFamily: "Silkscreen_400Regular",
            textAlign: "center",
            fontWeight: "bold",
            textShadowColor: "#000",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 0,
          },
          { fontSize: sizeStyles.fontSize },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
