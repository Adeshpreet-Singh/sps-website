import Skeleton, { HeroSkeleton, TestimonialSkeleton } from "@/components/Skeleton";

export default function ReviewsLoading() {
  return (
    <div role="status" aria-label="Loading reviews">
      <span className="sr-only">Loading reviews...</span>
      <HeroSkeleton />

      {/* Rating summary skeleton */}
      <section className="-mt-12 relative z-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl bg-white dark:bg-dark-surface p-6 sm:p-8 shadow-lg ring-1 ring-border dark:ring-dark-border">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-7 w-7 sm:h-8 sm:w-8" />
                  ))}
                </div>
                <Skeleton className="h-14 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-48 mx-auto mb-4" />
                <Skeleton className="h-8 w-44 mx-auto rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials grid skeleton */}
      <section className="bg-gradient-to-b from-surface-alt to-white dark:from-dark-surface-alt dark:to-dark-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
