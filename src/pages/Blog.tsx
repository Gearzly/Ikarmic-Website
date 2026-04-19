import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { getPosts, type SanityPost } from '../lib/sanity.queries';
import PageSeo from '../components/seo/PageSeo';

gsap.registerPlugin(ScrollTrigger);

function formatPublishedAt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function PostCard({ post, index }: { post: SanityPost; index: number }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 26, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          delay: index * 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="glass-card rounded-3xl flex flex-col overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Cover image — 16:9, always rendered */}
      <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden flex-shrink-0" tabIndex={-1} aria-hidden="true">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 via-[#0B1022] to-[#070A12]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/60 to-transparent" />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs text-[#A7B1D8] mb-4">
          <span className="inline-flex items-center rounded-full border border-indigo-400/35 text-indigo-300 px-2.5 py-1 tracking-wide uppercase">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-white mb-3 leading-snug">{post.title}</h2>
        <p className="text-[#A7B1D8] text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-xs text-[#8D99C9]">
            <CalendarDays className="w-3 h-3" />
            {formatPublishedAt(post.publishedAt)}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-indigo-300 hover:text-indigo-200 transition-colors duration-300"
          >
            Read article
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const Blog = () => {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.1 }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageSeo
        config={{
          title: 'Blog: AI Strategy, Product & Governance Insights',
          description:
            'Practical notes on building reliable AI products — from data strategy and model operations to human-centered implementation.',
          path: '/blog',
          keywords: 'AI blog, AI strategy, machine learning insights, AI governance, AI product engineering',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Ikarmic Blog',
            description:
              'Practical notes on building reliable AI products, from data strategy and model operations to human-centered implementation.',
            url: 'https://ikarmic.com/blog',
            publisher: {
              '@type': 'Organization',
              name: 'Ikarmic AI Services and Solutions',
              url: 'https://ikarmic.com',
            },
          },
        }}
      />

      <main className="min-h-screen bg-[#070A12] pt-32 pb-24 lg:pb-32">
        <div className="w-full px-6 lg:px-12">
          {/* Heading */}
          <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-16" style={{ opacity: 0 }}>
            <span className="micro-label block mb-4">INSIGHTS</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-5">
              From the Ikarmic Blog
            </h1>
            <p className="text-[#A7B1D8] text-lg leading-relaxed">
              Practical notes on building reliable AI products — from data strategy and model
              operations to human-centered implementation.
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
              {[0, 1, 2].map((i) => (
                <div key={i} className="glass-card rounded-3xl p-6 space-y-4 animate-pulse">
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                  <div className="h-5 bg-white/10 rounded w-4/5" />
                  <div className="h-5 bg-white/10 rounded w-3/5" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-white/10 rounded" />
                    <div className="h-3 bg-white/10 rounded" />
                    <div className="h-3 bg-white/10 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[#A7B1D8] text-lg mb-6">No posts published yet.</p>
              <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Post grid */}
          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Blog;
