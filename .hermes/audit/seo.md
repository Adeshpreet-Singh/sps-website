# SEO & Meta Tags Audit — SPS Website

**Audited:** 2026-05-25  
**Project:** /home/adeshpreet-singh/github/sps-website  
**Site URL:** https://spsinstallation.com

---

## 1. Root Layout Metadata (`src/app/layout.tsx`)

### Current State
```ts
export const metadata: Metadata = {
  title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
  description: "Metro Vancouver's trusted partner for professional appliance installation and plumbing services — serving both residential homes and commercial properties.",
};
```

### Issues Found

| # | Severity | Issue | Details |
|---|----------|-------|---------|
| 1 | **CRITICAL** | No `metadataBase` | Without `metadataBase`, all relative URLs in metadata (Open Graph images, canonical) won't resolve. Should be `"https://spsinstallation.com"`. |
| 2 | **HIGH** | No Open Graph tags | No `openGraph` object defined. Missing `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`. Social sharing will show unformatted/ugly previews. |
| 3 | **HIGH** | No Twitter card tags | No `twitter` object defined. Missing `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. |
| 4 | **HIGH** | No canonical URL | No `alternates.canonical` set. Risk of duplicate content issues if the site is accessible via multiple paths (with/without trailing slash, www vs non-www). |
| 5 | **MEDIUM** | Title format is good | Uses brand + service + location pattern. Acceptable. |
| 6 | **MEDIUM** | Description length | 203 characters — slightly over the recommended 155-160 char limit for SERP display. Will be truncated in Google results. |
| 7 | **LOW** | No `robots` metadata | Default is `index, follow` which is fine, but explicitly setting it is best practice. |
| 8 | **LOW** | No `verification` metadata | No Google Search Console or Bing verification codes. |

### Recommendation
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://spsinstallation.com"),
  title: {
    default: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    template: "%s | SPS Installation",
  },
  description: "Metro Vancouver's trusted appliance installation & plumbing team. Licensed, insured, warranty-compliant. Serving Surrey, Vancouver, Burnaby & beyond.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://spsinstallation.com",
    siteName: "SPS Installation",
    title: "SPS Installation — Appliance Installation & Plumbing | Metro Vancouver",
    description: "Metro Vancouver's trusted appliance installation & plumbing team.",
    images: [
      {
        url: "/og-image.jpg",  // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: "SPS Installation — Appliance Installation & Plumbing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPS Installation — Appliance Installation & Plumbing",
    description: "Metro Vancouver's trusted appliance installation & plumbing team.",
    images: ["/og-image.jpg"],
  },
};
```

---

## 2. Per-Page Metadata Exports

| Page | Has `metadata` export? | Has `generateMetadata`? | Status |
|------|------------------------|-------------------------|--------|
| `/` (Home) | ❌ No | ❌ No | Relies on root layout only |
| `/about` | ❌ No | ❌ No | **Missing** |
| `/contact` | ❌ No | ❌ No | **Missing** |
| `/services` | ❌ No | ❌ No | **Missing** |
| `/services/plumbing` | ❌ No | ❌ No | **Missing** |
| `/services/appliance-installation` | ❌ No | ❌ No | **Missing** |
| `/services/residential` | ❌ No | ❌ No | **Missing** |
| `/services/commercial` | ❌ No | ❌ No | **Missing** |
| `/service-area` | ❌ No | ❌ No | **Missing** |
| `/reviews` | ❌ No | ❌ No | **Missing** |

**Result:** ZERO pages have individual metadata. Every page inherits the same root title and description, which is terrible for SEO. Each page should have unique title, description, and OG tags.

### Priority Metadata for Each Page

