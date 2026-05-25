"use client";

import RouteError from "@/components/RouteError";

export default function ContactError({
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
      title="Couldn't load the contact form"
      description="Something went wrong while loading the contact page. You can try again, or reach us directly:"
      showPhone
    />
  );
}
