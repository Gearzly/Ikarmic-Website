import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pen, Target, Megaphone, User, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: Pen,
    title: 'AI Content Generation',
    description: 'Blog posts, product descriptions, email sequences, and social copy — generated at scale and tuned to your brand voice.',
  },
  {
    icon: Target,
    title: 'Lead Scoring & Segmentation',
    description: 'Models that rank inbound leads by conversion likelihood and automatically segment audiences for personalised outreach.',
  },
  {
    icon: Megaphone,
    title: 'Campaign Automation',
    description: 'AI that selects send times, subject lines, and content variants — then reports which combinations drive the best results.',
  },
  {
    icon: User,
    title: 'Personalisation at Scale',
    description: 'Dynamic website content, product recommendations, and email personalisation driven by real-time behavioural signals.',
  },
];

const relatedServices = [
  { name: 'Generative AI Solutions', path: '/services/generative-ai' },
  { name: 'Custom AI Development', path: '/services/custom-ai' },
];

const outcomes = [
  { metric: '4×', label: 'Content velocity increase' },
  { metric: '60%', label: 'Reduction in manual marketing work' },
  { metric: '30%', label: 'Conversion rate improvement' },
  { metric: '<3 wks', label: 'Pilot-to-production' },
];

const AIMarketingPlatform = () => {
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
          <span className="micro-label block mb-6">AI-POWERED MARKETING</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Scale Your Marketing Without Scaling Your Headcount
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            We build AI systems that generate content, score leads, automate campaigns, and
            personalise experiences — freeing your team to focus on strategy and creativity.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Marketing AI Project
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
                Content Demand Outpaces Team Capacity
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Modern marketing requires publishing at volume across channels, personalising every
                touchpoint, and optimising campaigns in real time. Small teams can't keep up
                manually — and generic automation doesn't produce quality output.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Brand-Aligned AI That Grows With You
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Generative AI tuned to your brand voice produces consistent, on-brand content at
                scale. Paired with lead intelligence and automation, it turns your marketing stack
                into a compounding growth engine.
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
            How We Build Marketing AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Content Ops Audit', detail: 'We map your current content workflow, identify the highest-volume bottlenecks, and define quality benchmarks before any generation pipeline is built.' },
              { step: '02', title: 'Generation Pipeline', detail: 'Custom prompting, brand voice fine-tuning, and quality gates ensure generated content meets your standards — and integrates with your CMS or email platform workflow.' },
              { step: '03', title: 'Lead Intelligence Layer', detail: 'Scoring models and segmentation logic deployed into your CRM. Campaign automation wired to behavioural triggers, not just time-based schedules.' },
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
            Where AI Amplifies Marketing
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
            Ready to Power Your Marketing With AI?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us your content bottlenecks, lead volumes, and marketing stack. We'll scope an AI
            pilot built around your biggest growth lever.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AIMarketingPlatform;
