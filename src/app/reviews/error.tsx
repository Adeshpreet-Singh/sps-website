"use client";

import RouteError from "@/components/RouteError";

export default function ReviewsError({
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
      title="Couldn't load reviews"
      description="Something went wrong while loading customer reviews. You can try again or check our reviews on Google or Homestars directly."
    />
  );
}
