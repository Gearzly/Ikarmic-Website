import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageSeo from './components/seo/PageSeo';
import BackToTop from './components/layout/BackToTop';
import Analytics from './components/analytics/Analytics';
import CookieConsent from './components/layout/CookieConsent';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const AIChatbots = lazy(() => import('./pages/services/AIChatbots'));
const BusinessAutomation = lazy(() => import('./pages/services/BusinessAutomation'));
const DataAnalytics = lazy(() => import('./pages/services/DataAnalytics'));
const GenerativeAI = lazy(() => import('./pages/services/GenerativeAI'));
const CustomAI = lazy(() => import('./pages/services/CustomAI'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Industries = lazy(() => import('./pages/Industries'));
const Retail = lazy(() => import('./pages/industries/Retail'));
const Manufacturing = lazy(() => import('./pages/industries/Manufacturing'));
const Education = lazy(() => import('./pages/industries/Education'));
const Technology = lazy(() => import('./pages/industries/Technology'));
const Resources = lazy(() => import('./pages/Resources'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Admin = lazy(() => import('./pages/admin/index'));
const Portal = lazy(() => import('./pages/portal/index'));
const ResetPassword = lazy(() => import('./pages/portal/ResetPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Solutions = lazy(() => import('./pages/Solutions'));
const CXSupportAI = lazy(() => import('./pages/solutions/CXSupportAI'));
const IntelligentAutomation = lazy(() => import('./pages/solutions/IntelligentAutomation'));
const PredictiveIntelligence = lazy(() => import('./pages/solutions/PredictiveIntelligence'));
const AIMarketingPlatform = lazy(() => import('./pages/solutions/AIMarketingPlatform'));
const EnterpriseAIPlatform = lazy(() => import('./pages/solutions/EnterpriseAIPlatform'));
import { defaultOrganizationSchema, defaultWebsiteSchema } from './lib/seo';
import type { PageSeoConfig } from './lib/seo';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Use 'instant' to override css scroll-behavior: smooth on the html element,
    // otherwise navigation from footer would animate scroll up instead of jumping.
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Defer ScrollTrigger refresh until after the new page has painted
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

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
          url: 'https://ikarmic.com/'
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
        url: 'https://ikarmic.com/about'
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
          url: 'https://ikarmic.com/services'
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
        url: 'https://ikarmic.com/contact'
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
          url: 'https://ikarmic.com/services/ai-chatbots'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
            { '@type': 'ListItem', position: 2, name: 'AI Chatbots', item: 'https://ikarmic.com/services/ai-chatbots' }
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
          url: 'https://ikarmic.com/services/business-automation'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
            { '@type': 'ListItem', position: 2, name: 'Business Automation', item: 'https://ikarmic.com/services/business-automation' }
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
          url: 'https://ikarmic.com/services/data-analytics'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
            { '@type': 'ListItem', position: 2, name: 'Data Analytics', item: 'https://ikarmic.com/services/data-analytics' }
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
          url: 'https://ikarmic.com/services/generative-ai'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
            { '@type': 'ListItem', position: 2, name: 'Generative AI', item: 'https://ikarmic.com/services/generative-ai' }
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
          url: 'https://ikarmic.com/services/custom-ai'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
            { '@type': 'ListItem', position: 2, name: 'Custom AI', item: 'https://ikarmic.com/services/custom-ai' }
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
          url: 'https://ikarmic.com/industries'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Industries Served by Ikarmic',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Retail & E-Commerce', url: 'https://ikarmic.com/industries/retail' },
            { '@type': 'ListItem', position: 2, name: 'Manufacturing', url: 'https://ikarmic.com/industries/manufacturing' },
            { '@type': 'ListItem', position: 3, name: 'Education', url: 'https://ikarmic.com/industries/education' },
            { '@type': 'ListItem', position: 4, name: 'Technology', url: 'https://ikarmic.com/industries/technology' }
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
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.com/industries' },
          { '@type': 'ListItem', position: 2, name: 'Retail', item: 'https://ikarmic.com/industries/retail' }
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
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.com/industries' },
          { '@type': 'ListItem', position: 2, name: 'Manufacturing', item: 'https://ikarmic.com/industries/manufacturing' }
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
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.com/industries' },
          { '@type': 'ListItem', position: 2, name: 'Education', item: 'https://ikarmic.com/industries/education' }
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
          { '@type': 'ListItem', position: 1, name: 'Industries', item: 'https://ikarmic.com/industries' },
          { '@type': 'ListItem', position: 2, name: 'Technology', item: 'https://ikarmic.com/industries/technology' }
        ]
      }
    },
    '/resources': {
      title: 'AI Resources: Case Studies, Industry Guides & Service Deep-Dives',
      description: 'Explore AI case studies, industry-specific insights, and service breakdowns to evaluate how Ikarmic can help your team.',
      path: '/resources',
      keywords: 'AI resources, AI case studies, AI guides, machine learning resources'
    },
    '/solutions': {
      title: 'AI Solutions: CX, Automation, Predictive Intelligence & More',
      description: 'Outcome-focused AI solutions for customer experience, back-office automation, demand forecasting, marketing, and enterprise AI platforms.',
      path: '/solutions',
      keywords: 'AI solutions, customer experience AI, intelligent automation, predictive intelligence, AI marketing, enterprise AI',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ikarmic AI Solutions',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CX & Support AI', url: 'https://ikarmic.com/solutions/cx-support-ai' },
          { '@type': 'ListItem', position: 2, name: 'Intelligent Automation', url: 'https://ikarmic.com/solutions/intelligent-automation' },
          { '@type': 'ListItem', position: 3, name: 'Predictive Intelligence', url: 'https://ikarmic.com/solutions/predictive-intelligence' },
          { '@type': 'ListItem', position: 4, name: 'AI-Powered Marketing', url: 'https://ikarmic.com/solutions/ai-powered-marketing' },
          { '@type': 'ListItem', position: 5, name: 'Enterprise AI Platform', url: 'https://ikarmic.com/solutions/enterprise-ai-platform' }
        ]
      }
    },
    '/solutions/cx-support-ai': {
      title: 'CX & Support AI: Deflect Tickets and Delight Customers',
      description: 'AI-powered customer experience systems that resolve tier-1 queries instantly, route complex issues intelligently, and reduce support costs by up to 35%.',
      path: '/solutions/cx-support-ai',
      keywords: 'CX AI, support automation, ticket deflection, customer experience AI, omnichannel chatbot',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'CX & Support AI',
          provider: { '@type': 'Organization', name: 'Ikarmic' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.com/solutions/cx-support-ai'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Solutions', item: 'https://ikarmic.com/solutions' },
            { '@type': 'ListItem', position: 2, name: 'CX & Support AI', item: 'https://ikarmic.com/solutions/cx-support-ai' }
          ]
        }
      ]
    },
    '/solutions/intelligent-automation': {
      title: 'Intelligent Automation: Eliminate Manual Back-Office Work',
      description: 'AI-driven automation for document processing, email triage, workflow orchestration, and compliance — reducing manual effort by up to 80%.',
      path: '/solutions/intelligent-automation',
      keywords: 'intelligent automation, document AI, back-office automation, workflow orchestration, RPA AI',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Intelligent Automation',
          provider: { '@type': 'Organization', name: 'Ikarmic' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.com/solutions/intelligent-automation'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Solutions', item: 'https://ikarmic.com/solutions' },
            { '@type': 'ListItem', position: 2, name: 'Intelligent Automation', item: 'https://ikarmic.com/solutions/intelligent-automation' }
          ]
        }
      ]
    },
    '/solutions/predictive-intelligence': {
      title: 'Predictive Intelligence: Forecast Demand and Detect Risk Early',
      description: 'Predictive models and analytics pipelines for demand forecasting, churn prediction, fraud detection, and dynamic pricing — wired into your dashboards.',
      path: '/solutions/predictive-intelligence',
      keywords: 'predictive intelligence, demand forecasting, churn prediction, fraud detection, business forecasting AI',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Predictive Intelligence',
          provider: { '@type': 'Organization', name: 'Ikarmic' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.com/solutions/predictive-intelligence'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Solutions', item: 'https://ikarmic.com/solutions' },
            { '@type': 'ListItem', position: 2, name: 'Predictive Intelligence', item: 'https://ikarmic.com/solutions/predictive-intelligence' }
          ]
        }
      ]
    },
    '/solutions/ai-powered-marketing': {
      title: 'AI-Powered Marketing: Scale Content and Automate Campaigns',
      description: 'AI systems that generate brand-aligned content, score leads, automate campaign logic, and personalise experiences at scale.',
      path: '/solutions/ai-powered-marketing',
      keywords: 'AI marketing, content generation, lead scoring, campaign automation, AI personalisation',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'AI-Powered Marketing',
          provider: { '@type': 'Organization', name: 'Ikarmic' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.com/solutions/ai-powered-marketing'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Solutions', item: 'https://ikarmic.com/solutions' },
            { '@type': 'ListItem', position: 2, name: 'AI-Powered Marketing', item: 'https://ikarmic.com/solutions/ai-powered-marketing' }
          ]
        }
      ]
    },
    '/solutions/enterprise-ai-platform': {
      title: 'Enterprise AI Platform: From Prototype to Production',
      description: 'Design and build the infrastructure layer that takes AI experiments to reliable, scalable production systems — with full IP transfer and team enablement.',
      path: '/solutions/enterprise-ai-platform',
      keywords: 'enterprise AI platform, MLOps, model serving, AI infrastructure, machine learning platform',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Enterprise AI Platform',
          provider: { '@type': 'Organization', name: 'Ikarmic' },
          areaServed: 'Worldwide',
          url: 'https://ikarmic.com/solutions/enterprise-ai-platform'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Solutions', item: 'https://ikarmic.com/solutions' },
            { '@type': 'ListItem', position: 2, name: 'Enterprise AI Platform', item: 'https://ikarmic.com/solutions/enterprise-ai-platform' }
          ]
        }
      ]
    },
    '/blog': {
      title: 'Blog: AI Strategy, Product & Governance Insights',
      description: 'Practical notes on building reliable AI products — from data strategy and model operations to human-centered implementation.',
      path: '/blog',
      keywords: 'AI blog, AI strategy, machine learning insights, AI governance, AI product engineering'
    },
    '/case-studies': {
      title: 'AI Case Studies: Real Results From Real Projects',
      description: 'Explore how Ikarmic delivered measurable AI outcomes for support automation, demand forecasting, and document intelligence.',
      path: '/case-studies',
      keywords: 'AI case studies, machine learning results, AI ROI, support automation case study, demand forecasting AI',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Ikarmic AI Case Studies',
        description: 'Real-world AI implementation case studies from Ikarmic.',
        url: 'https://ikarmic.com/case-studies'
      }
    },
    '/admin': {
      title: 'Admin',
      description: 'Ikarmic leads dashboard.',
      path: '/admin',
      noindex: true
    }
  };

  const config = seoMap[pathname] ?? {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    path: pathname,
    noindex: true
  };

  return <PageSeo config={config} />;
};

function App() {
  return (
    <Router>
      <Analytics />
      <RouteSeo />
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#070A12]">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <Suspense fallback={null}>
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/cx-support-ai" element={<CXSupportAI />} />
          <Route path="/solutions/intelligent-automation" element={<IntelligentAutomation />} />
          <Route path="/solutions/predictive-intelligence" element={<PredictiveIntelligence />} />
          <Route path="/solutions/ai-powered-marketing" element={<AIMarketingPlatform />} />
          <Route path="/solutions/enterprise-ai-platform" element={<EnterpriseAIPlatform />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>

        {/* Footer */}
        <Footer />

        {/* Back to Top */}
        <BackToTop />

        {/* GDPR Cookie Consent */}
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
