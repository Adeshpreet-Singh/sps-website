"use client";

import Link from "next/link";
import { siteConfig, type FaqItem } from "@/lib/data";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import CursorGlow from "@/components/CursorGlow";

const generalFaqs: FaqItem[] = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve all of Metro Vancouver and the Lower Mainland, including Vancouver, Burnaby, Surrey, Richmond, Coquitlam, North Vancouver, West Vancouver, Langley, Delta, New Westminster, Port Moody, Maple Ridge, Abbotsford, and Pitt Meadows.",
  },
  {
    question: "Are your technicians licensed and insured?",
    answer:
      "Absolutely. Every SPS technician is fully licensed, bonded, and carries comprehensive liability insurance. Your home is protected from start to finish.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "You can request a free quote by filling out our online contact form or calling us directly at our phone number. We'll get back to you promptly with a transparent, no-obligation estimate.",
  },
  {
    question: "What are your business hours?",
    answer: `We're available ${siteConfig.hours}. If you have an urgent need outside these hours, leave us a message and we'll get back to you first thing the next business day.`,
  },
  {
    question: "Do you offer warranties on your work?",
    answer:
      "Yes — all of our work comes with a workmanship guarantee. If anything goes wrong due to our installation, we'll come back and fix it at no extra charge. Additionally, all installations follow manufacturer specifications to keep your product warranties fully intact.",
  },
  {
    question: "How quickly can you schedule an installation?",
    answer:
      "In most cases, we can schedule your installation within 2–5 business days. During peak seasons it may take a bit longer, but we always do our best to accommodate your preferred timing.",
  },
];

const applianceFaqs: FaqItem[] = [
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
];

const plumbingFaqs: FaqItem[] = [
  {
    question: "Do you handle both small and large plumbing jobs?",
    answer:
      "Yes — from a single faucet replacement to a full bathroom renovation, we handle plumbing projects of all sizes. Whether it's a quick fix or a multi-day install, we've got you covered.",
  },
  {
    question: "Do I need a permit for plumbing work?",
    answer:
      "It depends on the scope of the project. Simple fixture replacements (like-for-like) typically don't require a permit, but any work that involves moving or adding new plumbing lines may. We'll advise you during the quote process and handle any required permits.",
  },
  {
    question: "Can you work with my renovation contractor?",
    answer:
      "Absolutely. We regularly coordinate with general contractors, designers, and other trades to ensure plumbing work fits seamlessly into your renovation timeline.",
  },
];

export default function FAQPage() {
  const [ctaRef, ctaVisible] = useScrollReveal();

  // Build FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...generalFaqs,
      ...applianceFaqs,
      ...plumbingFaqs,
    ].map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://spsinstallation.com" },
              { "@type": "ListItem", position: 2, name: "FAQ", item: "https://spsinstallation.com/faq" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-label="FAQ hero" className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light py-16 sm:py-24 md:py-36">
        {/* Cursor glow effect */}
        <CursorGlow />
        <div aria-hidden="true" className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        <div aria-hidden="true" className="absolute top-16 left-[15%] w-3 h-3 rounded-full bg-accent/30" />
        <div aria-hidden="true" className="absolute top-32 right-[20%] w-2 h-2 rounded-full bg-white/20" />
        <div aria-hidden="true" className="absolute bottom-24 left-[30%] w-4 h-4 rounded-full bg-accent/20" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent bg-accent/10 rounded-full border border-accent/20 animate-fade-in">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-slide-up">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Everything you need to know about our appliance installation and
            plumbing services. Can&apos;t find your answer?{" "}
            <Link
              href="/contact"
              className="text-accent underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── General FAQs ─────────────────────────────────── */}
      <FAQSection
        title="General Questions"
        description="Common questions about working with Smith Pro Services."
        faqs={generalFaqs}
        id="general"
      />

      {/* ── Appliance Installation FAQs ──────────────────── */}
      <FAQSection
        title="Appliance Installation"
        description="Questions about our appliance installation service."
        faqs={applianceFaqs}
        id="appliance-installation"
        bgColor="bg-surface-alt dark:bg-dark-surface-alt"
        linkHref="/services/appliance-installation"
        linkText="View Appliance Installation Service"
      />

      {/* ── Plumbing FAQs ────────────────────────────────── */}
      <FAQSection
        title="Plumbing Services"
        description="Questions about our plumbing services."
        faqs={plumbingFaqs}
        id="plumbing"
        linkHref="/services/plumbing"
        linkText="View Plumbing Service"
      />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section aria-label="Contact us" className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy py-10 sm:py-14 md:py-20 lg:py-28">
        {/* Cursor glow effect */}
        <CursorGlow />
        <div aria-hidden="true" className="absolute top-[-10%] left-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-15%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl" />

        <div ref={ctaRef} className={`relative mx-auto max-w-3xl px-4 sm:px-6 text-center reveal-hidden ${ctaVisible ? "reveal-visible" : ""}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Still have questions?
          </h2>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Our team is happy to help. Reach out and we&apos;ll get you the
            answers you need.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg shadow-lg shadow-accent/25 btn-press btn-shimmer"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={siteConfig.phoneLink}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 btn-press"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQSection({
  title,
  description,
  faqs,
  id,
  bgColor = "bg-surface dark:bg-dark-surface",
  linkHref,
  linkText,
}: {
  title: string;
  description: string;
  faqs: { question: string; answer: string }[];
  id: string;
  bgColor?: string;
  linkHref?: string;
  linkText?: string;
}) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id={id} aria-label={title} className={`${bgColor} px-4 sm:px-6 py-16 sm:py-20 lg:py-28`}>
      <div ref={ref} className={`mx-auto max-w-3xl reveal-hidden ${isVisible ? "reveal-visible" : ""}`}>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-navy dark:text-dark-text lg:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-text-muted dark:text-dark-text-muted text-center max-w-xl mx-auto text-lg">
          {description}
        </p>
        <div className="mt-12 space-y-3 stagger-children">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl bg-white dark:bg-dark-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-dark-border transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:border-accent/20 open:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:open:border-accent/20 hover:-translate-y-0.5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-navy dark:text-dark-text select-none transition-colors hover:text-accent [&::-webkit-details-marker]:hidden faq-summary-hover">
                {faq.question}
                <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border dark:border-dark-border text-text-muted dark:text-dark-text-muted transition-all group-open:border-accent group-open:bg-accent group-open:text-white">
                  <Plus className="h-4 w-4 transition-transform group-open:hidden" aria-hidden="true" />
                  <Minus className="hidden h-4 w-4 group-open:block" aria-hidden="true" />
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
        {linkHref && linkText && (
          <div className="mt-8 text-center">
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-safe hover:text-accent-dark transition-colors"
            >
              {linkText}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