| Page | Suggested Title | Suggested Description (≤160 chars) |
|------|----------------|-----------------------------------|
| `/` | (root default) | (root default) |
| `/about` | "About Us" | "Learn about SPS Installation — Metro Vancouver's trusted team for appliance installation & plumbing since 2025." |
| `/contact` | "Contact Us" | "Get a free quote for appliance installation or plumbing. Call (604) 865-0619 or fill out our online form." |
| `/services` | "Our Services" | "Appliance installation & plumbing services for residential & commercial properties across Metro Vancouver." |
| `/services/plumbing` | "Plumbing Services" | "Licensed plumbing installation — toilets, vanities, bathtubs, faucets & more. Serving Metro Vancouver." |
| `/services/appliance-installation` | "Appliance Installation" | "Professional appliance installation for fridges, ranges, dishwashers, washers & dryers. Warranty-compliant." |
| `/services/residential` | "Residential Installation" | "Home appliance & plumbing installation for houses, condos & townhomes across Metro Vancouver." |
| `/services/commercial` | "Commercial Installation" | "Large-scale appliance & plumbing installation for hotels, offices & multi-unit buildings." |
| `/service-area` | "Service Area" | "Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam & all of Metro Vancouver's Lower Mainland." |
| `/reviews` | "Customer Reviews" | "Read reviews from SPS Installation customers. 4.6★ rating on Google & Homestars." |

---

## 3. Open Graph & Twitter Cards

**Status:** ❌ **COMPLETELY ABSENT**

- No `openGraph` metadata anywhere in the project
- No `twitter` card metadata anywhere
- No OG image exists (no `/og-image.jpg` in `public/`)
- Social sharing (Facebook, LinkedIn, Twitter/X, WhatsApp) will show broken or auto-generated previews

**Impact:** HIGH — Social media links will look unprofessional and may not attract clicks.

---

## 4. Canonical URLs

**Status:** ❌ **COMPLETELY ABSENT**

- No `alternates.canonical` in any metadata
- No `<link rel="canonical">` tags
- `siteConfig.url` is set to `"https://spsinstallation.com"` but never used in metadata

**Impact:** MEDIUM — Risk of duplicate content indexing (trailing slash variants, http vs https, www vs non-www).

---

## 5. JSON-LD Structured Data

**Status:** ❌ **COMPLETELY ABSENT**

No `application/ld+json` script tags found anywhere in the codebase. No structured data of any type.

### Missing Schema Types

| Schema Type | Priority | Pages |
|-------------|----------|-------|
| **LocalBusiness** | CRITICAL | All pages (via layout) — enables Google Knowledge Panel, Maps integration |
| **ProfessionalService** | HIGH | All pages — specific subtype for service businesses |
| **Service** | HIGH | Each `/services/*` page |
| **FAQPage** | HIGH | `/services/plumbing`, `/services/appliance-installation`, `/services/residential`, `/services/commercial` — each has FAQ sections |
| **BreadcrumbList** | MEDIUM | All sub-pages |
| **AggregateRating** | MEDIUM | `/reviews` page |
| **Review** | LOW | `/reviews` page |
| **WebSite** | MEDIUM | Home page (enables sitelinks search box) |

### Recommended LocalBusiness Schema (layout.tsx)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Smith Pro Services Ltd.",
  "image": "https://spsinstallation.com/og-image.jpg",
  "url": "https://spsinstallation.com",
  "telephone": "+1-604-865-0619",
  "email": "info@spsinstallation.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10750 135a St, #4205",
    "addressLocality": "Surrey",
    "addressRegion": "BC",
    "postalCode": "V3T 0V4",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.28,
    "longitude": -122.55
  },
  "openingHours": "Mo-Sa 08:00-18:00",
  "priceRange": "$$",
  "areaServed": [
    "Vancouver", "Surrey", "Burnaby", "Richmond", "Coquitlam",
    "North Vancouver", "West Vancouver", "Langley", "Delta",
    "New Westminster", "Port Moody", "Maple Ridge", "Abbotsford", "Pitt Meadows"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "10000"
  },
  "founder": [
    { "@type": "Person", "name": "Rajat Kumar" },
    { "@type": "Person", "name": "Diksha Saini" }
  ]
}
```

---

## 6. Sitemap & Robots.txt

### Sitemap
**Status:** ❌ **MISSING**

- No `sitemap.ts` or `sitemap.xml` in `src/app/`
- No `sitemap.xml` in `public/`
- Next.js App Router supports `src/app/sitemap.ts` to generate dynamic sitemaps

**Pages that should be in sitemap:**
1. `/` (priority: 1.0)
2. `/about` (priority: 0.8)
3. `/services` (priority: 0.9)
4. `/services/appliance-installation` (priority: 0.9)
5. `/services/plumbing` (priority: 0.9)
6. `/services/residential` (priority: 0.8)
7. `/services/commercial` (priority: 0.8)
8. `/service-area` (priority: 0.7)
9. `/reviews` (priority: 0.6)
10. `/contact` (priority: 0.8)

### robots.txt
**Status:** ❌ **MISSING**

- No `robots.ts` in `src/app/`
- No `robots.txt` in `public/`
- Search engines will still crawl but can't be guided on crawl behavior

**Recommended `src/app/robots.ts`:**
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://spsinstallation.com/sitemap.xml",
  };
}
```

