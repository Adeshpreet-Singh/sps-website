/**
 * BreadcrumbJsonLd — Renders a JSON-LD BreadcrumbList script tag.
 *
 * Usage:
 *   <BreadcrumbJsonLd items={[{ name: "About", path: "/about" }]} />
 *
 * "Home" is always prepended automatically as position 1.
 */

const BASE_URL = "https://spsinstallation.com";

interface BreadcrumbItem {
  name: string;
  /** Path relative to the site root, e.g. "/about" or "/services/plumbing" */
  path: string;
}

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
        item: BASE_URL,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem" as const,
        position: idx + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
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
