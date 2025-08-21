import React, { createContext, useContext, ReactNode } from "react";
import { useThemeStore, ThemeType } from "../store/store";
import { getTheme, ThemeColors } from "../utils/themes";
import { View } from "react-native";

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useThemeColors = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeColors must be used within a ThemeProvider");
  }
  return context.colors;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { currentTheme, setTheme, toggleTheme } = useThemeStore();

  // Simple fallback
  const theme = currentTheme || "dark";
  const themeColors = getTheme(theme);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        setTheme,
        toggleTheme,
        colors: themeColors,
      }}
    >
      <View
        // Expose tokens to Tailwind via CSS variables (NativeWind reads these in web/native)
        // Values are rgb components to work with `rgb(var(--color-*)))` in tailwind.config
        style={{
          flex: 1,
          backgroundColor: themeColors.background,
          // foreground tokens
          ["--color-foreground" as any]: hexToRgb(themeColors.primary),
          ["--color-foreground-100" as any]: hexToRgb(
            alpha(themeColors.primary, 0.6),
          ),
          // background tokens
          ["--color-background" as any]: hexToRgb(themeColors.background),
          ["--color-background-100" as any]: hexToRgb(
            alpha(themeColors.background, 0.6),
          ),
          // other tokens
          ["--color-surface" as any]: hexToRgb(themeColors.surface),
          ["--color-primary" as any]: hexToRgb(themeColors.primary),
          ["--color-secondary" as any]: hexToRgb(themeColors.secondary),
          ["--color-accent" as any]: hexToRgb(themeColors.accent),
          ["--color-border" as any]: hexToRgb(themeColors.border),
          ["--color-error" as any]: hexToRgb(themeColors.error),
          ["--color-success" as any]: hexToRgb(themeColors.success),
          ["--color-warning" as any]: hexToRgb(themeColors.warning),
        }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

// Utilities to convert hex colors to rgb triplets and apply alpha
function hexToRgb(hex: string): string {
  const { r, g, b } = hexToRgbObj(hex);
  return `${r} ${g} ${b}`; // space-delimited for rgb(var(--token))
}

function hexToRgbObj(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace("#", "");
  const bigint = parseInt(
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned,
    16,
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function alpha(hex: string, a: number): string {
  const { r, g, b } = hexToRgbObj(hex);
  const rA = Math.round(r * a + 255 * (1 - a));
  const gA = Math.round(g * a + 255 * (1 - a));
  const bA = Math.round(b * a + 255 * (1 - a));
  return `#${toHex(rA)}${toHex(gA)}${toHex(bA)}`;
}

function toHex(n: number): string {
  return n.toString(16).padStart(2, "0");
}
