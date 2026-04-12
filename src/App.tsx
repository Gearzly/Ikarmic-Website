import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageSeo from './components/seo/PageSeo';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { defaultOrganizationSchema, defaultWebsiteSchema } from './lib/seo';
import type { PageSeoConfig } from './lib/seo';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger after route change
    ScrollTrigger.refresh();
  }, [location]);

  return null;
};

const RouteSeo = () => {
  const { pathname } = useLocation();

  const seoMap: Record<string, PageSeoConfig> = {
    '/': {
      title: 'AI Consulting and Product Engineering',
      description: 'Ikarmic helps teams design, deploy, and scale reliable AI systems across support, operations, analytics, and product experiences.',
      path: '/',
      schema: [
        defaultOrganizationSchema,
        defaultWebsiteSchema,
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Ikarmic Home',
          description: 'AI consulting and implementation services for growing teams.',
          url: 'https://ikarmic.ai/'
        }
      ]
    },
    '/about': {
      title: 'About Our AI Team and Delivery Approach',
      description: 'Meet Ikarmic and learn how we deliver practical, ethical, and production-ready AI systems with measurable business outcomes.',
      path: '/about',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Ikarmic',
        description: 'About our AI engineering approach, principles, and team expertise.',
        url: 'https://ikarmic.ai/about'
      }
    },
    '/services': {
      title: 'AI Services: Automation, Analytics, Chatbots, and Custom AI',
      description: 'Explore Ikarmic AI services including conversational AI, workflow automation, predictive analytics, and custom AI product development.',
      path: '/services',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI Consulting and Development',
          provider: {
            '@type': 'Organization',
            name: 'Ikarmic AI Services and Solutions'
          },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/services'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How quickly can we launch an AI pilot?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most pilots are delivered in 4-8 weeks depending on data availability and integration complexity.'
              }
            },
            {
              '@type': 'Question',
              name: 'Do you support existing product and engineering teams?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. We co-build with internal teams and transfer delivery ownership through documentation and runbooks.'
              }
            }
          ]
        }
      ]
    },
    '/contact': {
      title: 'Contact Ikarmic for AI Projects',
      description: 'Request an AI consultation. Share your project scope and we will reply with timelines, feasibility, and next steps.',
      path: '/contact',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Ikarmic',
        description: 'Contact page for AI consulting and delivery inquiries.',
        url: 'https://ikarmic.ai/contact'
      }
    },
    '/privacy': {
      title: 'Privacy Policy',
      description: 'Read the Ikarmic privacy policy and how we handle inquiry and project data.',
      path: '/privacy',
      noindex: true
    },
    '/terms': {
      title: 'Terms of Service',
      description: 'Read the Ikarmic terms of service for website use and project engagement.',
      path: '/terms',
      noindex: true
    }
  };

  const config = seoMap[pathname] ?? {
    title: 'AI Services and Solutions',
    description: 'Ikarmic provides practical AI consulting, implementation, and support services.',
    path: pathname
  };

  return <PageSeo config={config} />;
};

function App() {
  return (
    <Router>
      <RouteSeo />
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#070A12]">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
