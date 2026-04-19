import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageSquare,
  GitBranch,
  TrendingUp,
  Megaphone,
  Server,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const solutions = [
  {
    icon: MessageSquare,
    title: 'CX & Support AI',
    path: '/solutions/cx-support-ai',
    description:
      'Deflect routine tickets with AI-powered conversations, omnichannel chat, and intelligent escalation that routes complex cases to the right agent with full context.',
    outcomes: ['60% ticket deflection', '35% support cost reduction', '4.6★ satisfaction'],
  },
  {
    icon: GitBranch,
    title: 'Intelligent Automation',
    path: '/solutions/intelligent-automation',
    description:
      'Replace manual back-office work with AI that reads documents, routes emails, and orchestrates multi-step workflows — reliably, around the clock.',
    outcomes: ['80% processing time reduction', '95%+ extraction accuracy', '3× throughput'],
  },
  {
    icon: TrendingUp,
    title: 'Predictive Intelligence',
    path: '/solutions/predictive-intelligence',
    description:
      'Surface demand signals, churn risk, and operational anomalies before they become problems — with forecasting models wired directly into your dashboards.',
    outcomes: ['25% forecast accuracy improvement', '40% faster decisions', '3× analyst productivity'],
  },
  {
    icon: Megaphone,
    title: 'AI-Powered Marketing',
    path: '/solutions/ai-powered-marketing',
    description:
      'Scale content production, score leads intelligently, and automate campaign logic — so your marketing team focuses on strategy, not repetitive execution.',
    outcomes: ['4× content velocity', '30% conversion improvement', '<3 wks to production'],
  },
  {
    icon: Server,
    title: 'Enterprise AI Platform',
    path: '/solutions/enterprise-ai-platform',
    description:
      'Build the infrastructure layer that turns AI experiments into reliable, scalable systems your organisation owns — with full IP transfer and team enablement.',
    outcomes: ['8 wks POC-to-production', '99.9% model uptime', '100% IP ownership'],
  },
];

const Solutions = () => {
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
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
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
          <span className="micro-label block mb-6">SOLUTIONS</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            AI Built Around the Problem, Not the Technology
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            Every solution we deliver is framed around a business outcome — whether that's cutting
            support costs, automating back-office work, forecasting demand, or scaling marketing.
            The technology is the means, not the end.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Project
          </Link>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">ALL SOLUTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">
            Five Areas Where We Deliver Measurable Outcomes
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <article key={sol.path} className="fade-up glass-card rounded-2xl p-8 flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{sol.title}</h3>
                      <p className="text-[#A7B1D8] text-sm leading-relaxed">{sol.description}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {sol.outcomes.map((o) => (
                      <li
                        key={o}
                        className="px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-xs"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={sol.path}
                    className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors duration-200 mt-auto"
                  >
                    Explore solution <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="micro-label block mb-4">WHY IKARMIC</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
                Delivery Partners, Not Tool Vendors
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed mb-6">
                We don't hand you a SaaS subscription and walk away. Every engagement ends with
                your team owning the system — runbooks, transfer sessions, and architecture
                documentation included.
              </p>
              <p className="text-[#A7B1D8] leading-relaxed">
                Our model is to build alongside your engineers and operators, transfer knowledge
                throughout delivery, and leave you with a system you understand and can evolve.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { metric: '4–8 wks', label: 'Typical pilot duration' },
                { metric: '5', label: 'Core solution playbooks' },
                { metric: '4', label: 'Industries supported' },
                { metric: '2 days', label: 'Response SLA' },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                  <p className="text-2xl lg:text-3xl font-semibold text-indigo-400 mb-1">{s.metric}</p>
                  <p className="text-[#A7B1D8] text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Not Sure Which Solution Fits?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us the business problem you're trying to solve. We'll identify the right approach
            and scope a pilot together.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Start the Conversation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Solutions;
