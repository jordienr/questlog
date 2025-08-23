import { Text, View } from "react-native";
import { Container } from "./Container";
import { useThemeColors } from "./ThemeProvider";

export function MainLayout({
  title,
  caption,
  children,
  action,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const colors = useThemeColors();

  return (
    <Container>
      <Text
        className="font-jac text-4xl p-8 text-center"
        style={{ color: colors.foreground }}
      >
        {title}
      </Text>
      {caption && (
        <View className="px-4">
          <Text
            className="font-silk text-lg p-4 text-center"
            style={{ color: colors.secondary }}
          >
            {caption}
          </Text>
        </View>
      )}
      <View className="flex-1">
        {children}
        {action && <View className="absolute bottom-8 right-14">{action}</View>}
      </View>
    </Container>
  );
}
