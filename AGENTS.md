<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Project: Ikarmic AI Website

### Stack

- **Next.js 16.2.6** — App Router, TypeScript, static export
- **Tailwind CSS v4.3.0** — CSS-first config (`@import "tailwindcss"` in globals.css, no tailwind.config.ts)
- **framer-motion** — animations via `components/AnimateIn.tsx` wrappers

### Key conventions

- All animation wrappers live in `components/AnimateIn.tsx` — use `FadeUp`, `FadeLeft`, `FadeRight`, `ScaleIn`, `Stagger`, `StaggerItem`, `HoverCard`, `CountUp`
- Reusable page templates: `ServicePageTemplate`, `SolutionPageTemplate`, `IndustryPageTemplate`
- Dark theme: `bg-neutral-950` body, `text-neutral-100`, accent `indigo-400/indigo-600`
- Custom Tailwind utilities defined via `@utility` in `app/globals.css`
- Path alias: `@/*` → `./` (root of project)
- `metadataBase` is set in `app/layout.tsx` — all pages must export `metadata` with `title`, `description`, `keywords`, `alternates.canonical`, `openGraph`, and `twitter`

### Ikarmic design system instructions

- Before design work, read `Ikarmic AI Design System/README.md`, `SEO.md`, `colors_and_type.css`, and the relevant `ui_kits/website/*` reference component.
- Keep the site dark-first: `bg-neutral-950`, elevated neutral cards, white-alpha borders, and indigo as the primary accent. Use violet/blue/emerald/orange only as decorative per-service tints where the existing system already does.
- Use Inter from `next/font/google` and the Tailwind v4 CSS-first setup in `app/globals.css`. Do not add a second display font or a Tailwind config unless the project explicitly needs it.
- Use inline Heroicons-style outline SVGs: 24x24 viewBox, rounded caps/joins, `strokeWidth={1.5}` for icons and `2`/`2.5` for arrows. Avoid icon fonts and new icon libraries.
- Use the existing animation vocabulary only: `AnimateIn` wrappers, `animate-float`, `animate-float-delayed`, `animate-ticker`, and calm opacity/transform motion. Avoid bounces, springs, scale-heavy effects, and noisy interactions.
- Write outcome-first copy with concrete numbers, Indian English spelling, and direct sentences. Avoid phrases like "unlock potential", "cutting-edge", "best-in-class", "synergy", and filler uses of "leverage".
- Preserve the CSS-only visual language: dot grids, radial vignettes, soft indigo/violet blobs, gradient text, subtle borders, and CTA glow. Do not add stock photography or AI-generated hero imagery to core marketing pages.
- Keep SEO and accessibility paired: one `<h1>` per page, semantic sections, descriptive links, visible focus states, labelled forms, metadata on every route, sitemap updates for new routes, and a skip link in the root layout.
