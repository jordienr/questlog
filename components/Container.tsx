import { SafeAreaView } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export const Container = ({ children }: { children: React.ReactNode }) => {
  const colors = useThemeColors();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 24,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
};
