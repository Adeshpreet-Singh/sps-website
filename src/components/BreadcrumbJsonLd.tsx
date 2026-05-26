/**
 * BreadcrumbJsonLd — Renders a JSON-LD BreadcrumbList script tag.
 *
 * Usage:
 *   <BreadcrumbJsonLd items={[{ name: "About", path: "/about" }]} />
 *
 * "Home" is always prepended automatically as position 1.
 */

import type { BreadcrumbItem } from "@/lib/types";
import { siteConfig } from "@/lib/data";

export default function BreadcrumbJsonLd({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem" as const,
        position: idx + 2,
        name: item.name,
        item: `${siteConfig.url}${item.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
