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
          iconColor="text-purple-400"
          iconBgFrom="from-purple-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-purple-500/30"
          title="Plugins"
          description="Plugins are reusable event handlers. Package capabilities and reuse them across agents."
          markdownPath="/plugin/plugin.md"
          markdownFilename="plugin.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlinePlay className="text-purple-400 w-7 h-7" />
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

          <p className="text-slate-100 mb-6">
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

          <div className="overflow-x-auto">
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
                  <td className="px-4 py-3 font-mono text-purple-300">re_act</td>
                  <td className="px-4 py-3 text-slate-300">Planning + reflection (ReAct pattern)</td>
                  <td className="px-4 py-3"><Link href="/useful_plugins#re_act" className="text-purple-400 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-purple-300">eval</td>
                  <td className="px-4 py-3 text-slate-300">Task evaluation for debugging</td>
                  <td className="px-4 py-3"><Link href="/useful_plugins#eval" className="text-purple-400 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-purple-300">image_result_formatter</td>
                  <td className="px-4 py-3 text-slate-300">Format images for vision models</td>
                  <td className="px-4 py-3"><Link href="/useful_plugins#image_result_formatter" className="text-purple-400 hover:underline">docs</Link></td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-purple-300">shell_approval</td>
                  <td className="px-4 py-3 text-slate-300">Approve shell commands before execution</td>
                  <td className="px-4 py-3"><Link href="/useful_plugins#shell_approval" className="text-purple-400 hover:underline">docs</Link></td>
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

          <p className="text-slate-100 mb-4">
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

          <p className="text-slate-400 mt-4">
            For more complex plugins, see <Link href="/on_events" className="text-purple-400 hover:underline">Events</Link> for available event hooks.
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
            <HiOutlineArrowRight className="text-purple-400 w-6 h-6" />
            Next Steps
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/on_events"
              className="group bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <VscLayers className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Events
              </h3>
              <p className="text-purple-100 text-sm">
                Available event hooks
              </p>
            </Link>

            <Link
              href="/llm_do"
              className="group bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineCodeBracket className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                llm_do
              </h3>
              <p className="text-blue-100 text-sm">
                Use LLM in handlers
              </p>
            </Link>

            <Link
              href="/examples"
              className="group bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineSparkles className="text-white w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Examples
              </h3>
              <p className="text-green-100 text-sm">
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
