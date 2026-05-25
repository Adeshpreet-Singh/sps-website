# Accessibility Audit Report — SPS Website

**Date:** 2026-05-25  
**Auditor:** Hermes Agent (worker-4)  
**Scope:** All 16 TSX source files  
**Method:** Static code analysis (no runtime/axe-core testing)

---

## Executive Summary

The SPS website has solid fundamentals — images have alt text, form fields use a well-implemented floating-label pattern, and each page has a single H1. However, the **mobile menu is the biggest accessibility gap**: it lacks `aria-expanded`, keyboard navigation, focus trapping, and Escape-to-close support. Other notable gaps include missing skip-navigation, no `prefers-reduced-motion` support, and auto-playing video without user controls.

| Severity | Count |
|----------|-------|
| Critical | 3 |
| High | 5 |
| Medium | 7 |
| Low | 4 |

---

## 1. Images — Alt Text

**Status: ✅ PASS**

All `<Image>` (Next.js) and `<img>` elements have `alt` attributes. No empty alt attributes found on informational images.

---

## 2. ARIA Labels on Interactive Elements

**Status: ⚠️ PARTIAL**

### 2.1 Menu Toggle Buttons — Has `aria-label` ✅
- `Navbar.tsx:97` — `aria-label={mobileOpen ? "Close menu" : "Open menu"}`
- `Header.tsx:72` — `aria-label={mobileOpen ? "Close menu" : "Open menu"}`

### 2.2 Mobile Menu Panel — Missing ARIA Semantics ❌

| Issue | Navbar.tsx | Header.tsx |
|-------|-----------|-----------|
| `aria-expanded` on toggle | **MISSING** | **MISSING** |
| `aria-controls` linking toggle to panel | **MISSING** | **MISSING** |
| `role="menu"` on nav list | **MISSING** | **MISSING** |
| `role="menuitem"` on links | **MISSING** | **MISSING** |

### 2.3 VideoCarousel — No Text Alternative ❌
- `VideoCarousel.tsx:89-104` — Two `<video>` elements have no `aria-label`, `aria-roledescription`, or fallback text.
- Users with screen readers get no indication that a video carousel exists or what it shows.

---

## 3. Color Contrast

**Status: ⚠️ WARNINGS**

Potential contrast issues detected in Tailwind class patterns (runtime testing with a contrast checker recommended):

| File | Line | Pattern | Risk |
|------|------|---------|------|
| `page.tsx` (home) | 99 | `text-white` on `bg-white/80` overlay | Low contrast if background image is light |
| `page.tsx` (home) | 408 | `text-navy` on `bg-white/80` | Hover state `hover:text-white` may drop contrast |
| `service-area/page.tsx` | 29 | `text-white/80` on `bg-white/10` | 80% opacity white on 10% white overlay |
| `contact/page.tsx` | 57 | `text-white/80` on `bg-white/10` | Same pattern as above |
| Multiple service pages | ~228 | `text-white` on `bg-white/5` with backdrop-blur | Depends on background image |

**Recommendation:** Run automated contrast checks (e.g., axe-core or Chrome Lighthouse) on the live site to confirm. The `text-white/80` and `bg-white/10` patterns are the highest risk.

---

## 4. Keyboard Navigation & Focus States

**Status: ❌ FAIL — Critical Issues**

### 4.1 Mobile Menu — No Keyboard Support (CRITICAL)

**Files:** `Navbar.tsx`, `Header.tsx`

- ❌ No `onKeyDown` / `onKeyUp` handlers on menu items
- ❌ No focus trap — Tab can escape the open menu into the page behind it
- ❌ No Escape key handler to close the menu
- ❌ No `tabIndex` management for menu open/close
- ❌ Menu items are `<Link>` elements (focusable by default) but there's no programmatic focus management when the menu opens

**Impact:** Keyboard-only users cannot reliably open, navigate, or close the mobile menu.

### 4.2 No Focus-Visible Styles

No `focus-visible` Tailwind classes found anywhere in the codebase. The site uses `focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20` on form inputs, but interactive elements (links, buttons) rely on browser defaults or have `focus:outline-none` without a visible replacement.

**Recommendation:** Add `focus-visible:ring-2 focus-visible:ring-accent` to all interactive elements.

### 4.3 No Skip Navigation Link

No `<a href="#main-content">Skip to content</a>` link found in `Navbar.tsx`, `Header.tsx`, or `layout.tsx`.

**Impact:** Keyboard and screen reader users must tab through the entire navigation on every page load.

---

## 5. Form Labels

**Status: ✅ PASS**

The `ContactForm.tsx` uses a well-implemented floating-label pattern:

- `FloatingInput` component: `<input id={id}>` + `<label htmlFor={id}>` — ✅
- `FloatingSelect` component: `<select id={id}>` + `<label htmlFor={id}>` — ✅
- Textarea: `<textarea id="message">` + `<label htmlFor="message">` — ✅

All form fields have visible labels (floating pattern) and proper `id`/`htmlFor` associations:

| Field | ID | Label |
|-------|----|-------|
| Name | `name` | Full Name |
| Phone | `phone` | Phone Number |
| Email | `email` | Email Address |
| Service Type | `serviceType` | Service Type |
| Retailer | `retailer` | Retailer |
| Message | `message` | Tell us about your project… |

**Minor:** Form submission success state (`<SuccessMessage />`) has no `aria-live="polite"` region to announce the change to screen readers.

