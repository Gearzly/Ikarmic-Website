# Ikarmic AI — Design System

A lightweight, code-derived design system for **Ikarmic AI**, an India-based AI services & solutions company. Everything here was extracted from the production Next.js codebase at `Gearzly/Ikarmic-Website` — colors, typography, component patterns, motion, and copy voice. Use this system to make slides, mocks, landing pages, decks, internal docs, and prototypes that feel like Ikarmic.

## Source materials

- **GitHub:** [`Gearzly/Ikarmic-Website`](https://github.com/Gearzly/Ikarmic-Website) — Next.js 16 + Tailwind v4 + framer-motion. The dark, indigo-accented marketing site at `ikarmic.com`. Read further for service templates, blog patterns, and the full nav taxonomy.
- **Live site:** https://ikarmic.com — production reference for color and motion.
- No Figma file was provided; everything below is derived from the codebase.

If you want to deepen this system (icon expansions, product UI for an internal app, etc.), open that repo and pull from `components/`, `app/page.tsx`, and `app/services/*`.

---

## Brand-at-a-glance

**Who:** Ikarmic AI Services and Solutions — AI consultancy and engineering shop based in Hyderabad, India, remote-first, serving clients globally.
**What they sell:** Five service lines (Chatbots, Business Automation, Data Analytics, Generative AI, Custom AI) packaged as five solutions across four industries (Retail, Manufacturing, Education, Technology).
**Promise:** "AI that works for people." Calm, reliable, easy to adopt.
**Tone short:** Direct, numerical, slightly engineering-y. No hype. "No slides, no fluff."

---

## Index — what's in this folder

| File / Folder | Purpose |
|---|---|
| `README.md` | This file — content + visual + iconography fundamentals. |
| `SEO.md` | Semantic-HTML, metadata, JSON-LD, sitemap, a11y, performance rules. **Read before shipping any page.** |
| `SKILL.md` | Agent-Skill front-matter wrapper so this folder is loadable as a Claude Code skill. |
| `colors_and_type.css` | Single source of truth for color tokens, type scale, spacing, radii, shadows. Drop into any HTML with `<link rel="stylesheet" href="colors_and_type.css">`. |
| `assets/` | Brand assets — logo, icon set. |
| `preview/` | Card-sized HTML specimens that render in the Design System tab. |
| `ui_kits/website/` | High-fidelity reusable JSX recreations of the marketing site (Navbar, Hero, Service Card, Footer…). Open `ui_kits/website/index.html` for the demo. |

---

## Content Fundamentals

Ikarmic writes like a senior engineer who's been to too many vendor pitches and is allergic to slop. Every page leads with the outcome, the timeline, or the number. There is **almost zero "transformation journey" language** — claims are bounded, dated, and falsifiable.

### Voice rules

1. **Outcome-first sentences.** The pattern is `[Concrete result] in [time/scope].` not `Embark on a journey to unlock potential.`
   - "60% ticket deflection on day one"
   - "POC to production in 8 weeks"
   - "₹40L overstock losses cut in Q1"
2. **Use "we" for the company, "you" for the reader.** Never "the customer," never "users" in marketing copy. Internal product UI may use "your" / "you".
3. **Short. Period-heavy. Subject-verb-object.** Long sentences only when explaining a workflow.
4. **Numbers carry the weight.** Use real-looking numbers (50+, 65%, 6 wks, ₹40L, 4.6★, <2s) instead of adjectives. The home page has a 4-up stats block; service pages have a 4-up outcomes block — every service page MUST have measurable outcomes.
5. **Indian English spelling.** `personalise`, `optimise`, `organisations`, `centred` — not US spelling. Currency is **₹** for Indian context, neutral for global.
6. **Three-beat eyebrow → headline → lede.** Every section opens with a tiny indigo uppercase eyebrow (`PROVEN IMPACT`), a 2-line headline that often line-breaks mid-sentence with a gradient accent word, and a one-sentence lede.

### Casing

- **Headlines:** Sentence case. NEVER title case marketing copy. ("From idea to production in six weeks.")
- **Eyebrows:** ALL UPPERCASE with `letter-spacing: 0.15em`. ("CORE SERVICES", "HOW WE WORK")
- **Buttons:** Title Case for primary CTAs ("Start a Project", "Book a Free Scoping Call"). Sentence case for tertiary text links ("All services →").
- **Nav items:** Title Case, single word preferred ("Home", "About", "Blog").

### Punctuation & micro-typography

- Use em dashes (`—`) liberally to join clauses. They're a signature.
- Use the **typographic arrow** `→` (never `->`) at the end of "more" links.
- Use **smart quotes** ("...") and apostrophes (`'`), not straight.
- Em-dash sentence pattern: "Calm, reliable, easy to adopt — chatbots, automation, analytics, generative AI..."

### Tone examples lifted verbatim

| Section | Sample |
|---|---|
| Hero subhead | "We design and ship machine learning systems that are calm, reliable, and easy to adopt — across products, operations, and customer experiences." |
| Section eyebrow → headline | "HOW WE WORK → From idea to production in six weeks." |
| CTA badge | "Free 30-min session, no commitment" |
| Closing line | "We'll reply within two business days with a concrete scoping plan — no slides, no fluff." |
| Testimonial framing | "Heard from people who've shipped with us" (not "Trusted by industry leaders") |

### Emoji

**Almost never.** No emoji appear in body copy, headers, or buttons anywhere in the marketing site. The contact page has three rare unicode glyph stand-ins (`✉ ✆ ⌖`) used in lieu of icons — these are tolerated, not encouraged. Replace with proper Heroicons SVGs when possible.

### Forbidden phrases

- "Unlock potential" / "Reimagine" / "Empower your journey" — never
- "Cutting-edge" / "Best-in-class" / "Industry-leading" — never
- "Solutions" is OK as a product noun ("Our Solutions"), never as filler
- "Synergy", "leverage" (as a verb), "ecosystem" — never

---

## Visual Foundations

### Color

A **single accent on a deep neutral substrate**. Everything is built from indigo on neutral-950.

| Token | Value | Where it shows up |
|---|---|---|
| `--color-bg` | `#0a0a0a` (neutral-950) | Page background — every page. Never lighter. |
| `--color-bg-elev-1` | `#171717` (neutral-900) | All cards, footer, navbar overlay. |
| `--color-bg-elev-2` | `#262626` (neutral-800) | Inputs, secondary surfaces, mobile menu. |
| `--color-fg` | `#f5f5f5` (neutral-100) | Default body text. |
| `--color-fg-muted` | `#a3a3a3` (neutral-400) | All secondary copy (the most-used text color). |
| `--color-fg-faint` | `#525252` (neutral-600) | Dates, captions, "Not sure which fits?" labels. |
| `--color-brand` | `#6366f1` (indigo-500) | Brand seed color, dot-grid background dots. |
| `--color-brand-dark` | `#4f46e5` (indigo-600) | **All** primary button backgrounds. |
| `--color-brand-soft` | `#818cf8` (indigo-400) | All link text, eyebrow labels, icons, accents. |

**Per-service tints** appear only on the home page's service cards: violet, blue, emerald, orange. These are decorative — they show a five-color rhythm, but only the indigo half is used on the actual service-page templates. Don't expand them into a general palette.

### Background motifs

The site has a recognizable **"calm cosmic"** background language:

- **Dot grid:** `radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)` at `36px 36px` spacing. Lays across hero and CTA. Always at `opacity: 0.2` or lower.
- **Blurry floating blobs:** Two giant indigo/violet circles, ~50% opacity, `blur(80px)` to `blur(90px)`, slowly drifting via the `float` keyframe (translateY -15px, 8s loop). One per corner.
- **Radial vignette:** `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #030712 100%)` to darken edges and focus the center.
- **No photography.** No stock photos, no AI-generated illustrations, no full-bleed hero images. Imagery is pure CSS.

### Typography

- **One family: Inter** (loaded via `next/font/google`). Weights 400/500/600/700/800.
- **Display headlines** push to `5.5rem` (88px) on desktop, with `leading-[1.04]` and `tracking-tight` — they break across two lines and one word gets the `.text-gradient` treatment (indigo-400 → violet-400 → indigo-300).
- **No serifs anywhere.** No script. No fancy display fonts.
- **Mono fallback** for numerals: codebase reaches for `font-mono` only on tiny step-numbers like "01" / "02". Use `JetBrains Mono` as the picked mono.

See `colors_and_type.css` for the full type scale.

### Spacing & layout

- **Max width: `max-w-7xl`** (`80rem` / 1280px) is the universal page container, centered with `mx-auto px-6`.
- **Section vertical rhythm:** `py-20` (80px) or `py-24` (96px) per section. Headers always get a `py-24` on landing pages.
- **Grid gaps:** `gap-5` or `gap-6` between cards. Never tighter than `gap-4`.
- **Card padding:** `p-6` (24px) for small cards, `p-7` (28px) for mid, `p-8` (32px) for large feature, `p-10`/`p-14` inside hero CTAs.

### Corners

A clear staircase — **no sharp 90° corners** anywhere except inputs.

| Element | Radius |
|---|---|
| Chips, tags | `rounded-full` (pill) or `rounded-lg` (8px) |
| Inputs, buttons (sm) | `rounded-lg` (8px) |
| Primary CTAs, icon containers | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Feature panels / CTA blocks | `rounded-3xl` (24px) |

### Borders

- Default card border: `border border-neutral-800` (#262626 — same color as elev-2, almost invisible — that's the point).
- Hover often **brightens to indigo-800/50** with a `transition-colors`. Never to white.
- "Gradient border" pattern for stats cards: wrap card in `p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40`, inner content has `rounded-[calc(1rem-1px)]`.
- Mobile menu / footer dividers: `border-t border-neutral-800`.

### Shadows & glow

The system uses **inner subtle shadows on cards** and **outer indigo glow on primary CTAs**:

- Card: no shadow by default (the border carries the elevation).
- Primary CTA hover: `box-shadow: 0 0 28px rgba(99,102,241,0.40);` (`--shadow-cta`)
- Featured card has a soft inset glow: `shadow-[0_0_40px_rgba(99,102,241,0.12)]`
- Flyout menus: heavy black shadow `shadow-2xl shadow-black/60`.

### Hover & press states

- **Buttons:** primary `bg-indigo-600 → bg-indigo-500` (lighter on hover), optional glow shadow. NO scale, NO darken.
- **Cards:** border brightens to `border-indigo-800/50`, background tint may add `bg-white/[0.02]`. Sometimes a sibling icon container also brightens.
- **Links:** indigo-400 → indigo-300.
- **Group hover propagation:** Heavy use of Tailwind `group/group-hover:` — hovering a card moves its title color, brightens its icon container border AND background, slides its arrow right by `translate-x-1`.
- **Press states:** none explicit — there's no `active:` in the code. Default browser ⇆ darken is allowed.
- **Animated chevrons:** Nav dropdown chevrons `rotate-180` on `group-hover`. Read-more arrows translate `→`.

### Animation system

Animations are wrapped in `components/AnimateIn.tsx` and consumed everywhere. The vocabulary is small:

| Wrapper | Effect | Duration | Easing |
|---|---|---|---|
| `FadeUp` | opacity 0→1, y 20→0 | 0.4s | default |
| `FadeLeft` / `FadeRight` | opacity 0→1, x ±24→0 | 0.4s | default |
| `ScaleIn` | opacity 0→1, scale 0.92→1 | 0.4s | default |
| `Stagger` + `StaggerItem` | sequential children | 0.35s, 0.08s stagger | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `HoverCard` | y -2 on hover | — | — |
| `CountUp` | opacity 0→1, y 8→0 | 0.3s | — |

Plus three CSS `@keyframes`:
- `float` (8s) — drifting blob
- `float-delayed` (10s, 1s delay) — companion blob
- `ticker` (30s linear, infinite) — capability ticker bar under hero
- `fadeUp` (0.4s) — used by `HeroChatDemo` to time message bubbles

**Easing of choice:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — a smooth, slightly-sluggish ease-out. **No bounces. No springs.** Calm system. Everything fades up or in. Nothing pops.

**Reveal trigger:** `whileInView` with `viewport={{ once: true, margin: "-60px" }}` — reveal once, slightly before scrolling into view.

### Transparency, blur, layering

- **Navbar:** `bg-neutral-950/90 backdrop-blur` — sticky, semi-transparent.
- **Flyout menus:** opaque `linear-gradient(160deg, #1a1a2e 0%, #16161a 100%)` (subtly blue-shifted, not pure neutral) with a 1px indigo gradient bar at the top.
- **Mobile menu:** Solid `bg-neutral-950`, no blur.
- **Modal/CTA backdrops:** Backgrounds get `backdrop-blur-sm` when overlaying decorative blobs.
- **Gradient fade-out:** `bg-gradient-to-t from-neutral-900 to-transparent` covers the bottom of the chat-demo box to fade content out cleanly.

### Layout rules

- Navbar is fixed top, 64px tall. Main content gets `pt-16` to compensate.
- Footer is non-sticky, separated by `mt-20`.
- Content grids are `grid md:grid-cols-3 gap-6` or `lg:grid-cols-4 gap-5` patterns — never asymmetric except the home Services row which is a `md:col-span-2` featured + `md:col-span-3 grid-cols-2` smaller cards.
- Mobile breakpoints are pure Tailwind: `sm: md: lg:`. No custom breakpoints.

---

## Iconography

### What the codebase uses

**Inline Heroicons-style SVG paths**, hand-written into `<svg>` tags. Stroke-based, NOT filled. No icon font, no SVG sprite, no `<i>` tags, no icon library import.

Every icon follows this pattern:
```jsx
<svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="..." />
</svg>
```

- **Style:** Heroicons v1/v2 **outline** style — 24×24 viewBox, stroke-only, rounded line caps and joins.
- **Stroke width:** `1.5` for navigation/services (most icons), `2` or `2.5` for arrows and chevrons (more visual weight needed at small sizes).
- **Color:** Always `currentColor` via `text-indigo-400` (in icon containers) or `text-neutral-300` (inline in nav).
- **Container:** Most icons live inside a colored 36–48px rounded square: `bg-indigo-950 border border-indigo-800/60 rounded-xl` with the icon centered.

The only ones in the wild (with their path attributes) are documented at `preview/icons.html`. About a dozen unique icons total: chat bubble, lightning, bar chart, sparkle, gears, hammer-wrench, search-magnify, play-triangle, shopping-bag, factory, cap-academic, globe, headset, calendar, briefcase, checkmark, X, hamburger, chevron-down, arrow-right, error-circle, spinner.

### Substitution guidance

Since the codebase rolls its own, **prefer Heroicons** when you need a new icon. They match the in-code style 1:1.

- CDN: `https://unpkg.com/heroicons@2.x/24/outline/` (individual files) or load via the `heroicons` npm package in real code.
- Picker / browser: https://heroicons.com — pick the **24×24 outline** set.

If you need an icon that's not in Heroicons, **Lucide** is the next-best match (same stroke-based outline aesthetic). Flag any non-Heroicon substitution in your output.

### Other glyphs

- **Logo emblem:** The "iKarmic" wordmark includes a custom **8-pointed starburst mandala** on the left (assets/logo.png). Don't redraw it.
- **Unicode glyphs as icons:** Contact page uses `✉ ✆ ⌖` as placeholder icons next to email/phone/location. Acceptable but **not preferred** — swap for Heroicons when you can.
- **Stars in testimonials:** filled 5-point star SVG, `text-indigo-400` (not gold). This is a distinct Ikarmic choice — never use gold stars.
- **Status dots:** `w-2 h-2 rounded-full bg-indigo-400 animate-pulse` — used in eyebrow badges and the chat-demo "online" indicator.
- **Emoji:** Avoid completely. See Content Fundamentals.

---

## Quick start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="colors_and_type.css">
  <title>Your page · Ikarmic AI</title>
</head>
<body>
  <section style="max-width: 80rem; margin: 0 auto; padding: 6rem 1.5rem;">
    <p class="eyebrow">Section eyebrow</p>
    <h1>Your headline with a <span class="text-gradient">gradient word.</span></h1>
    <p class="body-lg" style="margin-top: 1.5rem; max-width: 36rem;">
      A short, period-heavy lede. Mention a number. Mention a timeline.
    </p>
  </section>
</body>
</html>
```

---

## Caveats & known gaps

- **No Figma file** — system is reverse-engineered from the codebase only. Edge cases in spacing scale may not match a design source of truth.
- **Single product** — only the marketing site exists in the source repo. There is no app/dashboard/internal product UI yet. The `ui_kits/website` kit recreates the marketing surface.
- **Font is Google Fonts Inter, not a self-hosted file.** If you need offline-safe artifacts, swap to your own Inter .woff2 files.
- **Per-service color tints** (violet/blue/emerald/orange) appear on exactly one place: the home services grid. Don't promote them to system tokens.
