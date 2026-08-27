import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'An Approval Is Not Execution Time'
const description = 'Why a manual Codex approval pauses the active-work budget instead of making a careful review look like a provider timeout.'
const canonicalPath = '/blog/an-approval-is-not-execution-time'

export const metadata: Metadata = {
  title: 'AI Agent Tool Permissions: Why Approval Time Is Not Execution Time | ConnectOnion',
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
    tags: ['OIP', 'Codex', 'approvals', 'timeouts', 'Work Room'],
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
  about: ['Codex approval timing', 'OIP Work Room', 'provider timeout policy'],
}

export default function ApprovalExecutionTimePage() {
  return (
    <main className="px-5 py-14 md:px-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-gray-100 pb-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Design Journal · August 16, 2026 · ConnectOnion 1.7.0a14</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">{title}</h1>
          <p className="text-lg leading-relaxed text-gray-600">{description}</p>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>A Work Room acceptance run paused at its first harmless workspace inspection. The operator reviewed the command and allowed it. The native Codex turn then timed out before the requested coding work could proceed—not because Codex had consumed the budget, but because the review had.</p>

          <h2>The wrong clock</h2>
          <p>A manual approval is intentionally a human pause. Counting it as provider execution punishes the person for reading the action they were asked to approve. On a multi-step coding task, that can leave the next safe operation with no time at all.</p>

          <h2>Decision</h2>
          <p>Native Codex turns now measure two things separately: active provider work and operator review. The turn keeps a finite active-work budget, but the measured duration of a nested approval callback pauses that budget. A genuinely hung app-server still times out, and Stop still terminates the provider process tree.</p>
          <p>For hosted <code>co ai</code> Codex work, the default active budget is thirty minutes. It is long enough for a real coding sequence—inspect, edit, run, test, review, report—without becoming an unbounded background job.</p>

          <h2>What we did not do</h2>
          <p>We did not auto-approve the action, widen the sandbox, add ACP compatibility, or turn the chat transcript into a provider terminal. OIP remains the browser boundary; the Work Room remains the place to see semantic current activity, approvals, and explicit detail.</p>

          <h2>How it is tested</h2>
          <p>The regression uses a deterministic clock: it simulates one hundred seconds of review without making the test sleep, then proves the provider still receives its full post-approval active budget. Hosted-routing and interruption coverage continue to verify the authority and cancellation boundaries around it.</p>

          <p>See <Link href="/blog/a-tool-transaction-is-not-a-work-room">A Tool Transaction Is Not a Work Room</Link>, the <Link href="/useful-tools/codex">Codex adapter reference</Link>, and the <Link href="/cli/ai">co ai guide</Link>.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
