import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { makeMetadata } from '../../metadata'
import { renderBlogMarkdown } from '../../../lib/blog-content.mjs'

const releases = path.join(process.cwd(), 'public', 'releases')
const slugs = fs.readdirSync(releases).filter(name => /^\d+\.\d+\.\d+(?:a\d+|b\d+|rc\d+)?\.md$/.test(name))
  .map(name => name.slice(0, -3))

export const dynamicParams = false

export function generateStaticParams() {
  return [...slugs, 'archive'].map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return makeMetadata(
    slug === 'archive' ? 'ConnectOnion release archive' : `ConnectOnion ${slug} release notes`,
    slug === 'archive' ? 'Browse ConnectOnion release channels and past versions.' : `Read the ConnectOnion ${slug} changes and installation instructions.`,
    `/releases/${slug}`,
  )
}

export default async function ReleaseNotes({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug !== 'archive' && !slugs.includes(slug)) notFound()
  const source = slug === 'archive' ? '/releases.md' : `/releases/${slug}.md`
  const file = slug === 'archive' ? path.join(process.cwd(), 'public', 'releases.md') : path.join(releases, `${slug}.md`)
  const markdown = fs.readFileSync(file, 'utf8').replace(/\]\((?:releases\/)?(\d+\.\d+\.\d+(?:a\d+|b\d+|rc\d+)?)\.md\)/g, '](/releases/$1)')

  return (
    <div className="px-4 py-12 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl min-w-0">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
          <Link href="/releases" className="inline-flex min-h-11 items-center font-semibold text-green-800 underline underline-offset-4">Release channels</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>{slug === 'archive' ? 'Archive' : slug}</span>
        </nav>
        <div className="blog-prose break-words [&_h1]:mb-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_pre]:whitespace-pre-wrap [&_pre]:break-normal md:[&_h1]:text-4xl" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
        <p className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <Link href={source} className="underline underline-offset-4">View Markdown source</Link>
        </p>
      </article>
    </div>
  )
}
