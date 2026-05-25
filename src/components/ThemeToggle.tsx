"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center rounded-full p-2 text-text transition-colors duration-200 hover:text-accent hover:bg-surface-alt dark:text-dark-text dark:hover:text-accent dark:hover:bg-dark-surface-alt motion-reduce:transition-none min-w-[44px] min-h-[44px]"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="relative block h-5 w-5">
        {/* Sun icon — visible in dark mode, hidden in light mode */}
        <Sun
          aria-hidden="true"
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            resolvedTheme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          } motion-reduce:transition-none`}
        />
        {/* Moon icon — visible in light mode, hidden in dark mode */}
        <Moon
          aria-hidden="true"
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            resolvedTheme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          } motion-reduce:transition-none`}
        />
      </span>
    </button>
  );
}
