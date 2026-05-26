import type { Metadata } from "next";
import {
  services,
  type FaqItem,
  processStepsData,
  processStepImages,
  serviceHeroImages,
} from "@/lib/data";
import { buildProcessSteps } from "@/lib/icons";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Residential Installation",
  description:
    "Home appliance & plumbing installation for houses, condos & townhomes across Metro Vancouver.",
  alternates: {
    canonical: "https://spsinstallation.com/services/residential",
  },
  openGraph: {
    title: "Residential Installation | SPS Installation",
    description: "Home appliance & plumbing installation for houses, condos & townhomes across Metro Vancouver.",
    url: "https://spsinstallation.com/services/residential",
  },
};

const service = services.find((s) => s.slug === "residential")!;

const processSteps = buildProcessSteps("residential", processStepsData, processStepImages);

const faqs: FaqItem[] = [
  {
    question: "Do you work with strata/condo buildings?",
    answer:
      "Yes, we coordinate with strata management for access, elevator bookings, and any building-specific requirements. We're experienced with the unique needs of multi-unit residential buildings across Metro Vancouver.",
  },
  {
    question: "Can I schedule around my renovation timeline?",
    answer:
      "Absolutely — we understand renovations don't always go to plan. We offer flexible scheduling and can hold your installation date or reschedule with reasonable notice. Just keep us in the loop and we'll work with your timeline.",
  },
  {
    question: "Do you coordinate with retailer deliveries?",
    answer:
      "Yes, we work directly with Home Depot, Best Buy, RONA, Canadian Appliance Source, The Brick, and other major retailers. We can schedule your installation to align with the delivery window so everything happens in one smooth visit.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "All of Metro Vancouver and the Lower Mainland — including Surrey, Vancouver, Burnaby, Richmond, Coquitlam, North Vancouver, West Vancouver, Langley, Delta, New Westminster, Port Moody, Maple Ridge, Abbotsford, and Pitt Meadows.",
  },
  {
    question: "Are your installations warranty-compliant?",
    answer:
      "Every installation follows manufacturer specifications to keep your product warranty fully intact. Our technicians are trained on all major appliance brands and we pull permits when required by code.",
  },
];

export default function ResidentialServicePage() {
  return (
    <ServicePageLayout
      service={service}
      heroImageUrl={serviceHeroImages["residential"]}
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="Everything you need for a hassle-free installation experience."
      processSubtitle="From first call to final walkthrough — here's how it works."
      ctaDescription="Tell us about your project and we'll get back to you with a free quote — usually within the hour."
    />
  );
}
