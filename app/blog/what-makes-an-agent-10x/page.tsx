import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'What Makes an Agent 10x'
const description = 'Model intelligence is not the lever. The agent you can safely stop watching is. Five capabilities that compound — drawn from an agent’s own failure log.'
const canonicalPath = '/blog/what-makes-an-agent-10x'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'AI agents',
    'agent reliability',
    'agent verification',
    'multi-agent delegation',
    'agent memory',
    'autonomous agents',
    'ConnectOnion',
  ],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-23T00:00:00+10:00',
    modifiedTime: '2026-08-23T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['vision', 'agents', 'reliability', 'roadmap'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-23',
  dateModified: '2026-08-23',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['agent verification', 'delegation', 'agent memory', 'autonomy'],
}

export default function WhatMakesAnAgent10xPage() {
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
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal · August 23, 2026</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton markdownPath="/tutorials/what-makes-an-agent-10x.md" filename="what-makes-an-agent-10x.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>This essay has an unusual source: an operator&apos;s written log of everything his AI agent got wrong over months of daily work. Wrong in instructive ways — work reported done that was never checked, dashboards green over broken content, a screenshot standing in for a test. The failure log turned out to be a requirements document. Here is what it asks for.</p>

          <h2>The thesis</h2>
          <p>Model intelligence is not the lever. The labs own that race, and every framework rides the same models. What can be owned is everything <em>around</em> the model, and it compounds into one property:</p>
          <blockquote><p><strong>A 10x agent is one you can safely stop watching.</strong></p></blockquote>
          <p>Every hour a person spends supervising an agent caps the agent&apos;s value at the supervisor&apos;s throughput. An agent that is twice as smart but still needs watching is worth a few percent more. An agent that no longer needs watching is worth whatever the work is worth. Five capabilities get there.</p>

          <h2>1. Verifiable beats smarter</h2>
          <p>The largest category in that failure log is not intelligence failures — it is the missing gate between <em>did it</em> and <em>believes it did it</em>. The fix is not a better model; it is an agent that delivers <strong>result plus evidence</strong>, natively. Wrote a file? Read it back and diff. Published a package? Install it from the registry in a clean environment and assert the version. Changed a UI? Before-and-after captures, attached.</p>
          <p>Trust is the only multiplier there is. Everything else in this list depends on it, because nobody delegates to what they cannot verify.</p>

          <h2>2. Living in time</h2>
          <p>Today&apos;s agents are request-scoped: ask, answer, process exits, everything resets. But most of what makes a human colleague valuable is that they <em>hold timelines open</em> — they wait for Tuesday&apos;s reply, watch the deploy, follow up when a client goes quiet. We call this the 3am test: every decision made in advance, so the work proceeds with nobody awake.</p>
          <p>A 100x agent is not one that answers 100x faster. It is one that holds a hundred open timelines at once.</p>

          <h2>3. Experience that sediments</h2>
          <p>Every run of a ConnectOnion agent already leaves a complete, replayable record. What no framework has yet closed is the loop: from <em>the mistake this run made</em> to <em>the mistake no future run makes</em>. Today that loop runs through a human — someone notices the pattern and writes the rule down.</p>
          <p>An agent that runs a thousand times a day and learns nothing, and an agent that turns ten runs into ten rules in its own operating manual, diverge exponentially within a year. This is the next deliverable on our observability line: replay, mine the failure patterns, draft the rule, let a human approve it.</p>

          <h2>4. Delegation with boundaries</h2>
          <p>One agent works linearly; 100x requires teams. And the precondition for teams is not a messaging protocol — it is <strong>authorization</strong>: who may spend whose money, send as whose address, use whose network, touch whose production.</p>
          <p>Looking back at a year of ConnectOnion releases, this is the strategy we were building without naming it: signed proxy grants, mailbox sharing without key handover, payment-verified onboarding, and the wallet and settlement work ahead. Others are building stronger individuals. We are building agents that can safely form teams — every delegated power signed, revocable, and attributable to exactly one identity.</p>

          <h2>5. Hands that reach real work</h2>
          <p>Work lives in browsers, inboxes, phone calls, and local networks — so the agent must reach them. This one needs the least argument and the most patience: one integration an operator can bet a client deliverable on is worth five that mostly work.</p>

          <h2>Where this is going</h2>
          <p>Four of the five levers are already on the <Link href="/roadmap">roadmap</Link> — async execution and durable triggers for time, settlement and wallets for delegation, the channel integrations for reach, replayable runs for observability. The fifth, the sedimentation loop, is the gap this essay names.</p>
          <p>The one-line strategy, for anyone deciding what to build next: <strong>don&apos;t compete on how smart the agent is. Compete on how safely it can be left alone.</strong></p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
