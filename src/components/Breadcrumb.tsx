/**
 * @fileoverview Visual breadcrumb navigation.
 *
 * Renders a horizontal breadcrumb trail with "/" separators. The last item
 * is rendered as plain text with aria-current="page"; all others are links.
 * "Home" is always the first item (hardcoded).
 *
 * Paired with BreadcrumbJsonLd for structured data — use both together
 * for visual + SEO breadcrumbs.
 *
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { name: "Services", path: "/services" },
 *   { name: "Plumbing", path: "/services/plumbing" },
 * ]} />
 * ```
 */

import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/types";

export default function Breadcrumb({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors motion-reduce:transition-none py-1 min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
          >
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={item.path} className="flex items-center gap-2">
            <span className="text-white/60" aria-hidden="true">
              /
            </span>
            {idx === items.length - 1 ? (
              <span className="text-white font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className="text-white/70 hover:text-white transition-colors motion-reduce:transition-none py-1 min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
