import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Read configuration from environment variables
export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'df24xwzm',
  dataset: import.meta.env.SANITY_DATASET || 'tftltn-dev-blog',
  useCdn: import.meta.env.SANITY_USE_CDN === 'true',
  apiVersion: import.meta.env.SANITY_API_VERSION || '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// TypeScript types for Sanity documents
export interface Author {
  _id: string
  name: string
  slug: { current: string }
  image?: SanityImageSource
  bio?: any[]
}

export interface Category {
  _id: string
  title: string
  description?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  author: Author
  mainImage?: SanityImageSource
  categories?: Category[]
  publishedAt: string
  body: any[]
  excerpt?: string
}

// Mock data for development
export const mockBlogPosts = [
  {
    _id: '1',
    title: 'The Evolution of Speed Racer: From Classic Anime to Modern Interpretations',
    slug: { current: 'speed-racer-evolution' },
    excerpt: 'Exploring how Speed Racer has influenced racing anime and modern entertainment, from the original 1967 series to contemporary adaptations.',
    publishedAt: '2025-01-15',
    author: {
      name: 'Tom',
      role: 'Co-Host & Chief Nerd Officer'
    },
    category: 'Analysis',
    tags: ['anime', 'speed-racer', 'retro'],
    featured: true
  },
  {
    _id: '2', 
    title: 'Star Wars: The Original Trilogy\'s Lasting Impact on Sci-Fi Cinema',
    slug: { current: 'star-wars-impact' },
    excerpt: 'How the original Star Wars trilogy changed the landscape of science fiction movies and continues to influence filmmakers today.',
    publishedAt: '2025-01-12',
    author: {
      name: 'Tom',
      role: 'Co-Host & Chief Nerd Officer'
    },
    category: 'Reviews',
    tags: ['star-wars', 'sci-fi', 'movies'],
    featured: false
  },
  {
    _id: '3',
    title: 'X-Men Comics: The Ultimate Guide to Getting Started', 
    slug: { current: 'xmen-guide' },
    excerpt: 'New to X-Men comics? Here\'s your comprehensive guide to diving into the world of mutants, from classic storylines to modern runs.',
    publishedAt: '2025-01-10',
    author: {
      name: 'Mike',
      role: 'Co-Host & Nerd Extraordinaire'
    },
    category: 'Reviews',
    tags: ['x-men', 'comics', 'marvel'],
    featured: false
  },
  {
    _id: '4',
    title: 'ST:TNG Rewatch: Why \'The Next Generation\' Still Holds Up Today',
    slug: { current: 'stng-rewatch' },
    excerpt: 'Revisiting Star Trek: The Next Generation and examining why its themes and storytelling remain relevant decades later.',
    publishedAt: '2025-01-08',
    author: {
      name: 'Mike', 
      role: 'Co-Host & Nerd Extraordinaire'
    },
    category: 'Analysis',
    tags: ['star-trek', 'sci-fi', 'tv-shows'],
    featured: true
  }
]

// Sanity GROQ queries
const postQuery = `
  *[_type == "post"] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      description
    },
    publishedAt,
    body
  }
`

const featuredPostQuery = `
  *[_type == "post" && featured == true] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image
    },
    mainImage,
    categories[]->{
      _id,
      title,
      description
    },
    publishedAt,
    body
  } | order(publishedAt desc)
`

const singlePostQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    mainImage,
    categories[]->{
      _id,
      title,
      description
    },
    publishedAt,
    body
  }
`

// Check if we have content in Sanity, otherwise fall back to mock data
async function hasSanityContent(): Promise<boolean> {
  try {
    const posts = await client.fetch('*[_type == "post"][0...1]')
    return posts && posts.length > 0
  } catch (error) {
    console.warn('Unable to connect to Sanity, using mock data:', error)
    return false
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (await hasSanityContent()) {
    return await client.fetch(`${postQuery} | order(publishedAt desc)`)
  }
  
  // Fall back to mock data if no Sanity content
  return mockBlogPosts as unknown as BlogPost[]
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  if (await hasSanityContent()) {
    return await client.fetch(featuredPostQuery)
  }
  
  // Fall back to mock data if no Sanity content
  return mockBlogPosts.filter(post => post.featured) as unknown as BlogPost[]
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (await hasSanityContent()) {
    return await client.fetch(singlePostQuery, { slug })
  }
  
  // Fall back to mock data if no Sanity content
  const post = mockBlogPosts.find(post => post.slug.current === slug)
  return post ? (post as unknown as BlogPost) : null
}

export async function getAuthors() {
  return await client.fetch('*[_type == "author"] | order(name asc)')
}

export async function getCategories() {
  return await client.fetch('*[_type == "category"] | order(title asc)')
}
