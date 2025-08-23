import React from "react";
import { View } from "react-native";
import { useTheme } from "./ThemeProvider";
import { PixelButton } from "./PixelButton";
import { ThemeType } from "../store/store";

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();

  const themes: { key: ThemeType; label: string }[] = [
    { key: "dark", label: "Dark" },
    { key: "light", label: "Light" },
    { key: "parchment", label: "Parchment" },
  ];

  return (
    <View style={{ gap: 12, padding: 16 }}>
      <View style={{ alignItems: "center", marginBottom: 8 }}>
        <View
          style={{
            flexDirection: "column",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {themes.map((theme) => (
            <PixelButton
              key={theme.key}
              title={theme.label}
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
