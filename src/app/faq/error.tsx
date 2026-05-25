"use client";

import RouteError from "@/components/RouteError";

export default function FaqError({
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
      title="Couldn't load the FAQ"
      description="Something went wrong while loading the FAQ page. Try again or contact us directly with your questions."
      secondaryHref="/contact"
      secondaryLabel="Contact Us"
    />
  );
}
