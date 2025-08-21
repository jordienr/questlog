import { View, ViewStyle } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export function PixelSection({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const colors = useThemeColors();

  return (
    <View
      style={[{ backgroundColor: colors.foreground }, style]}
      className="flex flex-row items-center justify-center"
    >
      <View
        style={{ backgroundColor: colors.foreground }}
        className="h-8 w-4"
      />
      <View
        style={{ backgroundColor: colors.foreground }}
        className="h-14 w-full flex flex-row items-center justify-center"
      >
        {children}
      </View>
      <View
        style={{ backgroundColor: colors.foreground }}
        className="w-4 h-8"
      />
    </View>
  );
}
