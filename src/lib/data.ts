/**
 * @fileoverview Central content data store for SPS Installation website.
 *
 * All business content is defined here — no CMS or external API.
 * Edit this file to update: site config, navigation, services, testimonials,
 * pricing tiers, FAQ items, service areas, process steps, and images.
 *
 * Data sources: spsinstallation.com, Canada Business Corporations Act registry.
 *
 * @remarks
 * Icon names (ServiceIconName, ProcessStepIconName) are string literals
 * that map to lucide-react components via the icon registry in icons.ts.
 * This keeps data.ts import-free and enables tree-shaking.
 */

/** Icon names used in data.ts service definitions (map to lucide-react via iconMap) */
export type ServiceIconName =
  | "Wrench"
  | "Droplets"
  | "Home"
  | "Building2"
  | "Shield"
  | "Clock"
  | "BadgeCheck"
  | "Sparkles";

/** Icon names used in processStepsData (map to lucide-react via processStepIconMap) */
export type ProcessStepIconName =
  | "MessageSquare"
  | "ClipboardList"
  | "Wrench"
  | "ShieldCheck"
  | "CalendarClock";

export const siteConfig = {
  name: "Smith Pro Services Ltd.",
  shortName: "SPS",
  tagline: "Appliance Installation & Plumbing",
  description: "Metro Vancouver's trusted partner for professional appliance installation and plumbing services — serving both residential homes and commercial properties.",
  url: "https://spsinstallation.com",
  phone: "(604) 865-0619",
  phoneLink: "tel:+16048650619",
  email: "info@spsinstallation.com",
  emailLink: "mailto:info@spsinstallation.com",
  hours: "Mon – Sat, 8:00 AM – 6:00 PM",
  address: {
    street: "10750 135a St, #4205",
    city: "Surrey",
    province: "BC",
    postal: "V3T 0V4",
    country: "Canada",
  },
  legal: {
    name: "Swanest Plumbing Services Ltd.",
    corpNumber: "17200021",
    bn: "780521837",
    incorporated: "July 29, 2025",
    act: "Canada Business Corporations Act (CBCA)",
    directors: ["Rajat Kumar", "Diksha Saini"],
  },
  stats: {
    yearsInBusiness: "5+",
    installations: "10k+",
    licensedInsured: "100%",
    rating: "4.6",
  },
  retailers: [
    "Home Depot",
    "Best Buy",
    "RONA",
    "Canadian Appliance Source",
    "The Brick",
  ],
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Service Area", href: "/service-area" },
  { label: "Contact", href: "/contact" },
];

export interface Service {
  slug: string;
  number: string;
  icon: ServiceIconName;
  title: string;
  shortDescription: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    slug: "appliance-installation",
    number: "01",
    icon: "Wrench",
    title: "Appliance Installation",
    shortDescription: "Professional installation of all major household appliances.",
    description:
      "We work directly with Canada's top retailers — so you can buy with confidence and we'll handle the rest, warranty-compliant and on time.",
    items: [
      "Refrigerators & freezers",
      "Ranges & cooktops",
      "Dishwashers",
      "Wall ovens",
      "Washing machines",
      "Dryers (gas & electric)",
      "Over-the-range microwaves",
      "Range hoods & ventilation",
      "Built-in appliances",
      "Appliance removal & haul-away",
    ],
  },
  {
    slug: "plumbing",
    number: "02",
    icon: "Droplets",
    title: "Plumbing Services",
    shortDescription: "From toilet replacements to full bathroom fixture installations.",
    description:
      "Our licensed plumbers handle every aspect of your bathroom and kitchen plumbing with precision and code-compliant craftsmanship.",
    items: [
      "Toilet installation & replacement",
      "Vanity & sink installation",
      "Bathtub installation",
      "Shower units & enclosures",
      "Faucet & fixture replacement",
      "Supply & drain line work",
      "Shut-off valve replacement",
      "P-trap & drain assembly",
      "Water line connections",
      "Old fixture removal & disposal",
    ],
  },
  {
    slug: "residential",
    number: "03",
    icon: "Home",
    title: "Residential Projects",
    shortDescription: "Helping homeowners get new appliances and fixtures installed quickly.",
    description:
      "From single-family homes to condos and townhouses, we help homeowners across Metro Vancouver get new appliances and plumbing fixtures installed quickly, cleanly, and without the hassle.",
    items: [
      "New home move-in installations",
      "Kitchen appliance upgrades",
      "Bathroom fixture replacements",
      "Renovation support",
      "Strata & condo suite work",
      "Retailer delivery coordination",
      "Old unit removal & disposal",
      "Post-install walkthrough",
    ],
  },
  {
    slug: "commercial",
    number: "04",
    icon: "Building2",
    title: "Commercial Projects",
    shortDescription: "Large-scale appliance and plumbing installation projects.",
    description:
      "We partner with property managers, developers, and business owners to handle large-scale appliance and plumbing installation projects — on schedule and with minimal disruption to operations.",
    items: [
      "Multi-unit residential buildings",
      "Rental property suites",
      "Hotel & hospitality fit-outs",
      "Office kitchen appliances",
      "Volume scheduling & logistics",
      "Developer & PM coordination",
      "Deficiency resolution visits",
      "Post-handover support",
    ],
  },
];

