import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Five AI solution areas built around measurable business outcomes — CX AI, intelligent automation, predictive intelligence, marketing AI, and enterprise AI platform.",
  keywords: ["AI solutions", "customer experience AI", "intelligent automation", "predictive analytics", "AI marketing", "enterprise AI", "AI business solutions"],
  alternates: { canonical: "https://ikarmic.com/solutions" },
  openGraph: {
    title: "AI Solutions | Ikarmic AI",
    description: "Five AI solution areas built around measurable business outcomes.",
    url: "https://ikarmic.com/solutions",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AI Solutions | Ikarmic AI", description: "CX AI, automation, predictive intelligence, marketing AI, and enterprise AI.", images: ["/og-default.png"] },
};

const solutions = [
  {
    title: "CX & Support AI",
    desc: "Deflect routine tickets with AI-powered conversations, omnichannel chat, and intelligent escalation that routes complex cases to the right agent with full context.",
    stats: ["60% ticket deflection", "35% support cost reduction", "4.6★ satisfaction"],
    href: "/solutions/cx-support-ai",
  },
  {
    title: "Intelligent Automation",
    desc: "Replace manual back-office work with AI that reads documents, routes emails, and orchestrates multi-step workflows — reliably, around the clock.",
    stats: ["80% processing time reduction", "95%+ extraction accuracy", "3× throughput"],
    href: "/solutions/intelligent-automation",
  },
  {
    title: "Predictive Intelligence",
    desc: "Surface demand signals, churn risk, and operational anomalies before they become problems — with forecasting models wired directly into your dashboards.",
    stats: ["25% forecast accuracy improvement", "40% faster decisions", "3× analyst productivity"],
    href: "/solutions/predictive-intelligence",
  },
  {
    title: "AI-Powered Marketing",
    desc: "Scale content production, score leads intelligently, and automate campaign logic — so your marketing team focuses on strategy, not repetitive execution.",
    stats: ["4× content velocity", "30% conversion improvement", "<3 wks to production"],
    href: "/solutions/ai-powered-marketing",
  },
  {
    title: "Enterprise AI Platform",
    desc: "Build the infrastructure layer that turns AI experiments into reliable, scalable systems your organisation owns — with full IP transfer and team enablement.",
    stats: ["8 wks POC-to-production", "99.9% model uptime", "100% IP ownership"],
    href: "/solutions/enterprise-ai-platform",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Solutions</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
            AI Built Around the Problem, Not the Technology
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Every solution we deliver is framed around a business outcome — whether that&apos;s cutting support costs,
            automating back-office work, forecasting demand, or scaling marketing. The technology is the means, not the
            end.
          </p>
        </FadeUp>
      </section>

      {/* Solutions */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">All Solutions</p>
          <h2 className="text-3xl font-bold text-white mb-10">Five Areas Where We Deliver Measurable Outcomes</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {solutions.map((s) => (
            <StaggerItem key={s.href}>
              <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.stats.map((stat) => (
                    <li key={stat} className="text-sm text-indigo-400 font-medium">{stat}</li>
                  ))}
                </ul>
                <Link href={s.href} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Explore solution →
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Why Ikarmic */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Why Ikarmic</p>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeLeft>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Delivery Partners, Not Tool Vendors</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                We don&apos;t hand you a SaaS subscription and walk away. Every engagement ends with your team owning the
                system — runbooks, transfer sessions, and architecture documentation included.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Our model is to build alongside your engineers and operators, transfer knowledge throughout delivery, and
                leave you with a system you understand and can evolve.
              </p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "4–8 wks", label: "Typical pilot duration" },
                { value: "5", label: "Core solution playbooks" },
                { value: "4", label: "Industries supported" },
                { value: "2 days", label: "Response SLA" },
              ].map((s) => (
                <div key={s.label} className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40">
                  <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                    <CountUp value={s.value} className="text-2xl font-bold text-indigo-400 mb-1 block" />
                    <p className="text-xs text-neutral-400">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeRight>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 to-neutral-900 border border-indigo-900/50 p-10 md:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-700/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not Sure Which Solution Fits?</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                Tell us the business problem you&apos;re trying to solve. We&apos;ll identify the right approach and scope a pilot together.
              </p>
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]">
                Start the Conversation
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
