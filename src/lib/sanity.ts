import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'mco9m5ms',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  useCdn: true,
  apiVersion: '2025-01-01',
})
