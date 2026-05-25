# Animation & UX Audit — SPS Website

**Date:** 2026-05-25
**Scope:** All pages, components, globals.css, next.config.ts
**Files reviewed:** 16 TSX components/pages, 3 TS files, 1 CSS file, package.json

---

## Summary

| Area | Verdict | Issues |
|---|---|---|
| Page transitions | Missing | No route-change animation |
| Scroll animations | Missing | Keyframes defined but not scroll-triggered |
| Hover states | Good | Minor inconsistency across CTAs |
| Loading states | Partial | Only ContactForm; no skeletons or Suspense |
| Form submission feedback | Partial | Success works; no error state; broken animation class |
| VideoCarousel controls | Missing | No user controls at all |
| Layout shift (CLS) | Moderate risk | Several images lack dimension hints |
| Animation performance | Needs work | No reduced-motion; forever-animating elements |

---

## 1. Page Transitions & Scroll Animations

### Findings

- **No route-transition animation.** Next.js App Router navigates instantly. There is no wrapper component (e.g., Framer Motion `AnimatePresence`) to provide fade/slide transitions between pages. Users experience a hard cut on every navigation.

- **Scroll-smooth is set twice** — in `layout.tsx` (`className="scroll-smooth"`) and in `globals.css` (`html { scroll-behavior: smooth; }`). Redundant but harmless.

- **`animate-slide-up` fires on mount, not on scroll.** The testimonials section (home page, line 333) uses `animate-slide-up` with staggered `animationDelay`, but this triggers on initial render — not when the section scrolls into view. Cards animate while off-screen, so users never see the effect.

- **Keyframes are defined but underused.** `globals.css` defines `fadeIn`, `slideUp`, `slideInLeft`, and `shimmer` keyframes. Only `slideUp` (testimonials) and `shimmer` (not visibly used in any component) are referenced. `fadeIn` and `slideInLeft` are unused.

- **No IntersectionObserver integration.** No component uses scroll-triggered reveal animations. All content is static on scroll — sections appear in full immediately.

### Recommendations

1. Add a route-transition wrapper using Framer Motion or `View Transitions API` (Next.js experimental support).
2. Use `IntersectionObserver` (or a library like `react-intersection-observer`) to trigger `animate-slide-up` when sections enter the viewport.
3. Apply the defined `fadeIn`/`slideInLeft` keyframes to section headers and feature cards as they scroll into view.
4. Remove the duplicate `scroll-smooth` — keep only the CSS version.

---

## 2. Hover States on Interactive Elements

### Findings

**Good coverage overall.** Nearly every interactive element has a hover state:

| Element | Hover Effect | Status |
|---|---|---|
| Service cards (home) | `-translate-y-1`, shadow increase, title color change | Good |
| Retailer badges (home) | Border + text color change to accent | Good |
| Service area badges (home) | Background fills to accent, text to white | Good |
| CTA buttons (hero, footer) | Background darken, shadow increase, `-translate-y-0.5` | Good |
| Nav links (desktop) | Text color to accent + underline dot | Good |
| Contact info cards | Shadow increase, `-translate-y-0.5`, text to accent | Good |
| Footer links | Text to accent | Good |
| Review platform cards | Shadow increase, `-translate-y-1`, arrow translate | Good |
| FAQ summaries | Text to accent | Good |

**Minor issues:**

- **CTA button hover inconsistency.** Some CTA buttons use `hover:-translate-y-0.5` (hero buttons, navbar "Get a Quote") while others don't (service page CTAs, residential/commercial "Get a Free Quote"). The lift effect is a nice micro-interaction but is applied inconsistently.

- **Navbar "Get a Quote" button** uses `hover:shadow-md` but the hero CTA uses `hover:shadow-xl hover:shadow-accent/30`. Different shadow treatments for the same action type.

- **Service card "Learn more" link** has `group-hover:gap-2.5` for the arrow, but this only works when hovering the entire card — not just the link. This is correct UX (card-level hover) but the gap animation from `gap-1` to `gap-2.5` is quite subtle.

### Recommendations

1. Standardize CTA button hover styles — either all lift or none. Create a shared `.btn-primary` / `.btn-secondary` utility.
2. Ensure consistent shadow depth on hover across all card types.

---

## 3. Loading States

### Findings

- **Only ContactForm has a loading state.** The submit button shows a `Loader2` spinner with "Sending…" text and `disabled:opacity-70 disabled:cursor-not-allowed`. This is well-implemented.

- **No skeleton loaders anywhere.** All page content renders in full — there are no placeholder skeletons for images, text, or sections while content loads.

- **No `loading.tsx` files.** Next.js App Router supports per-route loading states via `loading.tsx`. None are defined for any route. While this site uses mostly static content, the contact page and service pages could benefit.

