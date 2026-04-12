import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DeploySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const label = labelRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const pill = pillRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !label || !heading || !body || !pill || !cta) return;

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
        .fromTo(image,
          { opacity: 0, x: '-55vw', scale: 1.05 },
          { opacity: 1, x: 0, scale: 1, ease: 'power2.out' },
          0
        )
        .fromTo(label,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.05
        )
        .fromTo(heading,
          { opacity: 0, x: '22vw' },
          { opacity: 1, x: 0, ease: 'power2.out' },
          0.08
        )
        .fromTo(body,
          { opacity: 0, y: '5vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.12
        )
        .fromTo(pill,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, ease: 'power2.out' },
          0.15
        )
        .fromTo(cta,
          { opacity: 0, y: '3vh' },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.18
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo([label, heading, body, pill, cta],
          { opacity: 1, y: 0 },
          { opacity: 0, y: '-8vh', ease: 'power2.in', stagger: 0.02 },
          0.7
        )
        .fromTo(image,
          { opacity: 1, y: 0, scale: 1 },
          { opacity: 0, y: '6vh', scale: 1.02, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned hairline-grid"
      style={{ zIndex: 60, backgroundColor: '#070A12' }}
    >
      {/* Image Panel (Left) */}
      <div
        ref={imageRef}
        className="absolute left-[6vw] top-[18vh] w-[40vw] h-[64vh] rounded-[28px] overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/deploy_image.jpg"
          alt="Ready to Deploy AI"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Text Block (Right) */}
      <div className="absolute left-[54vw] top-[30vh] w-[34vw] z-[4]">
        <span
          ref={labelRef}
          className="micro-label block mb-4"
          style={{ opacity: 0 }}
        >
          READY TO DEPLOY
        </span>
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6"
          style={{ opacity: 0 }}
        >
          Ready to Deploy
        </h2>
        <p
          ref={bodyRef}
          className="text-[#A7B1D8] leading-relaxed mb-8"
          style={{ opacity: 0 }}
        >
          We ship clean APIs, reproducible training pipelines, and runbooks your team can own. 
          From first model to hundredth, we keep delivery predictable.
        </p>
        
        {/* Status Pill */}
        <div
          ref={pillRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ 
            opacity: 0,
            background: 'rgba(79, 70, 229, 0.12)',
            border: '1px solid rgba(79, 70, 229, 0.35)'
          }}
        >
          <CheckCircle className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-white font-medium">Production-ready</span>
        </div>

        <div style={{ opacity: 0 }} ref={ctaRef}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 link-underline"
          >
            View delivery playbook
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeploySection;
