"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import ErrorIcon from "@/components/ErrorIcon";

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
          <ErrorIcon size="lg" />
          <h1 className="text-2xl sm:text-3xl font-bold text-text dark:text-dark-text mb-4">
            Something went wrong
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted mb-2 leading-relaxed">
            We hit an unexpected error. This has been logged and we&apos;ll
            look into it.
          </p>

          {/* Show digest in dev for debugging */}
          {error.digest && (
            <p className="text-xs text-text-light dark:text-dark-text-light mb-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark hover:shadow-lg btn-press min-h-[44px]"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border dark:border-dark-border px-6 py-3 text-sm font-semibold text-text dark:text-dark-text transition-colors hover:bg-surface-alt dark:hover:bg-dark-surface-alt btn-press min-h-[44px]"
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
