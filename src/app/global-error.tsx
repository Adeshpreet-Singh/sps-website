"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

/**
 * Global error boundary — catches unhandled errors in the root layout
 * itself (Navbar, Footer, ThemeProvider, etc.). This replaces the
 * entire <html> shell so it MUST render its own <html><body>.
 *
 * For errors inside page content, see error.tsx (route-level).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-surface px-4 sm:px-6">
        <div className="max-w-lg text-center">
          {/* Error icon */}
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-red-200 dark:border-red-800 animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-500 dark:text-dark-text-muted mb-2 leading-relaxed">
            We hit an unexpected error. This has been logged and we&apos;ll
            look into it.
          </p>

          {/* Show digest in dev for debugging */}
          {error.digest && (
            <p className="text-xs text-gray-400 dark:text-dark-text-light mb-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button
              onClick={reset}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 hover:shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-dark-border px-6 py-3 text-sm font-semibold text-gray-700 dark:text-dark-text transition-colors hover:bg-gray-50 dark:hover:bg-dark-surface-alt"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
