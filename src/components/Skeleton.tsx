"use client";

/**
 * Skeleton — Generic loading placeholder with shimmer pulse.
 *
 * Usage:
 *   <Skeleton className="h-6 w-48" />
 *   <Skeleton variant="circle" className="h-12 w-12" />
 *   <Skeleton variant="rounded" className="h-40 w-full" />
 */

interface SkeletonProps {
  className?: string;
  variant?: "default" | "rounded" | "circle" | "text";
}

export default function Skeleton({
  className = "",
  variant = "default",
}: SkeletonProps) {
  const base =
    "bg-gray-200 dark:bg-dark-surface-alt animate-skeleton";

  const variants = {
    default: "rounded-md",
    rounded: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md h-4",
  };

  return <div aria-hidden="true" className={`${base} ${variants[variant]} ${className}`} />;
}

/* ================================================================
   Composite skeleton layouts — drop in where async content loads
   ================================================================ */

/** Card skeleton: icon + title + description lines */
export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl bg-white dark:bg-dark-surface p-6 border border-border dark:border-dark-border animate-skeleton-enter ${className}`}
    >
      <Skeleton variant="rounded" className="h-40 w-full mb-5" />
      <Skeleton variant="circle" className="h-12 w-12 mb-4" />
      <Skeleton className="h-5 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/** Testimonial skeleton: avatar + quote lines */
export function TestimonialSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl bg-white dark:bg-dark-surface p-8 border-l-4 border-gray-200 dark:border-dark-border animate-skeleton-enter ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circle" className="h-12 w-12 shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-3 w-36" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-5 w-24" />
    </div>
  );
}

/** Service page skeleton: hero + content sections */
export function ServicePageSkeleton() {
  return (
    <div aria-hidden="true" className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-gray-100 dark:bg-dark-surface-alt" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Skeleton className="h-5 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-5 w-96 mx-auto mb-2" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row rounded-2xl border border-border/60 bg-white dark:bg-dark-surface overflow-hidden"
            >
              <Skeleton className="h-44 w-full md:h-auto md:w-56 shrink-0" />
              <div className="flex-1 p-6 sm:p-8">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="grid sm:grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Contact form skeleton */
export function ContactFormSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Skeleton variant="rounded" className="h-14" />
        <Skeleton variant="rounded" className="h-14" />
      </div>
      <Skeleton variant="rounded" className="h-14" />
      <div className="grid sm:grid-cols-2 gap-5">
        <Skeleton variant="rounded" className="h-14" />
        <Skeleton variant="rounded" className="h-14" />
      </div>
      <Skeleton variant="rounded" className="h-32" />
      <Skeleton variant="rounded" className="h-14 w-48" />
    </div>
  );
}

/** Page hero skeleton */
export function HeroSkeleton({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden py-20 sm:py-28 md:py-36 ${className}`}>
      <div className="absolute inset-0 bg-gray-100 dark:bg-dark-surface-alt" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <Skeleton className="h-5 w-28 mx-auto mb-4" />
        <Skeleton className="h-10 w-72 mx-auto mb-6" />
        <Skeleton className="h-5 w-96 mx-auto mb-2" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>
    </div>
  );
}

/** Generic section skeleton with header + grid */
export function GridSectionSkeleton({
  columns = 3,
  rows = 1,
  className = "",
}: {
  columns?: number;
  rows?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`px-4 sm:px-6 py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <Skeleton className="h-8 w-48 mx-auto mb-4" />
        <Skeleton className="h-4 w-80 mx-auto mb-10" />
        <div
          className={`grid gap-8 ${
            columns === 1
              ? "grid-cols-1"
              : columns === 2
                ? "sm:grid-cols-2"
                : columns === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2 lg:grid-cols-3"
          } stagger-children`}
        >
          {Array.from({ length: columns * rows }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
