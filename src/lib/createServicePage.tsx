/**
 * Factory for service detail pages — eliminates the repeated boilerplate
 * across residential, commercial, plumbing, and appliance-installation pages.
 *
 * Each page only needs to provide its unique metadata and FAQ content;
 * the shared wiring (service lookup, process steps, hero image) is handled here.
 */
import type { Metadata } from "next";
import type { FaqItem } from "@/lib/data";
import { services, processStepsData, processStepImages, serviceHeroImages } from "@/lib/data";
import { buildProcessSteps } from "@/lib/icons";
import ServicePageLayout from "@/components/ServicePageLayout";

interface ServicePageConfig {
  /** Service slug matching data.ts (e.g. "residential", "plumbing") */
  slug: string;
  /** Next.js page-level metadata */
  metadata: Metadata;
  /** FAQ items specific to this service */
  faqs: FaqItem[];
  /** Subtitle for the "What's Included" section */
  includedSubtitle: string;
  /** Subtitle for the "Our Process" section */
  processSubtitle: string;
  /** Description for the CTA section */
  ctaDescription: string;
}

/**
 * Creates a fully-wired service detail page component.
 *
 * ```ts
 * // app/services/plumbing/page.tsx
 * export const metadata = { ... };
 * export default createServicePage({
 *   slug: "plumbing",
 *   metadata,
 *   faqs: [...],
 *   includedSubtitle: "...",
 *   processSubtitle: "...",
 *   ctaDescription: "...",
 * });
 * ```
 */
export function createServicePage({
  slug,
  faqs,
  includedSubtitle,
  processSubtitle,
  ctaDescription,
}: ServicePageConfig) {
  const service = services.find((s) => s.slug === slug)!;
  const processSteps = buildProcessSteps(slug, processStepsData, processStepImages);

  return function ServicePage() {
    return (
      <ServicePageLayout
        service={service}
        heroImageUrl={serviceHeroImages[slug]}
        processSteps={processSteps}
        faqs={faqs}
        includedSubtitle={includedSubtitle}
        processSubtitle={processSubtitle}
        ctaDescription={ctaDescription}
      />
    );
  };
}
