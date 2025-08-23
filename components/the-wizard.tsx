import { View, Image } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export function TheWizard() {
  const theme = useThemeColors();

  return (
    <View
      className="items-center justify-center"
      style={{ backgroundColor: theme.accent }}
    >
      <Image
        source={require("../assets/images/the_wizard.png")}
        style={{ width: 100, height: 100 }}
        className="w-24 h-24"
      />
    </View>
  );
}
