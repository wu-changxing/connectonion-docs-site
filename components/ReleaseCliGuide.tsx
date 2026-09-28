import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { CopyMarkdownButton } from './CopyMarkdownButton'
import { renderBlogMarkdown } from '../lib/blog-content.mjs'
import { PREVIEW_VERSION, STABLE_VERSION } from '../lib/version'

/** Render the reviewed, repository-owned CLI guide used by the installed package. */
export type CliGuideName = 'env' | 'environment' | 'init' | 'create' | 'gmail' | 'gdrive' | 'synology' | 'outlook' | 'onenote' | 'whatsapp' | 'schedule' | 'gcalendar' | 'telegram' | 'feishu' | 'sms' | 'proxy' | 'server' | 'youtube' | 'commands' | 'discord' | 'wiki-help' | 'benchmark' | 'tiktok' | 'audit' | 'search' | 'slack'

/** A guide for a command that ships only in the current preview says so, with the exact pin. */
export function ReleaseCliGuide({ name, preview = false }: { name: CliGuideName; preview?: boolean }) {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'cli', `${name}.md`), 'utf8')
  return (
    <main className="px-4 md:px-8 py-16 md:py-24">
      <article className="max-w-4xl mx-auto min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {/* Read from the channel constant, not typed in: this label sat at
              1.8.4 across two stable releases because it was a literal. */}
          {preview && PREVIEW_VERSION ? (
            <Link href="/releases" className="text-amber-800 underline">
              Preview {PREVIEW_VERSION}: pip install connectonion=={PREVIEW_VERSION}
            </Link>
          ) : (
            <Link href="/releases" className="text-green-700 underline">ConnectOnion {STABLE_VERSION}</Link>
          )}
          <CopyMarkdownButton markdownPath={`/cli/${name}.md`} filename={`${name}.md`} floatingMobile={false} />
        </div>
        <div className="blog-prose break-words [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-8" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
      </article>
    </main>
  )
}
