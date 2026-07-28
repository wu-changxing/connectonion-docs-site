/**
 * @purpose Dashboard docs - giving a hosted agent a Home page via dashboard.html
 * @context Explains the single-file model, the starter written at host startup, editing rules
 *   (no scripting, no external URLs, 2MB cap), the data-ochat-skill button contract, and when
 *   snapshots are pushed over the WebSocket
 * @llm-note The button contract's project-skills-only rule is the non-obvious part: clients
 *   validate against the published profile, which excludes user and builtin skills
 */

'use client'

import { HiOutlineRectangleGroup, HiOutlineSparkles, HiOutlinePencilSquare, HiOutlineCursorArrowRays, HiOutlineArrowsRightLeft, HiOutlineShieldCheck } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'
import CodeWithResult from '../../components/CodeWithResult'

function Diagram({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-6">
      {label && <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{label}</p>}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-700 whitespace-pre leading-relaxed">{children}</pre>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'Network', href: '/host' },
              { label: 'Dashboard' }
            ]}
            icon={HiOutlineRectangleGroup}
            title="Dashboard"
            description="Give your agent a Home page. One HTML file, no build step."
            markdownPath="/network/dashboard.md"
            markdownFilename="dashboard.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Key insight:</strong> Your agent&apos;s Home page is a file it owns — <code className="bg-white px-2 py-1 rounded">dashboard.html</code> in the project root. The host reads it and pushes it over the WebSocket the chat already uses, so there is nothing to serve, fetch, or rebuild.
            </p>
          </div>
        </section>

        {/* Where it lives */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-500" />
            It starts working on its own
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            The first time you run <code className="bg-gray-100 px-2 py-1 rounded">host()</code>, if there is no <code className="bg-gray-100 px-2 py-1 rounded">dashboard.html</code>, ConnectOnion writes a starter one — your agent&apos;s name, and up to four of its skills as one-click buttons.
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.network import host

host(lambda: Agent("lisa", tools=[...]))`}
            result={`Created dashboard.html — your agent's Home page.`}
          />

          <p className="text-gray-700 mt-6 mb-4 text-lg">
            After that the file is yours. ConnectOnion never overwrites it.
          </p>

          <Diagram label="Your project">
{`my-agent/
├── agent.py
├── dashboard.html      ← the Home page
└── .co/`}
          </Diagram>
        </section>

        {/* Editing */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlinePencilSquare className="w-8 h-8 text-gray-400" />
            Editing it
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            It is a plain HTML file — edit it with any editor. Or ask the agent: the built-in <code className="bg-gray-100 px-2 py-1 rounded">dashboard</code> skill teaches it the file&apos;s contract.
          </p>

          <Diagram label="In chat">
{`/dashboard put this week's numbers on my home page`}
          </Diagram>

          <p className="text-gray-700 mt-6 mb-4 text-lg">
            Write plain HTML and inline CSS. Two constraints, both enforced by the client&apos;s sandbox rather than by convention:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-1">No scripting</p>
              <p className="text-gray-700">
                <code className="bg-white px-2 py-1 rounded">&lt;script&gt;</code> tags and inline <code className="bg-white px-2 py-1 rounded">onclick</code> handlers are blocked by a Content-Security-Policy. Action buttons are the only way to make something happen.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-1">No external URLs</p>
              <p className="text-gray-700">
                No CDN stylesheets, no remote images, no network fonts. Inline your styles and use <code className="bg-white px-2 py-1 rounded">data:</code> URIs for images.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-1">No links out</p>
              <p className="text-gray-700">
                A Home page is one self-contained page. Clients cancel clicks on <code className="bg-white px-2 py-1 rounded">&lt;a href=&quot;https://…&quot;&gt;</code>, so such a link renders as dead text — use an action button when you want the user to <em>do</em> something. Same-page anchors (<code className="bg-white px-2 py-1 rounded">href=&quot;#section&quot;</code>) work normally.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-6 text-lg">
            Keep it under <strong>2MB</strong>. The host will not send a larger file, and the Home pane goes blank. Inline images are base64, which is ~33% larger than the source file — compress screenshots before embedding them.
          </p>

          <div className="bg-gray-50 border-l-4 border-gray-300 rounded-r-lg p-5">
            <p className="font-semibold text-gray-900 mb-2">Why so locked down?</p>
            <p className="text-gray-700 mb-3">
              The client renders your <code className="bg-white px-2 py-1 rounded">dashboard.html</code> in a sandboxed iframe under a strict Content-Security-Policy, because from its side the file is untrusted, agent-authored HTML. Everything above follows from that: nothing loads from the network, nothing scripts, and nothing navigates away. A Home page is a glanceable, self-contained page whose one action is running a skill.
            </p>
            <p className="text-gray-700">
              Supporting external links later is a deliberate change to that contract, not a setting — it means deciding what a dashboard may navigate to and how (in-sandbox, where the destination still cannot be trusted, or handed to a real browser tab). Until then, treat the page as a closed surface.
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCursorArrowRays className="w-8 h-8 text-gray-500" />
            Action buttons
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            A button that runs something declares the skill it runs:
          </p>

          <CodeWithResult
            language="html"
            code={`<button data-ochat-skill="daily-brief">Build today's brief</button>`}
          />

          <p className="text-gray-700 mt-6 mb-4 text-lg">
            Clicking it runs <code className="bg-gray-100 px-2 py-1 rounded">/daily-brief</code> as a visible turn in the chat — the same as typing it. Arguments are optional:
          </p>

          <CodeWithResult
            language="html"
            code={`<button data-ochat-skill="meeting-prep" data-ochat-args="2pm sync">
  Prepare my next meeting
</button>`}
          />

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="font-semibold text-gray-900 mb-2">Only project skills work as buttons</p>
            <p className="text-gray-700">
              Skills in <code className="bg-white px-2 py-1 rounded">.co/skills/</code> or <code className="bg-white px-2 py-1 rounded">.claude/skills/</code> are published to clients. Your personal skills (<code className="bg-white px-2 py-1 rounded">~/.co/skills/</code>) and ConnectOnion&apos;s builtin skills are not — so a button naming one renders but silently refuses to run. The starter dashboard follows this rule automatically; if you hand-write a button, check the skill&apos;s location first.
            </p>
          </div>

          <p className="text-gray-700 mt-6 text-lg">
            The client validates every button name against the skills your agent published, so a button can only ever start a skill you actually have.
          </p>
        </section>

        {/* When it updates */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-400" />
            When it updates
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            The host sends the file at two moments — nothing is polled, and nothing watches the filesystem.
          </p>

          <Diagram label="Delivery">
{`browser                                     agent host
  │──── CONNECT ─────────────────────────────────▶│
  │◀─── CONNECTED ────────────────────────────────│
  │◀─── DASHBOARD_SNAPSHOT ───────────────────────│  Home paints before you type
  │                                               │
  │──── INPUT ───────────────────────────────────▶│
  │◀─── thinking / tool_call / … ─────────────────│
  │◀─── OUTPUT ───────────────────────────────────│
  │◀─── DASHBOARD_SNAPSHOT ───────────────────────│  only if the run changed the file`}
          </Diagram>

          <p className="text-gray-700 mt-6 mb-4 text-lg">
            The post-run send is skipped when the file has not changed since that connection last saw it, so an unchanged Home costs nothing per turn. If you edit <code className="bg-gray-100 px-2 py-1 rounded">dashboard.html</code> by hand while a client is connected, the change shows up after the next run.
          </p>

          <p className="text-gray-700 mb-4 text-lg">
            An agent with no <code className="bg-gray-100 px-2 py-1 rounded">dashboard.html</code> sends nothing, and clients simply show no Home pane. The wire format is one frame:
          </p>

          <CodeWithResult
            language="json"
            code={`{
  "type": "DASHBOARD_SNAPSHOT",
  "html": "<!DOCTYPE html>…",
  "session_id": "550e8400-…"
}`}
          />
        </section>

        {/* Client-side safety */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-500" />
            If you are writing a client
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            The HTML is agent-authored, so treat it like any remote document. Two browser-enforced layers, no sanitizer:
          </p>

          <ol className="space-y-3 mb-6 text-gray-700 text-lg list-decimal list-inside">
            <li>
              <code className="bg-gray-100 px-2 py-1 rounded">sandbox=&quot;allow-scripts&quot;</code> without <code className="bg-gray-100 px-2 py-1 rounded">allow-same-origin</code> — an opaque origin, so the frame cannot reach your storage, keys, or parent DOM.
            </li>
            <li>
              A CSP with a per-render nonce — <code className="bg-gray-100 px-2 py-1 rounded">default-src &apos;none&apos;</code> plus <code className="bg-gray-100 px-2 py-1 rounded">script-src &apos;nonce-…&apos;</code> for your own bridge, so the agent&apos;s scripts do not run and the page cannot reach the network.
            </li>
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="font-semibold text-gray-900 mb-2">Wrap the HTML — never inject into it</p>
            <p className="text-gray-700">
              Emit your own <code className="bg-white px-2 py-1 rounded">&lt;head&gt;</code> first and put the agent&apos;s markup in the body. Locating an insertion point by string-matching <code className="bg-white px-2 py-1 rounded">&lt;head&gt;</code> is defeatable: a <code className="bg-white px-2 py-1 rounded">&lt;head&gt;</code> inside a comment moves your CSP into that comment and drops the policy entirely, leaving the sandbox as your only layer. Browsers discard a nested <code className="bg-white px-2 py-1 rounded">&lt;html&gt;/&lt;head&gt;/&lt;body&gt;</code> and keep the children, so a full agent document renders unchanged.
            </p>
          </div>

          <p className="text-gray-700 text-lg">
            Treat every button click as untrusted intent: verify the source frame, shape-check the skill name, and require it to be in the agent&apos;s published skill list — failing closed while that list is still loading. Then run it through your normal send path, so the worst a forged message can do is produce a visible turn the user can see. <a href="https://github.com/openonion/oo-chat" className="text-blue-600 hover:underline">oo-chat</a>&apos;s <code className="bg-gray-100 px-2 py-1 rounded">components/dashboard/</code> is a reference implementation.
          </p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
