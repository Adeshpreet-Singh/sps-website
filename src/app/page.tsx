import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Droplets,
  Home,
  Building2,
  Shield,
  Clock,
  BadgeCheck,
  Sparkles,
  Phone,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  MapPin,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { siteConfig, services, whyUsFeatures, testimonials, serviceAreas } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Icon registry — maps data.ts icon strings to lucide-react components */
/* ------------------------------------------------------------------ */

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Droplets,
  Home,
  Building2,
  Shield,
  Clock,
  BadgeCheck,
  Sparkles,
};

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */

export default function HomePage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO — full-height with gradient, floating shapes, stats */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-dark text-white">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
        />
        {/* Dark overlay for text readability — semi-transparent to show video */}
        <div className="absolute inset-0 bg-navy/60" />

        {/* Floating decorative shapes */}
        <div className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-32 right-[8%] h-96 w-96 rounded-full bg-accent/4 blur-3xl" />
        <div className="absolute top-1/3 right-[15%] h-48 w-48 rounded-full border border-white/5" />
        <div className="absolute bottom-1/4 left-[20%] h-24 w-24 rounded-lg border border-white/5 rotate-12" />
        <div className="absolute top-[15%] right-[35%] h-16 w-16 rounded-full border border-white/5" />
        <div className="absolute bottom-[20%] left-[40%] h-32 w-32 rounded-lg border border-white/[0.03] rotate-45" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-8 pt-32 pb-16">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-6">
              {siteConfig.tagline}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Need a Plumber?
              <br />
              Need an Installer?
            </h1>
            <p
              className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ color: "var(--color-accent)", textShadow: "0 0 40px rgba(var(--color-accent-rgb, 59,130,246), 0.35)" }}
            >
              We&apos;ve Got You.
            </p>
            <p className="mt-8 text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>

            {/* Scroll-down indicator */}
            <div className="mt-16 flex items-center gap-2 text-white/40">
              <ChevronDown className="h-5 w-5 animate-bounce" />
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Stats row at bottom of hero */}
        <div className="relative mx-auto max-w-7xl w-full px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { value: siteConfig.stats.yearsInBusiness, label: "Years in Business" },
              { value: siteConfig.stats.installations, label: "Installations" },
              { value: siteConfig.stats.licensedInsured, label: "Licensed & Insured" },
              { value: siteConfig.stats.rating, label: "Google Rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. TRUST BAR — elevated card overlapping hero                */}
      {/* ============================================================ */}
      <section className="relative z-10 -mt-12 mx-auto max-w-5xl px-6 lg:px-8">
        <div
          className="rounded-2xl bg-white px-8 py-8 sm:px-12 sm:py-10"
          style={{ boxShadow: "0 8px 30px rgba(50,50,93,0.25), 0 2px 8px rgba(0,0,0,0.08)" }}
        >
          <p className="text-center text-sm font-medium text-text-muted uppercase tracking-wide mb-6">
            Trusted by Canada&apos;s top retailers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {siteConfig.retailers.map((retailer) => (
              <span
                key={retailer}
                className="inline-flex items-center rounded-full border border-border bg-surface-alt px-5 py-2 text-sm font-semibold text-navy select-none whitespace-nowrap transition-all hover:border-accent hover:text-accent hover:shadow-sm cursor-default"
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
      <section className="bg-gradient-to-b from-white to-surface-alt">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          {/* Section header with accent dot */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <p className="text-accent font-semibold tracking-wide uppercase text-sm">
                What We Do
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Two specialties, one call.
            </h2>
          </div>

          {/* Service cards — 2×2 grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((svc) => {
              const Icon = iconMap[svc.icon] ?? Wrench;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="group relative rounded-2xl bg-white p-8 border-t-4 border-accent shadow-[0_4px_20px_rgba(27,42,74,0.06),0_8px_32px_rgba(27,42,74,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(27,42,74,0.1),0_16px_48px_rgba(27,42,74,0.06)] overflow-hidden"
                >
                  {/* Service image */}
                  <div className="-mx-8 -mt-8 relative h-48 overflow-hidden rounded-t-2xl">
                    <Image
                      src={
                        svc.slug === "appliance-installation"
                          ? "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                          : svc.slug === "plumbing"
                            ? "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop"
                            : svc.slug === "residential"
                              ? "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop"
                              : "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                      }
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>

                  {/* Number badge */}
                  <span className="absolute top-5 right-6 text-6xl font-bold text-navy/[0.06] select-none leading-none pointer-events-none z-10">
                    {svc.number}
                  </span>

                  {/* Icon in gradient rounded square */}
                  <div className="mt-4 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light text-white shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-navy group-hover:text-accent transition-colors">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-text-muted leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  {/* Bullet list with custom accent dots */}
                  <ul className="mt-5 space-y-2">
                    {svc.items.slice(0, 5).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More with animated arrow */}
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Learn more
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
      <section className="relative overflow-hidden bg-navy-dark text-white">
        {/* Decorative geometric shapes (CSS-only) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full border border-white/[0.04]" />
          <div className="absolute top-1/3 -left-16 h-48 w-48 rotate-45 border border-white/[0.04]" />
          <div className="absolute bottom-12 right-1/4 h-32 w-32 rounded-full border border-white/[0.06]" />
          <div className="absolute -bottom-10 left-1/3 h-24 w-24 rotate-12 border border-white/[0.04]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          {/* Section header with accent underline */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block relative">
              Built on reliability, driven by results.
              <span className="block mx-auto mt-3 h-1 w-16 rounded-full bg-accent" />
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
          <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
            {whyUsFeatures.map((feature) => {
              const Icon = iconMap[feature.icon] ?? Shield;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-colors duration-300 hover:bg-white/[0.1]"
                >
                  {/* Icon in accent circle */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Icon className="h-6 w-6" />
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
      <section className="relative bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              What our customers say
            </h2>
            {/* Large decorative quote icon */}
            <div className="mt-4 flex justify-center">
              <Quote className="h-12 w-12 text-accent/15" />
            </div>
          </div>

          {/* Testimonial cards with stagger animation */}
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="relative rounded-2xl bg-white p-8 shadow-card border-l-4 border-transparent animate-slide-up"
                style={{
                  borderImage: "linear-gradient(to bottom, var(--color-accent), var(--color-accent-light)) 1",
                  animationDelay: `${idx * 150}ms`,
                }}
              >
                {/* Subtle quote decoration */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/10" />

                {/* Avatar + author info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/20">
                    <Image
                      src={
                        t.name === "Michael T."
                          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                          : t.name === "Sandra K."
                            ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                            : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                      }
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-navy text-sm">{t.name}</p>
                    <p className="text-xs text-text-muted">
                      {t.location} &middot; {t.source}
                    </p>
                  </div>
                </div>

                <p className="text-text-muted leading-relaxed italic text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-sm">&#9733;</span>
                  ))}
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
      <section className="relative bg-dot-grid">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-accent" />
              <p className="text-accent font-semibold tracking-wide uppercase text-sm">
                Service Area
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              Metro Vancouver &amp; beyond
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              From downtown Vancouver to the Fraser Valley, we cover the entire Lower Mainland of British Columbia.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {serviceAreas.map((city) => (
              <span
                key={city}
                className="rounded-full border border-border bg-white/80 px-5 py-2 text-sm font-medium text-navy hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-default"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy text-white">
        {/* Decorative floating shapes */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-white/[0.03]" />
          <div className="absolute top-1/2 -right-16 h-80 w-80 rounded-full bg-white/[0.04]" />
          <div className="absolute bottom-8 left-1/4 h-40 w-40 rounded-full bg-accent/10 blur-2xl" />
          <div className="absolute top-8 right-1/3 h-24 w-24 rounded-full border border-white/[0.06]" />
          <div className="absolute bottom-1/3 left-[15%] h-16 w-16 rounded-full border border-white/[0.05]" />
        </div>

        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 text-center">
          {/* Heading with animated gradient shimmer */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Ready to get started?
          </h2>
          <p className="mt-4 text-white/80 max-w-lg mx-auto text-lg">
            Request a free quote or call us today — we&apos;ll take it from here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
            <a
              href={siteConfig.phoneLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5" />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
