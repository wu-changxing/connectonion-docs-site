import fs from 'node:fs'
import path from 'node:path'
import { QuickStartHeader } from './QuickStartHeader'
import { ContentNavigation } from '../../components/ContentNavigation'
import { renderBlogMarkdown } from '../../lib/blog-content.mjs'

/**
 * Quick Start, command line only. The page renders public/quickstart/quickstart.md,
 * the same file the Copy button hands out, so the two cannot drift.
 *
 * It used to open with `co create` and then teach Python: custom tools, @xray,
 * breakpoints. That is the SDK, and it now lives under Python SDK. A reader
 * here should finish with an identity, a mailbox, Gmail, a browser and their
 * coding agent connected, and never open an editor. Output in the Markdown is
 * what the CLI printed on a clean ~/.co (co init, co status, co email inbox,
 * co skills link) or is copied from the source (co auth google's two lines).
 */
export default function QuickStartPage() {
  const markdown = fs.readFileSync(path.join(process.cwd(), 'public', 'quickstart', 'quickstart.md'), 'utf8')
  const body = markdown.replace(/^# .*\n/, '')
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto min-w-0">
        <QuickStartHeader />
        <div className="blog-prose break-words" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(body) }} />
        <ContentNavigation />
      </div>
    </div>
  )
}
