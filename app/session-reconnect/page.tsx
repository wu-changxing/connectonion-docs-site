/**
 * @purpose Session reconnection docs - how WebSocket reconnection and session recovery works
 * @context Explains the two-layer architecture (in-memory registry + JSONL), session lifecycle, IO queues, keep-alive, and cleanup
 * @llm-note Diagram-heavy page showing reconnection flow, state transitions, and architecture
 */

'use client'

import { HiOutlineArrowPath, HiOutlineSquare3Stack3D, HiOutlineQueueList, HiOutlineSignal, HiOutlineTrash, HiOutlineArchiveBox, HiOutlineArrowsRightLeft, HiOutlineCommandLine } from 'react-icons/hi2'
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

export default function SessionReconnectPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'Network', href: '/host' },
              { label: 'Session Reconnect' }
            ]}
            icon={HiOutlineArrowPath}
            title="Session Reconnect"
            description="WebSocket connections drop. Agents keep running. Here's how reconnection works."
            markdownPath="/network/session-reconnect.md"
            markdownFilename="session-reconnect.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Key insight:</strong> The agent thread and its IO queues survive the WebSocket. When a client reconnects, the same queues are reattached to the new connection. The agent never knows the difference.
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSquare3Stack3D className="w-8 h-8 text-gray-500" />
            Architecture
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            Two layers handle session survival:
          </p>

          <Diagram label="Two-layer session storage">
{`┌─────────────────────────────────────┐
│ In-Memory (ActiveSessionRegistry)   │
│ Running agents, IO queues, threads  │
│ Cleaned after 10min idle            │
└──────────────┬──────────────────────┘
               │ save on completion
┌──────────────▼──────────────────────┐
│ Disk (.co/session_results.jsonl)    │
│ Final results for polling recovery  │
│ Expires after 24h                   │
└─────────────────────────────────────┘`}
          </Diagram>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">In-Memory</p>
              <p className="text-sm text-gray-600">Keeps the agent thread and IO queues alive so a reconnecting client resumes mid-execution.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Disk (JSONL)</p>
              <p className="text-sm text-gray-600">Stores final results so a client that never reconnects can poll later.</p>
            </div>
          </div>
        </section>

        {/* Session Lifecycle */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-8 h-8 text-gray-400" />
            Session Lifecycle
          </h2>

          <Diagram label="State transitions">
{`register()
    │
    ▼
 RUNNING ──────────────────────► COMPLETED
    │            agent finishes       │
    │                                 │
    ▼ client disconnects              │ 10min idle
 SUSPENDED                           ▼
    │                              REMOVED
    │ client reconnects
    ▼
 RUNNING (same IO queues)`}
          </Diagram>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-6">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Transition</th>
                  <th className="text-left px-4 py-3 text-gray-500">Trigger</th>
                  <th className="text-left px-4 py-3 text-gray-500">What happens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">→ RUNNING</td>
                  <td className="px-4 py-3 text-gray-700">register()</td>
                  <td className="px-4 py-3 text-gray-600">Agent thread spawned, IO queues created</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">→ SUSPENDED</td>
                  <td className="px-4 py-3 text-gray-700">Client WebSocket drops</td>
                  <td className="px-4 py-3 text-gray-600">Agent keeps running, queues buffer events</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">→ RUNNING</td>
                  <td className="px-4 py-3 text-gray-700">Client reconnects (same session_id)</td>
                  <td className="px-4 py-3 text-gray-600">Same IO queues reattached to new WebSocket</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">→ COMPLETED</td>
                  <td className="px-4 py-3 text-gray-700">Agent finishes</td>
                  <td className="px-4 py-3 text-gray-600">Result saved to JSONL, session stays in memory</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">→ REMOVED</td>
                  <td className="px-4 py-3 text-gray-700">10min idle (no client ping)</td>
                  <td className="px-4 py-3 text-gray-600">Freed from memory</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Reconnection Flow */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-400" />
            Reconnection Flow
          </h2>

          <Diagram label="Timeline: connect → disconnect → reconnect → finish">
{`Time   Client              WebSocket Handler    Agent Thread
────   ──────              ─────────────────    ────────────
T+0    INPUT ─────────────► accept
                            register()
                            spawn thread ───────► agent.input() starts

T+5                        ◄─────────────────── io.send(thinking)
       ◄── thinking ────────

T+15                       ◄─────────────────── io.send(approval_needed)
       ◄── approval_needed─                     io.receive() BLOCKS
                                                 waiting for response...

T+20   ✕ DISCONNECT         (status stays running)
                            (queues stay alive)   (still blocked)

T+25   RECONNECT ──────────► registry.get() → FOUND
                             drain queued events
       ◄── queued events ───
                             update_ping()
                             pump same IO queues
       approve ────────────► io._incoming.put() ► io.receive() unblocks
                                                   agent continues...

T+35                        ◄─────────────────── agent finishes
                             mark_completed()
                             save to JSONL
       ◄── OUTPUT ──────────`}
          </Diagram>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">What happened:</strong> Agent asked for approval at T+15, blocked waiting.
              Client disconnected at T+20 — agent stayed blocked, events buffered.
              Client reconnected at T+25 — got buffered events, sent approval.
              Agent unblocked and finished normally.
            </p>
          </div>
        </section>

        {/* IO Queue Bridge */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineQueueList className="w-8 h-8 text-gray-400" />
            IO Queue Bridge
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            The agent runs in a sync thread. The WebSocket handler is async. Two thread-safe queues bridge them:
          </p>

          <Diagram label="WebSocketIO — async/sync bridge">
{`┌───────────────────┐          ┌───────────────────┐
│  Agent Thread      │          │  WebSocket Handler │
│  (sync Python)     │          │  (async ASGI)      │
│                    │          │                    │
│  io.send(event) ──►│─outgoing─│►── ws.send(event)  │
│                    │  queue   │                    │
│  io.receive()  ◄──│─incoming─│◄── ws.receive()    │
│  (blocks)          │  queue   │                    │
└───────────────────┘          └───────────────────┘`}
          </Diagram>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">On disconnect</p>
              <p className="text-sm text-gray-600"><code className="bg-gray-100 px-1 rounded">io.close()</code> sets <code className="bg-gray-100 px-1 rounded">_closed = True</code> and puts a sentinel in the incoming queue, unblocking any waiting <code className="bg-gray-100 px-1 rounded">receive()</code>. After close, <code className="bg-gray-100 px-1 rounded">io.send()</code> silently drops events.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">On reconnect</p>
              <p className="text-sm text-gray-600">The <strong>same io object</strong> is reused. A new WebSocket handler pumps the same queues. <strong>Caveat:</strong> IO must be reopened (<code className="bg-gray-100 px-1 rounded">_closed = False</code>) for the agent to send again.</p>
            </div>
          </div>
        </section>

        {/* Keep-Alive */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSignal className="w-8 h-8 text-gray-400" />
            Keep-Alive
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            Server sends PING every 30s. Client responds with PONG. Each message updates <code className="bg-gray-100 px-2 py-1 rounded">last_ping</code> in the registry.
          </p>

          <Diagram label="PING/PONG heartbeat">
{`Client                    Server
  │                         │
  │◄──── PING ──────────────│  every 30s
  │───── PONG ─────────────►│  update last_ping
  │                         │
  │◄──── PING ──────────────│
  │───── PONG ─────────────►│  update last_ping
  │                         │
  │  ✕ disconnect            │
  │                         │  last_ping freezes
  │                         │  idle timer starts
  │                         │  ...
  │                         │  10min idle → cleanup`}
          </Diagram>
        </section>

        {/* Cleanup */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineTrash className="w-8 h-8 text-gray-500" />
            Session Cleanup
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            Two different thresholds, by status:
          </p>

          <Diagram label="Cleanup rule">
{`  status == 'connected'  AND idle > 10min   ─┐
  status == 'running'    AND idle > 1hr     ─┤
                                              ▼
                                   ┌────────────────┐
                                   │ REMOVE from    │
                                   │ registry       │
                                   │ (memory freed) │
                                   └────────────────┘`}
          </Diagram>
          <p className="text-gray-600 text-sm mt-3">
            A live-running session gets a much longer grace period than one that's merely connected but idle.
          </p>

          <div className="space-y-3 mt-4">
            {[
              { label: 'No special cases', desc: 'connected only — same rule.' },
              { label: 'Results already on disk', desc: 'JSONL storage has the final result.' },
              { label: 'Client can still poll', desc: 'GET /sessions/{id} works for 24h.' },
              { label: 'Background job', desc: 'Runs every 60s to sweep expired sessions.' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">&#x2022;</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">{label}.</strong> {desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recovery */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArchiveBox className="w-8 h-8 text-gray-400" />
            Recovery Without Reconnect
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            If the client never comes back:
          </p>

          <Diagram label="Polling recovery after disconnect">
{`Client gone                 Server
                              │
                              │  agent finishes
                              │  save result to .co/session_results.jsonl
                              │  mark_completed()
                              │
                              │  ... 10min idle ...
                              │
                              │  cleanup_expired() → removed from memory
                              │
                              │  (result still on disk for 24h)
                              │
Client returns (hours later)  │
  │                           │
  │── GET /sessions/{id} ────►│  read from JSONL
  │◄── result ────────────────│`}
          </Diagram>

          <p className="text-gray-600 text-sm">No data loss. The JSONL file is the durable record.</p>
        </section>

        {/* Session Merge */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-500" />
            Session Merge
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            When a client reconnects and both sides have session state, <code className="bg-gray-100 px-2 py-1 rounded">merge_sessions()</code> resolves the conflict using iteration count (incremented on each LLM call):
          </p>

          <Diagram label="Iteration-based conflict resolution">
{`Client (stale)              Server (continued)
iteration: 5                iteration: 10
    │                           │
    └───────────┬───────────────┘
                │ merge_sessions()
                ▼
          server wins (higher iteration)
          → use server session state`}
          </Diagram>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Scenario</th>
                  <th className="text-left px-4 py-3 text-gray-500">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">Server continued (iteration 10 vs 5)</td>
                  <td className="px-4 py-3 font-mono text-gray-700">Server wins</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Client newer (iteration 8 vs 3)</td>
                  <td className="px-4 py-3 font-mono text-gray-700">Client wins</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">Tie (same iteration)</td>
                  <td className="px-4 py-3 font-mono text-gray-700">Higher timestamp wins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Server Console Output */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-500" />
            Server Console Output
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            The WebSocket handler prints structured status lines to the server console. Designed for quick scanning: routine messages are compact, data flow events are indented sub-lines.
          </p>

          <Diagram label="Connection lifecycle">
{`⚡ ws+ 127.0.0.1 (0 active)        # new WebSocket, show session count
✓ CONNECT identity=0x2f3d... session=aad5... status=new
✓ INPUT identity=0x2f3d... session=aad5... prompt=hello world...
⚡ ws- (1 active)                    # disconnect, remaining sessions`}
          </Diagram>

          <Diagram label="Data flow visibility — when client data is used">
{`✓ CONNECT identity=0x2f3d... session=aad5... status=connected
  ↑ client session: 4 messages       # client sent history
  ↕ merged sessions (server newer)   # server had newer data

✓ CONNECT identity=0x2f3d... session=aad5... status=running
  ↻ reattaching to running agent     # reconnecting mid-execution

✓ INPUT identity=0x2f3d... session=aad5... prompt=analyze this...
  ↑ 2 images, 1 files                # client sent attachments`}
          </Diagram>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600 mb-1">Suppressed</p>
              <p className="text-sm text-gray-500">CONNECT, INPUT, SESSION_STATUS, PONG — these have their own status lines.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600 mb-1">Still logged</p>
              <p className="text-sm text-gray-500">ADMIN_*, ONBOARD_SUBMIT, and unexpected types print <code className="bg-gray-100 px-1 rounded">← WS recv:</code>.</p>
            </div>
          </div>
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
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">network/host/session/active.py</td>
                  <td className="px-4 py-3 text-gray-600">ActiveSessionRegistry — in-memory session tracking</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">network/io/websocket.py</td>
                  <td className="px-4 py-3 text-gray-600">WebSocketIO — queue bridge between async/sync</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">network/host/session/storage.py</td>
                  <td className="px-4 py-3 text-gray-600">SessionStorage — JSONL persistence</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">network/host/session/merge.py</td>
                  <td className="px-4 py-3 text-gray-600">Session merge conflict resolution</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">network/asgi/websocket.py</td>
                  <td className="px-4 py-3 text-gray-600">WebSocket handler — orchestrates reconnection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
