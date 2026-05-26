/**
 * @fileoverview Dynamic robots.txt generation.
 *
 * Allows all crawlers to index the site while disallowing API routes
 * and Next.js internal paths. Points to the sitemap for crawl discovery.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

// ISR: revalidate robots.txt every 24 hours
export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
