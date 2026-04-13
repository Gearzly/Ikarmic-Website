---
applyTo: 'src/**/*.tsx,src/**/*.css'
---

# Frontend Implementation Instructions

## Layout and responsiveness

- Build mobile-first, then refine for tablet and desktop breakpoints.
- Avoid fixed heights for content sections unless they are explicitly decorative.
- Ensure key content remains visible and readable at widths >= 320px.

## Accessibility

- Interactive elements must be keyboard reachable and visibly focusable.
- Form controls need associated labels and clear validation messaging.
- Decorative icons/images should be `aria-hidden` or have empty alt text as appropriate.

## Component patterns

- Prefer composition over prop explosion.
- Keep business logic out of presentational leaf components when possible.
- Place reusable page-level sections in `src/sections/`.

## Performance

- Avoid unnecessary re-renders; memoize only when there is clear benefit.
- Do not load large assets eagerly above the fold unless required.
