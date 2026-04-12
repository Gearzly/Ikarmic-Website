import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MessageSquare,
  Bot,
  BarChart3,
  Sparkles,
  Code2,
  FileText,
  Settings,
  TrendingUp,
  ShoppingBag,
  CheckCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const mainServices = [
  {
    icon: Bot,
    title: 'AI Chatbots & Conversational AI',
    description: 'Deploy intelligent chatbots that handle customer interactions across websites, WhatsApp, and messaging platforms. Our conversational AI systems provide instant responses, improve customer support, and reduce operational costs.',
    features: [
      'Website chatbots',
      'WhatsApp chatbots',
      'Multilingual chatbots',
      'AI customer service agents',
      'Voice assistants'
    ],
    benefits: [
      '24/7 customer support',
      'Faster response times',
      'Reduced support costs'
    ]
  },
  {
    icon: Settings,
    title: 'AI Business Automation',
    description: 'Automate business processes and eliminate repetitive tasks using AI-driven automation. From document processing to operational workflows, we help businesses streamline processes and increase efficiency.',
    features: [
      'Workflow automation',
      'Document processing automation',
      'Email and communication automation',
      'Operations management automation'
    ],
    benefits: [
      'Improved efficiency',
      'Reduced operational costs',
      'Faster business processes'
    ]
  },
  {
    icon: BarChart3,
    title: 'AI Data Analytics & Predictive Intelligence',
    description: 'Use advanced AI models to turn data into strategic insights. Our AI models analyze trends, forecast outcomes, and help companies make data-driven decisions.',
    features: [
      'Sales forecasting',
      'Customer behavior analysis',
      'Risk and fraud detection',
      'Demand forecasting'
    ],
    benefits: [
      'Better decision-making',
      'Data-driven business strategy',
      'Improved operational performance'
    ]
  },
  {
    icon: Sparkles,
    title: 'Generative AI Solutions',
    description: 'Unlock creativity and productivity with generative AI technologies. Leverage generative AI to automate content creation, marketing, product descriptions, and knowledge management systems.',
    features: [
      'AI content generation',
      'AI marketing automation',
      'AI knowledge assistants',
      'AI-powered business tools'
    ],
    benefits: [
      'Faster content production',
      'Improved marketing efficiency',
      'Automated knowledge systems'
    ]
  },
  {
    icon: Code2,
    title: 'Custom AI Development',
    description: 'Every business is unique. Our custom AI development services deliver tailored solutions designed to meet specific business needs across multiple industries.',
    features: [
      'AI-powered software platforms',
      'Intelligent enterprise applications',
      'AI SaaS products',
      'Custom machine learning models'
    ],
    benefits: [
      'Tailored to your needs',
      'Scalable architecture',
      'Full ownership and control'
    ]
  }
];

const solutions = [
  {
    icon: MessageSquare,
    title: 'Customer Support Automation',
    description: 'AI chatbots and voice assistants provide 24/7 support and handle thousands of customer queries efficiently.'
  },
  {
    icon: TrendingUp,
    title: 'Predictive Business Intelligence',
    description: 'Use AI-powered analytics to forecast demand, identify trends, and optimize business strategy.'
  },
  {
    icon: FileText,
    title: 'Intelligent Document Processing',
    description: 'Automatically extract and process information from invoices, forms, and documents.'
  },
  {
    icon: ShoppingBag,
    title: 'Marketing Automation',
    description: 'Generate marketing content, product descriptions, and personalized campaigns using generative AI.'
  }
];

const industries = [
  'Retail and E-commerce',
  'Healthcare',
  'Financial Services',
  'Manufacturing',
  'Education',
  'Technology and Startups'
];

const deliveryProcess = [
  {
    title: 'Discovery and Scope',
    detail: 'Align on goals, define success metrics, map data sources, and prioritize high-impact use cases.'
  },
  {
    title: 'Pilot Build',
    detail: 'Ship a focused pilot with measurable outcomes, user feedback loops, and baseline monitoring.'
  },
  {
    title: 'Production Rollout',
    detail: 'Integrate with business systems, harden reliability, and set governance and observability standards.'
  },
  {
    title: 'Optimization',
    detail: 'Improve model quality with retraining plans, prompt tuning, and operational KPI reviews.'
  }
];

