# Dead Code Audit — sps-website

**Date:** 2026-05-25  
**Project:** /home/adeshpreet-singh/github/sps-website  
**Auditor:** worker-10 (automated)

---

## 1. Header.tsx — DEAD (not imported)

**File:** `src/components/Header.tsx`  
**Status:** DEAD — zero imports found across the entire codebase.

`Navbar.tsx` is the active header component (imported in `src/app/layout.tsx`). Header.tsx appears to be an older version that was superseded by Navbar but never deleted.

**Recommendation:** Delete `src/components/Header.tsx`.

---

## 2. Unused Exports in `lib/data.ts`

| Export | Type | Status |
|--------|------|--------|
| `siteConfig` | const | ✅ Used (49 refs) |
| `navLinks` | const | ✅ Used (6 refs) |
| `Service` | interface | ✅ Used (32 refs) |
| `services` | const | ✅ Used (26 refs) |
| `Testimonial` | interface | ✅ Used (3 refs) |
| `testimonials` | const | ✅ Used (4 refs) |
| `WhyUsFeature` | interface | ⚠️ UNUSED (0 external refs) |
| `whyUsFeatures` | const | ✅ Used (2 refs) |
| `serviceAreas` | const | ✅ Used (4 refs) |
| `serviceTypeOptions` | const | ✅ Used (2 refs) |
| `retailerOptions` | const | ✅ Used (2 refs) |
| `mapConfig` | const | ⚠️ UNUSED (0 external refs) |

**Findings:**
- `WhyUsFeature` interface — unused. The `whyUsFeatures` const IS used, but the interface type itself is never referenced elsewhere. Likely only needed for internal typing; could be made non-exported or inlined.
- `mapConfig` — unused. Not referenced anywhere outside `data.ts`. Appears to be leftover from a planned map feature.

**Recommendation:**
- Remove `export` from `WhyUsFeature` (make it a local interface).
- Remove `mapConfig` entirely (or keep if a map page is planned).

---

## 3. Unused Dependencies in `package.json`

**Production dependencies:** All used.
| Package | Status |
|---------|--------|
| `lucide-react` | ✅ Used (icons throughout) |
| `next` | ✅ Framework |
| `react` | ✅ Framework |
| `react-dom` | ✅ Framework |

**Dev dependencies:** All used.
| Package | Status |
|---------|--------|
| `@tailwindcss/postcss` | ✅ Tailwind CSS toolchain |
| `@types/node` | ✅ TypeScript types |
| `@types/react` | ✅ TypeScript types |
| `@types/react-dom` | ✅ TypeScript types |
| `eslint` | ✅ Linting |
| `eslint-config-next` | ✅ ESLint config |
| `tailwindcss` | ✅ Styling |
| `typescript` | ✅ TypeScript |

**Findings:** No unused dependencies. The project has a clean, minimal dependency set.

---

## 4. TODO/FIXME Comments

**None found.** The codebase has zero TODO or FIXME comments.

---

## 5. Stale Files (.old, .bak, etc.)

**None found.** No `.old`, `.bak`, or similar stale files detected.

---

## 6. Uncommitted Changes

Two files have uncommitted modifications:

```
 M src/components/Header.tsx   (108 lines changed — major rework)
 M src/components/Navbar.tsx   (4 lines changed — minor fix)
```

**Note:** Since Header.tsx is dead code, the uncommitted changes to it are moot. The Navbar.tsx changes should be committed or reviewed.

---

## Summary

| Category | Finding | Severity |
|----------|---------|----------|
| Dead file | `Header.tsx` — not imported anywhere | 🔴 High |
| Unused export | `mapConfig` in data.ts | 🟡 Low |
| Unused export | `WhyUsFeature` interface (export not needed) | 🟢 Trivial |
| Uncommitted changes | 2 files modified but not committed | 🟡 Medium |
| Dead code | No TODOs, no stale files, no unused deps | ✅ Clean |

**Top action items:**
1. Delete `src/components/Header.tsx` (dead code, 144 lines)
2. Commit or stash the uncommitted Navbar.tsx changes
3. Optionally remove `mapConfig` export from data.ts
