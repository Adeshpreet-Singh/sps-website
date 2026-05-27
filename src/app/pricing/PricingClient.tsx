/**
 * @fileoverview Pricing page client component.
 *
 * Renders:
 * 1. Hero — dark gradient with trust badges
 * 2. Installation pricing tiers — card grid with features and CTAs
 * 3. Plumbing pricing tiers — separate card grid
 * 4. Comparison table — side-by-side feature comparison
 * 5. Pricing FAQ — common pricing questions
 * 6. CTA Banner — contact call-to-action
 *
 * Pricing data (tiers, comparison rows, FAQs) is imported from data.ts.
 * Each tier card shows price, tagline, feature list with check/x icons,
 * and a CTA button. The "popular" tier gets a highlighted border.
 */

"use client";

import Link from "next/link";
import {
  Check,
  X,
  ArrowRight,
  Star,

  Sparkles,
  DollarSign,
  ShieldCheck,
  Clock,
  Wrench,
} from "lucide-react";
import {
  siteConfig,
  pricingTiers,
  plumbingTiers,
  comparisonRows,
  pricingFaqItems,
  type PricingTier,
  type PlumbingTier,
  type ComparisonRow,
} from "@/lib/data";
import { iconMap } from "@/lib/icons";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import CursorGlow from "@/components/CursorGlow";
import CTABanner from "@/components/CTABanner";
import FaqAccordion from "@/components/FaqAccordion";

/* ================================================================== */
/*  PRICING PAGE                                                       */
/* ================================================================== */

