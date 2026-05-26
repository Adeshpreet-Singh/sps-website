/**
 * @fileoverview Route-level error boundary.
 *
 * Catches errors thrown during rendering of page content (inside the
 * root layout). Uses the shared createRouteErrorPage factory from
 * RouteError.tsx for consistent error UI across all routes.
 *
 * For errors in the root layout itself (Navbar, Footer, etc.), see
 * global-error.tsx.
 */

"use client";

import { createRouteErrorPage } from "@/components/RouteError";

export default createRouteErrorPage({});
