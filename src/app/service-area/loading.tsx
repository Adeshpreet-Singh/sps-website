import Skeleton, { HeroSkeleton } from "@/components/Skeleton";

export default function ServiceAreaLoading() {
  return (
    <div role="status" aria-label="Loading service area">
      <span className="sr-only">Loading service area...</span>

      <HeroSkeleton />

      {/* Map + cities skeleton */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <Skeleton variant="rounded" className="h-80 w-full mb-10" />
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 14 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
