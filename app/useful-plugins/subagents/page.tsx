'use client'

import { HiOutlineUsers, HiOutlineBolt, HiOutlineDocumentText, HiOutlineCpuChip } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function SubagentsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'subagents' }
          ]}
          icon={HiOutlineUsers}
          iconColor="text-violet-400"
          iconBgFrom="from-violet-600/20"
          iconBgTo="to-purple-600/20"
          iconBorderColor="border-violet-500/30"
          title="subagents"
          description="Spawn specialized sub-agents to handle specific tasks. Delegate work to focused agents with their own tools, model, and system prompt."
        />

        <div className="bg-violet-950/50 border border-violet-400/40 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-violet-100">
            Parent agent calls <code className="bg-gray-800 px-2 py-1 rounded">task(prompt, agent_type)</code> → sub-agent runs and returns result. Built-in agents included.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-yellow-400" />
            Quick Start
          </h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import subagents

agent = Agent("main", plugins=[subagents], model="co/gemini-2.5-pro")

# The agent can now delegate to sub-agents
agent.input("explore the codebase and explain the architecture")`}
            result={`[agent] Delegating to explore sub-agent...
[sub-explore] Reading project structure...
[sub-explore] Found: agent.py, llm.py, tool_executor.py...

Architecture summary:
- agent.py: Main orchestrator with event system
- llm.py: Multi-provider LLM abstraction
- tool_executor.py: Tool execution with xray context
...`}
            language="python"
          />
        </section>

        {/* AGENT.md format */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 text-amber-400" />
            AGENT.md Format
          </h2>
          <p className="text-slate-100 mb-6">Create a file at <code className="bg-gray-800 px-2 py-1 rounded">.co/agents/name/AGENT.md</code>:</p>
          <CodeWithResult
            code={`---
name: reviewer
description: Code reviewer that checks for bugs and style issues
model: co/claude-opus-4-5
max_iterations: 10
tools:
  - glob
  - grep
  - read_file
---

You are a code reviewer. Find bugs, style issues, and improvements.
Return a structured report with findings and line numbers.`}
            language="yaml"
          />

          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-100">Field</th>
                  <th className="text-left px-4 py-3 text-slate-100">Required</th>
                  <th className="text-left px-4 py-3 text-slate-100">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-300">name</td>
                  <td className="px-4 py-3 text-slate-300">yes</td>
                  <td className="px-4 py-3 text-slate-100">Agent identifier (used in task() calls)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-300">description</td>
                  <td className="px-4 py-3 text-slate-300">yes</td>
                  <td className="px-4 py-3 text-slate-100">Shown to parent agent when choosing sub-agent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-300">model</td>
                  <td className="px-4 py-3 text-slate-300">no</td>
                  <td className="px-4 py-3 text-slate-100">Default: co/gemini-2.5-pro</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-300">max_iterations</td>
                  <td className="px-4 py-3 text-slate-300">no</td>
                  <td className="px-4 py-3 text-slate-100">Default: 10</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-300">tools</td>
                  <td className="px-4 py-3 text-slate-300">no</td>
                  <td className="px-4 py-3 text-slate-100">List of tool names to give the sub-agent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <p className="text-sm text-slate-300 font-semibold mb-2">Available tool names:</p>
            <p className="font-mono text-sm text-slate-400">glob, grep, read_file, edit, multi_edit, write, bash, WebFetch, Memory, Browser</p>
          </div>
        </section>

        {/* Discovery */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-blue-400" />
            Agent Discovery
          </h2>
          <p className="text-slate-100 mb-4">Agents are discovered in priority order:</p>
          <CodeWithResult
            code={`.co/agents/{name}/AGENT.md      # Project-level (highest priority)
~/.co/agents/{name}/AGENT.md    # User-level
builtin/{name}/AGENT.md         # Built-in agents (lowest priority)`}
            language="bash"
          />
          <p className="text-slate-300 mt-4 text-sm">Project-level agents override built-ins. Built-in agents are bundled with <code className="bg-gray-800 px-1 rounded">co ai</code> for common tasks like codebase exploration and planning.</p>
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
                  <td className="py-2"><code className="text-violet-300">on_agent_ready</code></td>
                  <td className="py-2 text-slate-300">initialize_subagents</td>
                  <td className="py-2 text-slate-100">Discover agents, register task() tool</td>
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
