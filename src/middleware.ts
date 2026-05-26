/**
 * @fileoverview Next.js middleware for URL normalization.
 *
 * Handles legacy URL redirects to maintain SEO juice and prevent 404s
 * from old site migrations:
 * - /index → / (301)
 * - /index.html → / (301)
 * - /:path*.html → /:path* (301, strips .html extension)
 *
 * The matcher config limits this middleware to only the affected routes,
 * avoiding unnecessary processing on every request.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Redirect /index to /
  if (url.pathname === "/index") {
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  // Redirect /index.html to /
  if (url.pathname === "/index.html") {
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }

  // Redirect .html extensions
  if (url.pathname.endsWith(".html")) {
    url.pathname = url.pathname.replace(/\.html$/, "");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/index",
    "/index.html",
    "/:path*.html",
  ],
};
