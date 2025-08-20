import { Text, View } from "react-native";
import { useThemeColors } from "./ThemeProvider";

export const EditScreenInfo = ({ path }: { path: string }) => {
  const colors = useThemeColors();
  const title = "Open up the code for this screen:";
  const description =
    "Change any of the text, save the file, and your app will automatically update.";

  return (
    <View>
      <View className="items-center mx-12">
        <Text
          style={{
            fontSize: 18,
            lineHeight: 24,
            textAlign: "center",
            color: colors.primary,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            borderRadius: 6,
            paddingHorizontal: 4,
            marginVertical: 8,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.primary }}>{path}</Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 24,
            textAlign: "center",
            color: colors.secondary,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
