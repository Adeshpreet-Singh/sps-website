"use client";

import { AlertTriangle } from "lucide-react";

/**
 * ErrorIcon — animated alert icon in a circle with optional pulsing border.
 *
 * Used in: ErrorBoundary, RouteError, global-error, ContactForm ErrorMessage.
 * Two sizes: "md" (80px) and "lg" (96px).
 */
export default function ErrorIcon({
  size = "md",
  pulse = true,
}: {
  size?: "md" | "lg";
  pulse?: boolean;
}) {
  const isLg = size === "lg";

  return (
    <div className={`relative ${isLg ? "mx-auto mb-8 w-24 h-24" : "mb-6 w-20 h-20"}`}>
      <div
        className={`${isLg ? "w-24 h-24" : "w-20 h-20"} rounded-full bg-error/10 dark:bg-error/20 flex items-center justify-center`}
      >
        <AlertTriangle
          className={`${isLg ? "w-12 h-12" : "w-10 h-10"} text-error`}
          aria-hidden="true"
        />
      </div>
      {pulse && (
        <div className="absolute inset-0 rounded-full border-2 border-error/20 dark:border-error/30 animate-pulse" />
      )}
    </div>
  );
}
