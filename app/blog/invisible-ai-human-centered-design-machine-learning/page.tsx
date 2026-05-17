import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "next-seo";

export const metadata: Metadata = {
  title: "Invisible AI: Human-Centred Design for Machine Learning",
  description:
    "The best AI features are the ones users don't think of as AI at all. They just feel like a product that works.",
  keywords: ["invisible AI", "human-centered design AI", "machine learning UX", "AI product design", "calm technology", "user-centered AI"],
  alternates: { canonical: "https://ikarmic.com/blog/invisible-ai-human-centered-design-machine-learning" },
  openGraph: {
    type: "article",
    title: "Invisible AI: Human-Centred Design for Machine Learning",
    description: "The best AI features are the ones users don't think of as AI at all.",
    url: "https://ikarmic.com/blog/invisible-ai-human-centered-design-machine-learning",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    publishedTime: "2026-04-05T00:00:00+05:30",
    authors: ["Ikarmic AI"],
  },
  twitter: { card: "summary_large_image", title: "Invisible AI | Ikarmic AI", description: "The best AI features are the ones users don't think of as AI at all.", images: ["/og-default.png"] },
};

export default function InvisibleAiPost() {
  return (
    <>
      <ArticleJsonLd
        type="BlogPosting"
        url="https://ikarmic.com/blog/invisible-ai-human-centered-design-machine-learning"
        headline="Invisible AI: Human-Centred Design for Machine Learning"
        image="/og-default.png"
        datePublished="2026-04-05T00:00:00+05:30"
        author="Ikarmic AI"
        description="The best AI features are the ones users don't think of as AI at all. They just feel like a product that works — fast, relevant, and surprisingly accurate."
      />
      <article className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Back to Blog
        </Link>

      <div className="mt-8 mb-6 flex items-center gap-3">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">PRODUCT</span>
        <span className="text-xs text-neutral-500">6 min read</span>
        <span className="text-xs text-neutral-500">Apr 5, 2026</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
        Invisible AI: Human-Centred Design for Machine Learning
      </h1>

      <p className="text-neutral-400 text-lg leading-relaxed mb-8">
        The best AI features are the ones users don't think of as AI at all. They just feel like a product that works
        — fast, relevant, and surprisingly accurate.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Visibility Isn't Always a Feature</h2>
      <p className="text-neutral-400 leading-relaxed mb-4">
        The AI industry has a bad habit of surfacing AI-ness as a feature in itself. "Powered by AI" appears as a
        badge on interfaces that would be more useful without it. This confuses the means with the end. Users don't
        care about the model — they care about getting the right answer, completing the task faster, or avoiding a
        frustrating experience.
      </p>
      <p className="text-neutral-400 leading-relaxed mb-8">
        Invisible AI earns user trust by being right more often than it's wrong, acknowledging uncertainty gracefully
        when it is wrong, and never making users feel manipulated or surveilled. The technology recedes into the
        background so the experience can come forward.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-4">Three Pillars of Human-Centred ML</h2>

      <h3 className="text-xl font-semibold text-indigo-300 mt-8 mb-3">1. Context Over Capability</h3>
      <p className="text-neutral-400 leading-relaxed mb-6">
        Human-centred ML asks: what decision is the user making right now, and how can the model support that
        decision? Not: what is the most impressive thing this model could output? A recommendation that reduces
        decision fatigue is more valuable than a recommendation that maximises novelty. A summary that gets to the
        point is more valuable than one that showcases language fluency.
      </p>

      <h3 className="text-xl font-semibold text-indigo-300 mt-8 mb-3">2. Graceful Uncertainty</h3>
      <p className="text-neutral-400 leading-relaxed mb-6">
        Every ML model has a confidence distribution. Human-centred design makes that distribution legible to users
        in a way that supports good decisions. This doesn't mean displaying confidence intervals on every prediction
        — it means designing different response patterns for high-confidence and low-confidence states. A high-
        confidence recommendation is surfaced prominently. A low-confidence one is framed as a suggestion rather than
        a fact.
      </p>

      <h3 className="text-xl font-semibold text-indigo-300 mt-8 mb-3">3. User Agency Over Model Authority</h3>
      <p className="text-neutral-400 leading-relaxed mb-6">
        Systems that override user judgment — that hide manual controls, that surface only the model's answer without
        an opt-out — generate backlash. Human-centred design gives users the ability to override the model, correct
        its outputs, and provide feedback. This isn't just good ethics — it's how you collect the labelled data that
        improves the model.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-4">Operator-First Design</h2>
      <p className="text-neutral-400 leading-relaxed mb-4">
        In B2B AI systems, the end user is often not the buyer. An automation tool built for a logistics operator
        needs to be understood by both the operations manager who configured it and the warehouse operative who
        receives its instructions. Human-centred design for ML means thinking about every person who interacts with
        the system's outputs — not just the person who can see the interface.
      </p>
      <p className="text-neutral-400 leading-relaxed mb-8">
        This often means building operator-facing dashboards that expose model behaviour in plain language, not as
        technical metrics. "The model is less certain about recommendations for this product category" is more
        actionable than "prediction confidence: 0.61".
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-4">Feedback as a Feature, Not an Afterthought</h2>
      <p className="text-neutral-400 leading-relaxed mb-4">
        Human-centred ML systems treat user feedback as a product feature — designed, instrumented, and iterated on
        like any other. Thumbs up / thumbs down is the minimum viable feedback mechanism. More valuable is structured
        correction: the ability to tell the system not just that it was wrong, but how it was wrong and what the right
        answer would have been.
      </p>
      <p className="text-neutral-400 leading-relaxed mb-8">
        This feedback, if designed well, becomes training data. The loop closes: user interaction improves the model,
        improved model generates better interactions, better interactions generate more feedback. The product gets
        better by being used.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-4">Measuring What Matters</h2>
      <p className="text-neutral-400 leading-relaxed mb-8">
        The measure of a human-centred AI product isn't model accuracy — it's user behaviour change. Does the
        recommendation engine increase the share of sessions where users find what they're looking for faster? Does
        the support AI reduce the number of contacts per issue? Does the forecasting tool change the quality of
        decisions made by planners? These are the metrics that tell you whether the AI is actually working for people,
        rather than just performing well in evaluation.
      </p>

      <div className="mt-12 p-8 rounded-2xl bg-indigo-950/30 border border-indigo-900/30">
        <h3 className="text-xl font-bold text-white mb-3">Build AI That Works for People</h3>
        <p className="text-neutral-400 mb-4">
          We design AI systems around the decisions users need to make — not around what the technology can do in a
          demo.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
        >
          Start a Conversation
        </Link>
      </div>
    </article>
    </>
  );
}
