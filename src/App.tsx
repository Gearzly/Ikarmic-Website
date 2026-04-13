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
import AIChatbots from './pages/services/AIChatbots';
import BusinessAutomation from './pages/services/BusinessAutomation';
import DataAnalytics from './pages/services/DataAnalytics';
import GenerativeAI from './pages/services/GenerativeAI';
import CustomAI from './pages/services/CustomAI';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Industries from './pages/Industries';
import Retail from './pages/industries/Retail';
import Manufacturing from './pages/industries/Manufacturing';
import Education from './pages/industries/Education';
import Technology from './pages/industries/Technology';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import BackToTop from './components/layout/BackToTop';
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
      keywords: 'AI consulting, AI product engineering, machine learning solutions, ethical AI, enterprise AI',
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
      keywords: 'AI team, AI delivery, ethical AI engineering, machine learning expertise',
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
      keywords: 'AI services, AI automation, chatbots, predictive analytics, custom AI development, generative AI',
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
      keywords: 'AI consultation, contact AI team, AI project inquiry',
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
    },
    '/services/ai-chatbots': {
      title: 'AI Chatbots & Conversational AI Services',
      description: 'Deploy intelligent chatbots across web, WhatsApp, and voice channels that reduce support costs and improve customer experience.',
      path: '/services/ai-chatbots',
      keywords: 'AI chatbots, conversational AI, WhatsApp bot, customer support automation, NLP chatbot',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI Chatbots & Conversational AI',
          provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/services/ai-chatbots'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.ai/services' },
            { '@type': 'ListItem', position: 2, name: 'AI Chatbots', item: 'https://ikarmic.ai/services/ai-chatbots' }
          ]
        }
      ]
    },
    '/services/business-automation': {
      title: 'AI Business Automation & Document Intelligence',
      description: 'Automate document processing, workflow orchestration, and compliance checks with AI-driven automation that eliminates manual bottlenecks.',
      path: '/services/business-automation',
      keywords: 'AI business automation, document intelligence, workflow automation, invoice processing, OCR AI',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI Business Automation',
          provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/services/business-automation'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.ai/services' },
            { '@type': 'ListItem', position: 2, name: 'Business Automation', item: 'https://ikarmic.ai/services/business-automation' }
          ]
        }
      ]
    },
    '/services/data-analytics': {
      title: 'AI Data Analytics & Predictive Intelligence',
      description: 'Turn raw data into forecasts, anomaly alerts, and strategic insights with production-grade analytics models.',
      path: '/services/data-analytics',
      keywords: 'AI data analytics, predictive intelligence, demand forecasting, anomaly detection, business analytics AI',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI Data Analytics & Predictive Intelligence',
          provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/services/data-analytics'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.ai/services' },
            { '@type': 'ListItem', position: 2, name: 'Data Analytics', item: 'https://ikarmic.ai/services/data-analytics' }
          ]
        }
      ]
    },
    '/services/generative-ai': {
      title: 'Generative AI Solutions: RAG, Content, Knowledge Assistants',
      description: 'Harness large language models with retrieval pipelines, guardrails, and fine-tuning for content generation and knowledge access.',
      path: '/services/generative-ai',
      keywords: 'generative AI, RAG, large language models, content generation, knowledge assistant, LLM fine-tuning',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Generative AI Solutions',
          provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/services/generative-ai'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.ai/services' },
            { '@type': 'ListItem', position: 2, name: 'Generative AI', item: 'https://ikarmic.ai/services/generative-ai' }
          ]
        }
      ]
    },
    '/services/custom-ai': {
      title: 'Custom AI Development: Bespoke Models & Platforms',
      description: 'Custom ML models, AI-powered products, and intelligent platforms built from prototype to production with full ownership transfer.',
      path: '/services/custom-ai',
      keywords: 'custom AI development, bespoke ML models, AI platform, MLOps, machine learning consulting',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Custom AI Development',
          provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/services/custom-ai'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.ai/services' },
            { '@type': 'ListItem', position: 2, name: 'Custom AI', item: 'https://ikarmic.ai/services/custom-ai' }
          ]
        }
      ]
    },
    '/industries': {
      title: 'Industries We Serve: Retail, Manufacturing, Education, Technology',
      description: 'Ikarmic delivers AI solutions tailored to industry-specific challenges across retail, manufacturing, education, and technology.',
      path: '/industries',
      keywords: 'AI industries, AI for retail, AI for manufacturing, AI for education, AI for technology',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI Industry Solutions',
          provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.ai/industries'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Industries Served by Ikarmic',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Retail & E-Commerce', url: 'https://ikarmic.ai/industries/retail' },
            { '@type': 'ListItem', position: 2, name: 'Manufacturing', url: 'https://ikarmic.ai/industries/manufacturing' },
            { '@type': 'ListItem', position: 3, name: 'Education', url: 'https://ikarmic.ai/industries/education' },
            { '@type': 'ListItem', position: 4, name: 'Technology', url: 'https://ikarmic.ai/industries/technology' }
          ]
        }
      ]
    },
    '/industries/retail': {
      title: 'AI for Retail & E-Commerce',
      description: 'Demand forecasting, conversational commerce, and personalized experiences powered by AI for modern retail.',
      path: '/industries/retail',
      keywords: 'AI for retail, retail AI solutions, ecommerce AI, demand forecasting, retail chatbot',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.ai/industries' },
          { '@type': 'ListItem', position: 2, name: 'Retail', item: 'https://ikarmic.ai/industries/retail' }
        ]
      }
    },
    '/industries/manufacturing': {
      title: 'AI for Manufacturing',
      description: 'Predictive maintenance, document automation, and quality intelligence for smarter factory operations.',
      path: '/industries/manufacturing',
      keywords: 'AI for manufacturing, predictive maintenance, factory AI, document automation, quality control AI',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.ai/industries' },
          { '@type': 'ListItem', position: 2, name: 'Manufacturing', item: 'https://ikarmic.ai/industries/manufacturing' }
        ]
      }
    },
    '/industries/education': {
      title: 'AI for Education',
      description: 'Adaptive learning, student chatbots, and retention analytics to improve outcomes at scale.',
      path: '/industries/education',
      keywords: 'AI for education, adaptive learning, edtech AI, student chatbot, retention analytics',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.ai/industries' },
          { '@type': 'ListItem', position: 2, name: 'Education', item: 'https://ikarmic.ai/industries/education' }
        ]
      }
    },
    '/industries/technology': {
      title: 'AI for Technology Companies',
      description: 'Custom models, developer copilots, and MLOps infrastructure to accelerate your AI roadmap.',
      path: '/industries/technology',
      keywords: 'AI for technology, developer copilot, MLOps, custom ML models, AI SaaS',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.ai/industries' },
          { '@type': 'ListItem', position: 2, name: 'Technology', item: 'https://ikarmic.ai/industries/technology' }
        ]
      }
    },
    '/resources': {
      title: 'AI Resources: Case Studies, Industry Guides & Service Deep-Dives',
      description: 'Explore AI case studies, industry-specific insights, and service breakdowns to evaluate how Ikarmic can help your team.',
      path: '/resources',
      keywords: 'AI resources, AI case studies, AI guides, machine learning resources'
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
          <Route path="/services/ai-chatbots" element={<AIChatbots />} />
          <Route path="/services/business-automation" element={<BusinessAutomation />} />
          <Route path="/services/data-analytics" element={<DataAnalytics />} />
          <Route path="/services/generative-ai" element={<GenerativeAI />} />
          <Route path="/services/custom-ai" element={<CustomAI />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/retail" element={<Retail />} />
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/education" element={<Education />} />
          <Route path="/industries/technology" element={<Technology />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Back to Top */}
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
