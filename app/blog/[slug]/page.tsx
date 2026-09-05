import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { BLOG_BASE_URL, getDynamicBlogPosts, getMarkdownPostBySlug, getRelatedBlogPosts, renderBlogMarkdown } from '../../../lib/blog-content.mjs'

export const dynamicParams = false

export function generateStaticParams() {
  return getDynamicBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getMarkdownPostBySlug(slug)
  if (!post) return {}
  const canonicalPath = `/blog/${post.slug}`
  const socialImage = `/blog/og/${post.slug}`
  return {
    title: `${post.title} | ConnectOnion Engineering Blog`,
    description: post.description,
    authors: [{ name: post.author, url: BLOG_BASE_URL }],
    keywords: [...post.tags, 'ConnectOnion', 'Python AI agents'],
    alternates: { canonical: canonicalPath },
    openGraph: { title: post.title, description: post.description, url: canonicalPath, siteName: 'ConnectOnion Docs', type: 'article', publishedTime: `${post.date}T00:00:00+10:00`, modifiedTime: `${post.date}T00:00:00+10:00`, authors: [post.author], tags: post.tags, images: [{ url: socialImage, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [socialImage] },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getMarkdownPostBySlug(slug)
  if (!post || post.isHandcrafted) notFound()
  const related = getRelatedBlogPosts(post)
  const canonicalUrl = `${BLOG_BASE_URL}/blog/${post.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BlogPosting', '@id': `${canonicalUrl}#article`, headline: post.title, description: post.description, url: canonicalUrl, mainEntityOfPage: canonicalUrl, datePublished: post.date, dateModified: post.date, inLanguage: 'en-AU', articleSection: post.tags[0], keywords: post.tags.join(', '), wordCount: post.wordCount, image: `${BLOG_BASE_URL}/blog/og/${post.slug}`, isPartOf: { '@id': `${BLOG_BASE_URL}/blog#blog` }, author: { '@type': 'Organization', '@id': `${BLOG_BASE_URL}/#organization`, name: post.author, url: BLOG_BASE_URL }, publisher: { '@type': 'Organization', '@id': `${BLOG_BASE_URL}/#organization`, name: 'ConnectOnion', logo: { '@type': 'ImageObject', url: `${BLOG_BASE_URL}/onion-logo.png` } }, about: post.tags.map((name) => ({ '@type': 'Thing', name })), mentions: [{ '@type': 'SoftwareApplication', name: 'ConnectOnion', url: BLOG_BASE_URL, applicationCategory: 'DeveloperApplication', operatingSystem: 'Python 3.10+' }] },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'ConnectOnion Docs', item: BLOG_BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Engineering Blog', item: `${BLOG_BASE_URL}/blog` }, { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl }] },
    ],
  }

  return (
    <main className="px-5 py-12 sm:px-8 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="hover:text-gray-900">Docs</Link></li><li aria-hidden="true">/</li><li><Link href="/blog" className="hover:text-gray-900">Engineering blog</Link></li></ol></nav>
        <header className="border-b border-gray-200 pb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700"><span>{post.tags[0]}</span><span aria-hidden="true">·</span><time dateTime={post.date}>{post.date}</time></div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-gray-950 sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">{post.description}</p>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-gray-500">By {post.author} · {post.readMinutes} min read · {post.wordCount.toLocaleString('en-AU')} words</p>{post.sourcePath && <CopyMarkdownButton markdownPath={post.sourcePath} filename={post.filename} floatingMobile={false} />}</div>
          <div className="mt-6 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">{tag}</span>)}</div>
        </header>
        <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(post.body) }} />
        <footer className="mt-16 border-t border-gray-200 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Continue reading</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">{related.map((item) => <Link key={item.slug} href={item.href} className="rounded-xl border border-gray-200 p-4 hover:border-gray-400"><span className="text-xs text-gray-500">{item.tags[0]}</span><span className="mt-2 block text-sm font-semibold leading-5 text-gray-900">{item.title}</span></Link>)}</div>
          <Link href="/blog" className="mt-8 inline-flex min-h-11 items-center font-semibold text-green-700 underline underline-offset-4">Browse every field note</Link>
        </footer>
      </article>
    </main>
  )
}
