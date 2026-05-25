# Mobile Responsiveness Audit — SPS Website

**Date:** 2026-05-25  
**Project:** /home/adeshpreet-singh/github/sps-website  
**Stack:** Next.js (App Router) + Tailwind CSS v4 + lucide-react  
**Pages audited:** 10 (Home, About, Contact, Reviews, Services, Plumbing, Appliance Installation, Residential, Commercial, Service Area)  
**Components audited:** 5 (Navbar, Header, Footer, VideoCarousel, ContactForm)

---

## 1. Responsive Breakpoints

**Status: GOOD**

The site uses Tailwind's default breakpoint system consistently:

| Breakpoint | Prefix | Usage |
|---|---|---|
| < 640px | (base) | Mobile-first defaults |
| 640px+ | `sm:` | Small tablets, large phones landscape |
| 768px+ | `md:` | Tablets |
| 1024px+ | `lg:` | Desktop (navbar toggle, grid changes) |
| 1280px+ | `xl:` | Large desktops (hero font sizes) |

**Observations:**

- Navbar desktop nav appears at `lg:` (1024px) — appropriate for the 5-item nav.
- Hero text uses `text-3xl sm:text-5xl lg:text-6xl xl:text-7xl` — good progression.
- Grids shift at appropriate breakpoints (e.g. `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-4`).
- All 10 pages use responsive prefixes consistently — no page is missing mobile adaptations.

**No issues found.**

---

## 2. Fixed Widths That Overflow

**Status: GOOD**

- `globals.css` sets `* { box-sizing: border-box; }` — prevents padding-based overflow.
- `body { overflow-x: hidden; }` — catches any edge-case overflow.
- `img, video { max-width: 100%; height: auto; }` — media won't overflow.
- All headings have `overflow-wrap: break-word`; all `<p>` tags have `overflow-wrap: break-word`.
- All containers use `max-w-*` with responsive padding (`px-4 sm:px-6 lg:px-8`).
- `VideoCarousel` uses `absolute inset-0 w-full h-full` — no overflow risk.
- Contact form grid uses `min-w-0` on children to prevent flex overflow.

**No issues found.**

---

## 3. Responsive Text Sizes

**Status: GOOD**

All major headings use responsive text sizing:

| Element | Base | sm | md | lg | xl |
|---|---|---|---|---|---|
| Home hero h1 | `text-3xl` | `text-5xl` | — | `text-6xl` | `text-7xl` |
| Home hero subtitle | `text-2xl` | `text-4xl` | — | `text-5xl` | `text-6xl` |
| Section h2 (typical) | `text-3xl` | `text-4xl` | — | — | — |
| About hero h1 | `text-3xl` | `text-4xl` | `text-5xl` | `text-6xl` | — |
| Reviews hero h1 | `text-4xl` | `text-5xl` | — | `text-6xl` | — |
| Contact hero h1 | `text-3xl` | `text-4xl` | `text-5xl` | `text-6xl` | — |

Body text uses sensible fixed sizes (`text-base`, `text-sm`, `text-lg`) which scale naturally on mobile. No text relies on fixed pixel sizes.

**No issues found.**

---

## 4. Grid/Flex Adaptations

**Status: GOOD**

Key responsive grid/flex patterns across pages:

| Component | Mobile | sm | md | lg |
|---|---|---|---|---|
| Footer columns | 1 col | 2 col | — | 4 col |
| Home service cards | 1 col | 2 col | — | — |
| Home why-us cards | 1 col | 2 col | — | — |
| Home testimonials | 1 col | — | 3 col | — |
| Home stats | 2 col | 4 col | — | — |
| About values | 1 col | 2 col | — | 4 col |
| About leadership | 1 col | 2 col | — | — |
| About stats | 2 col | — | 4 col | — |
| Reviews grid | 1 col | — | 2 col | 3 col |
| Service detail items | 1 col | 2 col | — | — |
| Service process steps | 1 col (vertical) | — | — | 4 col (horizontal) |
| Contact layout | 1 col (stacked) | — | — | 5 col (form 3 + info 2) |
| Service area details | 1 col | — | 2 col | — |

CTA button groups correctly stack vertically on mobile (`flex-col sm:flex-row`).

**No issues found.**

---

## 5. Touch Target Sizes (min 44px)

**Status: 3 ISSUES FOUND**

### Issue 1 — Footer links too small (HIGH)
**File:** `src/components/Footer.tsx`, lines 37-93  
**Problem:** Footer links (`text-sm text-white/60`) have no padding — touch targets are approximately 20px tall, well below the 44px minimum. On mobile, the footer is a single-column list users will tap to navigate.  
**Fix:** Add `py-2` or `py-2.5` to footer link items, or add `block py-2` to the `<Link>` and `<a>` elements in the footer.

