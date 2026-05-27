/**
 * @fileoverview Service area page — shows Metro Vancouver coverage.
 *
 * Server component that renders:
 * 1. Hero — background image with floating shapes and breadcrumb
 * 2. Coverage grid — city cards with service availability
 * 3. Trust features — licensed, insured, same-day availability
 * 4. CTA Banner — contact call-to-action
 *
 * Includes BreadcrumbJsonLd for structured data. Service area data
 * (cities, regions) is imported from data.ts.
 */

import type { Metadata } from "next";

// ISR: revalidate every 24 hours (service area is stable)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam & all of Metro Vancouver's Lower Mainland.",
  alternates: {
    canonical: "/service-area",
  },
  openGraph: {
    title: "Service Area | SPS Installation",
    description: "Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam & all of Metro Vancouver's Lower Mainland.",
    url: "/service-area",
  },
};

import Image from "next/image";
import { serviceAreas, siteConfig } from "@/lib/data";
import {
  MapPin,
  Home,
  Wrench,
  Clock,
  Shield,
  Truck,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CTABanner from "@/components/CTABanner";

export default function ServiceAreaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Service Area", path: "/service-area" }]} />
      {/* Hero — background image with entrance animations */}
      <section aria-label="Service area hero" className="relative overflow-hidden text-white py-16 sm:py-20 lg:py-28 px-4 sm:px-6">
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
        <div className="absolute inset-0 bg-navy/50" />
        {/* Decorative floating shapes */}
        <div aria-hidden="true" className="absolute top-[-10%] right-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-15%] left-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Breadcrumb items={[{ name: "Service Area", path: "/service-area" }]} />
          <span className="inline-block rounded-full bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 mb-6 animate-fade-in">
            Serving Metro Vancouver
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 tracking-tight animate-slide-up">
            Where We Work
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Based in Metro Vancouver, we serve homeowners and developers across
            the entire Lower Mainland of B.C.
          </p>
        </div>
      </section>

      {/* Coverage Area — gradient border card, CSS grid pattern */}
      <section aria-label="Coverage details" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal variant="fade-scale">
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-accent via-accent-light to-navy gradient-border-shine">
              <div className="rounded-[14px] bg-surface dark:bg-dark-surface p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Service area image */}
                  <div className="relative aspect-[4/3] sm:aspect-square max-h-[240px] sm:max-h-[300px] md:max-h-[340px] rounded-xl overflow-hidden img-zoom-hover">
                    <Image
                      src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop"
                      alt="Service area coverage"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                      loading="lazy"
                    />
                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-navy/90 text-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
                        <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />
                        Metro Vancouver &amp; Lower Mainland, B.C.
                      </span>
                    </div>
                  </div>

                  {/* Coverage details */}
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-success/10 text-success px-4 py-1.5 text-sm font-semibold mb-4">
                      <span aria-hidden="true" className="w-2 h-2 rounded-full bg-success animate-dot-pulse" />
                      Full Coverage
                    </span>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-text dark:text-dark-text mb-4">
                      Lower Mainland&apos;s Trusted Installation Team
                    </h2>
                    <p className="text-text-muted dark:text-dark-text-muted leading-relaxed mb-6">
                      From Vancouver to Abbotsford, our technicians cover the
                      entire Metro Vancouver region and beyond. We bring
                      professional installation right to your door.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-muted dark:text-dark-text-muted">
                        <Shield className="w-4 h-4 text-accent" aria-hidden="true" />
                        Licensed &amp; Insured
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-muted dark:text-dark-text-muted">
                        <Clock className="w-4 h-4 text-accent" aria-hidden="true" />
                        Same-Day Available
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-muted dark:text-dark-text-muted">
                        <Truck className="w-4 h-4 text-accent" aria-hidden="true" />
                        On-Site Service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cities Grid — badges with hover fill */}
      <section aria-label="Cities we serve" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-surface-alt dark:bg-dark-surface-alt">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text dark:text-dark-text mb-4">
                Cities We Serve
              </h2>
              <p className="text-text-muted dark:text-dark-text-muted max-w-xl mx-auto leading-relaxed">
                We provide professional installation services throughout the
                following communities.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ul className="flex flex-wrap justify-center gap-3 stagger-tags" aria-label="Cities we serve">
              {serviceAreas.map((city) => (
                <li
                  key={city}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-navy/15 dark:border-dark-border bg-surface dark:bg-dark-surface px-5 py-2.5 text-sm font-medium text-navy dark:text-dark-text transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy dark:hover:bg-accent dark:hover:border-accent dark:hover:text-white hover:shadow-xl hover:shadow-navy/25 dark:hover:shadow-accent/25 hover:scale-105 active:scale-95 cursor-default motion-reduce:transition-none motion-reduce:transform-none min-h-[44px]"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent group-hover:text-accent-light transition-colors" aria-hidden="true" />
                  {city}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Details — two-column icon cards */}
      <section aria-label="Service details" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text dark:text-dark-text mb-4">
                We Come to You
              </h2>
              <p className="text-text-muted dark:text-dark-text-muted max-w-xl mx-auto">
                Our technicians travel directly to your home or job site — no need
                to bring appliances anywhere.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6" role="list" aria-label="Service features">
            {[
              {
                icon: Home,
                title: "On-Site Installation",
                desc: "We handle everything at your location — from unboxing to final testing, all in one visit.",
              },
              {
                icon: Truck,
                title: "Retailer Coordination",
                desc: "We work directly with Home Depot, Best Buy, RONA, and more to sync delivery with install.",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                desc: "Same-day and next-day appointments available in most areas. We work around your schedule.",
              },
              {
                icon: Wrench,
                title: "Full-Service Setup",
                desc: "Hookup, leveling, testing, and cleanup — we don't leave until everything works perfectly.",
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <ScrollReveal key={title} delay={(idx + 1) as 1 | 2 | 3 | 4}>
                <div
                  role="listitem"
                  className="group flex gap-5 rounded-2xl border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-6 transition-all duration-500 hover:border-accent/30 dark:hover:border-accent/30 card-hover motion-reduce:transition-none motion-reduce:transform-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-text dark:text-dark-text text-lg mb-1.5">
                      {title}
                    </h3>
                    <p className="text-text-muted dark:text-dark-text-muted text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Don't see your area?"
        description="We may still be able to help. Reach out and we&apos;ll let you know if we can accommodate your location."
        primaryLabel={`Call ${siteConfig.phone}`}
        primaryIsPhone
        secondaryLabel={siteConfig.email}
        secondaryIsEmail
      />
    </div>
  );
}
