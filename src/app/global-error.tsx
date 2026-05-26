"use client";

import { ErrorContent } from "@/components/RouteError";

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-surface px-4 sm:px-6">
        <ErrorContent error={error} reset={reset} />
      </body>
    </html>
  );
}
