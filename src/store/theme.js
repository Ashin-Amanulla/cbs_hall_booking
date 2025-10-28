import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,

      toggleTheme: () =>
        set((state) => {
          const newIsDark = !state.isDark;
          // Update document class for Tailwind dark mode
          if (newIsDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDark: newIsDark };
        }),

      setTheme: (isDark) =>
        set(() => {
          if (isDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { isDark };
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);
