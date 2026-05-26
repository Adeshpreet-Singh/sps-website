/**
 * @fileoverview Route-level error boundary for this page.
 * Catches errors during rendering and shows a user-friendly error UI
 * with retry and navigation options.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load the service area page",
  description: "Something went wrong. We serve all of Metro Vancouver and the Lower Mainland — try again or contact us to confirm we cover your area.",
  secondaryHref: "/contact",
  secondaryLabel: "Contact Us",
});