---

## 6. Semantic HTML

**Status: ⚠️ PARTIAL**

### 6.1 Heading Hierarchy — ✅ Good
Every page has exactly one `<h1>`. No heading level skips detected.

### 6.2 Landmark Elements — ⚠️ Issues

| Page | `<main>` | `<section>` | `<nav>` | Notes |
|------|----------|-------------|---------|-------|
| `layout.tsx` | — | — | — | No `<main>` wrapper in root layout |
| `page.tsx` (home) | ❌ No | 7 sections | — | 55 divs, low semantic ratio |
| `about/page.tsx` | ❌ No | 6 sections | — | 37 divs |
| `reviews/page.tsx` | ❌ No | 5 sections | — | 38 divs |
| `Navbar.tsx` | — | — | ✅ `<nav>` | In mobile panel only |
| `Footer.tsx` | — | — | — | ✅ Uses `<footer>` element |

**Critical:** The homepage (`page.tsx`) has no `<main>` element. Screen readers rely on `<main>` to skip to primary content.

### 6.3 External Links — ⚠️ Missing `rel`

- `reviews/page.tsx:170` — `target="_blank"` without `rel="noopener noreferrer"`
- `reviews/page.tsx:194` — `target="_blank"` without `rel="noopener noreferrer"`

---

## 7. Mobile Menu Accessibility

**Status: ❌ FAIL — Critical**

### Navbar.tsx (Primary Navigation)

| Criterion | Status | Detail |
|-----------|--------|--------|
| `aria-label` on toggle | ✅ | Dynamic: "Open menu" / "Close menu" |
| `aria-expanded` on toggle | ❌ **MISSING** | Screen readers can't tell if menu is open |
| `aria-controls` | ❌ **MISSING** | No link between button and panel |
| `role="menu"` | ❌ **MISSING** | Nav list has no menu semantics |
| `role="menuitem"` | ❌ **MISSING** | Links inside menu have no menuitem role |
| Keyboard navigation | ❌ **MISSING** | No `onKeyDown`, no arrow key support |
| Focus trap | ❌ **MISSING** | Tab escapes menu into background page |
| Escape to close | ❌ **MISSING** | No keyboard way to dismiss menu |
| Focus on open | ❌ **MISSING** | Focus doesn't move into menu when opened |
| Body scroll lock | ✅ | Present |
| Backdrop `aria-hidden` | ✅ | `aria-hidden` on backdrop overlay |
| `prefers-reduced-motion` | ❌ **MISSING** | 300ms slide transition with no reduced-motion opt-out |

### Header.tsx (Secondary Navigation Component)

Same issues as Navbar.tsx: `aria-label` present, but `aria-expanded`, keyboard support, and focus management all missing.

---

## 8. Additional Findings

### 8.1 VideoCarousel (VideoCarousel.tsx)
- **Auto-play without user control** — Videos play automatically on load
- **No `prefers-reduced-motion`** check before auto-playing animations
- **No `aria-label`** on `<video>` elements
- **No carousel semantics** (`role="region"`, `aria-roledescription="carousel"`)
- **No pause/stop controls** for users who need to stop motion

### 8.2 No `aria-live` Regions
- Form submission success/error messages in `ContactForm.tsx` are not in `aria-live` regions
- Screen reader users won't be notified when the form submits successfully

### 8.3 No `prefers-reduced-motion` Support
- Zero instances of `prefers-reduced-motion` across all 16 files
- CSS transitions (300ms) on menu, hover effects, carousel crossfades all run unconditionally
- WCAG 2.3.3 (AAA) requires respecting reduced motion preferences

---

## Recommendations (Priority Order)

### P0 — Critical (Fix Immediately)
1. **Add `aria-expanded={mobileOpen}` to menu toggle buttons** in both `Navbar.tsx` and `Header.tsx`
2. **Add keyboard support to mobile menus** — Escape to close, focus trap, `onKeyDown` handlers
3. **Add `<main id="main-content">` wrapper** in `layout.tsx` or individual pages, plus a skip-navigation link

### P1 — High (Fix Soon)
4. **Add `prefers-reduced-motion` media query** — disable transitions/animations for users who prefer reduced motion
5. **Add `aria-label` to VideoCarousel** `<video>` elements
6. **Add `aria-live="polite"` to form success/error messages** in `ContactForm.tsx`
7. **Add `focus-visible` styles** to all interactive elements
8. **Add `rel="noopener noreferrer"`** to `target="_blank"` links in `reviews/page.tsx`

### P2 — Medium (Improve)
9. **Add `role="menu"` / `role="menuitem"`** to mobile menu or use `aria-current="page"` on active links
10. **Add `aria-controls`** linking toggle buttons to their menu panels
11. **Increase semantic HTML ratio** — replace wrapper `<div>`s with `<section>`, `<article>`, etc. where appropriate
12. **Add carousel semantics** to VideoCarousel (`role="region"`, `aria-roledescription="carousel"`, pause controls)

### P3 — Low (Nice to Have)
13. Verify color contrast ratios with an automated tool on the live site
14. Add `aria-current="page"` to active navigation links
15. Consider adding `role="contentinfo"` to footer (optional since `<footer>` implies it)

---

*This audit is based on static code analysis only. A full accessibility audit should include runtime testing with axe-core, screen reader testing (NVDA/VoiceOver), and keyboard-only navigation testing on the deployed site.*
