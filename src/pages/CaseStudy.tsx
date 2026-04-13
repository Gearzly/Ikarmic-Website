import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type CaseStudyData = {
  label: string;
  title: string;
  industry: string;
  service: string;
  serviceLink: string;
  headlineMetric: string;
  challenge: string;
  approach: string;
  technicalHighlights: string[];
  results: { metric: string; label: string }[];
};

const studies: Record<string, CaseStudyData> = {
  'support-automation': {
    label: 'SUPPORT AUTOMATION',
    title: 'Support Automation for Vantara Retail',
    industry: 'Retail',
    service: 'AI Chatbots',
    serviceLink: '/services/ai-chatbots',
    headlineMetric: '65% ticket deflection in 8 weeks',
    challenge:
      'Vantara Retail, a 200-store omnichannel retailer, was handling over 40,000 support tickets per month. Average first-response time exceeded 4 hours and support costs were climbing 15% year-over-year. Tier-1 queries — order status, returns, store hours — comprised 70% of total volume.',
    approach:
      "We deployed a multi-channel conversational AI system across the retailer's website, WhatsApp, and in-store kiosks. The bot was trained on 18 months of ticket data, integrated with the OMS and CRM, and designed with a confidence-based escalation loop that routed ambiguous queries to live agents with full context.",
    technicalHighlights: [
      'RAG pipeline over product catalog and FAQ knowledge base',
      'Intent classifier with 94% accuracy across 32 intent categories',
      'Confidence-threshold human escalation with context handoff',
      'Real-time analytics dashboard for support leads',
      'WhatsApp Business API integration with multilingual support',
    ],
    results: [
      { metric: '65%', label: 'Ticket deflection rate' },
      { metric: '<2 min', label: 'Median first response' },
      { metric: '$120K', label: 'Annual cost savings' },
      { metric: '4.6★', label: 'Customer satisfaction score' },
    ],
  },
  'demand-forecasting': {
    label: 'DEMAND FORECASTING',
    title: 'Demand Forecasting for Meridian Commerce',
    industry: 'Retail',
    service: 'Data Analytics',
    serviceLink: '/services/data-analytics',
    headlineMetric: '30% planning accuracy improvement',
    challenge:
      'Meridian Commerce, a multi-category retailer operating 120+ locations, struggled with chronic inventory imbalances — overstocking slow-movers while understocking high-demand SKUs. Planning teams relied on spreadsheet-based heuristics and seasonal intuition, resulting in a persistent 22% forecast error.',
    approach:
      'We built a time-series forecasting system combining gradient-boosted trees with a lightweight transformer ensemble. The model ingests POS data, promotional calendars, weather signals, and local events. Predictions refresh nightly and feed directly into the replenishment pipeline.',
    technicalHighlights: [
      'Ensemble model: LightGBM + temporal convolutional network',
      'Feature engineering: 60+ lag, rolling, and external features',
      'Automated retraining pipeline on Airflow with drift detection',
      'Integration with existing ERP replenishment module',
      'Explainability dashboards for category managers',
    ],
    results: [
      { metric: '30%', label: 'Forecast accuracy improvement' },
      { metric: '18%', label: 'Inventory waste reduction' },
      { metric: '12%', label: 'Revenue lift on key categories' },
      { metric: '4 wks', label: 'Time to first production model' },
    ],
  },
  'document-intelligence': {
    label: 'DOCUMENT INTELLIGENCE',
    title: 'Document Intelligence for Atlas Manufacturing',
    industry: 'Manufacturing',
    service: 'Business Automation',
    serviceLink: '/services/business-automation',
    headlineMetric: '70% fewer review cycles',
    challenge:
      'Atlas Manufacturing, a mid-market industrial components producer, processed 8,000+ supplier invoices monthly across three ERP instances. Manual data entry and approval routing took an average of 5 business days per invoice and consumed 4 FTEs.',
    approach:
      'We built an intelligent document pipeline that combines OCR, layout-aware NLP, and business-rule validation to extract, cross-reference, and route invoice data. A human-in-the-loop review queue handles low-confidence extractions, continuously improving model accuracy.',
    technicalHighlights: [
      'Layout-aware OCR with LayoutLM for structured field extraction',
      'Business-rule validation engine against PO and contract data',
      'Human-in-the-loop queue with active learning feedback loop',
      'Three-way match automation (PO → receipt → invoice)',
      'Dashboard with processing SLAs and exception reporting',
    ],
    results: [
      { metric: '70%', label: 'Fewer review cycles' },
      { metric: '4×', label: 'Processing speed increase' },
      { metric: '97%', label: 'First-pass accuracy' },
      { metric: '3 FTEs', label: 'Reallocated to higher-value work' },
    ],
  },
};

const CaseStudy = ({ slug }: { slug: string }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const data = studies[slug];

  useEffect(() => {
    if (!data) return;
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
  }, [data]);

  if (!data) return null;

  return (
    <main className="relative pt-20">
      <div className="ambient-orb" />

      {/* Hero */}
      <section ref={heroRef} className="relative py-20 lg:py-32" style={{ opacity: 0 }}>
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-[#A7B1D8] hover:text-white text-sm mb-8 transition-colors duration-300"
          >
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-600/20 rounded-full text-indigo-300 text-xs font-medium">
              {data.industry}
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-white/70 text-xs font-medium">
              {data.service}
            </span>
          </div>
          <span className="micro-label block mb-4">{data.label}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            {data.title}
          </h1>
          <p className="text-xl text-indigo-300 font-medium">{data.headlineMetric}</p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">THE CHALLENGE</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Business Context</h2>
          <p className="text-[#A7B1D8] leading-relaxed text-lg">{data.challenge}</p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">OUR APPROACH</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">What We Built</h2>
          <p className="text-[#A7B1D8] leading-relaxed text-lg">{data.approach}</p>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-4xl mx-auto">
          <span className="micro-label block mb-4">TECHNICAL HIGHLIGHTS</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">Under the Hood</h2>
          <ul className="space-y-4">
            {data.technicalHighlights.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span className="text-[#A7B1D8] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="fade-up relative py-16 lg:py-24 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-center">
          <span className="micro-label block mb-4">RESULTS &amp; IMPACT</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-12">Measurable Outcomes</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data.results.map((r) => (
              <div key={r.label} className="glass-card rounded-2xl p-6">
                <p className="text-3xl lg:text-4xl font-semibold text-indigo-400 mb-2">{r.metric}</p>
                <p className="text-[#A7B1D8] text-sm">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Service */}
      <section className="fade-up relative py-16 lg:py-24 bg-[#0B1022] border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <span className="micro-label block mb-4">RELATED SERVICE</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Learn More About {data.service}
          </h2>
          <p className="text-[#A7B1D8] leading-relaxed mb-8">
            Explore the service that powered this engagement and see how it can apply to your business.
          </p>
          <Link
            to={data.serviceLink}
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 link-underline"
          >
            Explore {data.service} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="fade-up relative py-20 lg:py-28 border-t border-white/5">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
            Tell us about your challenge. We'll scope a pilot designed for measurable impact.
          </p>
          <Link to="/contact" className="btn-primary inline-block">Schedule a Consultation</Link>
        </div>
      </section>
    </main>
  );
};

export default CaseStudy;
