# Design smell report: Must-Have GitHub Apps

**Date:** 2026-08-08  
**Surface:** Homepage, directory, and comparison flow  
**Mode:** Smell audit

## Verdict

**8/10, faint smell.** The interface has a clear, authored direction. It does not read as generic AI-generated SaaS. Two small reflexes are visible and worth addressing during a later refinement pass.

## Observed smells

| Smell                     | Severity | Evidence                                                                                                                            | Root reflex                                                                     | Best next mode                         |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------- |
| Accent rail               | Low      | `.hero-note` uses a persistent green left border to make a note feel structured.                                                    | Decoration is standing in for information hierarchy.                            | `/design refine` or `/design relayout` |
| Repeated bordered modules | Low      | Homepage category list, app cards, callout, and directory controls all use the same thin border and rounded 6px container language. | A safe component treatment is repeated beyond the places where it adds meaning. | `/design refine`                       |

## Clean signals

- **No tech gradient:** There are no blue-violet, indigo-cyan, or purple-to-teal gradients.
- **No generic tech hue failure:** GitHub blue and green are used as semantic interface roles, not as a decorative startup palette.
- **No feature-tile grid:** Categories and app records are real browseable artifacts with distinct jobs.
- **No unearned blur:** The interface uses flat surfaces and a restrained shadow system.
- **No stat monument:** Star counts remain secondary metadata rather than oversized proof theatre.
- **No icon topper:** Icons explain entry type and actions instead of decorating every section.
- **No bounce:** No distracting motion system is present.
- **No default type:** Newsreader plus system UI and DM Mono metadata create a deliberate editorial/product contrast.
- **No center stack:** The homepage uses a left-led hero with an evidence note and task-oriented sections.

## Composition read

The primary work pattern is **explore and compare**. Search, filters, cards, category routes, and a comparison table support that job. The repeated border treatment is the only structural pattern that slightly flattens the hierarchy.

## Recommendation

Do not redesign the interface. Preserve the GitHub-adjacent semantic palette and editorial type. In a later `/design refine` pass, demote the hero rail from decoration to a clearer evidence label and vary module boundaries so lists, controls, and calls to action do not all look like the same container.
