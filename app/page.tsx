import type { Metadata } from "next";
import Link from "next/link";
import HeroChatDemo from "@/components/HeroChatDemo";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  Stagger,
  StaggerItem,
  CountUp,
  HoverCard,
} from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "AI that works for people",
  description:
    "Ikarmic designs and ships AI systems that are calm, reliable, and easy to adopt — chatbots, automation, analytics, generative AI, and custom ML for real business outcomes.",
  keywords: ["AI solutions", "AI chatbots", "business automation", "generative AI", "machine learning", "AI consulting", "enterprise AI platform", "data analytics AI"],
  alternates: { canonical: "https://ikarmic.com" },
  openGraph: {
    title: "Ikarmic AI — AI that works for people",
    description: "Ikarmic designs and ships AI systems that are calm, reliable, and easy to adopt.",
    url: "https://ikarmic.com",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Ikarmic AI — AI that works for people", description: "Calm, reliable, easy-to-adopt AI for real business outcomes.", images: ["/og-default.png"] },
};

// ── Data ────────────────────────────────────────────────────────────────────

const tickerItems = [
  "AI Chatbots & Conversational AI",
  "Demand Forecasting",
  "Generative AI",
  "Predictive Analytics",
  "Custom ML Models",
  "Business Automation",
  "RAG Pipelines",
  "LLM Fine-Tuning",
  "Computer Vision",
  "Data Engineering",
  "MLOps & Monitoring",
  "Responsible AI",
];

const stats = [
  { value: "50+", label: "AI Projects Delivered", sub: "across 4 industries" },
  { value: "65%", label: "Avg. Ticket Deflection", sub: "for chatbot deployments" },
  { value: "6 wks", label: "POC to Production", sub: "median delivery time" },
  { value: "100%", label: "IP Ownership", sub: "always transferred to you" },
];

