import React from "react";
import { ViewStyle } from "react-native";
import { Icon } from "./Icon";
import { PixelButton } from "./PixelButton";

interface IconButtonProps {
  icon: string;
  title?: string;
  onPress: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "success"
    | "warning";
  size?: "small" | "medium" | "large";
  iconSize?: number;
  disabled?: boolean;
  style?: ViewStyle;
  iconOnly?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  title,
  onPress,
  variant = "primary",
  size = "medium",
  iconSize,
  disabled = false,
  style,
  iconOnly = false,
}) => {
  // Calculate icon size based on button size if not specified
  const getIconSize = () => {
    if (iconSize) return iconSize;
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  const finalIconSize = getIconSize();

  if (iconOnly) {
    // Icon-only button (circular/square)
    return (
      <PixelButton
        title=""
        onPress={onPress}
        variant={variant}
        size={size}
        disabled={disabled}
        style={[
          {
            width: size === "small" ? 40 : size === "large" ? 56 : 48,
            height: size === "small" ? 40 : size === "large" ? 56 : 48,
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        <Icon name={icon} size={finalIconSize} />
      </PixelButton>
    );
  }

  // Icon + text button
  return (
    <PixelButton
      title={title || ""}
      onPress={onPress}
      variant={variant}
      size={size}
      disabled={disabled}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        style,
      ]}
    >
      <Icon name={icon} size={finalIconSize} />
    </PixelButton>
  );
};
