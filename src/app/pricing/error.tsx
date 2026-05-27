/**
 * @fileoverview Route-level error boundary for this page.
 * Catches errors during rendering and shows a user-friendly error UI
 * with retry and navigation options.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load pricing",
  description: "Something went wrong while loading our pricing information. You can try again or contact us for a custom quote.",
  secondaryHref: "/contact",
  secondaryLabel: "Get a Quote",
});
