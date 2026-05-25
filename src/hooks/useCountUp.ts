"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  /** Target number to count to */
  target: number;
  /** Animation duration in ms (default: 2000) */
  duration?: number;
  /** Whether to start counting (trigger with scroll reveal) */
  shouldStart: boolean;
  /** Decimal places (default: 0) */
  decimals?: number;
}

/**
 * Animates a number counting up from 0 to `target`.
 * Respects prefers-reduced-motion. Uses easing for natural feel.
 *
 * @returns the current display value as a string
 */
export function useCountUp({
  target,
  duration = 2000,
  shouldStart,
  decimals = 0,
}: UseCountUpOptions): string {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(target.toFixed(decimals));
      return;
    }

    const startTime = performance.now();

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = eased * target;

      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [shouldStart, target, duration, decimals]);

  return display;
}