### Issue 2 — Navbar mobile drawer nav links slightly undersized (LOW)
**File:** `src/components/Navbar.tsx`, line 140  
**Problem:** Mobile drawer links use `px-4 py-2.5 text-sm`. Total height: 2.5 + 14 + 2.5 = ~17.5px per side = ~35px. Slightly below 44px.  
**Fix:** Change `py-2.5` to `py-3` for a total of ~40px, or `py-3.5` for ~45px.

### Issue 3 — Navbar mobile drawer close button slightly undersized (LOW)
**File:** `src/components/Navbar.tsx`, line 125  
**Problem:** The X close button uses `p-1.5` with a 20px icon = ~34px. Below 44px.  
**Fix:** Change `p-1.5` to `p-2.5` for a ~40px target, or `p-3` for ~44px.

### Passes (adequate touch targets):

| Element | Size | Status |
|---|---|---|
| Navbar hamburger button | `p-2` + 24px icon = 40px | Borderline OK |
| Mobile "Get a Quote" CTA | `px-5 py-2.5 text-sm` = 40px+ tall | OK |
| Hero CTA buttons | `px-6 py-3.5 text-base` = 48px+ | Good |
| Contact form inputs | `pt-6 pb-2` + 16px text = ~42px | Borderline OK |
| Contact form submit | `px-8 py-4 text-base` = 56px+ | Good |
| All service page CTA buttons | `px-8 py-3.5 text-base` = 48px+ | Good |

---

## 6. Navbar Mobile Drawer

**Status: GOOD (with minor notes)**

The Navbar mobile drawer (`src/components/Navbar.tsx`) is well-implemented:

- **Slide-in panel** from right side (`fixed top-0 right-0 z-50 h-full w-72`) — standard mobile pattern.
- **Backdrop overlay** with `bg-black/40` — dismisses drawer on tap.
- **Body scroll lock** — `document.body.style.overflow = "hidden"` when open.
- **Transition animation** — `translate-x-full` → `translate-x-0` with `duration-300 ease-in-out`.
- **Close on nav click** — each link calls `setMobileOpen(false)` on click.
- **Accessible** — `aria-label` on both hamburger and close buttons.
- **Contains phone CTA and "Get a Quote"** — important CTAs available in drawer.

**Minor notes:**
- The drawer width is fixed at `w-72` (288px) — fine for mobile, but on very narrow screens (< 320px, rare), it would be slightly wide. Could use `w-[min(18rem,85vw)]` as a defensive measure.
- The unused `Header.tsx` component has a similar drawer implementation — it's dead code and can be removed.

**No blocking issues.**

---

## 7. Footer on Mobile

**Status: 1 ISSUE FOUND**

**File:** `src/components/Footer.tsx`

The footer uses a responsive grid (`sm:grid-cols-2 lg:grid-cols-4`) which correctly stacks to a single column on mobile. The bottom bar uses `flex-col sm:flex-row` to stack copyright and location text.

**Issue — Insufficient link tap targets (same as Issue #1 above):**
Footer links have no padding, making them difficult to tap on mobile. The footer is a key navigation element on mobile (no sidebar), so this matters.

**Otherwise good:**
- Padding is responsive: `px-4 py-12 sm:px-6 lg:px-8`.
- Bottom bar stacks correctly on mobile.
- Text sizes are appropriate (`text-sm`).
- Logo and description are readable.

---

## Summary

| Check | Status | Issues |
|---|---|---|
| 1. Responsive breakpoints | ✅ Good | 0 |
| 2. Fixed width overflow | ✅ Good | 0 |
| 3. Responsive text sizes | ✅ Good | 0 |
| 4. Grid/flex adaptations | ✅ Good | 0 |
| 5. Touch target sizes | ⚠️ 3 issues | Footer links (high), drawer nav links (low), drawer close button (low) |
| 6. Navbar mobile drawer | ✅ Good | Minor: fixed width, dead Header.tsx |
| 7. Footer on mobile | ⚠️ 1 issue | Same as touch targets (#5) |

**Overall: The site is well-built for mobile responsiveness.** The Tailwind implementation is consistent, grids adapt properly, text scales appropriately, and there are no overflow risks. The only actionable items are touch target sizes — primarily the footer links (HIGH priority) and the drawer UI elements (LOW priority).

### Recommended Fixes (Priority Order)

1. **HIGH — Footer links:** Add `py-2` padding to all footer `<Link>` and `<a>` elements in `Footer.tsx`.
2. **LOW — Drawer nav links:** Change `py-2.5` to `py-3` on mobile drawer nav links in `Navbar.tsx`.
3. **LOW — Drawer close button:** Change `p-1.5` to `p-2.5` on drawer close button in `Navbar.tsx`.
4. **CLEANUP — Remove dead Header.tsx** (unused component, not imported anywhere).
