'use client'

import { HiOutlineCodeBracket, HiOutlineArrowsRightLeft, HiOutlineArrowPath, HiOutlineShieldCheck, HiOutlineServerStack, HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

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

function JsonBlock({ children }: { children: string }) {
  return (
    <div className="my-4 bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-gray-700 whitespace-pre">{children}</pre>
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
            iconColor="icon-ui"
            
            
            
            title="WebSocket Protocol"
            description="CONNECT to start or resume, INPUT to message. Session stays alive between executions."
            markdownPath="/network/websocket-protocol.md"
            markdownFilename="websocket-protocol.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg text-gray-900">
              Two client message types, two intents: <strong>CONNECT</strong> authenticates and restores your session. <strong>INPUT</strong> sends a prompt. That&apos;s the whole protocol.
            </p>
          </div>

          <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700">
              This page documents the compatibility socket at <code className="bg-gray-100 px-1 rounded">/ws</code>,
              not ACP. The published React Alpha.2 package and O Chat select authenticated
              <code className="bg-gray-100 px-1 rounded mx-1">/acp</code> when the Host advertises the exact supported
              descriptor. <code className="bg-gray-100 px-1 rounded">/ws</code> is used only when that descriptor is absent;
              failures after native ACP selection do not silently downgrade.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-400" />
            Overview
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Message</th>
                  <th className="text-left px-4 py-3 text-gray-500">Intent</th>
                  <th className="text-left px-4 py-3 text-gray-500">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">CONNECT</td>
                  <td className="px-4 py-3 text-gray-700">&quot;Authenticate me, restore my session&quot;</td>
                  <td className="px-4 py-3 text-gray-600">First message on every WebSocket</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">INPUT</td>
                  <td className="px-4 py-3 text-gray-700">&quot;Run this prompt&quot;</td>
                  <td className="px-4 py-3 text-gray-600">After CONNECT</td>
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
│   Server decides:    new / connected / running                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘`}
          </Diagram>
        </section>

        {/* Session Lifecycle */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-gray-400" />
            Session Lifecycle
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm font-mono text-gray-700">
              <strong className="text-gray-900">SESSION</strong> = connection. &nbsp;<strong className="text-gray-900">EXECUTION</strong> = one INPUT → OUTPUT cycle.<br />
              Session outlives executions. Multiple INPUTs per session.
            </p>
          </div>

          <Diagram label="State transitions">
{`    ╭──────────╮
    │   new    │◄──── session_id not found / first connect
    ╰────┬─────╯
         │ CONNECT
         ↓
    ╭──────────╮
    │connected │── 10min idle ─► REMOVED
    │ (idle)   │
    ╰────┬─────╯
         │ INPUT
         ↓
    ╭──────────╮
    │ running  │── 1h idle (stuck) ─► REMOVED
    ╰────┬─────╯
         │ agent done
         ↓
    ╭──────────╮
    │connected │── 10min idle ─► REMOVED
    ╰──────────╯

    Two states only: 'running' (agent working) and 'connected' (idle, alive).
    WS disconnect does NOT change session.status — IO queues survive the WS,
    a reconnecting client just re-subscribes via CONNECT { last_msg_id }.`}
          </Diagram>
        </section>

        {/* Protocol Flows */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-400" />
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

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Trust Gate (stranger onboarding)</h3>
          <Diagram label="careful trust: CONNECT interrupted, onboard completes it">
{`Client                                    Server
  │                                         │
  │── CONNECT ─────────────────────────────►│  signature valid, but identity
  │   { auth, session_id }                  │  is a stranger → gate fires
  │                                         │  stash the CONNECT
  │                                         │
  │◄── ONBOARD_REQUIRED ───────────────────│  { methods: [invite_code, payment] }
  │                                         │
  │    (human types an invite code —        │
  │     no deadline on this wait)           │
  │                                         │
  │── ONBOARD_SUBMIT ──────────────────────►│  verify signed payload
  │   { invite_code, signed }               │  promote identity to contact
  │                                         │
  │◄── ONBOARD_SUCCESS ────────────────────│
  │                                         │  server completes the stashed
  │                                         │  CONNECT itself — the client
  │                                         │  must NOT send CONNECT again
  │◄── CONNECTED ──────────────────────────│  { session_id, status }
  │                                         │
  │── INPUT ───────────────────────────────►│  the original input resumes
  │   { prompt }                            │  and runs exactly once
  │◄── stream events / OUTPUT ─────────────│`}
          </Diagram>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Resume After Page Refresh (agent still running)</h3>
          <Diagram label="Reconnect to running agent">
{`Client                                    Server
  │                                         │
  │    (agent still running on server)      │
  │                                         │
  │── WS open ────────────────────────────►│
  │                                         │
  │── CONNECT ─────────────────────────────►│  verify signature
  │   { session_id, last_msg_id, session }  │  registry.get(...) → running
  │                                         │  io.rewind_to(last_msg_id)
  │                                         │  merge sessions if server newer
  │                                         │
  │◄── CONNECTED ──────────────────────────│  { session_id, status: "running" }
  │◄── replayed events (after last_msg_id)│  pump io._msgs_from_agent
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

          <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-2">CONNECT</h4>
          <p className="text-gray-700 mb-4">
            Authenticate, restore session, and sync conversation. <strong>Always the first message.</strong>
          </p>
          <JsonBlock>{`{
  "type": "CONNECT",
  "session_id": "550e8400-...",
  "last_msg_id": "ev-9f12...",
  "session": { "messages": [...], "mode": "safe" },
  "payload": { "to": "0x3d4017c3e843...", "timestamp": 1702234567 },
  "from": "0xClientPublicKey",
  "signature": "0x..."
}`}</JsonBlock>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Field</th>
                  <th className="text-left px-4 py-3 text-gray-500">Required</th>
                  <th className="text-left px-4 py-3 text-gray-500">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">session_id</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">Session to resume. Omit for new session.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">session</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">Conversation history (messages, mode, etc.)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">last_msg_id</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">ID of the last agent event the client fully rendered. On resume of a running session, server rewinds its event cursor to right after this id and replays anything missed. Omit (or null) to replay all in-flight events of the current execution.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">payload</td>
                  <td className="px-4 py-3 text-gray-600">Yes</td>
                  <td className="px-4 py-3 text-gray-600">Signed payload for authentication</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">from</td>
                  <td className="px-4 py-3 text-gray-600">Yes</td>
                  <td className="px-4 py-3 text-gray-600">Client&apos;s public address</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">signature</td>
                  <td className="px-4 py-3 text-gray-600">Yes</td>
                  <td className="px-4 py-3 text-gray-600">Ed25519 signature of payload</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mt-6 mb-2 font-semibold">Server response based on state:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">session_id</th>
                  <th className="text-left px-4 py-3 text-gray-500">Server state</th>
                  <th className="text-left px-4 py-3 text-gray-500">Response status</th>
                  <th className="text-left px-4 py-3 text-gray-500">Server action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-600">Not provided</td>
                  <td className="px-4 py-3 text-gray-600">&mdash;</td>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;new&quot;</td>
                  <td className="px-4 py-3 text-gray-600">Allocate new session</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-600">Provided</td>
                  <td className="px-4 py-3 text-gray-600">In registry, running</td>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;running&quot;</td>
                  <td className="px-4 py-3 text-gray-600">io.rewind_to(last_msg_id), spawn new forward task</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-600">Provided</td>
                  <td className="px-4 py-3 text-gray-600">In registry, connected</td>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;connected&quot;</td>
                  <td className="px-4 py-3 text-gray-600">Merge sessions, reset idle timer</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-600">Provided</td>
                  <td className="px-4 py-3 text-gray-600">Not found</td>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;new&quot;</td>
                  <td className="px-4 py-3 text-gray-600">Allocate new session (same id)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-semibold text-gray-900 mt-8 mb-2">INPUT</h4>
          <p className="text-gray-700 mb-4">
            Send a prompt. Only valid after CONNECTED. <strong>No session data — just the prompt.</strong> If the session already has a running agent, the server routes this as <strong>runtime input</strong> (mid-execution interjection) instead of starting a second agent. The prompt is appended to the running agent&apos;s message history at the next iteration, and the server replies <code className="bg-gray-100 px-1 rounded">RUNTIME_INPUT_ACK</code> instead of starting a new OUTPUT cycle.
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
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Field</th>
                  <th className="text-left px-4 py-3 text-gray-500">Required</th>
                  <th className="text-left px-4 py-3 text-gray-500">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">prompt</td>
                  <td className="px-4 py-3 text-gray-600">Yes</td>
                  <td className="px-4 py-3 text-gray-600">The user&apos;s message</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">images</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">Array of base64 data URLs (passed directly to LLM as visual content)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">files</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">Array of file objects (saved to disk, agent reads via tools)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* File Upload Protocol */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h5 className="text-base font-semibold text-gray-900 mb-3">File Upload Protocol</h5>
            <p className="text-sm text-gray-600 mb-3">Files are sent inline as base64-encoded data URLs:</p>
            <JsonBlock>{`{
  "name": "report.pdf",
  "data": "data:application/pdf;base64,JVBERi0xLjQK..."
}`}</JsonBlock>
            <div className="space-y-2 text-sm text-gray-600 mt-3">
              <p>1. Validates against file limits (default: 10MB per file, 10 files per request)</p>
              <p>2. Decodes base64 and saves to <code className="bg-gray-100 px-1 rounded">.co/uploads/{'{filename}'}</code></p>
              <p>3. Adds file paths to the agent&apos;s message as a system reminder</p>
              <p>4. Agent uses <code className="bg-gray-100 px-1 rounded">read_file</code> or other tools to process the files</p>
            </div>
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <strong>Images vs Files:</strong> Images are passed directly to the LLM as visual content (multimodal). Files are saved to disk and read by tools.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-600 mt-8 mb-2">PONG</h4>
          <JsonBlock>{`{ "type": "PONG" }`}</JsonBlock>

          <h4 className="text-lg font-semibold text-gray-600 mt-6 mb-2">ASK_USER_RESPONSE</h4>
          <JsonBlock>{`{ "type": "ASK_USER_RESPONSE", "answer": "Python 3" }`}</JsonBlock>

          <h4 className="text-lg font-semibold text-gray-600 mt-6 mb-2">APPROVAL_RESPONSE</h4>
          <JsonBlock>{`{ "type": "APPROVAL_RESPONSE", "approved": true, "scope": "once" }`}</JsonBlock>
          <p className="text-sm text-gray-500 mt-2">
            Legacy fallback. Responses are consumed once and bound to the current pending request.
          </p>

          <h4 className="text-lg font-semibold text-gray-600 mt-6 mb-2">ACP_RESPONSE</h4>
          <p className="text-gray-700 mb-4">
            Answers one permission request. The outer carrier binds the result to the Host session; the nested message is the exact ACP JSON-RPC response.
          </p>
          <JsonBlock>{`{
  "type": "ACP_RESPONSE",
  "acpSchema": "schema-v1.19.0",
  "sessionId": "550e8400-...",
  "message": {
    "jsonrpc": "2.0",
    "id": "approval-event-uuid",
    "result": {
      "outcome": { "outcome": "selected", "optionId": "allow_once" }
    }
  }
}`}</JsonBlock>
          <p className="text-sm text-gray-500 mt-2">
            Only an advertised option for the active request and session is accepted. A matching malformed response or <code className="bg-gray-100 px-1 rounded">cancelled</code> fails closed.
          </p>

          {/* Server → Client */}
          <h3 className="text-xl font-semibold text-gray-900 mt-12 mb-4">Server → Client</h3>

          <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-2">CONNECTED</h4>
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
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">status</th>
                  <th className="text-left px-4 py-3 text-gray-500">Meaning</th>
                  <th className="text-left px-4 py-3 text-gray-500">Client action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;new&quot;</td>
                  <td className="px-4 py-3 text-gray-700">Fresh session</td>
                  <td className="px-4 py-3 text-gray-600">Send INPUT when ready</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;connected&quot;</td>
                  <td className="px-4 py-3 text-gray-700">Session alive, idle</td>
                  <td className="px-4 py-3 text-gray-600">Send INPUT when ready</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">&quot;running&quot;</td>
                  <td className="px-4 py-3 text-gray-700">Agent still running</td>
                  <td className="px-4 py-3 text-gray-600">Wait for replayed/streaming events</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            <code className="bg-gray-100 px-1 rounded">server_newer</code>, <code className="bg-gray-100 px-1 rounded">session</code>, and <code className="bg-gray-100 px-1 rounded">chat_items</code> are only included when the server&apos;s session data is newer than the client&apos;s.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-8 mb-2">OUTPUT</h4>
          <p className="text-gray-700 mb-4">Execution completed. <strong>Session stays alive for next INPUT.</strong></p>
          <JsonBlock>{`{
  "type": "OUTPUT",
  "result": "Hola",
  "session_id": "550e8400-...",
  "duration_ms": 1250,
  "session": { "messages": [...], "trace": [...], "turn": 2 }
}`}</JsonBlock>

          <h4 className="text-lg font-semibold text-gray-600 mt-8 mb-2">PING</h4>
          <p className="text-sm text-gray-500 mb-2">Keep-alive. Sent every 30 seconds.</p>
          <JsonBlock>{`{ "type": "PING" }`}</JsonBlock>

          <h4 className="text-lg font-semibold text-gray-600 mt-8 mb-2">ACP_REQUEST</h4>
          <p className="text-gray-700 mb-4">
            Sent immediately before the legacy <code className="bg-gray-100 px-1 rounded">approval_needed</code> event. The Host socket remains a ConnectOnion transport; the nested message is an exact ACP <code className="bg-gray-100 px-1 rounded">session/request_permission</code> request.
          </p>
          <JsonBlock>{`{
  "type": "ACP_REQUEST",
  "acpSchema": "schema-v1.19.0",
  "message": {
    "jsonrpc": "2.0",
    "id": "approval-event-uuid",
    "method": "session/request_permission",
    "params": {
      "sessionId": "550e8400-...",
      "toolCall": {
        "toolCallId": "call-1",
        "title": "Bash(npm test)",
        "status": "pending",
        "rawInput": { "command": "npm test" }
      },
      "options": [
        { "optionId": "allow_once", "name": "Allow this call", "kind": "allow_once" },
        { "optionId": "allow_session", "name": "Allow for this session", "kind": "allow_always" },
        { "optionId": "reject_soft", "name": "Reject this call and continue", "kind": "reject_once" },
        { "optionId": "reject_hard", "name": "Reject and stop this turn", "kind": "reject_once" },
        { "optionId": "reject_explain", "name": "Reject and explain first", "kind": "reject_once" }
      ]
    }
  }
}`}</JsonBlock>
          <p className="text-sm text-gray-500 mt-2">
            <code className="bg-gray-100 px-1 rounded">@connectonion/react</code> owns browser decoding, de-duplication, and one-shot responses. oo-chat consumes that normalized API and does not parse ACP. The standalone TypeScript SDK is retired from this rollout.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Native ACP may request permission before a separate tool update. React creates or reuses one running tool card keyed by <code className="bg-gray-100 px-1 rounded">toolCallId</code>, and tracks every permission tool created during the prompt. Selecting an approval grants authority to attempt the action; it does not prove success. An official Host terminal update remains authoritative. At the prompt boundary, any permission tool still marked running becomes an error so restored clients cannot remain permanently busy. Product UIs render this normalized lifecycle and may show a standalone decision only when optional tool-card context is absent.
          </p>

          <h4 className="text-lg font-semibold text-gray-600 mt-8 mb-2">Stream Events</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Type</th>
                  <th className="text-left px-4 py-3 text-gray-500">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
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
                    <td className="px-4 py-3 font-mono text-gray-700">{type}</td>
                    <td className="px-4 py-3 text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-semibold text-gray-700 mt-8 mb-2">DASHBOARD_SNAPSHOT</h4>
          <p className="text-gray-700 mb-4">
            The agent&apos;s <code className="bg-gray-100 px-1 rounded">dashboard.html</code> — its <a href="/dashboard" className="text-blue-600 hover:underline">Home page</a> — for the client to render beside the chat. Sent right after CONNECTED so Home paints before any input, and again after OUTPUT when the run changed the file. Agents without a dashboard never send it, and it is skipped when the file has not changed since this connection last saw it.
          </p>
          <JsonBlock>{`{
  "type": "DASHBOARD_SNAPSHOT",
  "html": "<!DOCTYPE html>…",
  "session_id": "550e8400-..."
}`}</JsonBlock>
          <p className="text-sm text-gray-500 mt-2">
            The HTML is agent-authored and untrusted: render it in a sandboxed iframe with scripting and network access blocked. Files over 2MB are not sent.
          </p>

          <h4 className="text-lg font-semibold text-gray-700 mt-8 mb-2">RUNTIME_INPUT_ACK</h4>
          <p className="text-gray-700 mb-4">
            Acknowledges an INPUT that arrived while the agent was running. The prompt has been queued and will be picked up at the agent&apos;s next iteration boundary. No new OUTPUT cycle — the original input&apos;s OUTPUT carries the agent&apos;s final response addressing both prompts.
          </p>
          <JsonBlock>{`{
  "type": "RUNTIME_INPUT_ACK",
  "session_id": "550e8400-...",
  "id": "runtime-input-7c2a..."
}`}</JsonBlock>

          <h4 className="text-lg font-semibold text-red-700 mt-8 mb-2">ERROR</h4>
          <p className="text-gray-700 mb-4">Malformed input or protocol violations. For JSON parse errors, the server also returns the offending payload so the client can locate the bug.</p>
          <JsonBlock>{`{
  "type": "ERROR",
  "message": "Invalid JSON: Expecting property name enclosed in double quotes at line 2 col 5 (pos 18)",
  "received": "{type: 'INPUT', ...}"
}`}</JsonBlock>
        </section>

        {/* Architecture Diagram */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineServerStack className="w-8 h-8 text-gray-400" />
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
  ║ React SDK    ║    ◄── events     ║  └─────────┬───────────┘  ║
  ║ useAgent     ║    ◄── OUTPUT     ║            │              ║
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
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-400" />
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
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Trust Level</th>
                  <th className="text-left px-4 py-3 text-gray-500">CONNECT Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">open</td>
                  <td className="px-4 py-3 text-gray-600">Accept without signature</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">careful</td>
                  <td className="px-4 py-3 text-gray-600">Accept unsigned, recommend signature</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-red-700">strict</td>
                  <td className="px-4 py-3 text-gray-600">Require valid signature</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Client Reconnect */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-gray-400" />
            Client Reconnect
          </h2>

          <Diagram label="Client-side reconnect logic">
{`Page loads → Zustand hydrates → session_id exists?
  │
  ├── Yes → CONNECT { session_id, session: {messages} }
  │           │
  │           ├── "new"       → session expired, start fresh (client has history)
  │           ├── "connected" → session alive, ready for INPUT
  │           └── "running" → agent running, events will stream
  │
  └── No  → show empty state, wait for user input
              → CONNECT (no session_id) on first message`}
          </Diagram>
        </section>

        {/* Protocol Evolution */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-500" />
            Protocol Evolution
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">v0.9.x — INIT + ATTACH</p>
              <pre className="text-sm font-mono text-gray-600">{`WS open → INIT { auth }    → CONNECTED { status: "new" }
         INPUT { prompt, session }  → events → OUTPUT → session dies`}</pre>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-500 mb-2">v0.10.x — CONNECT (unified)</p>
              <pre className="text-sm font-mono text-gray-600">{`WS open → CONNECT { auth, session_id? } → CONNECTED { status }
         INPUT { prompt, session }     → events → OUTPUT → session dies`}</pre>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">v0.11.x — Session survives execution (current)</p>
              <pre className="text-sm font-mono text-gray-700">{`WS open → CONNECT { auth, session_id?, session }
         → CONNECTED { status: new/connected/running }

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
            <HiOutlineCommandLine className="w-8 h-8 text-gray-500" />
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

✓ CONNECT identity=0x2f3d... session=aad5... status=running
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
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">File</th>
                  <th className="text-left px-4 py-3 text-gray-500">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['network/asgi/websocket.py', 'WebSocket handler — CONNECT/INPUT routing'],
                  ['network/host/session/active.py', 'ActiveSessionRegistry — in-memory session tracking'],
                  ['network/io/websocket.py', 'WebSocketIO — queue bridge between async/sync'],
                  ['network/host/session/storage.py', 'SessionStorage — JSONL persistence'],
                  ['network/host/session/merge.py', 'Session merge conflict resolution'],
                ].map(([file, role]) => (
                  <tr key={file}>
                    <td className="px-4 py-3 font-mono text-gray-700">{file}</td>
                    <td className="px-4 py-3 text-gray-600">{role}</td>
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