const engagementModels = [
  {
    title: 'Advisory Sprint',
    timeline: '2-4 weeks',
    detail: 'Ideal for feasibility analysis, architecture planning, and implementation roadmap creation.'
  },
  {
    title: 'Pilot Implementation',
    timeline: '4-8 weeks',
    detail: 'Best for launching one focused AI workflow with clear business impact targets.'
  },
  {
    title: 'Scale Program',
    timeline: 'Quarterly engagement',
    detail: 'Designed for teams operationalizing multiple AI capabilities across departments.'
  }
];

const faqs = [
  {
    question: 'How quickly can we launch an AI pilot?',
    answer: 'Most pilots are delivered in 4-8 weeks depending on data availability and integration complexity.'
  },
  {
    question: 'Do you support existing product and engineering teams?',
    answer: 'Yes. We work as a delivery partner and co-build with internal teams for long-term ownership.'
  },
  {
    question: 'Which industries do you work with?',
    answer: 'We frequently support retail, healthcare, finance, manufacturing, education, and SaaS teams.'
  },
  {
    question: 'How do you handle AI governance and risk?',
    answer: 'We include privacy checks, evaluation criteria, and deployment guardrails from the first phase.'
  }
];

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      // Service cards animation
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      serviceCards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Solutions animation
      const solutionCards = solutionsRef.current?.querySelectorAll('.solution-card');
      solutionCards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Industries animation
      gsap.fromTo(industriesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: industriesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative pt-20">
      {/* Ambient Orb */}
      <div className="ambient-orb" />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 lg:py-32"
        style={{ opacity: 0 }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="micro-label block mb-6">OUR SERVICES</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
              Core AI Services
            </h1>
            <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto">
              We specialize in building intelligent systems that automate workflows,
              improve decision-making, and enhance customer experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section
        ref={servicesRef}
        className="relative py-16 lg:py-24"
        style={{
          backgroundColor: '#0B1022',
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {mainServices.map((service) => (
              <div
                key={service.title}
                id={service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="service-card glass-card rounded-3xl p-6 lg:p-8"
                style={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Left - Title & Description */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-white">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-[#A7B1D8] leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/80"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - Benefits */}
                  <div className="lg:border-l lg:border-white/10 lg:pl-8">
                    <h3 className="text-sm font-medium text-white mb-4">Benefits</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                          <span className="text-[#A7B1D8] text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for Business Challenges */}
      <section
        ref={solutionsRef}
        className="relative py-16 lg:py-24"
        style={{ borderTop: '1px solid rgba(244, 246, 255, 0.05)' }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">SOLUTIONS</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                AI Solutions for Business Challenges
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="solution-card glass-card rounded-2xl p-6"
                  style={{ opacity: 0 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center mb-5">
                    <solution.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section
        ref={industriesRef}
        className="relative py-16 lg:py-24"
        style={{
          opacity: 0,
          backgroundColor: '#0B1022',
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">INDUSTRIES</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                Industries We Serve
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="px-6 py-3 glass-card rounded-full text-white font-medium"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section
        className="relative py-16 lg:py-24"
        style={{ borderTop: '1px solid rgba(244, 246, 255, 0.05)' }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">IMPLEMENTATION PROCESS</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">From Idea to Reliable Production</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {deliveryProcess.map((step) => (
                <article key={step.title} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{step.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section
        className="relative py-16 lg:py-24"
        style={{
          backgroundColor: '#0B1022',
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">ENGAGEMENT OPTIONS</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">Delivery Models and Timelines</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {engagementModels.map((model) => (
                <article key={model.title} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{model.title}</h3>
                  <p className="text-indigo-300 text-sm mb-3">{model.timeline}</p>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{model.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="relative py-16 lg:py-24"
        style={{ borderTop: '1px solid rgba(244, 246, 255, 0.05)' }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">Common Service Questions</h2>
            </div>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <article key={faq.question} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-20 lg:py-28"
        style={{
          opacity: 0,
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
              Transform Your Business with AI
            </h2>
            <p className="text-lg text-[#A7B1D8] leading-relaxed mb-10">
              Artificial intelligence is transforming the way businesses operate.
              Ikarmic AI Services and Solutions helps companies leverage AI to increase
              efficiency, reduce costs, and unlock new opportunities.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-block"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
