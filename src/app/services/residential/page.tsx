import type { Metadata } from "next";
import { services, type FaqItem } from "@/lib/data";
import type { ProcessStep } from "@/lib/types";
import { MessageSquare, ClipboardList, Wrench, ShieldCheck } from "lucide-react";
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

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Free Consultation",
    description:
      "Tell us about your project — what you need installed, your timeline, and any special requirements. We'll provide a transparent quote with no hidden fees.",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
  },
  {
    step: 2,
    title: "Scheduling & Coordination",
    description:
      "We coordinate with your retailer for delivery timing and schedule the installation at a time that works for you — including evenings and weekends.",
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=200&fit=crop",
  },
  {
    step: 3,
    title: "Professional Installation",
    description:
      "Our licensed technician arrives on time, protects your floors and surfaces, and installs everything to manufacturer specs — warranty-compliant and code-compliant.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
  },
  {
    step: 4,
    title: "Walkthrough & Cleanup",
    description:
      "We walk you through the installation, answer any questions, test everything, and leave your space spotless. Old appliances? We haul them away.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop",
  },
];

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
      heroImageUrl="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop"
      processSteps={processSteps}
      faqs={faqs}
      includedSubtitle="Everything you need for a hassle-free installation experience."
      processSubtitle="From first call to final walkthrough — here's how it works."
      ctaDescription="Tell us about your project and we'll get back to you with a free quote — usually within the hour."
    />
  );
}
