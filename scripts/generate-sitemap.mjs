/**
 * scripts/generate-sitemap.mjs
 *
 * Run: node scripts/generate-sitemap.mjs
 *
 * Fetches live blog post slugs from Sanity and merges them with the static
 * route list, then writes public/sitemap.xml.
 * Falls back gracefully to static routes if the Sanity fetch fails.
 */
import { createClient } from '@sanity/client'
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://ikarmic.com'
const TODAY = new Date().toISOString().split('T')[0]

// ── Static routes ──────────────────────────────────────────────────────────
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/ai-chatbots', priority: '0.8', changefreq: 'monthly' },
  {
    path: '/services/business-automation',
    priority: '0.8',
    changefreq: 'monthly',
  },
  { path: '/services/data-analytics', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/generative-ai', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/custom-ai', priority: '0.8', changefreq: 'monthly' },
  { path: '/solutions', priority: '0.9', changefreq: 'monthly' },
  { path: '/solutions/cx-support-ai', priority: '0.8', changefreq: 'monthly' },
  {
    path: '/solutions/intelligent-automation',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/solutions/predictive-intelligence',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/solutions/ai-powered-marketing',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/solutions/enterprise-ai-platform',
    priority: '0.8',
    changefreq: 'monthly',
  },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/retail', priority: '0.7', changefreq: 'monthly' },
  { path: '/industries/manufacturing', priority: '0.7', changefreq: 'monthly' },
  { path: '/industries/education', priority: '0.7', changefreq: 'monthly' },
  { path: '/industries/technology', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/case-studies', priority: '0.8', changefreq: 'monthly' },
  { path: '/resources', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
]

// ── Hardcoded case study slugs (update when new case studies are published) ─
const CASE_STUDY_SLUGS = [
  'support-automation',
  'demand-forecasting',
  'document-intelligence',
]

function buildUrl({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

async function fetchBlogSlugs() {
  try {
    const client = createClient({
      projectId: process.env.VITE_SANITY_PROJECT_ID ?? 'mco9m5ms',
      dataset: process.env.VITE_SANITY_DATASET ?? 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
    const posts = await client.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current, publishedAt }`,
    )
    return posts.map((p) => ({
      slug: p.slug,
      lastmod: p.publishedAt ? p.publishedAt.split('T')[0] : TODAY,
    }))
  } catch (err) {
    console.warn(
      '[generate-sitemap] Sanity fetch failed — using static routes only:',
      err.message,
    )
    return []
  }
}

async function main() {
  const blogPosts = await fetchBlogSlugs()

  const entries = [
    // Static pages
    ...STATIC_ROUTES.map((r) =>
      buildUrl({
        loc: `${SITE_URL}${r.path}`,
        lastmod: TODAY,
        changefreq: r.changefreq,
        priority: r.priority,
      }),
    ),
    // Dynamic blog posts
    ...blogPosts.map((p) =>
      buildUrl({
        loc: `${SITE_URL}/blog/${p.slug}`,
        lastmod: p.lastmod,
        changefreq: 'monthly',
        priority: '0.7',
      }),
    ),
    // Case studies
    ...CASE_STUDY_SLUGS.map((slug) =>
      buildUrl({
        loc: `${SITE_URL}/case-studies/${slug}`,
        lastmod: TODAY,
        changefreq: 'monthly',
        priority: '0.7',
      }),
    ),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
  ].join('\n')

  const outPath = resolve(__dirname, '../public/sitemap.xml')
  writeFileSync(outPath, xml, 'utf-8')
  console.log(`[generate-sitemap] Wrote ${entries.length} URLs to ${outPath}`)
  if (blogPosts.length) {
    console.log(
      `[generate-sitemap]  ↳ ${blogPosts.length} blog post(s) from Sanity`,
    )
  }
}

main()
