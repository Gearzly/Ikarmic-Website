import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, Stagger, StaggerItem } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, articles, and thinking on AI strategy, governance, and implementation from the Ikarmic team.",
  keywords: ["AI resources", "AI guides", "AI whitepapers", "machine learning guides", "AI implementation", "AI strategy resources"],
  alternates: { canonical: "https://ikarmic.com/resources" },
  openGraph: {
    title: "Resources | Ikarmic AI",
    description: "Guides, articles, and thinking on AI strategy, governance, and implementation.",
    url: "https://ikarmic.com/resources",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Resources | Ikarmic AI", description: "AI guides, articles, and implementation thinking.", images: ["/og-default.png"] },
};

const resources = [
  {
    type: "Blog Post",
    title: "Why Adaptive AI Systems Outperform Static Models",
    desc: "Static models trained once and deployed forever are quietly failing. Here's why — and how adaptive systems win.",
    href: "/blog/why-adaptive-ai-systems-outperform-static-models",
    tag: "STRATEGY",
  },
  {
    type: "Blog Post",
    title: "Ethical by Design: AI Governance Is Not a Checklist",
    desc: "Real AI governance is operational — continuous, embedded in the build cycle, and accountable to stakeholders.",
    href: "/blog/ethical-by-design-ai-governance-not-a-checklist",
    tag: "GOVERNANCE",
  },
  {
    type: "Blog Post",
    title: "Invisible AI: Human-Centred Design for Machine Learning",
    desc: "The best AI features are the ones users don't think of as AI at all. Here's how to design them.",
    href: "/blog/invisible-ai-human-centered-design-machine-learning",
    tag: "PRODUCT",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Resources</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
            Thinking on AI That&apos;s Actually Useful
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-xl leading-relaxed">
            No fluff. Just practical thinking on AI strategy, governance, and implementation — from a team that builds
            the systems it writes about.
          </p>
        </FadeUp>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {resources.map((r) => (
            <StaggerItem key={r.href}>
              <Link href={r.href} className="group block h-full">
                <div className="h-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-indigo-700 transition-colors flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">{r.tag}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">{r.type}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors flex-1">
                    {r.title}
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">{r.desc}</p>
                  <span className="text-sm text-indigo-400 font-medium">Read →</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp delay={0.3}>
          <div className="mt-12 p-8 rounded-2xl bg-indigo-950/30 border border-indigo-900/30 text-center">
            <h2 className="text-xl font-bold text-white mb-3">Want the team&apos;s thinking in your inbox?</h2>
            <p className="text-sm text-neutral-400 mb-6">
              New articles on AI strategy, implementation, and governance — no spam.
            </p>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]">
              Get in Touch
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
