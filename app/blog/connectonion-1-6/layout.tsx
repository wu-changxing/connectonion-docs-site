import type { Metadata } from 'next'
import { getAllBlogPosts, BLOG_BASE_URL } from '../../../lib/blog-content.mjs'

const post = getAllBlogPosts().find((item) => item.slug === 'connectonion-1-6')!
const url = `${BLOG_BASE_URL}${post.href}`
export const metadata: Metadata = {
  title: `${post.seoTitle} | ConnectOnion`,
  description: post.description,
  alternates: { canonical: url },
  openGraph: { title: post.title, description: post.description, url, type: 'article', images: [`${BLOG_BASE_URL}/blog/og/${post.slug}`] },
  twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [`${BLOG_BASE_URL}/blog/og/${post.slug}`] },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
