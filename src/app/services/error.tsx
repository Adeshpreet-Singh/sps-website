"use client";

import RouteError from "@/components/RouteError";

export default function ServicesError({
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
      title="Couldn't load services"
      description="Something went wrong while loading our services. You can try again or give us a call:"
      showPhone
    />
  );
}
