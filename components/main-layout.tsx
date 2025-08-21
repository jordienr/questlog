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
        className="font-jac text-5xl p-4 text-center"
        style={{ color: colors.foreground }}
      >
        {title}
      </Text>
      {caption && (
        <Text
          className="font-silk text-lg p-4 text-center"
          style={{ color: colors.secondary }}
        >
          {caption}
        </Text>
      )}
      <View>{children}</View>
      {action && <View className="mt-auto px-8 py-2">{action}</View>}
    </Container>
  );
}
