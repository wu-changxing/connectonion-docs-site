'use client'

import { HiOutlineCodeBracket, HiOutlineShieldCheck } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

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
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Network', href: '/host' },
            { label: 'OIP WebSocket Protocol' },
          ]}
          icon={HiOutlineCodeBracket}
          iconColor="icon-ui"
          title="OIP WebSocket Protocol"
          description="One authenticated browser connection for onboarding, sessions, prompts, approvals, modes, plans, and provider activity."
          markdownPath="/network/websocket-protocol.md"
          markdownFilename="websocket-protocol.md"
        />

        <section className="mb-14">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            Connect
          </h2>
          <p className="text-gray-700">The client signs <code className="bg-gray-100 px-1 rounded">CONNECT</code>. After trust checks, the Host returns the exact protocol descriptor and authoritative permission profiles.</p>
          <JsonBlock>{`{
  "type": "CONNECTED",
  "session_id": "550e8400-...",
  "status": "new",
  "protocol": {
    "name": "oip",
    "version": "0.1",
    "min_version": "0.1",
    "max_version": "0.1",
    "websocket_path": "/ws"
  },
  "session_modes": {
    "currentModeId": ":read-only",
    "availableModes": [
      {"id": ":read-only", "name": "Read only"},
      {"id": ":workspace", "name": "Auto"}
    ]
  }
}`}</JsonBlock>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rolling compatibility</h2>
          <p className="text-gray-700 mb-3">The Host publishes the same bounded descriptor from public <code className="bg-gray-100 px-1 rounded">/info</code> with <code className="bg-gray-100 px-1 rounded">Cache-Control: no-store</code>, and React sends its descriptor in <code className="bg-gray-100 px-1 rounded">CONNECT</code>. A descriptor-less stable peer is treated as legacy OIP 0.1 during the 1.7 preview train.</p>
          <p className="text-gray-700">Unknown additive non-authoritative events are ignored. An advertised incompatible version becomes one typed, non-retryable error and the socket closes, so the UI gives a refresh or upgrade action instead of entering a reconnect loop.</p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core frames</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-200">
                {[
                  ['CONNECT', 'Authenticate and start or resume a session'],
                  ['INPUT', 'Send the next user prompt'],
                  ['APPROVAL_RESPONSE', 'Answer the current tool approval'],
                  ['mode_change', 'Request a Host permission profile'],
                  ['INTERRUPT', 'Cooperatively stop the active turn'],
                  ['OUTPUT', 'Complete a turn and keep the session alive'],
                  ['plan', 'Replace the complete observational plan'],
                  ['provider_invocation', 'Group native Codex or Claude Code activity'],
                ].map(([frame, meaning]) => (
                  <tr key={frame}>
                    <td className="px-4 py-3 font-mono text-gray-800">{frame}</td>
                    <td className="px-4 py-3 text-gray-600">{meaning}</td>
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
