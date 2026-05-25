import type { Metadata } from "next";
import { services, type FaqItem } from "@/lib/data";

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
import { Check, MessageSquare, ClipboardList, Wrench, ShieldCheck, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const service = services.find((s) => s.slug === "appliance-installation")!;

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
              { "@type": "ListItem", position: 3, name: service.title, item: "https://spsinstallation.com/services/appliance-installation" },
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
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop"
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
            Every installation covers the full scope — no surprise add-ons.
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
                  <div className="details-content border-l-3 border-accent bg-accent/[0.03] dark:bg-accent/[0.06] mx-4 sm:mx-6 mb-4 sm:mb-5 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4 text-text-muted dark:text-dark-text-muted leading-relaxed text-sm sm:text-base">
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
            Get a free quote or schedule your appliance installation today.
            We&apos;ll take care of everything.
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
