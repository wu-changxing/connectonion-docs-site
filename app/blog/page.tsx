import type { Metadata } from 'next'
import BlogIndex, { type BlogIndexPost } from '../../components/BlogIndex'
import { BLOG_BASE_URL, getAllBlogPosts } from '../../lib/blog-content.mjs'

export const metadata: Metadata = {
  title: 'ConnectOnion Engineering Blog | AI Agent Design Decisions',
  description: 'Learn how ConnectOnion isolates Chromium egress, bounds agent permissions, tests real provider sessions, and promotes verified Python release candidates.',
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': `${BLOG_BASE_URL}/blog/feed.xml`,
      'text/plain': `${BLOG_BASE_URL}/blog/llms.txt`,
    },
  },
  openGraph: {
    title: 'ConnectOnion Engineering Blog',
    description: 'Field notes and design decisions from building dependable Python AI agents.',
    url: '/blog',
    siteName: 'ConnectOnion Docs',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ConnectOnion engineering blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConnectOnion Engineering Blog',
    description: 'Field notes and design decisions from building dependable Python AI agents.',
    images: ['/og-image.png'],
  },
}

export default function BlogPage() {
  const posts: BlogIndexPost[] = getAllBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    readMinutes: post.readMinutes,
    href: post.href,
  }))

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BLOG_BASE_URL}/blog#blog`,
    url: `${BLOG_BASE_URL}/blog`,
    name: 'ConnectOnion Engineering Blog',
    description: metadata.description,
    inLanguage: 'en-AU',
    publisher: {
      '@type': 'Organization',
      '@id': `${BLOG_BASE_URL}/#organization`,
      name: 'ConnectOnion',
      url: BLOG_BASE_URL,
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      url: `${BLOG_BASE_URL}${post.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }}
      />
      <BlogIndex posts={posts} />
    </>
  )
}
