import { HeroSkeleton, GridSectionSkeleton } from "@/components/Skeleton";

/**
 * Global loading state — shown by Next.js App Router while the root
 * layout's children are streaming in.
 */
export default function Loading() {
  return (
    <div className="flex-1" aria-label="Loading page content" role="status">
      <span className="sr-only">Loading...</span>
      <HeroSkeleton />
      <GridSectionSkeleton columns={2} rows={1} />
    </div>
  );
}
