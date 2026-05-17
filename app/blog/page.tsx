import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, Stagger, StaggerItem } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thinking on AI strategy, governance, and human-centred design from the Ikarmic team.",
  keywords: ["AI blog", "artificial intelligence articles", "AI strategy", "machine learning insights", "AI governance", "AI trends"],
  alternates: { canonical: "https://ikarmic.com/blog" },
  openGraph: {
    title: "Blog | Ikarmic AI",
    description: "Thinking on AI strategy, governance, and human-centred design.",
    url: "https://ikarmic.com/blog",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Blog | Ikarmic AI", description: "AI strategy, governance, and human-centred design.", images: ["/og-default.png"] },
};

const posts = [
  {
    slug: "why-adaptive-ai-systems-outperform-static-models",
    tag: "STRATEGY",
    readTime: "7 min read",
    date: "Apr 19, 2026",
    title: "Why Adaptive AI Systems Outperform Static Models",
    excerpt:
      "Static models trained once and deployed forever are quietly failing. Data drift, concept shift, and changing user behaviour erode accuracy — often without anyone noticing until the damage is done.",
  },
  {
    slug: "ethical-by-design-ai-governance-not-a-checklist",
    tag: "GOVERNANCE",
    readTime: "5 min read",
    date: "Apr 12, 2026",
    title: "Ethical by Design: AI Governance Is Not a Checklist",
    excerpt:
      "A bias audit done once at deployment is not governance. Real AI governance is operational — continuous, embedded in the build cycle, and accountable to stakeholders beyond the engineering team.",
  },
  {
    slug: "invisible-ai-human-centered-design-machine-learning",
    tag: "PRODUCT",
    readTime: "6 min read",
    date: "Apr 5, 2026",
    title: "Invisible AI: Human-Centred Design for Machine Learning",
    excerpt:
      "The best AI features are the ones users don't think of as AI at all. They just feel like a product that works — fast, relevant, and surprisingly accurate.",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Blog</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
            Thinking Aloud on AI
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-xl leading-relaxed">
            Perspectives on AI strategy, governance, and product design from the Ikarmic team.
          </p>
        </FadeUp>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-indigo-700 transition-colors flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">{post.tag}</span>
                    <span className="text-xs text-neutral-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">{post.date}</span>
                    <span className="text-sm text-indigo-400 font-medium">Read →</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
