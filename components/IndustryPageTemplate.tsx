import Image from "next/image";
import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

interface ServiceCard {
  title: string;
  desc: string;
  href: string;
}

interface UseCase {
  title: string;
  desc: string;
}

interface Outcome {
  value: string;
  label: string;
}

interface Challenge {
  text: string;
}

interface IndustryPageProps {
  tag: string;
  headline: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  challengeTitle: string;
  challenges: Challenge[];
  servicesTitle: string;
  services: ServiceCard[];
  useCasesTitle: string;
  useCases: UseCase[];
  outcomesTitle: string;
  outcomes: Outcome[];
  ctaTitle: string;
  ctaDesc: string;
  breadcrumb: { name: string; item: string };
}

export default function IndustryPageTemplate({
  tag,
  headline,
  intro,
  heroImage,
  heroImageAlt,
  challengeTitle,
  challenges,
  servicesTitle,
  services,
  useCasesTitle,
  useCases,
  outcomesTitle,
  outcomes,
  ctaTitle,
  ctaDesc,
  breadcrumb,
}: IndustryPageProps) {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative h-[50vh] md:h-[72vh] min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
          unoptimized
          sizes="100vw"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-950/70 border border-indigo-800/40 uppercase tracking-widest mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              {tag}
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-3xl">
              {headline}
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-5 text-lg text-neutral-300 max-w-xl leading-relaxed">{intro}</p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.45)]"
            >
              Talk to Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Key Challenges ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeLeft>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">Key Challenges</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{challengeTitle}</h2>
            <p className="text-neutral-400 text-sm">
              Before we build anything, we map the real friction — operational, technical, and organisational.
            </p>
          </FadeLeft>
          <Stagger className="space-y-3">
            {challenges.map((c, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-red-900/50 transition-colors group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-950/60 border border-red-900/40 flex items-center justify-center text-red-400 font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-neutral-300 text-sm leading-relaxed pt-1">{c.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Services Mapped ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">How We Help</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 leading-tight">{servicesTitle}</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {services.map((s) => (
            <StaggerItem key={s.href}>
              <Link href={s.href} className="group block h-full">
                <div className="h-full p-7 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-indigo-700/60 transition-all group-hover:bg-indigo-950/20 relative overflow-hidden">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors rounded-2xl" />
                  <div className="relative z-10">
                    <h3 className="font-bold text-white mb-3 text-lg group-hover:text-indigo-300 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-5">{s.desc}</p>
                    <span className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                      Learn more
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

      {/* ── Use Cases ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="p-10 md:p-14">
            <FadeUp>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Use Cases</p>
              <h2 className="text-3xl font-bold text-white mb-10">{useCasesTitle}</h2>
            </FadeUp>
            <Stagger className="space-y-4">
              {useCases.map((uc, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-5 p-5 rounded-2xl bg-neutral-800/50 hover:bg-indigo-950/30 border border-neutral-700/50 hover:border-indigo-800/50 transition-all group">
                    <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                        {uc.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{uc.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Outcomes ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Outcomes</p>
          <h2 className="text-3xl font-bold text-white mb-10">{outcomesTitle}</h2>
        </FadeUp>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5" staggerDelay={0.08}>
          {outcomes.map((o) => (
            <StaggerItem key={o.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <CountUp value={o.value} className="block text-4xl font-bold text-indigo-400 mb-2" />
                  <p className="text-xs text-neutral-400 leading-relaxed">{o.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-neutral-900 to-neutral-950 border border-indigo-900/50 px-10 md:px-20 py-16 text-center">
            {/* Background blobs */}
            <div className="absolute top-[-30%] right-[-10%] w-[40%] h-[120%] rounded-full bg-indigo-700/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-30%] left-[-10%] w-[35%] h-[100%] rounded-full bg-violet-700/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{ctaTitle}</h2>
              <p className="text-neutral-400 text-lg mb-10 max-w-xl mx-auto">{ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/industries"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all"
                >
                  ← All Industries
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
