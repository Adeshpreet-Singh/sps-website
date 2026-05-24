import { services } from "@/lib/data";
import { ClipboardList, MessageSquare, Wrench, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const service = services.find((s) => s.slug === "residential")!;

const processSteps = [
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

const faqs = [
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
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-[#1a2744] px-6 py-20 text-center text-white lg:py-28">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop"
          alt="Residential installation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
            Service #{service.number}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80 lg:text-xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-navy lg:text-4xl">
            What&apos;s Included
          </h2>
          <p className="mt-3 text-center text-text-muted">
            Everything you need for a hassle-free installation experience.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-surface-alt px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-navy lg:text-4xl">
            Our Process
          </h2>
          <p className="mt-3 text-center text-text-muted">
            From first call to final walkthrough — here&apos;s how it works.
          </p>
          <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line — visible on lg only */}
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border lg:block" />
            {processSteps.map(({ step, title, description, icon: Icon, image }) => (
              <div
                key={step}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-md">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="relative mt-3 h-20 w-20 overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="mt-4 text-sm font-semibold uppercase tracking-wider text-accent">
                  Step {step}
                </span>
                <h3 className="mt-1 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-navy lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-white shadow-card transition-all [&[open]]:border-l-4 [&[open]]:border-l-accent"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-lg font-semibold text-navy transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/5 text-lg transition-all group-open:bg-accent/10 group-open:text-accent group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="overflow-hidden px-6 pb-5 text-text-muted leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-navy via-[#1e3054] to-navy px-6 py-16 text-center text-white lg:py-20">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop"
          alt="Tools and plumbing"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Tell us about your project and we&apos;ll get back to you with a free
            quote — usually within the hour.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Get a Free Quote
            </Link>
            <Link
              href="tel:+16048650619"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Call Us Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
