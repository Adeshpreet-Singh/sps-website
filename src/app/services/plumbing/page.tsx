/**
 * @fileoverview Plumbing service detail page.
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
  title: "Plumbing Services",
  description:
    "Licensed plumbing installation — toilets, vanities, bathtubs, faucets & more. Serving Metro Vancouver.",
  alternates: {
    canonical: "/services/plumbing",
  },
  openGraph: {
    title: "Plumbing Services | SPS Installation",
    description: "Licensed plumbing installation — toilets, vanities, bathtubs, faucets & more. Serving Metro Vancouver.",
    url: "/services/plumbing",
  },
};

const faqs: FaqItem[] = [
  {
    question: "Are your plumbers licensed?",
    answer:
      "Yes — every SPS technician is fully licensed, bonded, and carries comprehensive liability insurance. We meet or exceed all BC regulatory requirements for plumbing work.",
  },
  {
    question: "Do you handle emergency plumbing?",
    answer:
      "We focus on scheduled installations and fixture replacements rather than emergency repairs. If you need a toilet, vanity, faucet, or bathtub installed, we're the right team. For burst pipes or flooding, we recommend calling an emergency plumber first.",
  },
  {
    question: "Can you match existing fixtures?",
    answer:
      "Absolutely. We work with all major brands and can source fixtures that match your existing bathroom or kitchen setup. If you have a specific finish or style in mind, let us know and we'll help you find the right match.",
  },
  {
    question: "Do I need to supply the fixtures?",
    answer:
      "It's up to you. You can purchase your own fixtures and we'll install them, or we can advise on the best options and source them for you. Either way, the installation quality is the same.",
  },
  {
    question: "How long does a typical plumbing installation take?",
    answer:
      "Most fixture installations — toilets, faucets, vanities — take 1 to 2 hours. Larger projects like full bathroom installs or bathtub replacements may take half a day. We'll give you a clear timeline when we confirm your booking.",
  },
];

export default createServicePage({
  slug: "plumbing",
  metadata,
  faqs,
  includedSubtitle: "Full-service plumbing — from rough-in to final fixture.",
  processSubtitle: "From first call to final walkthrough — here's how it works.",
  ctaDescription: "Get a free quote or schedule your plumbing installation today. Licensed plumbers, clean work, fair pricing.",
});
