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
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    const colors = useThemeColors();
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`${styles.button} ${touchableProps.className}`}
      >
        <View
          style={{ backgroundColor: colors.foreground }}
          className="h-8 w-4"
        />
        <View
          style={{ backgroundColor: colors.foreground }}
          className="h-14 w-full flex flex-row items-center justify-center"
        >
          <Text
            className={styles.buttonText}
            style={{ color: colors.background }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{ backgroundColor: colors.foreground }}
          className="w-4 h-8"
        />
      </TouchableOpacity>
    );
  },
);

Button.displayName = "Button";

const styles = {
  button: "relative flex flex-row items-center justify-center",
  buttonText: "font-silk text-lg text-center",
};
