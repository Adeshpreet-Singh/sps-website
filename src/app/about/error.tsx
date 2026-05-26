/**
 * @fileoverview Route-level error boundary for this page.
 * Catches errors during rendering and shows a user-friendly error UI
 * with retry and navigation options.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load the About page",
  description: "Something went wrong while loading this section. You can try again or head back to the homepage.",
});
