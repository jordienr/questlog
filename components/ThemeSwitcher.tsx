import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "./ThemeProvider";
import { useThemeColors } from "./ThemeProvider";
import { ThemeType } from "../store/store";

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const colors = useThemeColors();

  const themes: { key: ThemeType; label: string; emoji: string }[] = [
    { key: "dark", label: "Dark", emoji: "🌙" },
    { key: "light", label: "Light", emoji: "☀️" },
    { key: "parchment", label: "Parchment", emoji: "📜" },
  ];

  return (
    <View style={{ flexDirection: "row", gap: 8, padding: 16 }}>
      {themes.map((theme) => (
        <TouchableOpacity
          key={theme.key}
          onPress={() => setTheme(theme.key)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor:
              currentTheme === theme.key ? colors.accent : colors.border,
            backgroundColor:
              currentTheme === theme.key ? colors.accent : colors.surface,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Silkscreen_400Regular",
              color: currentTheme === theme.key ? "#ffffff" : colors.primary,
            }}
          >
            {theme.emoji} {theme.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
