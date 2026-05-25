# Performance & Images Audit — SPS Website

**Auditor:** worker-6 (Hermes Kanban)
**Date:** 2026-05-25
**Project:** /home/adeshpreet-singh/github/sps-website (Next.js 16.2.6, React 19.2.4, Tailwind v4)

---

## Summary

Overall the codebase is in good shape for a small business site. All images use Next.js `<Image>`, fonts use `next/font/google`, and the dependency surface is minimal (4 deps). The main performance concerns are **two unoptimized hero background videos** and **a few missing best-practice optimizations**.

| Area | Grade | Notes |
|---|---|---|
| Image optimization | A- | All `<Image>` from next/image, no raw `<img>`. Minor: missing `sizes` on some fill images. |
| Font loading | A | Inter via `next/font/google`, self-hosted, subset latin. No render-blocking Google Fonts. |
| Lazy loading | B+ | Next.js `<Image>` auto-lazyloads. Hero images correctly set `priority`. No intersection observer for other elements. |
| Video performance | C | Two `<video autoPlay>` hero backgrounds — one is a 2.5 MB self-hosted MP4, the other is an external UHD Pexels stream. |
| Bundle size | A | Only 4 production deps: next, react, react-dom, lucide-react. No heavy libraries. |
| Render-blocking resources | A- | Tailwind v4 via PostCSS, no external CSS/JS. Only concern is the hero video blocking first paint. |
| VideoCarousel | N/A | Component exists but is unused — dead code. |

---

## 1. next.config.ts — Image Optimization

**File:** `/home/adeshpreet-singh/github/sps-website/next.config.ts`

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
  ],
},
```

**Findings:**
- ✅ Remote patterns correctly restrict to unsplash.com only
- ✅ Next.js Image Optimization is enabled by default (no `unoptimized: true`)
- ⚠️ **Missing `formats` config** — Next.js defaults to serving WebP, which is fine, but AVIF could further reduce payload ~20%. Consider:
  ```ts
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [...],
  },
  ```
- ⚠️ **No `deviceSizes` or `imageSizes` tuning** — defaults are fine for this site but worth noting for future.
- ❌ **Pexels video URL not in remotePatterns** — `services/page.tsx` loads a video from `videos.pexels.com`, but this is a `<video>` tag (not `<Image>`) so no config issue, just a performance concern (see Section 5).

---

## 2. img Tags vs Next.js Image

**Files scanned:** All 16 `.tsx` files in `src/`

| File | Uses `<Image>` | Uses raw `<img>` |
|---|---|---|
| src/app/page.tsx | ✅ | ❌ |
| src/app/about/page.tsx | ✅ | ❌ |
| src/app/reviews/page.tsx | ✅ | ❌ |
| src/app/service-area/page.tsx | ✅ | ❌ |
| src/app/contact/page.tsx | ✅ | ❌ |
| src/app/services/page.tsx | ✅ | ❌ |
| src/app/services/plumbing/page.tsx | ✅ | ❌ |
| src/app/services/residential/page.tsx | ✅ | ❌ |
| src/app/services/commercial/page.tsx | ✅ | ❌ |
| src/app/services/appliance-installation/page.tsx | ✅ | ❌ |
| src/components/Navbar.tsx | — | ❌ (no images) |
| src/components/Footer.tsx | — | ❌ (no images) |
| src/components/Header.tsx | — | ❌ (no images) |
| src/components/VideoCarousel.tsx | — | ❌ (video only) |
| src/app/contact/ContactForm.tsx | — | ❌ (no images) |

**Result:** ✅ **Zero raw `<img>` tags found.** All visual content uses Next.js `<Image>` with proper `fill` + `object-cover` pattern.

**Minor issues:**
- Some `<Image fill>` components are missing `sizes` prop (e.g., about page hero, reviews hero, value cards). Next.js defaults to `100vw` which may serve unnecessarily large images on desktop.
- Some service page hero images have `priority` which is correct for LCP, but CTA background images (bottom of each service page) also set no `sizes` — these are below the fold and should be lazy (which they are by default, so ✅).

---

## 3. Lazy Loading

**Assessment:** ✅ Good

- Next.js `<Image>` components are lazy by default unless `priority` is set.
- Hero images on each page correctly use `priority`:
  - `about/page.tsx` line 67: `<Image ... priority />` ✅
  - `reviews/page.tsx` line 27: `<Image ... priority />` ✅
  - `service-area/page.tsx` line 24: `<Image ... priority />` ✅
  - `contact/page.tsx` line 52: `<Image ... priority />` ✅
  - All service subpage heroes: `<Image ... priority />` ✅
- Below-fold images (service cards, process steps, testimonials, value cards) correctly omit `priority`, so they lazy-load ✅

**Potential improvement:**
- The home page hero uses a `<video>` tag (not `<Image>`), so `priority` is not applicable. The video has a `poster` attribute ✅ which provides a static fallback.
- No explicit `loading="lazy"` is needed since Next.js Image handles this.

---

## 4. Font Loading

**File:** `src/app/layout.tsx`

```ts
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```

**Assessment:** ✅ Excellent

- Uses `next/font/google` which self-hosts fonts at build time — no external Google Fonts requests, zero render-blocking.
- `variable: "--font-inter"` allows Tailwind to reference via `font-sans` class.
- Subset `latin` limits the download to Latin characters only — reduces font payload.
- 5 weights loaded (300–700). Consider whether all are actually used:
  - `300` (light): used in some body text
  - `400` (regular): body text ✅
  - `500` (medium): nav links, buttons ✅
  - `600` (semibold): headings, CTAs ✅
  - `700` (bold): headings ✅
- All 5 weights appear justified. No unnecessary font bloat.

**Minor consideration:**
- The `globals.css` references `--font-heading: 'Inter'` but the CSS variable is `--font-inter`. This works because Tailwind's `@theme` resolves it, but could be confusing.

---

## 5. Video Performance — ⚠️ PRIMARY CONCERN

### 5a. Home Page Hero Video
**File:** `src/app/page.tsx` lines 49–57

```tsx
<video
  autoPlay muted loop playsInline
  poster="/videos/hero-poster.jpg"
  className="absolute inset-0 h-full w-full object-cover"
  src="/videos/hero-bg.mp4"
