'use client'

import { HiOutlineCodeBracket, HiOutlineArrowsRightLeft, HiOutlineArrowPath, HiOutlineShieldCheck, HiOutlineServerStack, HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

function Diagram({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="my-6">
      {label && <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{label}</p>}
      <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 sm:p-6 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-200 whitespace-pre leading-relaxed">{children}</pre>
      </div>
    </div>
  )
}

function JsonBlock({ children }: { children: string }) {
  return (
    <div className="my-4 bg-gray-900/80 border border-gray-700 rounded-lg p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-slate-200 whitespace-pre">{children}</pre>
    </div>
  )
}

export default function WebSocketProtocolPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'Network', href: '/host' },
              { label: 'WebSocket Protocol' }
            ]}
            icon={HiOutlineCodeBracket}
            iconColor="text-blue-400"
            iconBgFrom="from-blue-600/20"
            iconBgTo="to-indigo-600/20"
            iconBorderColor="border-blue-500/30"
            title="WebSocket Protocol"
            description="CONNECT to start or resume, INPUT to message. Session stays alive between executions."
            markdownPath="/network/websocket-protocol.md"
            markdownFilename="websocket-protocol.md"
          />

          <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
            <p className="text-lg text-blue-100">
              Two client message types, two intents: <strong>CONNECT</strong> authenticates and restores your session. <strong>INPUT</strong> sends a prompt. That&apos;s the whole protocol.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-blue-400" />
            Overview
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">Message</th>
                  <th className="text-left px-4 py-3 text-slate-400">Intent</th>
                  <th className="text-left px-4 py-3 text-slate-400">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-cyan-300">CONNECT</td>
                  <td className="px-4 py-3 text-gray-700">&quot;Authenticate me, restore my session&quot;</td>
                  <td className="px-4 py-3 text-slate-300">First message on every WebSocket</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-green-300">INPUT</td>
                  <td className="px-4 py-3 text-gray-700">&quot;Run this prompt&quot;</td>
                  <td className="px-4 py-3 text-slate-300">After CONNECT</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Diagram label="WebSocket lifecycle">
{`┌────────────────────────────────────────────────────────────────┐
│                    WebSocket Lifecycle                          │
│                                                                │
│   Every connection:  WS open → CONNECT → CONNECTED → ...      │
│                                                                │
│   CONNECT carries:   auth + session (conversation history)     │
│   INPUT carries:     just the prompt (session already set)     │
│                                                                │
│   Server decides:    new / connected / executing               │
│                                                                │
└────────────────────────────────────────────────────────────────┘`}
          </Diagram>
        </section>

        {/* Session Lifecycle */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-cyan-400" />
            Session Lifecycle
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-mono text-slate-200">
              <strong className="text-white">SESSION</strong> = connection. &nbsp;<strong className="text-white">EXECUTION</strong> = one INPUT → OUTPUT cycle.<br />
              Session outlives executions. Multiple INPUTs per session.
            </p>
          </div>

          <Diagram label="State transitions">
{`    ╭──────────╮
    │   new    │◄──────────────────── session_id not found
    ╰────┬─────╯
         │ CONNECT
         ↓
    ╭──────────╮
    │connected │◄──── agent done (OUTPUT) ◄──── user reconnects
    ╰────┬─────╯                                (within 10min)
         │ INPUT
         ↓
    ╭──────────╮
    │executing │──── agent working (LLM → tools → LLM)
    ╰────┬─────╯
         │
    ┌────┴────────────────────┐
    │                         │
    ↓ agent done              ↓ WS disconnects
    ╭──────────╮         ╭───────────╮
    │connected │         │ suspended │
    │ (idle)   │         │ (grace)   │
    ╰──────────╯         ╰─────┬─────╯
         │                     │
         │ next INPUT          ├── reconnect within 10min → connected
         ↓                     │
    ╭──────────╮               └── 10min idle → removed
    │executing │
    ╰──────────╯

    Key insight: "completed" is NOT a session state.
    It's an execution state. The session stays alive.`}
          </Diagram>
        </section>

        {/* Protocol Flows */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-emerald-400" />
            Protocol Flows
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">New Session</h3>
          <Diagram label="First connection — no session_id">
{`Client                                    Server
  │                                         │
  │── WS open ────────────────────────────►│
  │                                         │
  │── CONNECT ─────────────────────────────►│  verify Ed25519 signature
  │   { auth, session: {messages} }         │  no session_id → new session
  │                                         │  store conversation history
  │                                         │
  │◄── CONNECTED ──────────────────────────│  { session_id: "abc", status: "new" }
  │                                         │
  │◄── PING ───────────────────────────────│  keep-alive starts (every 30s)
  │── PONG ────────────────────────────────►│
  │                                         │
  │── INPUT ───────────────────────────────►│  run agent with prompt
  │   { prompt: "hello" }                   │  (no session in INPUT)
  │                                         │
  │◄── thinking ───────────────────────────│  stream events
  │◄── tool_call ──────────────────────────│
  │◄── OUTPUT ─────────────────────────────│  { result, session }
  │                                         │  session → "connected" (not dead)
  │                                         │
  │── INPUT ───────────────────────────────►│  same WS, same session
  │   { prompt: "tell me more" }            │
  │◄── ... ────────────────────────────────│
  │◄── OUTPUT ─────────────────────────────│`}
          </Diagram>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Resume After Page Refresh (agent still running)</h3>
          <Diagram label="Reconnect to executing agent">
{`Client                                    Server
  │                                         │
  │    (agent still executing on server)    │
  │                                         │
  │── WS open ────────────────────────────►│
  │                                         │
  │── CONNECT ─────────────────────────────►│  verify signature
  │   { session_id: "abc", session: {...} } │  registry.get("abc") → executing
  │                                         │  merge sessions if server newer
  │                                         │
  │◄── CONNECTED ──────────────────────────│  { session_id: "abc", status: "executing" }
  │◄── buffered events ───────────────────│  drain queued events
  │◄── PING ───────────────────────────────│  keep-alive resumes
  │                                         │
  │◄── stream events ─────────────────────│  live again
  │◄── OUTPUT ─────────────────────────────│`}
          </Diagram>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Resume After Page Refresh (agent finished)</h3>
          <Diagram label="Reconnect to idle session">
{`Client                                    Server
  │                                         │
  │    (agent finished while client away)   │
  │                                         │
  │── WS open ────────────────────────────►│
  │                                         │
  │── CONNECT ─────────────────────────────►│  verify signature
  │   { session_id: "abc", session: {...} } │  registry.get("abc") → connected
  │                                         │  merge: server has newer data
  │                                         │
  │◄── CONNECTED ──────────────────────────│  { session_id: "abc",
  │                                         │    status: "connected",
  │                                         │    server_newer: true,
  │                                         │    session: {merged},
  │                                         │    chat_items: [...] }
  │                                         │
  │    (client updates UI with server data) │
  │                                         │
  │── INPUT ───────────────────────────────►│  ready for next prompt
  │   { prompt: "what else?" }              │
  │◄── ... ────────────────────────────────│
  │◄── OUTPUT ─────────────────────────────│`}
          </Diagram>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Session Not Found (expired or never existed)</h3>
          <Diagram label="Graceful fallback to new session">
{`Client                                    Server
  │                                         │
  │── WS open ────────────────────────────►│
  │── CONNECT { session_id: "abc" } ──────►│  not in registry
  │◄── CONNECTED ──────────────────────────│  { session_id: "abc", status: "new" }
  │                                         │
  │── INPUT ───────────────────────────────►│  fresh session, full history from CONNECT`}
          </Diagram>
        </section>

        {/* Message Reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineServerStack className="w-8 h-8 text-gray-500" />
            Message Reference
          </h2>

          {/* Client → Server */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Client → Server</h3>

          <h4 className="text-lg font-semibold text-cyan-300 mt-6 mb-2">CONNECT</h4>
          <p className="text-gray-700 mb-4">
            Authenticate, restore session, and sync conversation. <strong>Always the first message.</strong>
          </p>
          <JsonBlock>{`{
  "type": "CONNECT",
  "session_id": "550e8400-...",
  "session": { "messages": [...], "mode": "safe" },
  "payload": { "to": "0x3d4017c3e843...", "timestamp": 1702234567 },
  "from": "0xClientPublicKey",
  "signature": "0x..."
}`}</JsonBlock>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">Field</th>
                  <th className="text-left px-4 py-3 text-slate-400">Required</th>
                  <th className="text-left px-4 py-3 text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">session_id</td>
                  <td className="px-4 py-3 text-slate-300">No</td>
                  <td className="px-4 py-3 text-slate-300">Session to resume. Omit for new session.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">session</td>
                  <td className="px-4 py-3 text-slate-300">No</td>
                  <td className="px-4 py-3 text-slate-300">Conversation history (messages, mode, etc.)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">payload</td>
                  <td className="px-4 py-3 text-slate-300">Yes</td>
                  <td className="px-4 py-3 text-slate-300">Signed payload for authentication</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">from</td>
                  <td className="px-4 py-3 text-slate-300">Yes</td>
                  <td className="px-4 py-3 text-slate-300">Client&apos;s public address</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">signature</td>
                  <td className="px-4 py-3 text-slate-300">Yes</td>
                  <td className="px-4 py-3 text-slate-300">Ed25519 signature of payload</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mt-6 mb-2 font-semibold">Server response based on state:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">session_id</th>
                  <th className="text-left px-4 py-3 text-slate-400">Server state</th>
                  <th className="text-left px-4 py-3 text-slate-400">Response status</th>
                  <th className="text-left px-4 py-3 text-slate-400">Server action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-slate-300">Not provided</td>
                  <td className="px-4 py-3 text-slate-300">&mdash;</td>
                  <td className="px-4 py-3 font-mono text-green-300">&quot;new&quot;</td>
                  <td className="px-4 py-3 text-slate-300">Allocate new session</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-300">Provided</td>
                  <td className="px-4 py-3 text-slate-300">In registry, executing</td>
                  <td className="px-4 py-3 font-mono text-yellow-300">&quot;executing&quot;</td>
                  <td className="px-4 py-3 text-slate-300">Reattach IO, pipe buffered events</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-300">Provided</td>
                  <td className="px-4 py-3 text-slate-300">In registry, connected/suspended</td>
                  <td className="px-4 py-3 font-mono text-cyan-300">&quot;connected&quot;</td>
                  <td className="px-4 py-3 text-slate-300">Merge sessions, reset idle timer</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-300">Provided</td>
                  <td className="px-4 py-3 text-slate-300">Not found</td>
                  <td className="px-4 py-3 font-mono text-green-300">&quot;new&quot;</td>
                  <td className="px-4 py-3 text-slate-300">Allocate new session (same id)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-semibold text-green-300 mt-8 mb-2">INPUT</h4>
          <p className="text-gray-700 mb-4">
            Send a prompt. Only valid after CONNECTED. <strong>No session data — just the prompt.</strong>
          </p>
          <JsonBlock>{`{
  "type": "INPUT",
  "prompt": "Translate hello to Spanish",
  "images": ["data:image/png;base64,..."],
  "files": [{ "name": "doc.pdf", "data": "data:application/pdf;base64,..." }]
}`}</JsonBlock>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">Field</th>
                  <th className="text-left px-4 py-3 text-slate-400">Required</th>
                  <th className="text-left px-4 py-3 text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">prompt</td>
                  <td className="px-4 py-3 text-slate-300">Yes</td>
                  <td className="px-4 py-3 text-slate-300">The user&apos;s message</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">images</td>
                  <td className="px-4 py-3 text-slate-300">No</td>
                  <td className="px-4 py-3 text-slate-300">Array of base64 data URLs (passed directly to LLM as visual content)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-400">files</td>
                  <td className="px-4 py-3 text-slate-300">No</td>
                  <td className="px-4 py-3 text-slate-300">Array of file objects (saved to disk, agent reads via tools)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* File Upload Protocol */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h5 className="text-base font-semibold text-gray-900 mb-3">File Upload Protocol</h5>
            <p className="text-sm text-slate-300 mb-3">Files are sent inline as base64-encoded data URLs:</p>
            <JsonBlock>{`{
  "name": "report.pdf",
  "data": "data:application/pdf;base64,JVBERi0xLjQK..."
}`}</JsonBlock>
            <div className="space-y-2 text-sm text-slate-300 mt-3">
              <p>1. Validates against file limits (default: 10MB per file, 10 files per request)</p>
              <p>2. Decodes base64 and saves to <code className="bg-gray-800 px-1 rounded">.co/uploads/{'{filename}'}</code></p>
              <p>3. Adds file paths to the agent&apos;s message as a system reminder</p>
              <p>4. Agent uses <code className="bg-gray-800 px-1 rounded">read_file</code> or other tools to process the files</p>
            </div>
            <div className="mt-4 bg-blue-950/30 border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-slate-300">
                <strong className="text-blue-300">Images vs Files:</strong> Images are passed directly to the LLM as visual content (multimodal). Files are saved to disk and read by tools.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-slate-300 mt-8 mb-2">PONG</h4>
          <JsonBlock>{`{ "type": "PONG" }`}</JsonBlock>

          <h4 className="text-lg font-semibold text-slate-300 mt-6 mb-2">ASK_USER_RESPONSE</h4>
          <JsonBlock>{`{ "type": "ASK_USER_RESPONSE", "answer": "Python 3" }`}</JsonBlock>

          <h4 className="text-lg font-semibold text-slate-300 mt-6 mb-2">APPROVAL_RESPONSE</h4>
          <JsonBlock>{`{ "type": "APPROVAL_RESPONSE", "approved": true, "scope": "once" }`}</JsonBlock>

          {/* Server → Client */}
          <h3 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Server → Client</h3>

          <h4 className="text-lg font-semibold text-cyan-300 mt-6 mb-2">CONNECTED</h4>
          <p className="text-gray-700 mb-4">Response to CONNECT.</p>
          <JsonBlock>{`{
  "type": "CONNECTED",
  "session_id": "550e8400-...",
  "status": "new",
  "server_newer": true,
  "session": { "messages": [...] },
  "chat_items": [...]
}`}</JsonBlock>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">status</th>
                  <th className="text-left px-4 py-3 text-slate-400">Meaning</th>
                  <th className="text-left px-4 py-3 text-slate-400">Client action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-green-300">&quot;new&quot;</td>
                  <td className="px-4 py-3 text-gray-700">Fresh session</td>
                  <td className="px-4 py-3 text-slate-300">Send INPUT when ready</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-cyan-300">&quot;connected&quot;</td>
                  <td className="px-4 py-3 text-gray-700">Session alive, idle</td>
                  <td className="px-4 py-3 text-slate-300">Send INPUT when ready</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-yellow-300">&quot;executing&quot;</td>
                  <td className="px-4 py-3 text-gray-700">Agent still running</td>
                  <td className="px-4 py-3 text-slate-300">Wait for events/OUTPUT</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-400 mt-3">
            <code className="bg-gray-800 px-1 rounded">server_newer</code>, <code className="bg-gray-800 px-1 rounded">session</code>, and <code className="bg-gray-800 px-1 rounded">chat_items</code> are only included when the server&apos;s session data is newer than the client&apos;s.
          </p>

          <h4 className="text-lg font-semibold text-green-300 mt-8 mb-2">OUTPUT</h4>
          <p className="text-gray-700 mb-4">Execution completed. <strong>Session stays alive for next INPUT.</strong></p>
          <JsonBlock>{`{
  "type": "OUTPUT",
  "result": "Hola",
  "session_id": "550e8400-...",
  "duration_ms": 1250,
  "session": { "messages": [...], "trace": [...], "turn": 2 }
}`}</JsonBlock>

          <h4 className="text-lg font-semibold text-slate-300 mt-8 mb-2">PING</h4>
          <p className="text-sm text-slate-400 mb-2">Keep-alive. Sent every 30 seconds.</p>
          <JsonBlock>{`{ "type": "PING" }`}</JsonBlock>

          <h4 className="text-lg font-semibold text-slate-300 mt-8 mb-2">Stream Events</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">Type</th>
                  <th className="text-left px-4 py-3 text-slate-400">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  ['thinking', 'Agent reasoning'],
                  ['tool_call', 'Tool execution started'],
                  ['tool_result', 'Tool execution completed'],
                  ['ask_user', 'Agent needs human input'],
                  ['approval_needed', 'Tool requires approval'],
                  ['plan_review', 'Plan ready for review'],
                  ['compact', 'Context compaction'],
                ].map(([type, desc]) => (
                  <tr key={type}>
                    <td className="px-4 py-3 font-mono text-gray-400">{type}</td>
                    <td className="px-4 py-3 text-slate-300">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-semibold text-red-300 mt-8 mb-2">ERROR</h4>
          <JsonBlock>{`{ "type": "ERROR", "message": "Something went wrong" }`}</JsonBlock>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineServerStack className="w-8 h-8 text-indigo-400" />
            Architecture
          </h2>

          <Diagram label="End-to-end data flow">
{`  ╔══════════════╗                    ╔═══════════════════════════╗
  ║   oo-chat    ║                    ║     Agent Server          ║
  ║  (browser)   ║                    ║  (Python SDK + host())    ║
  ╠══════════════╣                    ╠═══════════════════════════╣
  ║              ║                    ║                           ║
  ║ localStorage ║    WebSocket       ║  ┌─────────────────────┐  ║
  ║ ┌──────────┐ ║   ┌──────────┐    ║  │ ActiveSessionRegistry│  ║
  ║ │ session  │ ║───│ /ws      │────║──│                     │  ║
  ║ │ chatItems│ ║   └──────────┘    ║  │ session_id → {      │  ║
  ║ │ messages │ ║    CONNECT ──►    ║  │   io, thread,       │  ║
  ║ └──────────┘ ║    ◄── CONNECTED  ║  │   status, last_ping │  ║
  ║              ║    INPUT ────►    ║  │ }                   │  ║
  ║ TS SDK       ║    ◄── events     ║  └─────────┬───────────┘  ║
  ║ RemoteAgent  ║    ◄── OUTPUT     ║            │              ║
  ║              ║    PING/PONG      ║            ↓              ║
  ╚══════════════╝                    ║  ┌─────────────────────┐  ║
                                      ║  │ SessionStorage      │  ║
                                      ║  │ (.co/session_       │  ║
                                      ║  │  results.jsonl)     │  ║
                                      ║  └─────────────────────┘  ║
                                      ╚═══════════════════════════╝

  Data Ownership:
  ┌────────────────────────────────────────────────────────────────┐
  │ Client owns: conversation history (localStorage)              │
  │ Server owns: execution state (registry), results (storage)    │
  │ CONNECT syncs: client → server (session), server → client     │
  │                (if server_newer)                               │
  └────────────────────────────────────────────────────────────────┘`}
          </Diagram>

          <Diagram label="Separation of concerns">
{`┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Connection    │  │  Conversation   │  │   Execution     │
│                 │  │                 │  │                 │
│ WebSocket + auth│  │ Message history │  │ One INPUT→OUTPUT│
│ PING/PONG       │  │ Owned by client │  │ Agent thread    │
│ Persistent      │  │ Sent via CONNECT│  │ Temporary       │
│                 │  │ Merged on server│  │                 │
│ Dies: WS close  │  │ Dies: never     │  │ Dies: OUTPUT    │
│ + 10min grace   │  │ (localStorage)  │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘`}
          </Diagram>
        </section>

        {/* Authentication */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-amber-400" />
            Authentication
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            Authentication happens once, on CONNECT. All subsequent INPUT messages on the same WebSocket are trusted.
          </p>

          <Diagram label="Auth flow">
{`CONNECT (signed)          INPUT (not signed)
  │                          │
  ▼                          ▼
Server verifies            Server trusts
signature → OK             (same WS, already authenticated)`}
          </Diagram>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-6">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">Trust Level</th>
                  <th className="text-left px-4 py-3 text-slate-400">CONNECT Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-green-300">open</td>
                  <td className="px-4 py-3 text-slate-300">Accept without signature</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-yellow-300">careful</td>
                  <td className="px-4 py-3 text-slate-300">Accept unsigned, recommend signature</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-red-300">strict</td>
                  <td className="px-4 py-3 text-slate-300">Require valid signature</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Client Reconnect */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-cyan-400" />
            Client Reconnect
          </h2>

          <Diagram label="Client-side reconnect logic">
{`Page loads → Zustand hydrates → session_id exists?
  │
  ├── Yes → CONNECT { session_id, session: {messages} }
  │           │
  │           ├── "new"       → session expired, start fresh (client has history)
  │           ├── "connected" → session alive, ready for INPUT
  │           └── "executing" → agent running, events will stream
  │
  └── No  → show empty state, wait for user input
              → CONNECT (no session_id) on first message`}
          </Diagram>
        </section>

        {/* Protocol Evolution */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-slate-400" />
            Protocol Evolution
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-400 mb-2">v0.9.x — INIT + ATTACH</p>
              <pre className="text-sm font-mono text-slate-300">{`WS open → INIT { auth }    → CONNECTED { status: "new" }
         INPUT { prompt, session }  → events → OUTPUT → session dies`}</pre>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-400 mb-2">v0.10.x — CONNECT (unified)</p>
              <pre className="text-sm font-mono text-slate-300">{`WS open → CONNECT { auth, session_id? } → CONNECTED { status }
         INPUT { prompt, session }     → events → OUTPUT → session dies`}</pre>
            </div>
            <div className="bg-blue-950/30 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-300 mb-2">v0.11.x — Session survives execution (current)</p>
              <pre className="text-sm font-mono text-slate-200">{`WS open → CONNECT { auth, session_id?, session }
         → CONNECTED { status: new/connected/executing }

         INPUT { prompt }   → events → OUTPUT  (session stays alive)
         INPUT { prompt }   → events → OUTPUT  (again, same session)
         INPUT { prompt }   → events → OUTPUT  (and again)

WS close → 10min grace → session cleaned up`}</pre>
            </div>
          </div>
        </section>

        {/* Server Console Output */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-slate-400" />
            Server Console Output
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            Structured status lines designed for quick scanning. Routine messages are compact, data flow events are indented sub-lines.
          </p>

          <Diagram label="Connection lifecycle">
{`⚡ ws+ 127.0.0.1 (0 active)        # new WebSocket, show session count
✓ CONNECT identity=0x2f3d... session=aad5... status=new
✓ INPUT identity=0x2f3d... session=aad5... prompt=hello world...
⚡ ws- (1 active)                    # disconnect, remaining sessions`}
          </Diagram>

          <Diagram label="Data flow visibility">
{`✓ CONNECT identity=0x2f3d... session=aad5... status=connected
  ↑ client session: 4 messages       # client sent history
  ↕ merged sessions (server newer)   # server had newer data

✓ CONNECT identity=0x2f3d... session=aad5... status=executing
  ↻ reattaching to running agent     # reconnecting mid-execution

✓ INPUT identity=0x2f3d... session=aad5... prompt=analyze this...
  ↑ 2 images, 1 files                # client sent attachments`}
          </Diagram>

          <Diagram label="Errors">
{`✗ CONNECT auth error: forbidden
✗ INPUT rejected: not authenticated (send CONNECT first)
✗ agent error: <exception message>`}
          </Diagram>
        </section>

        {/* Key Files */}
        <section className="mb-20">
          <h2 className="heading-2">Key Files</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-slate-400">File</th>
                  <th className="text-left px-4 py-3 text-slate-400">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  ['network/asgi/websocket.py', 'WebSocket handler — CONNECT/INPUT routing'],
                  ['network/host/session/active.py', 'ActiveSessionRegistry — in-memory session tracking'],
                  ['network/io/websocket.py', 'WebSocketIO — queue bridge between async/sync'],
                  ['network/host/session/storage.py', 'SessionStorage — JSONL persistence'],
                  ['network/host/session/merge.py', 'Session merge conflict resolution'],
                ].map(([file, role]) => (
                  <tr key={file}>
                    <td className="px-4 py-3 font-mono text-gray-400">{file}</td>
                    <td className="px-4 py-3 text-slate-300">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
