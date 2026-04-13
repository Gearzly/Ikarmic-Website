import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart3, TrendingUp, AlertTriangle, ShoppingCart, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: TrendingUp,
    title: 'Demand Forecasting',
    description: 'Predict sales volume, inventory needs, and capacity with time-series models that learn from seasonality and market signals.',
  },
  {
    icon: BarChart3,
    title: 'Churn Prediction',
    description: 'Identify at-risk customers before they leave and trigger retention workflows automatically.',
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly & Fraud Detection',
    description: 'Surface outliers in transactions, sensor data, or user behavior in real time with explainable alerts.',
  },
  {
    icon: ShoppingCart,
    title: 'Pricing Optimization',
    description: 'Dynamic pricing models that balance margin, demand elasticity, and competitive positioning.',
  },
];

const integrations = [
  'Data Warehouses (Snowflake, BigQuery, Redshift)',
  'BI Tools (Tableau, Power BI, Looker)',
  'Cloud Pipelines (Airflow, dbt, Dagster)',
  'Event Streams (Kafka, Kinesis)',
  'CRM & ERP Systems',
  'Custom REST / GraphQL APIs',
];

const outcomes = [
  { metric: '25%', label: 'Forecast accuracy improvement' },
  { metric: '40%', label: 'Faster insight-to-decision' },
  { metric: '18%', label: 'Inventory waste reduction' },
  { metric: '3×', label: 'Analyst productivity gain' },
];

const DataAnalytics = () => {
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
          <span className="micro-label block mb-6">AI DATA ANALYTICS &amp; PREDICTIVE INTELLIGENCE</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
            From Data to Decisions, Faster
          </h1>
          <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto mb-10">
            Turn raw data into forecasts, anomaly alerts, and strategic insights with production-grade
            analytics models and clear explanations.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Discuss Your Analytics Goals
          </Link>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="micro-label block mb-4">THE CHALLENGE</span>
              <h2 className="text-3xl font-semibold text-white mb-4">Decisions Still Run on Gut Feel</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Most companies sit on vast data stores but lack the models and pipelines to translate
                that data into actionable forecasts. By the time insights reach decision-makers they're
                stale.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">THE OPPORTUNITY</span>
              <h2 className="text-3xl font-semibold text-white mb-4">Real-Time Predictive Edge</h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                Predictive models that surface insights continuously — in dashboards, alerts, and
                downstream systems — allow teams to act early on opportunities and risks alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">How We Build Analytics Systems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Data Readiness Audit', detail: 'We assess quality, freshness, and coverage of your data sources before committing to a model strategy.' },
              { step: '02', title: 'Model Development', detail: 'Time-series, classification, and anomaly detection models built with explainability and drift monitoring baked in.' },
              { step: '03', title: 'Dashboard & Integration', detail: 'Insights surfaced through BI dashboards, automated alerts, and API endpoints for downstream decision systems.' },
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-10">Where Analytics Delivers</h2>
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

      {/* Integration Points */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <span className="micro-label block mb-4">INTEGRATIONS</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-8">Connects With Your Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((name) => (
              <div key={name} className="flex items-center gap-3 px-5 py-4 glass-card rounded-xl">
                <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-white text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">OUTCOMES</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-12">Measurable Impact</h2>
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
      <section className="fade-up relative py-20 lg:py-28 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Ready to Predict What's Next?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Share your data challenge. We'll assess readiness and scope a model that delivers ROI
            within weeks.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default DataAnalytics;
