"use client";

import { useEffect, useRef } from "react";
import { RefreshCw, Phone, Home } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import ErrorIcon from "@/components/ErrorIcon";

/* ================================================================== */
/*  Shared error content (used by both RouteError and GlobalError)    */
/* ================================================================== */

interface ErrorContentProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
  showPhone?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Shared error content component. Used internally by RouteError and can
 * be used directly for global error boundaries that need their own html shell.
 */
export function ErrorContent({
  error,
  reset,
  title = "Something went wrong",
  description = "We hit an unexpected error. This has been logged and we'll look into it.",
  showPhone = false,
  secondaryHref = "/",
  secondaryLabel = "Back to Home",
}: ErrorContentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error("[ErrorContent]", error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <div role="alert" className="max-w-lg text-center">
      {/* Error icon */}
      <ErrorIcon size="lg" />
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl sm:text-3xl font-bold text-navy dark:text-dark-text mb-4 focus:outline-none"
      >
        {title}
      </h1>
      <p className="text-text-muted dark:text-dark-text-muted mb-2 leading-relaxed">
        {description}
      </p>

      {/* Show digest in dev for debugging */}
      {error.digest && (
        <p className="text-xs text-text-light dark:text-dark-text-light mb-8 font-mono">
          Error ID: {error.digest}
        </p>
      )}

      {/* Optional phone CTA */}
      {showPhone && (
        <div className="mb-8 rounded-xl border border-accent/20 bg-accent/[0.04] dark:bg-accent/[0.08] px-6 py-4">
          <a
            href={siteConfig.phoneLink}
            aria-label={`Call us at ${siteConfig.phone}`}
            className="inline-flex items-center gap-2 text-accent-safe font-semibold hover:underline min-h-[44px]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <p className="mt-1 text-sm text-text-muted dark:text-dark-text-muted">
            {siteConfig.hours}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        <button
          type="button"
          onClick={reset}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg btn-press min-h-[44px] motion-reduce:transition-none motion-reduce:transform-none"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </button>
        <Link
          href={secondaryHref}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border dark:border-dark-border px-6 py-3 text-sm font-semibold text-text dark:text-dark-text transition-all hover:bg-surface-alt hover:-translate-y-0.5 active:translate-y-0 btn-press min-h-[44px] motion-reduce:transition-none motion-reduce:transform-none"
        >
          {secondaryHref === "/" && <Home className="h-4 w-4" aria-hidden="true" />}
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Route-level error boundary                                        */
/* ================================================================== */

/**
 * Shared route-level error boundary.
 *
 * Next.js requires each route to export its own `error.tsx`, so those files
 * become thin wrappers around this component with route-specific props.
 */
export default function RouteError({
  error,
  reset,
  title,
  description,
  showPhone,
  secondaryHref,
  secondaryLabel,
}: ErrorContentProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-dark-surface px-4 sm:px-6 py-20">
      <ErrorContent
        error={error}
        reset={reset}
        title={title}
        description={description}
        showPhone={showPhone}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
      />
    </div>
  );
}

/* ================================================================== */
/*  Factory for generating route error pages                          */
/* ================================================================== */

interface RouteErrorConfig {
  title?: string;
  description?: string;
  showPhone?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Factory that creates a Next.js error page component configured with
 * route-specific copy. Eliminates boilerplate across 11 error.tsx files.
 *
 * Usage:
 *   // src/app/about/error.tsx
 *   "use client";
 *   import { createRouteErrorPage } from "@/components/RouteError";
 *   export default createRouteErrorPage({
 *     title: "Couldn't load the About page",
 *     description: "Something went wrong while loading this section.",
 *   });
 */
export function createRouteErrorPage(config: RouteErrorConfig = {}) {
  return function RouteErrorPage({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    return (
      <RouteError
        error={error}
        reset={reset}
        title={config.title}
        description={config.description}
        showPhone={config.showPhone}
        secondaryHref={config.secondaryHref}
        secondaryLabel={config.secondaryLabel}
      />
    );
  };
}
