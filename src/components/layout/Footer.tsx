import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Grid } from '@/components/layout/Grid';
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
  ];

  const legalLinks = [
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <footer className="bg-card border-t border-white/5 py-12 lg:py-16">
      <Container>
        <Grid cols="2" gap="lg" responsive>
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src="/images/ikarmic-ai-logo.png"
                alt="Ikarmic"
                width={1326}
                height={293}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-md">
              Empowering businesses with intelligent AI technologies. We design and ship
              machine learning systems that are calm, reliable, and easy to adopt.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/ikarmic-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ikarmic on LinkedIn"
                className="p-2.5 bg-white/5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/ikarmicai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ikarmic on X"
                className="p-2.5 bg-white/5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:hello@ikarmic.com"
                aria-label="Email Ikarmic"
                className="p-2.5 bg-white/5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <FooterSection title="Company" links={footerLinks} />

          {/* Services Column */}
          <FooterSection title="Services" links={servicesLinks} />

          {/* Solutions Column */}
          <FooterSection title="Solutions" links={solutionsLinks} />

          {/* Resources Column */}
          <FooterSection title="Resources" links={resourcesLinks} />

          {/* Legal Column */}
          <FooterSection title="Legal" links={legalLinks} />
        </Grid>

        {/* Bottom Bar */}
        <Separator className="my-8" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Ikarmic AI. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs">
            Designed with precision. Built for impact.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
