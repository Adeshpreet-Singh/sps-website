/**
 * @fileoverview About page client component.
 *
 * Renders the company story, core values, leadership team, and stats.
 * Sections:
 * 1. Hero — dark gradient with cursor glow and breadcrumb
 * 2. Story — company history and mission
 * 3. Stats — animated counters for key business metrics
 * 4. Values — 4-card grid (Reliability, Quality, Respect, Transparency)
 * 5. Leadership — director profiles
 * 6. CTA Banner — contact call-to-action
 *
 * Values and stats are defined locally (not in data.ts) because they're
 * specific to the about page and don't need to be shared.
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import {
  Shield,
  Clock,
  BadgeCheck,
  Sparkles,
  Users,
  ChevronDown,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CursorGlow from "@/components/CursorGlow";
import CTABanner from "@/components/CTABanner";
import StatCounter from "@/components/StatCounter";

const STATS = [
  { label: "Years in Business", value: siteConfig.stats.yearsInBusiness },
  { label: "Installations", value: siteConfig.stats.installations },
  { label: "Licensed & Insured", value: siteConfig.stats.licensedInsured },
  { label: "Customer Rating", value: siteConfig.stats.rating },
];

const LEADERS = [
  { name: "Rajat Kumar", role: "Director & Co-Founder", initial: "RK" },
  { name: "Diksha Saini", role: "Director & Co-Founder", initial: "DS" },
];

const VALUES_DATA = [
  {
    icon: Clock,
    title: "Reliability",
    description: "We show up on time, every time. No exceptions, no excuses.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
  },
  {
    icon: BadgeCheck,
    title: "Quality",
    description: "Every installation meets manufacturer specs and building codes.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  },
  {
    icon: Users,
    title: "Respect",
    description: "We treat your home like our own. Clean, careful, professional.",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "No hidden fees. No surprises. Just honest, upfront pricing.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
  },
];

export default function AboutClient() {
  const [storyRef, storyVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();
  const [leadersRef, leadersVisible] = useScrollReveal();

  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd items={[{ name: "About Us", path: "/about" }]} />
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-label="About hero" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
        {/* Background image — decorative */}
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/70" />
        {/* Animated gradient overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-navy-light/20 gradient-animated" />
        {/* Decorative shapes */}
        <div aria-hidden="true" className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-accent/5 blur-3xl animate-parallax-float" />
        <div aria-hidden="true" className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-white/[0.03] blur-3xl animate-parallax-float delay-500" />
        <div aria-hidden="true" className="absolute top-16 left-[15%] w-3 h-3 rounded-full bg-accent/30 animate-dot-pulse" />
        <div aria-hidden="true" className="absolute top-32 right-[20%] w-2 h-2 rounded-full bg-white/20 animate-dot-pulse delay-300" />
        <div aria-hidden="true" className="absolute bottom-24 left-[30%] w-4 h-4 rounded-full bg-accent/20 animate-dot-pulse delay-500" />
        <div aria-hidden="true" className="absolute top-1/2 right-[12%] w-24 h-24 rounded-full border border-white/[0.06] animate-parallax-float delay-700" />
        <div aria-hidden="true" className="absolute bottom-1/3 left-[8%] w-16 h-16 rounded-full border border-accent/10 animate-parallax-float delay-300" />
        {/* Horizontal accent lines */}
        <div aria-hidden="true" className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div aria-hidden="true" className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <Breadcrumb items={[{ name: "About Us", path: "/about" }]} />
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-full border border-accent/20 animate-fade-in motion-reduce:transition-none">
            Est. {siteConfig.legal.incorporated}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-slide-up">
            About {siteConfig.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Metro Vancouver&apos;s trusted partner for professional appliance
            installation and plumbing services since day one.
          </p>
          {/* Scroll indicator */}
          <div className="mt-10 animate-scroll-hint" aria-hidden="true">
            <ChevronDown className="w-5 h-5 mx-auto text-white/40" />
          </div>
        </div>
      </section>

      {/* ── Our Story (two-column) ────────────────────────── */}
      <section aria-label="Our story" className="py-16 sm:py-20 lg:py-28 bg-surface dark:bg-dark-surface">
        <div ref={storyRef} className={`mx-auto max-w-6xl px-4 sm:px-6 reveal-hidden ${storyVisible ? "reveal-visible" : ""}`}>
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
            {/* Left — text */}
            <div className="lg:col-span-3 space-y-6 text-text-muted dark:text-dark-text-muted leading-relaxed text-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full" />
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-dark-text">
                Built on Trust, Driven by Craft
              </h2>
              {/* Decorative quote */}
              <div className="relative pl-6 border-l-2 border-accent/30 transition-all duration-300 hover:border-accent/60 motion-reduce:transition-none">
                <p className="text-lg italic text-text dark:text-dark-text/80">
                  &ldquo;Homeowners deserve the same level of care and professionalism
                  for their appliance installations as they get from the appliances
                  themselves.&rdquo;
                </p>
              </div>
              <p>
                Founded in 2025, {siteConfig.shortName} was built on a simple
                idea: homeowners deserve the same level of care and
                professionalism for their appliance installations as they get
                from the appliances themselves.
              </p>
              <p>
                Over {siteConfig.stats.yearsInBusiness} years and{" "}
                {siteConfig.stats.installations} installations later, we&apos;ve
                grown into Metro Vancouver&apos;s go-to team for appliance
                installation and plumbing services. From single-family homes in
                Surrey to multi-unit developments across the Lower Mainland, our
                work speaks for itself.
              </p>
              <p>
                We&apos;re not just installers. We&apos;re your home&apos;s last
                line of defence between a great purchase and a great experience.
              </p>
            </div>

            {/* Right — image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group img-zoom-hover">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=800&fit=crop"
                  alt="Our team at work"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
                {/* Image overlay accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Decorative element below image */}
              <div className="hidden lg:flex items-center gap-3 mt-6 pl-4">
                <div className="w-8 h-px bg-accent/40" />
                <span className="text-xs text-text-muted dark:text-dark-text-muted uppercase tracking-wider">
                  Serving Metro Vancouver
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section aria-label="Company statistics" className="bg-surface-alt dark:bg-dark-surface-alt py-16 sm:py-20 lg:py-28">
        <div ref={statsRef} className={`mx-auto max-w-5xl px-4 sm:px-6 reveal-hidden ${statsVisible ? "reveal-visible" : ""}`}>
          {/* Section divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border dark:via-dark-border to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted dark:text-dark-text-muted">
              By the Numbers
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border dark:via-dark-border to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
            {STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                started={statsVisible}
                variant="card"
                decimals={String(stat.value).includes(".") ? 1 : 0}
                suffix={String(stat.value).includes("★") ? "★" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values (glass-morphism on dark) ──────────── */}
      <section aria-label="Our values" className="relative py-16 sm:py-20 lg:py-28 bg-navy-dark overflow-hidden">
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full bg-navy-light/20 blur-3xl" />
        {/* Subtle grid pattern */}
        <div aria-hidden="true" className="absolute inset-0 bg-dot-grid opacity-[0.03]" />

        <div ref={valuesRef} className={`relative mx-auto max-w-5xl px-4 sm:px-6 reveal-hidden ${valuesVisible ? "reveal-visible" : ""}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-accent/50" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                What Drives Us
              </span>
              <div className="w-8 h-px bg-accent/50" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Our Values
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">
              The principles that guide every installation, every interaction,
              every day.
            </p>
          </div>
          <div className="mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 stagger-children">
            {VALUES_DATA.map((value, idx) => (
              <div
                key={value.title}
                className={`group relative rounded-xl overflow-hidden border border-white/[0.08] hover:border-accent/40 hover:shadow-[0_0_40px_rgba(232,122,46,0.12)] transition-all duration-500 hover:-translate-y-1.5 reveal-scale-hidden ${valuesVisible ? "reveal-scale-visible" : ""} reveal-delay-${idx + 1} motion-reduce:transition-none motion-reduce:transform-none`}
              >
                {/* Background image — decorative */}
                <div aria-hidden="true" className="absolute inset-0">
                  <Image
                    src={value.image}
                    alt=""
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
                {/* Overlay with enhanced blur */}
                <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm" />
                {/* Subtle gradient accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                    <value.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                  {/* Bottom accent line */}
                  <div className="mt-4 w-0 h-0.5 bg-accent rounded-full group-hover:w-12 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────── */}
      <section aria-label="Leadership team" className="py-16 sm:py-20 lg:py-28 bg-surface dark:bg-dark-surface">
        <div ref={leadersRef} className={`mx-auto max-w-5xl px-4 sm:px-6 reveal-hidden ${leadersVisible ? "reveal-visible" : ""}`}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-accent/40" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Our Team
              </span>
              <div className="w-8 h-px bg-accent/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-dark-text">
              Led by a team committed to excellence
            </h2>
            <p className="mt-4 text-text-muted dark:text-dark-text-muted max-w-xl mx-auto text-lg">
              Our leadership brings hands-on trade experience and a relentless
              focus on customer satisfaction.
            </p>
          </div>
          <div className="mt-0 grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto stagger-children" role="list" aria-label="Leadership team members">
            {LEADERS.map((leader) => (
              <div
                key={leader.name}
                role="listitem"
                className="group relative flex flex-col items-center text-center p-8 bg-white dark:bg-dark-surface rounded-xl shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover dark:hover:shadow-dark-card-hover dark:border dark:border-dark-border dark:hover:border-accent/40 gradient-border-shine card-tilt motion-reduce:transition-none motion-reduce:transform-none"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-accent/40 via-navy/20 to-accent/40 dark:via-dark-border/20 -z-10 group-hover:from-accent group-hover:via-navy/40 dark:group-hover:via-dark-border/40 group-hover:to-accent transition-all duration-500" />
                <div className="absolute inset-[1.5px] rounded-[10px] bg-white dark:bg-dark-surface -z-10" />

                {/* Avatar with initial */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">
                    {leader.initial}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted dark:text-dark-text-muted">{leader.role}</p>
                {/* Decorative role accent */}
                <div className="mt-3 w-8 h-0.5 bg-accent/30 rounded-full group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTABanner
        title="Ready to work with us?"
        description="Get a free quote for your next appliance installation or plumbing project. We&apos;re here to help."
        primaryLabel="Contact Us"
        secondaryLabel="View Services"
        secondaryHref="/services"
      />
    </div>
  );
}
