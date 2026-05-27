---
name: ikarmic-design
description: Use this skill to generate well-branded interfaces and assets for Ikarmic AI, an India-based AI services & solutions company — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the calm-cosmic dark-indigo Ikarmic aesthetic.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files (`colors_and_type.css`, `assets/`, `preview/`, `ui_kits/website/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Reach for `colors_and_type.css` first — it carries the full token set; you almost never need to set a hex color manually.

If working on production code, copy assets and read the rules in `README.md` to become an expert in designing with this brand. The original codebase is Next.js 16 + Tailwind v4 + framer-motion; references at https://github.com/Gearzly/Ikarmic-Website.

Key things to remember:
- **Dark-first.** `#0a0a0a` background, indigo accent, white-alpha overlays. Never use a light theme.
- **One accent: indigo-500/600/400.** Violet/blue/emerald/orange only as per-service decorative tints on the home services grid — don't promote them.
- **Inter only.** Hero headlines push to 88px with a gradient accent word.
- **Heroicons outline 24×24, stroke 1.5.** Inline `<svg>`, never an icon font.
- **Calm motion.** FadeUp / FadeLeft / FadeRight / Stagger / float. No bounces or springs.
- **Voice:** outcome-first, numerical, em-dash-heavy, Indian English. Never "unlock potential" / "best-in-class" / emoji.

If the user invokes this skill without other guidance, ask them what they want to build (slide deck? landing-page mock? service-page recreation? new product surface?), ask a few questions, and act as an expert designer who outputs HTML artifacts or production code, depending on the need.
