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
              {/* Section label skeleton */}
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-1 w-10 rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-8 w-56 mb-6" />
              {/* Quote skeleton */}
              <div className="pl-6 border-l-2 border-border dark:border-dark-border">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
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
              {/* Decorative element skeleton */}
              <div className="hidden lg:flex items-center gap-3 mt-6 pl-4">
                <Skeleton className="h-px w-8" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="bg-surface-alt dark:bg-dark-surface-alt py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Section divider skeleton */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-border dark:bg-dark-border" />
            <Skeleton className="h-3 w-24" />
            <div className="flex-1 h-px bg-border dark:bg-dark-border" />
          </div>
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

      {/* Values skeleton */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-28 bg-navy-dark">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Skeleton className="h-px w-8 bg-white/10" />
              <Skeleton className="h-3 w-20 bg-white/10" />
              <Skeleton className="h-px w-8 bg-white/10" />
            </div>
            <Skeleton className="h-8 w-32 mx-auto bg-white/10" />
            <Skeleton className="h-4 w-64 mx-auto mt-4 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
                <Skeleton variant="rounded" className="h-12 w-12 mb-4 bg-white/10" />
                <Skeleton className="h-5 w-24 mb-2 bg-white/10" />
                <Skeleton className="h-3 w-full bg-white/10" />
                <Skeleton className="h-3 w-5/6 mt-1 bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership skeleton */}
      <section className="py-10 sm:py-14 md:py-20 lg:py-28 bg-surface dark:bg-dark-surface">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Skeleton className="h-px w-8" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-px w-8" />
            </div>
            <Skeleton className="h-8 w-72 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center p-8 rounded-xl border dark:border-dark-border">
                <Skeleton variant="circle" className="w-20 h-20 mb-4" />
                <Skeleton className="h-5 w-28 mb-2" />
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-0.5 w-8 mt-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
