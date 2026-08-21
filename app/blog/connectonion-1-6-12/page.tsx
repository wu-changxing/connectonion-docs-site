import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'Your Servers, Your Regions, Your Shared Mailboxes'
const description = 'ConnectOnion 1.6.12: pick where a server is provisioned, share an email address across accounts without handing over a key, and cleaner Outlook attachment downloads.'
const canonicalPath = '/blog/connectonion-1-6-12'
const installCommand = 'pip install --upgrade connectonion'

const releaseMarkdown = `# ConnectOnion 1.6.12

${description}

## What's new

- \`co server new --region\` — choose where a server is provisioned. When one region's capacity fills, you have somewhere to go instead of nowhere.
- \`co email share\` / \`unshare\` — grant another account send access to one of your addresses. Nothing moves, no private key changes hands, and revoking is one command.
- \`co outlook download\` — attachments land with collision-safe names, and embedded signature logos stay out of the way unless you ask for them with \`--include-inline\`.
- Scheduled runs are steadier: every model connection now carries explicit network bounds, so a stalled upstream ends in a clear, typed error your automation can react to.
- A new README that shows the whole delivery path in the first screen, and release notes that now ship with permanent visual evidence.

## Upgrade

\`\`\`bash
${installCommand}
\`\`\`
`

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'ConnectOnion 1.6.12',
    'server region',
    'shared mailbox',
    'email sharing',
    'Outlook attachments',
    'Python AI agent framework',
  ],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-19T00:00:00+10:00',
    modifiedTime: '2026-08-19T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['release', 'servers', 'email', 'Outlook'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-19',
  dateModified: '2026-08-19',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['server regions', 'email sharing', 'Outlook attachments'],
}

export default function ConnectOnion1612Page() {
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
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Release notes · August 19, 2026 · ConnectOnion 1.6.12</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton content={releaseMarkdown} filename="connectonion-1-6-12.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <h2>Pick your region</h2>
          <p><code>co server new prod --region asia-southeast1</code> — a server is provisioned where you say, not where the platform happens to put it. Every region has finite capacity; when the one you have been using fills up, you now have somewhere to go instead of nowhere. Sydney stays the default, so your machines and their data remain in Australia unless you choose otherwise.</p>

          <h2>Share a mailbox without giving it away</h2>
          <p>One address, two accounts. A person keeps using <code>rental@mail.openonion.ai</code> exactly as before, and the agent that builds their outreach queue can now send from that same address — starting today, stopping the moment anyone changes their mind:</p>
          <pre><code>{`co email share rental@mail.openonion.ai --with 0x... --can send
co email share --list
co email unshare rental@mail.openonion.ai --with 0x...`}</code></pre>
          <p>Nothing is transferred, no private key changes hands, and every sent mail still records which account actually sent it — a shared address stays one conversation with clear attribution.</p>

          <h2>Attachments that land the way you expect</h2>
          <p><code>co outlook download &lt;email&gt; --to ./invoices</code> saves a mail&apos;s real documents. Two attachments with the same name become <code>report.pdf</code> and <code>report-1.pdf</code> — nothing is ever overwritten. And a corporate signature&apos;s logo images stay out of your download folder unless you explicitly want them: <code>--include-inline</code>.</p>

          <h2>Steadier scheduled runs</h2>
          <p>Every model connection now carries explicit network bounds — connect, read, and retry limits defined in one place, for every provider. An upstream that stops answering ends in a clear, typed error your automation can catch and react to, within a documented time bound. Overnight runs keep their schedule.</p>

          <h2>Upgrade</h2>
          <pre><code>{installCommand}</code></pre>
          <p>See the new <Link href="/">first-screen delivery path</Link> and the <Link href="/cli/server">co server guide</Link> for the region option.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
