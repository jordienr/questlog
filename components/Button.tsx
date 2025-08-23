import { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useThemeColors } from "./ThemeProvider";

type ButtonProps = {
  title: string;
  fullWidth?: boolean;
  size?: "icon" | "default";
  variant?: "primary" | "secondary";
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      fullWidth,
      size = "default",
      variant = "primary",
      ...touchableProps
    },
    ref,
  ) => {
    const colors = useThemeColors();

    const variantColors = {
      primary: {
        background: colors.foreground,
        text: colors.background,
      },
      secondary: {
        background: colors.background,
        text: colors.accent,
      },
    };

    const backgroundColor = variantColors[variant].background;
    const textColor = variantColors[variant].text;

    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button}`}
      >
        <View style={{ backgroundColor }} className="h-8 w-4" />
        <View
          style={{
            backgroundColor,
            borderColor: colors.border,
          }}
          className={`h-14 min-w-8 flex flex-row items-center justify-center px-4 ${
            size === "icon" ? "px-2" : "px-6"
          } ${fullWidth ? "flex-1" : ""}`}
        >
          <Text
            className={`font-silk text-lg text-center ${
              size === "icon" ? "text-2xl" : "text-lg"
            }`}
            style={{ color: textColor }}
          >
            {title}
          </Text>
        </View>
        <View style={{ backgroundColor }} className="w-4 h-8" />
      </TouchableOpacity>
    );
  },
);

Button.displayName = "Button";

const styles = {
  button: "relative flex flex-row items-center justify-center",
  buttonText: "font-silk text-lg text-center",
};
