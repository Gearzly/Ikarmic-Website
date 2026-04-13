import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      'Ikarmic turned a 12-week initiative into a production-ready chatbot in under 6 weeks. The team felt like an extension of ours from day one.',
    name: 'Priya Menon',
    title: 'VP of Digital',
    company: 'Vantara Retail',
  },
  {
    quote:
      'Their analytics work cut our forecasting error by 30%. The model explanations made it easy to get leadership buy-in across the business.',
    name: 'Daniel Torres',
    title: 'Director of Operations',
    company: 'Meridian Commerce',
  },
  {
    quote:
      'What set Ikarmic apart was their emphasis on responsible AI. We launched with confidence knowing every guardrail was in place.',
    name: 'Sarah Lin',
    title: 'VP of Technology',
    company: 'Atlas Manufacturing',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
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
      className="relative py-20 lg:py-28 bg-[#070A12]"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <span className="micro-label block mb-3">CLIENT VOICES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            What Our Partners Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between"
              style={{ opacity: 0 }}
            >
              <div>
                <Quote
                  size={24}
                  className="text-indigo-500/60 mb-4"
                  aria-hidden="true"
                />
                <p className="text-[#A7B1D8] leading-relaxed text-sm lg:text-base">
                  "{t.quote}"
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-[#A7B1D8]/70 text-xs mt-0.5">
                  {t.title}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
