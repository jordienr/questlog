import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeType = "dark" | "light" | "parchment";

export interface ThemeState {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: "dark",
      setTheme: (theme: ThemeType) => set({ currentTheme: theme }),
      toggleTheme: () => {
        const { currentTheme } = get();
        const themes: ThemeType[] = ["dark", "light", "parchment"];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        set({ currentTheme: themes[nextIndex] });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export type Quest = { title: string; isChecked: boolean };

export interface QuestState {
  quests: Quest[];
  addQuest: (title: string) => void;
  toggleQuest: (title: string) => void;
  removeQuest: (title: string) => void;
  clearCompleted: () => void;
}

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      quests: [],
      addQuest: (title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return;
        const { quests } = get();
        if (quests.some((q) => q.title.toLowerCase() === trimmed.toLowerCase()))
          return;
        set({ quests: [{ title: trimmed, isChecked: false }, ...quests] });
      },
      toggleQuest: (title: string) => {
        const { quests } = get();
        set({
          quests: quests.map((q) =>
            q.title === title ? { ...q, isChecked: !q.isChecked } : q,
          ),
        });
      },
      removeQuest: (title: string) => {
        const { quests } = get();
        set({ quests: quests.filter((q) => q.title !== title) });
      },
      clearCompleted: () => {
        const { quests } = get();
        set({ quests: quests.filter((q) => !q.isChecked) });
      },
    }),
    {
      name: "quests-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export interface PlayerState {
  name: string;
  setName: (name: string) => void;
  level: number;
  setLevel: (level: number) => void;
  xp: number;
  setXp: (xp: number) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      name: "",
      setName: (name: string) => set({ name }),
      level: 1,
      setLevel: (level: number) => set({ level }),
      xp: 0,
      setXp: (xp: number) => set({ xp }),
    }),
    {
      name: "player-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
