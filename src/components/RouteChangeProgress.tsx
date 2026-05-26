"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * RouteChangeProgress — thin animated bar at the top of the viewport
 * that shows progress during client-side navigation.
 *
 * Uses the new App Router hooks (usePathname + useSearchParams) instead
 * of the deprecated Router.events API.
 */
export default function RouteChangeProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const startProgress = useCallback(() => {
    setVisible(true);
    setOpacity(1);
    setProgress(0);

    // Simulate incremental progress
    const steps = [
      { delay: 0, value: 20 },
      { delay: 200, value: 50 },
      { delay: 500, value: 75 },
      { delay: 800, value: 90 },
    ];

    const timers = steps.map(({ delay, value }) =>
      setTimeout(() => setProgress(value), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const completeProgress = useCallback(() => {
    setProgress(100);
    // Fade out after reaching 100%
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(hideTimer);
    }, 200);
    return () => clearTimeout(fadeTimer);
  }, []);

  // Trigger progress on route change
  useEffect(() => {
    // Defer to next frame to avoid synchronous setState in effect body
    const raf = requestAnimationFrame(() => {
      const cleanup = startProgress();
      const completeTimer = setTimeout(() => {
        completeProgress();
      }, 100);

      // Store cleanup for later
      cleanupRef.current = () => {
        cleanup?.();
        clearTimeout(completeTimer);
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      cleanupRef.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
      style={{ opacity, transition: "opacity 0.3s ease" }}
    >
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-light to-accent rounded-r-full shadow-[0_0_10px_rgba(232,122,46,0.5)]"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? "width 0.2s ease-out"
              : "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
