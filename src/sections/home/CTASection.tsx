import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin } from 'lucide-react';
import { notifyLead } from '../../lib/openclaw';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCtaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const payload = new URLSearchParams(
        Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
      ).toString();

      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
      });

      form.reset();
      setIsSubmitted(true);
      notifyLead({
        name: formData.get('name') as string || '',
        email: formData.get('email') as string || '',
        company: formData.get('company') as string || '',
        message: formData.get('message') as string || '',
        source: 'home-cta',
      });
    } catch (error) {
      console.error('CTA form submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!section || !content || !form) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(content,
        { opacity: 0, x: '-6vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { opacity: 0, x: '6vw', scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32"
      style={{
        zIndex: 80,
        backgroundColor: '#070A12',
        borderTop: '1px solid rgba(244, 246, 255, 0.05)'
      }}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Let's build something precise.
            </h2>
            <p className="text-[#A7B1D8] leading-relaxed mb-10 max-w-md">
              Tell us what you're shipping. We'll reply within two business days with next steps.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-[#A7B1D8] uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href="mailto:hello@ikarmic.ai"
                    className="text-white hover:text-indigo-400 transition-colors duration-300"
                  >
                    hello@ikarmic.ai
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-[#A7B1D8] uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-white">Bengaluru, India (Remote-first)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div
            ref={formRef}
            className="glass-card rounded-[28px] p-6 lg:p-8"
            style={{ opacity: 0 }}
          >
            {isSubmitted ? (
              <div className="py-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Thanks, we received your request.</h3>
                <p className="text-[#A7B1D8] mb-6">Our team usually replies within two business days.</p>
                <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                  Add project details
                </Link>
              </div>
            ) : (
            <form
              className="space-y-5"
              onSubmit={handleCtaSubmit}
              name="home-cta"
              method="POST"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="home-cta" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#A7B1D8] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#A7B1D8] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#A7B1D8] mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A7B1D8] mb-2">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-center block"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
