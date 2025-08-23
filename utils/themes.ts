import { ThemeType } from "../store/store";

export interface ThemeColors {
  foreground: string;
  background: string;
  background2: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export const themes: Record<ThemeType, ThemeColors> = {
  dark: {
    foreground: "#ffffff",
    background: "#000000",
    background2: "#111111",
    surface: "#111111",
    primary: "#ffffff",
    secondary: "#9ca3af",
    accent: "#F4852A",
    border: "#374151",
    error: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
  },
  light: {
    foreground: "#000000",
    background: "#ffffff",
    background2: "#f9fafb",
    surface: "#f9fafb",
    primary: "#000000",
    secondary: "#6b7280",
    accent: "#3b82f6",
    border: "#e5e7eb",
    error: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
  },
  parchment: {
    foreground: "#3d2907",
    background: "#faf8f3",
    background2: "oklch(83.7% 0.128 66.29)",
    surface: "#f5f2eb",
    primary: "#574435",
    secondary: "#8b7355",
    accent: "#b45309",
    border: "#d6d3cb",
    error: "#b91c1c",
    success: "#15803d",
    warning: "#a16207",
  },
};

export const getTheme = (theme: ThemeType): ThemeColors => themes[theme];
