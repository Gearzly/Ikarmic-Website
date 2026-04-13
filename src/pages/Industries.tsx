import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Factory, GraduationCap, Rocket, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: ShoppingCart,
    title: 'Retail & E-commerce',
    challenge: 'Demand volatility, cart abandonment, personalization at scale.',
    value: 'Predictive analytics, conversational support, and AI-driven recommendations.',
    path: '/industries/retail',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    challenge: 'Supply chain disruption, quality control, predictive maintenance.',
    value: 'Data analytics, intelligent automation, and custom ML models.',
    path: '/industries/manufacturing',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    challenge: 'Personalized learning at scale, admin burden, engagement.',
    value: 'Gen AI knowledge assistants, chatbots, and custom platforms.',
    path: '/industries/education',
  },
  {
    icon: Rocket,
    title: 'Technology & Startups',
    challenge: 'Shipping AI features fast, scaling ML infra, differentiating product.',
    value: 'Custom AI development, gen AI, and data analytics acceleration.',
    path: '/industries/technology',
  },
];

const Industries = () => {
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
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
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
          <span className="micro-label block mb-6">INDUSTRIES</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            AI for Your Industry
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto">
            Every vertical has unique data, workflows, and regulatory contexts. We tailor our AI
            services to deliver impact where it matters most for your sector.
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <article
                key={ind.title}
                className="fade-up glass-card rounded-3xl p-8 flex flex-col justify-between"
                style={{ opacity: 0 }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">{ind.title}</h2>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed mb-2">
                    <span className="font-medium text-white/80">Challenge:</span> {ind.challenge}
                  </p>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">
                    <span className="font-medium text-white/80">Our edge:</span> {ind.value}
                  </p>
                </div>
                <Link
                  to={ind.path}
                  className="inline-flex items-center gap-2 mt-6 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors duration-300 link-underline"
                >
                  Explore {ind.title.split(' ')[0]} <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            Don't See Your Industry?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Our approach adapts to any vertical. Tell us about your domain and we'll map the
            highest-impact AI opportunities.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Industries;
