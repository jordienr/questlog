import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme, useThemeColors } from "./ThemeProvider";
import { ThemeType } from "../store/store";

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const colors = useThemeColors();

  const themes: { key: ThemeType; label: string }[] = [
    { key: "dark", label: "Dark" },
    { key: "light", label: "Light" },
    { key: "parchment", label: "Script" },
  ];

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {themes.map((theme) => (
            <Pressable
              key={theme.key}
              onPress={() => setTheme(theme.key)}
              className="border p-2"
              style={{
                borderColor: colors.border,
              }}
            >
              <Text
                className={`font-silk text-lg`}
                style={{
                  color:
                    currentTheme === theme.key
                      ? colors.accent
                      : colors.secondary,
                }}
              >
                {theme.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};
