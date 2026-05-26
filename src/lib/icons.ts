/**
 * Shared icon registry — maps ServiceIconName / ProcessStepIconName strings from
 * data.ts to their lucide-react component counterparts. Eliminates per-file iconMap duplication.
 *
 * Also includes process step icons used by service detail pages.
 */
import {
  Wrench,
  Droplets,
  Home,
  Building2,
  Shield,
  Clock,
  BadgeCheck,
  Sparkles,
  MessageSquare,
  ClipboardList,
  ShieldCheck,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName, ProcessStepIconName } from "@/lib/data";

/** Icons for data.ts service definitions */
export const iconMap: Record<ServiceIconName, LucideIcon> = {
  Wrench,
  Droplets,
  Home,
  Building2,
  Shield,
  Clock,
  BadgeCheck,
  Sparkles,
};

/** Icons for process steps — keyed by name from processStepsData */
export const processStepIconMap: Record<ProcessStepIconName, LucideIcon> = {
  MessageSquare,
  ClipboardList,
  Wrench,
  ShieldCheck,
  CalendarClock,
};

/**
 * Build fully-typed ProcessStep[] from data.ts for a given service slug.
 * Eliminates the repeated .map() boilerplate in each service detail page.
 */
export function buildProcessSteps(
  slug: string,
  processStepsData: Record<string, { step: number; title: string; description: string; iconName: ProcessStepIconName }[]>,
  processStepImages: readonly string[],
): import("@/lib/types").ProcessStep[] {
  return (processStepsData[slug] ?? []).map((step, idx) => ({
    ...step,
    icon: processStepIconMap[step.iconName],
    image: processStepImages[idx],
  }));
}
