/**
 * Shared icon registry — maps LucideIconName strings from data.ts to their
 * lucide-react component counterparts. Eliminates per-file iconMap duplication.
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
  type LucideIcon,
} from "lucide-react";
import type { LucideIconName } from "@/lib/data";

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
