import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'A Page Should Not Become a Wall'
const description = 'Why ConnectOnion 1.6.8 made received-mail limits explicit, traversable, and consistent instead of silently clamping requests.'
const canonicalPath = '/blog/a-page-should-not-become-a-wall'

export const metadata: Metadata = {
  title: 'Paginating an AI Agent Mailbox: Deterministic CLI Paging | ConnectOnion',
  description,
  keywords: ['ConnectOnion 1.6.8', 'email pagination', 'CLI pagination', 'API design', 'data completeness'],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-15T00:00:00+10:00',
    modifiedTime: '2026-08-15T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'email', 'pagination', 'API design'],
    images: [{ url: '/onion-logo.png', alt: 'ConnectOnion mailbox pagination design decision' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-15',
  dateModified: '2026-08-15',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['email pagination', 'API limits', 'data completeness', 'CLI guidance'],
}

export default function PageShouldNotBecomeWallPage() {
  return (
    <main className="px-5 md:px-10 py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />

      <article className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">
                Design Journal · August 15, 2026 · ConnectOnion 1.6.8
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
                {title}
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                A finite page protects a service. It must not pretend the rest of a mailbox does not exist.
              </p>
            </div>
            <CopyMarkdownButton
              markdownPath="/tutorials/a-page-should-not-become-a-wall.md"
              filename="a-page-should-not-become-a-wall.md"
            />
          </div>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            Received and sent mail exposed the same <code>last</code> idea but enforced different limits.
            Asking for 101 received messages failed while asking for 1,000 sent messages worked. The only
            way to learn the hidden boundary was to cross it.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-2">The decision</p>
            <p className="text-gray-900 font-semibold leading-relaxed m-0">
              Keep a finite page size, align the two mailboxes, and make every page reachable.
            </p>
          </div>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">The wrong repairs</h2>
          <h3 className="mt-7 mb-2 text-lg font-semibold text-gray-900">Silently clamp the request</h3>
          <p>
            Turning 1,000 into 100 would make the HTTP request green while making its meaning false. A
            reconciliation agent would believe it had asked for—and received—a thousand messages. Silent
            incompleteness is worse than a loud limit.
          </p>
          <h3 className="mt-7 mb-2 text-lg font-semibold text-gray-900">Document the 100-row ceiling</h3>
          <p>
            An explicit error is honest, but it preserves the wrong product behaviour. Users still cannot
            reconcile a mailbox larger than one page. The page boundary has become a mailbox boundary.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">A traversable boundary</h2>
          <p>
            ConnectOnion 1.6.8 aligns received and sent page sizes at 1,000 and adds an offset to the SDK,
            CLI, skill, and backend. Equal timestamps use message ID as a deterministic tie-breaker, so
            rows do not exchange pages between calls.
          </p>
          <pre className="my-6 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-100"><code>{`get_emails(last=1000, offset=2000)
co email inbox --last 1000 --offset 2000

# A full CLI page prints the exact next-page command.`}</code></pre>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">The tradeoff</h2>
          <p>
            Offset pagination is simple and inspectable, but inserts can shift later pages during a long
            traversal. Stable ordering prevents arbitrary swaps; callers that need a transactionally frozen
            snapshot still need a future cursor or snapshot API.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">Evidence</h2>
          <p>
            Tests cover limit and offset validation, request forwarding, unsupported-backend detection,
            deterministic backend ordering, CLI forwarding, and the next-page tip. The production backend
            and the public 1.6.8 wheel were verified together before these docs were published.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">What would make us revisit this</h2>
          <p>
            If high-volume reconciliation commonly spans concurrent writes, an opaque cursor tied to a
            stable snapshot would be worth its extra state. The current contract remains intentionally
            plain: a caller can see the limit, move past it, and know when traversal is complete.
          </p>

          <p className="text-gray-600">
            See <Link href="/cli/email" className="font-medium text-green-700 hover:underline">the email CLI guide</Link> for commands and{' '}
            <Link href="/blog/the-owner-needs-a-door" className="font-medium text-green-700 hover:underline">The Owner Needs a Door</Link>{' '}
            for the other shortest-path lesson in 1.6.8.
          </p>
        </div>

        <ContentNavigation />
      </article>
    </main>
  )
}
