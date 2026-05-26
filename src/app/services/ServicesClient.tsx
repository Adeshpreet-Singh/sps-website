/**
 * @fileoverview Services hub page client component.
 *
 * Renders:
 * 1. Hero — dark gradient with headline and trust badges
 * 2. Service cards — 4 cards with images, descriptions, trust highlights,
 *    and "Learn More" links to individual service detail pages
 * 3. Why Us section — feature grid highlighting company differentiators
 * 4. Process overview — numbered steps (inline, not using process step data)
 * 5. CTA Banner — contact call-to-action
 *
 * Service highlights (trust badges per service) are defined locally.
 * JSON-LD structured data includes LocalBusiness with OfferCatalog.
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { services, siteConfig, serviceImageAlts, serviceImages, whyUsFeatures } from "@/lib/data";
import { iconMap } from "@/lib/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";


/* Service highlights — trust badges per service */
const serviceHighlights: Record<string, string[]> = {
  "appliance-installation": [
    "Warranty-compliant installs",
    "All major retailers",
    "Same-day availability",
  ],
  plumbing: [
    "Licensed plumbers",
    "Code-compliant work",
    "Free estimates",
  ],
  residential: [
    "Condo & strata friendly",
    "Clean, tidy work",
    "Post-install walkthrough",
  ],
  commercial: [
    "Volume scheduling",
    "Developer coordination",
    "Minimal disruption",
  ],
};

/* ---------- JSON-LD Structured Data ---------- */
const SERVICES_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.province,
    postalCode: siteConfig.address.postal,
    addressCountry: siteConfig.address.country,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 49.28,
      longitude: -122.55,
    },
    geoRadius: "50000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SPS Installation Services",
    itemListElement: services.map((service, idx) => ({
      "@type": "Offer",
      position: idx + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${siteConfig.url}/services/${service.slug}`,
      },
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.stats.rating,
    bestRating: "5",
    ratingCount: "50",
  },
};

const TRUST_ITEMS = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Clock, label: "On-Time Guarantee" },
  { icon: Star, label: `${siteConfig.stats.rating}★ Rating` },
];

function ServicesJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
    />
  );
}

/* ---------- Service Highlight Badge ---------- */
function HighlightBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-safe">
      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ---------- Trust Indicators ---------- */
function TrustBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-white/70">
          <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ServicesClient() {
  const [servicesListRef, servicesListVisible] = useScrollReveal();
  const [whyRef, whyVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();
  const [heroRef, heroVisible] = useLazyVideo<HTMLDivElement>();

  return (
    <div className="min-h-screen">
      <ServicesJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Services", path: "/services" }]} />

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        aria-label="Services hero"
        className="relative overflow-hidden px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white"
      >
        {/* Background video — deferred until hero is in viewport */}
        {heroVisible && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            src="https://videos.pexels.com/video-files/5765849/5765849-uhd_2560_1440_25fps.mp4"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/60" />

        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70 animate-fade-in">
            What We Do
          </span>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-slide-up">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl animate-slide-up delay-200">
            Two specialties, one call. Whether you just bought a new appliance
            or are renovating your entire bathroom, our certified technicians
            handle both.
          </p>

          {/* Trust indicators */}
          <div className="mt-10">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* ── Services List ── */}
      <section aria-label="Services list" className="bg-surface-alt dark:bg-dark-surface-alt px-4 sm:px-6 py-10 sm:py-14 lg:py-20">
        <div ref={servicesListRef} className={`mx-auto flex max-w-5xl flex-col gap-10 reveal-hidden ${servicesListVisible ? "reveal-visible" : ""}`}>
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon];
            const highlights = serviceHighlights[service.slug] ?? [];
            return (
              <article
                key={service.slug}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 dark:border-dark-border/60 bg-white dark:bg-dark-surface shadow-card dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:hover:border-accent/20 card-hover card-tilt reveal-hidden ${servicesListVisible ? "reveal-visible" : ""} reveal-delay-${(idx % 3) + 1}`}
              >
                {/* ── Top: Image ── */}
                {serviceImages[service.slug] && (
                  <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-48 md:h-56 lg:h-64">
                    <Image
                      src={serviceImages[service.slug]}
                      alt={serviceImageAlts[service.slug] ?? service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 animate-image-reveal"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                    {/* Service number badge — decorative */}
                    <span aria-hidden="true" className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-navy shadow-md backdrop-blur-sm">
                      {service.number}
                    </span>
                  </div>
                )}

                <div className="flex flex-col md:flex-row">
                  {/* ── Left: Icon + Number ── */}
                  <div className="flex shrink-0 items-center justify-center gap-3 bg-gradient-to-br from-[#0f1b3d] to-[#1a2760] px-6 py-6 text-white md:flex-col md:px-8 md:w-56 md:py-14">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold tracking-wider text-white/80">
                      Service {service.number}
                    </span>
                  </div>

                  {/* ── Right: Content ── */}
                  <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10 min-w-0">
                    <h2 className="font-heading text-2xl font-bold text-text dark:text-dark-text lg:text-[1.7rem]">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-xl leading-relaxed text-text-muted dark:text-dark-text-muted">
                      {service.description}
                    </p>

                    {/* Highlight badges */}
                    {highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {highlights.map((h) => (
                          <HighlightBadge key={h} label={h} />
                        ))}
                      </div>
                    )}

                    {/* Items in 2 columns */}
                    <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-text-muted dark:text-dark-text-muted"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Learn More */}
                    <div className="mt-8">
                      <Link
                        href={`/services/${service.slug}`}
                        aria-label={`Learn more about ${service.title}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-navy-light hover:gap-3 btn-press btn-shimmer"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section aria-label="Why choose us" className="bg-white dark:bg-dark-surface px-4 sm:px-6 py-10 sm:py-14 lg:py-20">
        <div ref={whyRef} className={`mx-auto max-w-5xl reveal-hidden ${whyVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-center font-heading text-3xl font-bold text-text dark:text-dark-text sm:text-4xl">
            Why Choose SPS?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-muted dark:text-dark-text-muted lg:text-lg">
            We combine expertise with reliability to deliver installations that
            last.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {whyUsFeatures.map(({ icon, title, description }) => {
              const Icon = iconMap[icon];
              return (
              <div
                key={title}
                className="flex flex-col items-center rounded-xl border border-border/60 dark:border-dark-border/60 bg-surface-alt dark:bg-dark-surface-alt p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-md card-hover gradient-border-shine"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 icon-lift">
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-text dark:text-dark-text">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted dark:text-dark-text-muted">
                  {description}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section aria-label="Contact us" className="bg-white dark:bg-dark-surface px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div ref={ctaRef} className={`mx-auto max-w-2xl reveal-hidden ${ctaVisible ? "reveal-visible" : ""}`}>
          <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.04] to-transparent p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:p-10 lg:p-14">
            <h2 className="font-heading text-2xl font-bold text-text dark:text-dark-text sm:text-3xl lg:text-4xl">
              Not sure what you need?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted dark:text-dark-text-muted sm:text-lg">
              Give us a call and we&apos;ll help you figure out the right
              service for your project — no pressure, no obligation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={siteConfig.phoneLink}
                aria-label={`Call us at ${siteConfig.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-accent-dark hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg sm:w-auto btn-press"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border dark:border-dark-border px-8 py-4 text-base font-semibold text-text dark:text-dark-text transition-all hover:bg-surface-alt hover:-translate-y-0.5 active:translate-y-0 sm:w-auto btn-press"
              >
                Contact Us Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
