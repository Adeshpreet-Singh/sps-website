import { ServicePageSkeleton } from "@/components/Skeleton";

export default function ServiceDetailLoading() {
  return (
    <div role="status" aria-label="Loading service details">
      <span className="sr-only">Loading service details...</span>
      <ServicePageSkeleton />
    </div>
  );
}
