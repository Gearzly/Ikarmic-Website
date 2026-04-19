import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Grid } from '@/components/layout/Grid';
import { SectionContainer } from '@/components/layout/Container';
import { getPosts, type SanityPost } from '../../lib/sanity.queries';

gsap.registerPlugin(ScrollTrigger);

type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  path: string;
  coverImage?: string | null;
};

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: 'How to De-risk an AI Pilot in 30 Days',
    excerpt: 'A practical blueprint for aligning stakeholders, defining data readiness, and launching your first production experiment.',
    category: 'Strategy',
    publishedAt: 'Apr 08, 2026',
    readTime: '7 min read',
    path: '/blog',
    coverImage: null
  },
  {
    title: 'Human-in-the-Loop Design Patterns That Scale',
    excerpt: 'Patterns we use to keep operators in control while increasing automation confidence across support and operations.',
    category: 'Product',
    publishedAt: 'Mar 21, 2026',
    readTime: '6 min read',
    path: '/blog',
    coverImage: null
  },
  {
    title: 'Shipping AI Features Without Breaking Trust',
    excerpt: 'A concise checklist for governance, observability, and user communication before any model-driven feature rollout.',
    category: 'Governance',
    publishedAt: 'Mar 03, 2026',
    readTime: '5 min read',
    path: '/blog',
    coverImage: null
  }
];

function sanityToDisplay(p: SanityPost): BlogPost {
  let date = p.publishedAt;
  try {
    date = new Date(p.publishedAt).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { /* keep raw */ }
  return {
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    publishedAt: date,
    readTime: p.readTime,
    path: `/blog/${p.slug}`,
    coverImage: p.coverImage ?? null,
  };
}

const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>(PLACEHOLDER_POSTS);

  useEffect(() => {
    getPosts().then((data) => {
      if (data.length > 0) {
        setPosts(data.slice(0, 3).map(sanityToDisplay));
      }
    });
  }, []);

  // Heading animation — runs once
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
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
    });
    return () => ctx.revert();
  }, []);

  // Cards animation — re-runs when posts change so Sanity replacements are visible
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
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
  }, [posts]);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative bg-background border-t border-white/5"
      style={{ zIndex: 75 }}
    >
      <SectionContainer>
        <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-12" style={{ opacity: 0 }}>
          <span className="text-micro block mb-4">INSIGHTS</span>
          <h2 className="h3 text-white mb-5">
            From the Ikarmic Blog
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Practical notes on building reliable AI products, from data strategy and model operations to human-centered implementation.
          </p>
        </div>

        <Grid cols="3" gap="lg">
          {posts.map((post, index) => (
            <article
              key={post.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="glass rounded-2xl flex flex-col overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Cover image or gradient placeholder */}
              <Link to={post.path} className="block relative aspect-[16/9] overflow-hidden flex-shrink-0" tabIndex={-1} aria-hidden="true">
                {post.coverImage ? (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 via-[#0B1022] to-[#070A12]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/60 to-transparent" />
              </Link>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">
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
              </div>
            </article>
          ))}
        </Grid>

        <div className="text-center mt-10">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300">
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
};

export default BlogSection;