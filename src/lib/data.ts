// SPS Installation — All content data
// Source: spsinstallation.com + Canada Company Registry

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
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
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
  },
  {
    name: "Sandra & James K.",
    location: "Coquitlam",
    source: "Homestars Review",
    rating: 5,
    service: "Plumbing Services",
    quote:
      "Had our entire master bathroom redone — new vanity, toilet, and soaker tub. The plumbing work was flawless and the crew was incredibly respectful of our home. Highly recommend for any bathroom renovation.",
  },
  {
    name: "Patricia M.",
    location: "Surrey",
    source: "Google Review",
    rating: 5,
    service: "Appliance Installation",
    quote:
      "Smith Pro installed our new fridge and over-the-range microwave. They arrived early, worked quickly, and even hauled away the old appliances. Would absolutely use again — and already referred my sister.",
  },
];

export interface WhyUsFeature {
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
export function getServiceImage(
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
export const testimonialAvatars: Record<string, string> = {
  "Michael T.":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "Sandra & James K.":
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "Patricia M.":
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
};
