import { SafeAreaView, View } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const colors = useThemeColors();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};
