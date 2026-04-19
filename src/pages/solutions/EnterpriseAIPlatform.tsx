import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Layers, Bot, Lock, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: Server,
    title: 'Model Serving Infrastructure',
    description: 'Production-grade model APIs with auto-scaling, versioning, canary deployments, and latency SLAs — not notebook endpoints.',
  },
  {
    icon: Layers,
    title: 'ML Pipelines & Feature Stores',
    description: 'Automated data ingestion, feature engineering, model retraining, and experiment tracking wired into your CI/CD.',
  },
  {
    icon: Bot,
    title: 'Internal AI Copilots',
    description: 'Custom assistants for engineering, legal, finance, and knowledge teams — grounded in your internal data and access controls.',
  },
  {
    icon: Lock,
    title: 'AI Governance & Observability',
    description: 'Drift detection, bias monitoring, explainability logs, and audit trails that satisfy engineering and compliance requirements.',
  },
];

const relatedServices = [
  { name: 'Custom AI Development', path: '/services/custom-ai' },
  { name: 'AI Data Analytics & Predictive Intelligence', path: '/services/data-analytics' },
];

const outcomes = [
  { metric: '8 wks', label: 'POC-to-production' },
  { metric: '99.9%', label: 'Model serving uptime' },
  { metric: '50%', label: 'Faster iteration cycles' },
  { metric: '100%', label: 'IP ownership transferred' },
];

const EnterpriseAIPlatform = () => {
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
          <span className="micro-label block mb-6">ENTERPRISE AI PLATFORM</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Take AI From Prototype to Production — and Own It
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            We design and build the infrastructure layer that turns AI experiments into reliable,
            scalable systems your organisation controls — with full IP transfer and team enablement.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your AI Platform
          </Link>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="micro-label block mb-4">THE CHALLENGE</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                AI Experiments That Never Reach Production
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Most organisations have impressive notebooks and fragile demo environments but
                struggle to operationalise models reliably. MLOps gaps, missing infrastructure, and
                unclear ownership mean pilots stall indefinitely — and value never ships.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                A Platform Your Team Builds On, Not Around
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                A well-scoped enterprise AI platform provides reusable model serving, a feature
                store, experiment tracking, and governance tooling. Every future model your team
                builds benefits from the foundation — compounding the return on the initial
                investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            How We Build Enterprise AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Architecture Design', detail: 'We assess your existing cloud infrastructure, data stack, and engineering team capabilities — then design a platform architecture sized to your actual needs, not a generic blueprint.' },
              { step: '02', title: 'Platform Build', detail: 'Iterative delivery: model serving APIs, CI/CD integration, feature pipelines, and monitoring dashboards — each component validated by your engineers before handover.' },
              { step: '03', title: 'Handover & Enablement', detail: 'Full runbooks, documented architecture decisions, and pairing sessions ensure your team can operate, extend, and evolve the platform without ongoing dependency on us.' },
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
          <span className="micro-label block mb-4">CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">
            What the Platform Enables
          </h2>
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

      {/* Outcomes */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">OUTCOMES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">
            Measurable Impact
          </h2>
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

      {/* Related Services */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">RELATED SERVICES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">
            The Technology Behind This Solution
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="flex items-center gap-3 px-6 py-4 glass-card rounded-xl hover:border-indigo-500/30 border border-transparent transition-colors duration-200 group"
              >
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-white text-sm">{s.name}</span>
                <ArrowRight className="w-4 h-4 text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready to Build AI That Lasts?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us where your AI initiatives are stalling and what infrastructure gaps are blocking
            them. We'll design a platform architecture that gets you to production — and keeps you
            there.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default EnterpriseAIPlatform;
