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
          iconColor="icon-ui"
          title="re_act"
          description="ReAct (Reason + Act) pattern for intelligent agents"
          markdownPath="/useful-plugins/re_act.md"
          markdownFilename="re-act.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            The <code className="bg-gray-100 px-2 py-1 rounded">re_act</code> plugin implements the ReAct pattern:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineLightBulb className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold">Acknowledge (after_user_input)</h3>
              </div>
              <p className="text-sm text-gray-700">Before taking any action, the agent acknowledges the request in 1-2 sentences to show it understood — planning itself is left to the main agent.</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineArrowPath className="w-5 h-5 icon-ui" />
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
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy re_act</code></Link> to get an editable copy.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>

          <h3 className="heading-3">1. Acknowledge Phase</h3>
          <p className="text-gray-700 mb-4">
            After receiving user input, the plugin acknowledges the request (not a plan — just confirms understanding):
          </p>
          <CodeWithResult
            code={`# Internal: acknowledge_request handler
@after_user_input
def acknowledge_request(agent):
    user_prompt = agent.current_session.get('user_prompt', '')
    conversation = _format_conversation(agent.current_session.get('messages', []))

    ack = llm_do(
        f"Conversation so far:\\n{conversation}\\n\\nCurrent user input: {user_prompt}\\n\\nAcknowledge this request (1-2 sentences):",
        model="co/gemini-3.7-flash",
        system_prompt=ACKNOWLEDGE_PROMPT
    )

    agent.current_session['intent'] = ack
    agent.current_session['messages'].append({
        'role': 'assistant',
        'content': ack
    })`}
            language="python"
          />

          <h3 className="heading-3 mt-8">2. Reflection Phase</h3>
          <p className="text-gray-700 mb-4">
            After each batch of tools executes, the plugin reflects on the most recent result:
          </p>
          <CodeWithResult
            code={`# Uses the built-in reflect handler from useful_events_handlers
@after_tools
def reflect(agent):
    trace = agent.current_session['trace'][-1]

    if trace['type'] != 'tool_result':
        return

    tool_name = trace['name']
    tool_args = trace['args']

    if trace['status'] == 'success':
        reflection = llm_do(
            f"Action: {tool_name}({tool_args})\\nResult: {str(trace['result'])[:300]}\\nWhat did we learn? What's next?",
            model="co/gemini-3.7-flash"
        )
        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': reflection
        })`}
            language="python"
          />
        </section>

        {/* Combined with eval */}
        <section className="mb-12">
          <h2 className="heading-2">Combined with Eval Plugin</h2>
          <p className="text-gray-700 mb-4">
            For debugging and testing, combine with the <code className="bg-gray-100 px-2 py-1 rounded">eval</code> plugin:
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act, eval

# ReAct provides planning, eval provides evaluation at completion
agent = Agent("assistant", tools=[search], plugins=[re_act, eval])

agent.input("Search for Python")
# Output includes:
# Acknowledge: "I'll search for Python information and explain it to you."
# [Tool execution]
# Reflection: We learned Python is a programming language
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
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Event</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Handler</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code className="text-gray-600">after_user_input</code></td>
                  <td className="py-2">acknowledge_request</td>
                  <td className="py-2 text-gray-700">Acknowledge what the user is asking for</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-gray-600">after_tools</code></td>
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
            <code className="bg-gray-100 px-2 py-1 rounded">connectonion/useful_plugins/re_act.py</code>
          </p>
          <CodeWithResult
            code={`# The plugin is just a list of event handlers
re_act = [acknowledge_request, reflect]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
