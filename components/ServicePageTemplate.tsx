import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

interface Step {
  num: string;
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

interface ServicePageProps {
  tag: string;
  headline: string;
  intro: string;
  ctaHref: string;
  ctaLabel: string;
  challengeTitle: string;
  challengeDesc: string;
  opportunityTitle: string;
  opportunityDesc: string;
  approachTitle: string;
  steps: Step[];
  useCases: UseCase[];
  integrations: string[];
  outcomes: Outcome[];
  ctaBoxTitle: string;
  ctaBoxDesc: string;
}

export default function ServicePageTemplate({
  tag,
  headline,
  intro,
  ctaHref,
  ctaLabel,
  challengeTitle,
  challengeDesc,
  opportunityTitle,
  opportunityDesc,
  approachTitle,
  steps,
  useCases,
  integrations,
  outcomes,
  ctaBoxTitle,
  ctaBoxDesc,
}: ServicePageProps) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-950">
        {/* CSS-only background motifs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20 ik-cosmic-grid" />
          <div className="absolute inset-0 ik-vignette" />
          <div className="absolute top-20 -left-20 h-[28rem] w-[28rem] rounded-full bg-indigo-600/15 blur-[90px] animate-float" />
          <div className="absolute bottom-0 -right-16 h-[22rem] w-[22rem] rounded-full bg-violet-600/10 blur-[90px] animate-float-delayed" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <FadeUp>
            <p className="ik-eyebrow mb-4">{tag}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-[1.04] tracking-tight">{headline}</h1>
            <p className="mt-6 text-xl text-neutral-400 max-w-2xl leading-relaxed">{intro}</p>
            <Link
              href={ctaHref}
              className="group ik-button-primary mt-8 inline-flex"
            >
              {ctaLabel}
              <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Challenge & Opportunity */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FadeLeft>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
              <p className="ik-eyebrow mb-3">The Challenge</p>
              <h2 className="text-xl font-bold text-white mb-4">{challengeTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{challengeDesc}</p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-indigo-900/40 h-full">
              <p className="ik-eyebrow mb-3">The Opportunity</p>
              <h2 className="text-xl font-bold text-white mb-4">{opportunityTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{opportunityDesc}</p>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Our Approach</p>
          <h2 className="text-3xl font-bold text-white mb-10">{approachTitle}</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full group">
                <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center mb-5 group-hover:border-indigo-600/60 transition-colors">
                  <span className="text-xs font-bold font-mono text-indigo-400">{step.num}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Use Cases</p>
          <h2 className="text-3xl font-bold text-white mb-10">Where it delivers</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {useCases.map((uc) => (
            <StaggerItem key={uc.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full group">
                <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center mb-4 group-hover:border-indigo-600/60 transition-colors">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{uc.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Integrations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Integrations</p>
          <h2 className="text-3xl font-bold text-white mb-8">Connects with your stack</h2>
          <div className="flex flex-wrap gap-3">
            {integrations.map((int) => (
              <span
                key={int}
                className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm text-neutral-300 hover:border-indigo-800/50 hover:text-white transition-colors"
              >
                {int}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Outcomes */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Outcomes</p>
          <h2 className="text-3xl font-bold text-white mb-10">Measurable impact</h2>
        </FadeUp>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.08}>
          {outcomes.map((o) => (
            <StaggerItem key={o.label}>
              <div className="ik-gradient-border">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <CountUp value={o.value} className="text-3xl font-bold text-indigo-400 mb-2 block" />
                  <p className="text-sm text-neutral-400">{o.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-indigo-900/50 bg-gradient-to-br from-indigo-950 via-neutral-900 to-neutral-950 text-center px-10 md:px-20 py-20">
            {/* Background blobs */}
            <div className="absolute top-[-30%] right-[-8%] w-[40%] h-[130%] rounded-full bg-indigo-700/10 blur-[90px] pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-8%] w-[35%] h-[110%] rounded-full bg-violet-700/10 blur-[80px] pointer-events-none" />
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none ik-cosmic-grid [background-size:28px_28px]" />
            <div className="relative z-10">
              <p className="ik-pill inline-flex mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Free 30-min session, no commitment
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{ctaBoxTitle}</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto leading-relaxed">{ctaBoxDesc}</p>
              <Link
                href="/contact"
                className="group ik-button-primary hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]"
              >
                Book a Free Scoping Call
                <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
