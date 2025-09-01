import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// For now, we'll use mock data. In production, replace these with actual Sanity credentials
export const client = createClient({
  projectId: 'your-project-id', // Replace with actual project ID when ready
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
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

// Mock function to simulate fetching blog posts
export async function getBlogPosts() {
  // In production, this would be:
  // return await client.fetch('*[_type == "blogPost"] | order(publishedAt desc)')
  
  // For now, return mock data
  return mockBlogPosts
}

export async function getFeaturedPosts() {
  return mockBlogPosts.filter(post => post.featured)
}

export async function getBlogPost(slug: string) {
  return mockBlogPosts.find(post => post.slug.current === slug)
}
