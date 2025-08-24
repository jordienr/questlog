// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "../../components/ThemeProvider";
import { Icon } from "../../components/Icon";
import { PixelSection } from "~/components/pixel-section";

function PixelTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  const getTabIcon = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "script";
      case "stats":
        return "bookOpen";
      case "settings":
        return "lightbulb";
      default:
        return "script";
    }
  };

  return (
    <View
      style={{
        borderTopColor: colors.border,
        borderTopWidth: 4,
        borderStyle: "dashed",
        backgroundColor: colors.background,
        padding: 8,
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <View style={{ flexDirection: "row", gap: 4 }}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;
          const iconName = getTabIcon(route.name);

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={{
                flex: 1,
                alignItems: "center",
                padding: 12,
                backgroundColor: isFocused
                  ? colors.foreground
                  : colors.background,
              }}
            >
              <Icon
                name={iconName}
                size={24}
                style={{
                  opacity: isFocused ? 1 : 0.5,
                }}
                color={isFocused ? colors.background : colors.foreground}
              />
              <Text
                style={{
                  fontFamily: "Silkscreen_400Regular",
                  color: isFocused ? colors.background : colors.primary,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {String(label)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(p) => <PixelTabBar {...p} />}
    />
  );
}
