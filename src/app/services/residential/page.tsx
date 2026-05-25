import type { Metadata } from "next";
import { services } from "@/lib/data";

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
import { ClipboardList, MessageSquare, Wrench, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

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
              { "@type": "ListItem", position: 3, name: service.title, item: "https://spsinstallation.com/services/residential" },
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
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=600&fit=crop"
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
            Everything you need for a hassle-free installation experience.
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
            From first call to final walkthrough — here&apos;s how it works.
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
            Tell us about your project and we&apos;ll get back to you with a free
            quote — usually within the hour.
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
