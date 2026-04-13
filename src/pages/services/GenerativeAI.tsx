import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, BookOpen, PenTool, MessageCircle, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: PenTool,
    title: 'Content Generation',
    description: 'Marketing copy, product descriptions, and social posts generated at 4× velocity with brand-consistent tone.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Assistants',
    description: 'Internal RAG-powered assistants that answer questions from company docs, policies, and wikis.',
  },
  {
    icon: MessageCircle,
    title: 'Marketing Automation',
    description: 'Personalized email sequences, ad copy variants, and campaign briefs produced on demand.',
  },
  {
    icon: Sparkles,
    title: 'Code & Data Assistants',
    description: 'Developer copilots and data query tools that accelerate engineering teams by 30%+.',
  },
];

const integrations = [
  'CMS Platforms (WordPress, Contentful)',
  'Internal Wikis (Confluence, Notion)',
  'Slack & Microsoft Teams',
  'Marketing Platforms (HubSpot, Mailchimp)',
  'Vector Databases (Pinecone, Weaviate)',
  'LLM Providers (OpenAI, Anthropic, Open-source)',
];

const outcomes = [
  { metric: '4×', label: 'Content velocity' },
  { metric: '60%', label: 'Reduction in knowledge search time' },
  { metric: '30%', label: 'Engineering productivity boost' },
  { metric: '<3 wks', label: 'From pilot to production' },
];

const GenerativeAI = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      document.querySelectorAll('.fade-up').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative pt-20">
      <div className="ambient-orb" />

      {/* Hero */}
      <section ref={heroRef} className="relative py-20 lg:py-32" style={{ opacity: 0 }}>
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-6">GENERATIVE AI SOLUTIONS</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Generate, Reason, Automate
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            Harness large language models with retrieval pipelines, guardrails, and fine-tuning
            to unlock content creation, knowledge access, and process acceleration.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Gen AI Project
          </Link>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="micro-label block mb-4">THE CHALLENGE</span>
              <h2 className="text-3xl font-semibold text-white mb-4">Content Bottlenecks & Knowledge Silos</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Teams spend hours drafting copy, searching internal docs, and re-answering the same
                questions. Institutional knowledge lives in scattered files only a few people know how
                to navigate.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">AI That Creates and Retrieves</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                RAG pipelines paired with fine-tuned models unlock instant answers over proprietary data,
                while generative content engines produce on-brand assets at scale — all behind responsible
                guardrails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">How We Ship Gen AI Safely</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'RAG Pipeline Design', detail: 'We index your proprietary data into vector stores and build retrieval chains that surface accurate, grounded answers.' },
              { step: '02', title: 'Model Selection & Tuning', detail: 'Right-size the model for your task — from open-source 7B models to GPT-4o — with prompt engineering and optional fine-tuning.' },
              { step: '03', title: 'Guardrails & Evaluation', detail: 'Content filters, hallucination detection, and automated eval suites ensure quality and compliance before going live.' },
            ].map((s) => (
              <article key={s.step} className="glass-card rounded-2xl p-6">
                <span className="text-indigo-400 font-mono text-sm">{s.step}</span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-3">{s.title}</h3>
                <p className="text-[#A7B1D8] text-sm leading-relaxed">{s.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">USE CASES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">Where Gen AI Delivers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="glass-card rounded-2xl p-6 flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{uc.title}</h3>
                    <p className="text-[#A7B1D8] text-sm leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Points */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">INTEGRATIONS</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">Connects With Your Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((name) => (
              <div key={name} className="flex items-center gap-3 px-5 py-4 glass-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-white text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">OUTCOMES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">Measurable Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o) => (
              <div key={o.label} className="glass-card rounded-2xl p-6">
                <p className="text-3xl lg:text-4xl font-semibold text-indigo-400 mb-2">{o.metric}</p>
                <p className="text-[#A7B1D8] text-sm">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready to Build With Gen AI?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Describe your content, search, or automation challenge. We'll scope a Gen AI pilot
            you can validate in weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default GenerativeAI;
