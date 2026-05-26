/** Shared component types for SPS website */

/** Process step used by service page "Our Process" sections */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

/** Breadcrumb item used by Breadcrumb (visual) and BreadcrumbJsonLd (structured data) */
export interface BreadcrumbItem {
  name: string;
  /** Path relative to the site root, e.g. "/about" or "/services/plumbing" */
  path: string;
}