/>
```

**Issues:**
- **2.5 MB file size** — acceptable for a hero video, but...
- ❌ **No `preload` attribute** — defaults to `auto` which downloads the entire video immediately, even on slow connections.
- ❌ **No bandwidth optimization** — single MP4 at one resolution. No `<source>` with WebM/AV1 fallback, no adaptive bitrate.
- ⚠️ **No reduced-motion media query** — users with `prefers-reduced-motion: reduce` will still see the video playing. Should pause/stop for accessibility.
- ✅ Has `poster` attribute for instant visual feedback
- ✅ Has `muted` + `playsInline` for mobile autoplay compatibility

**Recommendations:**
1. Add `preload="metadata"` to defer full download
2. Wrap in a `prefers-reduced-motion` check (CSS or JS)
3. Consider compressing the video further or using a shorter loop (current: full video)
4. Add a `<source>` with WebM format for ~30% smaller payload in supported browsers

### 5b. Services Page Hero Video — ⚠️ CRITICAL
**File:** `src/app/services/page.tsx` lines 37–44

```tsx
<video
  autoPlay loop muted playsInline
  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
  src="https://videos.pexels.com/video-files/5765849/5765849-uhd_2560_1440_25fps.mp4"
/>
```

**Issues:**
- ❌ **External UHD video (2560x1440) from Pexels CDN** — this is a massive uncompressed stream. Likely 10–50+ MB depending on Pexels encoding.
- ❌ **No `poster` attribute** — blank screen until video loads
- ❌ **No `preload` attribute** — downloads immediately
- ❌ **Third-party dependency** — Pexels may rate-limit, slow down, or change the URL at any time
- ❌ **No reduced-motion handling**
- ❌ **Not self-hosted** — unlike the home page hero which uses `/videos/hero-bg.mp4`, this loads from a third-party domain, adding DNS + connection overhead

**Recommendations:**
1. Download and self-host this video in `/public/videos/`
2. Compress to 720p (sufficient for a background) — target <3 MB
3. Add a `poster` image
4. Add `preload="metadata"`

### 5c. VideoCarousel Component — Dead Code
**File:** `src/components/VideoCarousel.tsx`

This component is defined but **not imported or used anywhere** in the codebase. It references two `<video>` elements with `preload="auto"` and crossfade logic.

**Recommendation:** Remove entirely to reduce bundle size and confusion, OR keep if planned for future use but mark with a comment.

### 5d. Unused Video Files in `/public/videos/`

| File | Size | Used? |
|---|---|---|
| hero-bg.mp4 | 2.5 MB | ✅ Home page hero |
| hero-poster.jpg | 94 KB | ✅ Home page poster |
| 6473952-hd_1280_720_25fps.mp4 | 4.2 MB | ❌ Not referenced |
| 8853531-hd_1280_720_24fps.mp4 | 4.6 MB | ❌ Not referenced |
| 8293017-hd_1280_720_30fps.mp4 | 3.2 MB | ❌ Not referenced |

**Total dead weight:** 12 MB of unused video files. These ship with the production build since they're in `/public/`.

**Recommendation:** Remove the 3 unused video files, or move them out of `/public/` if they're being kept for future use.

---

## 6. Bundle Size

**Assessment:** ✅ Excellent

**Production dependencies (4 total):**
- `next` 16.2.6 — framework
- `react` 19.2.4 — UI library
- `react-dom` 19.2.4 — DOM renderer
- `lucide-react` ^1.16.0 — icon library (tree-shakeable)

**Dev dependencies (6 total):**
- `tailwindcss` ^4 — CSS framework (build-time only)
- `@tailwindcss/postcss` ^4 — PostCSS plugin
- `typescript` ^5 — type checker
- `eslint` ^9 + `eslint-config-next` — linting
- `@types/node`, `@types/react`, `@types/react-dom` — types only

**Tree-shaking assessment:**
- `lucide-react` is imported per-icon (e.g., `import { Wrench } from "lucide-react"`), which enables proper tree-shaking ✅
- No barrel imports detected that would pull in entire libraries
- No heavy dependencies (no lodash, moment, framer-motion, etc.)

**Potential improvements:**
- Lucide icons are imported individually but the home page imports 14 icons. Each icon is a small React component (~1-2 KB), so total impact is ~20-30 KB — acceptable.
- The `Header.tsx` component exists alongside `Navbar.tsx` and they serve the same purpose. `Header.tsx` is not imported anywhere — dead code that should be removed.

---

## 7. Render-Blocking Resources

**Assessment:** ✅ Good

- **CSS:** Tailwind v4 via `@tailwindcss/postcss` — processed at build time, inlined into the HTML. No external CSS files. No render-blocking stylesheets.
- **JavaScript:** Next.js handles code splitting automatically. Each page only loads the JS it needs.
- **Fonts:** Self-hosted via `next/font/google` — preloaded automatically by Next.js, no FOUT/FOIT issues.
- **No external scripts** — no analytics, no chat widgets, no third-party JS.

**Potential concern:**
- The home page `<video autoPlay>` with no `preload` attribute effectively downloads the full 2.5 MB video immediately, competing with critical resources for bandwidth. While this doesn't block rendering technically, it delays LCP on slow connections.

---

## 8. Additional Findings

### 8a. Dead Code
| Component | File | Status |
|---|---|---|
| `Header` | src/components/Header.tsx | Not imported anywhere. Duplicate of `Navbar`. |
| `Footer` | src/components/Footer.tsx | Not imported in layout.tsx or any page. |
| `VideoCarousel` | src/components/VideoCarousel.tsx | Not imported anywhere. |

### 8b. Duplicate Navbar Logic
Both `Navbar.tsx` and `Header.tsx` implement nearly identical sticky navbars with mobile slide-in menus. Only `Navbar` is used in `layout.tsx`. `Header` should be removed.

### 8c. Footer Not Rendered
`Footer.tsx` exists with a complete footer component but is **not imported in `layout.tsx`**. The site currently has no visible footer. This appears to be an oversight — either add it to the layout or remove the component.

### 8d. External Video Domain
The services page hero loads from `videos.pexels.com` — a third-party domain not listed in `next.config.ts` `remotePatterns` (only `images.unsplash.com` is). Since this is a `<video>` not `<Image>`, it works, but:
- Adds DNS resolution + TLS handshake overhead
- No caching control (Pexels headers govern)
- Could break if Pexels changes the URL

---

## Priority Recommendations

### High Priority (Performance Impact)
1. **Fix services page video** — Download, compress to 720p, self-host. Add poster image. Estimated savings: 10-50 MB per page load.
2. **Remove unused video files** — 12 MB dead weight in `/public/videos/`.
3. **Add `preload="metadata"` to both `<video>` tags** — prevents full video download on initial page load.

### Medium Priority (Best Practices)
4. **Add reduced-motion media query** — Pause/hide background videos for users who prefer reduced motion.
5. **Add `sizes` props** to `<Image fill>` components that lack them — especially on about/reviews hero images.
6. **Remove dead components** — `Header.tsx`, unused video files.
7. **Add Footer to layout** or remove the component.

### Low Priority (Nice to Have)
8. Consider AVIF format in `next.config.ts` `images.formats` for ~20% smaller images.
9. Compress `hero-bg.mp4` further (currently 2.5 MB for a background video — could target 1-1.5 MB at 720p).
10. Remove `VideoCarousel.tsx` if not planned for use.

---

*End of audit.*
