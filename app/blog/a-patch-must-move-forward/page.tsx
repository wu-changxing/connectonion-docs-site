import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'A Patch Must Move Forward'
const description = 'Why every stable patch now carries a tracked forward-port obligation, and why a newer preview cannot publish while that work remains open.'
const canonicalPath = '/blog/a-patch-must-move-forward'

const articleMarkdown = `# A patch must move forward

${description}

## The failure

The 1.7 Stable ancestry audit found fixes in public 1.6.12 that RC10 did not contain. The newest test version was newer by number and older in behaviour.

## The rule

Every stable patch links a separate open issue labelled \`forward-port-required\`. It names every active higher line, at minimum the current preview, and closes only after each applicable forward-port PR merges and passes CI.

A newer preview, RC, or next-minor Stable cannot publish while such a tracker remains open. The patch itself may ship first, and an already-public immutable tag may be retried for recovery.

## The boundary

Forward-port product fixes, regression tests, migrations, documentation, and operational contracts. Do not copy stable version or channel metadata into a preview merely to create ancestry.
`

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
    publishedTime: '2026-08-25T00:00:00+10:00',
    modifiedTime: '2026-08-25T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release engineering', 'patch', 'preview', 'CI'],
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
  dateModified: '2026-08-25',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['release engineering', 'stable patches', 'preview releases'],
}

export default function PatchMustMoveForwardPage() {
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
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal · August 25, 2026 · Release engineering</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton content={articleMarkdown} filename="a-patch-must-move-forward.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-gray-900 [&_p]:my-4 [&_p]:leading-7 [&_p]:text-gray-700">
          <h2>The newest candidate was missing an older fix</h2>
          <p>While preparing 1.7 Stable, an ancestry audit found that public 1.6.12 contained fixes absent from RC10. The newest test version was newer by number and older in behaviour. We reviewed and forwarded the applicable changes into both 1.7 and 1.8, then cut RC11—but a one-time rescue was not a release policy.</p>

          <h2>The tempting merge was too broad</h2>
          <p>Merging an entire maintenance branch into a preview would carry version numbers, channel metadata, release notes, and older architectural assumptions along with the fixes. The graph would look connected while newer design decisions could be overwritten. The right unit is the reviewed product change, not the whole old branch.</p>

          <h2>The rule is now enforceable</h2>
          <p>Every stable patch PR must link a separate open <code>forward-port-required</code> issue. That ledger names every active higher line—at minimum the current preview—and records a focused PR or an explicit inapplicability decision for each patch change. It closes only after those PRs merge and pass CI.</p>
          <p>The protected release workflow checks that ledger. A newer preview, RC, or next-minor Stable cannot publish while any forward-port obligation remains open. The stable patch can still reach affected users first, and an already-public immutable tag can still be retried for recovery.</p>

          <h2>What moves forward</h2>
          <p>Product fixes, regression tests, migrations, user documentation, and operational contracts move forward. Stable version numbers and release-channel metadata do not. Conflicts are resolved against the newer architecture rather than hidden by a wholesale merge.</p>

          <h2>The tradeoff</h2>
          <p>Every patch now creates visible coordination work. That is intentional: the work existed before, but we discovered it late. We would revisit the mechanism if release lines can prove patch equivalence directly. Until then, a durable tracker and a hard publication gate are cheaper than shipping a preview that quietly regressed.</p>

          <p>See <Link href="/releases">Release Channels</Link> for the current Stable and preview versions.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
