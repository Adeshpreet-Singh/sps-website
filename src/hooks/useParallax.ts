"use client";

import { useRef, useEffect, useState, RefObject } from "react";

interface ParallaxOptions {
  /** Parallax speed multiplier. 0 = no movement, 1 = normal scroll speed. Default: 0.3 */
  speed?: number;
  /** Direction of parallax movement. Default: 'vertical' */
  direction?: "vertical" | "horizontal";
  /** Whether to reverse the direction (moves opposite to scroll). Default: false */
  reverse?: boolean;
  /** Max pixel offset to clamp. Default: 100 */
  maxOffset?: number;
}

/**
 * useParallax — applies scroll-based parallax transform to an element.
 * Uses requestAnimationFrame for smooth 60fps performance.
 * Respects prefers-reduced-motion.
 *
 * Usage:
 *   const ref = useParallax<HTMLDivElement>({ speed: 0.3 });
 *   <div ref={ref}>...</div>
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
): RefObject<T> {
  const {
    speed = 0.3,
    direction = "vertical",
    reverse = false,
    maxOffset = 100,
  } = options;

  const ref = useRef<T>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const el = ref.current;
    if (!el) return;

    function update() {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only apply parallax when element is in/near viewport
      if (rect.bottom < -maxOffset || rect.top > viewportHeight + maxOffset) {
        frameRef.current = requestAnimationFrame(update);
        return;
      }

      // Calculate how far the element center is from viewport center.
      // Range: -1 (element center at top of viewport) to +1 (at bottom).
      // 0 = element is perfectly centered in viewport.
      const center = rect.top + rect.height / 2;
      const progress = (center - viewportHeight / 2) / viewportHeight;

      // Apply speed multiplier and clamp to maxOffset.
      // 'reverse' flips direction so element moves with scroll instead of against it.
      const sign = reverse ? 1 : -1;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, progress * speed * maxOffset * sign));

      if (direction === "vertical") {
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      } else {
        el.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(update);
    }

    frameRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRef.current);
  }, [speed, direction, reverse, maxOffset]);

  return ref;
}
