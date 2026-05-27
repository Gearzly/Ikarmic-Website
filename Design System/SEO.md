# SEO & Semantic Standards — Ikarmic AI Design System

These are the SEO and accessibility-adjacent rules baked into the Ikarmic codebase. Anything you ship — a page, a slide, a doc, a microsite — must follow them. Most of these patterns already exist in `app/layout.tsx`, the per-page `metadata` exports, and the `next-seo` `OrganizationJsonLd` block.

> **Why these matter together.** SEO and accessibility share most of the same machinery — semantic HTML, descriptive text, proper landmarks, clean URLs. Get the structure right and you get rankings, screen-reader support, AI-overview eligibility, and social previews for free.

---

## 1. Semantic HTML — the foundation

The crawler, the screen reader, and the design system all read the **same** DOM. Use tags that mean something.

### Required landmarks per page

| Tag | Where | Notes |
|---|---|---|
| `<header>` | Top of page | Wraps `<Navbar>`. One per page. |
| `<nav aria-label="Primary">` | Inside `<header>` | The desktop nav. Use distinct `aria-label` if you have multiple navs. |
| `<main>` | Below the navbar | Exactly **one** `<main>` per page. All Next.js pages should wrap their root return in `<main>` (currently `app/layout.tsx` already does — `<main className="pt-16">`). |
| `<article>` | Blog posts, case studies | One per piece of standalone content. |
| `<section>` | Major page divisions | Each should be themed and contain a heading. |
| `<aside>` | Sidebars, related links | Only when content is genuinely tangential. |
| `<footer>` | Bottom of page | Wraps `<Footer>`. |

### Heading hierarchy — never break the chain

- **One `<h1>` per page.** It must contain the page's primary keyword. The home page `<h1>` is `"AI that works for people."`
- `<h2>` for each top-level section (Services, How We Work, Testimonials…).
- `<h3>` for cards / sub-blocks within a section.
- **Never skip levels.** No `<h2>` followed by `<h4>`. If you need smaller text without a heading, use a `<p class="ik-eyebrow">` or plain `<p>`.
- Headings are for structure, not styling. If something looks like a heading but isn't a section title, style a paragraph instead.

### Common mistakes to avoid

| Wrong | Right |
|---|---|
| `<div className="text-3xl font-bold">…</div>` | `<h2 className="ik-h2">…</h2>` |
| Two `<h1>` on one page | Exactly one `<h1>`, then `<h2>` for next level |
| `<a onClick=…>Submit</a>` | `<button onClick=…>Submit</button>` |
| Image with no `alt` | `<img alt="Descriptive sentence" />` (or `alt=""` if decorative) |
| `<div className="navbar">` | `<header><nav aria-label="Primary">…</nav></header>` |

---

## 2. Page metadata pattern

Every page in `app/` must export `metadata`. The home page sets the template (`Ikarmic AI — AI that works for people` → `{title} | Ikarmic AI`). Mirror this everywhere.

```tsx
export const metadata: Metadata = {
  title: "AI Chatbots & Conversational AI",                    // 50–60 chars
  description: "Deploy channel-agnostic AI chatbots with...",  // 140–160 chars
  keywords: ["AI chatbot development", "conversational AI"],   // 5–10 terms
  alternates: { canonical: "https://ikarmic.com/services/ai-chatbots" },
  openGraph: {
    title: "AI Chatbots & Conversational AI | Ikarmic AI",
    description: "Channel-agnostic chatbots with human escalation that cut support costs.",
    url: "https://ikarmic.com/services/ai-chatbots",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "...", description: "...", images: ["/og-default.png"] },
};
```

### Rules
- **`title`:** 50–60 chars, primary keyword first, brand last (via `metadataBase` template).
- **`description`:** 140–160 chars. Outcome-led, includes one number when possible.
- **`canonical`:** every page sets `alternates.canonical` to its absolute URL. Prevents duplicate-content penalties.
- **`openGraph` + `twitter`:** every page. Even internal pages. Image is 1200×630, lives at `/og-default.png` unless a page-specific OG exists.
- **`keywords`:** Google ignores them but other engines and internal tools still parse them. Keep a tight, honest list — 5–10 phrases, no stuffing.

