import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'co ai Delegates to Codex and Claude Code — and You Watch It Work'
const description = 'ConnectOnion 1.7.0 is stable: real coding delegation with a live, resumable Work Room, three plain permission modes, and tool activity that reads as intent.'
const canonicalPath = '/blog/connectonion-1-7'
const installCommand = 'pip install --upgrade connectonion'

const releaseMarkdown = `# ConnectOnion 1.7.0

${description}

## What's new

- \`co ai\` hands real coding work to Codex and Claude Code and shows it happening in a live Work Room — current state, approvals, progress. Not a spinner, not a terminal dump.
- Sessions are resumable: refresh the browser or drop the connection mid-task and the Work Room reconnects to the same live work.
- Permissions are three plain modes: **read-only** (everything asks), **auto** (the default — reversible workspace work runs, anything external or destructive asks), **full-access** (a bounded grant with an explicit turn budget that expires back to auto).
- Tool activity leads with intent: each step shows a short natural-language line about what is being done and why; the raw call sits one click away.
- Terminal or browser, same agent: \`co ai\` in a terminal, or a web chat at chat.openonion.ai over the same authenticated connection.

## Upgrade

\`\`\`bash
${installCommand}
\`\`\`
`

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'ConnectOnion 1.7.0',
    'co ai',
    'Codex',
    'Claude Code',
    'Work Room',
    'AI coding agent',
    'agent permissions',
    'Python AI agent framework',
  ],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-25T00:00:00+10:00',
    modifiedTime: '2026-08-28T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'stable', 'co ai', 'Codex', 'Claude Code'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-25',
  dateModified: '2026-08-28',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['co ai', 'Codex', 'Claude Code', 'Work Room', 'permissions'],
}

export default function ConnectOnion170Page() {
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
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Release notes · August 25, 2026 · ConnectOnion 1.7.0 · Stable</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton content={releaseMarkdown} filename="connectonion-1-7.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p><code>co ai</code> has always run a coding agent against your project. In 1.7 it can hand a task straight to Codex or Claude Code and stay honest about what is happening. The Work Room shows current state: what the delegated agent is doing right now, what it wants approved, what it just finished. Not a spinner that hides everything, and not a raw terminal transcript dumped into chat — a summary you can trust, with the detail one click away.</p>
          <p>Close the tab and come back: the session is still there. The Work Room reconnects to the same live work whether you left through a browser refresh, a dropped connection, or a closed laptop lid.</p>

          <h2>Three permission modes, plain names</h2>
          <p>1.7 collapses the permission system into three modes anyone can hold in their head:</p>
          <ul>
            <li><strong>read-only</strong> — every tool call asks a human first; reads pass.</li>
            <li><strong>auto</strong> — the default. Reversible workspace work just runs; anything external, destructive, or credential-touching stops and asks.</li>
            <li><strong>full-access</strong> — nothing asks, bounded by an explicit turn budget you set. When the budget runs out, the session drops back to auto. A bounded grant, never a standing state.</li>
          </ul>
          <p>The server owns this state — a client cannot talk itself into more authority — and the same three words appear everywhere: the CLI, the browser, the Control Center.</p>

          <h2>Activity that reads as intent</h2>
          <p>Tool cards now lead with a short natural-language line — what is being done and why — written by the model that made the call. The SQL string, the shell command, the raw result: all still there, collapsed one click away. Watching an agent work should feel like reading a colleague&apos;s status updates, not tailing a log file.</p>

          <h2>Terminal or browser, same agent</h2>
          <p>Run <code>co ai</code> in a terminal for a direct session, or let it open a web chat at <code>chat.openonion.ai</code> — both talk to the same coding agent over the same authenticated connection. Todos update live, approvals are explicit, and a hard stop stops the actual running work.</p>

          <h2>Upgrade</h2>
          <pre><code>{installCommand}</code></pre>
          <p>See the <Link href="/cli/ai">co ai guide</Link> and the <Link href="/features/permissions">permissions guide</Link>. The 1.7 line now takes stabilisation patches; new feature work — remote browser sessions and async execution — is the 1.8 preview train.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
