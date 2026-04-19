import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Globe, Zap, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: MessageSquare,
    title: 'Tier-1 Auto-Resolution',
    description: 'Instantly resolve FAQs, order status, account queries, and policy questions without involving a human agent.',
  },
  {
    icon: Globe,
    title: 'Omnichannel Support',
    description: 'A single AI brain handles web chat, WhatsApp, SMS, and voice — consistent quality on every channel.',
  },
  {
    icon: Zap,
    title: 'Smart Escalation',
    description: 'When complexity exceeds confidence thresholds, conversations route to the right agent with full context.',
  },
  {
    icon: BarChart2,
    title: 'Proactive Engagement',
    description: 'Trigger support outreach before customers complain — shipping alerts, renewal reminders, and anomaly alerts.',
  },
];

const relatedServices = [
  { name: 'AI Chatbots & Conversational AI', path: '/services/ai-chatbots' },
  { name: 'Generative AI Solutions', path: '/services/generative-ai' },
];

const outcomes = [
  { metric: '60%', label: 'Ticket deflection rate' },
  { metric: '24 / 7', label: 'Always-on coverage' },
  { metric: '35%', label: 'Support cost reduction' },
  { metric: '4.6★', label: 'Avg. end-user satisfaction' },
];

const CXSupportAI = () => {
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
          <span className="micro-label block mb-6">CX &amp; SUPPORT AI</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Resolve More. Spend Less. Delight Everyone.
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            We design AI-powered customer experience systems that deflect routine tickets, accelerate
            resolutions, and give your agents space to do their best work.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your CX Project
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
                Support Costs Scale Linearly. Expectations Don't.
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Growing teams face the same trap: ticket volumes double, headcount doubles, and
                satisfaction still drops. Most queries — password resets, order status, policy
                questions — are repetitive and low-value for agents but high-priority for customers.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                AI That Knows When to Help and When to Hand Off
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                A well-designed CX AI resolves tier-1 queries instantly, escalates complex issues
                with full context, and learns from every interaction. Agents handle only the cases
                that genuinely need them — and customers get faster answers on every channel.
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
            How We Build CX AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Journey & Intent Mapping', detail: 'We audit your support taxonomy, identify high-volume query clusters, and define deflection vs. escalation boundaries before writing a single prompt.' },
              { step: '02', title: 'Channel Deployment', detail: 'One conversation engine deployed across web chat, WhatsApp, and voice — with channel-specific UX adaptations and brand tone tuning.' },
              { step: '03', title: 'Loop Closure & Learning', detail: 'Escalation paths are tested against real data. Post-launch, we monitor deflection rates and iterate on failure modes weekly.' },
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
            Where We Deliver
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
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us your support volumes, channels, and biggest pain points. We'll scope a CX AI
            pilot you can launch in weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CXSupportAI;
