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
          iconColor="icon-ui"
          title="ui_stream"
          description="Stream agent completion summaries to WebSocket UI clients. Used with host() for real-time updates in web chat interfaces."
          markdownPath="/useful-plugins/ui_stream.md"
          markdownFilename="ui_stream.md"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-gray-900">
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
          <p className="text-gray-700 mb-4">Sent to the WebSocket client when each turn completes:</p>
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
          <p className="text-gray-700 mb-6">
            Individual events are emitted directly from their sources — <code className="bg-gray-100 px-2 py-1 rounded">ui_stream</code> only adds the final summary:
          </p>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700">Event type</th>
                  <th className="text-left px-4 py-3 text-gray-700">Emitted by</th>
                  <th className="text-left px-4 py-3 text-gray-700">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-700">thinking</td>
                  <td className="px-4 py-3 text-gray-600">agent.py</td>
                  <td className="px-4 py-3 text-gray-700">Before each LLM call</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-700">tool_result</td>
                  <td className="px-4 py-3 text-gray-600">tool_executor.py</td>
                  <td className="px-4 py-3 text-gray-700">After each tool call</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-700">assistant</td>
                  <td className="px-4 py-3 text-gray-600">agent.py</td>
                  <td className="px-4 py-3 text-gray-700">When agent responds</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-emerald-700">complete</td>
                  <td className="px-4 py-3 text-gray-600">ui_stream plugin</td>
                  <td className="px-4 py-3 text-gray-700">When turn finishes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">Does nothing when agent runs locally without a WebSocket connection (<code className="bg-gray-100 px-1 rounded">if not agent.io: return</code>).</p>
        </section>

        {/* Events */}
        <section className="mb-20">
          <h2 className="heading-2">Events used</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-700">Event</th>
                  <th className="text-left py-2 text-gray-700">Handler</th>
                  <th className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2"><code className="text-emerald-700">on_complete</code></td>
                  <td className="py-2 text-gray-600">stream_complete</td>
                  <td className="py-2 text-gray-700">Send completion summary to WebSocket</td>
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
