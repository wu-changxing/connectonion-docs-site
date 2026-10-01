import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import { renderBlogMarkdown } from '../../lib/blog-content.mjs'
import { STABLE_VERSION } from '../../lib/version'

const URL = 'https://docs.connectonion.com/rem'
const TITLE = "co rem: your agent's memory of people and projects | ConnectOnion"
const DESCRIPTION =
  'co rem keeps Markdown pages on the people, projects and tools in your work, from your mail and Codex and Claude Code sessions. Try co rem in the opt-in 1.9.0 preview; stable 1.8.10 includes co wiki as Experimental.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ['co rem', 'co wiki', 'agent memory', 'personal knowledge base', 'Codex', 'Claude Code', 'Gmail', 'Outlook'],
  alternates: { canonical: URL },
  openGraph: { title: "co rem — your agent's memory", description: DESCRIPTION, url: URL, type: 'article' },
  twitter: { card: 'summary_large_image', title: "co rem — your agent's memory", description: DESCRIPTION },
}

/** The product page for co rem. The text lives in public/rem.md so the page
 *  and its copy-as-Markdown are the same words; the layout is the one the CLI
 *  guides use, because today co rem *is* a CLI guide: co wiki. */
export default function Page() {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'rem.md'), 'utf8')
  return (
    <main className="px-4 md:px-8 py-16 md:py-24">
      <article className="max-w-4xl mx-auto min-w-0">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {/* The feature is in stable as co wiki, so the label is the stable
              channel, read from the constant rather than typed in. */}
          <Link href="/releases" className="text-green-700 underline">ConnectOnion {STABLE_VERSION} · as co wiki, Experimental</Link>
          <CopyMarkdownButton markdownPath="/rem.md" filename="rem.md" floatingMobile={false} />
        </div>
        <div className="blog-prose break-words [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:mb-8" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
        <div className="mt-12">
          <ContentNavigation />
        </div>
      </article>
    </main>
  )
}
