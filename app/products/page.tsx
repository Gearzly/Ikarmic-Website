import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Ikarmic's AI-powered products — platforms and tools we've built to solve real problems for real businesses.",
  keywords: ["Ikarmic products", "AI products", "SocialDukaan", "AI commerce", "WhatsApp automation", "Ikarmic AI platforms"],
  alternates: { canonical: "https://ikarmic.com/products" },
  openGraph: {
    title: "Products | Ikarmic AI",
    description: "AI-powered products built by Ikarmic — solving real problems for real businesses.",
    url: "https://ikarmic.com/products",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Products | Ikarmic AI", description: "AI-powered products built by Ikarmic.", images: ["/og-default.png"] },
};

const products = [
  {
    title: "SocialDukaan",
    desc: "AI commerce platform for WhatsApp and Instagram sellers. Automates orders, payments, and customer relationships — built for Indian small businesses.",
    stats: ["8,400+ sellers", "WhatsApp + Instagram", "UPI payments built-in"],
    href: "/products/socialdukaan",
    url: "https://socialdukaan.online/",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Products</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
            AI Products We&apos;ve Built
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Beyond consulting and custom solutions, Ikarmic builds and ships its own AI-powered products. Each one is born
            from a real problem we encountered in the market — designed, developed, and operated by our team.
          </p>
        </FadeUp>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Our Products</p>
          <h2 className="text-3xl font-bold text-white mb-10">Platforms We Own and Operate</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {products.map((p) => (
            <StaggerItem key={p.href}>
              <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                <ul className="space-y-2 mb-6">
                  {p.stats.map((stat) => (
                    <li key={stat} className="text-sm text-indigo-400 font-medium">{stat}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-neutral-800">
                  <Link href={p.href} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Learn more →
                  </Link>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1"
                  >
                    Visit site
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Why We Build Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Our Philosophy</p>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeLeft>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">We Build Products to Learn What Our Clients Need</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Every Ikarmic product starts with a market gap we&apos;ve observed through our consulting work. By building
                and operating our own platforms, we gain firsthand experience with the full product lifecycle — from
                architecture to monitoring to user support.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                This operational experience directly informs how we build for our clients. When you hire Ikarmic, you get
                a team that has shipped real products, not just proof-of-concepts.
              </p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "Products", label: "In active operation" },
                { value: "8,400+", label: "Users across platforms" },
                { value: "99.9%", label: "Platform uptime SLA" },
                { value: "India", label: "Server infrastructure" },
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Have a Product Idea?</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                We partner with founders and enterprises to build AI-first products from scratch. Tell us what you&apos;re thinking — we&apos;ll help you scope, design, and ship.
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
