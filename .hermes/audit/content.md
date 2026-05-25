# Content Quality Audit — SPS Website

**Date:** 2026-05-25
**Auditor:** Worker-8
**Scope:** All pages — Home, Services (overview + 4 detail), About, Reviews, Contact, Service Area

---

## Summary

The site has solid copy and a consistent professional tone across most pages. However, there are several data inconsistencies, broken links, placeholder content, and design deviations that need attention before launch.

**Severity counts:** 5 Critical · 6 High · 8 Medium · 4 Low

---

## Critical Issues

### C1. Phone link is broken (all pages)
- **File:** `src/lib/data.ts` line 11
- `phoneLink: "tel:+160****0619"` — the asterisks break the tel: URI. Users cannot tap-to-call from mobile.
- Must be: `tel:+16048650619`
- **Impact:** Lost leads from mobile visitors.

### C2. "5+ years" claim contradicts incorporation date
- **File:** `src/lib/data.ts` lines 26–31 + 33
- `legal.incorporated: "July 29, 2025"` but `stats.yearsInBusiness: "5+"`.
- If incorporated July 2025, the company is less than 1 year old as of May 2026.
- Also referenced on About page: "Over 5+ years and 10k+ installations later" — impossible.
- **Impact:** Credibility. This is the single most damaging inconsistency on the site.

### C3. Legal entity name mismatch
- **File:** `src/lib/data.ts`
- Brand: "Smith Pro Services Ltd." — Legal entity: "Swanest Plumbing Services Ltd."
- No explanation anywhere on the site for why these differ.
- Footer renders "Swanest Plumbing Services Ltd." in the copyright.
- **Impact:** Trust / legal compliance — visitors may not realize who they're contracting with.

### C4. Testimonial name mismatch breaks avatar rendering
- **File:** `src/lib/data.ts` line 166 → `name: "Sandra & James K."`
- **Home page** (`page.tsx`) checks `t.name === "Sandra K."` — won't match "Sandra & James K."
- **Reviews page** (`reviews/page.tsx`) avatarMap key is `"Sandra K."` — same mismatch.
- Result: Sandra's testimonial renders without an avatar on both pages.
- **Impact:** Visual bug, looks unprofessional.

### C5. Home page hardcodes rating instead of using data
- **File:** `src/app/page.tsx` — hero stats section pulls from `siteConfig.stats.rating` (correct).
- **File:** `src/app/reviews/page.tsx` line 14 — hardcodes `const rating = 4.6` instead of using `siteConfig.stats.rating`.
- If the rating changes in data.ts, the Reviews page won't update.
- **Impact:** Maintenance trap.

---

## High Issues

### H1. All images are Unsplash stock photos
- Every image across all pages is a generic Unsplash URL. Zero actual company photos.
- About page hero: generic office/construction stock photo.
- Service detail pages: generic plumbing/kitchen/office stock.
- Testimonial avatars: random Unsplash portrait models.
- **Impact:** Visitors will notice stock photos on a local service company site. Erodes trust.

### H2. Reviews page uses a completely different color system
- **File:** `src/app/reviews/page.tsx`
- Uses `blue-500`, `blue-600`, `indigo-600`, `zinc-*`, `slate-*` colors throughout.
- Rest of site uses `navy`, `accent`, `text-muted`, custom CSS variables.
- The CTA gradient is `from-blue-600 to-indigo-600` instead of the accent color used everywhere else.
- **Impact:** Reviews page looks like it belongs to a different website.

### H3. Footer is not rendered
- **File:** `src/app/layout.tsx`
- Only imports `Navbar`, does not import or render `Footer` component.
- `Footer.tsx` exists but is never used.
- **Impact:** Missing company info, service links, and contact details on every page.

### H4. Two unused components (Header.tsx, VideoCarousel.tsx)
- `Header.tsx` — a full navbar implementation that duplicates `Navbar.tsx`.
- `VideoCarousel.tsx` — a crossfade video carousel component, never imported.
- Both in `src/components/`.
- **Impact:** Dead code, confusion for future developers.

### H5. Residential & Commercial CTAs use hardcoded phone links
- `residential/page.tsx` line 196: `href="tel:+160****0619"` (hardcoded, broken asterisks)
- `commercial/page.tsx` line 196: same issue.
- Should use `siteConfig.phoneLink` like other pages.
- **Impact:** Broken tap-to-call on mobile for two service pages.

### H6. Inconsistent checkmark implementation across service detail pages
- Plumbing + Appliance Installation use `<Check className="h-4 w-4 text-accent" strokeWidth={3} />` from lucide-react.
- Residential + Commercial use an inline SVG: `<svg ...><path d="M5 13l4 4L19 7" /></svg>`.
- Same visual purpose, different code, slightly different rendering.
- **Impact:** Inconsistency, harder to maintain.

---

## Medium Issues

### M1. Only 3 testimonials
- Three testimonials total for a company claiming 10k+ installations.
- No review count shown alongside the 4.6 rating.
- **Impact:** Feels sparse. Consider adding more or showing the review count.

