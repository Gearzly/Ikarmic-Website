"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useState, Fragment, type FocusEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type MenuItem     = { label: string; desc: string; href: string; icon: string };
type MenuCol      = { title: string; items: MenuItem[] };
type FeaturedCard = { eyebrow: string; title: string; desc: string; link: string; href: string };
type FooterStat   = { value: string; label: string };

// ─── Data ─────────────────────────────────────────────────────────────────────
const servicesData: MenuItem[] = [
  {
    label: "AI Chatbots",
    desc: "24/7 support without extra headcount",
    href: "/services/ai-chatbots",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    label: "Business Automation",
    desc: "Eliminate repetitive manual work",
    href: "/services/business-automation",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    label: "Generative AI",
    desc: "Content and code at scale",
    href: "/services/generative-ai",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    label: "Data Analytics",
    desc: "Surface insights from your data",
    href: "/services/data-analytics",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    label: "Custom AI",
    desc: "Built for your specific workflow",
    href: "/services/custom-ai",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
];

const solutionsData: MenuItem[] = [
  {
    label: "CX & Support AI",
    desc: "60% ticket deflection on day one",
    href: "/solutions/cx-support-ai",
    icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
  },
  {
    label: "AI-Powered Marketing",
    desc: "4× content velocity",
    href: "/solutions/ai-powered-marketing",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
  },
  {
    label: "Intelligent Automation",
    desc: "80% faster back-office processing",
    href: "/solutions/intelligent-automation",
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  },
  {
    label: "Predictive Intelligence",
    desc: "Forecast demand and churn early",
    href: "/solutions/predictive-intelligence",
    icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
  },
  {
    label: "Enterprise AI Platform",
    desc: "POC to production in 8 weeks",
    href: "/solutions/enterprise-ai-platform",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

const industriesData: MenuItem[] = [
  {
    label: "Retail & E-Commerce",
    desc: "Personalisation, demand forecasting & CX AI",
    href: "/industries/retail",
    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
  },
  {
    label: "Manufacturing",
    desc: "Predictive maintenance & quality automation",
    href: "/industries/manufacturing",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    label: "Education",
    desc: "Adaptive learning & administrative AI",
    href: "/industries/education",
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    label: "Technology",
    desc: "AI-native product features & MLOps",
    href: "/industries/technology",
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  },
];

// ─── Menu configs ─────────────────────────────────────────────────────────────
const servicesCols: MenuCol[] = [
  { title: "By Capability",      items: [servicesData[0], servicesData[1], servicesData[2]] },
  { title: "Analytics & Custom", items: [servicesData[3], servicesData[4]] },
  {
    title: "Explore",
    items: [
      { label: "Resources", desc: "Guides, templates and use cases",    href: "/resources", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
      { label: "Blog",      desc: "AI insights and best practices",     href: "/blog",      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
      { label: "About",     desc: "Our team, mission and approach",     href: "/about",     icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    ],
  },
];
const servicesFeatured: FeaturedCard = {
  eyebrow: "Case Study",
  title: "60% ticket deflection from day one",
  desc: "How a retail brand cut support costs and lifted CSAT in 6 weeks using our chatbot framework.",
  link: "Read the case study",
  href: "/blog/why-adaptive-ai-systems-outperform-static-models",
};
const servicesFooterStats: FooterStat[] = [
  { value: "6 weeks", label: "Median POC" },
  { value: "2 days",  label: "Response SLA" },
];

const solutionsCols: MenuCol[] = [
  { title: "Customer & Revenue", items: [solutionsData[0], solutionsData[1]] },
  { title: "Operations",         items: [solutionsData[2], solutionsData[3]] },
  { title: "Platform",           items: [solutionsData[4]] },
];
const solutionsFeatured: FeaturedCard = {
  eyebrow: "Platform",
  title: "From POC to production in 8 weeks",
  desc: "Our Enterprise AI Platform gives you models, observability and governance in one complete layer.",
  link: "See how it works",
  href: "/solutions/enterprise-ai-platform",
};
const solutionsFooterStats: FooterStat[] = [
  { value: "8 weeks", label: "POC to production" },
  { value: "3×",      label: "Avg. efficiency gain" },
];

const industriesCols: MenuCol[] = [
  { title: "Commerce & Learning", items: [industriesData[0], industriesData[2]] },
  { title: "Industrial & Tech",   items: [industriesData[1], industriesData[3]] },
];
const industriesFeatured: FeaturedCard = {
  eyebrow: "Our Approach",
  title: "AI built for how your industry really works",
  desc: "Every sector has unique constraints. We build models trained on domain data, not generic benchmarks.",
  link: "Explore all industries",
  href: "/industries",
};
const industriesFooterStats: FooterStat[] = [
  { value: "4",   label: "Industry verticals" },
  { value: "40+", label: "Deployed solutions" },
];

// ─── MegaMenu component ───────────────────────────────────────────────────────
function MegaMenu({
  id,
  ariaLabel,
  cols,
  featured,
  footerStats,
  cta,
}: {
  id: string;
  ariaLabel: string;
  cols: MenuCol[];
  featured: FeaturedCard;
  footerStats: FooterStat[];
  cta: { label: string; href: string };
}) {
  // 3 data cols → 4-col grid (wide); 2 data cols → 3-col grid
  const gridStyle =
    cols.length === 3
      ? { gridTemplateColumns: "1fr 1fr 1fr 1.1fr" }
      : { gridTemplateColumns: "1fr 1fr 1.1fr" };
  const panelWidth = cols.length === 3 ? "56rem" : "42rem";

  return (
    <div
      id={id}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50"
      style={{ width: panelWidth, maxWidth: "90vw" }}
    >
      <nav
        role="region"
        aria-label={ariaLabel}
        className="animate-mega-in rounded-[1.25rem] overflow-hidden border border-white/[0.06] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(99,102,241,0.04)]"
        style={{ background: "linear-gradient(160deg,#1a1a2e 0%,#16161a 100%)" }}
      >
        {/* Top accent bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/70 via-violet-400/50 to-transparent" />

        {/* Body grid */}
        <div className="grid" style={gridStyle}>
          {cols.map((col, i) => (
            <div
              key={col.title}
              className={`px-5 py-6 flex flex-col gap-1${i < cols.length - 1 ? " border-r border-white/[0.04]" : ""}`}
            >
              {/* Column title */}
              <p className="flex items-center gap-2 px-3 pb-3 m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-indigo-400">
                <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                {col.title}
              </p>

              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="grid gap-3 items-center px-3 py-2.5 rounded-[0.625rem] hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.5)] transition-colors outline-none group"
                  style={{ gridTemplateColumns: "2.25rem 1fr" }}
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="m-0 text-sm font-medium text-neutral-100 group-hover:text-white transition-colors leading-snug">{item.label}</p>
                    <p className="m-0 text-[0.6875rem] text-neutral-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}

          {/* Featured card column */}
          <div
            className="px-6 py-6 flex flex-col gap-3 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg,rgba(49,46,129,0.4) 0%,rgba(23,23,23,0.2) 100%)" }}
          >
            <div
              className="absolute -top-[40%] -right-[20%] w-[80%] h-[120%] pointer-events-none"
              style={{ background: "radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)" }}
            />
            <span className="relative z-10 inline-flex items-center w-max px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-indigo-300">
              {featured.eyebrow}
            </span>
            <h3 className="relative z-10 m-0 text-base font-bold text-white leading-snug">
              {featured.title}
            </h3>
            <p className="relative z-10 m-0 text-xs text-neutral-400 leading-relaxed flex-1">
              {featured.desc}
            </p>
            <Link
              href={featured.href}
              className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
            >
              {featured.link}
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Footer strip */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-black/25 border-t border-white/[0.04]">
          <div className="flex items-center gap-5 text-xs text-neutral-500">
            {footerStats.map((stat, i) => (
              <Fragment key={stat.label}>
                {i > 0 && <span className="w-px h-3.5 bg-neutral-700 shrink-0" />}
                <span>
                  <strong className="text-neutral-300 font-medium">{stat.value}</strong>
                  {" · "}{stat.label}
                </span>
              </Fragment>
            ))}
          </div>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[0.625rem] bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 text-xs font-semibold hover:bg-indigo-500/25 hover:border-indigo-500/50 hover:text-indigo-100 transition-all"
          >
            {cta.label}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [open, setOpen]                       = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded]   = useState<string | null>(null);

  function handleDesktopBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(nextTarget)) {
      setDesktopExpanded(null);
    }
  }

  const triggerCls = (key: string) =>
    `px-4 py-2 text-sm flex items-center gap-1 transition-colors ${
      desktopExpanded === key ? "text-white" : "text-neutral-300 hover:text-white focus-visible:text-white"
    }`;

  const chevron = (key: string) => (
    <svg
      className={`w-3 h-3 transition-transform ${desktopExpanded === key ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Logo />

        {/* ── Desktop nav ──────────────────────────────────────────────── */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          <Link href="/"      className="px-4 py-2 text-sm text-neutral-300 hover:text-white focus-visible:text-white transition-colors">Home</Link>
          <Link href="/about" className="px-4 py-2 text-sm text-neutral-300 hover:text-white focus-visible:text-white transition-colors">About</Link>

          {/* Services mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopExpanded("Services")}
            onMouseLeave={() => setDesktopExpanded(null)}
            onFocus={() => setDesktopExpanded("Services")}
            onBlur={handleDesktopBlur}
          >
            <button aria-haspopup="true" aria-expanded={desktopExpanded === "Services"} aria-controls="desktop-services-menu" className={triggerCls("Services")}>
              Services {chevron("Services")}
            </button>
            {desktopExpanded === "Services" && (
              <MegaMenu
                id="desktop-services-menu"
                ariaLabel="Services menu"
                cols={servicesCols}
                featured={servicesFeatured}
                footerStats={servicesFooterStats}
                cta={{ label: "Get a scoping call", href: "/contact" }}
              />
            )}
          </div>

          {/* Solutions mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopExpanded("Solutions")}
            onMouseLeave={() => setDesktopExpanded(null)}
            onFocus={() => setDesktopExpanded("Solutions")}
            onBlur={handleDesktopBlur}
          >
            <button aria-haspopup="true" aria-expanded={desktopExpanded === "Solutions"} aria-controls="desktop-solutions-menu" className={triggerCls("Solutions")}>
              Solutions {chevron("Solutions")}
            </button>
            {desktopExpanded === "Solutions" && (
              <MegaMenu
                id="desktop-solutions-menu"
                ariaLabel="Solutions menu"
                cols={solutionsCols}
                featured={solutionsFeatured}
                footerStats={solutionsFooterStats}
                cta={{ label: "See all solutions", href: "/solutions" }}
              />
            )}
          </div>

          {/* Industries mega menu */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopExpanded("Industries")}
            onMouseLeave={() => setDesktopExpanded(null)}
            onFocus={() => setDesktopExpanded("Industries")}
            onBlur={handleDesktopBlur}
          >
            <button aria-haspopup="true" aria-expanded={desktopExpanded === "Industries"} aria-controls="desktop-industries-menu" className={triggerCls("Industries")}>
              Industries {chevron("Industries")}
            </button>
            {desktopExpanded === "Industries" && (
              <MegaMenu
                id="desktop-industries-menu"
                ariaLabel="Industries menu"
                cols={industriesCols}
                featured={industriesFeatured}
                footerStats={industriesFooterStats}
                cta={{ label: "All industries", href: "/industries" }}
              />
            )}
          </div>

          <Link href="/ikarmic-aios" className="px-4 py-2 text-sm text-neutral-300 hover:text-white focus-visible:text-white transition-colors">Ikarmic AIOS</Link>
          <Link href="/blog"         className="px-4 py-2 text-sm text-neutral-300 hover:text-white focus-visible:text-white transition-colors">Blog</Link>
          <Link href="/contact"      className="px-4 py-2 text-sm text-neutral-300 hover:text-white focus-visible:text-white transition-colors">Contact</Link>
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]"
        >
          Start a project
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* ── Mobile hamburger ─────────────────────────────────────────── */}
        <button
          className="md:hidden p-2 text-neutral-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {open && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-6 py-4 space-y-1 overflow-y-auto max-h-[calc(100dvh-4rem)]">
          <Link href="/"      onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Home</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">About</Link>

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Services" ? null : "Services")}
              aria-expanded={mobileExpanded === "Services"}
              aria-controls="mobile-services-menu"
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Services
              <svg className={`w-3 h-3 transition-transform ${mobileExpanded === "Services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExpanded === "Services" && (
              <div id="mobile-services-menu" className="pl-4 space-y-1 pb-1">
                {servicesData.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-400 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                <Link href="/services" onClick={() => setOpen(false)} className="block px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  All Services →
                </Link>
              </div>
            )}
          </div>

          {/* Solutions accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Solutions" ? null : "Solutions")}
              aria-expanded={mobileExpanded === "Solutions"}
              aria-controls="mobile-solutions-menu"
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Solutions
              <svg className={`w-3 h-3 transition-transform ${mobileExpanded === "Solutions" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExpanded === "Solutions" && (
              <div id="mobile-solutions-menu" className="pl-4 space-y-1 pb-1">
                {solutionsData.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-400 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                <Link href="/solutions" onClick={() => setOpen(false)} className="block px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  All Solutions →
                </Link>
              </div>
            )}
          </div>

          {/* Industries accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Industries" ? null : "Industries")}
              aria-expanded={mobileExpanded === "Industries"}
              aria-controls="mobile-industries-menu"
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Industries
              <svg className={`w-3 h-3 transition-transform ${mobileExpanded === "Industries" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExpanded === "Industries" && (
              <div id="mobile-industries-menu" className="pl-4 space-y-1 pb-1">
                {industriesData.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-400 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                <Link href="/industries" onClick={() => setOpen(false)} className="block px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  All Industries →
                </Link>
              </div>
            )}
          </div>

          <Link href="/ikarmic-aios" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Ikarmic AIOS</Link>
          <Link href="/blog"         onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Blog</Link>
          <Link href="/contact"      onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Contact</Link>

          <div className="pt-3 border-t border-neutral-800">
            <Link href="/contact" onClick={() => setOpen(false)} className="block w-full text-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors">
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

