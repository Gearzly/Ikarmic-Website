import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    index: 0,
    label: 'INTELLIGENCE BUILT IN',
    title: 'Intelligence Built In',
    body: 'We embed models into your product so predictions feel like features—not add-ons. From ranking to forecasting, everything is built for latency, scale, and clarity.',
    cta: { text: 'See how we build', to: '/services' },
    image: '/images/street_scene_bg.webp',
    imageAlt: 'Intelligence Built In',
    pill: null,
  },
  {
    index: 1,
    label: 'ADAPTIVE SYSTEMS',
    title: 'Adaptive Systems',
    body: 'Markets change. Data drifts. We design feedback loops, retraining pipelines, and monitoring that keeps models accurate—and teams informed.',
    cta: { text: 'Explore adaptability', to: '/services' },
    image: '/images/adaptive_image.webp',
    imageAlt: 'Adaptive AI Systems',
    pill: null,
  },
  {
    index: 2,
    label: 'HUMAN-CENTERED',
    title: 'Human-Centered',
    body: 'Great AI is invisible. We design explanations, confidence signals, and safe defaults so users feel in control—every interaction.',
    cta: { text: 'See our principles', to: '/about' },
    image: '/images/human_centered_image.webp',
    imageAlt: 'Human-Centered AI',
    pill: null,
  },
  {
    index: 3,
    label: 'ETHICAL BY DESIGN',
    title: 'Ethical by Design',
    body: 'We build with bias checks, privacy guardrails, and clear governance from day one. Compliance isn\'t a finish line—it\'s a baseline.',
    cta: { text: 'Read our approach', to: '/about' },
    image: '/images/ethical_image.webp',
    imageAlt: 'Ethical AI Design',
    pill: null,
  },
  {
    index: 4,
    label: 'READY TO DEPLOY',
    title: 'Ready to Deploy',
    body: 'We ship clean APIs, reproducible training pipelines, and runbooks your team can own. From first model to hundredth, we keep delivery predictable.',
    cta: { text: 'Our services', to: '/services' },
    image: '/images/deploy_image.webp',
    imageAlt: 'Ready to Deploy AI',
    pill: null,
  },
];

const AUTO_INTERVAL = 4500;

const ValuePropsSection = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const switchTo = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);

    const img = imageRef.current;
    const content = contentRef.current;
    if (!img || !content) {
      setActive(next);
      setAnimating(false);
      return;
    }

    // Fade out current
    gsap.to([content, img], {
      opacity: 0,
      y: -12,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActive(next);
        // Fade in new
        gsap.fromTo(
          [content, img],
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            ease: 'power2.out',
            stagger: 0.05,
            onComplete: () => setAnimating(false),
          }
        );
      },
    });
  }, [animating]);

  // Auto-cycle
  useEffect(() => {
    const start = () => {
      timerRef.current = setInterval(() => {
        if (!pausedRef.current) {
          setActive(prev => {
            const next = (prev + 1) % ITEMS.length;
            switchTo(next);
            return prev; // actual state set inside switchTo
          });
        }
      }, AUTO_INTERVAL);
    };
    start();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [switchTo]);

  // Progress bar animation per active item
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: AUTO_INTERVAL / 1000 - 0.2, ease: 'none' });
  }, [active]);

  // Entrance animation on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const item = ITEMS[active];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: '#070A12', borderTop: '1px solid rgba(244,246,255,0.05)', opacity: 0 }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Tab list — top navigation */}
        <div
          className="flex items-center gap-1 sm:gap-2 flex-wrap mb-10 lg:mb-14"
          role="tablist"
          aria-label="Company values"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {ITEMS.map((it) => (
            <div key={it.index} className="relative pb-[3px]">
              <button
                role="tab"
                aria-selected={active === it.index}
                aria-controls={`valueprop-panel-${it.index}`}
                id={`valueprop-tab-${it.index}`}
                onClick={() => {
                  if (timerRef.current) clearInterval(timerRef.current);
                  switchTo(it.index);
                  // restart timer
                  timerRef.current = setInterval(() => {
                    if (!pausedRef.current) {
                      setActive(prev => {
                        const next = (prev + 1) % ITEMS.length;
                        switchTo(next);
                        return prev;
                      });
                    }
                  }, AUTO_INTERVAL);
                }}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  active === it.index
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40'
                    : 'text-[#A7B1D8] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="hidden sm:inline">{it.title}</span>
                <span className="sm:hidden">{it.index + 1}</span>
              </button>

              {/* Progress underline — below the button, not inside it */}
              {active === it.index && (
                <span
                  ref={progressRef}
                  className="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-400 origin-left rounded-full"
                  style={{ transform: 'scaleX(0)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Panel */}
        <div
          id={`valueprop-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`valueprop-tab-${active}`}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left — content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              {item.title}
            </h2>
            <p className="text-[#A7B1D8] leading-relaxed mb-8 text-lg max-w-lg">
              {item.body}
            </p>

            <Link
              to={item.cta.to}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 link-underline"
            >
              {item.cta.text}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Right — image */}
          <div ref={imageRef} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1184}
                height={864}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Dot indicators — mobile quick-nav */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:hidden" aria-hidden="true">
          {ITEMS.map((it) => (
            <button
              key={it.index}
              onClick={() => switchTo(it.index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active === it.index ? 'bg-indigo-400 w-5' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
