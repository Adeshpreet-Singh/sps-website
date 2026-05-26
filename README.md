# SPS Installation — Website

Professional website for **Smith Pro Services Ltd.** (SPS), a Metro Vancouver-based appliance installation and plumbing company serving residential and commercial clients.

**Live site:** [spsinstallation.com](https://spsinstallation.com)

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| UI Library | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Icons | Lucide React | 1.16+ |
| Language | TypeScript | 5.x |
| Linting | ESLint (core-web-vitals + typescript) | 9.x |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, metadata, Navbar, Footer, ThemeProvider)
│   ├── page.tsx                # Homepage (server component wrapper)
│   ├── HomeClient.tsx          # Homepage client component (hero, services, stats, FAQ)
│   ├── globals.css             # Tailwind imports + custom theme tokens + animations
│   ├── robots.ts               # SEO robots.txt generation
│   ├── sitemap.ts              # SEO sitemap.xml generation
│   ├── not-found.tsx           # Custom 404 page
│   ├── error.tsx               # Route-level error boundary
│   ├── global-error.tsx        # Root-level error boundary (replaces <html>)
│   ├── loading.tsx             # Root loading skeleton
│   ├── about/                  # About page
│   ├── contact/                # Contact page + form
│   ├── pricing/                # Pricing tiers + comparison table
│   ├── reviews/                # Customer testimonials + aggregate rating
│   ├── faq/                    # FAQ accordion page
│   ├── service-area/           # Metro Vancouver service coverage map
│   └── services/               # Services hub + 4 detail pages
│       ├── appliance-installation/
│       ├── plumbing/
│       ├── residential/
│       └── commercial/
├── components/                 # Shared React components
│   ├── Navbar.tsx              # Sticky nav with mobile drawer, services dropdown, focus trap
│   ├── Footer.tsx              # Site footer with trust badges, links, social
│   ├── CTABanner.tsx           # Reusable call-to-action section
│   ├── ServicePageLayout.tsx   # Shared layout for service detail pages
│   ├── FaqAccordion.tsx        # Expandable FAQ items with CSS Grid animations
│   ├── TestimonialCarousel.tsx # Auto-playing carousel with touch/swipe support
│   ├── StatCounter.tsx         # Animated number counter (hero + card variants)
│   ├── Breadcrumb.tsx          # Visual breadcrumb navigation
│   ├── BreadcrumbJsonLd.tsx    # JSON-LD structured data for breadcrumbs
│   ├── ThemeProvider.tsx       # Dark/light/system theme context + localStorage persistence
│   ├── ThemeToggle.tsx         # Sun/moon toggle button
│   ├── ScrollReveal.tsx        # IntersectionObserver-based reveal animations
│   ├── ScrollProgress.tsx      # Page scroll progress bar
│   ├── ScrollToTop.tsx         # Floating scroll-to-top button
│   ├── CursorGlow.tsx          # Mouse-following radial glow effect
│   ├── PageTransition.tsx      # Route change fade/slide transitions
│   ├── RouteChangeProgress.tsx # Navigation progress bar
│   ├── ErrorBoundary.tsx       # React class error boundary
│   ├── RouteError.tsx          # Shared error page content
│   ├── ErrorIcon.tsx           # Animated alert icon
│   └── Skeleton.tsx            # Loading skeleton components
├── hooks/                      # Custom React hooks
│   ├── useScrollReveal.ts      # Shared IntersectionObserver pool for scroll animations
│   ├── useParallax.ts          # Scroll-based parallax transform
│   ├── useCountUp.ts           # Animated number counter with easing
│   └── useLazyVideo.ts         # Deferred video playback until viewport entry
├── lib/                        # Shared utilities and data
│   ├── data.ts                 # All site content (services, testimonials, pricing, FAQs, etc.)
│   ├── types.ts                # Shared TypeScript interfaces
│   ├── icons.ts                # Icon registry mapping string names to lucide-react components
│   └── createServicePage.tsx   # Factory function for service detail pages
└── middleware.ts               # URL redirects (.html stripping, /index normalization)
```

## Architecture Decisions

### Server/Client Component Split
- **Server components** (`page.tsx` files): Handle metadata exports, SEO structured data, and data imports.
- **Client components** (`*Client.tsx` files): Handle interactivity, animations, and user input.
- This pattern keeps the initial HTML payload lean while enabling rich interactions.

### Service Page Factory
The four service detail pages (appliance-installation, plumbing, residential, commercial) share identical layout structure. `createServicePage()` in `src/lib/createServicePage.tsx` eliminates this repetition — each page only provides its unique metadata, FAQs, and subtitles.

### Shared IntersectionObserver Pool
`useScrollReveal` uses a module-level observer pool keyed by `threshold|rootMargin`. This reduces the homepage from ~9 separate observers to 1-2, improving scroll performance.

### Icon Registry
Service and process step icons are stored as string names in `data.ts` and mapped to lucide-react components via `src/lib/icons.ts`. This keeps the data file import-free and enables tree-shaking.

### Theme System
Class-based dark mode (`@custom-variant dark`) with system preference detection. Theme preference persists in localStorage. A `<script>` tag in the root layout applies the theme before first paint to prevent flash.

## Key Features

- **SEO**: OpenGraph, Twitter cards, JSON-LD structured data (LocalBusiness, Service, FAQ, HowTo, BreadcrumbList, AggregateRating), dynamic sitemap, robots.txt
- **Performance**: Lazy video loading, scroll-based animations with `prefers-reduced-motion` support, image optimization (AVIF/WebP), font subsetting, code splitting via dynamic imports
- **Accessibility**: ARIA labels on all interactive elements, focus trap in mobile nav, keyboard navigation for carousel and FAQ, semantic HTML, `prefers-reduced-motion` respected throughout
- **Error Handling**: Route-level + root-level error boundaries, custom 404 page, loading skeletons for all pages
- **Dark Mode**: Full dark mode support with smooth theme transitions

## Content Management

All content lives in `src/lib/data.ts`. To update business information, services, testimonials, pricing, or FAQs, edit that file directly. The data is statically imported — no CMS or API calls.

## Constraints

- **No build/dev server**: This project is edited as files only. Run `npm run build` locally to verify changes.
- **No `.env` or `.gitignore` modification**: These files are managed separately.
