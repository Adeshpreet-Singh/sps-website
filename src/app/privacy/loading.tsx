/**
 * @fileoverview Privacy Policy page loading skeleton.
 * Shown by Next.js App Router while the page's async components load.
 */

import Skeleton from "@/components/Skeleton";

export default function PrivacyLoading() {
  return (
    <div role="status" aria-label="Loading privacy policy">
      <span className="sr-only">Loading privacy policy...</span>

      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-4 w-32 mx-auto mb-6 bg-white/10" />
          <Skeleton className="h-10 w-64 mx-auto bg-white/10" />
          <Skeleton className="h-4 w-96 mx-auto mt-6 bg-white/10" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl space-y-8">
          <Skeleton className="h-7 w-48" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-7 w-40 mt-8" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
          <ul className="space-y-2 ml-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                <Skeleton className="h-4 w-3/4" />
              </li>
            ))}
          </ul>
          <Skeleton className="h-7 w-44 mt-8" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </section>
    </div>
  );
}
