"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryIsPhone?: boolean;
  className?: string;
}

/**
 * Reusable CTA banner section with dark gradient background,
 * decorative floating shapes, and two action buttons.
 *
 * Used on every major page to drive contact/quote requests.
 */
export default function CTABanner({
  title = "Ready to get started?",
  description = "Get a free quote for your next appliance installation or plumbing project. We're here to help.",
  primaryLabel = "Get a Free Quote",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  secondaryIsPhone = false,
  className = "",
}: CTABannerProps) {
  return (
    <section
      aria-label="Contact us"
      className={`relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy text-white py-16 sm:py-20 lg:py-28 ${className}`}
    >
      {/* Decorative floating shapes */}
      <div aria-hidden="true" className="absolute top-[-10%] left-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl animate-float" />
      <div aria-hidden="true" className="absolute bottom-[-15%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl animate-float delay-300" />
      <div aria-hidden="true" className="absolute top-12 right-[15%] w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/[0.06] animate-parallax-float delay-500" />
      <div aria-hidden="true" className="absolute bottom-16 left-[20%] w-2 h-2 rounded-full bg-accent/30 animate-parallax-float" />

      <ScrollReveal className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          {title}
        </h2>
        <p className="mt-4 text-white/70 text-base sm:text-lg max-w-xl mx-auto">
          {description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href={primaryHref}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg shadow-lg shadow-accent/25 btn-press btn-shimmer"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          {secondaryLabel &&
            (secondaryIsPhone ? (
              <a
                href={siteConfig.phoneLink}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 btn-press"
                aria-label={`Call us at ${siteConfig.phone}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {secondaryLabel}
              </a>
            ) : secondaryHref ? (
              <Link
                href={secondaryHref}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 btn-press"
              >
                {secondaryLabel}
              </Link>
            ) : null)}
        </div>
      </ScrollReveal>
    </section>
  );
}
