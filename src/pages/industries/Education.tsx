import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Sparkles, Bot, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  'One-size-fits-all curricula fail to keep diverse learners engaged.',
  'Faculty spend 40%+ of their time on repetitive assessment tasks.',
  'Administrative back-offices operate on manual, paper-heavy workflows.',
  'Data-rich platforms underuse the signals that could improve student outcomes.',
];

const services = [
  { icon: Sparkles, title: 'Generative AI', detail: 'Adaptive learning paths, auto-generated quizzes, and AI tutoring assistants.', path: '/services/generative-ai' },
  { icon: Bot, title: 'AI Chatbots', detail: 'Multilingual student-support bots for admissions, financial aid, and campus services.', path: '/services/ai-chatbots' },
  { icon: Wrench, title: 'Custom AI', detail: 'Predictive retention models and curriculum-effectiveness analytics.', path: '/services/custom-ai' },
];

const useCases = [
  'AI-powered tutoring that adapts difficulty in real time',
  '24/7 admissions chatbot handling 80% of routine queries',
  'Early-warning system flagging at-risk students before midterms',
];

const outcomes = [
  { metric: '28%', label: 'Higher course-completion rate' },
  { metric: '60%', label: 'Query deflection via chatbot' },
  { metric: '2×', label: 'Content creation speed for educators' },
  { metric: '4.5★', label: 'Student satisfaction score' },
];

const Education = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      document.querySelectorAll('.fade-up').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative pt-20">
      <div className="ambient-orb" />

      {/* Hero */}
      <section ref={heroRef} className="relative py-20 lg:py-32" style={{ opacity: 0 }}>
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-indigo-400" />
          </div>
          <span className="micro-label block mb-6">AI FOR EDUCATION</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            Personalized Learning at Scale
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            We help education organizations deliver adaptive learning experiences, automate
            administrative tasks, and surface actionable student insights — ethically and at scale.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Talk to Us About Education AI</Link>
        </div>
      </section>

      {/* Key Challenges */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">KEY CHALLENGES</span>
          <h2 className="text-3xl font-semibold text-white mb-8">What Education Teams Face</h2>
          <ul className="space-y-4">
            {challenges.map((c) => (
              <li key={c} className="flex items-start gap-4">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span className="text-[#A7B1D8] leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How Ikarmic Helps */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">HOW WE HELP</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">Services Mapped to Education</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.title} to={s.path} className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-colors duration-300 block">
                  <Icon className="w-8 h-8 text-indigo-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{s.detail}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">USE CASES</span>
          <h2 className="text-3xl font-semibold text-white mb-8">Education AI in Action</h2>
          <ul className="space-y-4">
            {useCases.map((uc) => (
              <li key={uc} className="flex items-start gap-4">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span className="text-[#A7B1D8] leading-relaxed">{uc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Outcomes */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">OUTCOMES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">Measurable Education Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o) => (
              <div key={o.label} className="glass-card rounded-2xl p-6">
                <p className="text-3xl lg:text-4xl font-semibold text-indigo-400 mb-2">{o.metric}</p>
                <p className="text-[#A7B1D8] text-sm">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">Ready to Elevate Learning?</h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">Tell us about your education initiatives and we'll map the AI solutions that improve student outcomes.</p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default Education;
