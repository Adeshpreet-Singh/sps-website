/**
 * @fileoverview Contact page client component.
 *
 * Renders:
 * - Hero section with background image and breadcrumb
 * - Contact info cards (phone, email, hours, address, message)
 * - JSON-LD LocalBusiness structured data for rich search results
 * - Dynamically loaded ContactForm (code-split, no SSR)
 * - Trust signals section with key differentiators
 *
 * The ContactForm is loaded via next/dynamic with ssr:false because it
 * contains form state and validation that only runs client-side. A
 * ContactFormSkeleton is shown during the loading phase.
 *
 * ContactCard is a polymorphic wrapper — renders as <a> when href is
 * provided, <div> otherwise.
 */

"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/data";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Building,
  MessageCircle,
  Shield,
  BadgeCheck,
  Star,
  ChevronDown,
} from "lucide-react";
import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "@/components/Skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Breadcrumb from "@/components/Breadcrumb";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactForm = dynamic(() => import("./ContactForm"), {
  loading: () => <ContactFormSkeleton />,
  ssr: false,
});

/* ---------- JSON-LD for Contact Page ---------- */
function ContactJsonLd() {
  const jsonLd = {
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.email,
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ---------- Contact info card ---------- */
function ContactCard({
  icon: Icon,
  label,
  children,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href, className: "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-surface rounded-xl", "aria-label": `${label}: ${typeof children === "string" ? children : ""}` } : { className: "group" })}
    >
      <div className="flex items-start gap-4 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 transition-all duration-[400ms] hover:shadow-card-hover dark:hover:shadow-dark-card-hover hover:border-accent/30 card-tilt gradient-border-shine focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-dark-surface motion-reduce:transition-none motion-reduce:transform-none">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center shrink-0 shadow-md shadow-navy/20 dark:shadow-none transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none">
          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-dark-text-muted mb-1">
            {label}
          </p>
          <div className="text-text dark:text-dark-text font-medium group-hover:text-accent transition-colors break-words">
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

/* ---------- Trust signal item ---------- */
function TrustSignal({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-text-muted dark:text-dark-text-muted rounded-xl border border-border/50 dark:border-dark-border/50 bg-white dark:bg-dark-surface p-3 transition-all duration-300 hover:border-accent/30 hover:shadow-sm motion-reduce:transition-none">
      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none">
        <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
}

export default function ContactClient() {
  const [formRef, formVisible] = useScrollReveal();
  const [infoRef, infoVisible] = useScrollReveal();
  const [trustRef, trustVisible] = useScrollReveal();

  const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.province} ${siteConfig.address.postal}`;

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Contact Us", path: "/contact" }]} />
      <ContactJsonLd />

      {/* Hero — background image */}
      <section
        aria-label="Contact hero"
        className="relative overflow-hidden text-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6"
      >
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop"
          alt="Professional SPS technician ready to assist with appliance installation and plumbing inquiries"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy/70" />
        {/* Animated gradient overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-navy-light/20 gradient-animated" />
        {/* Decorative shapes */}
        <div aria-hidden="true" className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl animate-parallax-float" />
        <div aria-hidden="true" className="absolute bottom-[-15%] left-[-5%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-white/[0.03] blur-3xl animate-parallax-float delay-500" />
        <div aria-hidden="true" className="absolute top-20 left-[15%] w-3 h-3 rounded-full bg-accent/30 animate-dot-pulse" />
        <div aria-hidden="true" className="absolute top-36 right-[20%] w-2 h-2 rounded-full bg-white/20 animate-dot-pulse delay-300" />
        <div aria-hidden="true" className="absolute bottom-20 left-[30%] w-4 h-4 rounded-full bg-accent/20 animate-dot-pulse delay-500" />
        {/* Horizontal accent lines */}
        <div aria-hidden="true" className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div aria-hidden="true" className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Breadcrumb items={[{ name: "Contact Us", path: "/contact" }]} />
          <span className="inline-block rounded-full bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 mb-6 animate-fade-in border border-white/10 motion-reduce:transition-none">
            We&apos;re Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 tracking-tight animate-slide-up">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Ready to schedule your installation? Fill out the form below and
            we&apos;ll get back to you within 24 hours.
          </p>

          {/* Quick contact options */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <a
              href={siteConfig.phoneLink}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg btn-press btn-shimmer motion-reduce:transition-none motion-reduce:transform-none"
              aria-label={`Call us at ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={siteConfig.emailLink}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 btn-press motion-reduce:transition-none motion-reduce:transform-none"
              aria-label={`Email us at ${siteConfig.email}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email Us
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 animate-scroll-hint" aria-hidden="true">
            <ChevronDown className="w-5 h-5 mx-auto text-white/40" />
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section
        aria-label="Contact form and information"
        className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Contact Form */}
          <div ref={formRef} className={`lg:col-span-3 reveal-hidden ${formVisible ? "reveal-visible" : ""}`}>
            <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 sm:p-6 md:p-8 lg:p-10 shadow-card dark:shadow-none focus-within-highlight relative overflow-hidden">
              {/* Subtle gradient accent at top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent opacity-60" />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-text dark:text-dark-text">
                    Request a Quote
                  </h2>
                </div>
              </div>
              <p id="form-instructions" className="text-text-muted dark:text-dark-text-muted text-sm mb-8">
                Fields marked with <span className="text-error">*</span> are
                required. We typically respond within 24 hours.
              </p>
              <ErrorBoundary
                fallback={
                  <div className="text-center py-12 text-text-muted dark:text-dark-text-muted">
                    <p className="font-medium mb-2">The contact form couldn&apos;t load.</p>
                    <p className="text-sm">Please call us directly at{" "}
                      <a href={siteConfig.phoneLink} className="text-accent-safe font-semibold hover:underline">
                        {siteConfig.phone}
                      </a>
                    </p>
                  </div>
                }
              >
                <ContactForm />
              </ErrorBoundary>
            </div>

            {/* Trust signals below form */}
            <div ref={trustRef} className={`mt-8 reveal-hidden ${trustVisible ? "reveal-visible" : ""}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="list" aria-label="Trust signals">
                <div role="listitem"><TrustSignal icon={Shield} label="Licensed & Insured" /></div>
                <div role="listitem"><TrustSignal icon={BadgeCheck} label="Warranty-Compliant" /></div>
                <div role="listitem"><TrustSignal icon={Star} label={`${siteConfig.stats.rating}★ Rating`} /></div>
              </div>
            </div>
          </div>

          {/* Right — Contact Image + Info Cards */}
          <div ref={infoRef} className={`lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-8 self-start stagger-children reveal-left-hidden ${infoVisible ? "reveal-left-visible" : ""}`}>
            {/* Contact image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl lg:h-72 group img-zoom-hover">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop"
                alt="SPS Installation service van and professional tools ready for appliance installation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
                sizes="(max-width: 1024px) 100vw, 400px"
                loading="lazy"
              />
              {/* Overlay with quick stats */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                <div className="flex items-center justify-between text-white text-sm">
                  <span className="font-medium">
                    {siteConfig.stats.installations} Installations
                  </span>
                  <span className="font-medium">
                    {siteConfig.stats.rating}★ Rating
                  </span>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-heading font-bold text-text dark:text-dark-text">
                Contact Information
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-border dark:from-dark-border to-transparent" />
            </div>

            <ContactCard
              icon={Phone}
              label="Phone"
              href={siteConfig.phoneLink}
            >
              {siteConfig.phone}
            </ContactCard>

            <ContactCard
              icon={Mail}
              label="Email"
              href={siteConfig.emailLink}
            >
              {siteConfig.email}
            </ContactCard>

            <ContactCard icon={Clock} label="Hours">
              {siteConfig.hours}
            </ContactCard>

            <ContactCard icon={MapPin} label="Service Area">
              Metro Vancouver &amp; Lower Mainland, B.C.
            </ContactCard>

            <ContactCard icon={Building} label="Address">
              {fullAddress}
            </ContactCard>

            {/* Response time badge */}
            <div className="flex items-center gap-3 rounded-xl border border-accent/20 dark:border-accent/30 bg-accent/5 dark:bg-accent/10 px-5 py-4 badge-glow cursor-default">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 icon-bounce">
                <Clock className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text dark:text-dark-text">
                  Fast Response
                </p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
