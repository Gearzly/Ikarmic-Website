import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

interface Step {
  num: string;
  title: string;
  desc: string;
}
interface Feature {
  title: string;
  desc: string;
}
interface UseCase {
  title: string;
  desc: string;
}
interface Outcome {
  value: string;
  label: string;
}
interface RelatedService {
  label: string;
  href: string;
}

interface ProductPageProps {
  tag: string;
  headline: string;
  intro: string;
  productUrl: string;
  productUrlLabel: string;
  painPointTitle: string;
  painPointDesc: string;
  opportunityTitle: string;
  opportunityDesc: string;
  featuresTitle: string;
  features: Feature[];
  useCasesTitle: string;
  useCasesSubtitle: string;
  useCases: UseCase[];
  outcomesTitle: string;
  outcomes: Outcome[];
  relatedServices: RelatedService[];
  ctaBoxTitle: string;
  ctaBoxDesc: string;
}

export default function ProductPageTemplate({
  tag,
  headline,
  intro,
  productUrl,
  productUrlLabel,
  painPointTitle,
  painPointDesc,
  opportunityTitle,
  opportunityDesc,
  featuresTitle,
  features,
  useCasesTitle,
  useCasesSubtitle,
  useCases,
  outcomesTitle,
  outcomes,
  relatedServices,
  ctaBoxTitle,
  ctaBoxDesc,
}: ProductPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">{tag}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight">{headline}</h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">{intro}</p>
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors gap-2"
          >
            {productUrlLabel}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </FadeUp>
      </section>

      {/* Pain Point & Opportunity */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Why We Built This</p>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeLeft>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">The Pain Point</p>
              <h2 className="text-xl font-bold text-white mb-4">{painPointTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{painPointDesc}</p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-indigo-900/40 h-full">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">The Solution</p>
              <h2 className="text-xl font-bold text-white mb-4">{opportunityTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{opportunityDesc}</p>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Key Features</p>
          <h2 className="text-3xl font-bold text-white mb-10">{featuresTitle}</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-400">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">{useCasesTitle}</p>
          <h2 className="text-3xl font-bold text-white mb-10">{useCasesSubtitle}</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {useCases.map((uc) => (
            <StaggerItem key={uc.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <h3 className="font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-neutral-400">{uc.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Outcomes */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Outcomes</p>
          <h2 className="text-3xl font-bold text-white mb-10">{outcomesTitle}</h2>
        </FadeUp>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.08}>
          {outcomes.map((o) => (
            <StaggerItem key={o.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <CountUp value={o.value} className="text-3xl font-bold text-indigo-400 mb-2 block" />
                  <p className="text-sm text-neutral-400">{o.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Related Services */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Related Services</p>
          <h2 className="text-3xl font-bold text-white mb-8">The Technology Behind This Product</h2>
          <div className="flex flex-wrap gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-700 text-sm text-neutral-300 hover:text-white transition-all"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 to-neutral-900 border border-indigo-900/50 p-10 md:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-700/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ctaBoxTitle}</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">{ctaBoxDesc}</p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
