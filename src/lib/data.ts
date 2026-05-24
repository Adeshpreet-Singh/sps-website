// SPS Installation — All content data
// Source: spsinstallation.com + Canada Company Registry

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
  icon: string;
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
  icon: string;
  title: string;
  description: string;
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

export const mapConfig = {
  center: { lat: 49.28, lng: -122.55 },
  zoom: 9,
};
