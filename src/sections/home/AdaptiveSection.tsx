import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AdaptiveSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const label = labelRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !label || !heading || !body || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(image,
          { opacity: 0, x: '50vw', scale: 1.04 },
          { opacity: 1, x: 0, scale: 1, ease: 'power2.out' },
          0
        )
        .fromTo(label,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.05
        )
        .fromTo(heading,
          { opacity: 0, x: '-18vw' },
          { opacity: 1, x: 0, ease: 'power2.out' },
          0.08
        )
        .fromTo(body,
          { opacity: 0, y: '5vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.12
        )
        .fromTo(cta,
          { opacity: 0, y: '3vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.16
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo([label, heading, body, cta],
          { opacity: 1, x: 0 },
          { opacity: 0, x: '-10vw', ease: 'power2.in', stagger: 0.02 },
          0.7
        )
        .fromTo(image,
          { opacity: 1, x: 0, scale: 1 },
          { opacity: 0, x: '10vw', scale: 1.02, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned hairline-grid"
      style={{ zIndex: 30, backgroundColor: '#070A12' }}
    >
      {/* Desktop layout */}
      <div className="hidden lg:block">
        {/* Image Panel (Right) */}
        <div
          ref={imageRef}
          className="absolute right-[6vw] top-[18vh] w-[40vw] h-[64vh] rounded-[28px] overflow-hidden"
          style={{ opacity: 0 }}
        >
          <img
            src="/images/adaptive_image.jpg"
            alt="Adaptive AI Systems"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover img-cinematic"
          />
        </div>

        {/* Text Block (Left) */}
        <div className="absolute left-[9vw] top-[30vh] w-[34vw] z-[4]">
          <span
            ref={labelRef}
            className="micro-label block mb-4"
            style={{ opacity: 0 }}
          >
            ADAPTIVE SYSTEMS
          </span>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6"
            style={{ opacity: 0 }}
          >
            Adaptive Systems
          </h2>
          <p
            ref={bodyRef}
            className="text-[#A7B1D8] leading-relaxed mb-8"
            style={{ opacity: 0 }}
          >
            Markets change. Data drifts. We design feedback loops, retraining pipelines,
            and monitoring that keeps models accurate—and teams informed.
          </p>
          <Link
            ref={ctaRef}
            to="/services"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 link-underline"
            style={{ opacity: 0 }}
          >
            Explore adaptability
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex lg:hidden flex-col items-center justify-center h-full px-6 gap-8">
        <div className="w-full max-w-md aspect-[4/3] rounded-[20px] overflow-hidden">
          <img
            src="/images/adaptive_image.jpg"
            alt="Adaptive AI Systems"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover img-cinematic"
          />
        </div>
        <div className="w-full max-w-md text-center">
          <span className="micro-label block mb-3">ADAPTIVE SYSTEMS</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Adaptive Systems</h2>
          <p className="text-[#A7B1D8] leading-relaxed mb-6">
            Markets change. Data drifts. We design feedback loops, retraining pipelines,
            and monitoring that keeps models accurate—and teams informed.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300"
          >
            Explore adaptability
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AdaptiveSection;
