import type { Metadata } from "next";
import { services } from "@/lib/data";

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
import { CalendarClock, MessageSquare, Wrench, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://spsinstallation.com" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://spsinstallation.com/services" },
              { "@type": "ListItem", position: 3, name: service.title, item: "https://spsinstallation.com/services/commercial" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: `https://spsinstallation.com/services/${service.slug}`,
            provider: {
              "@type": "LocalBusiness",
              name: "Smith Pro Services Ltd.",
              telephone: "+1-604-865-0619",
            },
            areaServed: {
              "@type": "GeoCircle",
              geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 49.28,
                longitude: -122.55,
              },
              geoRadius: "50000",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: service.title,
              itemListElement: service.items.map((item: string, idx: number) => ({
                "@type": "Offer",
                position: idx + 1,
                itemOffered: {
                  "@type": "Service",
                  name: item,
                },
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: service.title,
            description: service.description,
            step: processSteps.map((s) => ({
              "@type": "HowToStep",
              position: s.step,
              name: s.title,
              text: s.description,
              image: s.image,
            })),
          }),
        }}
      />
      {/* Hero */}
      <section aria-label="Service hero" className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-[#1a2744] px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent animate-fade-in">
            Service #{service.number}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight lg:text-6xl animate-slide-up">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80 lg:text-xl animate-slide-up delay-200">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section aria-label="What's included" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 py-16 lg:py-24">
        <ScrollReveal className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
            What&apos;s Included
          </h2>
          <p className="mt-3 text-center text-text-muted dark:text-dark-text-muted">
            End-to-end service for commercial installation projects of any scale.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface p-5 shadow-card dark:shadow-none transition-shadow hover:shadow-card-hover dark:hover:border-accent/20"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg
                    aria-hidden="true"
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
                <span className="text-text dark:text-dark-text">{item}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Our Process */}
      <section aria-label="Our process" className="bg-surface-alt dark:bg-dark-surface-alt px-4 sm:px-6 py-16 lg:py-24">
        <ScrollReveal className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
            Our Process
          </h2>
          <p className="mt-3 text-center text-text-muted dark:text-dark-text-muted">
            A proven workflow for commercial projects — on time and on budget.
          </p>
          <div className="relative mt-14">
            {/* Connecting line — visible on lg only */}
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border dark:bg-dark-border lg:block" />
            {/* Connecting line — vertical on mobile */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border dark:bg-dark-border lg:hidden" />

            <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map(({ step, title, description, icon: Icon, image }) => (
              <div
                key={step}
                className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center animate-slide-up"
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
                    sizes="(max-width: 1023px) 96px, 80px"
                  />
                </div>
                <div className="lg:mt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Step {step}
                </span>
                <h3 className="mt-1 text-lg font-bold text-navy dark:text-dark-text">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted dark:text-dark-text-muted">
                  {description}
                </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQs */}
      <section aria-label="Frequently asked questions" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 py-16 lg:py-24">
        <ScrollReveal className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface shadow-card dark:shadow-none transition-all [&[open]]:border-l-4 [&[open]]:border-l-accent"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 sm:px-6 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-navy dark:text-dark-text transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/5 dark:bg-dark-border/30 text-lg transition-all group-open:bg-accent/10 group-open:text-accent group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="overflow-hidden px-4 sm:px-6 pb-4 sm:pb-5 text-text-muted dark:text-dark-text-muted leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section aria-label="Get started" className="relative overflow-hidden bg-gradient-to-r from-navy via-[#1e3054] to-navy px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-navy/50" />
        <ScrollReveal className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Tell us about your project — whether it&apos;s 5 units or 500, we&apos;ll put
            together a custom quote that fits your timeline and budget.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-dark hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 btn-press"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 btn-press"
            >
              View All Services
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