- **No Suspense boundaries.** No `<Suspense>` wrappers around any components.

- **Image loading.** Hero images on subpages use `priority` prop (good for LCP), but below-the-fold images have no explicit loading strategy — they rely on Next.js defaults (`loading="lazy"`). No blur placeholder or `placeholder="blur"` prop is used on any image.

### Recommendations

1. Add `loading.tsx` files for the contact page and service pages at minimum.
2. Add `placeholder="blur"` and `blurDataURL` to key images (service card images, testimonial avatars) for a smoother perceived load.
3. Consider skeleton loaders for the service card grid and testimonials section.

---

## 4. Form Submission Feedback

### Findings

**ContactForm (`src/app/contact/ContactForm.tsx`)**

- **Loading state:** Shows spinner + "Sending…" text. Button is disabled during submission. Good.

- **Success state:** Shows `SuccessMessage` component with:
  - CheckCircle icon in a green circle
  - `animate-ping` ring effect (runs forever — see performance section)
  - `animate-in fade-in zoom-in` classes — **these reference `tailwindcss-animate` which is NOT installed** (not in `package.json`). The success animation may not render correctly.

- **No error state.** If submission fails (or the simulated delay has a bug), there is no error handling, no error message, no retry mechanism.

- **Simulated submission.** `handleSubmit` uses `setTimeout(() => { ... }, 1200)` — no actual API call. This is fine for a demo but should be replaced before launch.

- **No field-level validation feedback.** Only HTML5 `required` attribute is used. No inline error messages, no red borders on invalid fields, no "Please enter a valid email" type feedback.

- **No focus management after submission.** When the form disappears and `SuccessMessage` renders, focus is not moved to the success message. Screen reader users may not know the submission succeeded.

- **Character counter** on the message textarea works correctly and updates on change.

### Recommendations

1. Install `tailwindcss-animate` or replace `animate-in fade-in zoom-in` with custom CSS animations that are actually defined.
2. Add an error state with a retry button.
3. Add field-level validation with inline error messages (e.g., "Please enter a valid email address").
4. Move focus to the success message after submission (`useRef` + `useEffect`).
5. Replace the `setTimeout` with a real API call before launch.

---

## 5. VideoCarousel Controls

### Findings

**Component:** `src/components/VideoCarousel.tsx`

- **No user controls.** The carousel auto-plays and auto-cycles between videos on a timer (`clipDuration`). There are:
  - No play/pause button
  - No previous/next buttons
  - No dot indicators or progress bar
  - No way for the user to stop or control the carousel

- **Direct DOM manipulation.** The component manipulates `video.style.opacity` directly instead of using React state. While this is intentional for performance (avoids re-renders), it breaks React's declarative model and makes the component harder to maintain.

- **Crossfade transition** uses CSS `transition: opacity 1s ease-in-out` — smooth but always the same duration. No easing customization.

- **No accessibility controls.** No `aria-label` on the container, no `role="region"`, no pause-on-hover or `prefers-reduced-motion` check.

- **`clipDuration` is recomputed on every render** (`const clipDuration = (endTime - startTime) * 1000` is outside the effect but not memoized). The effect depends on it, so this is fine functionally but could be wrapped in `useMemo` for clarity.

- **Single-video edge case.** If `videos.length === 1`, the carousel still sets up a crossfade interval with `nextIdx = 0`, which will reload the same video. Not a bug but wasteful.

- **No error handling for video load failures.** If a video URL is broken, the `.catch(() => {})` silently swallows the error. No fallback image or error indicator.

### Recommendations

1. Add play/pause and prev/next controls with dot indicators.
2. Respect `prefers-reduced-motion` — either pause autoplay or reduce crossfade duration.
3. Add `aria-roledescription="carousel"` and `aria-label` for screen readers.
4. Add a fallback poster image or error state when videos fail to load.
5. Skip the crossfade interval entirely when there's only one video.

---

## 6. Layout Shift (CLS)

### Findings

| Element | Risk | Detail |
|---|---|---|
| Hero video (home) | Low | `absolute inset-0` with parent `min-h-screen` — stable |
| Hero bg images (subpages) | Low | `fill` with parent having explicit padding — stable |
| Service card images | **Medium** | Uses `fill` in a `h-40 sm:h-48` container — height is explicit, good. But no `sizes` on some images. |
| Testimonial avatars | Low | Fixed `h-12 w-12` container with `fill` — stable |
| Service page images (top) | Low | Fixed `h-40 md:h-48` container — stable |
| Process step images | Low | Fixed `h-24 w-24` container — stable |
| Trust bar overlap | **Medium** | `-mt-12` negative margin overlaps hero — content may shift if hero height varies |
| `animate-slide-up` on testimonials | **Medium** | Cards start at `translateY(24px)` and animate to `0` — this shifts layout on mount |
| External video (services hero) | **Medium** | Pexels video loaded from external CDN — no poster frame, no explicit dimensions beyond CSS |
| Font loading | Low | Inter loaded via `next/font/google` with `variable` — good, no FOUT |

