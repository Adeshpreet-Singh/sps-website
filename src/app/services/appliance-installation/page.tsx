/**
 * @fileoverview Appliance Installation service detail page.
 *
 * Uses the createServicePage factory to generate a fully-wired page with:
 * - SEO metadata and OpenGraph tags
 * - Service-specific FAQ items
 * - Section subtitles for "What's Included", "Our Process", and CTA
 *
 * The factory handles service lookup, process step mapping, hero image
 * assignment, and ServicePageLayout rendering.
 */

import type { Metadata } from "next";
import type { FaqItem } from "@/lib/data";
import { createServicePage } from "@/lib/createServicePage";

export const metadata: Metadata = {
  title: "Appliance Installation",
  description:
    "Professional appliance installation for fridges, ranges, dishwashers, washers & dryers. Warranty-compliant.",
  alternates: {
    canonical: "/services/appliance-installation",
  },
  openGraph: {
    title: "Appliance Installation | SPS Installation",
    description: "Professional appliance installation for fridges, ranges, dishwashers, washers & dryers. Warranty-compliant.",
    url: "/services/appliance-installation",
  },
};

const faqs: FaqItem[] = [
  {
    question: "Do you install appliances purchased from any retailer?",
    answer:
      "Yes — we work with all major retailers including Home Depot, Best Buy, RONA, Canadian Appliance Source, The Brick, and more. No matter where you bought your appliance, we can install it.",
  },
  {
    question: "Will my warranty be affected?",
    answer:
      "No. All of our installations follow manufacturer specifications to the letter, so your product warranty stays fully intact. We're warranty-compliant by design.",
  },
  {
    question: "Do you remove old appliances?",
    answer:
      "Yes — removal and haul-away are included with our installation service. We'll disconnect, remove, and responsibly dispose of your old appliance so you don't have to worry about it.",
  },
  {
    question: "How long does a typical installation take?",
    answer:
      "Most appliance installations take between 1 and 3 hours, depending on the type of appliance and the complexity of the hookup. We'll give you a time estimate when we confirm your booking.",
  },
  {
    question: "Are your technicians licensed and insured?",
    answer:
      "Absolutely. Every SPS technician is fully licensed, bonded, and carries comprehensive liability insurance. Your home is protected from start to finish.",
  },
];

export default createServicePage({
  slug: "appliance-installation",
  metadata,
  faqs,
  includedSubtitle: "Every installation covers the full scope — no surprise add-ons.",
  processSubtitle: "From first call to final walkthrough — here's how it works.",
  ctaDescription: "Get a free quote or schedule your appliance installation today. We'll take care of everything.",
});
