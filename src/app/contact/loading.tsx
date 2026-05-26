/**
 * @fileoverview Contact page loading skeleton with form and info card placeholders.
 * Shown by Next.js App Router while the page's async components load.
 */

import Skeleton, { HeroSkeleton, ContactFormSkeleton } from "@/components/Skeleton";

export default function ContactLoading() {
  return (
    <div role="status" aria-label="Loading contact page">
      <span className="sr-only">Loading contact page...</span>
      <HeroSkeleton />

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 -mt-4 sm:-mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Form skeleton */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 via-accent-light/30 to-accent/30" />
              <div className="flex items-center gap-3 mb-2">
                <Skeleton variant="rounded" className="h-10 w-10 shrink-0" />
                <Skeleton className="h-7 w-40" />
              </div>
              <Skeleton className="h-4 w-64 mb-8" />
              <ContactFormSkeleton />
            </div>

            {/* Trust signals skeleton */}
            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Skeleton variant="rounded" className="h-8 w-8 shrink-0" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact info skeleton */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Skeleton variant="rounded" className="h-56 sm:h-64 lg:h-72 w-full" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-40" />
              <div className="flex-1 h-px bg-border dark:bg-dark-border" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5">
                <Skeleton variant="rounded" className="h-11 w-11 shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
            {/* Response badge skeleton */}
            <div className="flex items-center gap-3 rounded-xl border border-accent/10 bg-accent/5 px-5 py-4">
              <Skeleton variant="circle" className="h-10 w-10 shrink-0" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
