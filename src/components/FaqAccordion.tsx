"use client";

import { useState, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "@/lib/data";

/**
 * FaqAccordion — renders FAQ items with smooth expand/collapse animations.
 *
 * Uses React state + CSS Grid 0fr/1fr transitions for buttery height animations.
 * Supports optional hover effects and stagger animations via props.
 *
 * Accessibility: each item is a heading-level button controlling a panel with
 * aria-expanded and aria-controls. Keyboard users can Tab between items and
 * Enter/Space to toggle.
 */
export default function FaqAccordion({
  faqs,
  enableHoverEffects = false,
}: {
  faqs: FaqItem[];
  /** When true, adds hover shadow/translate/border effects (used on standalone FAQ page) */
  enableHoverEffects?: boolean;
}) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <div className="space-y-3" role="group" aria-label="Frequently asked questions">
      {faqs.map((faq, index) => {
        const isOpen = openIndices.has(index);
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div
            key={faq.question}
            className={`faq-item rounded-xl bg-white dark:bg-dark-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-dark-border transition-all duration-300 ${
              isOpen
                ? "shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:border-accent/20"
                : ""
            } ${
              enableHoverEffects
                ? "hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:border-accent/20 hover:-translate-y-0.5"
                : ""
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="faq-trigger flex w-full cursor-pointer items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-base sm:text-lg font-semibold text-navy dark:text-dark-text select-none transition-colors hover:text-accent text-left faq-summary-hover"
              >
                <span>{faq.question}</span>
                <span
                  className={`faq-icon ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-text-muted dark:text-dark-text-muted transition-all duration-300 ${
                    isOpen
                      ? "border-accent bg-accent text-white"
                      : "border-border dark:border-dark-border"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`faq-panel grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "faq-panel--open" : ""
              }`}
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <div className="faq-content border-l-3 border-accent bg-accent/[0.03] dark:bg-accent/[0.06] mx-4 sm:mx-6 mb-4 sm:mb-5 rounded-r-lg px-4 sm:px-5 py-3 sm:py-4 text-text-muted dark:text-dark-text-muted leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
