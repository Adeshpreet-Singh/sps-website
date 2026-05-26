/**
 * @fileoverview Pricing page route.
 *
 * Server component that exports SEO metadata, JSON-LD Service schemas
 * for each pricing tier (both installation and plumbing), and renders
 * the interactive PricingClient component.
 */

import type { Metadata } from "next";
import { siteConfig, pricingTiers, plumbingTiers } from "@/lib/data";
import PricingClient from "./PricingClient";

/* ── SEO Metadata ── */

export const metadata: Metadata = {
  title: "Pricing — Transparent Installation & Plumbing Quotes | SPS",
  description:
    "View SPS Installation pricing for appliance installation and plumbing services in Metro Vancouver. Free estimates, no hidden fees, 90-day warranty on all installs.",
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
  openGraph: {
    title: "Pricing — Transparent Installation & Plumbing Quotes | SPS",
    description:
      "View SPS Installation pricing for appliance installation and plumbing services in Metro Vancouver. Free estimates, no hidden fees, 90-day warranty on all installs.",
    url: `${siteConfig.url}/pricing`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Transparent Installation & Plumbing Quotes | SPS",
    description:
      "View SPS Installation pricing for appliance installation and plumbing services in Metro Vancouver. Free estimates, no hidden fees, 90-day warranty on all installs.",
  },
};

/* ── JSON-LD Structured Data ── */

function PricingJsonLd() {
  const serviceSchemas = [
    ...pricingTiers.map((tier) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: tier.name,
      description: tier.tagline,
      url: `${siteConfig.url}/pricing#${tier.slug}`,
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        telephone: siteConfig.phoneLink.replace("tel:", ""),
      },
      offers: {
        "@type": "Offer",
        price: tier.price.replace(/[^0-9]/g, ""),
        priceCurrency: "CAD",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: tier.price.replace(/[^0-9]/g, ""),
          priceCurrency: "CAD",
          description: tier.priceNote,
        },
      },
    })),
    ...plumbingTiers.map((tier) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: tier.name,
      description: tier.tagline,
      url: `${siteConfig.url}/pricing#${tier.slug}`,
      provider: {
        "@type": "LocalBusiness",
        name: siteConfig.name,
        telephone: siteConfig.phoneLink.replace("tel:", ""),
      },
      offers: {
        "@type": "Offer",
        price: tier.price.replace(/[^0-9]/g, "") || "0",
        priceCurrency: "CAD",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: tier.price.replace(/[^0-9]/g, "") || "0",
          priceCurrency: "CAD",
          description: tier.priceNote,
        },
      },
    })),
  ];

  return (
    <>
      {serviceSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/* ── Page Component ── */

export default function PricingPage() {
  return (
    <>
      <PricingJsonLd />
      <PricingClient />
    </>
  );
}