export interface Testimonial {
  name: string;
  location: string;
  source: string;
  rating: number;
  service: string;
  quote: string;
  photo?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Michael T.",
    location: "Burnaby",
    source: "Google Review",
    rating: 5,
    service: "Appliance Installation",
    quote:
      "Smith Pro installed our new dishwasher and range on the same day. The tech was professional, super tidy, and took the time to explain everything. No hidden fees. Exactly what I needed.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sandra & James K.",
    location: "Coquitlam",
    source: "Homestars Review",
    rating: 5,
    service: "Plumbing Services",
    quote:
      "Had our entire master bathroom redone — new vanity, toilet, and soaker tub. The plumbing work was flawless and the crew was incredibly respectful of our home. Highly recommend for any bathroom renovation.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Patricia M.",
    location: "Surrey",
    source: "Google Review",
    rating: 5,
    service: "Appliance Installation",
    quote:
      "Smith Pro installed our new fridge and over-the-range microwave. They arrived early, worked quickly, and even hauled away the old appliances. Would absolutely use again — and already referred my sister.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "David L.",
    location: "Richmond",
    source: "Google Review",
    rating: 5,
    service: "Residential Services",
    quote:
      "From the initial quote to the final walkthrough, Smith Pro was outstanding. They installed a new washer/dryer set and fixed a leaky kitchen faucet — all in one visit. Fair pricing and excellent communication throughout.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Rachel & Tom W.",
    location: "North Vancouver",
    source: "Homestars Review",
    rating: 5,
    service: "Plumbing Services",
    quote:
      "Emergency call on a Sunday night — our basement was flooding. Smith Pro had a tech at our door within 45 minutes. They shut off the supply, replaced the burst pipe, and even helped us mop up. Can't say enough good things.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Kevin P.",
    location: "Langley",
    source: "Google Review",
    rating: 5,
    service: "Commercial Services",
    quote:
      "We manage a 40-unit condo and Smith Pro handles all our appliance installs and plumbing needs. Reliable, competitively priced, and the residents always give positive feedback. They're our go-to contractor.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Linda C.",
    location: "Delta",
    source: "Homestars Review",
    rating: 5,
    service: "Appliance Installation",
    quote:
      "The installer showed up on time, wore booties, laid down floor protection, and cleaned up perfectly after installing our new gas range. You can tell they genuinely care about doing quality work. Five stars isn't enough.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Ahmed & Fatima R.",
    location: "Surrey",
    source: "Google Review",
    rating: 5,
    service: "Plumbing Services",
    quote:
      "Complete ensuite renovation — new shower, double vanity, and heated floors. The plumbing was done to code and passed inspection first try. Smith Pro coordinated with the tile and electrical guys seamlessly.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
  },
];

