import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Home, MessageSquare, BookOpen } from 'lucide-react';

const quickLinks = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: MessageSquare, label: 'Contact Us', path: '/contact' },
  { icon: BookOpen, label: 'Blog', path: '/blog' },
];

const NotFound = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative pt-20 min-h-[80vh] flex items-center">
      <div className="ambient-orb" />

      <div ref={heroRef} className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center py-24" style={{ opacity: 0 }}>
        <span className="micro-label block mb-6">PAGE NOT FOUND</span>

        <h1 className="text-8xl sm:text-[10rem] font-semibold text-white leading-none mb-4 tabular-nums"
          aria-label="Error 404">
          404
        </h1>

        <p className="text-xl text-[#A7B1D8] max-w-md mx-auto mb-4 leading-relaxed">
          This page doesn't exist or has been moved.
        </p>
        <p className="text-sm text-[#A7B1D8]/60 mb-12">
          Check the URL, or use one of the links below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 text-sm font-medium text-[#A7B1D8] hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>

        <div className="border-t border-white/5 pt-12">
          <p className="text-xs font-medium text-[#A7B1D8]/40 uppercase tracking-wider mb-6">
            Helpful pages
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {quickLinks.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm text-[#A7B1D8] hover:text-white transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
