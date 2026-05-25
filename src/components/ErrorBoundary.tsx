"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional fallback UI to render instead of the default error page */
  fallback?: ReactNode;
  /** Called when an error is caught — useful for logging/reporting */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — catches React rendering errors and shows a friendly
 * fallback UI instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 *
 *   <ErrorBoundary fallback={<p>Custom error UI</p>}>
 *     <SomeComponent />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, errorInfo);
    }
    // Call optional error handler (e.g. Sentry, analytics)
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <section
          role="alert"
          aria-label="Something went wrong"
          className="flex flex-col items-center justify-center min-h-[50vh] px-4 sm:px-6 py-16 text-center"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-error" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-error/20 animate-pulse" />
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-bold text-text dark:text-dark-text mb-3">
            Something went wrong
          </h2>
          <p className="text-text-muted dark:text-dark-text-muted max-w-md mb-2">
            We hit an unexpected error while loading this section. You can try
            refreshing or head back to the homepage.
          </p>

          {/* Show error message in development */}
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-4 max-w-lg text-left text-xs bg-error/5 border border-error/20 rounded-lg p-4 overflow-auto text-error/80 font-mono mb-6">
              {this.state.error.message}
            </pre>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center mt-6">
            <button
              onClick={this.handleRetry}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark hover:shadow-lg btn-press"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border dark:border-dark-border px-6 py-3 text-sm font-semibold text-text dark:text-dark-text transition-colors hover:bg-surface-alt dark:hover:bg-dark-surface-alt btn-press"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
