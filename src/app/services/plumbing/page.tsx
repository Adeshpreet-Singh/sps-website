import type { Metadata } from "next";
import {
  services,
  type FaqItem,
  processStepsData,
  processStepImages,
  serviceHeroImages,
} from "@/lib/data";
import type { ProcessStep } from "@/lib/types";
import { processStepIconMap } from "@/lib/icons";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Plumbing Services",
  description:
    "Licensed plumbing installation — toilets, vanities, bathtubs, faucets & more. Serving Metro Vancouver.",
  alternates: {
    canonical: "https://spsinstallation.com/services/plumbing",
  },
  openGraph: {
    title: "Plumbing Services | SPS Installation",
    description: "Licensed plumbing installation — toilets, vanities, bathtubs, faucets & more. Serving Metro Vancouver.",
    url: "https://spsinstallation.com/services/plumbing",
  },
};

const service = services.find((s) => s.slug === "plumbing")!;

const processSteps: ProcessStep[] = processStepsData["plumbing"].map(
  (step, idx) => ({
    ...step,
    icon: processStepIconMap[step.iconName],
    image: processStepImages[idx],
  })
);

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

export default function PlumbingPage() {
  return (
    <ServicePageLayout
      service={service}
      heroImageUrl={serviceHeroImages["plumbing"]}
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="Full-service plumbing — from rough-in to final fixture."
      processSubtitle="From first call to final walkthrough — here's how it works."
      ctaDescription="Get a free quote or schedule your plumbing installation today. Licensed plumbers, clean work, fair pricing."
    />
  );
}
