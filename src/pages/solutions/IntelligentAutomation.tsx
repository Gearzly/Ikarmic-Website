import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Mail, GitBranch, Shield, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'Extract, classify, and route data from invoices, contracts, and forms with 95%+ accuracy — no manual key-entry.',
  },
  {
    icon: Mail,
    title: 'Email & Inbox Triage',
    description: 'Classify incoming emails, draft replies, and route requests to the right team without human scanning.',
  },
  {
    icon: GitBranch,
    title: 'Workflow Orchestration',
    description: 'Chain approvals, ERP writes, and notifications into reliable automated flows that run 24/7.',
  },
  {
    icon: Shield,
    title: 'Compliance Automation',
    description: 'Continuous policy checking and audit trail generation across financial, HR, and operational processes.',
  },
];

const relatedServices = [
  { name: 'AI Business Automation', path: '/services/business-automation' },
];

const outcomes = [
  { metric: '80%', label: 'Processing time reduction' },
  { metric: '95%+', label: 'Extraction accuracy' },
  { metric: '70%', label: 'Fewer manual review cycles' },
  { metric: '3×', label: 'Throughput increase' },
];

const IntelligentAutomation = () => {
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
          <span className="micro-label block mb-6">INTELLIGENT AUTOMATION</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Eliminate the Work That Slows You Down
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            We replace manual back-office processes with AI-driven automation — document extraction,
            email routing, workflow orchestration — so your team focuses on what only humans can do.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Automation Project
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
                Talented People Stuck in Repetitive Tasks
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Finance teams key-entering invoices. Ops teams chasing approval chains. HR teams
                manually sorting applications. These aren't edge cases — they're the daily reality
                in most growing organizations, burning bandwidth and introducing errors.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                AI That Reads, Routes, and Acts — Reliably
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Modern document AI and workflow orchestration can handle extraction, classification,
                and routing at scale. The result: faster cycle times, fewer errors, complete audit
                trails, and people working on higher-leverage problems.
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
            How We Build Automation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Process Audit', detail: 'We map your current workflows, identify high-volume repetitive steps, and quantify the time and error cost of manual intervention.' },
              { step: '02', title: 'Document Intelligence Layer', detail: 'Custom extraction models trained on your document types — invoices, contracts, forms — with human-in-the-loop validation for edge cases.' },
              { step: '03', title: 'Orchestration & Monitoring', detail: 'Automated flows wired into your ERP, CRM, or custom systems. Real-time dashboards track throughput, accuracy, and exception rates.' },
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">
            Where We Automate
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
            Ready to Automate Your Operations?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us which manual processes are costing you the most time. We'll map an automation
            roadmap and scope a pilot you can run in weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default IntelligentAutomation;
