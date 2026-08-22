import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'The Work Room Is a View, Not a Second Agent'
const description = 'Why the native Codex and Claude Code Work Room keeps one OIP writer, defensive readers, and one calm decision surface.'
const canonicalPath = '/blog/workroom-is-a-view'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: ['Codex', 'Claude Code', 'OIP', 'O Chat', 'agent observability', 'native coding agent'],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-17T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['OIP', 'Codex', 'Claude Code', 'O Chat', 'architecture'],
    images: [{ url: '/onion-logo.png', alt: 'A calm native coding Work Room' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/onion-logo.png'],
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-17',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['OIP', 'native coding agents', 'Codex', 'Claude Code', 'agent observability'],
}

export default function WorkroomIsAViewPage() {
  return (
    <main className="px-5 py-14 md:px-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />

      <article className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Design Decision · August 17, 2026
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
            The Work Room Is a View, Not a Second Agent
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">
            A long-running coding task should be legible without making the browser a second runtime.
          </p>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            A one-message demo can make a coding agent look finished long before it has done anything useful. A proper
            acceptance run needs to inspect a workspace, write a small program, compile it, run tests, pause for a
            decision, and continue. That is when a product learns whether its interface is reporting work or merely
            accumulating boxes.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-green-700">The decision</p>
            <p className="m-0 font-semibold leading-relaxed text-gray-900">
              ConnectOnion Core is the one writer of native coding-provider state. The React package validates and
              normalizes that bounded OIP state. O Chat renders one compact card and one continuous Work Room.
            </p>
          </div>

          <h2>One writer, defensive readers</h2>
          <p>
            Codex and Claude Code are native providers. Their adapters translate provider lifecycle into typed OIP
            events with a provider, invocation identity, revision, semantic activity, bounded message, approval and
            optional real image evidence. Core decides what is safe to expose. It does not send raw commands, paths,
            hidden prompts or terminal output to the browser.
          </p>
          <p>
            <code>@connectonion/react</code> does not reconstruct that state from a chat transcript. It validates the
            envelope, rejects stale authority, and keeps the correlation needed for reconnect and direct input. O Chat
            does not implement a second provider adapter. It reads the normalized state and renders it.
          </p>

          <h2>Why the early Work Room felt busy</h2>
          <p>
            The first design put a conversation panel, a status card, a preview panel, an activity list and a composer
            next to one another. Each element was reasonable in isolation, but together they made the reader decide
            where to look before they could understand what Codex was doing.
          </p>
          <p>
            The current hierarchy has one question at the top: <strong>what is happening now?</strong> It shows a
            current semantic state, then the native conversation or verified view if there is real evidence. Earlier
            activity is deliberately folded away. The composer is one field and one send action. When a provider asks
            for approval, that decision replaces the passive content instead of competing with it.
          </p>

          <h2>Evidence is not decoration</h2>
          <p>
            A Codex thumbnail is useful only when it is actual provider evidence for the current invocation revision.
            Text and terminal output must not be dressed up as a screenshot. If the provider has no verified raster,
            the card remains text-first. That is a truthful absence, not an incomplete simulation.
          </p>
          <p>
            The same rule applies to direct messages. A Work Room message is not called sent because a host queued it.
            The browser retains its draft until live Codex accepts <code>turn/steer</code>, or a resumed native thread
            accepts a new <code>turn/start</code>. The acknowledgement therefore describes an event that happened,
            rather than a request that might happen later.
          </p>

          <h2>What this alpha proves</h2>
          <ul>
            <li>One compact parent-card action opens the Work Room.</li>
            <li>A long native run stays readable on desktop and a 375px phone width.</li>
            <li>Earlier activity stays available without becoming the default transcript.</li>
            <li>Approval, Stop and native direct input retain their own honest lifecycle boundaries.</li>
            <li>Initial semantic focus announces the task heading without styling that non-interactive text as a control; buttons and the composer keep visible keyboard focus.</li>
            <li>Only native Codex and Claude Code adapters participate in this release path.</li>
          </ul>
          <p>
            This is intentionally a preview boundary, not a promise that every future coding feature belongs in the
            Work Room. Automatic approval and deeper autonomy need their own policy and review design. For now, the
            product proves that a real native run can remain calm, inspectable and truthful.
          </p>
        </div>

        <aside className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6" aria-label="Related resources">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">Related resources</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="https://github.com/openonion/connectonion/issues/1109" className="font-medium text-green-700 hover:underline">Core OIP Work Room issue</a>
            <a href="https://github.com/openonion/oo-chat/issues/187" className="font-medium text-green-700 hover:underline">O Chat hierarchy issue</a>
            <Link href="/releases" className="font-medium text-green-700 hover:underline">Preview release notes</Link>
          </div>
        </aside>

        <ContentNavigation />
      </article>
    </main>
  )
}
