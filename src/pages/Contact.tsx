import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const location = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('submitted') === '1') {
      setIsSubmitted(true);
    }
  }, [location.search]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Info animation
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = new URLSearchParams({
      'form-name': 'contact-consultation',
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
    }).toString();

    try {
      await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: payload
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@ikarmic.ai',
      href: 'mailto:info@ikarmic.ai'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 80 4209 0099',
      href: 'tel:+918042090099'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru, India (Remote-first delivery)',
      href: null
    }
  ];

  return (
    <main className="relative pt-20">
      {/* Ambient Orb */}
      <div className="ambient-orb" />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 lg:py-28"
        style={{ opacity: 0 }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="micro-label block mb-6">GET IN TOUCH</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
              Let's Start a Conversation
            </h1>
            <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto">
              Ready to explore how AI can transform your business? Contact Ikarmic AI
              Services and Solutions today and our AI experts will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className="relative py-16 lg:py-24"
        style={{
          backgroundColor: '#0B1022',
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left - Contact Info */}
              <div ref={infoRef} className="lg:col-span-2" style={{ opacity: 0 }}>
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Contact Information
                </h2>
                <p className="text-[#A7B1D8] leading-relaxed mb-8">
                  Fill out the form and our AI experts will contact you within
                  24 hours to discuss your project.
                </p>
                <p className="text-sm text-[#A7B1D8] mb-8">
                  Typical discovery calls are 30 minutes and include feasibility guidance,
                  timeline ranges, and recommended next steps.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-[#A7B1D8] uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white hover:text-indigo-400 transition-colors duration-300"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Working Hours */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <h3 className="text-sm font-medium text-white mb-4">Working Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#A7B1D8]">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7B1D8]">Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A7B1D8]">Sunday</span>
                      <span className="text-white">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div
                ref={formRef}
                className="lg:col-span-3"
                style={{ opacity: 0 }}
              >
                <div className="glass-card rounded-3xl p-6 lg:p-8">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Request a Consultation
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-[#A7B1D8]">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      name="contact-consultation"
                      method="POST"
                      data-netlify="true"
                    >
                      <input type="hidden" name="form-name" value="contact-consultation" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm text-[#A7B1D8] mb-2">
                            Name <span className="text-indigo-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#A7B1D8] mb-2">
                            Email <span className="text-indigo-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm text-[#A7B1D8] mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                            placeholder="Your company"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#A7B1D8] mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                            placeholder="+91 80 4209 0099"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#A7B1D8] mb-2">
                          Message <span className="text-indigo-400">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 resize-none"
                          placeholder="Tell us about your project and how we can help..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
