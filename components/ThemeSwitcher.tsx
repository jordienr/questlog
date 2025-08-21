import React from "react";
import { View } from "react-native";
import { useTheme } from "./ThemeProvider";
import { PixelButton } from "./PixelButton";
import { ThemeType } from "../store/store";

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  const themes: { key: ThemeType; label: string; emoji: string }[] = [
    { key: "dark", label: "Dark", emoji: "🌙" },
    { key: "light", label: "Light", emoji: "☀️" },
    { key: "parchment", label: "Parchment", emoji: "📜" },
  ];

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {themes.map((theme) => (
            <PixelButton
              key={theme.key}
              title={`${theme.emoji} ${theme.label}`}
              onPress={() => setTheme(theme.key)}
              variant={currentTheme === theme.key ? "accent" : "secondary"}
              size="medium"
            />
          ))}
        </View>
      </View>
    </View>
  );
};
