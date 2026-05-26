"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  // Add transition class for smooth theme switch
  root.classList.add("theme-transition");
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  // Set color-scheme for native elements (scrollbars, form controls, etc.)
  root.style.colorScheme = theme;
  // Remove transition class after animation completes to avoid interfering with other transitions
  setTimeout(() => root.classList.remove("theme-transition"), 350);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Initialize from localStorage
  useEffect(() => {
    // Defer state updates to avoid synchronous setState in effect body
    requestAnimationFrame(() => {
      const stored = localStorage.getItem("theme") as Theme | null;
      const initialTheme = stored ?? "system";
      setThemeState(initialTheme);

      const resolved = initialTheme === "system" ? getSystemTheme() : initialTheme;
      setResolvedTheme(resolved);
      applyTheme(resolved);
    });
  }, []);

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      setResolvedTheme(newTheme);
      applyTheme(newTheme);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Inline script to prevent FOUC (flash of wrong theme).
 * Add this to <head> in layout.tsx.
 */
export const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    var resolved = theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    document.documentElement.classList.add(resolved);
    document.documentElement.style.colorScheme = resolved;
  } catch(e) {}
})();
`;
