/**
 * scripts/generate-og-image.mjs
 *
 * Run: node scripts/generate-og-image.mjs
 *
 * Generates a 1200x630 branded OG image using Satori (JSX→SVG) and
 * @resvg/resvg-js (SVG→PNG) and writes it to public/images/og-default.png.
 *
 * Exits gracefully with a warning if the dependencies are not installed,
 * so a plain `npm run build` never fails on this step.
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// ── Graceful dep check ─────────────────────────────────────────────────────
function hasDep(name) {
  try {
    require.resolve(name)
    return true
  } catch {
    return false
  }
}

if (!hasDep('satori') || !hasDep('@resvg/resvg-js')) {
  console.warn(
    '[generate-og-image] satori or @resvg/resvg-js not installed — skipping OG image generation.\n' +
      '  Run: npm install -D satori @resvg/resvg-js',
  )
  process.exit(0)
}

const { default: satori } = await import('satori')
const { Resvg } = await import('@resvg/resvg-js')

// ── Load Space Grotesk from node_modules (@fontsource/space-grotesk) ────────
function loadFont(weight) {
  const fontPath = resolve(
    __dirname,
    `../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-${weight}-normal.woff`,
  )
  if (!existsSync(fontPath)) {
    throw new Error(
      `Font file not found: ${fontPath}\n  Run: npm install -D @fontsource/space-grotesk`,
    )
  }
  return readFileSync(fontPath).buffer
}

let fontData400, fontData700
try {
  fontData400 = loadFont(400)
  fontData700 = loadFont(700)
} catch (err) {
  console.warn(
    '[generate-og-image] Could not load font, skipping:',
    err.message,
  )
  process.exit(0)
}

// ── Build SVG via Satori ───────────────────────────────────────────────────
// Satori takes a React-like element tree (plain objects, not JSX).
const h = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    ...(children.length === 0
      ? {}
      : { children: children.length === 1 ? children[0] : children }),
  },
})

const element = h(
  'div',
  {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 1200,
      height: 630,
      background: '#070A12',
      padding: '60px 72px',
      fontFamily: 'Space Grotesk',
    },
  },
  // ── Top row: wordmark ──────────────────────────────────────────────────
  h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 16 } },
    h('div', {
      style: {
        width: 10,
        height: 40,
        background: '#6366f1',
        borderRadius: 3,
      },
    }),
    h(
      'span',
      {
        style: {
          color: '#ffffff',
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: '-0.5px',
        },
      },
      'ikarmic',
    ),
  ),
  // ── Centre: headline ──────────────────────────────────────────────────
  h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
    h(
      'div',
      {
        style: {
          color: '#ffffff',
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-2px',
        },
      },
      'AI That Works',
    ),
    h(
      'div',
      {
        style: {
          color: '#6366f1',
          fontSize: 72,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-2px',
        },
      },
      'In Production',
    ),
  ),
  // ── Bottom row: domain + tagline ──────────────────────────────────────
  h(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    h(
      'span',
      {
        style: {
          color: 'rgba(255,255,255,0.5)',
          fontSize: 24,
          fontWeight: 500,
        },
      },
      'ikarmic.com',
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: 999,
          padding: '8px 20px',
        },
      },
      h(
        'span',
        { style: { color: '#a5b4fc', fontSize: 18, fontWeight: 500 } },
        'AI Consulting & Solutions',
      ),
    ),
  ),
)

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Space Grotesk',
      data: fontData400,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Space Grotesk',
      data: fontData700,
      weight: 700,
      style: 'normal',
    },
  ],
})

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
const pngData = resvg.render()
const pngBuffer = pngData.asPng()

const outPath = resolve(__dirname, '../public/images/og-default.png')
writeFileSync(outPath, pngBuffer)
console.log(`[generate-og-image] Wrote OG image to ${outPath}`)
