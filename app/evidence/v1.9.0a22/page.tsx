import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { makeMetadata } from '../../metadata'
import { renderBlogMarkdown } from '../../../lib/blog-content.mjs'

const source = '/evidence/v1.9.0a22/REVIEW.md'

export const metadata = makeMetadata(
  'REM 1.9.0a22 experience review',
  'Independent AI founder and UI review of sampled REM pages, source dialogs, mobile states, findings, and remaining gaps.',
  '/evidence/v1.9.0a22',
)

export default function ReviewPage() {
  const file = path.join(process.cwd(), 'public', 'evidence', 'v1.9.0a22', 'REVIEW.md')
  const markdown = fs.readFileSync(file, 'utf8')
    .replace(/\]\(([-\w]+\.png)\)/g, '](/evidence/v1.9.0a22/$1)')

  return (
    <div className="px-4 py-12 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl min-w-0">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
          <Link href="/releases/1.9.0a22" className="inline-flex min-h-11 items-center font-semibold text-green-800 underline underline-offset-4">1.9.0a22 release notes</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>Experience review</span>
        </nav>
        <div className="blog-prose break-words [&_h1]:mb-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_table]:block [&_table]:overflow-x-auto md:[&_h1]:text-4xl" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
        <p className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <Link href={source} className="underline underline-offset-4">View Markdown source</Link>
        </p>
      </article>
    </div>
  )
}
