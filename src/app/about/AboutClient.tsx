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
  ArrowRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CursorGlow from "@/components/CursorGlow";

function AboutStat({
  stat,
  started,
}: {
  stat: { label: string; value: string | number };
  started: boolean;
}) {
  const numericValue =
    typeof stat.value === "number" ? stat.value : parseFloat(String(stat.value)) || 0;
  const isDecimal = String(stat.value).includes(".");
  const display = useCountUp({
    target: numericValue,
    duration: 2000,
    shouldStart: started,
    decimals: isDecimal ? 1 : 0,
  });

  return (
    <div className="relative bg-white dark:bg-dark-surface rounded-xl p-6 text-center shadow-card dark:shadow-none dark:border dark:border-dark-border hover:shadow-card-hover dark:hover:border-accent/30 transition-all reveal-scale-hidden reveal-scale-visible">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent rounded-b-full" />
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy dark:text-dark-text mt-2 tabular-nums">
        {display}
        {String(stat.value).includes("★") && "★"}
      </p>
      <p className="mt-2 text-sm text-text-muted dark:text-dark-text-muted uppercase tracking-wider">
        {stat.label}
      </p>
    </div>
  );
}

export default function AboutClient() {
  const [storyRef, storyVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [valuesRef, valuesVisible] = useScrollReveal();
  const [leadersRef, leadersVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const values = [
    {
      icon: <Clock className="w-7 h-7" aria-hidden="true" />,
      title: "Reliability",
      description:
        "We show up on time, every time. No exceptions, no excuses.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    },
    {
      icon: <BadgeCheck className="w-7 h-7" aria-hidden="true" />,
      title: "Quality",
      description:
        "Every installation meets manufacturer specs and building codes.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    {
      icon: <Users className="w-7 h-7" aria-hidden="true" />,
      title: "Respect",
      description:
        "We treat your home like our own. Clean, careful, professional.",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    },
    {
      icon: <Shield className="w-7 h-7" aria-hidden="true" />,
      title: "Transparency",
      description:
        "No hidden fees. No surprises. Just honest, upfront pricing.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
  ];

  const stats = [
    { label: "Years in Business", value: siteConfig.stats.yearsInBusiness },
    { label: "Installations", value: siteConfig.stats.installations },
    { label: "Licensed & Insured", value: siteConfig.stats.licensedInsured },
    { label: "Customer Rating", value: siteConfig.stats.rating },
  ];

  const leaders = [
    { name: "Rajat Kumar", role: "Director & Co-Founder" },
    { name: "Diksha Saini", role: "Director & Co-Founder" },
  ];

  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd items={[{ name: "About Us", path: "/about" }]} />
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-label="About hero" className="relative overflow-hidden py-16 sm:py-24 md:py-36">
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
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/50" />
        {/* Decorative shapes */}
        <div aria-hidden="true" className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        <div aria-hidden="true" className="absolute top-16 left-[15%] w-3 h-3 rounded-full bg-accent/30" />
        <div aria-hidden="true" className="absolute top-32 right-[20%] w-2 h-2 rounded-full bg-white/20" />
        <div aria-hidden="true" className="absolute bottom-24 left-[30%] w-4 h-4 rounded-full bg-accent/20" />
        <div aria-hidden="true" className="absolute top-1/2 right-[12%] w-24 h-24 rounded-full border border-white/[0.06]" />
        <div aria-hidden="true" className="absolute bottom-1/3 left-[8%] w-16 h-16 rounded-full border border-accent/10" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <Breadcrumb items={[{ name: "About Us", href: "/about" }]} />
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-full border border-accent/20 animate-fade-in">
            Est. {siteConfig.legal.incorporated}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-slide-up">
            About {siteConfig.name}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Metro Vancouver&apos;s trusted partner for professional appliance
            installation and plumbing services since day one.
          </p>
        </div>
      </section>

      {/* ── Our Story (two-column) ────────────────────────── */}
      <section aria-label="Our story" className="py-16 sm:py-20 md:py-28 bg-surface dark:bg-dark-surface">
        <div ref={storyRef} className={`mx-auto max-w-6xl px-4 sm:px-6 reveal-hidden ${storyVisible ? "reveal-visible" : ""}`}>
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-start">
            {/* Left — text */}
            <div className="lg:col-span-3 space-y-6 text-text-muted dark:text-dark-text-muted leading-relaxed text-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-dark-text">
                Our Story
              </h2>
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
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <section aria-label="Company statistics" className="bg-surface-alt dark:bg-dark-surface-alt py-12 sm:py-14 md:py-16 lg:py-20">
        <div ref={statsRef} className={`mx-auto max-w-5xl px-4 sm:px-6 reveal-hidden ${statsVisible ? "reveal-visible" : ""}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
            {stats.map((stat) => (
              <AboutStat key={stat.label} stat={stat} started={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values (glass-morphism on dark) ──────────── */}
      <section aria-label="Our values" className="relative py-10 sm:py-14 md:py-20 lg:py-28 bg-navy-dark overflow-hidden">
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full bg-navy-light/20 blur-3xl" />

        <div ref={valuesRef} className={`relative mx-auto max-w-5xl px-4 sm:px-6 reveal-hidden ${valuesVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
            Our Values
          </h2>
          <p className="mt-4 text-white/70 text-center max-w-xl mx-auto text-lg">
            The principles that guide every installation, every interaction,
            every day.
          </p>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 stagger-children">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className={`group relative rounded-xl overflow-hidden border border-white/[0.08] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(232,122,46,0.08)] transition-all duration-300 hover:-translate-y-1 reveal-scale-hidden ${valuesVisible ? "reveal-scale-visible" : ""} reveal-delay-${idx + 1}`}
              >
                {/* Background image — decorative */}
                <div aria-hidden="true" className="absolute inset-0">
                  <Image
                    src={value.image}
                    alt=""
                    fill
                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm" />
                <div className="relative p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────── */}
      <section aria-label="Leadership team" className="py-10 sm:py-14 md:py-20 lg:py-28 bg-surface dark:bg-dark-surface">
        <div ref={leadersRef} className={`mx-auto max-w-5xl px-4 sm:px-6 reveal-hidden ${leadersVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text dark:text-dark-text text-center">
            Led by a team committed to excellence
          </h2>
          <p className="mt-4 text-text-muted dark:text-dark-text-muted text-center max-w-xl mx-auto text-lg">
            Our leadership brings hands-on trade experience and a relentless
            focus on customer satisfaction.
          </p>
          <div className="mt-14 grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto stagger-children" role="list" aria-label="Leadership team members">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                role="listitem"
                className="group relative flex flex-col items-center text-center p-8 bg-white dark:bg-dark-surface rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:border dark:border-dark-border dark:hover:border-accent/30 gradient-border-shine card-tilt"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-accent/40 via-navy/20 to-accent/40 dark:via-dark-border/20 -z-10 group-hover:from-accent group-hover:via-navy/40 dark:group-hover:via-dark-border/40 group-hover:to-accent transition-all duration-500" />
                <div className="absolute inset-[1.5px] rounded-[10px] bg-white dark:bg-dark-surface -z-10" />

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy to-navy-light dark:from-dark-surface-alt dark:to-dark-border flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted dark:text-dark-text-muted">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section aria-label="Get started" className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy py-10 sm:py-14 md:py-20 lg:py-28">
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Decorative elements */}
        <div aria-hidden="true" className="absolute top-[-10%] left-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-15%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
        <div aria-hidden="true" className="absolute top-12 right-[15%] w-20 h-20 rounded-full border border-white/[0.06]" />
        <div aria-hidden="true" className="absolute bottom-16 left-[20%] w-2 h-2 rounded-full bg-accent/30" />

        <div ref={ctaRef} className={`relative mx-auto max-w-3xl px-4 sm:px-6 text-center reveal-hidden ${ctaVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ready to work with us?
          </h2>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Get a free quote for your next appliance installation or plumbing
            project. We&apos;re here to help.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-lg shadow-accent/25 btn-press btn-shimmer"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              aria-label="View all services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all btn-press"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
