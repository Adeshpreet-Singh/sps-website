/**
 * @fileoverview Site-wide footer component.
 *
 * Renders:
 * - Trust badges bar (Licensed & Insured, Hours, Location)
 * - 4-column grid: Logo/About, Services links, Company links, Contact info
 * - Legal links (Privacy Policy, Terms of Service)
 * - Copyright notice with dynamic year
 * - Scroll-to-top button
 *
 * Uses useScrollReveal for entrance animation when footer enters viewport.
 */

"use client";

import { useCallback } from "react";
import Link from "next/link";
import { siteConfig, services } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Shield,
  Clock,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

const companyLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

/** Memoized current year — only recalculates once per module load (SSR/CSR). */
const currentYear = new Date().getFullYear();

export default function Footer() {
  const [footerRef, footerVisible] = useScrollReveal({ threshold: 0.1 });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="relative bg-navy dark:bg-dark-surface text-white transition-colors duration-300">
      {/* Decorative gradient line at top */}
      <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-accent" />

      {/* Trust badges bar */}
      <div className="border-b border-white/10 dark:border-dark-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 sm:gap-10">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>Licensed &amp; Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>Mon – Sat, 8 AM – 6 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>Metro Vancouver, B.C.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div
        ref={footerRef}
        className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 reveal-hidden ${
          footerVisible ? "reveal-visible" : ""
        }`}
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {/* Column 1 — Logo, About & Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block group"
              aria-label="SPS Smith Pro Services — Home"
            >
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(232,122,46,0.4)] icon-bounce inline-block">
                SPS
              </span>
              <span className="ml-2 text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">
                Smith Pro Services
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/smithproservices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-300 hover:bg-accent hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-accent/25 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/smithproservices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-300 hover:bg-accent hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-accent/25 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://g.co/kgs/smithproservices"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View our Google Business Profile"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-300 hover:bg-accent hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-accent/25 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Services */}
          <nav aria-labelledby="footer-services">
            <h3
              id="footer-services"
              className="text-sm font-semibold uppercase tracking-wider text-white/90"
            >
              Services
            </h3>
            <ul className="mt-3 flex flex-col gap-1 stagger-children">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block py-2 text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:transform-none link-underline min-h-[44px] flex items-center animate-fade-in"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Company */}
          <nav aria-labelledby="footer-company">
            <h3
              id="footer-company"
              className="text-sm font-semibold uppercase tracking-wider text-white/90"
            >
              Company
            </h3>
            <ul className="mt-3 flex flex-col gap-1 stagger-children">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 text-sm text-white/70 transition-all duration-300 hover:text-accent hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:transform-none link-underline min-h-[44px] flex items-center animate-fade-in"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Get in Touch */}
          <nav aria-labelledby="footer-contact">
            <h3
              id="footer-contact"
              className="text-sm font-semibold uppercase tracking-wider text-white/90"
            >
              Get in Touch
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/70">
              <li>
                <a
                  href={siteConfig.phoneLink}
                  aria-label={`Call us at ${siteConfig.phone}`}
                  className="flex items-center gap-2.5 py-2 transition-all duration-300 hover:text-accent hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none min-h-[44px]"
                >
                  <Phone
                    className="h-4 w-4 text-accent flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailLink}
                  aria-label={`Email us at ${siteConfig.email}`}
                  className="flex items-center gap-2.5 py-2 transition-all duration-300 hover:text-accent hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none min-h-[44px]"
                >
                  <Mail
                    className="h-4 w-4 text-accent flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 py-2">
                <MapPin
                  className="h-4 w-4 text-accent flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.province}{" "}
                  {siteConfig.address.postal}
                </span>
              </li>
            </ul>

            {/* Quick CTA */}
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm motion-reduce:transition-none motion-reduce:transform-none btn-press btn-shimmer"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 dark:border-dark-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-4 text-center text-xs text-white/70 dark:text-dark-text-muted sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p>
              &copy; {currentYear} {siteConfig.legal.name}. All rights
              reserved.
            </p>
            <span className="hidden sm:inline text-white/30">|</span>
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-accent transition-colors duration-300 motion-reduce:transition-none py-1 min-h-[44px] inline-flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p>Metro Vancouver, B.C., Canada</p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all duration-300 hover:bg-accent hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-accent/25 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
