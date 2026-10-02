import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { CopyMarkdownButton } from './CopyMarkdownButton'
import { renderBlogMarkdown } from '../lib/blog-content.mjs'
import { PREVIEW_VERSION, STABLE_VERSION } from '../lib/version'

/** Render the reviewed, repository-owned CLI guide used by the installed package. */
export type CliGuideName = 'env' | 'environment' | 'init' | 'create' | 'gmail' | 'gdrive' | 'synology' | 'outlook' | 'onenote' | 'whatsapp' | 'schedule' | 'gcalendar' | 'telegram' | 'feishu' | 'sms' | 'proxy' | 'server' | 'youtube' | 'commands' | 'discord' | 'wiki-help' | 'rem' | 'benchmark' | 'tiktok' | 'audit' | 'search' | 'slack' | 'experimental-integrations' | 'feedback'

/** A guide for a command that ships only in the current preview says so, with the exact pin. */
export function ReleaseCliGuide({ name, preview = false, development = false, intro }: { name: CliGuideName; preview?: boolean; development?: boolean; intro?: React.ReactNode }) {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'cli', `${name}.md`), 'utf8')
  return (
    <main className="px-4 md:px-8 py-16 md:py-24">
      <article className="max-w-4xl mx-auto min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {/* Read from the channel constant, not typed in: this label sat at
              1.8.4 across two stable releases because it was a literal. */}
          {development ? (
            <Link href="https://github.com/openonion/connectonion/issues/2153" className="text-amber-800 underline">
              Experimental development branch · not released on PyPI
            </Link>
          ) : preview && PREVIEW_VERSION ? (
            <Link href="/releases" className="text-amber-800 underline">
              Preview {PREVIEW_VERSION}: pip install connectonion=={PREVIEW_VERSION}
            </Link>
          ) : (
            <Link href="/releases" className="text-green-700 underline">ConnectOnion {STABLE_VERSION}</Link>
          )}
          <CopyMarkdownButton markdownPath={`/cli/${name}.md`} filename={`${name}.md`} floatingMobile={false} />
        </div>
        {/* A site-owned note above the synced guide: the guide text is copied
            verbatim from the CLI, so anything the site adds goes here, not into it. */}
        {intro}
        <div className="blog-prose break-words [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-8" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
      </article>
    </main>
  )
}
