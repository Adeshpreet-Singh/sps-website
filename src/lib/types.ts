/** Shared component types for SPS website */

/** Process step used by service page "Our Process" sections */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}
