import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Shield, Users, Target, Sparkles, Zap, Heart, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously explore new AI technologies to solve complex business challenges.'
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We build transparent and trustworthy AI systems that our clients can rely on.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with clients to create customized solutions that fit their needs.'
  },
  {
    icon: Target,
    title: 'Customer Success',
    description: 'Our goal is to deliver measurable business results that drive growth.'
  }
];

const stats = [
  { value: '5', label: 'Core Service Playbooks' },
  { value: '4', label: 'Delivery Stages' },
  { value: '6', label: 'Industries Supported' },
  { value: '2', label: 'Business-day Response SLA' }
];

const differentiators = [
  {
    icon: Sparkles,
    title: 'Industry-focused AI solutions',
    description: 'Tailored approaches for your specific sector'
  },
  {
    icon: Zap,
    title: 'Scalable and secure AI systems',
    description: 'Built to grow with your business'
  },
  {
    icon: Heart,
    title: 'Faster implementation and deployment',
    description: 'Get to market quicker with our proven methods'
  },
  {
    icon: Globe,
    title: 'Experienced AI engineers and consultants',
    description: 'Deep expertise across the AI landscape'
  }
];

const caseSnapshots = [
  {
    title: 'Support Automation Rollout',
    impact: 'Reduced first-response time from hours to minutes',
    summary: 'Built a multilingual conversational assistant integrated with CRM workflows for a services team.'
  },
  {
    title: 'Demand Forecasting Upgrade',
    impact: 'Improved planning consistency for seasonal inventory',
    summary: 'Shipped a forecasting pipeline with monitoring and model refresh checkpoints.'
  },
  {
    title: 'Document Intelligence Workflow',
    impact: 'Cut manual review cycles across operations teams',
    summary: 'Delivered extraction, validation, and exception routing for high-volume business documents.'
  }
];

const processSteps = [
  {
    step: '1. Discovery',
    detail: 'Clarify business goals, data readiness, and success metrics before implementation starts.'
  },
  {
    step: '2. Design',
    detail: 'Define architecture, governance, and pilot scope with measurable acceptance criteria.'
  },
  {
    step: '3. Delivery',
    detail: 'Build and validate models, integrations, and user-facing workflows in iterative milestones.'
  },
  {
    step: '4. Operationalization',
    detail: 'Enable monitoring, retraining plans, and team handoff so systems stay reliable over time.'
  }
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const diffRef = useRef<HTMLDivElement>(null);

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

      // Mission animation
      gsap.fromTo(missionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Values cards
      const valueCards = valuesRef.current?.querySelectorAll('.value-card');
      valueCards?.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      statItems?.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Differentiators animation
      const diffItems = diffRef.current?.querySelectorAll('.diff-item');
      diffItems?.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
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
            <span className="micro-label block mb-6">ABOUT US</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-8">
              Who We Are
            </h1>
            <p className="text-lg text-[#A7B1D8] leading-relaxed max-w-2xl mx-auto">
              Ikarmic AI Services and Solutions is dedicated to helping organizations harness 
              the power of artificial intelligence to improve business performance and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={missionRef}
        className="relative py-16 lg:py-24"
        style={{ 
          opacity: 0,
          backgroundColor: '#0B1022',
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
            <div>
              <span className="micro-label block mb-4">OUR MISSION</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                Empowering businesses with intelligent AI solutions
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                To empower businesses with intelligent AI solutions that drive automation, 
                improve decision-making, and accelerate digital transformation.
              </p>
            </div>
            <div>
              <span className="micro-label block mb-4">OUR VISION</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                A trusted global partner for AI innovation
              </h2>
              <p className="text-[#A7B1D8] leading-relaxed">
                To become a trusted global partner for businesses seeking innovative, 
                scalable, and ethical AI solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="relative py-16 lg:py-20"
        style={{ borderTop: '1px solid rgba(244, 246, 255, 0.05)' }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-item text-center"
                style={{ opacity: 0 }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-indigo-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#A7B1D8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="relative py-16 lg:py-24"
        style={{ 
          backgroundColor: '#0B1022',
          borderTop: '1px solid rgba(244, 246, 255, 0.05)'
        }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">OUR VALUES</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                What Drives Us
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="value-card glass-card rounded-2xl p-6 text-center"
                  style={{ opacity: 0 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-600/20 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={diffRef}
        className="relative py-16 lg:py-24"
        style={{ borderTop: '1px solid rgba(244, 246, 255, 0.05)' }}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="micro-label block mb-4">WHY CHOOSE US</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                The Ikarmic Advantage
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {differentiators.map((item) => (
                <div
                  key={item.title}
                  className="diff-item flex items-start gap-5 glass-card rounded-2xl p-6"
                  style={{ opacity: 0 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#A7B1D8] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
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
              <span className="micro-label block mb-4">PROOF SNAPSHOTS</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                Outcomes We Focus On
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {caseSnapshots.map((snapshot) => (
                <article key={snapshot.title} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{snapshot.title}</h3>
                  <p className="text-indigo-300 text-sm mb-3">{snapshot.impact}</p>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{snapshot.summary}</p>
                </article>
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
              <span className="micro-label block mb-4">DELIVERY MODEL</span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">How We Work</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {processSteps.map((item) => (
                <article key={item.step} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.step}</h3>
                  <p className="text-[#A7B1D8] text-sm leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
