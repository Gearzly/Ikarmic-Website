import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ikarmic AI — AI that works for people',
    short_name: 'Ikarmic AI',
    description: 'Ikarmic designs and ships AI systems that are calm, reliable, and easy to adopt — chatbots, automation, analytics, generative AI, and custom ML for real business outcomes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
