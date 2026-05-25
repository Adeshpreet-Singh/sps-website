"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useLazyVideo — defers video playback until the container element is
 * visible in the viewport.  Saves bandwidth and CPU on pages where the
 * hero video is below the fold (unlikely on homepage, but useful for
 * consistency and reduced initial load).
 *
 * Returns [videoRef, shouldPlay] to spread onto the <video> element.
 */
export function useLazyVideo<T extends HTMLElement = HTMLDivElement>(options?: {
  rootMargin?: string;
}): [React.RefObject<T | null>, boolean] {
  const containerRef = useRef<T | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPlay(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: options?.rootMargin ?? "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.rootMargin]);

  return [containerRef, shouldPlay];
}
