import { ImageResponse } from 'next/og'
import { getAllBlogPosts } from '../../../../lib/blog-content.mjs'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getAllBlogPosts().find((candidate) => candidate.slug === slug)
  if (!post) return new Response('Not found', { status: 404 })
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: '#07110b', color: '#f9fafb', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, color: '#86efac' }}><span style={{ width: 24, height: 24, border: '6px solid #22c55e', borderRadius: 999 }} /><span>ConnectOnion · Engineering Blog</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div style={{ fontSize: post.title.length > 65 ? 54 : 66, lineHeight: 1.06, letterSpacing: '-0.035em', fontWeight: 700, maxWidth: 1060 }}>{post.title}</div>
        <div style={{ fontSize: 26, lineHeight: 1.4, color: '#d1d5db', maxWidth: 980 }}>{post.description}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#9ca3af' }}><span>{post.tags.slice(0, 3).join(' · ')}</span><span>{post.date}</span></div>
    </div>,
    { width: 1200, height: 630 },
  )
}
