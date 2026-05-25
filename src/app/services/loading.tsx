import { ServicePageSkeleton } from "@/components/Skeleton";

export default function ServicesLoading() {
  return (
    <div role="status" aria-label="Loading services">
      <span className="sr-only">Loading services...</span>
      <ServicePageSkeleton />
    </div>
  );
}
