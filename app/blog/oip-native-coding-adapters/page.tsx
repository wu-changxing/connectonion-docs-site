import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'One Browser Protocol, Native Coding Adapters'
const description = 'Why ConnectOnion uses OIP for the browser boundary while Codex and Claude Code remain native backend adapters.'
const canonicalPath = '/blog/oip-native-coding-adapters'

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
    publishedTime: '2026-08-15T00:00:00+10:00',
    modifiedTime: '2026-08-16T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['OIP', 'Codex', 'Claude Code', 'coding adapters'],
    images: [{ url: '/onion-logo.png', alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/onion-logo.png'] },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  datePublished: '2026-08-15',
  dateModified: '2026-08-16',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['OIP', 'Codex app-server', 'Claude Code stream-json', 'provider routing'],
}

export default function OipNativeCodingAdaptersPage() {
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
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal · August 15, 2026 · ConnectOnion 1.7</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">{title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
            </div>
            <CopyMarkdownButton markdownPath="/tutorials/oip-native-coding-adapters.md" filename="oip-native-coding-adapters.md" />
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <p>ConnectOnion 1.7.0a5 made OIP 0.1 the only first-party browser protocol; alpha.7 closes the raw-provider escape hatch, alpha.10 makes authenticated relay reattach reuse the established session authority, and alpha.11 lets the Host and frontend roll independently inside a bounded compatibility window. The Python Host serves the authenticated <code>/ws</code> boundary, <code>@connectonion/react</code> owns connection and event state, and O Chat renders that state.</p>
          <p>Codex and Claude Code are backend adapters. Each preserves its provider session identity and translates bounded native activity into OIP tool events, so the browser has one lifecycle even when the coding provider changes.</p>
          <p>The useful lesson from Happy Coder is to bridge each provider&apos;s native session instead of making raw provider transcripts the public wire format. ConnectOnion keeps the parent loop in <code>co ai</code>, drives Codex through <code>app-server</code> and Claude Code through headless <code>stream-json</code>, and translates only bounded activity at the adapter edge. Provider transcripts stay local.</p>
          <h2>The problem</h2>
          <p>The earlier preview explored overlapping protocol layers. That duplicated discovery, session, approval, resume, error, and frontend state, and allowed fallback behavior to hide missing executables behind an unhelpful file-not-found error.</p>
          <h2>Alternatives considered</h2>
          <ul><li>Keep both browser transports and synchronize them.</li><li>Force every coding provider through one generic child-agent implementation.</li><li>Use one browser protocol with provider-native backend adapters.</li></ul>
          <h2>Decision</h2>
          <p>OIP owns browser connection, onboarding, messages, tool cards, cancellation, and reconnect. <code>codex</code> and <code>claude_code</code> own launch, native events, approvals, sandboxing, and exact resume. Missing providers fail with a direct installation/configuration message; there is no generic fallback.</p>
          <p>Intent is part of that boundary. Explicit run/use/start/open Codex requests call <code>codex()</code>; an interceptor rejects executable Codex commands inside shell chains and background/package wrappers before approval or process creation. Commands that merely search for or discuss Codex remain ordinary shell work.</p>
          <p>An open request with no task creates or resumes the native Codex thread but sends no <code>turn/start</code>. The Work Room can therefore be real before work begins, without spending a model turn or inventing a prompt.</p>
          <p>The browser contract stays small: one correlated provider invocation, OIP <code>tool_call</code>/<code>tool_result</code> activity, the ordinary <code>approval_needed</code> path, and a completed, failed, or cancelled terminal state. The existing React/O Chat cards render that contract without provider-specific wire parsers.</p>
          <h2>Rolling out one side at a time</h2>
          <p>One protocol does not mean one atomic deployment. A browser can hold yesterday&apos;s JavaScript while a Host has already upgraded, and a frontend rollback can meet sessions written by the newer Host. Requiring a matched pair merely turns ordinary deployment timing into a reconnect outage.</p>
          <p>OIP now uses reader-before-writer. Release R reads both the old and new form; R+1 may emit the new form only after R is publicly pinned; removal waits until at least R+2 and 30 days. Descriptor-less OIP 0.1 peers remain accepted through 1.7.x and cannot be removed before 1.8.0a1, September 15, 2026, and two preview releases after compatibility telemetry stops seeing them.</p>
          <p>That compatibility is intentionally narrow. Additive, non-authoritative fields can be ignored. Identity, session ownership, protocol version, permission profile, approvals, cancellation, and terminal state are never guessed. An unsupported version receives one non-retryable error instead of an automatic reconnect loop.</p>
          <p>The Host records only a classified compatibility result: Direct or Relay, legacy or OIP 0.1 or unsupported, accepted or rejected. It does not copy peer strings, prompts, credentials, addresses, session IDs, or private paths into telemetry.</p>
          <h2>Tradeoffs and evidence</h2>
          <p>A small amount of adapter translation is provider-specific, but the authority boundary stays explicit. Release acceptance covers Codex cards in running, completed, failed, expanded, and mobile states; old/new and rollback OIP pairs over Direct and Relay; session resume; raw-launch and false-positive routing evaluations; open-without-turn; and a real published-package browser run.</p>
          <h2>What would make us revisit this</h2>
          <p>We would reconsider only if a provider-neutral interface demonstrates equivalent approval, cancellation, resume, and observability guarantees across providers.</p>
          <p>See the <Link href="/cli/ai">co ai guide</Link>, <Link href="/websocket-protocol">OIP WebSocket protocol</Link>, and <Link href="/useful-tools/codex">Codex adapter reference</Link>.</p>
        </div>
        <ContentNavigation />
      </article>
    </main>
  )
}
