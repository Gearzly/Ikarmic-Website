import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Globe, Headphones, Mic, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: MessageSquare,
    title: 'Website & App Chat',
    description: 'Instant, contextual answers embedded in your product — from FAQs to complex troubleshooting.',
  },
  {
    icon: Globe,
    title: 'WhatsApp & Messaging',
    description: 'Meet customers on channels they already use with multilingual, always-on chat support.',
  },
  {
    icon: Headphones,
    title: 'Customer Service Agents',
    description: 'AI-first triage and resolution that handles tier-1 queries and escalates intelligently.',
  },
  {
    icon: Mic,
    title: 'Voice Assistants',
    description: 'Natural-language voice interfaces for IVR replacement, appointment booking, and self-service.',
  },
];

const integrations = [
  'CRM Systems (Salesforce, HubSpot)',
  'Ticketing (Zendesk, Freshdesk)',
  'Knowledge Bases & Wikis',
  'WhatsApp Business API',
  'Slack & Microsoft Teams',
  'Custom REST / GraphQL APIs',
];

const outcomes = [
  { metric: '60%', label: 'Average ticket deflection' },
  { metric: '<2s', label: 'Median first response' },
  { metric: '35%', label: 'Support cost reduction' },
  { metric: '4.6★', label: 'Avg. end-user satisfaction' },
];

const AIChatbots = () => {
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
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power2.out',
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
          <span className="micro-label block mb-6">AI CHATBOTS &amp; CONVERSATIONAL AI</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Intelligent Conversations, Instant Resolution
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            Deploy channel-agnostic chatbots with human escalation that cut support costs and delight
            customers — from first message to full resolution.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Chatbot Project
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
                Support Costs Climb While Response Times Lag
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Scaling human support linearly is expensive. Tickets pile up, response latency grows,
                and customer satisfaction suffers. Most teams spend 70% of agent time on repetitive,
                low-complexity queries that AI can resolve instantly.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Always-On, Multi-Channel Intelligence
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                A well-designed conversational AI system handles tier-1 queries autonomously, routes
                complex issues to the right team, and learns from every interaction — freeing agents
                to focus on high-value conversations.
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
            How We Build Conversational AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Intent Mapping', detail: 'We map your support taxonomy, identify high-volume query clusters, and define escalation rules before writing a single prompt.' },
              { step: '02', title: 'Channel-Agnostic Design', detail: 'One conversation engine powers web chat, WhatsApp, SMS, and voice — with channel-specific UX adaptations.' },
              { step: '03', title: 'Human Escalation Loop', detail: 'When confidence drops below threshold, the system routes to a live agent with full conversation context intact.' },
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
            Where Conversational AI Delivers
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

      {/* Integration Points */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">INTEGRATIONS</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">
            Connects With Your Stack
          </h2>
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

      {/* Outcomes & Metrics */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
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

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready to Automate Conversations?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us about your support volume, channels, and pain points. We'll scope a chatbot pilot
            you can launch in weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AIChatbots;
