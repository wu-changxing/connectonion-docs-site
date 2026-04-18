'use client'

import React from 'react'
import { HiOutlineCpuChip, HiOutlineArrowRight, HiOutlineCodeBracket, HiOutlineLightBulb, HiOutlineArrowPath } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ReActPluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 're_act' },
          ]}
          icon={HiOutlineCpuChip}
          iconColor="text-gray-500"
          iconBgFrom="from-gray-700/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-gray-400/30"
          title="re_act"
          description="ReAct (Reason + Act) pattern for intelligent agents"
          markdownPath="/useful-plugins/re_act.md"
          markdownFilename="re-act.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            The <code className="bg-gray-800 px-2 py-1 rounded">re_act</code> plugin implements the ReAct pattern:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/20 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineLightBulb className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold">Plan (after_user_input)</h3>
              </div>
              <p className="text-sm text-gray-700">Before taking any action, the agent plans what to do based on user input and available tools.</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineArrowPath className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">Reflect (after_tools)</h3>
              </div>
              <p className="text-sm text-gray-700">After each tool execution, the agent reflects on results and decides next steps.</p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act

def search(query: str) -> str:
    """Search the web for information."""
    return f"Results for '{query}': Python is a programming language..."

agent = Agent("assistant", tools=[search], plugins=[re_act])

agent.input("Search for Python and explain what it is")`}
            result={`💭 I'll search for information about Python, then explain what it is based on the results.
[Tool: search("Python")]
💭 The search returned that Python is a programming language. I now have enough context to explain.
Python is a high-level, interpreted programming language known for its simplicity...`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-400"><code className="bg-gray-800 px-2 py-1 rounded">co copy re_act</code></Link> to get an editable copy.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>

          <h3 className="heading-3">1. Planning Phase</h3>
          <p className="text-gray-700 mb-4">
            After receiving user input, the plugin generates a brief plan:
          </p>
          <CodeWithResult
            code={`# Internal: plan_task handler
@after_user_input
def plan_task(agent):
    user_prompt = agent.current_session.get('user_prompt', '')
    tool_names = agent.tools.names()

    plan = llm_do(
        f"User request: {user_prompt}\\nAvailable tools: {tool_names}\\nBrief plan:",
        model="co/gemini-2.5-flash"
    )

    agent.current_session['messages'].append({
        'role': 'assistant',
        'content': f"💭 {plan}"
    })`}
            language="python"
          />

          <h3 className="heading-3 mt-8">2. Reflection Phase</h3>
          <p className="text-gray-700 mb-4">
            After tools execute, the plugin reflects on results:
          </p>
          <CodeWithResult
            code={`# Uses the built-in reflect handler from useful_events_handlers
@after_tools
def reflect(agent):
    trace = agent.current_session['trace'][-1]

    if trace['type'] == 'tool_execution' and trace['status'] == 'success':
        reflection = llm_do(
            f"Result: {trace['result'][:200]}\\nWhat did we learn?",
            model="co/gemini-2.5-flash"
        )

        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"💭 {reflection}"
        })`}
            language="python"
          />
        </section>

        {/* Combined with eval */}
        <section className="mb-12">
          <h2 className="heading-2">Combined with Eval Plugin</h2>
          <p className="text-gray-700 mb-4">
            For debugging and testing, combine with the <code className="bg-gray-800 px-2 py-1 rounded">eval</code> plugin:
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act, eval

# ReAct provides planning, eval provides evaluation at completion
agent = Agent("assistant", tools=[search], plugins=[re_act, eval])

agent.input("Search for Python")
# Output includes:
# 💭 Plan: I'll search for Python information
# [Tool execution]
# 💭 Reflection: We learned Python is a programming language
# ✓ Evaluation: Task complete - found and understood Python info`}
            language="python"
          />
        </section>

        {/* Events used */}
        <section className="mb-12">
          <h2 className="heading-2">Events Used</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th scope="col" className="text-left py-2 text-gray-700">Event</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Handler</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><code className="text-gray-400">after_user_input</code></td>
                  <td className="py-2">plan_task</td>
                  <td className="py-2 text-gray-700">Generate initial plan</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-gray-400">after_tools</code></td>
                  <td className="py-2">reflect</td>
                  <td className="py-2 text-gray-700">Reflect on tool results</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-gray-700">
            <code className="bg-gray-800 px-2 py-1 rounded">connectonion/useful_plugins/re_act.py</code>
          </p>
          <CodeWithResult
            code={`# The plugin is just a list of event handlers
re_act = [plan_task, reflect]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
