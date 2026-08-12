import type { Metadata } from 'next'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

const title = 'How co ai Streams Claude Code Tool Calls to the Web'
const description = 'Why ConnectOnion uses Claude Code stream-json to show live Read, Edit, and Bash cards in O Chat without confusing observability with permission authority.'
const canonicalPath = '/blog/stream-claude-code-tools-to-web'

export const metadata: Metadata = {
  title: `${title} | ConnectOnion`,
  description,
  keywords: [
    'Claude Code stream-json',
    'Claude Code tool calls',
    'co ai',
    'O Chat',
    'AI coding agent',
    'agent observability',
    'Claude Agent SDK',
    'MCP v2',
  ],
  alternates: { canonical: canonicalPath },
  openGraph: {
    title,
    description,
    url: canonicalPath,
    siteName: 'ConnectOnion Docs',
    type: 'article',
    publishedTime: '2026-08-12T00:00:00+10:00',
    modifiedTime: '2026-08-12T00:00:00+10:00',
    authors: ['ConnectOnion Team'],
    tags: ['Claude Code', 'co ai', 'agent observability', 'architecture'],
    images: [{ url: '/onion-logo.png', alt: 'ConnectOnion and Claude Code live tool event design' }],
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
  datePublished: '2026-08-12',
  dateModified: '2026-08-12',
  author: { '@type': 'Organization', name: 'ConnectOnion', url: 'https://docs.connectonion.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ConnectOnion',
    logo: { '@type': 'ImageObject', url: 'https://docs.connectonion.com/onion-logo.png' },
  },
  mainEntityOfPage: `https://docs.connectonion.com${canonicalPath}`,
  about: ['Claude Code', 'AI coding agents', 'tool-call streaming', 'agent observability'],
}

export default function StreamClaudeCodeToolsToWebPage() {
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
                Design Decision · August 12, 2026
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-5">
                How co ai Streams Claude Code Tool Calls to the Web
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                One delegated task, visible inner work, and an honest permission boundary.
              </p>
            </div>
            <CopyMarkdownButton
              markdownPath="/tutorials/stream-claude-code-tools-to-web.md"
              filename="stream-claude-code-tools-to-web.md"
            />
          </div>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:scroll-mt-20">
          <p className="text-lg leading-relaxed">
            When a user asks <code>co ai</code> to delegate coding work to Claude Code, the web chat should not go
            quiet until a final answer appears. It should show the files Claude reads, the edits it makes, and the
            commands it runs, while ConnectOnion remains the agent responsible for the plan and final review.
          </p>

          <div className="not-prose my-8 rounded-xl border border-green-200 bg-green-50 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-green-700 mb-2">The decision</p>
            <p className="text-gray-900 font-semibold leading-relaxed m-0">
              Keep Claude Code as one ordinary co ai tool call, read its documented stream-json events, and translate
              inner tool activity into the live cards O Chat already understands.
            </p>
          </div>

          <h2>The user experience we are building</h2>
          <ol>
            <li>The user opens <code>co ai</code> and asks it to have Claude Code implement a bounded task.</li>
            <li>The parent agent calls <code>claude_code</code> once. There is no ACP switch or second chat window.</li>
            <li>O Chat shows cards such as <code>Claude Code › Read</code>, <code>Claude Code › Edit</code>, and <code>Claude Code › Bash</code> as they start and finish.</li>
            <li>Claude returns one resumable result. The parent agent inspects the diff and tests, then answers the user.</li>
          </ol>

          <pre className="overflow-x-auto"><code>{`User → co ai → claude_code(task)
                    ├─ Claude Code › Read
                    ├─ Claude Code › Edit
                    ├─ Claude Code › Bash
                    └─ final result + session_id

             co ai reviews → User`}</code></pre>

          <h2>Why a normal tool is enough</h2>
          <p>
            ConnectOnion already has the useful boundary: an Agent decides to call a function, and Agent IO delivers
            live tool events to terminal, WebSocket, and React clients. The Claude adapter only has to translate the
            provider&apos;s event shapes into that boundary. It does not need to turn the browser into a Claude client or
            make ACP the internal execution model.
          </p>
          <p>
            Each Claude tool-use ID receives a <code>claude:</code> namespace so the start and result share one stable
            card. Provider, child-session, and parent-tool metadata are preserved. Current clients can render the
            cards flat; a later UI can group them beneath the delegated call.
          </p>

          <h2>The options we considered</h2>
          <ul>
            <li><strong>Final JSON only:</strong> simple, but leaves the user staring at an opaque long-running call.</li>
            <li><strong>Claude Agent SDK in the same Python environment:</strong> offers richer callbacks, but its current Python package requires MCP 1.x while ConnectOnion 1.7 requires MCP 2.x.</li>
            <li><strong>ACP first:</strong> useful when third-party clients need to drive ConnectOnion, but it solves a different direction from today&apos;s parent-agent delegation.</li>
            <li><strong>Claude Code stream-json:</strong> provides the tool lifecycle we need through the installed, authenticated CLI without adding a conflicting Python dependency.</li>
          </ul>

          <h2>What crosses the live boundary</h2>
          <p>
            Claude <code>tool_use</code> events become native tool starts. Matching <code>tool_result</code> events
            complete or fail the same card. Duplicate starts are ignored, and an out-of-order result gets a synthetic
            start so clients never receive an orphan result.
          </p>
          <p>
            Tool arguments and results are bounded before they reach the browser. Common credential-shaped keys such
            as authorization, token, secret, cookie, and password are redacted. Cancellation remains owned by the
            parent call: interrupting the turn terminates Claude&apos;s process group and rejects late UI events.
          </p>

          <h2>Seeing a tool is not approving a tool</h2>
          <p>
            This distinction is the most important tradeoff. Streaming shows what Claude is doing. It does not grant
            permission to do it. Safe, Accept Edits, and explicit autonomous modes are still selected by operator
            policy before launch, and <code>co ai</code> never selects Claude&apos;s bypass-permissions mode.
          </p>
          <p>
            Headless Claude can run actions already allowed by that policy and local settings. If it encounters an
            unmatched interactive permission prompt, this first slice cannot send the question to O Chat and wait for
            the answer. It fails closed. A future approval bridge needs a real request-response channel, not a label
            placed on top of a tool event.
          </p>

          <h2>Why we did not weaken MCP</h2>
          <p>
            On August 12, 2026, <code>claude-agent-sdk 0.2.136</code> declares <code>mcp&gt;=1.23,&lt;2</code> while
            ConnectOnion 1.7 declares <code>mcp&gt;=2,&lt;3</code>. Those ranges cannot be installed together. Downgrading
            the framework&apos;s protocol baseline for one provider callback would spread risk across every ACP and MCP
            integration.
          </p>
          <p>
            The documented CLI stream gives us the product&apos;s first priority—live tool cards—without making that
            compromise. We will revisit the Agent SDK when it supports MCP 2, or isolate it behind a separately
            versioned process if interactive approval justifies that complexity.
          </p>

          <h2>Current status</h2>
          <p>
            The implementation is being prepared for a ConnectOnion 1.7 preview. Until the linked feature is merged
            and included in a published preview, installed packages keep their existing behavior. Follow{' '}
            <a href="https://github.com/openonion/connectonion/issues/902">issue #902</a>{' '}
            for implementation and release evidence.
          </p>
        </div>

        <aside className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6" aria-label="Related resources">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Related resources</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="https://code.claude.com/docs/en/headless" className="font-medium text-green-700 hover:underline">Claude Code headless mode</a>
            <a href="https://code.claude.com/docs/en/agent-sdk/streaming-output" className="font-medium text-green-700 hover:underline">Streaming output</a>
            <a href="https://github.com/openonion/connectonion/issues/902" className="font-medium text-green-700 hover:underline">Feature issue</a>
            <Link href="/blog/alpha-beta-rc-before-lts" className="font-medium text-green-700 hover:underline">1.7 release train</Link>
          </div>
        </aside>

        <ContentNavigation />
      </article>
    </main>
  )
}
