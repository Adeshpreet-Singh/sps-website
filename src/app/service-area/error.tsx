"use client";

import RouteError from "@/components/RouteError";

export default function ServiceAreaError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Couldn't load the service area page"
      description="Something went wrong. We serve all of Metro Vancouver and the Lower Mainland — try again or contact us to confirm we cover your area."
      secondaryHref="/contact"
      secondaryLabel="Contact Us"
    />
  );
}
