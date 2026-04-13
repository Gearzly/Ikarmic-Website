import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type CaseStudyPreview = {
  title: string;
  client: string;
  industry: string;
  service: string;
  headline: string;
  path: string;
};

const caseStudies: CaseStudyPreview[] = [
  {
    title: 'Support Automation',
    client: 'Vantara Retail',
    industry: 'Retail',
    service: 'AI Chatbots',
    headline: '65% ticket deflection, response time from hours to under 2 minutes.',
    path: '/case-studies/support-automation',
  },
  {
    title: 'Demand Forecasting',
    client: 'Meridian Commerce',
    industry: 'Retail',
    service: 'Data Analytics',
    headline: 'Planning accuracy improved 30%, inventory waste reduced 18%.',
    path: '/case-studies/demand-forecasting',
  },
  {
    title: 'Document Intelligence',
    client: 'Atlas Manufacturing',
    industry: 'Manufacturing',
    service: 'Business Automation',
    headline: 'Review cycles cut 70%, invoice processing 4× faster.',
    path: '/case-studies/document-intelligence',
  },
];

const CaseStudies = () => {
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
          <span className="micro-label block mb-6">CASE STUDIES</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Real Results, Real Impact
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto">
            See how teams across industries use Ikarmic to deploy AI that measurably improves
            operations, customer experience, and decision-making.
          </p>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-8">
          {caseStudies.map((cs) => (
            <article key={cs.path} className="fade-up glass-card rounded-3xl p-8 lg:p-10" style={{ opacity: 0 }}>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-indigo-600/20 rounded-full text-indigo-300 text-xs font-medium">
                  {cs.industry}
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-white/70 text-xs font-medium">
                  {cs.service}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-1">{cs.title}</h2>
              <p className="text-indigo-400 text-sm font-medium mb-4">{cs.client}</p>
              <p className="text-[#A7B1D8] leading-relaxed mb-6">{cs.headline}</p>
              <Link
                to={cs.path}
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 link-underline"
              >
                Read full case study <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Let's discuss how AI can deliver measurable outcomes for your business.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CaseStudies;
