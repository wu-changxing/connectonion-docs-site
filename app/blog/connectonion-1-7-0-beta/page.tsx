import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'co ai Now Delegates to Codex and Claude Code, Live'
const description = 'ConnectOnion 1.7.0 beta: co ai hands real coding work to Codex and Claude Code and shows it happening in a resumable Work Room, in the browser or the terminal.'
const canonicalPath = '/blog/connectonion-1-7-0-beta'
const installCommand = 'pip install connectonion==1.7.0b1'

const releaseMarkdown = `# ConnectOnion 1.7.0 beta

${description}

## What's new

- \`co ai\` delegates real coding work to Codex and Claude Code, and shows it happening in a live Work Room — current state, approvals and progress, not a silent black box and not a raw terminal dump.
- Sessions are resumable: refresh the browser or drop the connection mid-task, and the Work Room picks back up where it left off.
- \`co ai\` runs from the terminal or as a browser chat at chat.openonion.ai, backed by the same authenticated connection and official SDK-conformant protocol either way.
- Todos update live as work progresses, tool approvals are explicit, and a hard stop actually stops the running work — not just the display of it.

## This is a beta

The feature train for 1.7 is frozen here. Everything above has been exercised end to end; from this point to 1.7.0 stable, only stabilisation fixes land on this line. New feature work targets 1.8 on \`main\`.

## Try it

\`\`\`bash
${installCommand}
\`\`\`

Feedback on this beta shapes what ships as 1.7.0 stable — report anything that surprises you.
`

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'ConnectOnion 1.7.0 beta',
    'co ai',
    'Codex',
    'Claude Code',
    'Work Room',
    'AI coding agent',
    'Python AI agent framework',
  ],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-18T00:00:00+10:00',
    modifiedTime: '2026-08-19T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'beta', 'co ai', 'Codex', 'Claude Code'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-18',
  dateModified: '2026-08-19',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['co ai', 'Codex', 'Claude Code', 'Work Room'],
}

export default function ConnectOnion170BetaPage() {
  return (
    <main className="px-5 md:px-10 py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Release notes · August 18, 2026 · ConnectOnion 1.7.0 beta</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton content={releaseMarkdown} filename="connectonion-1-7-0-beta.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p><code>co ai</code> has always run a coding agent against your project. In 1.7 it can hand a task straight to Codex or Claude Code and stay honest about what is happening — not a spinner that hides everything, and not a raw terminal transcript dumped into chat. The Work Room shows current state: what the delegated agent is doing right now, what it wants approved, and what it just finished. You watch it work instead of guessing.</p>
          <p>Close the tab and come back, and the session is still there. The Work Room is resumable — it reconnects to the same live work rather than starting a fresh, disconnected one, whether you left through a browser refresh, a dropped connection, or just closing your laptop.</p>
          <h2>Terminal or browser, same agent</h2>
          <p>Run <code>co ai</code> in a terminal for a direct session, or let it open a browser chat at <code>chat.openonion.ai</code> — both talk to the same coding agent over the same authenticated connection, using a protocol that now conforms to the official agent client SDK. Todos update live as the agent works through them, every tool call that needs your say-so asks explicitly, and a hard stop stops the actual running work, not just what the screen shows.</p>
          <h2>This is a beta</h2>
          <p>The 1.7 feature train is frozen as of this release. Everything above — the delegation, the Work Room, resumable sessions, the authenticated connection, the SDK conformance — has been exercised end to end. From here to 1.7.0 stable, this line takes stabilisation fixes only; new feature work targets 1.8 on <code>main</code>.</p>
          <h2>Try it</h2>
          <pre><code>{installCommand}</code></pre>
          <p>This installs the exact beta candidate, next to your existing stable install. See the <Link href="/cli/ai">co ai guide</Link> for the full command reference.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
