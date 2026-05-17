import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, FadeLeft, Stagger, StaggerItem } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Services",
  description: "Five core AI service areas built for measurable outcomes — chatbots, automation, analytics, generative AI, and custom AI development.",
  keywords: ["AI services", "AI chatbot development", "business automation services", "data analytics AI", "generative AI services", "custom AI development", "AI consulting services"],
  alternates: { canonical: "https://ikarmic.com/services" },
  openGraph: {
    title: "AI Services | Ikarmic AI",
    description: "Five core AI service areas built for measurable outcomes.",
    url: "https://ikarmic.com/services",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AI Services | Ikarmic AI", description: "Chatbots, automation, analytics, generative AI, and custom development.", images: ["/og-default.png"] },
};

const services = [
  {
    num: "01",
    title: "AI Chatbots & Conversational AI",
    desc: "Deploy intelligent chatbots that handle customer interactions across websites, WhatsApp, and messaging platforms. Our conversational AI systems provide instant responses, improve customer support, and reduce operational costs.",
    features: ["Website chatbots", "WhatsApp chatbots", "Multilingual chatbots", "AI customer service agents", "Voice assistants"],
    benefits: ["24/7 customer support", "Faster response times", "Reduced support costs"],
    href: "/services/ai-chatbots",
  },
  {
    num: "02",
    title: "AI Business Automation",
    desc: "Automate business processes and eliminate repetitive tasks using AI-driven automation. From document processing to operational workflows, we help businesses streamline processes and increase efficiency.",
    features: ["Workflow automation", "Document processing automation", "Email and communication automation", "Operations management automation"],
    benefits: ["Improved efficiency", "Reduced operational costs", "Faster business processes"],
    href: "/services/business-automation",
  },
  {
    num: "03",
    title: "AI Data Analytics & Predictive Intelligence",
    desc: "Use advanced AI models to turn data into strategic insights. Our AI models analyze trends, forecast outcomes, and help companies make data-driven decisions.",
    features: ["Sales forecasting", "Customer behavior analysis", "Risk and fraud detection", "Demand forecasting"],
    benefits: ["Better decision-making", "Data-driven business strategy", "Improved operational performance"],
    href: "/services/data-analytics",
  },
  {
    num: "04",
    title: "Generative AI Solutions",
    desc: "Unlock creativity and productivity with generative AI technologies. Leverage generative AI to automate content creation, marketing, product descriptions, and knowledge management systems.",
    features: ["AI content generation", "AI marketing automation", "AI knowledge assistants", "AI-powered business tools"],
    benefits: ["Faster content production", "Improved marketing efficiency", "Automated knowledge systems"],
    href: "/services/generative-ai",
  },
  {
    num: "05",
    title: "Custom AI Development",
    desc: "Every business is unique. Our custom AI development services deliver tailored solutions designed to meet specific business needs across multiple industries.",
    features: ["AI-powered software platforms", "Intelligent enterprise applications", "AI SaaS products", "Custom machine learning models"],
    benefits: ["Tailored to your needs", "Scalable architecture", "Full ownership and control"],
    href: "/services/custom-ai",
  },
];

const process = [
  { title: "Discovery and Scope", desc: "Align on goals, define success metrics, map data sources, and prioritize high-impact use cases." },
  { title: "Pilot Build", desc: "Ship a focused pilot with measurable outcomes, user feedback loops, and baseline monitoring." },
  { title: "Production Rollout", desc: "Integrate with business systems, harden reliability, and set governance and observability standards." },
  { title: "Optimization", desc: "Improve model quality with retraining plans, prompt tuning, and operational KPI reviews." },
];

const engagements = [
  { title: "Advisory Sprint", duration: "2–4 weeks", desc: "Ideal for feasibility analysis, architecture planning, and implementation roadmap creation." },
  { title: "Pilot Implementation", duration: "4–8 weeks", desc: "Best for launching one focused AI workflow with clear business impact targets." },
  { title: "Scale Program", duration: "Quarterly engagement", desc: "Designed for teams operationalizing multiple AI capabilities across departments." },
];

const faqs = [
  { q: "How quickly can we launch an AI pilot?", a: "Most pilots are delivered in 4–8 weeks depending on data availability and integration complexity." },
  { q: "Do you support existing product and engineering teams?", a: "Yes. We work as a delivery partner and co-build with internal teams for long-term ownership." },
  { q: "Which industries do you work with?", a: "We frequently support retail, healthcare, finance, manufacturing, education, and SaaS teams." },
  { q: "How do you handle AI governance and risk?", a: "We include privacy checks, evaluation criteria, and deployment guardrails from the first phase." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight">Core AI Services</h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            We specialize in building intelligent systems that automate workflows, improve decision-making, and enhance
            customer experiences.
          </p>
        </FadeUp>
      </section>

      {/* Services list */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <Stagger className="space-y-8" staggerDelay={0.1}>
          {services.map((s) => (
            <StaggerItem key={s.href}>
              <div className="grid md:grid-cols-2 gap-10 p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors">
                <div>
                  <span className="text-4xl font-bold text-neutral-700">{s.num}</span>
                  <h2 className="mt-3 text-2xl font-bold text-white mb-4">{s.title}</h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Learn more →
                  </Link>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Benefits</p>
                  <div className="space-y-3">
                    {s.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-800/50">
                        <span className="text-indigo-400">✓</span>
                        <span className="text-sm text-neutral-300">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Implementation Process</p>
          <h2 className="text-3xl font-bold text-white mb-10">From Idea to Reliable Production</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {process.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <span className="text-3xl font-bold text-indigo-900 mb-4 block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-400">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Engagement options */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Engagement Options</p>
          <h2 className="text-3xl font-bold text-white mb-10">Delivery Models and Timelines</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {engagements.map((e) => (
            <StaggerItem key={e.title}>
              <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full">
                <p className="text-sm font-medium text-indigo-400 mb-2">{e.duration}</p>
                <h3 className="text-xl font-bold text-white mb-3">{e.title}</h3>
                <p className="text-sm text-neutral-400">{e.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl font-bold text-white mb-10">Common Service Questions</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-2 gap-6" staggerDelay={0.08}>
          {faqs.map((faq) => (
            <StaggerItem key={faq.q}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
                <h3 className="font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-sm text-neutral-400">{faq.a}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 to-neutral-900 border border-indigo-900/50 p-10 md:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-700/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transform Your Business with AI</h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                Artificial intelligence is transforming the way businesses operate. Let&apos;s build something that delivers real outcomes.
              </p>
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
