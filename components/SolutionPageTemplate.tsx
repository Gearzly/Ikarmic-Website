import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

interface UseCase {
  title: string;
  desc: string;
}
interface Outcome {
  value: string;
  label: string;
}
interface Step {
  num: string;
  title: string;
  desc: string;
}
interface RelatedService {
  label: string;
  href: string;
}

interface SolutionPageProps {
  tag: string;
  headline: string;
  intro: string;
  challengeTitle: string;
  challengeDesc: string;
  opportunityTitle: string;
  opportunityDesc: string;
  approachTitle: string;
  steps: Step[];
  useCases: UseCase[];
  outcomes: Outcome[];
  relatedServices: RelatedService[];
  ctaBoxTitle: string;
  ctaBoxDesc: string;
}

export default function SolutionPageTemplate({
  tag,
  headline,
  intro,
  challengeTitle,
  challengeDesc,
  opportunityTitle,
  opportunityDesc,
  approachTitle,
  steps,
  useCases,
  outcomes,
  relatedServices,
  ctaBoxTitle,
  ctaBoxDesc,
}: SolutionPageProps) {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">{tag}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight">{headline}</h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">{intro}</p>
        </FadeUp>
      </section>

      {/* Challenge & Opportunity */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <FadeLeft>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">The Challenge</p>
              <h2 className="text-xl font-bold text-white mb-4">{challengeTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{challengeDesc}</p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-indigo-900/40 h-full">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">The Opportunity</p>
              <h2 className="text-xl font-bold text-white mb-4">{opportunityTitle}</h2>
              <p className="text-neutral-400 leading-relaxed">{opportunityDesc}</p>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Our Approach</p>
          <h2 className="text-3xl font-bold text-white mb-10">{approachTitle}</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <span className="text-4xl font-bold text-indigo-900 mb-4 block">{step.num}</span>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-400">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Use Cases */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Use Cases</p>
          <h2 className="text-3xl font-bold text-white mb-10">Where We Deliver</h2>
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
          <h2 className="text-3xl font-bold text-white mb-10">Measurable Impact</h2>
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
          <h2 className="text-3xl font-bold text-white mb-8">The Technology Behind This Solution</h2>
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
