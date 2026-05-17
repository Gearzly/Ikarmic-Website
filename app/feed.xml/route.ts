import { NextResponse } from 'next/server'

const BASE = 'https://ikarmic.com'

const posts = [
  {
    slug: 'why-adaptive-ai-systems-outperform-static-models',
    title: 'Why Adaptive AI Systems Outperform Static Models',
    description: 'Static models trained once and deployed forever are quietly failing. Data drift, concept shift, and changing user behaviour erode accuracy — often without anyone noticing until the damage is done.',
    date: '2026-04-19T00:00:00+05:30',
    category: 'Strategy',
  },
  {
    slug: 'ethical-by-design-ai-governance-not-a-checklist',
    title: 'Ethical by Design: AI Governance Is Not a Checklist',
    description: 'A bias audit done once at deployment is not governance. Real AI governance is operational — continuous, embedded in the build cycle, and accountable to stakeholders beyond the engineering team.',
    date: '2026-04-12T00:00:00+05:30',
    category: 'Governance',
  },
  {
    slug: 'invisible-ai-human-centered-design-machine-learning',
    title: 'Invisible AI: Human-Centred Design for Machine Learning',
    description: 'The best AI features are the ones users don\'t think of as AI at all. They just feel like a product that works — fast, relevant, and surprisingly accurate.',
    date: '2026-04-05T00:00:00+05:30',
    category: 'Product',
  },
]

export const dynamic = 'force-static'

export async function GET() {
  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ikarmic AI Blog</title>
    <link>${BASE}/blog</link>
    <description>Thinking on AI strategy, governance, and human-centred design from the Ikarmic team.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/og-default.png</url>
      <title>Ikarmic AI Blog</title>
      <link>${BASE}/blog</link>
    </image>
${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
