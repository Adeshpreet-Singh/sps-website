"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  MapPin,
  Quote,
} from "lucide-react";
import { siteConfig, services, whyUsFeatures, testimonials, serviceAreas, serviceImages, testimonialAvatars } from "@/lib/data";
import { iconMap } from "@/lib/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { useLazyVideo } from "@/hooks/useLazyVideo";
import CursorGlow from "@/components/CursorGlow";

/* ================================================================== */
/*  Animated stat counter for hero                                    */
/* ================================================================== */

function HeroStat({
  value,
  label,
  suffix = "",
  started,
  decimals = 0,
  isText = false,
}: {
  value: string | number;
  label: string;
  suffix?: string;
  started: boolean;
  decimals?: number;
  isText?: boolean;
}) {
  const numericValue = typeof value === "number" ? value : parseFloat(String(value)) || 0;
  const display = useCountUp({
    target: numericValue,
    duration: 2000,
    shouldStart: started,
    decimals,
  });

  return (
    <div role="listitem" className={`flex flex-col items-center py-6 px-4 animate-slide-up ${started ? "animate-counter-enter" : ""}`}>
      <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
        {isText ? value : display}
        {suffix && <span className="text-accent">{suffix}</span>}
      </p>
      <p className="mt-1 text-sm font-medium text-white/70">
        {label}
      </p>
    </div>
  );
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomeClient() {
  // Scroll-reveal hooks for each section (now sharing a single IntersectionObserver pool)
  const [trustRef, trustVisible] = useScrollReveal();
  const [servicesHeaderRef, servicesHeaderVisible] = useScrollReveal();
  const [servicesGridRef, servicesGridVisible] = useScrollReveal();
  const [whyUsHeaderRef, whyUsHeaderVisible] = useScrollReveal();
  const [whyUsGridRef, whyUsGridVisible] = useScrollReveal();
  const [testimonialsRef, testimonialsVisible] = useScrollReveal();
  const [serviceAreaRef, serviceAreaVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.3 });

  // Lazy-load hero video — only starts buffering when hero is in/near viewport
  const [heroRef, heroVisible] = useLazyVideo<HTMLDivElement>();

  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO — full-height with gradient, floating shapes, stats */}
      {/* ============================================================ */}
      <section ref={heroRef} aria-label="Hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark text-white">
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Background video — deferred until hero is in viewport */}
        {heroVisible && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          src="/videos/hero-bg.mp4"
          aria-hidden="true"
        />
        )}
        {/* Dark overlay for text readability — semi-transparent to show video */}
        <div className="absolute inset-0 bg-navy/60" />

        {/* Floating decorative shapes */}
        <div aria-hidden="true" className="absolute top-20 left-[10%] h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-accent/5 blur-3xl animate-float" />
        <div aria-hidden="true" className="absolute bottom-32 right-[8%] h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-accent/4 blur-3xl animate-float delay-300" />
        <div aria-hidden="true" className="hidden sm:block absolute top-1/3 right-[15%] h-48 w-48 rounded-full border border-white/5 animate-float delay-500" />
        <div aria-hidden="true" className="hidden sm:block absolute bottom-1/4 left-[20%] h-24 w-24 rounded-lg border border-white/5 rotate-12 animate-parallax-float" />
        <div aria-hidden="true" className="absolute top-[15%] right-[35%] h-16 w-16 rounded-full border border-white/5 animate-parallax-float delay-300" />
        <div aria-hidden="true" className="hidden sm:block absolute bottom-[20%] left-[40%] h-32 w-32 rounded-lg border border-white/[0.03] rotate-45 animate-parallax-float delay-500" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-6 animate-fade-in">
              {siteConfig.tagline}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight animate-slide-up">
              Need a Plumber?
              <br />
              Need an Installer?
            </h1>
            <p
              className="mt-2 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight animate-slide-up delay-100 animate-gradient-text"
              style={{ backgroundImage: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light), #fbbf24, var(--color-accent))", textShadow: "0 0 40px rgba(var(--color-accent-rgb, 59,130,246), 0.35)" }}
            >
              We&apos;ve Got You.
            </p>
            <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg lg:text-xl text-white/90 max-w-xl leading-relaxed animate-slide-up delay-200">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up delay-300">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-accent px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 text-base sm:text-lg font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark btn-press btn-shimmer"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-white/25 px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 text-base sm:text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark btn-press"
                aria-label={`Call us at ${siteConfig.phone}`}
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Scroll-down indicator — smooth scroll to services */}
            <div className="mt-10 sm:mt-16 flex items-center gap-2 text-white/80 animate-fade-in delay-500">
              <a href="#services" className="flex items-center gap-2 hover:text-white/80 transition-colors focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark rounded-sm" aria-label="Scroll to services section">
                <ChevronDown className="h-5 w-5 animate-bounce-limited" aria-hidden="true" />
                <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats row at bottom of hero — animated counters */}
        <div ref={statsRef} className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
          <div role="list" aria-label="Company statistics" className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 overflow-hidden rounded-xl sm:rounded-none animate-fade-in delay-400 stagger-children">
            <HeroStat value={siteConfig.stats.yearsInBusiness} label="Years in Business" suffix="" started={statsVisible} />
            <HeroStat value={siteConfig.stats.installations} label="Installations" suffix="+" started={statsVisible} />
            <HeroStat value={siteConfig.stats.licensedInsured} label="Licensed &amp; Insured" suffix="" started={statsVisible} isText />
            <HeroStat value={siteConfig.stats.rating} label="Google Rating" suffix="★" started={statsVisible} decimals={1} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. TRUST BAR — elevated card overlapping hero                */}
      {/* ============================================================ */}
      <section id="trust" aria-label="Trusted retailers" className="relative z-10 -mt-12 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={trustRef}
          className={`rounded-2xl bg-white dark:bg-dark-surface px-4 sm:px-6 lg:px-12 py-5 sm:py-8 lg:py-10 reveal-scale-hidden ${trustVisible ? "reveal-scale-visible" : ""}`}
          style={{ boxShadow: "0 8px 30px rgba(50,50,93,0.25), 0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <p className="text-center text-sm font-medium text-text-muted dark:text-dark-text-muted uppercase tracking-wide mb-6">
            Trusted by Canada&apos;s top retailers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 stagger-children">
            {siteConfig.retailers.map((retailer) => (
              <span
                key={retailer}
                className="inline-flex items-center rounded-full border border-border dark:border-dark-border bg-surface-alt dark:bg-dark-surface-alt px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-navy dark:text-dark-text select-none transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-sm hover:scale-105 cursor-default"
              >
                {retailer}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. SERVICES OVERVIEW                                        */}
      {/* ============================================================ */}
      <section id="services" aria-label="Services" className="bg-gradient-to-b from-white to-surface-alt dark:from-dark-surface dark:to-dark-surface-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
          {/* Section header with accent dot */}
          <div ref={servicesHeaderRef} className={`text-center max-w-2xl mx-auto mb-14 reveal-hidden ${servicesHeaderVisible ? "reveal-visible" : ""}`}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-dot-pulse" />
              <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm">
                What We Do
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              Two specialties, one call.
            </h2>
          </div>

          {/* Service cards — 2×2 grid */}
          <div ref={servicesGridRef} className={`grid gap-8 sm:grid-cols-2 reveal-hidden ${servicesGridVisible ? "reveal-visible" : ""}`}>
            {services.map((svc) => {
              const Icon = iconMap[svc.icon];
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  aria-label={`${svc.title} - ${svc.shortDescription}`}
                  className="group relative rounded-2xl bg-white dark:bg-dark-surface p-6 sm:p-8 border-t-4 border-accent shadow-card dark:shadow-dark-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:hover:shadow-dark-card-hover overflow-hidden card-hover"
                >
                  {/* Service image */}
                  <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 relative h-40 sm:h-48 overflow-hidden rounded-t-2xl">
                    <Image
src={serviceImages[svc.slug]}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>

                  {/* Number badge — decorative */}
                  <span aria-hidden="true" className="absolute top-5 right-6 text-6xl font-bold text-navy/[0.06] dark:text-white/[0.04] select-none leading-none pointer-events-none z-10" role="presentation">
                    {svc.number}
                  </span>

                  {/* Icon in gradient rounded square */}
                  <div className="mt-4 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-navy dark:text-dark-text group-hover:text-accent transition-colors">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-text-muted dark:text-dark-text-muted leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  {/* Bullet list with custom accent dots */}
                  <ul className="mt-5 space-y-2">
                    {svc.items.slice(0, 5).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-text-muted dark:text-dark-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More with animated arrow */}
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-safe group-hover:gap-2.5 transition-all">
                    Learn more
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. WHY CHOOSE US                                            */}
      {/* ============================================================ */}
      <section id="why-us" aria-label="Why choose us" className="relative overflow-hidden bg-navy-dark text-white">
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Decorative geometric shapes (CSS-only) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full border border-white/[0.04]" />
          <div className="absolute top-1/3 -left-16 h-48 w-48 rotate-45 border border-white/[0.04]" />
          <div className="absolute bottom-12 right-1/4 h-32 w-32 rounded-full border border-white/[0.06]" />
          <div className="absolute -bottom-10 left-1/3 h-24 w-24 rotate-12 border border-white/[0.04]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
          {/* Section header with accent underline */}
          <div ref={whyUsHeaderRef} className={`text-center max-w-3xl mx-auto mb-14 reveal-hidden ${whyUsHeaderVisible ? "reveal-visible" : ""}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block relative">
              Built on reliability, driven by results.
              <span className="block mx-auto mt-3 h-1 w-16 rounded-full bg-accent animate-line-grow" />
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-2xl mx-auto">
              We&apos;ve built our reputation one job at a time — showing up when we say we
              will, doing the work right the first time, and leaving every home cleaner
              than we found it.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed max-w-2xl mx-auto">
              From single appliance installs to full commercial fit-outs, our team brings
              the same level of care and professionalism to every project. That&apos;s why
              Metro Vancouver homeowners and businesses trust Smith Pro Services.
            </p>
          </div>

          {/* Feature cards — 2×2 grid */}
          <div ref={whyUsGridRef} className={`grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto reveal-hidden ${whyUsGridVisible ? "reveal-visible" : ""}`}>
            {whyUsFeatures.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20 hover:shadow-[0_0_20px_rgba(232,122,46,0.08)] card-tilt"
                >
                  {/* Icon in accent circle */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white icon-lift">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">{feature.title}</h3>
                    <p className="mt-1 text-sm text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ============================================================ */}
      {/*  6. TESTIMONIALS                                             */}
      {/* ============================================================ */}
      <section id="testimonials" aria-label="Testimonials" className="relative bg-white dark:bg-dark-surface border-t border-border dark:border-dark-border">
        <div ref={testimonialsRef} className={`mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8 reveal-hidden ${testimonialsVisible ? "reveal-visible" : ""}`}>
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              What our customers say
            </h2>
            {/* Large decorative quote icon */}
            <div className="mt-4 flex justify-center">
              <Quote className="h-12 w-12 text-accent/15" aria-hidden="true" />
            </div>
          </div>

          {/* Testimonial cards with scroll-triggered stagger animation */}
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`relative rounded-2xl bg-white dark:bg-dark-surface-alt p-8 shadow-card dark:shadow-dark-card border-l-4 border-transparent card-hover reveal-hidden ${testimonialsVisible ? "reveal-visible" : ""} reveal-delay-${idx + 1}`}
                style={{
                  borderImage: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-light)) 1",
                }}
              >
                {/* Subtle quote decoration */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/10" aria-hidden="true" />

                {/* Avatar + author info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20">
                    <Image
src={testimonialAvatars[t.name]}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-navy dark:text-dark-text text-sm">{t.name}</p>
                    <p className="text-xs text-text-muted dark:text-dark-text-muted">
                      {t.location} &middot; {t.source}
                    </p>
                  </div>
                </div>

                <p className="text-text-muted dark:text-dark-text-muted leading-relaxed italic text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-1 text-accent star-rating-pop">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-sm" aria-hidden="true">&#9733;</span>
                  ))}
                  <span className="sr-only">{t.rating} out of 5 stars</span>
                </div>
                <span className="mt-3 inline-block text-xs font-medium bg-accent/10 text-accent rounded-full px-3 py-1">
                  {t.service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. SERVICE AREA                                             */}
      {/* ============================================================ */}
      <section id="service-area" aria-label="Service area" className="relative bg-dot-grid">
        <div ref={serviceAreaRef} className={`mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8 reveal-hidden ${serviceAreaVisible ? "reveal-visible" : ""}`}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-accent animate-dot-pulse" aria-hidden="true" />
              <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm">
                Service Area
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              Metro Vancouver &amp; beyond
            </h2>
            <p className="mt-4 text-text-muted dark:text-dark-text-muted leading-relaxed">
              From downtown Vancouver to the Fraser Valley, we cover the entire Lower Mainland of British Columbia.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10 stagger-children">
            {serviceAreas.map((city) => (
              <span
                key={city}
                className="rounded-full border border-border dark:border-dark-border bg-white/80 dark:bg-dark-surface-alt px-5 py-2 text-sm font-medium text-navy dark:text-dark-text hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-default hover:scale-105 hover:shadow-md active:scale-95 reveal-hidden reveal-visible"
              >
                {city}
              </span>
            ))}
          </div>

          <p className="text-center text-text-muted text-sm">
            Don&apos;t see your area?{" "}
            <Link href="/contact" className="text-accent font-semibold hover:underline">
              Contact us
            </Link>{" "}
            — we may still be able to help.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. FINAL CTA BANNER                                         */}
      {/* ============================================================ */}
      <section ref={ctaRef} id="contact" aria-label="Contact us" className={`relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy text-white reveal-hidden ${ctaVisible ? "reveal-visible" : ""}`}>
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Decorative floating shapes */}
        <div aria-hidden="true" className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl animate-float" />
        <div aria-hidden="true" className="absolute bottom-[-15%] right-[-5%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl animate-float delay-300" />
        <div aria-hidden="true" className="absolute top-12 right-[15%] w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/[0.06] animate-parallax-float delay-500" />
        <div aria-hidden="true" className="absolute bottom-16 left-[20%] w-2 h-2 rounded-full bg-accent/30 animate-parallax-float" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16 lg:py-28 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mt-4 text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            Get a free quote for your next appliance installation or plumbing
            project. We&apos;re here to help.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg shadow-lg shadow-accent/25 btn-press btn-shimmer"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.phoneLink}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 btn-press"
              aria-label={`Call us at ${siteConfig.phone}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
