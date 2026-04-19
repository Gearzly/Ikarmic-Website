/**
 * scripts/prerender.mjs
 *
 * Run AFTER `npm run build`:
 *   node scripts/prerender.mjs
 *
 * Strategy:
 *  1. Build a server-side bundle of entry-server.tsx via Vite SSR.
 *  2. Import its renderHead(url) export.
 *  3. For every known route, inject the rendered <head> tags into a copy of
 *     dist/index.html and write it to dist/<route>/index.html so the
 *     Hostinger Node.js app server and crawlers receive real meta tags.
 *
 * The approach is additive: it does not remove any existing tags in
 * dist/index.html. Only the per-route HTML files gain the injected tags.
 */
import { build } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── Routes to prerender ────────────────────────────────────────────────────
// Keep in sync with App.tsx routes and entry-server.tsx seoMap.
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/ai-chatbots',
  '/services/business-automation',
  '/services/data-analytics',
  '/services/generative-ai',
  '/services/custom-ai',
  '/solutions',
  '/solutions/cx-support-ai',
  '/solutions/intelligent-automation',
  '/solutions/predictive-intelligence',
  '/solutions/ai-powered-marketing',
  '/solutions/enterprise-ai-platform',
  '/industries',
  '/industries/retail',
  '/industries/manufacturing',
  '/industries/education',
  '/industries/technology',
  '/blog',
  '/case-studies',
  '/resources',
  '/contact',
  '/privacy',
  '/terms',
]

// Tags we strip from the base dist/index.html before injecting per-route tags.
// This avoids duplicate meta tags in crawled HTML.
const META_TAG_PATTERNS = [
  /<title>[\s\S]*?<\/title>/gi,
  /<meta\s+name="description"[^>]*>/gi,
  /<meta\s+name="keywords"[^>]*>/gi,
  /<meta\s+name="robots"[^>]*>/gi,
  /<meta\s+property="og:[^"]*"[^>]*>/gi,
  /<meta\s+name="twitter:[^"]*"[^>]*>/gi,
  /<link\s+rel="canonical"[^>]*>/gi,
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
]

async function buildServerBundle() {
  console.log('[prerender] Building SSR bundle from src/entry-server.tsx …')
  await build({
    root: ROOT,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist/server',
    },
    logLevel: 'warn',
  })
  console.log('[prerender] SSR bundle ready at dist/server/')
}

async function main() {
  await buildServerBundle()

  // Dynamically import the just-built server entry (file:// URL required on Windows)
  const serverEntryPath = resolve(ROOT, 'dist/server/entry-server.js')
  const serverEntryUrl = pathToFileURL(serverEntryPath).href
  const { renderHead } = await import(serverEntryUrl)

  // Read the base client HTML
  const baseHtml = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf-8')

  // Strip default meta tags so per-route injected tags take precedence
  let templateHtml = baseHtml
  for (const pattern of META_TAG_PATTERNS) {
    templateHtml = templateHtml.replace(pattern, '')
  }
  // Clean up any blank lines left behind
  templateHtml = templateHtml.replace(/\n(\s*\n){2,}/g, '\n\n')

  let count = 0
  for (const route of ROUTES) {
    const headHtml = renderHead(route)
    if (!headHtml) continue

    const html = templateHtml.replace('</head>', `    ${headHtml}\n  </head>`)

    // Write to dist/<route>/index.html  (dist/index.html for the root)
    const routeDir =
      route === '/'
        ? resolve(ROOT, 'dist')
        : resolve(ROOT, 'dist', ...route.replace(/^\//, '').split('/'))

    mkdirSync(routeDir, { recursive: true })
    writeFileSync(resolve(routeDir, 'index.html'), html, 'utf-8')
    count++
  }

  console.log(`[prerender] Injected meta tags for ${count} route(s).`)
}

main().catch((err) => {
  console.error('[prerender] Fatal error:', err)
  process.exit(1)
})
