/**
 * @fileoverview Theme context provider for dark/light/system mode.
 *
 * Provides:
 * - ThemeProvider: React context wrapper that manages theme state
 * - useTheme: Hook to access theme, resolvedTheme, setTheme, toggleTheme
 * - themeScript: Inline <script> string to apply theme before first paint
 *
 * Theme persistence uses localStorage with key "theme". The "system" mode
 * listens for `prefers-color-scheme` media query changes. Theme transitions
 * use a temporary CSS class (.theme-transition) that's removed after 350ms
 * to avoid interfering with other animations.
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <head>
 *   <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 * </head>
 * <ThemeProvider>{children}</ThemeProvider>
 *
 * // In a component
 * const { resolvedTheme, toggleTheme } = useTheme();
 * ```
 */

"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

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

/**
 * Applies the theme to the document root element.
 *
 * Strategy:
 * 1. Add .theme-transition class (CSS transition on background/color)
 * 2. Swap light/dark classes
 * 3. Set color-scheme CSS property for native element theming (scrollbars, inputs)
 * 4. Remove .theme-transition after 350ms to avoid interfering with other animations
 *
 * The transition class is intentionally short-lived — it only covers the theme
 * switch itself, not ongoing page interactions.
 */
function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;
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

  const contextValue = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
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
