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
      style={[{ backgroundColor: colors.background }, style]}
      className="flex flex-row items-center justify-center border h-full"
    >
      <View
        style={{ backgroundColor: colors.background }}
        className="h-8 w-4"
      />
      <View
        style={{ backgroundColor: colors.background }}
        className="h-14 items-center justify-center"
      >
        {children}
      </View>
      <View
        style={{ backgroundColor: colors.background }}
        className="w-4 h-8"
      />
    </View>
  );
}
