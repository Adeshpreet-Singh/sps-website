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
  title: "Commercial Installation",
  description:
    "Large-scale appliance & plumbing installation for hotels, offices & multi-unit buildings.",
  alternates: {
    canonical: "https://spsinstallation.com/services/commercial",
  },
  openGraph: {
    title: "Commercial Installation | SPS Installation",
    description: "Large-scale appliance & plumbing installation for hotels, offices & multi-unit buildings.",
    url: "https://spsinstallation.com/services/commercial",
  },
};

const service = services.find((s) => s.slug === "commercial")!;

const processSteps: ProcessStep[] = processStepsData["commercial"].map(
  (step, idx) => ({
    ...step,
    icon: processStepIconMap[step.iconName],
    image: processStepImages[idx],
  })
);

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

export default function CommercialServicePage() {
  return (
    <ServicePageLayout
      service={service}
      heroImageUrl={serviceHeroImages["commercial"]}
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="End-to-end service for commercial installation projects of any scale."
      processSubtitle="A proven workflow for commercial projects — on time and on budget."
      ctaDescription="Whether it's 5 units or 500, we'll put together a custom quote that fits your timeline and budget."
    />
  );
}