export default function PricingClient() {
  return (
    <>
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section
        aria-label="Pricing hero"
        className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white"
      >
        {/* Decorative shapes */}
        <div aria-hidden="true" className="absolute top-20 left-[10%] h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-accent/5 blur-3xl animate-float" />
        <div aria-hidden="true" className="absolute bottom-32 right-[8%] h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-accent/4 blur-3xl animate-float delay-300" />
        <div aria-hidden="true" className="hidden sm:block absolute top-1/3 right-[15%] h-48 w-48 rounded-full border border-white/5 animate-float delay-500" />
        {/* Animated dots and accent lines */}
        <div aria-hidden="true" className="absolute top-16 left-[15%] w-3 h-3 rounded-full bg-accent/30 animate-dot-pulse" />
        <div aria-hidden="true" className="absolute top-32 right-[20%] w-2 h-2 rounded-full bg-white/20 animate-dot-pulse delay-300" />
        <div aria-hidden="true" className="absolute bottom-24 left-[30%] w-4 h-4 rounded-full bg-accent/20 animate-dot-pulse delay-500" />
        <div aria-hidden="true" className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div aria-hidden="true" className="absolute bottom-1/3 right-0 w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Breadcrumb items={[{ name: "Pricing", path: "/pricing" }]} />
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-accent-light backdrop-blur animate-fade-in motion-reduce:transition-none">
            Transparent Pricing
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slide-up">
            Honest pricing, no surprises.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 lg:text-xl animate-slide-up delay-200">
            Every project starts with a free quote. Choose the package that fits
            your needs — or call us for a custom estimate.
          </p>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 animate-slide-up delay-300" role="list" aria-label="Pricing guarantees">
            <TrustBadge icon={<DollarSign className="h-5 w-5" />} text="Free Estimates" />
            <TrustBadge icon={<ShieldCheck className="h-5 w-5" />} text="90-Day Warranty" />
            <TrustBadge icon={<Clock className="h-5 w-5" />} text="Same-Day Available" />
            <TrustBadge icon={<Wrench className="h-5 w-5" />} text="Licensed & Insured" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. APPLIANCE INSTALLATION PRICING CARDS                     */}
      {/* ============================================================ */}
      <section aria-label="Appliance installation pricing" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent animate-dot-pulse" />
              <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm">
                Appliance Installation
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              Pick your package
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              From single appliance installs to full-home renovations, we have a
              package for every project.
            </p>
          </div>

          {/* Pricing cards — 3-column grid */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3" role="list" aria-label="Installation pricing packages">
            {pricingTiers.map((tier, idx) => (
              <div key={tier.slug} role="listitem"><TierCard tier={tier} index={idx} /></div>
            ))}
          </div>

          {/* Fine print */}
          <p className="mt-8 text-center text-sm text-text-muted dark:text-dark-text-muted">
            All prices are starting points. Final quotes depend on appliance type,
            complexity, and site conditions.{" "}
            <Link href="/contact" aria-label="Contact us for a free estimate" className="text-accent-safe font-semibold hover:underline">
              Contact us
            </Link>{" "}
            for a free estimate.
          </p>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  3. FEATURE COMPARISON TABLE                                 */}
      {/* ============================================================ */}
      <section aria-label="Feature comparison" className="bg-surface-alt dark:bg-dark-surface-alt px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              Compare packages
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              See exactly what&apos;s included in each package.
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-2xl bg-white dark:bg-dark-surface shadow-card dark:shadow-dark-card gradient-border-accent table-scroll-hint">
            <table className="w-full text-sm">
              <caption className="sr-only">Feature comparison of installation packages</caption>
              <thead>
                <tr className="border-b border-border dark:border-dark-border">
                  <th scope="col" className="text-left px-4 sm:px-6 py-4 font-bold text-navy dark:text-dark-text">
                    Feature
                  </th>
                  {pricingTiers.map((tier) => (
                    <th
                      scope="col"
                      key={tier.slug}
                      className={`px-4 sm:px-6 py-4 text-center font-bold ${
                        tier.popular
                          ? "text-accent bg-accent/[0.03]"
                          : "text-navy dark:text-dark-text"
                      }`}
                    >
                      <span className="flex flex-col items-center gap-1">
                        {tier.popular && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
                            <Star className="h-3 w-3" /> Popular
                          </span>
                        )}
                        {tier.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <ComparisonRow key={row.feature} row={row} index={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  4. PLUMBING PRICING CARDS                                   */}
      {/* ============================================================ */}
      <section aria-label="Plumbing pricing" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent animate-dot-pulse" />
              <p className="text-accent-safe font-semibold tracking-wide uppercase text-sm">
                Plumbing Services
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              Plumbing packages
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              From quick fixture swaps to full bathroom renovations, our licensed
              plumbers have you covered.
            </p>
          </div>

          {/* Plumbing cards — 3-column grid */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3" role="list" aria-label="Plumbing pricing packages">
            {plumbingTiers.map((tier, idx) => (
              <div key={tier.slug} role="listitem"><TierCard tier={tier} index={idx} popularBadge="Best Value" /></div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  5. WHY TRANSPARENT PRICING                                  */}
      {/* ============================================================ */}
      <section aria-label="Why transparent pricing" className="relative overflow-hidden bg-navy-dark text-white">
        <CursorGlow />
        <div aria-hidden="true" className="absolute top-[-10%] left-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl animate-float" />
        <div aria-hidden="true" className="absolute bottom-[-15%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl animate-float delay-300" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:px-8">
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block relative">
              Why our pricing is different
              <span aria-hidden="true" className="block mx-auto mt-3 h-1 w-16 rounded-full bg-accent animate-line-grow" />
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed max-w-2xl mx-auto">
              We believe in transparency. No hidden fees, no surprise charges, no
              upselling. Just honest work at honest prices.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto" role="list" aria-label="Pricing advantages">
            <ValueProp
              icon={<DollarSign className="h-6 w-6" />}
              title="Free Estimates"
              description="Every project starts with a no-obligation quote. No pressure, no commitment."
            />
            <ValueProp
              icon={<ShieldCheck className="h-6 w-6" />}
              title="90-Day Warranty"
              description="We stand behind every install. If there's an issue, we fix it — no charge."
            />
            <ValueProp
              icon={<Sparkles className="h-6 w-6" />}
              title="No Hidden Fees"
              description="The price we quote is the price you pay. No surprise charges on install day."
            />
            <ValueProp
              icon={<Clock className="h-6 w-6" />}
              title="Flexible Scheduling"
              description="Same-day and weekend appointments available. We work around your schedule."
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. FAQ                                                      */}
      {/* ============================================================ */}
      <section aria-label="Pricing FAQ" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-dark-text">
              Pricing questions
            </h2>
            <p className="mt-3 text-text-muted dark:text-dark-text-muted lg:text-lg">
              Common questions about our pricing and process.
            </p>
          </div>

          <div className="stagger-children">
            <FaqAccordion faqs={pricingFaqItems} enableHoverEffects />
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================ */}
      {/*  7. CTA                                                      */}
      {/* ============================================================ */}
      <CTABanner
        title="Ready to get a free quote?"
        description="Tell us about your project and we'll provide a transparent estimate — no obligation, no pressure."
        secondaryLabel={`Call ${siteConfig.phone}`}
        secondaryIsPhone
      />
    </>
  );
}

/* ================================================================== */
/*  SUB-COMPONENTS                                                     */
/* ================================================================== */

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div role="listitem" className="flex items-center gap-2 rounded-full bg-white/10 dark:bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/10 motion-reduce:transition-none motion-reduce:transform-none min-h-[44px]">
      <span aria-hidden="true">{icon}</span>
      {text}
    </div>
  );
}

/**
 * Unified tier card for both installation and plumbing pricing.
 * Handles two feature formats:
 * - Object features: `{ label, included, tooltip? }` (installation tiers)
 * - String features: plain string (plumbing tiers — always included)
 */
function TierCard({
  tier,
  index,
  popularBadge = "Most Popular",
}: {
  tier: PricingTier | PlumbingTier;
  index: number;
  popularBadge?: string;
}) {
  const Icon = iconMap[tier.icon];

  /** Normalize features to a common shape for rendering */
  const normalizedFeatures = tier.features.map((f) =>
    typeof f === "string"
      ? { label: f, included: true as const, tooltip: undefined }
      : f,
  );

  return (
    <ScrollReveal delay={((index % 3) + 1) as 1 | 2 | 3}>
      <div
        className={`relative flex flex-col rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none ${
          tier.popular
            ? "bg-white dark:bg-dark-surface border-2 border-accent shadow-[0_0_30px_rgba(232,122,46,0.15)] dark:shadow-[0_0_30px_rgba(232,122,46,0.1)] hover:shadow-[0_0_50px_rgba(232,122,46,0.25)] dark:hover:shadow-[0_0_50px_rgba(232,122,46,0.2)]"
            : "bg-white dark:bg-dark-surface border border-border dark:border-dark-border shadow-card dark:shadow-dark-card hover:shadow-card-hover dark:hover:shadow-dark-card-hover gradient-border-accent"
        }`}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-accent/25">
              <Star className="h-4 w-4" />
              {popularBadge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
            tier.popular
              ? "bg-gradient-to-br from-accent to-accent-light text-white shadow-md shadow-accent/20"
              : "bg-accent/10 text-accent"
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>

        {/* Title & tagline */}
        <h3 className="text-xl font-bold text-navy dark:text-dark-text">
          {tier.name}
        </h3>
        <p className="mt-1 text-sm text-text-muted dark:text-dark-text-muted">
          {tier.tagline}
        </p>

        {/* Price */}
        <div className="mt-6 mb-6 rounded-xl bg-surface-alt/60 dark:bg-dark-surface-alt/40 px-4 py-4 -mx-1">
          <span className="text-4xl font-bold text-navy dark:text-dark-text tracking-tight">
            {tier.price}
          </span>
          <span className="ml-1 text-sm text-text-muted dark:text-dark-text-muted">
            {tier.priceNote}
          </span>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-border dark:bg-dark-border" aria-hidden="true" />

        {/* Features list */}
        <ul className="flex-1 space-y-3 mb-8">
          {normalizedFeatures.map((feature) => (
            <li key={feature.label} className="flex items-start gap-3 group/feature">
              {feature.included ? (
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                  <Check className="h-3 w-3 text-success" strokeWidth={3} aria-hidden="true" />
                </span>
              ) : (
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-alt dark:bg-dark-surface-alt">
                  <X className="h-3 w-3 text-text-muted/50 dark:text-dark-text-muted/50" strokeWidth={3} aria-hidden="true" />
                </span>
              )}
              <span
                className={`text-sm ${
                  feature.included
                    ? "text-text dark:text-dark-text"
                    : "text-text-muted/60 dark:text-dark-text-muted/60"
                }`}
              >
                {feature.label}
                {feature.tooltip && !feature.included && (
                  <span className="ml-1 text-xs text-accent/70">
                    ({feature.tooltip})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={tier.ctaHref}
          aria-label={`${tier.ctaLabel} — ${tier.name} package`}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 btn-press btn-shimmer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-dark-surface min-h-[44px] ${
            tier.popular
              ? "bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30"
              : "bg-navy dark:bg-accent text-white hover:bg-navy-light dark:hover:bg-accent-dark hover:shadow-lg"
          }`}
        >
          {tier.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </ScrollReveal>
  );
}

function ComparisonRow({ row, index }: { row: ComparisonRow; index: number }) {
  const values = [row.basic, row.standard, row.pro];

  return (
    <tr
      className={`border-b border-border/50 dark:border-dark-border/50 transition-colors hover:bg-surface-alt/50 dark:hover:bg-dark-surface-alt/50 ${
        index % 2 === 0 ? "" : "bg-surface-alt/30 dark:bg-dark-surface-alt/30"
      }`}
    >
      <td scope="row" className="px-4 sm:px-6 py-3.5 text-text dark:text-dark-text font-medium">
        {row.feature}
      </td>
      {values.map((value, colIdx) => (
        <td
          key={colIdx}
          className={`px-4 sm:px-6 py-3.5 text-center ${
            colIdx === 1 ? "bg-accent/[0.03]" : ""
          }`}
        >
          {typeof value === "boolean" ? (
            value ? (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} aria-hidden="true" />
                <span className="sr-only">Included</span>
              </span>
            ) : (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface-alt dark:bg-dark-surface-alt">
                <X className="h-3.5 w-3.5 text-text-muted/40 dark:text-dark-text-muted/40" strokeWidth={3} aria-hidden="true" />
                <span className="sr-only">Not included</span>
              </span>
            )
          ) : (
            <span className="text-sm font-medium text-text dark:text-dark-text">
              {value}
            </span>
          )}
        </td>
      ))}
    </tr>
  );
}

function ValueProp({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div role="listitem" className="group text-center rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20 hover:shadow-[0_0_20px_rgba(232,122,46,0.08)] hover:-translate-y-1">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

