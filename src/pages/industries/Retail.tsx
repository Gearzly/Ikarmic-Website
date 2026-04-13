import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, BarChart3, Bot, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  'Demand volatility makes inventory planning unreliable.',
  'Cart abandonment rates exceed 70% without AI-driven engagement.',
  'Personalization expectations grow while support budgets shrink.',
  'Legacy systems make it hard to act on real-time signals.',
];

const services = [
  { icon: BarChart3, title: 'Predictive Analytics', detail: 'Demand forecasting and pricing optimization that reduce waste and grow margin.', path: '/services/data-analytics' },
  { icon: Bot, title: 'AI Chatbots', detail: 'Multi-channel support that resolves tier-1 queries instantly and boosts CSAT.', path: '/services/ai-chatbots' },
  { icon: Sparkles, title: 'Generative AI', detail: 'Product description generation, personalized recommendations, and marketing automation.', path: '/services/generative-ai' },
];

const useCases = [
  'Demand forecasting across 100+ SKU categories',
  'AI-powered post-purchase support on WhatsApp',
  'Dynamic product recommendations on storefront',
];

const outcomes = [
  { metric: '30%', label: 'Forecast accuracy gain' },
  { metric: '65%', label: 'Support ticket deflection' },
  { metric: '12%', label: 'Revenue lift on key categories' },
  { metric: '18%', label: 'Inventory waste reduction' },
];

const Retail = () => {
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
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
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
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-indigo-400" />
          </div>
          <span className="micro-label block mb-6">AI FOR RETAIL &amp; E-COMMERCE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Smarter Retail, Better Margins
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            From demand forecasting to conversational commerce, we help retailers use AI to
            reduce waste, lift revenue, and delight customers.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Talk to Us About Retail AI</Link>
        </div>
      </section>

      {/* Key Challenges */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">KEY CHALLENGES</span>
          <h2 className="text-3xl font-semibold text-white mb-8">What Retail Teams Face</h2>
          <ul className="space-y-4">
            {challenges.map((c) => (
              <li key={c} className="flex items-start gap-4">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span className="text-[#A7B1D8] leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How Ikarmic Helps */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">HOW WE HELP</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">Services Mapped to Retail</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.title} to={s.path} className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-colors duration-300 block">
                  <Icon className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{s.detail}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">USE CASES</span>
          <h2 className="text-3xl font-semibold text-white mb-8">Retail AI in Action</h2>
          <ul className="space-y-4">
            {useCases.map((uc) => (
              <li key={uc} className="flex items-start gap-4">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span className="text-[#A7B1D8] leading-relaxed">{uc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Outcomes */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">OUTCOMES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">Measurable Retail Impact</h2>
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
      <section className="fade-up relative py-20 lg:py-28 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">Ready to Transform Retail?</h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">Tell us about your retail challenges and we'll scope the AI solutions that move the needle.</p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default Retail;
