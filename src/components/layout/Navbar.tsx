import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const solutionsLinks = [
  { name: 'AI Chatbots', path: '/services/ai-chatbots' },
  { name: 'Business Automation', path: '/services/business-automation' },
  { name: 'Data Analytics', path: '/services/data-analytics' },
  { name: 'Generative AI', path: '/services/generative-ai' },
  { name: 'Custom AI', path: '/services/custom-ai' },
];

const industriesLinks = [
  { name: 'Retail', path: '/industries/retail' },
  { name: 'Manufacturing', path: '/industries/manufacturing' },
  { name: 'Education', path: '/industries/education' },
  { name: 'Technology', path: '/industries/technology' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isActivePrefix = (prefix: string) => location.pathname.startsWith(prefix);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#070A12]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl lg:text-2xl font-semibold text-white tracking-tight">
              Ikarmic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive('/') ? 'text-white' : 'text-[#A7B1D8] hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive('/about') ? 'text-white' : 'text-[#A7B1D8] hover:text-white'
              }`}
            >
              About
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('solutions')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/services"
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                  isActivePrefix('/services') ? 'text-white' : 'text-[#A7B1D8] hover:text-white'
                }`}
              >
                Solutions
                <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </Link>
              {openDropdown === 'solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="w-56 bg-[#0B1022]/95 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-xl">
                    <Link
                      to="/services"
                      className="block px-4 py-2.5 text-sm text-[#A7B1D8] hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    >
                      All Services
                    </Link>
                    <div className="my-1 border-t border-white/5" />
                    {solutionsLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block px-4 py-2.5 text-sm text-[#A7B1D8] hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('industries')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/industries"
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                  isActivePrefix('/industries') ? 'text-white' : 'text-[#A7B1D8] hover:text-white'
                }`}
              >
                Industries
                <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === 'industries' ? 'rotate-180' : ''}`} />
              </Link>
              {openDropdown === 'industries' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="w-52 bg-[#0B1022]/95 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-xl">
                    <Link
                      to="/industries"
                      className="block px-4 py-2.5 text-sm text-[#A7B1D8] hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                    >
                      All Industries
                    </Link>
                    <div className="my-1 border-t border-white/5" />
                    {industriesLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block px-4 py-2.5 text-sm text-[#A7B1D8] hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors duration-300 ${
                isActive('/contact') ? 'text-white' : 'text-[#A7B1D8] hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Start a project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#070A12]/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block text-lg font-medium transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-white'
                  : 'text-[#A7B1D8] hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Solutions Section */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs font-medium text-[#A7B1D8]/60 uppercase tracking-wider mb-2">Solutions</p>
            {solutionsLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-1.5 text-[#A7B1D8] hover:text-white transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Industries Section */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs font-medium text-[#A7B1D8]/60 uppercase tracking-wider mb-2">Industries</p>
            {industriesLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-1.5 text-[#A7B1D8] hover:text-white transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            className="inline-block mt-4 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start a project
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