### M2. No individual page metadata / SEO
- Only `layout.tsx` sets a global title and description.
- No per-page `<title>`, `<meta description>`, or Open Graph tags.
- **Impact:** Poor SEO. Every page shares the same title in search results.

### M3. Process step naming varies across service pages
- Appliance Installation: "Book Online or Call"
- Plumbing: "Book Online or Call"
- Residential: "Free Consultation"
- Commercial: "Project Consultation"
- Same first step concept, four different names.
- **Impact:** Minor inconsistency in brand messaging.

### M4. "Section 3" is missing from Home page
- Sections are numbered: 1 (Hero), 2 (Trust Bar), then jump to 4 (Services), 5 (Why Us), 6 (Testimonials), 7 (Service Area), 8 (CTA).
- Either section 3 was removed or the numbering is off.
- **Impact:** Commented code confusion.

### M5. No privacy policy or terms page
- Contact form collects name, email, phone, address, and project details.
- No link to a privacy policy, no consent checkbox.
- **Impact:** Legal risk (PIPEDA compliance in Canada).

### M6. About page shows incorporation date prominently
- "Est. July 29, 2025" displayed as a badge in the hero.
- For a service company, this signals brand-new to visitors.
- Combined with the "5+ years" claim, it's confusing.
- **Impact:** Trust.

### M7. No custom 404 page
- No `not-found.tsx` or `not-found.js` in the app directory.
- Next.js will show a default 404.
- **Impact:** Poor UX for broken links or typos.

### M8. Contact form has no CAPTCHA or honeypot
- `ContactForm.tsx` uses client-side validation only (regex for email/phone).
- No visible honeypot field, no CAPTCHA integration mentioned.
- The form action calls `alert("Thank you...")` — appears to have no actual backend submission.
- **Impact:** Spam vulnerability, and the form doesn't actually submit anywhere.

---

## Low Issues

### L1. Hero title phrasing is informal
- "Need a Plumber? Need an Installer? We've Got You." — conversational but slightly informal for a licensed trade company.
- Consider: "Professional Plumbing & Appliance Installation" or similar.

### L2. Unsplash alt text is generic or empty
- About page hero: `alt=""` (empty).
- Reviews page hero: `alt=""` (empty).
- Service area background: `alt="Service area background"` — not meaningful.
- **Impact:** Accessibility (screen readers).

### L3. No sitemap.xml or robots.txt found
- Checked project root — no `public/robots.txt` or `sitemap.ts` / `sitemap.xml`.
- **Impact:** SEO crawlability.

### L4. Retailers list claims "Canada's top retailers" but only 5 listed
- Home Depot, Best Buy, RONA, Canadian Appliance Source, The Brick.
- "Trusted by Canada's top retailers" is a strong claim for a <1-year-old company.
- **Impact:** Overclaiming credibility.

---

## Tone Assessment

The copy across the site maintains a consistent professional-yet-approachable tone:
- **Strengths:** Clear value propositions, good use of trust signals (licensed, insured, warranty-compliant), service descriptions are specific and benefit-oriented.
- **Weaknesses:** Some sections feel templated ("From first call to final walkthrough — here's how it works" appears on 4 pages verbatim). FAQ answers are thorough and well-written.
- **Overall:** Tone is appropriate for a home services company. No typos or grammatical errors found.

---

## Page-by-Page Summary

| Page | Copy | CTAs | Trust | Issues |
|------|------|------|-------|--------|
| Home | Good | Good | Retailers overclaimed | C1, C2, C4 |
| Services Overview | Good | Good | OK | H4 (dead code) |
| Appliance Installation | Good | Good | FAQ solid | H6 |
| Plumbing | Good | Good | FAQ solid | H6 |
| Residential | Good | Broken phone link | OK | H5, H6 |
| Commercial | Good | Broken phone link | OK | H5, H6 |
| About | Good | Good | C2 (years claim) | C2, C3, M6 |
| Reviews | Good | Different colors | Only 3 reviews | C5, H2, M1 |
| Contact | Good | Good | Form doesn't submit | M5, M8 |
| Service Area | Good | Good | OK | L2 |
| Footer | N/A | N/A | N/A | H3 (not rendered) |

---

## Recommended Priority Order

1. **Fix phone link** (C1) — 1 line change in data.ts
2. **Fix years-in-business claim** (C2) — data.ts change + copy update on About page
3. **Fix testimonial name mismatch** (C4) — align data.ts name with avatarMap keys
4. **Fix hardcoded phone on Residential/Commercial** (H5) — 2 lines
5. **Render Footer in layout** (H3) — 2 lines in layout.tsx
6. **Align Reviews page colors** (H2) — replace blue/indigo/zinc with navy/accent/text classes
7. **Add per-page metadata** (M2) — metadata exports on each page
8. **Address legal name mismatch** (C3) — add "operating as Smith Pro Services" or similar
9. **Remove dead components** (H4) — delete Header.tsx, VideoCarousel.tsx (or move to archive)
10. **Standardize checkmarks** (H6) — pick one approach, apply across all service pages
