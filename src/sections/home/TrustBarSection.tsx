import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Factory, GraduationCap, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { icon: ShoppingCart, label: 'Retail' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Rocket, label: 'Technology' },
];

const TrustBarSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !heading || items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 bg-[#070A12] border-y border-white/5"
    >
      <div className="w-full px-6 lg:px-12">
        <p
          ref={headingRef}
          className="micro-label text-center mb-10"
          style={{ opacity: 0 }}
        >
          Trusted by teams across industries
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-10 max-w-3xl mx-auto">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.label}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="flex flex-col items-center gap-3 py-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <Icon size={28} className="text-indigo-400" aria-hidden="true" />
                <span className="text-sm text-[#A7B1D8] font-medium">{ind.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
