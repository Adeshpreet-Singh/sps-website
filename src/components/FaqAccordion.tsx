import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "@/lib/data";

/**
 * FaqAccordion — renders a list of FAQ items as <details>/<summary> accordions.
 *
 * Shared by ServicePageLayout and FaqClient to eliminate markup duplication.
 * Supports optional hover effects and stagger animations via props.
 */
export default function FaqAccordion({
  faqs,
  enableHoverEffects = false,
}: {
  faqs: FaqItem[];
  /** When true, adds hover shadow/translate/border effects (used on standalone FAQ page) */
  enableHoverEffects?: boolean;
}) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className={`group rounded-xl bg-white dark:bg-dark-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-dark-border transition-all duration-300 open:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${
            enableHoverEffects
              ? "hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:border-accent/20 dark:open:border-accent/20 hover:-translate-y-0.5"
              : ""
          }`}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-navy dark:text-dark-text select-none transition-colors hover:text-accent [&::-webkit-details-marker]:hidden faq-summary-hover">
            {faq.question}
            <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border dark:border-dark-border text-text-muted dark:text-dark-text-muted transition-all group-open:border-accent group-open:bg-accent group-open:text-white">
              <Plus
                className="h-4 w-4 transition-transform group-open:hidden"
                aria-hidden="true"
              />
              <Minus
                className="hidden h-4 w-4 group-open:block"
                aria-hidden="true"
              />
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
  );
}
