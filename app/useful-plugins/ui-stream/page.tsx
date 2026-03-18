'use client'

import { HiOutlineWifi, HiOutlineBolt } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function UiStreamPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'ui_stream' }
          ]}
          icon={HiOutlineWifi}
          iconColor="text-emerald-400"
          iconBgFrom="from-emerald-600/20"
          iconBgTo="to-green-600/20"
          iconBorderColor="border-emerald-500/30"
          title="ui_stream"
          description="Stream agent completion summaries to WebSocket UI clients. Used with host() for real-time updates in web chat interfaces."
        />

        <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-emerald-100">
            When an agent finishes a turn, sends a completion event to the WebSocket client: tools used, LLM calls made, total iterations.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-yellow-400" />
            Quick Start
          </h2>
          <CodeWithResult
            code={`from connectonion import Agent, host
from connectonion.useful_plugins import ui_stream

agent = Agent("assistant", plugins=[ui_stream])
host(agent, port=8000)  # WebSocket clients receive completion events`}
            language="python"
          />
        </section>

        {/* What it sends */}
        <section className="mb-20">
          <h2 className="heading-2">Completion event payload</h2>
          <p className="text-slate-100 mb-4">Sent to the WebSocket client when each turn completes:</p>
          <CodeWithResult
            code={`{
  "type": "complete",
  "tools_used": ["read_file", "edit", "bash"],
  "llm_calls": 3,
  "iterations": 3
}`}
            language="json"
          />
        </section>

        {/* What other events exist */}
        <section className="mb-20">
          <h2 className="heading-2">Other streaming events</h2>
          <p className="text-slate-100 mb-6">
            Individual events are emitted directly from their sources — <code className="bg-gray-800 px-2 py-1 rounded">ui_stream</code> only adds the final summary:
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-100">Event type</th>
                  <th className="text-left px-4 py-3 text-slate-100">Emitted by</th>
                  <th className="text-left px-4 py-3 text-slate-100">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-300">thinking</td>
                  <td className="px-4 py-3 text-slate-300">agent.py</td>
                  <td className="px-4 py-3 text-slate-100">Before each LLM call</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-300">tool_result</td>
                  <td className="px-4 py-3 text-slate-300">tool_executor.py</td>
                  <td className="px-4 py-3 text-slate-100">After each tool call</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-300">assistant</td>
                  <td className="px-4 py-3 text-slate-300">agent.py</td>
                  <td className="px-4 py-3 text-slate-100">When agent responds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-300">complete</td>
                  <td className="px-4 py-3 text-slate-300">ui_stream plugin</td>
                  <td className="px-4 py-3 text-slate-100">When turn finishes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-sm mt-4">Does nothing when agent runs locally without a WebSocket connection (<code className="bg-gray-800 px-1 rounded">if not agent.io: return</code>).</p>
        </section>

        {/* Events */}
        <section className="mb-20">
          <h2 className="heading-2">Events used</h2>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-slate-100">Event</th>
                  <th className="text-left py-2 text-slate-100">Handler</th>
                  <th className="text-left py-2 text-slate-100">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2"><code className="text-emerald-300">on_complete</code></td>
                  <td className="py-2 text-slate-300">stream_complete</td>
                  <td className="py-2 text-slate-100">Send completion summary to WebSocket</td>
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
