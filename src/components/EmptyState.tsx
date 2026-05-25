"use client";

import { Inbox, Search, AlertCircle, FileQuestion } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  /** Visual style / icon variant */
  variant?: "default" | "search" | "error" | "not-found";
  /** Main heading */
  title?: string;
  /** Supporting description */
  description?: string;
  /** Optional CTA — renders as a Link if href is provided, button otherwise */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

const icons = {
  default: Inbox,
  search: Search,
  error: AlertCircle,
  "not-found": FileQuestion,
};

/**
 * EmptyState — friendly placeholder when there's no data to show.
 *
 * Usage:
 *   <EmptyState title="No reviews yet" description="Be the first to leave a review!" />
 *   <EmptyState variant="search" title="No results" action={{ label: "Clear filters", onClick: reset }} />
 *   <EmptyState variant="error" title="Could not load data" action={{ label: "Try again", onClick: retry }} />
 */
export default function EmptyState({
  variant = "default",
  title = "Nothing here yet",
  description,
  action,
  className = "",
}: EmptyStateProps) {
  const Icon = icons[variant];

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 sm:py-20 text-center ${className}`}
    >
      <div className="mb-6 relative">
        <div className="w-16 h-16 rounded-full bg-surface-alt dark:bg-dark-surface-alt flex items-center justify-center">
          <Icon className="w-8 h-8 text-text-muted dark:text-dark-text-muted" />
        </div>
        {variant === "error" && (
          <div className="absolute inset-0 rounded-full border-2 border-error/20 animate-pulse" />
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-heading font-bold text-text dark:text-dark-text mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-text-muted dark:text-dark-text-muted max-w-sm leading-relaxed text-sm sm:text-base mb-6">
          {description}
        </p>
      )}

      {action &&
        (action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark hover:shadow-lg btn-press"
          >
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark hover:shadow-lg btn-press"
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
