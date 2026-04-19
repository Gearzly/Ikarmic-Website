import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Zap, BarChart3, Sparkles } from 'lucide-react';
import { Grid } from '@/components/layout/Grid';
import { SectionContainer } from '@/components/layout/Container';

const capabilities = [
  {
    icon: MessageSquare,
    title: 'AI Chatbots & Conversational AI',
    description: 'Intelligent chatbots across websites, WhatsApp, and messaging platforms — delivering 24/7 customer support at scale.',
    link: '/services/ai-chatbots',
    number: '01',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Automate repetitive workflows, document processing, and operations to cut costs and free up your team.',
    link: '/services/business-automation',
    number: '02',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & Predictive AI',
    description: 'Turn raw data into strategic insights — forecasting outcomes, detecting risk, and driving smarter decisions.',
    link: '/services/data-analytics',
    number: '03',
  },
  {
    icon: Sparkles,
    title: 'Generative AI Solutions',
    description: 'Automate content creation, marketing, and knowledge management with production-ready generative AI tools.',
    link: '/services/generative-ai',
    number: '04',
  },
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('caps-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative caps-section bg-card border-t border-white/5"
    >
      <SectionContainer>
        {/* Centered heading */}
        <div className="text-center mb-12 lg:mb-16 caps-heading">
          <span className="text-micro block mb-4">CAPABILITIES</span>
          <h2 className="h3 mb-5 text-white">
            Core Services
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Five service areas built for measurable outcomes. From conversational AI to custom development, we ship what your team actually needs.
          </p>
        </div>

        {/* 4-column card grid */}
        <Grid cols="4" gap="lg">
          {capabilities.map((cap, index) => (
            <Link
              key={cap.title}
              to={cap.link}
              className="group glass rounded-2xl p-6 flex flex-col gap-4 hover:surface-hover outline-none focus-visible:ring-2 focus-visible:ring-primary caps-card"
              style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}
            >
              {/* Top row: icon + number */}
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <cap.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs font-mono text-foreground/20 group-hover:text-primary/50 transition-colors duration-300 pt-1">
                  {cap.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="h6 text-white leading-snug">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="text-body-sm text-muted-foreground flex-1">
                {cap.description}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:text-primary/80 transition-colors duration-300 mt-auto">
                Learn more
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </Grid>
      </SectionContainer>
    </section>
  );
};

export default CapabilitiesSection;
