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
          iconColor="icon-ui"
          title="subagents"
          description="Spawn specialized sub-agents to handle specific tasks. Delegate work to focused agents with their own tools, model, and system prompt."
          markdownPath="/useful-plugins/subagents.md"
          markdownFilename="subagents.md"
        />

        <div className="bg-violet-950/50 border border-violet-400/40 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-violet-100">
            Parent agent calls <code className="bg-gray-100 px-2 py-1 rounded">task(prompt, agent_type)</code> → sub-agent runs and returns result. Built-in agents included.
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
            <HiOutlineDocumentText className="w-8 h-8 text-gray-400" />
            AGENT.md Format
          </h2>
          <p className="text-gray-700 mb-6">Create a file at <code className="bg-gray-100 px-2 py-1 rounded">.co/agents/name/AGENT.md</code>:</p>
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

          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700">Field</th>
                  <th className="text-left px-4 py-3 text-gray-700">Required</th>
                  <th className="text-left px-4 py-3 text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-700">name</td>
                  <td className="px-4 py-3 text-gray-600">yes</td>
                  <td className="px-4 py-3 text-gray-700">Agent identifier (used in task() calls)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-700">description</td>
                  <td className="px-4 py-3 text-gray-600">yes</td>
                  <td className="px-4 py-3 text-gray-700">Shown to parent agent when choosing sub-agent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-700">model</td>
                  <td className="px-4 py-3 text-gray-600">no</td>
                  <td className="px-4 py-3 text-gray-700">Default: co/gemini-2.5-pro</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-700">max_iterations</td>
                  <td className="px-4 py-3 text-gray-600">no</td>
                  <td className="px-4 py-3 text-gray-700">Default: 10</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-violet-700">tools</td>
                  <td className="px-4 py-3 text-gray-600">no</td>
                  <td className="px-4 py-3 text-gray-700">List of tool names to give the sub-agent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 font-semibold mb-2">Available tool names:</p>
            <p className="font-mono text-sm text-gray-700">glob, grep, read_file, edit, multi_edit, write, bash, WebFetch, Memory, Browser</p>
          </div>
        </section>

        {/* Discovery */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 icon-ui" />
            Agent Discovery
          </h2>
          <p className="text-gray-700 mb-4">Agents are discovered in priority order:</p>
          <CodeWithResult
            code={`.co/agents/{name}/AGENT.md      # Project-level (highest priority)
~/.co/agents/{name}/AGENT.md    # User-level
builtin/{name}/AGENT.md         # Built-in agents (lowest priority)`}
            language="bash"
          />
          <p className="text-gray-600 mt-4 text-sm">Project-level agents override built-ins. Built-in agents are bundled with <code className="bg-gray-100 px-1 rounded">co ai</code> for common tasks like codebase exploration and planning.</p>
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
                  <td className="py-2"><code className="text-violet-300">on_agent_ready</code></td>
                  <td className="py-2 text-gray-600">initialize_subagents</td>
                  <td className="py-2 text-gray-700">Discover agents, register task() tool</td>
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
