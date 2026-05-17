import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "next-seo";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Ikarmic delivers domain-specific AI for retail, manufacturing, education, and technology — built-in playbooks, measurable outcomes, no learning curve on your budget.",
  openGraph: {
    title: "Industries | Ikarmic AI",
    description: "Domain-specific AI for retail, manufacturing, education, and technology.",
    url: "https://ikarmic.com/industries",
    type: "website",
  },
};

const industries = [
  {
    slug: "retail",
    name: "Retail & E-commerce",
    tagline: "Smarter Retail, Better Margins",
    challenge: "Demand volatility, cart abandonment, personalisation at scale.",
    edge: "Predictive analytics, conversational support, and AI-driven recommendations.",
    stat: { value: "30%", label: "Forecast accuracy gain" },
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900&q=80&auto=format&fit=crop",
    color: "from-violet-900/80",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Intelligent Factories, Zero Guesswork",
    challenge: "Supply chain disruption, quality control, predictive maintenance.",
    edge: "Data analytics, intelligent automation, and custom ML models.",
    stat: { value: "40%", label: "Unplanned downtime reduction" },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop",
    color: "from-blue-900/80",
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Personalised Learning at Scale",
    challenge: "One-size-fits-all curricula, admin burden, student engagement.",
    edge: "Gen AI knowledge assistants, chatbots, and custom platforms.",
    stat: { value: "28%", label: "Higher course-completion rate" },
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80&auto=format&fit=crop",
    color: "from-emerald-900/80",
  },
  {
    slug: "technology",
    name: "Technology & Startups",
    tagline: "Ship AI Features. Own the Infra.",
    challenge: "Shipping AI features fast, scaling ML infra, differentiating product.",
    edge: "Custom AI development, gen AI, and data analytics acceleration.",
    stat: { value: "8 wks", label: "POC to production" },
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop",
    color: "from-rose-900/80",
  },
];

const globalStats = [
  { value: "4", label: "Industry playbooks" },
  { value: "12+", label: "Proven use cases" },
  { value: "95%+", label: "Client satisfaction" },
  { value: "2 days", label: "Response SLA" },
];

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ikarmic.com" },
          { name: "Industries", item: "https://ikarmic.com/industries" },
        ]}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[55%] rounded-full bg-indigo-700/20 blur-[120px] animate-float" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-violet-700/15 blur-[100px] animate-float-delayed" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_#030712_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 w-full">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/50 uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Industries
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.04] tracking-tight">
              <span className="text-white">AI for</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent animate-gradient-x">
                Your Industry
              </span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 text-xl text-neutral-400 max-w-2xl leading-relaxed">
              Every vertical has unique data, workflows, and regulatory context. We tailor our AI services to deliver
              impact where it matters most — so you&#39;re not paying us to learn your domain.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="#industries"
                className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Explore Industries
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all"
              >
                Start a Project
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Global stats bar ────────────────────────────────────────── */}
      <div className="border-y border-neutral-800 bg-neutral-900/50">
        <Stagger className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {globalStats.map((s) => (
            <StaggerItem key={s.label}>
              <CountUp value={s.value} className="block text-3xl font-bold text-indigo-400 mb-1" />
              <p className="text-xs text-neutral-500 uppercase tracking-wider">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* ── Industry cards ──────────────────────────────────────────── */}
      <section id="industries" className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Four Verticals</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-14 max-w-xl leading-tight">
            Domain expertise,<br />not demo decks.
          </h2>
        </FadeUp>

        <Stagger className="grid md:grid-cols-2 gap-6" staggerDelay={0.12}>
          {industries.map((ind) => (
            <StaggerItem key={ind.slug}>
              <Link href={`/industries/${ind.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl h-[380px]">
                  {/* Background image */}
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${ind.color} via-neutral-950/70 to-transparent`} />
                  <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Stat chip — top right */}
                    <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-right">
                      <p className="text-base font-bold text-white leading-none">{ind.stat.value}</p>
                      <p className="text-[10px] text-neutral-300 mt-0.5">{ind.stat.label}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-2 opacity-80">
                        Challenge
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{ind.name}</h3>
                      <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
                        {ind.challenge}
                      </p>

                      {/* Hover reveal */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-out">
                        <p className="text-sm text-indigo-300 mt-3 leading-relaxed">
                          <span className="font-semibold text-indigo-200">Our edge: </span>
                          {ind.edge}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          Explore {ind.name} AI
                        </span>
                        <svg
                          className="w-4 h-4 text-indigo-400 translate-x-0 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Why domain expertise matters ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left */}
            <FadeLeft className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                Why It Matters
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Domain knowledge is the difference between AI that works and AI that doesn&#39;t.
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Generic AI products are built for the median use case. Your data, workflows, and regulatory context
                are not median. We bring pre-built playbooks, domain-relevant training data, and integration
                experience for your vertical — so pilots move faster and outcomes are predictable.
              </p>
              <ul className="space-y-3">
                {[
                  "Pre-mapped data schemas per industry",
                  "Domain-tuned evaluation metrics",
                  "Sector-specific compliance patterns",
                  "Proven integration connectors",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeLeft>

            {/* Right – industry icon grid */}
            <FadeRight className="p-10 md:p-14 border-t md:border-t-0 md:border-l border-neutral-800 grid grid-cols-2 gap-4 content-center">
              {[
                { emoji: "🛍️", name: "Retail & E-commerce", href: "/industries/retail" },
                { emoji: "🏭", name: "Manufacturing", href: "/industries/manufacturing" },
                { emoji: "🎓", name: "Education", href: "/industries/education" },
                { emoji: "💻", name: "Technology & Startups", href: "/industries/technology" },
              ].map((ind) => (
                <Link
                  key={ind.href}
                  href={ind.href}
                  className="group p-6 rounded-2xl bg-neutral-800/60 hover:bg-indigo-950/60 border border-neutral-700/50 hover:border-indigo-700/60 transition-all text-center"
                >
                  <span className="text-4xl mb-3 block">{ind.emoji}</span>
                  <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors leading-tight">
                    {ind.name}
                  </p>
                </Link>
              ))}
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── Don't see your industry CTA ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <FadeUp>
          {/* Gradient border wrapper */}
          <div className="p-px rounded-3xl bg-gradient-to-br from-indigo-600/50 via-violet-600/30 to-indigo-600/50">
            <div className="rounded-[calc(1.5rem-1px)] bg-neutral-950 px-10 md:px-20 py-16 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-violet-300 bg-violet-950/60 border border-violet-800/40 uppercase tracking-widest mb-6">
                Don&#39;t See Your Industry?
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Our approach adapts<br />to any vertical.
              </h2>
              <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">
                Tell us about your domain and we&#39;ll map the highest-impact AI opportunities — no commitment
                required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="/solutions"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
                >
                  View All Solutions
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
