# Ikarmic AI — Website UI Kit

A high-fidelity React/JSX recreation of the Ikarmic AI marketing site. Drop-in components for hero, services, navbar, footer, blog cards, stats, and the signature chat demo.

## Run it

Open `index.html` in your browser (or via `show_to_user`). It renders a fully scrollable home-page recreation using all the components below.

## Components

| File | What it renders |
|---|---|
| `Navbar.jsx` | Fixed top bar with logo, three flyout menus (Services, Solutions, Industries), CTA. |
| `Hero.jsx` | Full hero — eyebrow pill, gradient display, lede, CTAs, mini stats, chat demo. |
| `HeroChatDemo.jsx` | The signature window-frame chat with red/yellow/green dots, animated bubbles, typing indicator. |
| `Ticker.jsx` | Infinite-scroll capability ticker bar. |
| `StatCard.jsx` | Gradient-border stat tile. |
| `ServiceCard.jsx` | Default + featured service cards with hover glow. |
| `BlogCard.jsx` | Blog excerpt card with tag, read-time, date. |
| `Testimonial.jsx` | Star-rated testimonial card. |
| `CTASection.jsx` | Final CTA block with cosmic background. |
| `Footer.jsx` | 5-column footer + bottom legal bar. |
| `AnimateIn.jsx` | FadeUp / FadeLeft / FadeRight / Stagger wrappers (CSS-based since framer-motion isn't loaded). |
| `data.js` | Service / stat / testimonial / blog data lifted from the codebase. |

## Notes

- Built with React 18 + Babel inline transforms (matches our standard prototype stack — no Tailwind compile step required).
- Tokens come from the project-root `colors_and_type.css`.
- Heroicons are inlined as `<svg>` paths to match the codebase's pattern.
- `animation` reveals are CSS-only (no framer-motion), but follow the same easing curve.

## Caveats

- The original is Tailwind-class-driven; this kit reaches for vanilla CSS classes prefixed `ik-` to avoid a Tailwind compile step.
- The flyout dropdowns are shown but **not** fully interactive — they appear on hover via CSS like the original does (no JS state needed).
- Some sub-sections from the live home page are omitted to keep the kit focused on reusable components.
