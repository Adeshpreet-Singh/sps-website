/**
 * @fileoverview About page loading skeleton with story and values section placeholders.
 * Shown by Next.js App Router while the page's async components load.
 */

import Skeleton, { HeroSkeleton } from "@/components/Skeleton";

export default function AboutLoading() {
  return (
    <div role="status" aria-label="Loading about page">
      <span className="sr-only">Loading about page...</span>
      <HeroSkeleton />

      {/* Story section skeleton */}
      <section className="py-20 md:py-28 bg-surface dark:bg-dark-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3 space-y-6">
              <Skeleton className="h-8 w-40 mb-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton variant="rounded" className="aspect-[3/4]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="bg-surface-alt dark:bg-dark-surface-alt py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-dark-surface rounded-xl p-6 text-center border dark:border-dark-border">
                <Skeleton className="h-10 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