interface WhyUsFeature {
  icon: ServiceIconName;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const whyUsFeatures: WhyUsFeature[] = [
  {
    icon: "Shield",
    title: "Licensed & Fully Insured",
    description:
      "Every technician is licensed, bonded, and carries full liability insurance — so your home is always protected.",
  },
  {
    icon: "Clock",
    title: "On Time, Every Time",
    description:
      "We respect your schedule. Arrival windows are tight and you get a heads-up call before we show up.",
  },
  {
    icon: "BadgeCheck",
    title: "Warranty-Compliant Installs",
    description:
      "All installations follow manufacturer specs to keep your product warranties fully intact.",
  },
  {
    icon: "Sparkles",
    title: "Clean, Respectful Work",
    description:
      "We treat your home like our own — wear booties, protect floors, and clean up completely when done.",
  },
];

export const serviceAreas = [
  "Vancouver",
  "Burnaby",
  "Surrey",
  "Richmond",
  "Coquitlam",
  "North Vancouver",
  "West Vancouver",
  "Langley",
  "Delta",
  "New Westminster",
  "Port Moody",
  "Maple Ridge",
  "Abbotsford",
  "Pitt Meadows",
];

export const serviceTypeOptions = [
  "Refrigerator / Freezer",
  "Range / Cooktop",
  "Dishwasher",
  "Washer / Dryer",
  "Wall Oven",
  "Over-the-Range Microwave",
  "Multiple Appliances",
  "Toilet Installation",
  "Vanity / Sink",
  "Bathtub",
  "Shower Unit",
  "Faucet / Fixture",
  "Full Bathroom",
  "Both (Appliance + Plumbing)",
  "Not Sure — Need Advice",
];

export const retailerOptions = [
  "Home Depot",
  "Best Buy",
  "RONA",
  "Canadian Appliance Source",
  "The Brick",
  "Other / Not Applicable",
];

/**
 * Unsplash photo IDs per service slug — single source of truth.
 * Use `getServiceImage(slug, size)` to get sized URLs.
 */
const servicePhotoIds: Record<string, string> = {
  "appliance-installation": "photo-1556909114-f6e7ad7d3136",
  plumbing: "photo-1585704032915-c3400ca199e7",
  residential: "photo-1504328345606-18bbc8c9d7d1",
  commercial: "photo-1497366216548-37526070297c",
};

/** Build an Unsplash URL for a service image at a given size. */
function getServiceImage(
  slug: string,
  width: number,
  height: number,
): string {
  const photoId = servicePhotoIds[slug];
  return photoId
    ? `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop`
    : "";
}

/** Card thumbnail images (600×400) — used by HomeClient and ServicesClient */
export const serviceImages: Record<string, string> = Object.fromEntries(
  Object.keys(servicePhotoIds).map((slug) => [slug, getServiceImage(slug, 600, 400)]),
);

/** Common process step images — reused by all service detail pages */
export const processStepImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop",
] as const;

/** Descriptive alt text per service slug */
export const serviceImageAlts: Record<string, string> = {
  "appliance-installation":
    "Professional technician installing a modern kitchen appliance in a Metro Vancouver home",
  plumbing:
    "Licensed plumber working on bathroom fixture installation with precision tools",
  residential:
    "Residential home exterior representing appliance and plumbing services for homeowners",
  commercial:
    "Commercial building lobby representing large-scale appliance installation projects",
};

/** Process step data per service slug — icon names map to lucide-react via processStepIconMap */
export const processStepsData: Record<
  string,
  { step: number; title: string; description: string; iconName: ProcessStepIconName }[]
> = {
  "appliance-installation": [
    {
      step: 1,
      title: "Book Online or Call",
      description:
        "Fill out our quick booking form or give us a call. Tell us what appliance you need installed and when works for you.",
      iconName: "MessageSquare",
    },
    {
      step: 2,
      title: "We Confirm & Schedule",
      description:
        "Our team reviews your request, confirms the details, and locks in a convenient appointment window.",
      iconName: "ClipboardList",
    },
    {
      step: 3,
      title: "Professional Installation",
      description:
        "A licensed, insured technician arrives on time with all the tools and parts needed for a clean, code-compliant install.",
      iconName: "Wrench",
    },
    {
      step: 4,
      title: "Post-Install Walkthrough",
      description:
        "We walk you through the finished work, answer any questions, and make sure everything is working perfectly before we leave.",
      iconName: "ShieldCheck",
    },
  ],
  plumbing: [
    {
      step: 1,
      title: "Book Online or Call",
      description:
        "Reach out through our booking form or call us directly. Let us know what plumbing work you need and we'll get the ball rolling.",
      iconName: "MessageSquare",
    },
    {
      step: 2,
      title: "We Confirm & Schedule",
      description:
        "Our team reviews the scope of work, confirms materials and timing, and schedules your appointment at a time that suits you.",
      iconName: "ClipboardList",
    },
    {
      step: 3,
      title: "Professional Installation",
      description:
        "A licensed plumber arrives equipped with the right tools and parts. Every connection is code-compliant and built to last.",
      iconName: "Wrench",
    },
    {
      step: 4,
      title: "Post-Install Walkthrough",
      description:
        "We test every connection, walk you through the completed work, and leave your space spotless. No mess, no callbacks.",
      iconName: "ShieldCheck",
    },
  ],
  residential: [
    {
      step: 1,
      title: "Free Consultation",
      description:
        "Tell us about your project — what you need installed, your timeline, and any special requirements. We'll provide a transparent quote with no hidden fees.",
      iconName: "MessageSquare",
    },
    {
      step: 2,
      title: "Scheduling & Coordination",
      description:
        "We coordinate with your retailer for delivery timing and schedule the installation at a time that works for you — including evenings and weekends.",
      iconName: "ClipboardList",
    },
    {
      step: 3,
      title: "Professional Installation",
      description:
        "Our licensed technician arrives on time, protects your floors and surfaces, and installs everything to manufacturer specs — warranty-compliant and code-compliant.",
      iconName: "Wrench",
    },
    {
      step: 4,
      title: "Walkthrough & Cleanup",
      description:
        "We walk you through the installation, answer any questions, test everything, and leave your space spotless. Old appliances? We haul them away.",
      iconName: "ShieldCheck",
    },
  ],
  commercial: [
    {
      step: 1,
      title: "Project Consultation",
      description:
        "We meet with your team to understand scope, timeline, and site requirements. Multi-unit? No problem — we'll assess volume and logistics.",
      iconName: "MessageSquare",
    },
    {
      step: 2,
      title: "Scheduling & Logistics",
      description:
        "We build a phased installation schedule that minimizes disruption — including after-hours and weekend work when needed.",
      iconName: "CalendarClock",
    },
    {
      step: 3,
      title: "Execution & Installation",
      description:
        "Our crew handles everything — delivery coordination, installation, testing, and cleanup. We work in parallel to hit your deadlines.",
      iconName: "Wrench",
    },
    {
      step: 4,
      title: "Handover & Support",
      description:
        "Full walkthrough with your team, deficiency resolution, and post-handover support. We stand behind every install.",
      iconName: "ShieldCheck",
    },
  ],
};

