/**
 * @fileoverview Commercial service detail page.
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

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Commercial Installation",
  description:
    "Large-scale appliance & plumbing installation for hotels, offices & multi-unit buildings.",
  alternates: {
    canonical: "/services/commercial",
  },
  openGraph: {
    title: "Commercial Installation | SPS Installation",
    description: "Large-scale appliance & plumbing installation for hotels, offices & multi-unit buildings.",
    url: "/services/commercial",
  },
};

const faqs: FaqItem[] = [
  {
    question: "Do you handle multi-unit projects?",
    answer:
      "Yes, from 5 units to 500+. We've completed large-scale installations for developers, property managers, and hotel chains across Metro Vancouver. Our crew is equipped for volume work with phased scheduling.",
  },
  {
    question: "Can you work after business hours?",
    answer:
      "Yes, we offer flexible scheduling including evenings, weekends, and overnight shifts to minimize disruption to your operations or tenants. Just let us know your constraints during the consultation.",
  },
  {
    question: "Do you provide volume pricing?",
    answer:
      "Yes, contact us for a custom quote. Volume pricing depends on unit count, appliance types, and site logistics. We're competitive and transparent — no hidden surcharges for large projects.",
  },
  {
    question: "What types of commercial properties do you serve?",
    answer:
      "Hotels, offices, rental buildings, restaurants, retail spaces, medical clinics, and more. If it needs appliances or plumbing installed, we've likely done it. Reach out and we'll confirm we can handle your project.",
  },
  {
    question: "Do you coordinate with general contractors?",
    answer:
      "Absolutely. We regularly work alongside GCs, electricians, and other trades on active construction sites. We'll align our schedule with yours to keep the project moving smoothly.",
  },
];

export default createServicePage({
  slug: "commercial",
  faqs,
  includedSubtitle: "End-to-end service for commercial installation projects of any scale.",
  processSubtitle: "A proven workflow for commercial projects — on time and on budget.",
  ctaDescription: "Whether it's 5 units or 500, we'll put together a custom quote that fits your timeline and budget.",
});
