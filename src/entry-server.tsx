/**
 * SSR entry used ONLY at build time by scripts/prerender.mjs.
 * Builds <head> HTML strings directly from the seoMap (no React rendering)
 * to avoid react-helmet-async v3 / React 19 SSR context incompatibility.
 *
 * Keep the seoMap in sync with the one in App.tsx when adding new routes.
 */
import {
  defaultOrganizationSchema,
  defaultWebsiteSchema,
  type PageSeoConfig,
} from './lib/seo';

const SITE_NAME = 'Ikarmic AI Services and Solutions';
const SITE_URL = 'https://ikarmic.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

function buildCanonicalUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p === '/' ? '' : p}`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const seoMap: Record<string, PageSeoConfig> = {
  '/': {
    title: 'AI Consulting and Product Engineering',
    description:
      'Ikarmic helps teams design, deploy, and scale reliable AI systems across support, operations, analytics, and product experiences.',
    path: '/',
    keywords:
      'AI consulting, AI product engineering, machine learning solutions, ethical AI, enterprise AI',
    schema: [
      defaultOrganizationSchema,
      defaultWebsiteSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ikarmic Home',
        description: 'AI consulting and implementation services for growing teams.',
        url: 'https://ikarmic.com/',
      },
    ],
  },
  '/about': {
    title: 'About Our AI Team and Delivery Approach',
    description:
      'Meet Ikarmic and learn how we deliver practical, ethical, and production-ready AI systems with measurable business outcomes.',
    path: '/about',
    keywords: 'AI team, AI delivery, ethical AI engineering, machine learning expertise',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Ikarmic',
      description: 'About our AI engineering approach, principles, and team expertise.',
      url: 'https://ikarmic.com/about',
    },
  },
  '/services': {
    title: 'AI Services: Automation, Analytics, Chatbots, and Custom AI',
    description:
      'Explore Ikarmic AI services including conversational AI, workflow automation, predictive analytics, and custom AI product development.',
    path: '/services',
    keywords:
      'AI services, AI automation, chatbots, predictive analytics, custom AI development, generative AI',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'AI Consulting and Development',
        provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
        areaServed: 'Worldwide',
        url: 'https://ikarmic.com/services',
      },
    ],
  },
  '/services/ai-chatbots': {
    title: 'AI Chatbots & Conversational AI Services',
    description:
      'Deploy intelligent chatbots across web, WhatsApp, and voice channels that reduce support costs and improve customer experience.',
    path: '/services/ai-chatbots',
    keywords: 'AI chatbots, conversational AI, WhatsApp bot, customer support automation, NLP chatbot',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'AI Chatbots & Conversational AI',
        provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
        areaServed: 'Worldwide',
        url: 'https://ikarmic.com/services/ai-chatbots',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
          { '@type': 'ListItem', position: 2, name: 'AI Chatbots', item: 'https://ikarmic.com/services/ai-chatbots' },
        ],
      },
    ],
  },
  '/services/business-automation': {
    title: 'AI Business Automation & Document Intelligence',
    description:
      'Automate document processing, workflow orchestration, and compliance checks with AI-driven automation that eliminates manual bottlenecks.',
    path: '/services/business-automation',
    keywords:
      'AI business automation, document intelligence, workflow automation, invoice processing, OCR AI',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'AI Business Automation',
        provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
        areaServed: 'Worldwide',
        url: 'https://ikarmic.com/services/business-automation',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
          { '@type': 'ListItem', position: 2, name: 'Business Automation', item: 'https://ikarmic.com/services/business-automation' },
        ],
      },
    ],
  },
  '/services/data-analytics': {
    title: 'AI Data Analytics & Predictive Intelligence',
    description:
      'Turn raw data into forecasts, anomaly alerts, and strategic insights with production-grade analytics models.',
    path: '/services/data-analytics',
    keywords:
      'AI data analytics, predictive intelligence, demand forecasting, anomaly detection, business analytics AI',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'AI Data Analytics & Predictive Intelligence',
        provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
        areaServed: 'Worldwide',
        url: 'https://ikarmic.com/services/data-analytics',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
          { '@type': 'ListItem', position: 2, name: 'Data Analytics', item: 'https://ikarmic.com/services/data-analytics' },
        ],
      },
    ],
  },
  '/services/generative-ai': {
    title: 'Generative AI Solutions: RAG, Content, Knowledge Assistants',
    description:
      'Harness large language models with retrieval pipelines, guardrails, and fine-tuning for content generation and knowledge access.',
    path: '/services/generative-ai',
    keywords:
      'generative AI, RAG, large language models, content generation, knowledge assistant, LLM fine-tuning',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Generative AI Solutions',
        provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
        areaServed: 'Worldwide',
        url: 'https://ikarmic.com/services/generative-ai',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
          { '@type': 'ListItem', position: 2, name: 'Generative AI', item: 'https://ikarmic.com/services/generative-ai' },
        ],
      },
    ],
  },
  '/services/custom-ai': {
    title: 'Custom AI Development: Bespoke Models & Platforms',
    description:
      'Custom ML models, AI-powered products, and intelligent platforms built from prototype to production with full ownership transfer.',
    path: '/services/custom-ai',
    keywords:
      'custom AI development, bespoke ML models, AI platform, MLOps, machine learning consulting',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Custom AI Development',
        provider: { '@type': 'Organization', name: 'Ikarmic AI Services and Solutions' },
        areaServed: 'Worldwide',
        url: 'https://ikarmic.com/services/custom-ai',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Services', item: 'https://ikarmic.com/services' },
          { '@type': 'ListItem', position: 2, name: 'Custom AI', item: 'https://ikarmic.com/services/custom-ai' },
        ],
      },
    ],
  },
  '/solutions': {
    title: 'AI Solutions: CX, Automation, Predictive Intelligence & More',
    description:
      'Outcome-focused AI solutions for customer experience, back-office automation, demand forecasting, marketing, and enterprise AI platforms.',
    path: '/solutions',
    keywords:
      'AI solutions, customer experience AI, intelligent automation, predictive intelligence, AI marketing, enterprise AI',
  },
  '/solutions/cx-support-ai': {
    title: 'CX & Support AI: Deflect Tickets and Delight Customers',
    description:
      'AI-powered customer experience systems that resolve tier-1 queries instantly, route complex issues intelligently, and reduce support costs by up to 35%.',
    path: '/solutions/cx-support-ai',
    keywords: 'CX AI, support automation, ticket deflection, customer experience AI, omnichannel chatbot',
  },
  '/solutions/intelligent-automation': {
    title: 'Intelligent Automation: Eliminate Manual Back-Office Work',
    description:
      'AI-driven automation for document processing, email triage, workflow orchestration, and compliance — reducing manual effort by up to 80%.',
    path: '/solutions/intelligent-automation',
    keywords: 'intelligent automation, document AI, back-office automation, workflow orchestration, RPA AI',
  },
  '/solutions/predictive-intelligence': {
    title: 'Predictive Intelligence: Forecast Demand and Detect Risk Early',
    description:
      'Predictive models and analytics pipelines for demand forecasting, churn prediction, fraud detection, and dynamic pricing — wired into your dashboards.',
    path: '/solutions/predictive-intelligence',
    keywords:
      'predictive intelligence, demand forecasting, churn prediction, fraud detection, business forecasting AI',
  },
  '/solutions/ai-powered-marketing': {
    title: 'AI-Powered Marketing: Scale Content and Automate Campaigns',
    description:
      'AI systems that generate brand-aligned content, score leads, automate campaign logic, and personalise experiences at scale.',
    path: '/solutions/ai-powered-marketing',
    keywords: 'AI marketing, content generation, lead scoring, campaign automation, AI personalisation',
  },
  '/solutions/enterprise-ai-platform': {
    title: 'Enterprise AI Platform: From Prototype to Production',
    description:
      'Design and build the infrastructure layer that takes AI experiments to reliable, scalable production systems — with full IP transfer and team enablement.',
    path: '/solutions/enterprise-ai-platform',
    keywords: 'enterprise AI platform, MLOps, model serving, AI infrastructure, machine learning platform',
  },
  '/industries': {
    title: 'Industries We Serve: Retail, Manufacturing, Education, Technology',
    description:
      'Ikarmic delivers AI solutions tailored to industry-specific challenges across retail, manufacturing, education, and technology.',
    path: '/industries',
    keywords: 'AI industries, AI for retail, AI for manufacturing, AI for education, AI for technology',
  },
  '/industries/retail': {
    title: 'AI for Retail & E-Commerce',
    description:
      'Demand forecasting, conversational commerce, and personalized experiences powered by AI for modern retail.',
    path: '/industries/retail',
    keywords: 'AI for retail, retail AI solutions, ecommerce AI, demand forecasting, retail chatbot',
  },
  '/industries/manufacturing': {
    title: 'AI for Manufacturing',
    description:
      'Predictive maintenance, document automation, and quality intelligence for smarter factory operations.',
    path: '/industries/manufacturing',
    keywords: 'AI for manufacturing, predictive maintenance, factory AI, document automation, quality control AI',
  },
  '/industries/education': {
    title: 'AI for Education',
    description: 'Adaptive learning, student chatbots, and retention analytics to improve outcomes at scale.',
    path: '/industries/education',
    keywords: 'AI for education, adaptive learning, edtech AI, student chatbot, retention analytics',
  },
  '/industries/technology': {
    title: 'AI for Technology Companies',
    description:
      'Custom models, developer copilots, and MLOps infrastructure to accelerate your AI roadmap.',
    path: '/industries/technology',
    keywords: 'AI for technology, developer copilot, MLOps, custom ML models, AI SaaS',
  },
  '/blog': {
    title: 'Blog: AI Strategy, Product & Governance Insights',
    description:
      'Practical notes on building reliable AI products — from data strategy and model operations to human-centered implementation.',
    path: '/blog',
    keywords: 'AI blog, AI strategy, machine learning insights, AI governance, AI product engineering',
  },
  '/case-studies': {
    title: 'AI Case Studies: Real Results From Real Projects',
    description:
      'Explore how Ikarmic delivered measurable AI outcomes for support automation, demand forecasting, and document intelligence.',
    path: '/case-studies',
    keywords: 'AI case studies, machine learning results, AI ROI, support automation case study, demand forecasting AI',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Ikarmic AI Case Studies',
      description: 'Real-world AI implementation case studies from Ikarmic.',
      url: 'https://ikarmic.com/case-studies',
    },
  },
  '/resources': {
    title: 'AI Resources: Case Studies, Industry Guides & Service Deep-Dives',
    description:
      'Explore AI case studies, industry-specific insights, and service breakdowns to evaluate how Ikarmic can help your team.',
    path: '/resources',
    keywords: 'AI resources, AI case studies, AI guides, machine learning resources',
  },
  '/contact': {
    title: 'Contact Ikarmic for AI Projects',
    description:
      'Request an AI consultation. Share your project scope and we will reply with timelines, feasibility, and next steps.',
    path: '/contact',
    keywords: 'AI consultation, contact AI team, AI project inquiry',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Ikarmic',
      description: 'Contact page for AI consulting and delivery inquiries.',
      url: 'https://ikarmic.com/contact',
    },
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'Read the Ikarmic privacy policy and how we handle inquiry and project data.',
    path: '/privacy',
    noindex: true,
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'Read the Ikarmic terms of service for website use and project engagement.',
    path: '/terms',
    noindex: true,
  },
};

/** Build <head> tag HTML for a given URL path and return an injectable string. */
export function renderHead(url: string): string {
  const c: PageSeoConfig = seoMap[url] ?? {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
    path: url,
    noindex: true,
  };

  const title = esc(`${c.title} | ${SITE_NAME}`);
  const desc = esc(c.description);
  const keywords = esc(
    c.keywords ??
      'AI consulting, machine learning solutions, AI automation, conversational AI, predictive analytics'
  );
  const robots = c.noindex ? 'noindex, nofollow' : 'index, follow';
  const canonical = buildCanonicalUrl(c.path);
  const ogImage = DEFAULT_OG_IMAGE;

  const schemaList: Array<Record<string, unknown>> = Array.isArray(c.schema)
    ? c.schema
    : c.schema
    ? [c.schema]
    : [];

  const lines: string[] = [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}" />`,
    `<meta name="keywords" content="${keywords}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${c.type ?? 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    ...schemaList.map(
      (s) =>
        `<script type="application/ld+json">${JSON.stringify(s)}</script>`
    ),
  ];

  return lines.join('\n    ');
}
