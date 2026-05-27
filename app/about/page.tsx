import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "About",
  description: "Ikarmic AI is dedicated to helping organizations harness artificial intelligence to improve business performance and drive innovation.",
  keywords: ["about Ikarmic AI", "AI company", "AI consulting firm", "AI team", "machine learning company India"],
  alternates: { canonical: "https://ikarmic.com/about" },
  openGraph: {
    title: "About Ikarmic AI",
    description: "Ikarmic AI is dedicated to helping organizations harness artificial intelligence to improve business performance.",
    url: "https://ikarmic.com/about",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "About Ikarmic AI", description: "Helping organizations harness AI for real business outcomes.", images: ["/og-default.png"] },
};

const values = [
  {
    title: "Innovation",
    desc: "We continuously explore new AI technologies to solve complex business challenges.",
  },
  {
    title: "Integrity",
    desc: "We build transparent and trustworthy AI systems that our clients can rely on.",
  },
  {
    title: "Collaboration",
    desc: "We work closely with clients to create customized solutions that fit their needs.",
  },
  {
    title: "Customer Success",
    desc: "Our goal is to deliver measurable business results that drive growth.",
  },
];

const advantages = [
  { title: "Industry-focused AI solutions", desc: "Tailored approaches for your specific sector" },
  { title: "Scalable and secure AI systems", desc: "Built to grow with your business" },
  { title: "Faster implementation and deployment", desc: "Get to market quicker with our proven methods" },
  { title: "Experienced AI engineers and consultants", desc: "Deep expertise across the AI landscape" },
];

const outcomes = [
  {
    title: "Support Automation Rollout",
    label: "Reduced first-response time from hours to minutes",
    desc: "Built a multilingual conversational assistant integrated with CRM workflows for a services team.",
  },
  {
    title: "Demand Forecasting Upgrade",
    label: "Improved planning consistency for seasonal inventory",
    desc: "Shipped a forecasting pipeline with monitoring and model refresh checkpoints.",
  },
  {
    title: "Document Intelligence Workflow",
    label: "Cut manual review cycles across operations teams",
    desc: "Delivered extraction, validation, and exception routing for high-volume business documents.",
  },
];

const deliverySteps = [
  {
    num: "1",
    title: "Discovery",
    desc: "Clarify business goals, data readiness, and success metrics before implementation starts.",
  },
  {
    num: "2",
    title: "Design",
    desc: "Define architecture, governance, and pilot scope with measurable acceptance criteria.",
  },
  {
    num: "3",
    title: "Delivery",
    desc: "Build and validate models, integrations, and user-facing workflows in iterative milestones.",
  },
  {
    num: "4",
    title: "Operationalization",
    desc: "Enable monitoring, retraining plans, and team handoff so systems stay reliable over time.",
  },
];

const stats = [
  { value: "5", label: "Core Service Playbooks" },
  { value: "4", label: "Delivery Stages" },
  { value: "6", label: "Industries Supported" },
  { value: "2 days", label: "Response SLA" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20 ik-cosmic-grid" />
          <div className="absolute inset-0 ik-vignette" />
          <div className="absolute top-20 -left-20 h-[26rem] w-[26rem] rounded-full bg-indigo-600/15 blur-[90px] animate-float" />
          <div className="absolute bottom-0 -right-16 h-[20rem] w-[20rem] rounded-full bg-violet-600/10 blur-[90px] animate-float-delayed" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <FadeUp>
            <p className="ik-eyebrow mb-4">About Us</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-[1.04] tracking-tight">Who we are</h1>
            <p className="mt-6 text-xl text-neutral-400 max-w-2xl leading-relaxed">
              Ikarmic AI builds and deploys practical AI systems that reduce operating cost, accelerate decisions,
              and generate measurable returns — without the fluff.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <FadeLeft>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
              <p className="ik-eyebrow mb-3">Our Mission</p>
              <h2 className="text-2xl font-bold text-white mb-4">AI that works for your business, not against it</h2>
              <p className="text-neutral-400">We build AI systems that automate the repetitive, sharpen the analytical, and integrate with the tools your teams already use — delivering clear, trackable returns.</p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
              <p className="ik-eyebrow mb-3">Our Vision</p>
              <h2 className="text-2xl font-bold text-white mb-4">A trusted global partner for AI innovation</h2>
              <p className="text-neutral-400">To become a trusted global partner for businesses seeking innovative, scalable, and ethical AI solutions.</p>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.08}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <CountUp value={s.value} className="text-3xl font-bold text-indigo-400 mb-1 block" />
                  <p className="text-sm text-neutral-400">{s.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Our Values</p>
          <h2 className="text-3xl font-bold text-white mb-10">What drives us</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-400">{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Why Choose Us</p>
          <h2 className="text-3xl font-bold text-white mb-10">The Ikarmic advantage</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
          {advantages.map((a) => (
            <StaggerItem key={a.title}>
              <div className="flex gap-4 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{a.title}</h3>
                  <p className="text-sm text-neutral-400">{a.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Outcomes */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Proof Snapshots</p>
          <h2 className="text-3xl font-bold text-white mb-10">Outcomes we focus on</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {outcomes.map((o) => (
            <StaggerItem key={o.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <h3 className="font-semibold text-white mb-2">{o.title}</h3>
                <p className="text-sm font-medium text-indigo-400 mb-3">{o.label}</p>
                <p className="text-sm text-neutral-400">{o.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Delivery model */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="ik-eyebrow mb-4">Delivery Model</p>
          <h2 className="text-3xl font-bold text-white mb-10">How we work</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {deliverySteps.map((step) => (
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&rsquo;s build something real</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto leading-relaxed">Tell us about your AI initiative. We&rsquo;ll respond within two business days with a clear, honest assessment.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group ik-button-primary hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]">
                  Get in touch
                  <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services" className="ik-button-secondary">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
