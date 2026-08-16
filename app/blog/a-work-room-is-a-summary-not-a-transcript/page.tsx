import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'A Work Room Is a Summary, Not a Transcript'
const description = 'Why long native coding work needs a finite OIP summary, verified decisions, and honest evidence instead of a miniature terminal or a fabricated thumbnail.'
const canonicalPath = '/blog/a-work-room-is-a-summary-not-a-transcript'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-16T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['OIP', 'Codex', 'Claude Code', 'Work Room', 'approvals'],
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
  about: ['OIP Work Room', 'native coding adapters', 'approval presentation'],
}

export default function WorkRoomSummaryPage() {
  return (
    <main className="px-5 py-14 md:px-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Design Journal · August 16, 2026 · ConnectOnion 1.7.0a15</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">{title}</h1>
          <p className="text-lg leading-relaxed text-gray-600">{description}</p>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>Long-running coding work made the old card look busy without making it useful. A person could see tool-shaped detail, a text snapshot, an approval button, and a history at once, yet still have to search for the answer that mattered: what is happening now, does it need me, and what can I safely do?</p>

          <h2>The decision</h2>
          <p>The parent conversation now contains one compact semantic summary: the provider, a safe task category, the current state, and one entry action. The Work Room is the single detailed surface. Its Overview leads with progress and the latest useful result; Activity is the only secondary section. Verified file names appear inline when Core supplied them. There is no default transcript, no nested scroll region, and no simulated terminal or screenshot.</p>

          <h2>Truthful evidence has a narrow boundary</h2>
          <p>Codex and Claude Code each keep their private protocol. At the adapter edge, ConnectOnion translates only a finite OIP vocabulary: provider lifecycle, semantic activity, and a verified approval presentation. React accepts that vocabulary and rejects arbitrary provider text. O Chat renders the normalized state; it never parses provider JSON-RPC or treats a filename, command, or model message as browser authority.</p>
          <p>A visual preview is intentionally absent until a provider supplies a real renderable artifact. Activity is labelled as activity. That is less flashy than a fake thumbnail, but it is the only honest representation of a coding run that has not produced an image.</p>

          <h2>Approval and Stop are different actions</h2>
          <p>When a native provider asks for permission, Core supplies the human-readable what, where, and why after checking the Work Room boundary. The visible choices are <strong>Allow once</strong> and <strong>Reject this request</strong>. Reject resolves that request; it does not pretend to kill the provider. Stop appears only while a provider is starting or running, carries the exact provider invocation ID, and closes only that invocation.</p>

          <h2>Evidence before the claim</h2>
          <p>The release acceptance used a disposable localhost Host with a real native Codex app-server. Codex created and tested a small C sorting exercise, paused for two one-time approvals, and left a strict C11 rebuild and test run that passed independently. A separate run targeted Stop at the live invocation and reached a <code>cancelled</code> terminal state while the outer Host turn completed. Browser regression then covered the compact desktop card, long activity history, approval placement, terminal failure, targeted Stop, and 375px and 320px layouts.</p>

          <h2>What remains deliberately separate</h2>
          <p>Model-reviewed Auto approval is still a later, fail-closed policy feature; it is not a disguise for <code>approvalPolicy=never</code>. Continuation chat and visual artifacts also wait for their own typed OIP contracts and real sources. None of this reintroduces ACP or a generic third coding adapter.</p>

          <p>See <Link href="/blog/an-approval-is-not-execution-time">An Approval Is Not Execution Time</Link>, the <Link href="/useful-tools/codex">Codex adapter reference</Link>, and the <Link href="/cli/ai">co ai guide</Link>.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
