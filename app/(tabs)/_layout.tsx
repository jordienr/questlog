// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "../../components/ThemeProvider";

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

  return (
    <View
      style={{
        marginHorizontal: 8,
        marginBottom: 8,
        borderRadius: 0,
        borderWidth: 4,
        borderColor: colors.border,
        borderStyle: "dashed",
        backgroundColor: colors.surface,
        padding: 4,
        paddingBottom: Math.max(insets.bottom, 6),
      }}
    >
      <View className="flex-row gap-2">
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={{
                flex: 1,
                alignItems: "center",
                borderWidth: 2,
                borderColor: colors.border,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: isFocused ? colors.accent : colors.background,
              }}
            >
              <Text
                style={{
                  fontFamily: "Silkscreen_400Regular",
                  textDecorationLine: isFocused ? "underline" : "none",
                  color: isFocused ? "#ffffff" : colors.primary,
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
