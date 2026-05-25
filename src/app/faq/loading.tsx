import Skeleton from "@/components/Skeleton";

export default function FAQLoading() {
  return (
    <div role="status" aria-label="Loading FAQ">
      <span className="sr-only">Loading FAQ...</span>

      {/* Hero skeleton */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-dark-surface-alt py-20 sm:py-28 md:py-36">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <Skeleton className="h-5 w-28 mx-auto mb-4" />
          <Skeleton className="h-10 w-80 mx-auto mb-6" />
          <Skeleton className="h-5 w-96 mx-auto mb-2" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
      </div>

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
