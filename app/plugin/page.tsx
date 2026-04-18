/*
  @date: 2025-01-12
  @description: Plugin System Feature Page - Simplified version

  Design Goals:
  - Clean, scannable single-column layout
  - Show plugins are just event lists (keep simple things simple)
  - Link to detailed docs for advanced topics
  - Copy-all-content button (CLAUDE.md requirement)
*/

'use client'

import {
  HiOutlineCube,
  HiOutlineArrowRight,
  HiOutlineCodeBracket,
  HiOutlineSparkles,
  HiOutlinePlay
} from 'react-icons/hi2'
import { VscLayers } from 'react-icons/vsc'
import CodeWithResult from '../../components/CodeWithResult'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function PluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Plugin System' }
          ]}
          icon={HiOutlineCube}
          iconColor="text-gray-500"
          iconBgFrom="from-gray-700/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-gray-400/30"
          title="Plugins"
          description="Plugins are reusable event handlers. Package capabilities and reuse them across agents."
          markdownPath="/plugin/plugin.md"
          markdownFilename="plugin.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlinePlay className="text-gray-500 w-7 h-7" />
            Quick Start
          </h2>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act

agent = Agent("assistant", tools=[search], plugins=[re_act])
agent.input("Search for Python")
# 💭 Planning: Will search for Python info first.
# ... tool executes ...
# 🤔 Reflecting: Found Python basics, task complete.`}
            language="python"
          />
        </section>

        {/* What is a Plugin */}
        <section className="mb-16">
          <h2 className="heading-2">
            What is a Plugin?
          </h2>

          <p className="text-gray-700 mb-6">
            A plugin is a list of event handlers:
          </p>

          <CodeWithResult
            code={`from connectonion import after_user_input, after_tools

# Define handlers
def plan(agent):
    print("Planning...")

def reflect(agent):
    print("Reflecting...")

# Plugin = list of event handlers
re_act = [after_user_input(plan), after_tools(reflect)]

# Use it
agent = Agent("assistant", tools=[search], plugins=[re_act])`}
            language="python"
          />
        </section>

        {/* Plugin vs on_events */}
        <section className="mb-16">
          <h2 className="heading-2">
            Plugin vs on_events
          </h2>

          <CodeWithResult
            code={`# on_events: one list (custom for this agent)
agent = Agent("a", on_events=[after_llm(handler)])

# plugins: list of lists (reusable across agents)
agent = Agent("a", plugins=[re_act, logger])`}
            language="python"
          />
        </section>

        {/* Built-in Plugins */}
        <section className="mb-16">
          <h2 className="heading-2">
            Built-in Plugins
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-slate-200">Plugin</th>
                  <th className="px-4 py-3 text-slate-200">Purpose</th>
                  <th className="px-4 py-3 text-slate-200">Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">re_act</td>
                  <td className="px-4 py-3 text-gray-700">Planning + reflection (ReAct pattern)</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/re-act" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">auto_compact</td>
                  <td className="px-4 py-3 text-gray-700">Auto-compress context at 90% — prevents hitting token limits</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/auto-compact" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">subagents</td>
                  <td className="px-4 py-3 text-gray-700">Load sub-agents from AGENT.md files via task() tool</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/subagents" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">ulw</td>
                  <td className="px-4 py-3 text-gray-700">Ultra Light Work — autonomous mode from web UI</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/ulw" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">ui_stream</td>
                  <td className="px-4 py-3 text-gray-700">WebSocket streaming of completion events to UI</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/ui-stream" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">tool_approval</td>
                  <td className="px-4 py-3 text-gray-700">Require user approval before each tool call</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/tool-approval" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">shell_approval</td>
                  <td className="px-4 py-3 text-gray-700">Approve shell commands before execution</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/shell-approval" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">prefer_write_tool</td>
                  <td className="px-4 py-3 text-gray-700">Encourage agent to use FileTools.write() over bash</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/prefer-write-tool" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">system_reminder</td>
                  <td className="px-4 py-3 text-gray-700">Inject system reminders into LLM context</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/system-reminder" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">image_result_formatter</td>
                  <td className="px-4 py-3 text-gray-700">Format images for vision models</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/image-result-formatter" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-gray-400">eval</td>
                  <td className="px-4 py-3 text-gray-700">Task evaluation for debugging</td>
                  <td className="px-4 py-3"><Link href="/useful-plugins/eval" className="text-gray-500 hover:underline">docs</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeWithResult
            code={`from connectonion.useful_plugins import re_act, eval, image_result_formatter, shell_approval

# Combine plugins
agent = Agent("assistant", plugins=[re_act, image_result_formatter])`}
            language="python"
          />
        </section>

        {/* Writing Custom Plugins */}
        <section className="mb-16">
          <h2 className="heading-2">
            Writing Custom Plugins
          </h2>

          <p className="text-gray-700 mb-4">
            Simple example - log each tool execution:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, after_each_tool

def log_tool(agent):
    trace = agent.current_session['trace'][-1]
    print(f"✓ {trace['tool_name']} completed")

# Plugin = list of handlers
logger = [after_each_tool(log_tool)]

# Use it
agent = Agent("assistant", tools=[search], plugins=[logger])`}
            language="python"
          />

          <p className="text-slate-200 mt-4">
            For more complex plugins, see <Link href="/on_events" className="text-gray-500 hover:underline">Events</Link> for available event hooks.
          </p>
        </section>

        {/* Reusing Plugins */}
        <section className="mb-16">
          <h2 className="heading-2">
            Reusing Plugins
          </h2>

          <CodeWithResult
            code={`# Define once
logger = [after_each_tool(log_tool)]

# Use across agents
researcher = Agent("researcher", tools=[search], plugins=[logger])
writer = Agent("writer", tools=[generate], plugins=[logger])`}
            language="python"
          />
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineArrowRight className="text-gray-500 w-6 h-6" />
            Next Steps
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/on_events"
              className="group bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-300/50 transition-all"
            >
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mb-4">
                <VscLayers className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Events
              </h3>
              <p className="text-gray-900 text-sm">
                Available event hooks
              </p>
            </Link>

            <Link
              href="/llm_do"
              className="group bg-blue-50 border border-blue-200 rounded-xl p-6 hover:border-gray-400 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineCodeBracket className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                llm_do
              </h3>
              <p className="text-blue-100 text-sm">
                Use LLM in handlers
              </p>
            </Link>

            <Link
              href="/examples"
              className="group bg-green-50 border border-green-200 rounded-xl p-6 hover:border-gray-400 transition-all"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineSparkles className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Examples
              </h3>
              <p className="text-green-900 text-sm">
                More examples
              </p>
            </Link>
          </div>
        </section>

        {/* Content Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
