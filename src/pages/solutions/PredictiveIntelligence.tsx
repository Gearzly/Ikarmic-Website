import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, AlertTriangle, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: TrendingUp,
    title: 'Demand Forecasting',
    description: 'Predict inventory needs, staffing requirements, and revenue by product line weeks ahead — reducing waste and stockouts.',
  },
  {
    icon: Users,
    title: 'Churn Prediction',
    description: 'Score every customer account by flight risk and trigger proactive retention workflows before revenue walks out the door.',
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly & Fraud Detection',
    description: 'Real-time signals on financial transactions, system events, and operational data that fall outside expected patterns.',
  },
  {
    icon: DollarSign,
    title: 'Dynamic Pricing & Revenue Optimization',
    description: 'Margin-aware pricing models that respond to demand signals, competitor moves, and inventory levels automatically.',
  },
];

const relatedServices = [
  { name: 'AI Data Analytics & Predictive Intelligence', path: '/services/data-analytics' },
  { name: 'Generative AI Solutions', path: '/services/generative-ai' },
];

const outcomes = [
  { metric: '25%', label: 'Forecast accuracy improvement' },
  { metric: '40%', label: 'Faster insight-to-decision' },
  { metric: '18%', label: 'Inventory waste reduction' },
  { metric: '3×', label: 'Analyst productivity' },
];

const PredictiveIntelligence = () => {
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
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.05, ease: 'power2.out',
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
          <span className="micro-label block mb-6">PREDICTIVE INTELLIGENCE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            See What's Coming Before It Arrives
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            We build predictive models and analytics pipelines that surface demand signals, churn
            risk, and operational anomalies — so your team acts on foresight, not hindsight.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Analytics Project
          </Link>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="micro-label block mb-4">THE CHALLENGE</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Decisions Made on Last Month's Data
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Most teams rely on lagging reports: what sold last month, which customers churned
                last quarter, where exceptions happened last week. By the time the insight arrives,
                the moment to act has passed.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Forward-Looking Models Embedded in Operations
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Predictive AI ingests your operational and historical data to generate probability
                scores, forecasts, and early-warning alerts. Wired into your dashboards and
                workflows, it turns analytics into action — automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            How We Build Predictive Intelligence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Data Readiness Audit', detail: 'We assess data completeness, quality, and latency across your sources. Gaps are addressed before model development begins — garbage in, garbage out is not an option.' },
              { step: '02', title: 'Model Development & Validation', detail: 'Feature engineering, model selection, and backtesting against held-out historical data. We report accuracy, confidence intervals, and failure modes transparently.' },
              { step: '03', title: 'Dashboard & Workflow Integration', detail: 'Predictions surface in Tableau, Power BI, or custom dashboards — and trigger automated actions in your CRM, ERP, or notification stack.' },
            ].map((s) => (
              <article key={s.step} className="glass-card rounded-2xl p-6">
                <span className="text-indigo-400 font-mono text-sm">{s.step}</span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-3">{s.title}</h3>
                <p className="text-[#A7B1D8] text-sm leading-relaxed">{s.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">USE CASES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">
            Where Prediction Changes Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div key={uc.title} className="glass-card rounded-2xl p-6 flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{uc.title}</h3>
                    <p className="text-[#A7B1D8] text-sm leading-relaxed">{uc.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">OUTCOMES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">
            Measurable Impact
          </h2>
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

      {/* Related Services */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">RELATED SERVICES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">
            The Technology Behind This Solution
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {relatedServices.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="flex items-center gap-3 px-6 py-4 glass-card rounded-xl hover:border-indigo-500/30 border border-transparent transition-colors duration-200 group"
              >
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-white text-sm">{s.name}</span>
                <ArrowRight className="w-4 h-4 text-indigo-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready to Make Data-Driven Decisions?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us what you're trying to predict and what data you have. We'll design a model
            architecture and get you to your first accurate forecast in weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PredictiveIntelligence;
