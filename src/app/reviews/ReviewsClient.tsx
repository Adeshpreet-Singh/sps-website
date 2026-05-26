/**
 * @fileoverview Reviews page client component.
 *
 * Renders:
 * 1. Hero — dark overlay with background image, aggregate rating display
 * 2. Review grid — testimonial cards with star ratings and quotes
 * 3. External review links — Google, Homestars, Yelp badges
 * 4. CTA Banner — contact call-to-action
 *
 * Includes JSON-LD AggregateRating structured data for rich search results.
 * The star display calculates full/half stars from the numeric rating.
 */

"use client";

import { Star, ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import { testimonials, siteConfig, testimonialAvatars } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CursorGlow from "@/components/CursorGlow";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CTABanner from "@/components/CTABanner";

const RATING = parseFloat(siteConfig.stats.rating);
const FULL_STARS = Math.floor(RATING);
const HAS_HALF = RATING % 1 >= 0.5;

const RATING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: RATING.toString(),
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  review: testimonials.map((t) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: t.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating.toString(),
      bestRating: "5",
    },
    reviewBody: t.quote,
  })),
};

export default function ReviewsClient() {
  const [ratingRef, ratingVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal();
  const [linksRef, linksVisible] = useScrollReveal();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-surface">
      <BreadcrumbJsonLd items={[{ name: "Reviews", path: "/reviews" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RATING_SCHEMA) }}
      />
      {/* Hero */}
      <section aria-label="Reviews hero" className="relative overflow-hidden py-16 sm:py-24 md:py-36">
        {/* Cursor glow effect */}
        <CursorGlow />
        {/* Background image — decorative */}
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-slide-up">
              What Our Customers Say
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70 animate-slide-up delay-200">
              Don&apos;t just take our word for it. Hear from homeowners and
              businesses across Metro Vancouver who trust{" "}
              {siteConfig.shortName}.
            </p>
          </div>
        </div>
      </section>

      {/* Overall Rating Summary */}
      <section aria-label="Overall rating" className="-mt-12 relative z-10 pb-16 sm:pb-20">
        <div ref={ratingRef} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-scale-hidden ${ratingVisible ? "reveal-scale-visible" : ""}`}>
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl bg-white dark:bg-dark-surface p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-none ring-1 ring-border dark:ring-dark-border transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 star-rating-pop" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      className={`h-7 w-7 sm:h-8 sm:w-8 ${
                        i < FULL_STARS
                          ? "fill-yellow-400 text-yellow-400"
                          : i === FULL_STARS && HAS_HALF
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "fill-border text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-navy dark:text-dark-text">
                  {RATING} / 5
                </p>
                <span className="sr-only">{RATING} out of 5 stars</span>
                <p className="mt-2 text-sm text-text-muted dark:text-dark-text-muted">
                  Based on Google and Homestars reviews
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
                  <span className="text-sm font-semibold text-accent-safe">
                    {siteConfig.stats.installations} satisfied customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section aria-label="Customer testimonials" className="bg-gradient-to-b from-surface-alt dark:from-dark-surface-alt to-white dark:to-dark-surface py-16 sm:py-20">
        <div ref={gridRef} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-hidden ${gridVisible ? "reveal-visible" : ""}`}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`group relative rounded-2xl bg-white dark:bg-dark-surface p-6 sm:p-8 shadow-card dark:shadow-none ring-1 ring-border dark:ring-dark-border transition-all duration-500 hover:shadow-card-hover dark:hover:border-accent/30 hover:-translate-y-0.5 card-hover card-tilt reveal-hidden ${gridVisible ? "reveal-visible" : ""} reveal-delay-${(idx % 3) + 1}`}
              >
                {/* Left accent gradient border */}
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-accent to-accent-light" />

                {/* Decorative quote mark */}
                <div className="mb-4">
                  <Quote className="h-10 w-10 text-accent/15 fill-accent/5" aria-hidden="true" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 star-rating-pop" aria-hidden="true">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="sr-only">{t.rating} out of 5 stars</span>
                {/* Quote */}
                <blockquote className="mt-4 text-base leading-relaxed text-text-muted dark:text-dark-text-muted italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author info */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {(t.photo || testimonialAvatars[t.name]) && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-accent/20">
                        <Image
                          src={t.photo || testimonialAvatars[t.name]}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-text dark:text-dark-text">
                        {t.name}
                      </p>
                      <p className="text-xs text-text-muted dark:text-dark-text-muted">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Source badge */}
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        t.source.includes("Google")
                          ? "bg-accent/10 text-accent-safe"
                          : "bg-navy/10 dark:bg-dark-surface-alt text-navy dark:text-dark-text"
                      }`}
                    >
                      {t.source}
                    </span>
                  </div>
                </div>

                {/* Service tag */}
                <span className="mt-4 inline-flex items-center rounded-full bg-surface-alt dark:bg-dark-surface-alt px-2.5 py-0.5 text-xs font-medium text-text-muted dark:text-dark-text-muted">
                  {t.service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Links */}
      <section aria-label="External review platforms" className="py-16 sm:py-20">
        <div ref={linksRef} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-hidden ${linksVisible ? "reveal-visible" : ""}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-text-muted dark:text-dark-text-muted uppercase tracking-wider">
              See more reviews on
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <a
                href="https://www.google.com/maps/search/smith+pro+services+surrey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read our reviews on Google Business (opens in new tab)"
                className="group relative rounded-2xl bg-white dark:bg-dark-surface p-5 sm:p-6 shadow-card dark:shadow-none ring-1 ring-border dark:ring-dark-border transition-all duration-500 hover:shadow-card-hover dark:hover:border-accent/30 hover:-translate-y-1 card-hover gradient-border-shine"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent/10">
                      <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm sm:text-base font-semibold text-text dark:text-dark-text">Google Business</p>
                      <p className="text-xs sm:text-sm text-text-muted dark:text-dark-text-muted">Read our reviews</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-text-muted dark:text-dark-text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </a>
              <a
                href="https://www.homestars.com/companies/smith-pro-services"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read our reviews on Homestars (opens in new tab)"
                className="group relative rounded-2xl bg-white dark:bg-dark-surface p-5 sm:p-6 shadow-card dark:shadow-none ring-1 ring-border dark:ring-dark-border transition-all duration-500 hover:shadow-card-hover dark:hover:border-accent/30 hover:-translate-y-1 card-hover gradient-border-shine"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent/10">
                      <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF6B35" stroke="#FF6B35" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm sm:text-base font-semibold text-text dark:text-dark-text">Homestars</p>
                      <p className="text-xs sm:text-sm text-text-muted dark:text-dark-text-muted">Verified reviews</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-text-muted dark:text-dark-text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Experience the Smith Pro difference"
        description="Ready to work with Metro Vancouver&apos;s most trusted appliance installation and plumbing team?"
        primaryLabel="Get in Touch"
      />
    </div>
  );
}
