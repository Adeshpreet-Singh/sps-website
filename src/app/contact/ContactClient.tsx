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
} from "lucide-react";
import dynamic from "next/dynamic";
import { ContactFormSkeleton } from "@/components/Skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
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
      {...(href ? { href, className: "group block", "aria-label": `${label}: ${typeof children === "string" ? children : ""}` } : { className: "group" })}
    >
      <div className="flex items-start gap-4 rounded-xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5 transition-all duration-300 hover:shadow-card-hover dark:hover:border-accent/20 hover:border-accent/20 hover:-translate-y-0.5 card-tilt gradient-border-shine">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center shrink-0 shadow-md shadow-navy/20 dark:shadow-none transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
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

export default function ContactPage() {
  const [formRef, formVisible] = useScrollReveal();
  const [infoRef, infoVisible] = useScrollReveal();

  const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.province} ${siteConfig.address.postal}`;

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Contact Us", path: "/contact" }]} />
      <ContactJsonLd />

      {/* Hero — background image */}
      <section
        aria-label="Contact hero"
        className="relative overflow-hidden text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6"
      >
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop"
          alt="Professional SPS technician ready to assist with appliance installation and plumbing inquiries"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block rounded-full bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 mb-6 animate-fade-in">
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
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg btn-press btn-shimmer"
              aria-label={`Call us at ${siteConfig.phone}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={siteConfig.emailLink}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 btn-press"
              aria-label={`Email us at ${siteConfig.email}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section
        aria-label="Contact form and information"
        className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 -mt-4 sm:-mt-8"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Contact Form */}
          <div ref={formRef} className={`lg:col-span-3 reveal-hidden ${formVisible ? "reveal-visible" : ""}`}>
            <div className="rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-4 sm:p-6 md:p-8 lg:p-10 shadow-card dark:shadow-none focus-within-highlight">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="h-6 w-6 text-accent" aria-hidden="true" />
                <h2 className="text-2xl font-heading font-bold text-text dark:text-dark-text">
                  Request a Quote
                </h2>
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
                      <a href={siteConfig.phoneLink} className="text-accent font-semibold hover:underline">
                        {siteConfig.phone}
                      </a>
                    </p>
                  </div>
                }
              >
                <ContactForm />
              </ErrorBoundary>
            </div>
          </div>

          {/* Right — Contact Image + Info Cards */}
          <div ref={infoRef} className={`lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-8 self-start stagger-children reveal-left-hidden ${infoVisible ? "reveal-left-visible" : ""}`}>
            {/* Contact image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-2xl lg:h-72">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop"
                alt="SPS Installation service van and professional tools ready for appliance installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
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
            </div>

            <h2 className="text-xl font-heading font-bold text-text dark:text-dark-text">
              Contact Information
            </h2>

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
