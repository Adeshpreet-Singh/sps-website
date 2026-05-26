"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: string | number;
  label: string;
  suffix?: string;
  started: boolean;
  decimals?: number;
  isText?: boolean;
  variant?: "hero" | "card";
}

/**
 * Animated stat counter — used on home page hero and about page stats bar.
 *
 * variant="hero" renders white text for dark backgrounds.
 * variant="card" renders navy text for light card backgrounds.
 */
export default function StatCounter({
  value,
  label,
  suffix = "",
  started,
  decimals = 0,
  isText = false,
  variant = "hero",
}: StatCounterProps) {
  const numericValue =
    typeof value === "number" ? value : parseFloat(String(value)) || 0;
  const display = useCountUp({
    target: numericValue,
    duration: 2000,
    shouldStart: started,
    decimals,
  });

  if (variant === "card") {
    return (
      <div
        className={`relative bg-white dark:bg-dark-surface rounded-xl p-6 text-center shadow-card dark:shadow-none dark:border dark:border-dark-border hover:shadow-card-hover dark:hover:border-accent/30 transition-all reveal-scale-hidden ${
          started ? "reveal-scale-visible" : ""
        }`}
      >
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded-b-full" />
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy dark:text-dark-text mt-2 tabular-nums">
          {isText ? value : display}
          {suffix && <span className="text-accent-safe">{suffix}</span>}
        </p>
        <p className="mt-2 text-sm text-text-muted dark:text-dark-text-muted uppercase tracking-wider">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div
      role="listitem"
      className={`flex flex-col items-center py-6 px-4 animate-slide-up ${
        started ? "animate-counter-enter" : ""
      }`}
    >
      <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
        {isText ? value : display}
        {suffix && <span className="text-accent">{suffix}</span>}
      </p>
      <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
    </div>
  );
}
