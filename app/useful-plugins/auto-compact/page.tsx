'use client'

import { HiOutlineArrowPath, HiOutlineBolt, HiOutlineCpuChip } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function AutoCompactPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'auto_compact' }
          ]}
          icon={HiOutlineArrowPath}
          iconColor="icon-ui"
          title="auto_compact"
          description="Automatically compress context when the conversation gets too long, preventing token overflow without interrupting the agent."
          markdownPath="/useful-plugins/auto_compact.md"
          markdownFilename="auto_compact.md"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-gray-900">
            When context hits 90%, old messages are summarized and replaced — the agent keeps working without hitting token limits.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-400" />
            Quick Start
          </h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import auto_compact

agent = Agent("researcher", plugins=[auto_compact], model="co/gemini-2.5-pro")

# Works even on sessions that would normally hit token limits
agent.input("Analyze all 50 files in src/ and write a report")`}
            language="python"
          />
        </section>

        {/* How it works */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 icon-ui" />
            How it works
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-bold text-lg w-6 flex-shrink-0">1</span>
              <div>
                <div className="font-semibold mb-1">Monitor after every LLM call</div>
                <p className="text-gray-600 text-sm">After each response, checks <code className="bg-gray-100 px-1 rounded">context_percent</code>. Requires at least 8 messages before activating.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-bold text-lg w-6 flex-shrink-0">2</span>
              <div>
                <div className="font-semibold mb-1">Summarize old messages</div>
                <p className="text-gray-600 text-sm">Calls <code className="bg-gray-100 px-1 rounded">co/gemini-2.5-flash</code> to generate a compact summary of earlier turns (max 800 words).</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-bold text-lg w-6 flex-shrink-0">3</span>
              <div>
                <div className="font-semibold mb-1">Replace with summary</div>
                <p className="text-gray-600 text-sm">Keeps: system prompt + summary message + last 5 messages. Discards the rest. Session continues normally.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700">Threshold</th>
                  <th className="text-left px-4 py-3 text-gray-700">Min messages</th>
                  <th className="text-left px-4 py-3 text-gray-700">Messages kept</th>
                  <th className="text-left px-4 py-3 text-gray-700">Summary model</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">90%</td>
                  <td className="px-4 py-3 text-gray-600">8</td>
                  <td className="px-4 py-3 text-gray-600">system + summary + last 5</td>
                  <td className="px-4 py-3 font-mono text-gray-600">co/gemini-2.5-flash</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use cases */}
        <section className="mb-20">
          <h2 className="heading-2">When to use</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">Long file analysis</div>
              <p className="text-sm text-gray-600">Agents that read many large files fill context quickly</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">Batch operations</div>
              <p className="text-sm text-gray-600">Processing dozens of items in a loop</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">co ai sessions</div>
              <p className="text-sm text-gray-600">Already included by default in <code className="bg-gray-100 px-1 rounded">co ai</code></p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="font-semibold text-gray-700 mb-1">Research agents</div>
              <p className="text-sm text-gray-600">Extended sessions browsing and summarizing content</p>
            </div>
          </div>
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
                  <td className="py-2"><code className="text-gray-700">after_llm</code></td>
                  <td className="py-2 text-gray-600">check_and_compact</td>
                  <td className="py-2 text-gray-700">Check usage, compact if &gt;= 90%</td>
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
