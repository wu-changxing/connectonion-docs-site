import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'A Control Center for Your Hosted Agent'
const description = 'ConnectOnion 1.6.11 gives every hosted agent a real Control Center, and a safe Auto mode that runs reversible work without asking each time.'
const canonicalPath = '/blog/connectonion-1-6-11'
const installCommand = 'pip install --upgrade connectonion'

const releaseMarkdown = `# ConnectOnion 1.6.11

${description}

## What's new

- A responsive Control Center for every hosted agent — light and dark, with capability filtering and diagnostics built in.
- New sessions default to Auto: reversible workspace work and focused verification just run, without a prompt for every step.
- Anything external, destructive, or credential-touching still asks first. Full access stays an explicit, bounded choice, and Plan remains its own separate workflow.
- A denied or missing adapter no longer stops the Host from starting.
- The published React bridge now shows the exact mode the Host is actually running in — never a guess.

## Upgrade

\`\`\`bash
${installCommand}
\`\`\`
`

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'ConnectOnion 1.6.11',
    'Control Center',
    'Auto mode',
    'hosted AI agent',
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
    publishedTime: '2026-08-16T00:00:00+10:00',
    modifiedTime: '2026-08-19T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'Control Center', 'permissions'],
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
  dateModified: '2026-08-19',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['Control Center', 'Auto mode', 'hosted agents'],
}

export default function ConnectOnion1611Page() {
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
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Release notes · August 16, 2026 · ConnectOnion 1.6.11</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton content={releaseMarkdown} filename="connectonion-1-6-11.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>Every agent you deploy with <code>co server new</code> or <code>co deploy --to</code> now has a Control Center it can show you — a page that answers &quot;what is this agent allowed to do right now, and what did it just do&quot; without you reading logs. It is responsive, works in light and dark, and lets you filter down to the capabilities you actually care about.</p>
          <p>The bigger change is the default underneath it. A new session used to mean choosing between asking for permission on every reversible edit, or opening the agent up to everything. 1.6.11 adds a real middle: <strong>Auto</strong>. Reversible workspace work — edits, reads, focused verification inside the project — just runs. Anything that reaches outside the workspace, touches a credential, or cannot be undone still stops and asks, every time. Full access remains available, but it is a choice you make explicitly, not a default you fall into. Plan stays exactly what it was: a separate mode for laying out work before any of it executes.</p>
          <h2>What this fixes in practice</h2>
          <p>A Host that could not reach one of its adapters used to fail to start at all — one missing integration took the whole agent down. Now a denied or missing adapter is just unavailable; everything else keeps working. And the React bridge that ships in <code>@connectonion/react</code> now reports the exact mode the Host is actually in, so a dashboard never shows a permission state that does not match reality.</p>
          <h2>Upgrade</h2>
          <pre><code>{installCommand}</code></pre>
          <p>See the <Link href="/features/permissions">permissions guide</Link> for what Auto covers and how to move between modes.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