---

## 7. Image Alt Texts

### Empty Alt Tags (accessibility & SEO violation)

| File | Line | Element | Issue |
|------|------|---------|-------|
| `about/page.tsx` | 64 | Hero background `<Image>` | `alt=""` — decorative background, should be `alt=""` with `aria-hidden` or have descriptive alt |
| `about/page.tsx` | 182 | Value card background `<Image>` | `alt=""` — decorative, acceptable but could be more descriptive |
| `reviews/page.tsx` | 24 | Hero background `<Image>` | `alt=""` — decorative background image |

### Missing `sizes` Prop

Several `<Image>` components use `fill` without a `sizes` prop, which means Next.js will default to `100vw` and may serve unnecessarily large images:

| File | Line | Image |
|------|------|-------|
| `about/page.tsx` | 63-68 | Hero background — no `sizes` |
| `about/page.tsx` | 127-131 | Story image — no `sizes` |
| `about/page.tsx` | 180-185 | Value card backgrounds — no `sizes` |
| `reviews/page.tsx` | 22-28 | Hero background — no `sizes` |
| `plumbing/page.tsx` | 76-82 | Hero background — no `sizes` |
| `appliance-installation/page.tsx` | 76-82 | Hero background — no `sizes` |
| `residential/page.tsx` | 76-82 | Hero background — no `sizes` |
| `commercial/page.tsx` | 76-82 | Hero background — no `sizes` |

### Good Alt Text Examples Found
- Service images use `alt={svc.title}` ✓
- Testimonial avatars use `alt={t.name}` ✓
- Process step images use `alt={title}` ✓
- Contact page has `alt="Contact us background"` ✓

---

## 8. Heading Hierarchy Per Page

### `/` (Home)
- **h1:** "Need a Plumber? / Need an Installer?" ✓ (one h1)
- **h2:** "Two specialties, one call." ✓
- **h3:** Service titles ✓
- **h2:** "Built on reliability, driven by results." ✓
- **h3:** Feature titles ✓
- **h2:** "What our customers say" ✓
- **h2:** "Metro Vancouver & beyond" ✓
- **h2:** "Ready to get started?" ✓
- **Assessment:** ✅ Good hierarchy

### `/about`
- **h1:** "About {siteConfig.name}" ✓
- **h2:** "Our Story" ✓
- **h2:** "Our Values" ✓
- **h3:** Value titles ✓
- **h2:** "Led by a team committed to excellence" ✓
- **h3:** Leader names ✓
- **h2:** "Ready to work with us?" ✓
- **Assessment:** ✅ Good hierarchy

### `/contact`
- **h1:** "Get In Touch" ✓
- **h2:** "Request a Quote" ✓
- **h2:** "Contact Information" ✓
- **h3:** "Thank you!" (in ContactForm success state) — only visible after submit
- **Assessment:** ✅ Good hierarchy

### `/services`
- **h1:** "Our Services" ✓
- **h2:** Service titles ✓
- **h2:** "Not sure what you need?" ✓
- **Assessment:** ✅ Good hierarchy

### `/services/plumbing`
- **h1:** Service title ✓
- **h2:** "What's Included" ✓
- **h2:** "Our Process" ✓
- **h3:** Step titles ✓
- **h2:** "Frequently Asked Questions" ✓
- **h2:** "Ready to get started?" ✓
- **Assessment:** ✅ Good hierarchy

### `/services/appliance-installation`
- Same structure as plumbing ✓
- **Assessment:** ✅ Good hierarchy

### `/services/residential`
- Same structure ✓
- **Assessment:** ✅ Good hierarchy

### `/services/commercial`
- Same structure ✓
- **Assessment:** ✅ Good hierarchy

