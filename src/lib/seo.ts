export const SITE_NAME = 'Ikarmic AI Services and Solutions'
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://ikarmic.ai'
).replace(/\/$/, '')
export const DEFAULT_OG_IMAGE = '/images/hero_city_bg.jpg'

export type PageSeoConfig = {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  keywords?: string
  noindex?: boolean
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}

export const buildCanonicalUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`
}

export const defaultOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero_city_bg.jpg`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@ikarmic.ai',
    areaServed: 'Worldwide',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/ikarmic-ai',
    'https://x.com/ikarmicai',
  ],
}

export const defaultWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/services`,
    'query-input': 'required name=service',
  },
}
