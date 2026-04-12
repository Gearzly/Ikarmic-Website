import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <footer className="bg-[#0B1022] border-t border-white/5">
      <div className="w-full px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-semibold text-white tracking-tight">
                Ikarmic
              </span>
            </Link>
            <p className="mt-4 text-[#A7B1D8] text-sm leading-relaxed max-w-md">
              Empowering businesses with intelligent AI technologies. We design and ship
              machine learning systems that are calm, reliable, and easy to adopt.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com/company/ikarmic-ai"
                target="_blank"
                rel="noreferrer"
                aria-label="Ikarmic on LinkedIn"
                className="p-2.5 bg-white/5 rounded-lg text-[#A7B1D8] hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/ikarmicai"
                target="_blank"
                rel="noreferrer"
                aria-label="Ikarmic on X"
                className="p-2.5 bg-white/5 rounded-lg text-[#A7B1D8] hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:hello@ikarmic.ai"
                aria-label="Email Ikarmic"
                className="p-2.5 bg-white/5 rounded-lg text-[#A7B1D8] hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A7B1D8] text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A7B1D8] text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[#A7B1D8] text-sm">
            © {currentYear} Ikarmic AI. All rights reserved.
          </p>
          <p className="text-[#A7B1D8]/60 text-xs">
            Designed with precision. Built for impact.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
