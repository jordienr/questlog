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
        style={{
          flex: 1,
          backgroundColor: themeColors.background,
        }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
