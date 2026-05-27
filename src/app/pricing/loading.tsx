/**
 * @fileoverview Pricing page loading skeleton with tier card and comparison table placeholders.
 * Shown by Next.js App Router while the page's async components load.
 */

import Skeleton, { HeroSkeleton } from "@/components/Skeleton";

export default function PricingLoading() {
  return (
    <div role="status" aria-label="Loading pricing">
      <span className="sr-only">Loading pricing...</span>
      <HeroSkeleton />

      {/* Pricing tiers skeleton */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface p-6 sm:p-8">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-6" />
                <Skeleton className="h-12 w-28 mb-6" />
                <div className="space-y-3 mb-8">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Skeleton variant="circle" className="h-5 w-5 shrink-0" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
                <Skeleton variant="rounded" className="h-12 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table skeleton */}
      <section className="py-16 sm:py-20 bg-surface-alt dark:bg-dark-surface-alt px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-64 mx-auto mb-10" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-6 flex-1" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
