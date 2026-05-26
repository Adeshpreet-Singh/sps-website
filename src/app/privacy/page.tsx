/**
 * @fileoverview Privacy Policy page.
 *
 * Outlines how SPS Installation collects, uses, and protects
 * customer information.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CTABanner from "@/components/CTABanner";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      <BreadcrumbJsonLd items={[{ name: "Privacy Policy", path: "/privacy" }]} />

      {/* Hero */}
      <section
        aria-label="Privacy policy hero"
        className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white"
      >
        <div className="relative z-10 mx-auto max-w-3xl">
          <Breadcrumb items={[{ name: "Privacy Policy", path: "/privacy" }]} />
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slide-up">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 lg:text-xl animate-slide-up delay-200">
            Your privacy matters to us. This policy explains how we handle
            your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-surface dark:bg-dark-surface px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl prose prose-slate dark:prose-invert prose-headings:text-navy dark:prose-headings:text-dark-text prose-a:text-accent-safe">
          <h2>Information We Collect</h2>
          <p>
            When you fill out our contact form or call us, we may collect your
            name, email address, phone number, and details about your project.
            This information is used solely to respond to your inquiry and
            provide our services.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your quote requests and inquiries</li>
            <li>Schedule and deliver installation services</li>
            <li>Send appointment confirmations and follow-ups</li>
            <li>Improve our services and customer experience</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share information with trusted partners who assist
            in operating our website and conducting our business, provided they
            agree to keep the information confidential.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience.
            You can choose to disable cookies through your browser settings.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. To exercise these rights, please contact us at{" "}
            <a href={siteConfig.emailLink}>{siteConfig.email}</a>.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us
            at <a href={siteConfig.emailLink}>{siteConfig.email}</a> or call{" "}
            <a href={siteConfig.phoneLink}>{siteConfig.phone}</a>.
          </p>

          <p className="text-sm text-text-muted dark:text-dark-text-muted">
            Last updated: May 2026
          </p>
        </div>
      </section>

      <CTABanner
        title="Questions about your privacy?"
        description="Our team is happy to address any concerns about how we handle your data."
        primaryLabel="Contact Us"
        secondaryLabel={`Call ${siteConfig.phone}`}
        secondaryIsPhone
      />
    </div>
  );
}