### Recommendations

1. Add explicit `width` and `height` props to all `<Image>` components for proper aspect ratio reservation.
2. For the testimonials `animate-slide-up`, either use `opacity` only (no translateY) or use `transform` which doesn't affect layout flow.
3. Add a `poster` attribute to the services page background video.
4. Consider using `aspect-ratio` CSS on video containers as a dimension hint.

---

## 7. Animation Performance

### Findings

**Forever-running animations:**

- **`animate-bounce`** on the "Scroll to explore" ChevronDown (home page line 108). Runs indefinitely. On mobile, this consumes battery.

- **`animate-ping`** on the success message ring (ContactForm line 110). Runs indefinitely after form submission. Should stop after 2-3 cycles.

**Missing `prefers-reduced-motion`:** No component checks for `prefers-reduced-motion: reduce`. Users who have enabled reduced motion in their OS settings will still see all animations. This is an accessibility concern (WCAG 2.1 Level AAA: 2.3.3 Animation from Interactions).

**`backdrop-blur` usage:**
- `backdrop-blur-sm` used on service badge overlays (about page values section, mobile menu items).
- `backdrop-blur` used on some CTA badge elements.
- On low-end mobile devices, `backdrop-blur` can cause frame drops. Used sparingly here — acceptable.

**GPU-accelerated properties:**
- Most hover transitions use `transform` and `opacity` — GPU-accelerated. Good.
- Shadow transitions (`hover:shadow-xl`) trigger repaints but are acceptable for hover states.
- The VideoCarousel crossfade uses `opacity` transitions — GPU-accelerated. Good.

**No `will-change` hints.** Elements with complex animations (carousel crossfade, navbar scroll transition) don't declare `will-change`, so the browser may not optimize layers ahead of time.

### Recommendations

1. Add a `prefers-reduced-motion` media query to `globals.css` that disables or reduces all animations:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
2. Limit `animate-bounce` to ~3 iterations or stop after user scrolls.
3. Limit `animate-ping` to 2-3 iterations.
4. Add `will-change: transform, opacity` to the VideoCarousel video elements.

---

## 8. Additional UX Issues

### Unused Component: `Header.tsx`
`src/components/Header.tsx` exists alongside `Navbar.tsx` but is not imported anywhere in the app. `layout.tsx` uses `Navbar`. `Header.tsx` also has an inline `style={{ backgroundColor: '#ffffff' }}` which should be a Tailwind class. This component should be removed to avoid confusion.

### Dead Animation Class
`ContactForm.tsx` line 105 uses `animate-in fade-in zoom-in` — these classes come from the `tailwindcss-animate` plugin which is **not installed**. The success message renders without any entrance animation.

### No Skip-to-Content Link
No `<a href="#main-content" className="sr-only focus:not-sr-only">` skip link for keyboard/screen reader users. The `<main>` element exists but has no `id`.

### Mobile Menu Focus Trap
The mobile menu overlay does not trap focus. Tab can escape behind the overlay to elements that are visually hidden. The `document.body.style.overflow = "hidden"` prevents scrolling but not focus traversal.

### Redundant `scroll-smooth`
Set in both `layout.tsx` (class) and `globals.css` (CSS rule). Keep one.

### `bg-dot-grid` Hardcoded Color
The `.bg-dot-grid` utility uses `#d1d5db` (a fixed gray) regardless of theme. If dark mode is ever added, this will look wrong.

---

## Priority Matrix

| Priority | Issue | Effort |
|---|---|---|
| P0 (Critical) | Add `prefers-reduced-motion` support | Low |
| P0 (Critical) | Fix broken `animate-in` class in success message | Low |
| P1 (High) | Add scroll-triggered animations | Medium |
| P1 (High) | Add VideoCarousel user controls | Medium |
| P1 (High) | Add form error states + field validation | Medium |
| P1 (High) | Fix focus management after form submission | Low |
| P2 (Medium) | Add page transition animations | Medium |
| P2 (Medium) | Add image `blur` placeholders | Low |
| P2 (Medium) | Fix `animate-ping` infinite loop | Low |
| P2 (Medium) | Add skip-to-content link | Low |
| P3 (Low) | Standardize CTA hover styles | Low |
| P3 (Low) | Remove unused `Header.tsx` | Trivial |
| P3 (Low) | Add `loading.tsx` for routes | Low |
| P3 (Low) | Remove duplicate `scroll-smooth` | Trivial |
