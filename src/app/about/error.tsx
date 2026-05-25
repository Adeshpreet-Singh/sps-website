"use client";

import RouteError from "@/components/RouteError";

export default function AboutError({
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
      title="Couldn't load the About page"
      description="Something went wrong while loading this section. You can try again or head back to the homepage."
    />
  );
}
