import type { Metadata } from "next";
import { services, type FaqItem } from "@/lib/data";
import type { ProcessStep } from "@/lib/types";
import { CalendarClock, MessageSquare, Wrench, ShieldCheck } from "lucide-react";
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

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Project Consultation",
    description:
      "We meet with your team to understand scope, timeline, and site requirements. Multi-unit? No problem — we'll assess volume and logistics.",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
  },
  {
    step: 2,
    title: "Scheduling & Logistics",
    description:
      "We build a phased installation schedule that minimizes disruption — including after-hours and weekend work when needed.",
    icon: CalendarClock,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=200&fit=crop",
  },
  {
    step: 3,
    title: "Execution & Installation",
    description:
      "Our crew handles everything — delivery coordination, installation, testing, and cleanup. We work in parallel to hit your deadlines.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
  },
  {
    step: 4,
    title: "Handover & Support",
    description:
      "Full walkthrough with your team, deficiency resolution, and post-handover support. We stand behind every install.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop",
  },
];

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
      heroImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="End-to-end service for commercial installation projects of any scale."
      processSubtitle="A proven workflow for commercial projects — on time and on budget."
      ctaDescription="Whether it's 5 units or 500, we'll put together a custom quote that fits your timeline and budget."
    />
  );
}
