import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'The Owner Needs a Door'
const description = 'Why co ai creates one private owner invite automatically, keeps it out of logs, and reveals it only through an explicit command.'
const canonicalPath = '/blog/the-owner-needs-a-door'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: ['ConnectOnion 1.6.8', 'co ai', 'owner invite', 'secure onboarding', 'CLI security'],
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
    tags: ['release', 'security', 'onboarding', 'CLI'],
    images: [{ url: '/onion-logo.png', alt: 'ConnectOnion owner onboarding design decision' }],
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
  about: ['secure onboarding', 'owner recovery', 'CLI secret handling'],
}

export default function OwnerNeedsDoorPage() {
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
                A careful default must keep strangers out and still give the owner a private way back in.
              </p>
            </div>
            <CopyMarkdownButton
              markdownPath="/tutorials/the-owner-needs-a-door.md"
              filename="the-owner-needs-a-door.md"
            />
          </div>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            <code>co ai</code> was secure on a fresh install. It was also unusable. The careful policy
            correctly admitted no stranger, but the shortest setup path had never created the private
            invite its owner needed to connect.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-2">The decision</p>
            <p className="text-gray-900 font-semibold leading-relaxed m-0">
              Create one private recovery path automatically; disclose its credential only when the owner asks.
            </p>
          </div>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">The missing door</h2>
          <p>
            Project scaffolding already minted a unique <code>CO_INVITE_CODE</code>. But the documented
            shortest path—install, then run <code>co ai</code>—hosts the global identity directly and
            never passes through <code>co init</code> or <code>co create</code>. The host therefore had no
            onboarding method to advertise.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">Alternatives we rejected</h2>
          <h3 className="mt-7 mb-2 text-lg font-semibold text-gray-900">Print a new code at startup</h3>
          <p>
            Convenient, but every terminal capture, CI log, screen share, and support paste becomes a
            credential leak. Partially masking it reveals secret material without leaving enough to use.
          </p>
          <h3 className="mt-7 mb-2 text-lg font-semibold text-gray-900">Use a fixed fallback</h3>
          <p>
            A universal fallback is just the old public password under a new name. It makes every fresh
            installation share one access-control secret.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">One code, minted once</h2>
          <p>
            The server path now ensures <code>~/.co/keys.env</code> contains one owner invite. A process or
            project value wins, an existing global value is reused, and only a truly empty setup mints a
            new one. A cross-process lock protects simultaneous cold starts, and the file is owner-readable
            on POSIX.
          </p>
          <pre className="my-6 overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm text-gray-100"><code>{`co ai
# Owner invite created. Run co keys --reveal when onboarding your client.

co keys            # confirms a masked invite exists
co keys --reveal   # deliberate private disclosure`}</code></pre>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">The tradeoff</h2>
          <p>
            Automatic creation means a secret now exists even before the owner explicitly asks for one.
            Keeping it in the owner-only credential file and out of normal output makes that tradeoff
            smaller than either locking the owner out or teaching logs the credential.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">Evidence</h2>
          <p>
            Regression tests start from an empty home, exercise the real careful rule with the minted
            invite, reject an unrelated value, preserve an existing invite across restart, serialize two
            first starts, and confirm plain <code>co keys</code> never reveals it. The 1.6.8 Linux and
            native-Windows release matrices passed before publication.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-gray-900">What would make us revisit this</h2>
          <p>
            If onboarding moves to a hardware-backed or out-of-band owner proof, a stored invite may no
            longer be the best recovery primitive. Until then, the invariant stays simple: deny the wrong
            person and preserve a private path for the right one.
          </p>

          <p className="text-gray-600">
            See <Link href="/cli/ai" className="font-medium text-green-700 hover:underline">the co ai guide</Link> for the user flow and{' '}
            <Link href="/blog/a-page-should-not-become-a-wall" className="font-medium text-green-700 hover:underline">A Page Should Not Become a Wall</Link>{' '}
            for the other boundary repaired in 1.6.8.
          </p>
        </div>

        <ContentNavigation />
      </article>
    </main>
  )
}
