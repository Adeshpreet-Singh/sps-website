import Link from "next/link";
import { siteConfig, services } from "@/lib/data";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Service Area", href: "/service-area" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Logo & About */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                SPS
              </span>
              <span className="ml-2 text-sm font-medium text-white/70">
                Smith Pro Services
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Get in Touch */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Get in Touch
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/60">
              <li>
                <a
                  href={siteConfig.phoneLink}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailLink}
                  className="transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>Metro Vancouver, B.C.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 py-4 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
          <p>
            &copy; {currentYear} {siteConfig.legal.name}. All rights reserved.
          </p>
          <p>Metro Vancouver, B.C., Canada</p>
        </div>
      </div>
    </footer>
  );
}
