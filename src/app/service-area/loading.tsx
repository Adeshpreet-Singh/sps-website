import Skeleton from "@/components/Skeleton";

export default function ServiceAreaLoading() {
  return (
    <div role="status" aria-label="Loading service area">
      <span className="sr-only">Loading service area...</span>

      {/* Hero skeleton */}
      <div className="relative overflow-hidden py-20 sm:py-28 md:py-36">
        <div className="absolute inset-0 bg-gray-100 dark:bg-dark-surface-alt" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <Skeleton className="h-5 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-72 mx-auto mb-6" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
      </div>

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
