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
  // New colors for Dark Souls-style overlays
  overlayBg: string;
  overlayText: string;
  overlayGlow: string;
  overlayAccent: string;
  overlayLine: string;
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
    overlayBg: "rgba(0, 0, 0, 0.92)",
    overlayText: "#ffffff",
    overlayGlow: "#F4852A",
    overlayAccent: "#F4852A",
    overlayLine: "#F4852A",
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
    overlayBg: "rgba(255, 255, 255, 0.95)",
    overlayText: "#000000",
    overlayGlow: "#3b82f6",
    overlayAccent: "#3b82f6",
    overlayLine: "#3b82f6",
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
    overlayBg: "rgba(58, 41, 7, 0.9)",
    overlayText: "#faf8f3",
    overlayGlow: "#b45309",
    overlayAccent: "#b45309",
    overlayLine: "#b45309",
  },
};

export const getTheme = (theme: ThemeType): ThemeColors => themes[theme];
