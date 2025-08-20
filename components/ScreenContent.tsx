import { Text, View } from "react-native";
import { useThemeColors } from "./ThemeProvider";

import { EditScreenInfo } from "./EditScreenInfo";

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({
  title,
  path,
  children,
}: ScreenContentProps) => {
  const colors = useThemeColors();

  return (
    <View className="items-center flex-1 justify-center">
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: colors.primary,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          height: 1,
          marginVertical: 28,
          width: "80%",
          backgroundColor: colors.border,
        }}
      />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
