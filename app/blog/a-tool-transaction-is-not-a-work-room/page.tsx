import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'A Tool Transaction Is Not a Work Room'
const description = 'Why OIP streams native coding activity and nested approvals live, while keeping raw terminal detail out of the default chat surface.'
const canonicalPath = '/blog/a-tool-transaction-is-not-a-work-room'

export const metadata: Metadata = {
  title: "Stream Native Coding Activity and Approvals | ConnectOnion",
  description: "Send live provider activity and approval events through OIP while keeping raw terminal detail out of the default chat surface.",
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-16T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['OIP', 'Codex', 'Claude Code', 'Work Room', 'observability'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-16',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['OIP provider activity', 'native coding adapters', 'approval correlation', 'Work Room observability'],
}

export default function ToolTransactionWorkRoomPage() {
  return (
    <main className="px-5 py-14 md:px-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Design Journal · August 16, 2026 · ConnectOnion 1.7.0a13</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">{title}</h1>
          <p className="text-lg leading-relaxed text-gray-600">{description}</p>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>A native coding provider can run for minutes, call several tools, pause for a command approval, and then continue in the same provider session. Treating all of that as one generic tool row makes the running work look silent until it is over. Treating it as a raw transcript makes chat unreadable.</p>

          <h2>The product question</h2>
          <p>A Work Room must answer four questions at a glance: what is the provider doing now, how much has happened, whether a person needs to decide something, and where to find the detail if it matters. It must still work after eight or more native steps, on a phone, and after a provider session resumes.</p>

          <h2>Alternatives considered</h2>
          <ul>
            <li>Show only the parent tool transaction after it finishes.</li>
            <li>Put every provider event, command, and output straight into the chat transcript.</li>
            <li>Render a fabricated terminal or browser thumbnail from text.</li>
            <li>Stream correlated semantic activity into one provider Work Room and disclose raw detail only on demand.</li>
          </ul>

          <h2>Decision</h2>
          <p>OIP keeps the ordinary message and cancellation lifecycle, while the Codex and Claude Code adapters emit a small live provider lane. Each activity carries the provider invocation identity; an approval carries that same invocation and its parent tool call. O Chat can therefore put the approval inside the card that caused it instead of creating a second, unrelated approval row.</p>
          <p>The card and full Work Room show a truthful <em>live activity snapshot</em>: the newest semantic step, status, duration, and a bounded newest-first activity list. Commands and outputs live behind an explicit disclosure. This keeps the conversation useful even when the provider has produced many steps.</p>

          <h2>Why there is no pretend screenshot</h2>
          <p>Codex&apos;s native adapter does not currently emit a screenshot or other visual artifact. A generated terminal image would look like evidence but would not be evidence. The UI therefore labels the compact preview as an activity snapshot. If an adapter later emits a real, safely scoped image artifact, the Work Room may render that actual artifact as a thumbnail; it must never invent one.</p>

          <h2>Tradeoffs and acceptance</h2>
          <p>Streaming adds a provider-specific translation path, but it makes cancellation and approval state visible while work is actually running. The acceptance path uses a real multi-step coding task: create and run a small Python algorithm, verify at least eight steps, pause for a harmless command approval, inspect desktop and phone layouts, then confirm that cancellation reaches a terminal state without leaving a stale approval.</p>
          <p>This is deliberately not an ACP feature. OIP remains the browser boundary, and Codex and Claude Code remain native backend adapters. A future Auto mode is a separate, model-reviewed and fail-closed approval policy; it does not weaken the default manual approval boundary.</p>

          <p>See the <Link href="/blog/oip-native-coding-adapters">OIP/native-adapter decision</Link>, the <Link href="/cli/ai">co ai guide</Link>, and the <Link href="/useful-tools/codex">Codex adapter reference</Link>.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
