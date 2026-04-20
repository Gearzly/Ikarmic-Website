import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/layout/Container';

const FooterSection: React.FC<{ title: string; links: Array<{ name: string; path: string }> }> = ({ title, links }) => (
  <div>
    <h4 className="text-white font-medium mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="text-muted-foreground text-sm hover:text-white transition-colors duration-300"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Contact', path: '/contact' },
  ];

  const servicesLinks = [
    { name: 'AI Chatbots', path: '/services/ai-chatbots' },
    { name: 'Business Automation', path: '/services/business-automation' },
    { name: 'Data Analytics', path: '/services/data-analytics' },
    { name: 'Generative AI', path: '/services/generative-ai' },
    { name: 'Custom AI', path: '/services/custom-ai' },
  ];

  const solutionsLinks = [
    { name: 'CX & Support AI', path: '/solutions/cx-support-ai' },
    { name: 'Intelligent Automation', path: '/solutions/intelligent-automation' },
    { name: 'Predictive Intelligence', path: '/solutions/predictive-intelligence' },
    { name: 'AI-Powered Marketing', path: '/solutions/ai-powered-marketing' },
    { name: 'Enterprise AI Platform', path: '/solutions/enterprise-ai-platform' },
  ];

  const resourcesLinks = [
    { name: 'Blog', path: '/blog' },
    { name: 'Industries', path: '/industries' },
    { name: 'Resources', path: '/resources' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8">
      <Container>
        {/* Main grid: 2-col mobile → 4-col sm → 6-col desktop */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:grid-cols-6">

          {/* Brand — full-width on mobile/sm, 2 units on lg */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link to="/" className="inline-block">
              <picture>
                <source srcSet="/images/ikarmic-ai-logo.webp" type="image/webp" />
                <img
                  src="/images/ikarmic-ai-logo.png"
                  alt="Ikarmic"
                  width={181}
                  height={40}
                  decoding="async"
                  className="h-8 w-auto"
                  style={{ aspectRatio: '181/40' }}
                />
              </picture>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-sm">
              Empowering businesses with intelligent AI technologies. We design and ship
              machine learning systems that are calm, reliable, and easy to adopt.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/company/ikarmic-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ikarmic on LinkedIn"
                className="p-2.5 bg-white/5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href="https://x.com/ikarmicai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ikarmic on X"
                className="p-2.5 bg-white/5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@ikarmic.com"
                aria-label="Email Ikarmic"
                className="p-2.5 bg-white/5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Company */}
          <FooterSection title="Company" links={footerLinks} />

          {/* Services */}
          <FooterSection title="Services" links={servicesLinks} />

          {/* Solutions */}
          <FooterSection title="Solutions" links={solutionsLinks} />

          {/* Resources */}
          <FooterSection title="Resources" links={resourcesLinks} />

        </div>

        {/* Bottom bar */}
        <Separator className="mt-12 mb-6 bg-white/5" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Ikarmic AI. All rights reserved.
          </p>
          <p className="text-muted-foreground/50 text-xs tracking-wide">
            Designed with precision. Built for impact.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
