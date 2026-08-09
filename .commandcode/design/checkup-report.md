# Design checkup: Must-Have GitHub Apps

**Date:** 2026-08-08  
**Surface:** Public directory, homepage, and comparison flow  
**Work pattern:** Explore and compare

## Overall

**48/60, proceed with focused refinement.** The interface has a clear directory purpose, strong semantic structure, and a useful filter flow. It is not yet fully resilient for mobile, assistive technology, or growing multi-category data.

## Vital signs

| Vital          | Score | Status  | Evidence                                                                                                   |
| -------------- | ----: | ------- | ---------------------------------------------------------------------------------------------------------- |
| Intentionality |  8/10 | Healthy | Distinctive editorial type paired with GitHub-like semantic colours and evidence-led cards.                |
| Readability    |  8/10 | Healthy | Good measure and contrast tokens; dense mono metadata needs care at small sizes.                           |
| Usability      |  8/10 | Healthy | Search, filters, reset, empty state, categories, and comparison route exist.                               |
| Responsiveness |  6/10 | Watch   | Mobile controls inherit small text and navigation remains crowded; multi-category filtering is incomplete. |
| Speed          |  9/10 | Healthy | Static Astro output and progressive enhancement keep the core page fast.                                   |
| Accessibility  |  9/10 | Healthy | Skip link, focus styles, labels, captions, scopes, reduced motion, and live result status are present.     |

## Priority findings

1. **Secondary-category filtering was hardened.** Cards now publish every category slug and filters match category membership.
2. **Mobile controls use a full readable size.** Narrow-screen inputs and selects use 1rem text and retain 44px targets.
3. **The screen-reader helper uses modern clipping.** The utility uses `clip-path: inset(50%)`.
4. **Homepage category ordering is data-driven.** The content model's explicit order prevents silent renumbering.

## What is working

- The directory is visibly a GitHub tools directory within the first viewport.
- Plain-language labels describe problems, setup effort, and tool type.
- Static server-rendered content remains available without JavaScript.
- Theme, focus, reduced motion, table captions, and source disclosure are implemented.

## Next move

Refine the comparison surface rather than redesigning it: fix data-driven filtering, mobile control sizing, and stale CSS, then rerun build, tests, and rendered smoke checks.
