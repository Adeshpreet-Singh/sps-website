import type { Metadata } from "next";
import { services, type FaqItem } from "@/lib/data";

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
import { Check, MessageSquare, ClipboardList, Wrench, ShieldCheck, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const service = services.find((s) => s.slug === "plumbing")!;

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

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
              { "@type": "ListItem", position: 3, name: service.title, item: "https://spsinstallation.com/services/plumbing" },
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
      <section aria-label="Service hero" className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center text-white">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1200&h=600&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-navy/50" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-accent-light backdrop-blur animate-fade-in">
            Service #{service.number}
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white animate-slide-up">
            {service.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 lg:text-xl animate-slide-up delay-200">
            {service.description}
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section aria-label="What's included" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
            What&apos;s Included
          </h2>
          <p className="mt-3 text-center text-text-muted dark:text-dark-text-muted lg:text-lg">
            Full-service plumbing — from rough-in to final fixture.
          </p>
          <div className="mt-12 rounded-2xl bg-white dark:bg-dark-surface p-6 shadow-card dark:shadow-none dark:border dark:border-dark-border sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {service.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-alt"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-4 w-4 text-accent" strokeWidth={3} />
                  </span>
                  <span className="text-text dark:text-dark-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Our Process */}
      <section aria-label="Our process" className="bg-surface-alt dark:bg-dark-surface-alt px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <ScrollReveal className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
            Our Process
          </h2>
          <p className="mt-3 text-center text-text-muted dark:text-dark-text-muted lg:text-lg">
            From first call to final walkthrough — here&apos;s how it works.
          </p>
          <div className="relative mt-14">
            {/* Connecting line — horizontal on desktop */}
            <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-border dark:bg-dark-border lg:block" />
            {/* Connecting line — vertical on mobile */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border dark:bg-dark-border lg:hidden" />

            <div className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
              {processSteps.map(({ step, title, description, icon: Icon, image }, idx) => (
                <div
                  key={step}
                  className="relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center animate-slide-up"
                  style={{ animationDelay: `${idx * 120}ms` }}
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
                    sizes="80px"
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
      <section aria-label="Frequently asked questions" className="bg-surface dark:bg-dark-surface px-4 sm:px-6 py-20 lg:py-28">
        <ScrollReveal className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl bg-white dark:bg-dark-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-dark-border transition-all open:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-navy dark:text-dark-text select-none transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border dark:border-dark-border text-text-muted dark:text-dark-text-muted transition-all group-open:border-accent group-open:bg-accent group-open:text-white">
                    <Plus className="h-4 w-4 transition-transform group-open:hidden" />
                    <Minus className="hidden h-4 w-4 group-open:block" />
                  </span>
                </summary>
                <div className="overflow-hidden transition-all">
                  <div className="details-content border-l-3 border-accent bg-accent/[0.03] mx-4 sm:mx-6 mb-4 sm:mb-5 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4 text-text-muted dark:text-dark-text-muted leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section aria-label="Get started" className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4 sm:px-6 py-20 text-center text-white lg:py-28">
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
          <h2 className="text-3xl font-bold lg:text-5xl">
            Ready to get started?
          </h2>
          <p className="mt-5 text-lg text-white/70 lg:text-xl">
            Get a free quote or schedule your plumbing installation today.
            Licensed plumbers, clean work, fair pricing.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
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
