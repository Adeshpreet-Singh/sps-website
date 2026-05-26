/**
 * @fileoverview Terms of Service page.
 *
 * Outlines the terms and conditions for using SPS Installation services.
 * This is a placeholder — review with legal counsel before publishing.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CTABanner from "@/components/CTABanner";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}. Review our service terms, warranties, and conditions.`,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms of Service for ${siteConfig.name}. Review our service terms, warranties, and conditions.`,
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd items={[{ name: "Terms of Service", path: "/terms" }]} />

      {/* Hero */}
      <section
        aria-label="Terms of service hero"
        className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white"
      >
        <div className="relative z-10 mx-auto max-w-3xl">
          <Breadcrumb items={[{ name: "Terms of Service", path: "/terms" }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slide-up">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 lg:text-xl animate-slide-up delay-200">
            Please review these terms before engaging our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl prose prose-slate dark:prose-invert prose-headings:text-navy dark:prose-headings:text-dark-text prose-a:text-accent-safe">
          <h2>Services</h2>
          <p>
            {siteConfig.name} provides professional appliance installation
            and plumbing services across Metro Vancouver and the Lower Mainland
            of British Columbia. All services are performed by licensed and
            insured technicians.
          </p>

          <h2>Quotes and Pricing</h2>
          <p>
            All quotes are provided free of charge and without obligation.
            Final pricing may vary based on appliance type, installation
            complexity, site conditions, and any additional parts or
            modifications required. We will always communicate pricing changes
            before proceeding with additional work.
          </p>

          <h2>Scheduling</h2>
          <p>
            We make every effort to arrive within the scheduled appointment
            window. We will notify you in advance if we need to reschedule.
            Cancellations made with less than 24 hours notice may be subject
            to a cancellation fee.
          </p>

          <h2>Warranty</h2>
          <p>
            All installations are performed to manufacturer specifications to
            maintain your product warranty. We provide a 90-day workmanship
            guarantee on all installations. If any issue arises from our
            installation work within 90 days, we will return to correct it at
            no additional charge.
          </p>

          <h2>Liability</h2>
          <p>
            {siteConfig.name} carries comprehensive liability insurance.
            We are not responsible for pre-existing conditions, manufacturer
            defects, or damage caused by third-party products or services.
          </p>

          <h2>Customer Responsibilities</h2>
          <p>Customers are responsible for:</p>
          <ul>
            <li>Providing accurate information about the installation site</li>
            <li>Ensuring clear access to the installation area</li>
            <li>Having appliances delivered and unboxed (unless otherwise arranged)</li>
            <li>Disclosing any known issues with existing plumbing or electrical</li>
          </ul>

          <h2>Payment</h2>
          <p>
            Payment is due upon completion of services unless other arrangements
            have been made in writing. We accept major credit cards, debit, and
            e-transfer.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href={siteConfig.emailLink}>{siteConfig.email}</a> or call{" "}
            <a href={siteConfig.phoneLink}>{siteConfig.phone}</a>.
          </p>

          <p className="text-sm text-text-muted dark:text-dark-text-muted">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <CTABanner
        title="Ready to get started?"
        description="Get a free quote for your next appliance installation or plumbing project."
        primaryLabel="Get a Free Quote"
        secondaryLabel={`Call ${siteConfig.phone}`}
        secondaryIsPhone
      />
    </div>
  );
}
