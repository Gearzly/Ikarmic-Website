# Ikarmic AI Website - Strict Project Instructions

These instructions apply to all GitHub Copilot work in this repository. Treat the local design system as the source of truth for visual, content, SEO, and accessibility decisions.

## Mandatory Reading Before Edits

- Before any Next.js code change, read the relevant local Next.js docs under `node_modules/next/dist/docs/`.
- Before any visual, layout, component, copy, SEO, or accessibility change, read:
  - `Ikarmic AI Design System/README.md`
  - `Ikarmic AI Design System/SEO.md`
  - `Ikarmic AI Design System/colors_and_type.css`
  - The closest matching reference in `Ikarmic AI Design System/ui_kits/website/`

## Non-Negotiable Brand Rules

- Dark-first only: page background is `neutral-950` / `#0a0a0a`; elevated surfaces use `neutral-900` and `neutral-800`.
- Indigo is the primary accent: use `indigo-600` for primary buttons and `indigo-400` for links, eyebrows, icon accents, and status dots.
- Violet, blue, emerald, and orange are only decorative service-card tints. Do not promote them into the main palette.
- Typography is Inter via `next/font/google`. Do not add another display font, serif, script, or decorative typeface.
- Use CSS-only Ikarmic motifs: dot grids, radial vignettes, soft blurred indigo/violet blobs, gradient text, subtle borders, and CTA glow.
- Do not add stock photography, AI-generated hero images, generic illustrations, gradient orbs, or light-theme sections to core marketing pages.

## Component And Motion Rules

- Use Tailwind CSS v4 through `app/globals.css`; do not add `tailwind.config.ts` unless explicitly requested.
- Use existing animation wrappers from `components/AnimateIn.tsx`: `FadeUp`, `FadeLeft`, `FadeRight`, `ScaleIn`, `Stagger`, `StaggerItem`, `HoverCard`, and `CountUp`.
- Motion must be calm: opacity and transform only, short ease-out timing, no bounces, no springs, no scale-heavy effects.
- Icons must be inline Heroicons-style outline SVGs: 24x24 viewBox, rounded caps/joins, `strokeWidth={1.5}` for icons and `2` or `2.5` for arrows.
- Use the shared design utilities in `app/globals.css` when available, especially `text-gradient`, `ik-pill`, `ik-button-primary`, `ik-button-secondary`, `ik-card`, and `ik-cosmic-grid`.

## Copy Rules

- Write outcome-first copy with concrete numbers and bounded claims.
- Use Indian English spelling: personalise, optimise, organisations, centred.
- Prefer short, direct sentences. Use `we` for Ikarmic and `you` for the reader.
- Never use: unlock potential, cutting-edge, best-in-class, industry-leading, synergy, ecosystem, or filler uses of leverage.
- Buttons use Title Case. Eyebrows are uppercase with wide tracking. Headlines use sentence case.

## SEO And Accessibility Rules

- Every page in `app/` exports `metadata` with title, description, keywords, canonical, Open Graph, and Twitter fields.
- Every page has exactly one `<h1>`, then semantic `<section>` blocks with heading hierarchy intact.
- Internal navigation uses `next/link`; external links use `target="_blank" rel="noopener noreferrer"`.
- Preserve the root skip link and visible indigo focus states.
- Interactive controls require accessible names, correct button/link semantics, and accurate `aria-expanded` / `aria-controls` when collapsible.
- Add new public routes to `app/sitemap.ts` and keep `feed.xml` updated for new blog posts.

## Validation Required

- After visual or component edits, run `npm run build`.
- For frontend changes, open the local site and check the affected viewport or interaction in the browser before finishing.
- Do not finish with only a diff review when a build or browser check is available.