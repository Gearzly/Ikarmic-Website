import { sanityClient } from './sanity'

export type SanityPost = {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: string
  coverImage?: string | null
  body?: unknown[]
}

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  readTime,
  "coverImage": coverImage.asset->url
`

export async function getPosts(): Promise<SanityPost[]> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`,
    )
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<SanityPost | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS}, body }`,
      { slug },
    )
  } catch {
    return null
  }
}
