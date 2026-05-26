"use client";

import { useRef, useEffect } from "react";

/**
 * Subtle radial glow that follows the mouse cursor within a parent container.
 * Intended for dark hero/CTA sections to add ambient interactivity.
 *
 * Uses direct DOM manipulation for position updates to avoid React re-renders
 * on every mouse move — only visibility changes trigger state updates.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    const glow = glowRef.current;
    if (!parent || !glow) return;

    // Skip on mobile/touch devices and reduced motion
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches || "ontouchstart" in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Direct DOM manipulation — no React re-render
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;

      if (!visibleRef.current) {
        visibleRef.current = true;
        ref.current!.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      ref.current!.style.opacity = "0";
    };

    parent.addEventListener("mousemove", handleMouseMove, { passive: true });
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: 0, transition: "opacity 0.4s ease" }}
    >
      <div
        ref={glowRef}
        className="absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: "0px",
          top: "0px",
          background: "radial-gradient(circle, rgba(232, 122, 46, 0.06) 0%, transparent 70%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </div>
  );
}