---

## 3. Structured data (JSON-LD)

Already wired via `next-seo`. The site emits an `Organization` schema in the root layout:

```tsx
<OrganizationJsonLd
  type="Organization"
  name="Ikarmic AI"
  url="https://ikarmic.com"
  sameAs={[
    "https://www.linkedin.com/company/ikarmic-ai",
    "https://x.com/ikarmicai",
  ]}
/>
```

### Add these on the relevant page types

| Page type | Add schema |
|---|---|
| Blog post | `Article` or `BlogPosting` — with `author`, `datePublished`, `image`, `headline` |
| Service page | `Service` schema linked to the `Organization` |
| FAQ section | `FAQPage` with the q/a pairs in JSON-LD |
| Case study | `Article` + the client `Organization` (if named) |
| Breadcrumb trail | `BreadcrumbList` on every page deeper than the root |
| Contact / location | `LocalBusiness` with the Hyderabad address |

Use the `next-seo` `ArticleJsonLd`, `FAQPageJsonLd`, `BreadcrumbJsonLd` components — don't hand-roll.

---

## 4. URLs, sitemap, robots

- **Slugs are kebab-case, descriptive, no dates.** `/services/ai-chatbots` not `/services/2026/04/ai-chatbots`. The codebase already follows this.
- **Sitemap:** lives in `app/sitemap.ts`. **Every new route must be added.** Crawlers won't find pages that aren't linked or listed.
- **Robots:** `app/robots.ts` controls crawl scope. Don't block public content. The default `metadata.robots` is `{ index: true, follow: true }`.
- **`feed.xml`:** RSS for blog already exists. Every new blog post needs to surface there.
- **Canonical strategy:** when content can be reached at multiple URLs, the canonical URL is the **shortest valid path** — no trailing slash, no query params, no UTM.

---

## 5. Internal linking

- Every page should be reachable from the home page in ≤3 clicks. Service pages: home → /services → /services/ai-chatbots = 2 clicks. ✓
- Link text must be **descriptive**, not "click here" or "learn more" standalone. The Ikarmic pattern is `Learn more →` **with the service name in the surrounding context** — that's fine in cards, but never use a bare "Read more" link in a list.
- Use `<Link>` from `next/link` for internal nav (preserves prefetching). Reserve `<a>` for external + `mailto:` / `tel:`.
- External links: `target="_blank" rel="noopener noreferrer"`. Already used on LinkedIn / X footer links.

---

## 6. Images

- Every `<img>` has an `alt` — descriptive sentence if meaningful, empty `alt=""` if purely decorative.
- Use `next/image` `<Image>` for all hero/marketing visuals — automatic responsive sizing + lazy loading. The codebase uses `unoptimized` only on the logo because of the PNG; new images should drop that.
- Brand assets in `/public/` are PNG. New images **should be WebP or AVIF** with PNG fallback. Hero blob backgrounds are CSS-only (no image cost). Keep it that way.
- Image filenames are descriptive (`ai-chatbot-flow-diagram.png` not `IMG_8472.png`).

---

## 7. Performance signals Google reads as ranking factors

Already enforced via the stack:

| Signal | Where it's covered |
|---|---|
| **LCP** (Largest Contentful Paint) | Hero is text + CSS. No hero image. LCP element is the `<h1>`. Inter is `display: swap`. ✓ |
| **CLS** (Cumulative Layout Shift) | All images use `next/image` with explicit `width`/`height`. ✓ |
| **INP** (Interaction to Next Paint) | Framer Motion animations are GPU-only (transform/opacity), no layout thrash. ✓ |
| **Fonts** | One family (Inter), loaded via `next/font` with `display: swap` — no FOUT, no extra requests. ✓ |
| **Static export** | `next.config.ts` ships a static build. Pages are pre-rendered HTML. ✓ |
| **Above-the-fold content** | Hero copy + CTA in the first viewport. No "click to expand to see the value prop." ✓ |
| `content-visibility: auto` | Applied to long off-screen sections via the `@utility content-auto` Tailwind utility. Skips paint cost. ✓ |

