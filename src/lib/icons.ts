/**
 * Shared icon registry — maps LucideIconName strings from data.ts to their
 * lucide-react component counterparts. Eliminates per-file iconMap duplication.
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
import type { LucideIconName } from "@/lib/data";

/** Icons for data.ts service definitions */
export const iconMap: Record<LucideIconName, LucideIcon> = {
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
export const processStepIconMap: Record<string, LucideIcon> = {
  MessageSquare,
  ClipboardList,
  Wrench,
  ShieldCheck,
  CalendarClock,
};
