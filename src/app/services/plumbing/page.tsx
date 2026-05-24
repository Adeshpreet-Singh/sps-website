import { services } from "@/lib/data";
import { Check, MessageSquare, ClipboardList, Wrench, ShieldCheck, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const service = services.find((s) => s.slug === "plumbing")!;

const processSteps = [
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

const faqs = [
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
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-6 py-24 text-center text-white lg:py-32">
        <Image
          src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=600&fit=crop"
          alt="Plumbing installation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-accent-light backdrop-blur">
            Service #{service.number}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 lg:text-xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-surface px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-navy lg:text-4xl">
            What&apos;s Included
          </h2>
          <p className="mt-3 text-center text-text-muted lg:text-lg">
            Full-service plumbing — from rough-in to final fixture.
          </p>
          <div className="mt-12 rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-alt"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 text-accent" strokeWidth={3} />
                  </span>
                  <span className="text-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-surface-alt px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-navy lg:text-4xl">
            Our Process
          </h2>
          <p className="mt-3 text-center text-text-muted lg:text-lg">
            From first call to final walkthrough — here&apos;s how it works.
          </p>
          <div className="relative mt-14">
            {/* Connecting line — horizontal on desktop */}
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border lg:block" />
            {/* Connecting line — vertical on mobile */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border lg:hidden" />

            <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
              {processSteps.map(({ step, title, description, icon: Icon, image }) => (
                <div
                  key={step}
                  className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-xl lg:mt-4">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="lg:mt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                      Step {step}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-navy">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-surface px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-navy lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all open:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-navy select-none transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-all group-open:border-accent group-open:bg-accent group-open:text-white">
                    <Plus className="h-4 w-4 transition-transform group-open:hidden" />
                    <Minus className="hidden h-4 w-4 group-open:block" />
                  </span>
                </summary>
                <div className="overflow-hidden transition-all">
                  <div className="border-l-3 border-accent bg-accent/[0.03] mx-6 mb-5 rounded-r-lg px-5 py-4 text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-6 py-20 text-center text-white lg:py-28">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop"
          alt="Tools and plumbing"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold lg:text-5xl">
            Ready to get started?
          </h2>
          <p className="mt-5 text-lg text-white/70 lg:text-xl">
            Get a free quote or schedule your plumbing installation today.
            Licensed plumbers, clean work, fair pricing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark hover:shadow-accent/30"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