### When adding new sections / pages

- Don't add hero images. The dot-grid + blob background is intentional — keep CSS-only.
- Don't introduce a second font family. If you need a "display" font, use Inter heavier weight.
- Don't hand-roll lazy-loading. Reach for `next/image` or `content-visibility: auto`.
- Don't load JS for purely visual sections. The CTA blob animation is pure CSS keyframes.

---

## 8. Accessibility = SEO

These rules **also** improve rankings (Google explicitly considers a11y signals; AI overviews preferentially cite accessible content).

- **Color contrast:** body text on `#0a0a0a` is `#a3a3a3` — passes WCAG AA (4.7:1). Don't go darker than that for body.
- **Focus rings:** every interactive element shows a visible focus ring on `:focus-visible`. The mega menu adds an indigo `box-shadow` ring; never `outline: none` without a replacement.
- **Touch targets:** minimum 44×44 px on mobile. The codebase's buttons hit `py-3` (24+ rendered) — verify on small screens.
- **ARIA:** trigger buttons set `aria-haspopup` + `aria-expanded`; panels set `role="region"` + `aria-label`; decorative SVGs in icon containers set `aria-hidden="true"`.
- **Skip-link:** **MISSING in current codebase.** Add one: `<a href="#main" class="skip-link">Skip to content</a>` as the first body element. Visually hidden until focused.
- **Forms:** every input has a `<label htmlFor>`. Errors are visible AND announced (codebase's ContactForm does this with `aria-invalid` — extend to all fields).

---

## 9. Content rules for ranking + AI overviews

AI search engines (Google AI Overviews, Perplexity, ChatGPT browsing) lift content based on **question-and-answer patterns**, **clean tables**, and **numbered lists**. The Ikarmic voice already leans this way — keep it strong:

- **FAQ sections** on every service page (already templated in `app/services/page.tsx`).
- **Numbered lists** for "How we work" / process steps — these win for "how to" queries.
- **Specific numbers** ("60% deflection", "6 weeks", "₹40L") get pulled into AI summaries far more than vague claims.
- **Direct subheading questions** — `<h3>How quickly can we launch an AI pilot?</h3>` then a 1–3 sentence answer beats "Timelines" as a heading.
- **First-paragraph value summary** — the first paragraph of every blog post must answer the title's question in 2–3 sentences. Then go deep.

---

## 10. Checklist — every new page

Before shipping any new route under `app/`:

- [ ] Exports `metadata` with title, description, keywords, canonical, openGraph, twitter
- [ ] Exactly one `<h1>` containing the primary keyword
- [ ] `<main>` is the only root landmark; nav and footer come from layout
- [ ] All images have `alt` text (or `alt=""` for decorative)
- [ ] All interactive `<button>` / `<a>` have accessible names (visible text or `aria-label`)
- [ ] Page is added to `app/sitemap.ts`
- [ ] If new content type → relevant JSON-LD schema attached (Article, FAQ, Service, BreadcrumbList)
- [ ] Internal links use `<Link>`; external use `rel="noopener noreferrer"`
- [ ] No new font, no hero image, no client-side data fetch in the hero
- [ ] Tested at narrow widths — no horizontal scroll, no text smaller than 14px on body, 12px on meta

---

## 11. What this design system enforces

Cross-reference with `colors_and_type.css`:

- **Semantic CSS classes** (`.ik-h1`, `.ik-h2`, `.ik-eyebrow`) ensure heading tags get heading styles — discouraging the `<div className="font-bold text-4xl">` antipattern.
- **`text-wrap: pretty`** is allowed and encouraged on headlines for better ragging — improves perceived reading speed.
- **Eyebrow labels are paragraphs**, not headings. They sit *above* the actual `<h2>`. Don't make them `<h6>` just because they look small.
- **Buttons that look like links** still use `<button>` with `cursor: pointer` — never `<a href="#">` for actions that aren't navigation.
