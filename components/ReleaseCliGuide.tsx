import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { CopyMarkdownButton } from './CopyMarkdownButton'
import { renderBlogMarkdown } from '../lib/blog-content.mjs'

/** Render the reviewed, repository-owned CLI guide used by the installed package. */
export function ReleaseCliGuide({ name }: { name: 'env' | 'environment' | 'init' | 'create' | 'gmail' | 'gdrive' | 'synology' | 'outlook' }) {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'cli', `${name}.md`), 'utf8')
  return (
    <main className="px-4 md:px-8 py-16 md:py-24">
      <article className="max-w-4xl mx-auto min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Link href="/releases" className="text-green-700 underline">ConnectOnion 1.8.4</Link>
          <CopyMarkdownButton markdownPath={`/cli/${name}.md`} filename={`${name}.md`} floatingMobile={false} />
        </div>
        <div className="blog-prose break-words [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-8" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
      </article>
    </main>
  )
}
