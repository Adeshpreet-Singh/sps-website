import type { Metadata } from "next";
import { services, type FaqItem } from "@/lib/data";
import type { ProcessStep } from "@/lib/types";
import { MessageSquare, ClipboardList, Wrench, ShieldCheck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Appliance Installation",
  description:
    "Professional appliance installation for fridges, ranges, dishwashers, washers & dryers. Warranty-compliant.",
  alternates: {
    canonical: "https://spsinstallation.com/services/appliance-installation",
  },
  openGraph: {
    title: "Appliance Installation | SPS Installation",
    description: "Professional appliance installation for fridges, ranges, dishwashers, washers & dryers. Warranty-compliant.",
    url: "https://spsinstallation.com/services/appliance-installation",
  },
};

const service = services.find((s) => s.slug === "appliance-installation")!;

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Book Online or Call",
    description:
      "Fill out our quick booking form or give us a call. Tell us what appliance you need installed and when works for you.",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
  },
  {
    step: 2,
    title: "We Confirm & Schedule",
    description:
      "Our team reviews your request, confirms the details, and locks in a convenient appointment window.",
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=200&fit=crop",
  },
  {
    step: 3,
    title: "Professional Installation",
    description:
      "A licensed, insured technician arrives on time with all the tools and parts needed for a clean, code-compliant install.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
  },
  {
    step: 4,
    title: "Post-Install Walkthrough",
    description:
      "We walk you through the finished work, answer any questions, and make sure everything is working perfectly before we leave.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop",
  },
];

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

export default function ApplianceInstallationPage() {
  return (
    <ServicePageLayout
      service={service}
      heroImageUrl="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop"
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="Every installation covers the full scope — no surprise add-ons."
      processSubtitle="From first call to final walkthrough — here's how it works."
      ctaDescription="Get a free quote or schedule your appliance installation today. We'll take care of everything."
    />
  );
}
