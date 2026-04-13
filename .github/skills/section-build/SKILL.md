---
name: section-build
description: Build or refactor a page section using existing design system patterns, accessibility checks, and responsive behavior.
---

# Section Build Skill

## When to use

- Creating a new landing page section.
- Refactoring an existing section in `src/sections/`.
- Aligning content blocks with current visual style and spacing conventions.

## Inputs expected

- Target page and section name.
- Content goals (headline, CTA, supporting points).
- Constraints (deadline, must-keep elements, no-copy edits, etc.).

## Workflow

1. Inspect existing section and neighboring sections for spacing and typography rhythm.
2. Reuse primitives from `src/components/ui/` when practical.
3. Implement semantic structure and keyboard-accessible controls.
4. Validate responsive behavior at mobile and desktop widths.
5. Run lint/build and report any residual risks.

## Output format

- Summary of changes.
- Files touched.
- Validation steps run.
- Remaining follow-ups (if any).
