import { services } from "@/lib/data";
import { CalendarClock, MessageSquare, Wrench, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const service = services.find((s) => s.slug === "commercial")!;

const processSteps = [
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

const faqs = [
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
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-[#1a2744] px-6 py-20 text-center text-white lg:py-28">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
          alt="Commercial office space"
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
            End-to-end service for commercial installation projects of any scale.
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
            A proven workflow for commercial projects — on time and on budget.
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
            Tell us about your project — whether it&apos;s 5 units or 500, we&apos;ll put
            together a custom quote that fits your timeline and budget.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Request a Commercial Quote
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
