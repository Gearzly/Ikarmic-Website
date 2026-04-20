import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Brain, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureCardSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const icons = iconsRef.current;
    const bg = bgRef.current;

    if (!section || !card || !title || !body || !cta || !icons || !bg) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(card,
          { opacity: 0, y: '60vh', scale: 0.96, rotateX: 10 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, ease: 'power2.out' },
          0
        )
        .fromTo(title,
          { opacity: 0, x: '-10vw' },
          { opacity: 1, x: 0, ease: 'power2.out' },
          0.05
        )
        .fromTo(body,
          { opacity: 0, y: '6vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.1
        )
        .fromTo(cta,
          { opacity: 0, y: '3vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.15
        )
        .fromTo(icons,
          { opacity: 0, x: '10vw', scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, ease: 'power2.out' },
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(card,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: '-22vh', scale: 0.98, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { opacity: 1, scale: 1 },
          { opacity: 0.4, scale: 1.06, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ zIndex: 20 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <picture>
          <source srcSet="/images/street_scene_bg.webp" type="image/webp" />
          <img
            src="/images/street_scene_bg.webp"
            alt="Night street scene"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover img-cinematic"
          />
        </picture>
        <div className="absolute inset-0 bg-[#070A12]/55" />
      </div>

      {/* Feature Card */}
      <div
        ref={cardRef}
        className="relative z-[4] w-[min(860px,82vw)] glass-card rounded-[28px] p-8 lg:p-12"
        style={{
          opacity: 0,
          transform: 'perspective(1000px)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Content */}
          <div>
            <h2
              ref={titleRef}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6"
              style={{ opacity: 0 }}
            >
              Intelligence Built In
            </h2>
            <p
              ref={bodyRef}
              className="text-[#A7B1D8] leading-relaxed mb-8"
              style={{ opacity: 0 }}
            >
              We embed models into your product so predictions feel like features—not add-ons.
              From ranking to forecasting, everything is built for latency, scale, and clarity.
            </p>
            <Link
              ref={ctaRef}
              to="/services"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 link-underline"
              style={{ opacity: 0 }}
            >
              See how we build
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right Icons */}
          <div
            ref={iconsRef}
            className="flex items-center justify-center lg:justify-end"
            style={{ opacity: 0 }}
          >
            <div className="flex -space-x-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Cpu className="w-7 h-7 lg:w-8 lg:h-8 text-indigo-400" />
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Brain className="w-7 h-7 lg:w-8 lg:h-8 text-indigo-400" />
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Sparkles className="w-7 h-7 lg:w-8 lg:h-8 text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCardSection;
