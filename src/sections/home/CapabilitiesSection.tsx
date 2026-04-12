import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, GitBranch, Database, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Cpu,
    title: 'Model Design',
    description: 'Custom architectures for ranking, forecasting, and classification.',
    link: '/services'
  },
  {
    icon: GitBranch,
    title: 'MLOps',
    description: 'Pipelines, monitoring, and reproducible deployments.',
    link: '/services'
  },
  {
    icon: Database,
    title: 'Data Strategy',
    description: 'Labeling, governance, and feature platforms.',
    link: '/services'
  },
  {
    icon: Layers,
    title: 'Product Integration',
    description: 'UX, APIs, and feedback loops that improve over time.',
    link: '/services'
  }
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation with stagger
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Subtle parallax on cards
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: -12 },
          {
            y: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      style={{ 
        zIndex: 70, 
        backgroundColor: '#0B1022',
        borderTop: '1px solid rgba(244, 246, 255, 0.05)'
      }}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Sticky Heading */}
          <div
            ref={headingRef}
            className="lg:sticky lg:top-[18vh] lg:self-start"
            style={{ opacity: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Capabilities
            </h2>
            <p className="text-[#A7B1D8] leading-relaxed max-w-md">
              A small team, deep craft. We focus on the highest-leverage ML work—and make it feel simple.
            </p>
          </div>

          {/* Right Column - Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {capabilities.map((capability, index) => (
              <div
                key={capability.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group glass-card rounded-3xl p-6 transition-all duration-300 hover:bg-white/5 hover:border-white/15"
                style={{ opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-5 group-hover:bg-indigo-600/30 transition-colors duration-300">
                  <capability.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {capability.title}
                </h3>
                <p className="text-[#A7B1D8] text-sm leading-relaxed mb-4">
                  {capability.description}
                </p>
                <Link
                  to={capability.link}
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
