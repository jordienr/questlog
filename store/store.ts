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

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  unlockedAt?: Date;
  isUnlocked: boolean;
  category: "quests" | "player" | "general";
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type:
    | "quests_created"
    | "quests_completed"
    | "quests_deleted"
    | "level_reached"
    | "xp_gained"
    | "current_streak";
  value: number;
  current: number;
}

export interface PlayerStats {
  totalQuestsCreated: number;
  totalQuestsCompleted: number;
  totalQuestsDeleted: number;
  currentStreak: number;
  longestStreak: number;
  totalXpGained: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

export interface GameState {
  // Player data
  player: {
    name: string;
    level: number;
    xp: number;
    stats: PlayerStats;
  };

  // Quests
  quests: Quest[];

  // Achievements
  achievements: Achievement[];
  newlyUnlockedAchievements: Achievement[];

  // Hydration
  hydrated: boolean;
  setHydrated: (value: boolean) => void;

  // Actions
  setName: (name: string) => void;
  setLevel: (level: number) => void;
  setXp: (xp: number) => void;
  addQuest: (title: string) => void;
  toggleQuest: (title: string) => void;
  removeQuest: (title: string) => void;
  reorderQuests: (newQuests: Quest[]) => void;
  clearCompleted: () => void;
  reset: () => void;
  unlockAchievement: (achievementId: string) => void;
  checkAchievements: () => void;
  clearNewlyUnlockedAchievements: () => void;
}

// Default achievements
const defaultAchievements: Achievement[] = [
  {
    id: "first_quest",
    title: "First Steps",
    description: "Create your first quest",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_created", value: 1, current: 0 }],
  },
  {
    id: "add_first_quest",
    title: "First Victory",
    description: "Complete your first quest!",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_completed", value: 1, current: 0 }],
  },
  {
    id: "quest_master_3",
    title: "Quest Apprentice",
    description: "Complete 3 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_completed", value: 3, current: 0 }],
  },
  {
    id: "quest_master_10",
    title: "Quest Master",
    description: "Complete 10 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_completed", value: 10, current: 0 }],
  },
  {
    id: "level_2",
    title: "Level Up!",
    description: "Reach level 2",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "level_reached", value: 2, current: 1 }],
  },
  {
    id: "level_5",
    title: "Experienced",
    description: "Reach level 5",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "level_reached", value: 5, current: 1 }],
  },
  {
    id: "quest_creator",
    title: "Quest Mastermind",
    description: "Create 5 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_created", value: 5, current: 0 }],
  },
  {
    id: "cleaner",
    title: "Clean Slate",
    description: "Delete 3 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_deleted", value: 3, current: 0 }],
  },
  {
    id: "cleaner_10",
    title: "Clean Slate",
    description: "Delete 10 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_deleted", value: 10, current: 0 }],
  },
  {
    id: "quest_master_25",
    title: "Quest Legend",
    description: "Complete 25 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_completed", value: 25, current: 0 }],
  },
  {
    id: "quest_master_50",
    title: "Quest Grandmaster",
    description: "Complete 50 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_completed", value: 50, current: 0 }],
  },
  {
    id: "quest_creator_10",
    title: "Quest Architect",
    description: "Create 10 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_created", value: 10, current: 0 }],
  },
  {
    id: "quest_creator_25",
    title: "Quest Designer",
    description: "Create 25 quests",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "quests_created", value: 25, current: 0 }],
  },
  {
    id: "streak_7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "current_streak", value: 7, current: 0 }],
  },
  {
    id: "streak_30",
    title: "Monthly Master",
    description: "Maintain a 30-day streak",
    category: "quests",
    isUnlocked: false,
    requirements: [{ type: "current_streak", value: 30, current: 0 }],
  },
  {
    id: "level_10",
    title: "Veteran",
    description: "Reach level 10",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "level_reached", value: 10, current: 1 }],
  },
  {
    id: "level_20",
    title: "Elite",
    description: "Reach level 20",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "level_reached", value: 20, current: 1 }],
  },
  {
    id: "level_50",
    title: "Legendary",
    description: "Reach level 50",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "level_reached", value: 50, current: 1 }],
  },
  {
    id: "xp_1000",
    title: "XP Collector",
    description: "Gain 1000 total XP",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "xp_gained", value: 1000, current: 0 }],
  },
  {
    id: "xp_5000",
    title: "XP Hoarder",
    description: "Gain 5000 total XP",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "xp_gained", value: 5000, current: 0 }],
  },
  {
    id: "xp_10000",
    title: "XP Master",
    description: "Gain 10000 total XP",
    category: "player",
    isUnlocked: false,
    requirements: [{ type: "xp_gained", value: 10000, current: 0 }],
  },
  {
    id: "balanced_player",
    title: "Balanced Player",
    description: "Have 5+ quests created, completed, and deleted",
    category: "general",
    isUnlocked: false,
    requirements: [
      { type: "quests_created", value: 5, current: 0 },
      { type: "quests_completed", value: 5, current: 0 },
      { type: "quests_deleted", value: 5, current: 0 },
    ],
  },
  {
    id: "quest_hoarder",
    title: "Quest Hoarder",
    description: "Have 20+ quests created but less than 5 completed",
    category: "quests",
    isUnlocked: false,
    requirements: [
      { type: "quests_created", value: 20, current: 0 },
      { type: "quests_completed", value: 5, current: 0 },
    ],
  },
  {
    id: "efficiency_expert",
    title: "Efficiency Expert",
    description: "Complete 80% of created quests (min 10 created)",
    category: "quests",
    isUnlocked: false,
    requirements: [
      { type: "quests_created", value: 10, current: 0 },
      { type: "quests_completed", value: 8, current: 0 },
    ],
  },
  {
    id: "streak_champion",
    title: "Streak Champion",
    description: "Reach level 10 and maintain a 7-day streak",
    category: "general",
    isUnlocked: false,
    requirements: [
      { type: "level_reached", value: 10, current: 1 },
      { type: "current_streak", value: 7, current: 0 },
    ],
  },
  {
    id: "xp_streak_master",
    title: "XP Streak Master",
    description: "Gain 2000 XP and maintain a 5-day streak",
    category: "general",
    isUnlocked: false,
    requirements: [
      { type: "xp_gained", value: 2000, current: 0 },
      { type: "current_streak", value: 5, current: 0 },
    ],
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: {
        name: "",
        level: 1,
        xp: 0,
        stats: {
          totalQuestsCreated: 0,
          totalQuestsCompleted: 0,
          totalQuestsDeleted: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalXpGained: 0,
          achievementsUnlocked: 0,
          totalAchievements: defaultAchievements.length,
        },
      },
      quests: [],
      achievements: defaultAchievements,
      newlyUnlockedAchievements: [],
      hydrated: false,
      setHydrated: (value: boolean) => set({ hydrated: value }),

      setName: (name: string) => {
        set((state) => ({
          player: { ...state.player, name },
        }));
      },

      setLevel: (level: number) => {
        set((state) => ({
          player: {
            ...state.player,
            level,
            stats: {
              ...state.player.stats,
              totalXpGained:
                state.player.stats.totalXpGained +
                (level - state.player.level) * 100,
            },
          },
        }));
        get().checkAchievements();
      },

      setXp: (xp: number) => {
        set((state) => ({
          player: {
            ...state.player,
            xp,
            stats: {
              ...state.player.stats,
              totalXpGained:
                state.player.stats.totalXpGained + (xp - state.player.xp),
            },
          },
        }));
        get().checkAchievements();
      },

      addQuest: (title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return;

        const { quests } = get();
        if (quests.some((q) => q.title.toLowerCase() === trimmed.toLowerCase()))
          return;

        set((state) => ({
          quests: [{ title: trimmed, isChecked: false }, ...quests],
          player: {
            ...state.player,
            stats: {
              ...state.player.stats,
              totalQuestsCreated: state.player.stats.totalQuestsCreated + 1,
            },
          },
        }));
        get().checkAchievements();
      },

      toggleQuest: (title: string) => {
        const { quests } = get();
        const quest = quests.find((q) => q.title === title);
        if (!quest) return;

        const newIsChecked = !quest.isChecked;
        set((state) => ({
          quests: quests.map((q) =>
            q.title === title ? { ...q, isChecked: newIsChecked } : q,
          ),
          player: {
            ...state.player,
            stats: {
              ...state.player.stats,
              totalQuestsCompleted:
                state.player.stats.totalQuestsCompleted +
                (newIsChecked ? 1 : -1),
              currentStreak: newIsChecked
                ? state.player.stats.currentStreak + 1
                : 0,
              longestStreak: newIsChecked
                ? Math.max(
                    state.player.stats.currentStreak + 1,
                    state.player.stats.longestStreak,
                  )
                : state.player.stats.longestStreak,
            },
          },
        }));
        get().checkAchievements();
      },

      removeQuest: (title: string) => {
        const { quests } = get();
        const quest = quests.find((q) => q.title === title);
        if (!quest) return;

        set((state) => ({
          quests: quests.filter((q) => q.title !== title),
          player: {
            ...state.player,
            stats: {
              ...state.player.stats,
              totalQuestsDeleted: state.player.stats.totalQuestsDeleted + 1,
              totalQuestsCreated: state.player.stats.totalQuestsCreated - 1,
              totalQuestsCompleted:
                state.player.stats.totalQuestsCompleted -
                (quest.isChecked ? 1 : 0),
            },
          },
        }));
        get().checkAchievements();
      },

      reorderQuests: (newQuests: Quest[]) => {
        set((state) => ({
          quests: newQuests,
        }));
      },

      clearCompleted: () => {
        const { quests } = get();
        const completedQuests = quests.filter((q) => q.isChecked);

        set((state) => ({
          quests: quests.filter((q) => !q.isChecked),
          player: {
            ...state.player,
            stats: {
              ...state.player.stats,
              totalQuestsDeleted:
                state.player.stats.totalQuestsDeleted + completedQuests.length,
              totalQuestsCompleted:
                state.player.stats.totalQuestsCompleted -
                completedQuests.length,
            },
          },
        }));
        get().checkAchievements();
      },

      reset: () => {
        set((state) => ({
          quests: [],
          player: {
            name: "",
            level: 1,
            xp: 0,
            stats: {
              totalQuestsCreated: 0,
              totalQuestsCompleted: 0,
              totalQuestsDeleted: 0,
              currentStreak: 0,
              longestStreak: 0,
              totalXpGained: 0,
              achievementsUnlocked: 0,
              totalAchievements: state.player.stats.totalAchievements,
            },
          },
          achievements: defaultAchievements.map((achievement) => ({
            ...achievement,
            isUnlocked: false,
            unlockedAt: undefined,
          })),
          newlyUnlockedAchievements: [],
        }));
        get().checkAchievements();
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
              : achievement,
          ),
          newlyUnlockedAchievements: [
            ...state.newlyUnlockedAchievements,
            state.achievements.find((a) => a.id === achievementId)!,
          ],
          player: {
            ...state.player,
            stats: {
              ...state.player.stats,
              achievementsUnlocked: state.player.stats.achievementsUnlocked + 1,
            },
          },
        }));
      },

      checkAchievements: () => {
        const { player, achievements } = get();

        achievements.forEach((achievement) => {
          if (achievement.isUnlocked) return;

          let shouldUnlock = true;
          const updatedRequirements = achievement.requirements.map((req) => {
            let current = 0;

            switch (req.type) {
              case "quests_created":
                current = player.stats.totalQuestsCreated;
                break;
              case "quests_completed":
                current = player.stats.totalQuestsCompleted;
                break;
              case "quests_deleted":
                current = player.stats.totalQuestsDeleted;
                break;
              case "level_reached":
                current = player.level;
                break;
              case "xp_gained":
                current = player.stats.totalXpGained;
                break;
              case "current_streak":
                current = player.stats.currentStreak;
                break;
            }

            return { ...req, current };
          });

          // Check if all requirements are met
          updatedRequirements.forEach((req) => {
            if (req.current < req.value) {
              shouldUnlock = false;
            }
          });

          // Special logic for complex achievements
          if (shouldUnlock) {
            switch (achievement.id) {
              case "quest_hoarder":
                // Need 20+ created but less than 5 completed
                shouldUnlock =
                  player.stats.totalQuestsCreated >= 20 &&
                  player.stats.totalQuestsCompleted < 5;
                break;
              case "efficiency_expert":
                // Need 80% completion rate with min 10 created
                shouldUnlock =
                  player.stats.totalQuestsCreated >= 10 &&
                  player.stats.totalQuestsCompleted /
                    player.stats.totalQuestsCreated >=
                    0.8;
                break;
              default:
                // For regular achievements, use the standard logic
                break;
            }
          }

          if (shouldUnlock) {
            get().unlockAchievement(achievement.id);
          }
        });
      },

      clearNewlyUnlockedAchievements: () => {
        set((state) => ({
          newlyUnlockedAchievements: [],
        }));
      },
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        state?.setHydrated(true);
      },
      // Migration function to convert string dates back to Date objects
      migrate: (persistedState: any, version: number) => {
        if (persistedState && persistedState.achievements) {
          // Convert string dates back to Date objects
          persistedState.achievements = persistedState.achievements.map(
            (achievement: any) => ({
              ...achievement,
              unlockedAt:
                achievement.unlockedAt &&
                typeof achievement.unlockedAt === "string"
                  ? new Date(achievement.unlockedAt)
                  : achievement.unlockedAt,
            }),
          );
        }
        return persistedState;
      },
    },
  ),
);

// Legacy exports for backward compatibility during migration
export const useQuestStore = useGameStore;
export const usePlayerStore = useGameStore;
