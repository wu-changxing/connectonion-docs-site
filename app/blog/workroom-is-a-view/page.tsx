import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'The Work Room Is a Client, Not a Status Panel'
const description = 'Why the native Codex and Claude Code Work Room keeps conversation, input, live state, and provider controls inside one remote-client shell.'
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
    modifiedTime: '2026-08-24T00:00:00+10:00',
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
  dateModified: '2026-08-24',
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">{title}</h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Remote control needs a real conversation surface without making the browser a second runtime.
              </p>
            </div>
            <CopyMarkdownButton markdownPath="/tutorials/workroom-is-a-view.md" filename="workroom-is-a-view.md" />
          </div>
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
              normalizes that bounded OIP state. O Chat renders one compact parent card and one continuous remote
              client with attributed conversation, live work, provider controls, and a fixed composer.
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

          <h2>Why the first simplification went too far</h2>
          <p>
            The first design put a conversation panel, a status card, a preview panel, an activity list and a composer
            next to one another. Each element was reasonable in isolation, but together they made the reader decide
            where to look before they could understand what Codex was doing.
          </p>
          <p>
            The answer was hierarchy, not deletion. A Work Room is the remote client for a Codex or Claude Code
            session, so attributed user and provider messages, current lifecycle, meaningful work, and the
            provider-targeted input must remain recognizable. Earlier technical activity can fold away; the
            conversation cannot.
          </p>
          <p>
            The current hierarchy asks <strong>what is happening now?</strong> at the top, then keeps the native
            conversation in one reading flow and the composer fixed at the bottom. Approval becomes the primary
            action, but it does not erase the conversation or input. If approval, Stop, reconnect, provider-busy, or
            an older Host prevents sending, the input remains visible and explains why it is disabled.
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
          <p>
            Voice input keeps that destination boundary. Codex and Claude Code use the same recording,
            transcription, and actionable microphone errors as the outer composer, but the transcript enters only
            the provider draft on screen. It is never rerouted or sent automatically. The user reviews it and presses
            Send; failures, approval, Stop, and reconnect uncertainty keep the draft recoverable.
          </p>

          <h2>Permission is not one generic dropdown</h2>
          <p>
            The first release-candidate review found a concrete mismatch: the outer COAI permission control was
            visible, but the opened Codex Work Room had no Codex-native profile selector. Those controls answer
            different questions. COAI sets the Host ceiling; the Work Room chooses provider behavior inside that
            ceiling; an individual approval decides one requested action.
          </p>
          <p>
            Codex also proves why a single cross-provider enum is lossy. <strong>Ask for approval</strong> and
            <strong> Approve for me</strong> share the native <code>:workspace</code> sandbox but use different
            reviewers. Claude Code has its own Plan, Default, Accept edits, Auto, and Bypass permissions profiles.
            The shared shell therefore renders a finite provider-authored catalog while retaining native identity,
            reviewer policy, disabled choices, and the exact revision that made the choice effective.
          </p>
          <p>
            A browser click is only a request. Host verifies the session owner, Operator role, current revision,
            outer ceiling, and a separate elevated-risk confirmation before acknowledging a newer state. The UI
            keeps the old label until that acknowledgement arrives. On phones the 48-pixel selector occupies its
            own header row and the menu is clamped to the viewport, so preserving authority does not recreate the
            crowded Work Room that the earlier simplification was trying to fix.
          </p>

          <h2>Why RC1 is allowed before stable</h2>
          <p>
            A release candidate is useful because it gives every layer one immutable version to test. It is not a
            declaration that the product is already stable. RC1 synchronizes Core, the React reader, and O Chat so
            the same installed bytes can be used for provider, browser, upgrade, rollback, security, and UI review.
            A failure creates another issue and candidate; it does not get explained away as a passing release.
          </p>
          <p>
            Promotion therefore requires evidence outside the interface. A real <code>co ai</code> run must drive
            <code>co browser</code> through search and an actual download, build and run C, C++, and Rust work,
            delegate a native Codex project, exercise modes, Stop, Host restart, and reconnect, and leave sanitized
            logs plus hash-addressed screenshots. A separate reviewer must inspect every frame for new-user clarity,
            remote-client familiarity, conversation/composer continuity, live work, tool activity, and responsive
            layout. Stable 1.7 can use the RC bytes only if that unchanged candidate passes the complete window.
          </p>

          <h2>What the candidate must prove</h2>
          <ul>
            <li>One compact parent-card action opens the Work Room.</li>
            <li>A long native run stays readable on desktop and a 375px phone width.</li>
            <li>User and provider messages remain attributed while earlier technical activity stays folded.</li>
            <li>Codex and Claude Code keep a provider-targeted text and voice input in every lifecycle state.</li>
            <li>Provider-native permission choices remain separate from outer COAI mode and individual approvals.</li>
            <li>Desktop, tablet, and phone layouts keep the permission menu fully inside the viewport.</li>
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
            <a href="https://github.com/openonion/oo-chat/issues/210" className="font-medium text-green-700 hover:underline">O Chat remote-client contract</a>
            <Link href="/releases" className="font-medium text-green-700 hover:underline">Preview release notes</Link>
          </div>
        </aside>

        <ContentNavigation />
      </article>
    </main>
  )
}
