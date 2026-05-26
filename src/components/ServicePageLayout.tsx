/**
 * @fileoverview Shared layout for all service detail pages.
 *
 * Renders the full service page structure:
 * 1. JSON-LD structured data (Service, FAQ, HowTo, Breadcrumb)
 * 2. Hero section with background image and breadcrumb
 * 3. "What's Included" section with service items checklist
 * 4. "Our Process" section with numbered steps and images
 * 5. FAQ accordion section
 * 6. CTA banner section
 *
 * Used by the createServicePage factory — each service page only needs
 * to provide its unique metadata, FAQs, and section subtitles.
 *
 * @see {@link /lib/createServicePage.tsx} for the factory function
 */

import type { FaqItem, Service } from "@/lib/data";
import { siteConfig } from "@/lib/data";
import type { ProcessStep } from "@/lib/types";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqAccordion from "@/components/FaqAccordion";

interface ServicePageLayoutProps {
  service: Service;
  heroImageUrl: string;
  processSteps: ProcessStep[];
  faqs: FaqItem[];
  includedSubtitle: string;
  processSubtitle: string;
  ctaDescription: string;
}

/**
 * Generates JSON-LD structured data for a service page.
 */
function ServiceJsonLd({
  service,
  processSteps,
  faqs,
}: {
  service: Service;
  processSteps: ProcessStep[];
  faqs: FaqItem[];
}) {
  const serviceUrl = `${siteConfig.url}/services/${service.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: serviceUrl,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phoneLink.replace("tel:", ""),
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 49.28, longitude: -122.55 },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.items.map((item: string, idx: number) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: service.title,
    description: service.description,
    step: processSteps.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title,
      text: s.description,
      image: s.image,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbJsonLd items={[{ name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}

/**
 * Shared layout for all service detail pages.
 * Renders hero, what's included, process steps, FAQ, and CTA sections.
 */
export default function ServicePageLayout({
  service,
  heroImageUrl,
  processSteps,
  faqs,
  includedSubtitle,
  processSubtitle,
  ctaDescription,
}: ServicePageLayoutProps) {
  return (
    <div className="flex flex-col">
      <ServiceJsonLd service={service} processSteps={processSteps} faqs={faqs} />

      {/* Hero */}
      <section
        aria-label="Service hero"
        className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center text-white"
      >
        <div aria-hidden="true" className="absolute inset-0">
          <Image src={heroImageUrl} alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Breadcrumb items={[{ name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]} />
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-accent-light backdrop-blur animate-fade-in">
            Service #{service.number}
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slide-up">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 lg:text-xl animate-slide-up delay-200">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section aria-label="What's included" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent animate-dot-pulse" />
              <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm">
                What&apos;s Included
              </p>
            </div>
            <h2 className="text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              {includedSubtitle}
            </p>
          </div>
          <div className="mt-12 rounded-2xl bg-white dark:bg-dark-surface p-6 shadow-card dark:shadow-dark-card dark:border dark:border-dark-border sm:p-8 lg:p-10 hover:shadow-card-hover dark:hover:shadow-dark-card-hover transition-shadow duration-300">
            <ul className="grid gap-4 sm:grid-cols-2 stagger-check list-none p-0 m-0">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-surface-alt hover:translate-x-1 group"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-all duration-200 group-hover:bg-accent/20 group-hover:scale-110 icon-bounce">
                    <Check className="h-4 w-4 text-accent" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-text dark:text-dark-text transition-colors duration-200 group-hover:text-accent">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* Our Process */}
      <section aria-label="Our process" className="bg-surface-alt dark:bg-dark-surface-alt px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent animate-dot-pulse" />
              <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm">
                Our Process
              </p>
            </div>
            <h2 className="text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              {processSubtitle}
            </p>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border dark:bg-dark-border lg:block" aria-hidden="true" />
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border dark:bg-dark-border lg:hidden" aria-hidden="true" />
            <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6 list-none p-0 m-0">
              {processSteps.map(({ step, title, description, icon: Icon, image }, idx) => (
                <li
                  key={step}
                  className="group relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center animate-slide-up"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/30">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="relative mt-2 h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 overflow-hidden rounded-xl lg:mt-4 group">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 639px) 64px, (max-width: 1023px) 80px, 96px"
                    />
                  </div>
                  <div className="lg:mt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-safe">
                      Step {step}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-navy dark:text-dark-text">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted dark:text-dark-text-muted">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQs */}
      <section aria-label="Frequently asked questions" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              Common questions about our {service.title.toLowerCase()} service.
            </p>
          </div>
          <FaqAccordion faqs={faqs} />
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section
        aria-label="Get started"
        className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 text-center text-white"
      >
        <ScrollReveal className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Ready to get started?</h2>
          <p className="mt-5 text-lg text-white/70 lg:text-xl">{ctaDescription}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 btn-press btn-shimmer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 btn-press btn-shimmer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
            >
              View All Services
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
