"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronUp } from "lucide-react";

/**
 * ScrollToTop — floating action button that appears after scrolling down.
 * Smooth scroll-to-top with entrance/exit animations.
 *
 * Uses a ref to track visibility in the scroll handler so the callback
 * doesn't depend on state — avoids re-registering the scroll listener
 * on every visibility change.
 *
 * Respects prefers-reduced-motion reactively via matchMedia listener.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState<"enter" | "exit" | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const visibleRef = useRef(false);

  // Reactively track prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleScroll = useCallback(() => {
    const shouldShow = window.scrollY > 400;
    if (shouldShow && !visibleRef.current) {
      visibleRef.current = true;
      setVisible(true);
      setAnimating("enter");
    } else if (!shouldShow && visibleRef.current) {
      visibleRef.current = false;
      setAnimating("exit");
      setTimeout(() => {
        setVisible(false);
        setAnimating(null);
      }, 200);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md btn-press ${
        animating === "enter"
          ? "animate-fab-enter"
          : animating === "exit"
            ? "animate-fab-exit"
            : ""
      }`}
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
