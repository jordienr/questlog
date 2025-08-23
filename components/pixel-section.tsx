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
      style={[
        {
          backgroundColor: colors.background,
          borderWidth: 2,
          borderColor: colors.border,
          padding: 16,
          marginBottom: 8,
        },
        style,
      ]}
      className="rounded"
    >
      {children}
    </View>
  );
}
