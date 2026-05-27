/**
 * @fileoverview Route-level error boundary for the Terms of Service page.
 * Catches errors during rendering and shows a user-friendly error UI
 * with retry and navigation options.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load the Terms of Service",
  description: "Something went wrong while loading this page. You can try again or head back to the homepage.",
});
