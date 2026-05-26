"use client";

import Link from "next/link";
import { siteConfig, services } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FooterLink {
  label: string;
  href: string;
}

const companyLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerRef, footerVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <footer className="bg-navy dark:bg-dark-surface text-white transition-colors duration-300">
      <div ref={footerRef} className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 reveal-hidden ${footerVisible ? "reveal-visible" : ""}`}>
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 stagger-children">
          {/* Column 1 — Logo & About */}
          <div>
            <Link href="/" className="inline-block group" aria-label="SPS Smith Pro Services — Home">
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(232,122,46,0.4)] icon-bounce inline-block">
                SPS
              </span>
              <span className="ml-2 text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-200">
                Smith Pro Services
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>

          {/* Column 2 — Services */}
          <nav aria-labelledby="footer-services">
            <h3 id="footer-services" className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block py-2.5 text-sm text-white/70 transition-all duration-200 hover:text-accent hover:translate-x-1 motion-reduce:transition-none link-underline min-h-[44px] flex items-center"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Company */}
          <nav aria-labelledby="footer-company">
            <h3 id="footer-company" className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2.5 text-sm text-white/70 transition-all duration-200 hover:text-accent hover:translate-x-1 motion-reduce:transition-none link-underline min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Get in Touch */}
          <nav aria-labelledby="footer-contact">
            <h3 id="footer-contact" className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Get in Touch
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/70">
              <li>
                <a
                  href={siteConfig.phoneLink}
                  aria-label={`Call us at ${siteConfig.phone}`}
                  className="block py-2.5 transition-all duration-200 hover:text-accent hover:translate-x-1 motion-reduce:transition-none link-underline min-h-[44px] flex items-center"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailLink}
                  aria-label={`Email us at ${siteConfig.email}`}
                  className="block py-2.5 transition-all duration-200 hover:text-accent hover:translate-x-1 motion-reduce:transition-none link-underline min-h-[44px] flex items-center"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-white/80">Metro Vancouver, B.C.</li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 dark:border-dark-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 py-4 text-center text-xs text-white/70 dark:text-dark-text-muted sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
          <p>
            &copy; {currentYear} {siteConfig.legal.name}. All rights reserved.
          </p>
          <p>Metro Vancouver, B.C., Canada</p>
        </div>
      </div>
    </footer>
  );
}
