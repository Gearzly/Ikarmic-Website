import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { getPost, type SanityPost } from '../lib/sanity.queries';
import PageSeo from '../components/seo/PageSeo';
import { SITE_URL } from '../lib/seo';

gsap.registerPlugin();

function formatPublishedAt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#B8C0DC] leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500/50 pl-5 my-6 text-[#A7B1D8] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-5 mb-5 space-y-2 text-[#B8C0DC]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 mb-5 space-y-2 text-[#B8C0DC]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[#0F1420] text-indigo-300 rounded px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    code: ({ value }) => (
      <pre className="bg-[#0A0E1A] border border-gray-800 rounded-xl p-5 overflow-x-auto my-6">
        <code className="text-sm font-mono text-[#c9d1f0]">{value.code}</code>
      </pre>
    ),
    image: ({ value }) => {
      const src: string = value?.asset?.url ?? '';
      if (!src) return null;
      return (
        <figure className="my-8">
          <img
            src={src}
            alt={value?.alt ?? ''}
            className="w-full rounded-2xl"
            loading="lazy"
          />
          {value?.caption && (
            <figcaption className="text-center text-sm text-[#8D99C9] mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    getPost(slug).then((data) => {
      if (!data) {
        navigate('/blog', { replace: true });
        return;
      }
      setPost(data);
      setLoading(false);
    });
  }, [slug, navigate]);

  useEffect(() => {
    if (!post || !contentRef.current) return;
    const el = contentRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }, el);
    return () => ctx.revert();
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A12] pt-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-24 mb-8" />
          <div className="h-10 bg-white/10 rounded w-3/4" />
          <div className="h-10 bg-white/10 rounded w-1/2" />
          <div className="h-3 bg-white/10 rounded w-40 mt-6" />
          <div className="space-y-3 mt-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-3 bg-white/10 rounded ${i % 3 === 2 ? 'w-4/5' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <PageSeo
        config={{
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          type: 'article',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            url: canonicalUrl,
            ...(post.coverImage ? { image: post.coverImage } : {}),
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
          <div ref={contentRef} className="max-w-3xl mx-auto" style={{ opacity: 0 }}>
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#A7B1D8] hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              All posts
            </Link>

            {/* Cover image */}
            {post.coverImage && (
              <div className="rounded-2xl overflow-hidden mb-10">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 object-cover"
                  loading="eager"
                />
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full border border-indigo-400/35 text-indigo-300 text-xs px-2.5 py-1 tracking-wide uppercase">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#8D99C9]">
                <CalendarDays className="w-3.5 h-3.5" />
                {formatPublishedAt(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#8D99C9]">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8">
              {post.title}
            </h1>

            {/* Body */}
            <div className="border-t border-white/5 pt-8">
              {post.body ? (
                <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
              ) : (
                <p className="text-[#A7B1D8]">{post.excerpt}</p>
              )}
            </div>

            {/* Footer CTA */}
            <div
              className="mt-16 p-8 rounded-3xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.12) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <p className="text-lg font-semibold text-white mb-2">Ready to ship AI that works?</p>
              <p className="text-[#A7B1D8] text-sm mb-6">
                Talk to our team about your project and we'll get back with a clear plan within 24 hours.
              </p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Start a conversation
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPost;
