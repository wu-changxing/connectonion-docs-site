import { BLOG_BASE_URL, getAllBlogPosts } from '../../../lib/blog-content.mjs'

export const dynamic = 'force-static'

export function GET() {
  const posts = getAllBlogPosts()
  const catalog = posts.map((post) => `- [${post.title}](${BLOG_BASE_URL}${post.href}): ${post.description} Topics: ${post.tags.join(', ')}.`).join('\n')
  const text = `# ConnectOnion Engineering Blog

> Citation-ready design decisions and implementation lessons from the team building ConnectOnion, an open-source Python toolkit for AI agents.

Canonical blog: ${BLOG_BASE_URL}/blog
RSS feed: ${BLOG_BASE_URL}/blog/feed.xml
Project: ${BLOG_BASE_URL}

## Articles

${catalog}
`
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } })
}
