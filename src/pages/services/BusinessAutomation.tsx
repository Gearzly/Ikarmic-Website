import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Settings, FileText, MailCheck, Workflow, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: FileText,
    title: 'Document Intelligence',
    description: 'Extract, classify, and route data from invoices, contracts, and forms with 95%+ accuracy.',
  },
  {
    icon: MailCheck,
    title: 'Email Triage & Routing',
    description: 'Automatically categorize inbound emails, flag urgency, and assign to the right team.',
  },
  {
    icon: Workflow,
    title: 'Workflow Orchestration',
    description: 'Chain multi-step approval flows across systems with human-in-the-loop checkpoints.',
  },
  {
    icon: Settings,
    title: 'Compliance Checks',
    description: 'Run automated audits against regulatory checklists and flag deviations before submission.',
  },
];

const integrations = [
  'ERP Systems (SAP, Oracle, NetSuite)',
  'HRMS (Workday, BambooHR)',
  'Cloud Storage (S3, Azure Blob, GCS)',
  'RPA Platforms (UiPath, Automation Anywhere)',
  'Document Management (SharePoint, Box)',
  'Custom REST / GraphQL APIs',
];

const outcomes = [
  { metric: '80%', label: 'Processing time reduction' },
  { metric: '95%+', label: 'Extraction accuracy' },
  { metric: '70%', label: 'Fewer manual review cycles' },
  { metric: '3×', label: 'Throughput increase' },
];

const BusinessAutomation = () => {
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
          <span className="micro-label block mb-6">AI BUSINESS AUTOMATION</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Automate What Slows You Down
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            Replace manual data entry, document handling, and approval chains with AI-driven
            workflows that run reliably at scale.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Automation Goals
          </Link>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="micro-label block mb-4">THE CHALLENGE</span>
              <h2 className="text-3xl font-semibold text-white mb-4">Manual Processes Create Bottlenecks</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Data re-keying, multi-system copy-paste, and manual compliance checks eat thousands
                of employee hours each year — and introduce errors that cost even more to fix.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">End-to-End Intelligent Automation</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Modern AI can read documents, understand context, make routing decisions, and execute
                downstream actions — transforming multi-day workflows into minutes with human oversight
                only where it matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">How We Build Automation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Process Mining', detail: 'We audit current workflows, quantify manual effort, and identify the highest-ROI automation opportunities.' },
              { step: '02', title: 'Document Intelligence', detail: 'OCR, NLP, and layout models extract structured data from unstructured sources with validation gates.' },
              { step: '03', title: 'Orchestration & Monitoring', detail: 'We wire automated steps into your existing systems with dashboards, alerts, and human-in-the-loop controls.' },
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">Where Automation Delivers</h2>
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
            Ready to Eliminate Manual Work?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Share your highest-friction processes. We'll identify automation wins you can ship in weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default BusinessAutomation;
