import Skeleton, { HeroSkeleton } from "@/components/Skeleton";

export default function FaqLoading() {
  return (
    <div role="status" aria-label="Loading FAQ">
      <span className="sr-only">Loading FAQ...</span>

      <HeroSkeleton />

      {/* FAQ items skeleton */}
      <section className="px-4 sm:px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-4 w-80 mx-auto mb-12" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" className="h-16 w-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
