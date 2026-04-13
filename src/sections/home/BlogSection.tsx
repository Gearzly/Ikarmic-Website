import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  path: string;
};

const posts: BlogPost[] = [
  {
    title: 'How to De-risk an AI Pilot in 30 Days',
    excerpt: 'A practical blueprint for aligning stakeholders, defining data readiness, and launching your first production experiment.',
    category: 'Strategy',
    publishedAt: 'Apr 08, 2026',
    readTime: '7 min read',
    path: '/services'
  },
  {
    title: 'Human-in-the-Loop Design Patterns That Scale',
    excerpt: 'Patterns we use to keep operators in control while increasing automation confidence across support and operations.',
    category: 'Product',
    publishedAt: 'Mar 21, 2026',
    readTime: '6 min read',
    path: '/about'
  },
  {
    title: 'Shipping AI Features Without Breaking Trust',
    excerpt: 'A concise checklist for governance, observability, and user communication before any model-driven feature rollout.',
    category: 'Governance',
    publishedAt: 'Mar 03, 2026',
    readTime: '5 min read',
    path: '/contact'
  }
];

const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 26, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: index * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      style={{
        zIndex: 75,
        backgroundColor: '#0A0F1F',
        borderTop: '1px solid rgba(244, 246, 255, 0.05)'
      }}
    >
      <div className="w-full px-6 lg:px-12">
        <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-12" style={{ opacity: 0 }}>
          <span className="micro-label block mb-4">INSIGHTS</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5">
            From the Ikarmic Blog
          </h2>
          <p className="text-[#A7B1D8] leading-relaxed">
            Practical notes on building reliable AI products, from data strategy and model operations to human-centered implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <article
              key={post.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="glass-card rounded-3xl p-6 flex flex-col"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between text-xs text-[#A7B1D8] mb-4">
                <span className="inline-flex items-center rounded-full border border-indigo-400/35 text-indigo-300 px-2.5 py-1 tracking-wide uppercase">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 leading-snug">{post.title}</h3>
              <p className="text-[#A7B1D8] text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[#8D99C9]">{post.publishedAt}</span>
                <Link
                  to={post.path}
                  className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors duration-300"
                >
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
            Request full case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;