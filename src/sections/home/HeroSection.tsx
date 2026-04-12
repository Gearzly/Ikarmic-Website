import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bg = bgRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const subheadline = subheadlineRef.current;
    const cta = ctaRef.current;

    if (!section || !content || !bg || !label || !headline || !subheadline || !cta) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(bg,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo(label,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(headline,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(subheadline,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(cta,
          { opacity: 0, y: 10, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([label, headline, subheadline, cta], { opacity: 1, y: 0, scale: 1 });
            gsap.set(bg, { opacity: 1, scale: 1 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(content,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: '-18vh', scale: 0.98, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { opacity: 1, scale: 1 },
          { opacity: 0.35, scale: 1.08, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero_city_bg.jpg"
          alt="Night city skyline"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover img-cinematic"
        />
        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(7,10,18,0.35), rgba(7,10,18,0.72))' }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[4] text-center px-6 max-w-5xl mx-auto"
      >
        {/* Micro Label */}
        <span
          ref={labelRef}
          className="micro-label block mb-6"
          style={{ opacity: 0 }}
        >
          IKARMIC AI
        </span>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6"
          style={{ opacity: 0 }}
        >
          AI that works for people.
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-base sm:text-lg text-[#A7B1D8] max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          We design and ship machine learning systems that are calm, reliable, and easy to adopt—across products, operations, and customer experiences.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <Link
            to="/services"
            className="btn-primary w-full sm:w-auto"
          >
            Explore Solutions
          </Link>
          <Link
            to="/contact"
            className="btn-secondary w-full sm:w-auto"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
