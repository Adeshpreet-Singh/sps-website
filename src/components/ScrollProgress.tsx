"use client";

import { useRef, useEffect } from "react";

/**
 * Gradient progress bar fixed to the top of the viewport.
 * Shows how far the user has scrolled down the page.
 *
 * Uses a ref + direct DOM manipulation instead of useState to avoid
 * re-rendering the entire component on every scroll event. The progress
 * bar width is a purely visual concern that doesn't affect React's
 * virtual DOM — writing to style.width directly is faster and avoids
 * layout thrashing from state-driven re-renders.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-accent via-accent-light to-accent transition-[width] duration-150 ease-out"
        style={{ width: "0%" }}
      />
    </div>
  );
}
