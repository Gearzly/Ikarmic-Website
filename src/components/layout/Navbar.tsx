import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

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

const industriesLinks = [
  { name: 'Retail', path: '/industries/retail' },
  { name: 'Manufacturing', path: '/industries/manufacturing' },
  { name: 'Education', path: '/industries/education' },
  { name: 'Technology', path: '/industries/technology' },
];

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
];

const NavLink: React.FC<{ to: string; children: string; isActive: boolean }> = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={cn(
      'text-sm font-medium transition-colors duration-300',
      isActive ? 'text-white' : 'text-muted-foreground hover:text-white'
    )}
  >
    {children}
  </Link>
);

const DropdownNavLink: React.FC<{ to: string; children: string }> = ({ to, children }) => (
  <DropdownMenuItem asChild>
    <Link to={to} className="cursor-pointer">
      {children}
    </Link>
  </DropdownMenuItem>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setIsMobileMenuOpen(false), 0);
    return () => clearTimeout(id);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;
  const isActivePrefix = (prefix: string) => location.pathname.startsWith(prefix);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/ikarmic-ai-logo.png"
              alt="Ikarmic"
              width={1326}
              height={293}
              className="h-8 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" isActive={isActive('/')}>
              Home
            </NavLink>
            <NavLink to="/about" isActive={isActive('/about')}>
              About
            </NavLink>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  'inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300',
                  isActivePrefix('/services') ? 'text-white' : 'text-muted-foreground hover:text-white'
                )}>
                  Services
                  <ChevronDown size={14} className="transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownNavLink to="/services">All Services</DropdownNavLink>
                <DropdownMenuSeparator />
                {servicesLinks.map((link) => (
                  <DropdownNavLink key={link.name} to={link.path}>
                    {link.name}
                  </DropdownNavLink>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  'inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300',
                  isActivePrefix('/solutions') ? 'text-white' : 'text-muted-foreground hover:text-white'
                )}>
                  Solutions
                  <ChevronDown size={14} className="transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64">
                <DropdownNavLink to="/solutions">All Solutions</DropdownNavLink>
                <DropdownMenuSeparator />
                {solutionsLinks.map((link) => (
                  <DropdownNavLink key={link.name} to={link.path}>
                    {link.name}
                  </DropdownNavLink>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Industries Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={cn(
                  'inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300',
                  isActivePrefix('/industries') ? 'text-white' : 'text-muted-foreground hover:text-white'
                )}>
                  Industries
                  <ChevronDown size={14} className="transition-transform duration-200" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-52">
                <DropdownNavLink to="/industries">All Industries</DropdownNavLink>
                <DropdownMenuSeparator />
                {industriesLinks.map((link) => (
                  <DropdownNavLink key={link.name} to={link.path}>
                    {link.name}
                  </DropdownNavLink>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to="/blog" isActive={isActive('/blog')}>
              Blog
            </NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="default" size="default" asChild>
              <Link to="/contact">
                Start a project
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-white transition-colors"
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
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-background/95 backdrop-blur-md border-b border-white/5"
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'block text-lg font-medium transition-colors duration-300',
                  isActive(link.path)
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-white'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Services Section */}
            <div className="pt-2 border-t border-white/5">
              <p className="text-label mb-2">Services</p>
              {servicesLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-1.5 text-muted-foreground hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Solutions Section */}
            <div className="pt-2 border-t border-white/5">
              <p className="text-label mb-2">Solutions</p>
              {solutionsLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-1.5 text-muted-foreground hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Industries Section */}
            <div className="pt-2 border-t border-white/5">
              <p className="text-label mb-2">Industries</p>
              {industriesLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-1.5 text-muted-foreground hover:text-white transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Button variant="default" size="default" className="w-full mt-4" asChild>
              <Link to="/contact" className="w-full">
                Start a project
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