/** Hero image URLs per service slug (1200×600) — used by ServicePageLayout */
export const serviceHeroImages: Record<string, string> = Object.fromEntries(
  Object.keys(servicePhotoIds).map((slug) => [slug, getServiceImage(slug, 1200, 600)]),
);

/** Avatar URLs for testimonial authors — keyed by name */
interface PricingFeature {
  label: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingTier {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  popular: boolean;
  icon: ServiceIconName;
  features: PricingFeature[];
  ctaLabel: string;
  ctaHref: string;
}

export const pricingTiers: PricingTier[] = [
  {
    slug: "basic",
    name: "Basic Install",
    tagline: "Single appliance, done right",
    price: "From $149",
    priceNote: "per appliance",
    popular: false,
    icon: "Wrench",
    features: [
      { label: "Single appliance installation", included: true },
      { label: "Licensed & insured technician", included: true },
      { label: "Standard connection & testing", included: true },
      { label: "Manufacturer warranty compliance", included: true },
      { label: "Post-install walkthrough", included: true },
      { label: "Old appliance removal", included: false, tooltip: "Available as add-on" },
      { label: "Same-day scheduling", included: false, tooltip: "Available in Standard & Pro" },
      { label: "Multi-appliance discount", included: false, tooltip: "Available in Pro" },
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
  },
  {
    slug: "standard",
    name: "Standard",
    tagline: "Most popular for homeowners",
    price: "From $249",
    priceNote: "per visit",
    popular: true,
    icon: "Home",
    features: [
      { label: "Up to 2 appliance installations", included: true },
      { label: "Licensed & insured technician", included: true },
      { label: "Full connection, testing & cleanup", included: true },
      { label: "Manufacturer warranty compliance", included: true },
      { label: "Post-install walkthrough", included: true },
      { label: "Old appliance removal & haul-away", included: true },
      { label: "Same-day scheduling available", included: true },
      { label: "Multi-appliance discount", included: false, tooltip: "Available in Pro" },
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
  },
  {
    slug: "pro",
    name: "Pro Package",
    tagline: "Full-service for renovations & moves",
    price: "From $449",
    priceNote: "per project",
    popular: false,
    icon: "Building2",
    features: [
      { label: "Unlimited appliance installations", included: true },
      { label: "Licensed & insured technician", included: true },
      { label: "Full connection, testing & cleanup", included: true },
      { label: "Manufacturer warranty compliance", included: true },
      { label: "Post-install walkthrough", included: true },
      { label: "Old appliance removal & haul-away", included: true },
      { label: "Priority same-day scheduling", included: true },
      { label: "Multi-appliance volume discount", included: true },
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
  },
];

export interface PlumbingTier {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  popular: boolean;
  icon: ServiceIconName;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const plumbingTiers: PlumbingTier[] = [
  {
    slug: "fixture-swap",
    name: "Fixture Swap",
    tagline: "Single fixture replacement",
    price: "From $199",
    priceNote: "per fixture",
    popular: false,
    icon: "Droplets",
    features: [
      "Single fixture install or replace",
      "Shut-off valve check",
      "Supply line connection",
      "Leak testing & cleanup",
      "Licensed plumber",
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
  },
  {
    slug: "bathroom-refresh",
    name: "Bathroom Refresh",
    tagline: "Multi-fixture bathroom update",
    price: "From $399",
    priceNote: "per bathroom",
    popular: true,
    icon: "Sparkles",
    features: [
      "Up to 3 fixtures installed",
      "Vanity, toilet & faucet combo",
      "Supply & drain line work",
      "Old fixture removal & disposal",
      "Licensed plumber",
      "Code-compliant installation",
    ],
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
  },
  {
    slug: "full-reno",
    name: "Full Reno",
    tagline: "Complete bathroom plumbing",
    price: "Custom Quote",
    priceNote: "per project",
    popular: false,
    icon: "Shield",
    features: [
      "Full bathroom rough-in & finish",
      "All fixtures, supply & drain",
      "Shower/tub installation",
      "Code-compliant & inspected",
      "Licensed plumber",
      "Project coordination",
      "Old material removal",
    ],
    ctaLabel: "Request Quote",
    ctaHref: "/contact",
  },
];

export const homeFaqItems: FaqItem[] = [
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
    question: "How quickly can you schedule an installation?",
    answer:
      "In most cases, we can schedule your installation within 2–5 business days. Same-day scheduling is available with our Standard and Pro packages. During peak seasons it may take a bit longer, but we always do our best to accommodate your preferred timing.",
  },
  {
    question: "Will my appliance warranty be affected?",
    answer:
      "No. All of our installations follow manufacturer specifications to the letter, so your product warranty stays fully intact. We're warranty-compliant by design.",
  },
  {
    question: "Do you remove old appliances?",
    answer:
      "Yes — removal and haul-away are included with our Standard and Pro installation packages. We'll disconnect, remove, and responsibly dispose of your old appliance so you don't have to worry about it.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "You can request a free quote by filling out our online contact form or calling us directly. We'll get back to you promptly with a transparent, no-obligation estimate. Estimates are always free.",
  },
];

export const pricingFaqItems: FaqItem[] = [
  {
    question: "How are prices determined?",
    answer:
      "Our prices are starting points. The final quote depends on the specific appliance type, installation complexity, site conditions, and any additional parts or modifications needed. We always provide a transparent quote before starting work — no surprises.",
  },
  {
    question: "Do you offer discounts for multiple appliances?",
    answer:
      "Yes! The Pro Package includes volume discounts for multiple appliance installations. For commercial projects or large-scale installs, contact us for a custom quote — we're competitive and transparent.",
  },
  {
    question: "Is there a warranty on installation?",
    answer:
      "Absolutely. All our installations are warranty-compliant and we stand behind our work. If there's an issue related to our installation within 90 days, we'll fix it at no charge.",
  },
  {
    question: "What's included in the post-install walkthrough?",
    answer:
      "We walk you through the finished work, test all connections, demonstrate how the appliance or fixture works, answer any questions, and make sure everything is perfect before we leave. For plumbing, we also check for leaks and verify water pressure.",
  },
  {
    question: "Do you charge for estimates?",
    answer:
      "No — estimates and quotes are always free. We'll assess your project, discuss options, and provide a transparent quote with no obligation. Call us or fill out our online form to get started.",
  },
];

export interface ComparisonRow {
  feature: string;
  basic: string | boolean;
  standard: string | boolean;
  pro: string | boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: "Appliance installations", basic: "1 appliance", standard: "Up to 2", pro: "Unlimited" },
  { feature: "Licensed & insured technician", basic: true, standard: true, pro: true },
  { feature: "Connection & testing", basic: "Standard", standard: "Full", pro: "Full" },
  { feature: "Warranty compliance", basic: true, standard: true, pro: true },
  { feature: "Post-install walkthrough", basic: true, standard: true, pro: true },
  { feature: "Old appliance removal", basic: false, standard: true, pro: true },
  { feature: "Same-day scheduling", basic: false, standard: true, pro: "Priority" },
  { feature: "Volume discount", basic: false, standard: false, pro: true },
  { feature: "Cleanup included", basic: "Basic", standard: "Full", pro: "Full" },
];

export const testimonialAvatars: Record<string, string> = {
  "Michael T.":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "Sandra & James K.":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "Patricia M.":
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
};