### `/service-area`
- **h1:** "Where We Work" ✓
- **h2:** "Lower Mainland's Trusted Installation Team" ✓
- **h2:** "Cities We Serve" ✓
- **h2:** "We Come to You" ✓
- **h3:** Feature titles ✓
- **h2:** "Don't see your area?" ✓
- **Assessment:** ✅ Good hierarchy

### `/reviews`
- **h1:** "What Our Customers Say" ✓
- **h2:** "Experience the Smith Pro difference" ✓
- **Assessment:** ✅ Good hierarchy

---

## 9. Additional SEO Issues

### 9.1 Footer Component Not Used
**Severity:** MEDIUM  
`src/components/Footer.tsx` exists but is **not imported or rendered** in `layout.tsx` or any page. This means:
- No footer on any page
- Missing internal linking opportunities (footer links to services, about, etc.)
- Missing NAP (Name, Address, Phone) consistency signal for local SEO
- The `<main>` tag in layout has no `<footer>` sibling

### 9.2 Unused Components
- `src/components/Header.tsx` — exported but not imported anywhere
- `src/components/VideoCarousel.tsx` — exported but not imported anywhere

### 9.3 `phoneLink` is Obfuscated
**Severity:** LOW  
```ts
phoneLink: "tel:+160****0619"
```
The phone number in `tel:` link is masked with asterisks. This will cause the phone link to **not work** when clicked. The actual number `(604) 865-0619` should be `tel:+16048650619`.

### 9.4 No `<html lang>` on Individual Pages
**Severity:** LOW  
The `<html lang="en">` is set in `layout.tsx` — this is correct and covers all pages. ✓

### 9.5 External Images from Unsplash
**Severity:** MEDIUM  
All images are loaded from `images.unsplash.com`. While Next.js optimizes them via `next/image`:
- No control over image availability (Unsplash could remove images)
- Adds external DNS lookup + latency
- Missing `alt` text opportunities (Unsplash images are generic)
- Consider downloading key images and hosting locally for reliability

### 9.6 No Favicon / Site Icon
**Severity:** LOW  
No custom favicon found in `public/`. Using Next.js default. Should add:
- `favicon.ico` (16x16, 32x32)
- `apple-touch-icon.png` (180x180)
- `icon.png` for Open Graph fallback

### 9.7 No `manifest.json` / PWA Metadata
**Severity:** LOW  
No web app manifest found. Not critical for a service business but improves mobile experience.

---

## 10. Summary Scorecard

| Category | Score | Status |
|----------|-------|--------|
| Root metadata (title/desc) | 6/10 | Basic present, missing OG/Twitter/canonical |
| Per-page metadata | 0/10 | ❌ None |
| Open Graph tags | 0/10 | ❌ Absent |
| Twitter cards | 0/10 | ❌ Absent |
| Canonical URLs | 0/10 | ❌ Absent |
| JSON-LD structured data | 0/10 | ❌ Absent |
| Sitemap | 0/10 | ❌ Missing |
| robots.txt | 0/10 | ❌ Missing |
| Image alt texts | 7/10 | Mostly good, 3 empty alts |
| Heading hierarchy | 9/10 | ✅ Excellent across all pages |
| Internal linking | 4/10 | Footer missing, no breadcrumbs |
| Performance (images) | 6/10 | Missing `sizes` on many images |

**Overall SEO Readiness: ~30/100**

---

## 11. Priority Action Items

### P0 — Critical (do first)
1. Add `metadataBase` to root layout
2. Add per-page metadata exports for all 9 pages
3. Add `sitemap.ts` to `src/app/`
4. Add `robots.ts` to `src/app/`
5. Add LocalBusiness JSON-LD schema to layout

### P1 — High
6. Add Open Graph + Twitter card metadata to root layout
7. Add OG image (1200x630px) to `public/`
8. Fix Footer — import and render in layout.tsx
9. Add canonical URLs to each page
10. Add FAQPage JSON-LD to service pages with FAQs

### P2 — Medium
11. Fix empty `alt=""` on 3 images
12. Add `sizes` prop to all `fill` images
13. Fix phoneLink tel: format
14. Add BreadcrumbList JSON-LD to sub-pages
15. Download and self-host critical Unsplash images

### P3 — Low
16. Add custom favicon
17. Add web app manifest
18. Clean up unused components (Header.tsx, VideoCarousel.tsx)
19. Add Google Search Console verification
20. Trim root description to ≤160 characters
