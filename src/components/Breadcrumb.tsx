import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

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
            className="text-white/70 hover:text-white transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center gap-2">
            <span className="text-white/40" aria-hidden="true">
              /
            </span>
            {idx === items.length - 1 ? (
              <span className="text-white font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-white/70 hover:text-white transition-colors"
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
