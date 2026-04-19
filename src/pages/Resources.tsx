import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, BarChart3, Newspaper, Layers, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    icon: Newspaper,
    label: 'BLOG',
    title: 'Insights & Articles',
    description: 'Practical perspectives on AI adoption, implementation patterns, and industry trends — written for operators and decision-makers, not just engineers.',
    link: '/blog',
    linkText: 'Read the blog',
  },
  {
    icon: BarChart3,
    label: 'INDUSTRY INSIGHTS',
    title: 'AI by Industry',
    description: 'Explore how AI applies to your industry — from demand forecasting in retail to predictive maintenance in manufacturing and adaptive learning in education.',
    link: '/industries',
    linkText: 'Explore industries',
  },
  {
    icon: Layers,
    label: 'SOLUTIONS',
    title: 'Business Outcome Playbooks',
    description: 'See how we map AI capabilities to specific business goals — CX automation, intelligent workflows, predictive intelligence, AI-powered marketing, and enterprise platforms.',
    link: '/solutions',
    linkText: 'View solutions',
  },
  {
    icon: BookOpen,
    label: 'SERVICE DEEP-DIVES',
    title: 'How We Build',
    description: 'Detailed breakdowns of our AI services — approach, technical architecture, integration patterns, and expected outcomes for each solution area.',
    link: '/services',
    linkText: 'Browse services',
  },
];

const Resources = () => {
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
          <span className="micro-label block mb-6">RESOURCES</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Learn How We Build AI
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto">
            Blog posts, industry guides, solution playbooks, and service deep-dives — everything
            you need to evaluate how Ikarmic can help your team adopt and ship AI with confidence.
          </p>
        </div>
      </section>

      {/* Resource Sections */}
      <section className="relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                to={s.link}
                className="fade-up glass-card rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row gap-6 items-start hover:border-indigo-500/30 transition-colors duration-300 block"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <span className="micro-label block mb-2">{s.label}</span>
                  <h2 className="text-2xl font-semibold text-white mb-3">{s.title}</h2>
                  <p className="text-[#A7B1D8] leading-relaxed mb-4">{s.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-indigo-400 font-medium">
                    {s.linkText}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">Have a Specific Question?</h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">Reach out and we'll discuss your AI goals, share relevant examples, and outline next steps.</p>
          <Link to="/contact" className="btn-primary inline-block">Get in Touch</Link>
        </div>
      </section>
    </main>
  );
};

export default Resources;