const services = [
  {
    num: "01",
    title: "AI Chatbots & Conversational AI",
    desc: "Intelligent chatbots across web, WhatsApp, and messaging platforms — resolving tier-1 and tier-2 queries 24/7 without adding headcount.",
    href: "/services/ai-chatbots",
    featured: true,
    accent: "indigo",
    iconPath:
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    badge: "Most Popular",
  },
  {
    num: "02",
    title: "Business Automation",
    desc: "Automate repetitive workflows, document processing, and operations to cut costs and free your team for high-value work.",
    href: "/services/business-automation",
    featured: false,
    accent: "violet",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    num: "03",
    title: "Data Analytics & Predictive AI",
    desc: "Turn raw data into strategic decisions — forecasting outcomes, detecting risk, and optimising margins at scale.",
    href: "/services/data-analytics",
    featured: false,
    accent: "blue",
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    num: "04",
    title: "Generative AI Solutions",
    desc: "Production-grade LLM systems — RAG pipelines, fine-tuned models, guardrails — that create real content and real leverage.",
    href: "/services/generative-ai",
    featured: false,
    accent: "emerald",
    iconPath:
      "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
  {
    num: "05",
    title: "Custom AI Development",
    desc: "Bespoke models designed for your specific problem — from prototype to production with full IP transfer and team enablement.",
    href: "/services/custom-ai",
    featured: false,
    accent: "orange",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
];

const accentMap: Record<string, { icon: string; border: string; glow: string; badge: string }> = {
  indigo: {
    icon: "bg-indigo-950 text-indigo-400 border-indigo-800/60",
    border: "group-hover:border-indigo-700/60 group-hover:bg-indigo-950/20",
    glow: "shadow-[0_0_40px_rgba(99,102,241,0.12)]",
    badge: "bg-indigo-950/80 text-indigo-300 border-indigo-800/50",
  },
  violet: {
    icon: "bg-violet-950 text-violet-400 border-violet-800/60",
    border: "group-hover:border-violet-700/60 group-hover:bg-violet-950/20",
    glow: "",
    badge: "",
  },
  blue: {
    icon: "bg-blue-950 text-blue-400 border-blue-800/60",
    border: "group-hover:border-blue-700/60 group-hover:bg-blue-950/20",
    glow: "",
    badge: "",
  },
  emerald: {
    icon: "bg-emerald-950 text-emerald-400 border-emerald-800/60",
    border: "group-hover:border-emerald-700/60 group-hover:bg-emerald-950/20",
    glow: "",
    badge: "",
  },
  orange: {
    icon: "bg-orange-950 text-orange-400 border-orange-800/60",
    border: "group-hover:border-orange-700/60 group-hover:bg-orange-950/20",
    glow: "",
    badge: "",
  },
};

const steps = [
  {
    num: "01",
    title: "Discovery",
    duration: "Week 1",
    desc: "A focused 3-day working session to map your data, systems, and goals — no slide decks, all real work.",
    iconPath:
      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    num: "02",
    title: "Design & Build",
    duration: "Weeks 2–5",
    desc: "Rapid sprints with weekly working demos. You see real models running against your data before each sprint ends.",
    iconPath:
      "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    num: "03",
    title: "Deploy & Scale",
    duration: "Week 6+",
    desc: "Production-grade deployment with monitoring, retraining schedules, and full team enablement — then we step back.",
    iconPath:
      "M5 3l14 9-14 9V3z",
  },
];

const testimonials = [
  {
    quote:
      "Our customer support ticket volume dropped 62% in the first month. The chatbot handles what used to take 8 agents, and CSAT actually went up.",
    name: "Priya R.",
    title: "Head of Customer Experience",
    company: "Retail Brand",
    avatar: "PR",
    color: "from-indigo-500 to-violet-500",
  },
  {
    quote:
      "The demand forecasting model paid for itself within three weeks. We cut overstock losses by ₹40L in Q1 alone. The ROI case was immediate.",
    name: "Ankit M.",
    title: "VP Operations",
    company: "Manufacturing Group",
    avatar: "AM",
    color: "from-emerald-500 to-teal-500",
  },
  {
    quote:
      "Ikarmic moved at a pace we'd never seen from an AI vendor. POC in week two, production in week six, full IP handover on day forty.",
    name: "Sarah L.",
    title: "CTO",
    company: "EdTech Startup",
    avatar: "SL",
    color: "from-orange-500 to-rose-500",
  },
];

const blogPosts = [
  {
    tag: "STRATEGY",
    tagColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800/40",
    readTime: "7 min",
    title: "Why Adaptive AI Systems Outperform Static Models",
    excerpt:
      "Static models decay. Markets shift, data drifts. Here's how Ikarmic's adaptive systems keep AI accurate long after launch.",
    href: "/blog/why-adaptive-ai-systems-outperform-static-models",
    date: "19 Apr 2026",
  },
  {
    tag: "GOVERNANCE",
    tagColor: "text-violet-400 bg-violet-950/60 border-violet-800/40",
    readTime: "5 min",
    title: "Ethical by Design: AI Governance Can't Be a Checklist",
    excerpt:
      "Compliance isn't a finish line — it's a baseline. Ikarmic builds bias checks and privacy guardrails into every system from day one.",
    href: "/blog/ethical-by-design-ai-governance-not-a-checklist",
    date: "19 Apr 2026",
  },
  {
    tag: "PRODUCT",
    tagColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40",
    readTime: "6 min",
    title: "The Invisible AI: Human-Centered Design Meets ML",
    excerpt:
      "The best AI doesn't announce itself. It surfaces the right answer, explains its confidence, and hands control back to the user.",
    href: "/blog/invisible-ai-human-centered-design-machine-learning",
    date: "19 Apr 2026",
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-neutral-950">
        {/* Clip container for blobs — prevents horizontal overflow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.25) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Gradient vignette over grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#030712_100%)]" />

        {/* Animated blobs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-indigo-700/12 blur-[130px] animate-float" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-violet-700/10 blur-[110px] animate-float-delayed" />
        <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] rounded-full bg-blue-700/8 blur-[100px] animate-float" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-8 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  AI Services &amp; Solutions Company
                </div>
              </FadeUp>

              <FadeUp delay={0.07}>
                <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.04] tracking-tight">
                  AI that works
                  <br />
                  <span className="text-gradient">for people.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.14}>
                <p className="mt-6 text-xl text-neutral-400 max-w-lg leading-relaxed">
                  We design and ship machine learning systems that are calm, reliable, and
                  easy to adopt — across products, operations, and customer experiences.
                </p>
              </FadeUp>

              <FadeUp delay={0.21}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.45)] text-base"
                  >
                    Get a Free AI Scoping Call
                    <svg
                      className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/solutions"
                    className="px-7 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm text-base"
                  >
                    View Solutions
                  </Link>
                </div>
              </FadeUp>

              {/* Mini stats row */}
              <FadeUp delay={0.3}>
                <div className="mt-12 pt-8 border-t border-neutral-800/60 grid grid-cols-4 gap-4">
                  {[
                    { v: "50+", l: "AI Projects" },
                    { v: "4", l: "Industries" },
                    { v: "6 wks", l: "POC to Prod" },
                    { v: "2-day", l: "Response SLA" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="text-xl font-bold text-white">{s.v}</div>
                      <div className="text-xs text-neutral-500 mt-0.5 leading-tight">{s.l}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: Live chat demo */}
            <FadeRight delay={0.18}>
              <HeroChatDemo />
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. TICKER — FIXED (was animate-none)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-4 overflow-hidden bg-neutral-900/60 border-y border-neutral-800 backdrop-blur-sm">
        <div className="flex whitespace-nowrap">
          <div className="flex gap-16 animate-ticker shrink-0">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm font-medium text-neutral-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. IMPACT STATS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <FadeUp>
          <p className="text-center text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Proven Impact
          </p>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-14">
            Numbers that move the needle
          </h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-7 text-center h-full">
                  <CountUp
                    value={s.value}
                    className="block text-4xl font-bold text-indigo-400 mb-2"
                  />
                  <p className="text-sm font-semibold text-white mb-1">{s.label}</p>
                  <p className="text-xs text-neutral-500">{s.sub}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. SERVICES — featured + 4 grid
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <FadeLeft>
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              Core Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Five capabilities,
              <br />
              one clear outcome.
            </h2>
          </FadeLeft>
          <FadeRight>
            <Link
              href="/services"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
            >
              All services
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeRight>
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {/* Featured card */}
          {(() => {
            const s = services[0];
            const a = accentMap[s.accent];
            return (
              <FadeLeft className="md:col-span-2">
                <Link href={s.href} className="group block h-full">
                  <div
                    className={`h-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 transition-all ${a.border} relative overflow-hidden`}
                  >
                    {/* Glow bg */}
                    <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors rounded-2xl" />
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-indigo-700/10 blur-[50px] group-hover:bg-indigo-700/20 transition-colors" />

                    <div className="relative z-10">
                      {s.badge && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border mb-6 ${a.badge}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                          {s.badge}
                        </span>
                      )}

                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${a.icon}`}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
                        </svg>
                      </div>

                      <p className="text-xs text-neutral-600 font-mono mb-2">{s.num}</p>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-3 leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed mb-8">{s.desc}</p>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        Learn more
                        <svg
                          className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeLeft>
            );
          })()}

          {/* 4 smaller cards */}
          <Stagger className="md:col-span-3 grid grid-cols-2 gap-5" staggerDelay={0.08}>
            {services.slice(1).map((s) => {
              const a = accentMap[s.accent];
              return (
                <StaggerItem key={s.href}>
                  <Link href={s.href} className="group block h-full">
                    <div
                      className={`h-full p-6 rounded-2xl bg-neutral-900 border border-neutral-800 transition-all ${a.border} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-current/0 group-hover:bg-white/[0.02] transition-colors rounded-2xl" />
                      <div className="relative z-10">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${a.icon}`}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
                          </svg>
                        </div>
                        <p className="text-[10px] text-neutral-600 font-mono mb-1.5">{s.num}</p>
                        <h3 className="font-bold text-white group-hover:text-neutral-200 transition-colors text-sm leading-snug mb-2">
                          {s.title}
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. HOW WE WORK
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="p-10 md:p-14">
            <FadeUp>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
                How We Work
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                From idea to production
                <br />
                in six weeks.
              </h2>
              <p className="text-neutral-400 max-w-lg mb-12">
                Every engagement follows the same three-phase structure. Predictable pace,
                working demos at every milestone, no surprises.
              </p>
            </FadeUp>

            <div className="relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-[3.25rem] left-[calc(33.33%+1.5rem)] right-[calc(33.33%+1.5rem)] h-px bg-gradient-to-r from-indigo-800/60 via-violet-800/60 to-indigo-800/60" />

              <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
                {steps.map((step) => (
                  <StaggerItem key={step.num}>
                    <div className="p-7 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:border-indigo-800/50 transition-colors group">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center mb-6 relative z-10 group-hover:border-indigo-600/60 transition-colors">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <h3 className="font-bold text-white text-lg">{step.title}</h3>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-800/40 font-semibold">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <FadeUp delay={0.3}>
              <div className="mt-10 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)] text-sm"
                >
                  Start with a free scoping call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  Learn about us →
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. TESTIMONIALS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Client Results
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 leading-tight">
            Heard from people who've shipped with us
          </h2>
        </FadeUp>

        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="h-full p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-neutral-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-5 border-t border-neutral-800">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-neutral-500">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. BLOG
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <FadeLeft>
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
              Insights
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Thinking out loud
              <br />
              about AI that lasts.
            </h2>
          </FadeLeft>
          <FadeRight>
            <Link
              href="/blog"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
            >
              All articles
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeRight>
        </div>

        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {blogPosts.map((post) => (
            <StaggerItem key={post.href}>
              <Link href={post.href} className="group block h-full">
                <div className="h-full p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col group-hover:bg-neutral-800/50">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${post.tagColor}`}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-neutral-600">{post.readTime} read</span>
                  </div>

                  <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-3 text-[1.05rem] flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-5">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                    <span className="text-xs text-neutral-600">{post.date}</span>
                    <span className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                      Read
                      <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          8. FINAL CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-indigo-900/50 bg-gradient-to-br from-indigo-950 via-neutral-900 to-neutral-950 text-center px-10 md:px-20 py-20">
            {/* Background blobs */}
            <div className="absolute top-[-30%] right-[-8%] w-[40%] h-[130%] rounded-full bg-indigo-700/10 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-8%] w-[35%] h-[110%] rounded-full bg-violet-700/10 blur-[80px] pointer-events-none" />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(99,102,241,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Free 30-min session, no commitment
              </p>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                Let&apos;s build something
                <br />
                <span className="text-gradient">precise.</span>
              </h2>

              <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
                Tell us what you&apos;re trying to automate, predict, or personalise. We&apos;ll reply
                within two business days with a concrete scoping plan — no slides, no fluff.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_40px_rgba(99,102,241,0.45)] text-base"
                >
                  Book a Free Scoping Call
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all text-base"
                >
                  Explore All Services
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500">
                <a href="mailto:hello@ikarmic.com" className="hover:text-indigo-400 transition-colors">
                  hello@ikarmic.com
                </a>
                <span className="hidden sm:inline w-px h-4 bg-neutral-700" />
                <span>Hyderabad, India · Remote-first</span>
                <span className="hidden sm:inline w-px h-4 bg-neutral-700" />
                <span>Respond within 2 business days</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

