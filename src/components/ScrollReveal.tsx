"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-scale" | "fade-left" | "fade-right";
  delay?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Client wrapper that applies scroll-reveal animations via IntersectionObserver.
 * Safe to import from server components — the "use client" boundary is here.
 *
 * @param variant - "fade-up" (translateY), "fade-scale" (scale), "fade-left" (translateX)
 * @param delay - stagger delay (1-5 maps to 80-400ms)
 */
export default function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay,
}: ScrollRevealProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>();

  const hiddenClass = {
    "fade-up": "reveal-hidden",
    "fade-scale": "reveal-scale-hidden",
    "fade-left": "reveal-left-hidden",
    "fade-right": "reveal-right-hidden",
  }[variant];

  const visibleClass = {
    "fade-up": "reveal-visible",
    "fade-scale": "reveal-scale-visible",
    "fade-left": "reveal-left-visible",
    "fade-right": "reveal-right-visible",
  }[variant];

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${hiddenClass} ${isVisible ? visibleClass : ""} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
