import type { Metadata } from "next";
import { services, type FaqItem } from "@/lib/data";
import type { ProcessStep } from "@/lib/types";
import { MessageSquare, ClipboardList, Wrench, ShieldCheck } from "lucide-react";
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

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Book Online or Call",
    description:
      "Reach out through our booking form or call us directly. Let us know what plumbing work you need and we'll get the ball rolling.",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
  },
  {
    step: 2,
    title: "We Confirm & Schedule",
    description:
      "Our team reviews the scope of work, confirms materials and timing, and schedules your appointment at a time that suits you.",
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=200&fit=crop",
  },
  {
    step: 3,
    title: "Professional Installation",
    description:
      "A licensed plumber arrives equipped with the right tools and parts. Every connection is code-compliant and built to last.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
  },
  {
    step: 4,
    title: "Post-Install Walkthrough",
    description:
      "We test every connection, walk you through the completed work, and leave your space spotless. No mess, no callbacks.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop",
  },
];

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
      heroImageUrl="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=600&fit=crop"
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="Full-service plumbing — from rough-in to final fixture."
      processSubtitle="From first call to final walkthrough — here's how it works."
      ctaDescription="Get a free quote or schedule your plumbing installation today. Licensed plumbers, clean work, fair pricing."
    />
  );
}
