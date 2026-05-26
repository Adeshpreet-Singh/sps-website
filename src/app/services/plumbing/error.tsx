/**
 * @fileoverview Route-level error boundary for this page.
 * Catches errors during rendering and shows a user-friendly error UI
 * with retry and navigation options.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load plumbing service details",
  description: "Something went wrong while loading this service page. Try again or browse all our services.",
  secondaryHref: "/services",
  secondaryLabel: "All Services",
});
