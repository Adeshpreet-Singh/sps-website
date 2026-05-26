/**
 * @fileoverview Route-level error boundary for this page.
 * Catches errors during rendering and shows a user-friendly error UI
 * with retry and navigation options.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({
  title: "Couldn't load the FAQ",
  description: "Something went wrong while loading the FAQ page. Try again or contact us directly with your questions.",
  secondaryHref: "/contact",
  secondaryLabel: "Contact Us",
});
