import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'Changing the Default Model Is a Backend Decision First'
const description = 'ConnectOnion 1.6.6 makes Gemini 3.7 Flash the default. Why the client change had to ship second, and how the rollback stays open.'
const canonicalPath = '/blog/gemini-37-default'

export const metadata: Metadata = {
  title: "Roll Out Gemini 3.7 as the Default Model | ConnectOnion",
  description: "Verify backend support before clients request Gemini 3.7, and preserve explicit user model choices.",
  keywords: [
    'ConnectOnion 1.6.6',
    'Gemini 3.7 Flash',
    'default model',
    'AI agent framework',
    'managed model backend',
    'release ordering',
    'Python AI agents',
  ],
  alternates: {
    canonical: canonicalPath,
  },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-15T00:00:00+10:00',
    modifiedTime: '2026-08-15T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'models', 'Gemini', 'release engineering'],
    images: [
      {
        url: '/onion-logo.png',
        alt: 'ConnectOnion Gemini 3.7 Flash default model decision',
      },
    ],
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
  datePublished: '2026-08-15',
  dateModified: '2026-08-15',
  author: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    url: 'https://docs.connectonion.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: {
      '@type': 'ImageObject',
      url: 'https://docs.connectonion.com/onion-logo.png',
    },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['default model selection', 'release ordering', 'Gemini', 'managed backends'],
}

export default function Gemini37DefaultPage() {
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
                Design Journal · August 15, 2026 · ConnectOnion 1.6.6
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
                Changing the Default Model Is a Backend Decision First
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Gemini 3.7 Flash is now what you get when you do not choose. The interesting part
                was not the model — it was the order.
              </p>
            </div>
            <CopyMarkdownButton
              markdownPath="/tutorials/gemini-37-default.md"
              filename="gemini-37-default.md"
            />
          </div>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            In 1.6.6 every default that was <code>co/gemini-3.6-flash</code> becomes{' '}
            <code>co/gemini-3.7-flash</code> — <code>Agent</code>, <code>llm_do</code>,{' '}
            <code>co ai</code>, <code>transcribe</code>, and the browser agent. One million tokens of
            context, and nothing you configured explicitly is touched.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-2">The decision</p>
            <p className="text-gray-900 font-semibold leading-relaxed m-0">
              The managed backend learns a model before the client can name it. Never the other way round.
            </p>
          </div>

          <h2>Why the order is the whole problem</h2>
          <p>
            A default model is not a value in a config file. It is the value that runs when a user has
            expressed no opinion — which is most users, most of the time. That makes it the single
            line of code with the widest blast radius in the framework.
          </p>
          <p>
            If the client had shipped first, every agent created without an explicit model would have
            asked the backend for a model it did not have. Not a degraded experience — a hard failure,
            on the default path, for everyone who upgraded. And because it is the default path, the
            people affected would be exactly those who had done nothing wrong.
          </p>
          <p>
            The general rule we follow for any change spanning a client and a server:
          </p>

          <div className="not-prose my-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-gray-900 leading-relaxed m-0">
              <strong>Ship the side that degrades gracefully first.</strong> Ask what a user sees if
              this half is live and the other is not. A backend that supports a model nobody requests
              yet is invisible. A client that requests a model nobody supports is an outage.
            </p>
          </div>

          <h2>Verify the ID, not the name</h2>
          <p>
            The first acceptance criterion on both the client and backend issues was the same, and it
            is the one that looks like paperwork until it bites: <em>confirm the exact upstream model
            ID; do not rely on the display name</em>.
          </p>
          <p>
            &quot;Gemini 3.7&quot; is what a launch post says. <code>gemini-3.7-flash</code> is what
            the API answers to, and the difference between them is an allowlist entry that silently
            matches nothing. So the check that mattered was not reading an announcement — it was
            asking the deployed backend what it actually serves, and then making one real, billed call
            through it before changing a single default in the client.
          </p>

          <h2>The rollback we kept open</h2>
          <p>
            <code>co/gemini-3.6-flash</code> remains available and remains accepted by the backend. A
            project that pins it keeps working, and moving back is a one-line change with no migration
            of persisted state. A default change that cannot be undone without a release is not a
            default change; it is a removal wearing a friendlier word.
          </p>
          <pre className="overflow-x-auto"><code>{`# take the new default
pip install --upgrade connectonion

# or keep the previous one, explicitly
agent = Agent("assistant", model="co/gemini-3.6-flash")`}</code></pre>

          <h2>What would make us revisit this</h2>
          <p>
            Defaults should follow evidence, not release dates. If 3.7 Flash turns out worse than 3.6
            on tool-calling reliability or structured output in real agent loops — the two things
            agents do that a general benchmark does not measure — the default moves back. That is why
            the rollback is a supported path rather than a courtesy.
          </p>

          <p className="text-gray-600">
            See also{' '}
            <Link href="/blog/deployed-agent-identity">
              The Agent That Was Itself, and Billed Someone Else
            </Link>{' '}
            for the 1.6.5 release, and{' '}
            <Link href="/blog/oip-native-coding-adapters">
              One Browser Protocol, Native Coding Adapters
            </Link>{' '}
            for why these are 1.6 patches rather than preview-train work.
          </p>
        </div>

        <ContentNavigation />
      </article>
    </main>
  )
}
