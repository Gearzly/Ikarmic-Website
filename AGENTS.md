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
