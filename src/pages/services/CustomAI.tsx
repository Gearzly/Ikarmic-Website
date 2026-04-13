import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Cpu, Rocket, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: Layers,
    title: 'AI SaaS Products',
    description: 'End-to-end AI product builds — from model design to API layer to front-end — for startups and scale-ups.',
  },
  {
    icon: Cpu,
    title: 'Recommendation Engines',
    description: 'Personalization models that drive engagement, upsell, and retention across digital experiences.',
  },
  {
    icon: Code2,
    title: 'Intelligent Applications',
    description: 'Custom AI features embedded into existing platforms — search, ranking, classification, and more.',
  },
  {
    icon: Rocket,
    title: 'ML Platform Engineering',
    description: 'Feature stores, model registries, and serving infra that make your ML org production-ready.',
  },
];

const integrations = [
  'Cloud-Native (AWS, GCP, Azure)',
  'Kubernetes & Container Orchestration',
  'CI/CD Pipelines (GitHub Actions, GitLab)',
  'Feature Stores (Feast, Tecton)',
  'Model Serving (TorchServe, TFServing, vLLM)',
  'Any Language or Framework',
];

const outcomes = [
  { metric: '8 wks', label: 'POC to production' },
  { metric: '99.9%', label: 'Model serving uptime' },
  { metric: '50%', label: 'Faster iteration cycles' },
  { metric: 'Full', label: 'Ownership & IP transfer' },
];

const CustomAI = () => {
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
          <span className="micro-label block mb-6">CUSTOM AI DEVELOPMENT</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Built for Your Business, Owned by You
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            When off-the-shelf tools can't compete, we design bespoke ML models, AI-powered products,
            and intelligent platforms — from first prototype to production handover.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Start Your Custom AI Project
          </Link>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="micro-label block mb-4">THE CHALLENGE</span>
              <h2 className="text-3xl font-semibold text-white mb-4">Generic Tools Don't Fit</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Pre-built AI products are designed for average use cases. When your data, domain, or
                workflow is unique, you need models trained on your reality — not someone else's demo
                dataset.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">Purpose-Built Competitive Edge</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Custom AI becomes a moat. Proprietary models, unique data pipelines, and tailored UX
                create differentiation no competitor can buy off the shelf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">How We Deliver Custom AI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Discovery & Scoping', detail: 'We define success criteria, map data sources, and design system architecture before writing production code.' },
              { step: '02', title: 'Iterative Build', detail: 'Weekly sprint demos with working software — from baseline model to optimized pipeline — with continuous feedback.' },
              { step: '03', title: 'Handover & Support', detail: 'Full codebase ownership, documentation, runbooks, and optional retainer for retraining and monitoring.' },
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">What We Build</h2>
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
          <span className="micro-label block mb-4">TECH STACK</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">Built on Modern Infrastructure</h2>
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
            Ready to Build Something Unique?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Describe your vision. We'll scope the architecture, timeline, and team structure for a
            custom AI solution you own completely.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default CustomAI;
