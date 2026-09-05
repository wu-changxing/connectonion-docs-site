import { BLOG_BASE_URL, escapeXml, getAllBlogPosts } from '../../../lib/blog-content.mjs'

export const dynamic = 'force-static'

export function GET() {
  const posts = getAllBlogPosts()
  const latest = posts[0]?.date || '2026-01-01'
  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BLOG_BASE_URL}${post.href}</link>
      <guid isPermaLink="true">${BLOG_BASE_URL}${post.href}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <description>${escapeXml(post.description)}</description>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>ConnectOnion Engineering Blog</title>
    <link>${BLOG_BASE_URL}/blog</link>
    <description>Engineering decisions and verified lessons from building dependable Python AI agents.</description>
    <language>en-AU</language>
    <lastBuildDate>${new Date(`${latest}T00:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${BLOG_BASE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } })
}
