/*
  @date: 2025-01-12
  @description: Plugin System Feature Page

  Design Goals:
  - Clean, scannable single-column layout
  - Show plugins are just event lists (keep simple things simple)
  - Progressive disclosure from simple to advanced
  - Real working examples with clear outputs
  - NEW badge to highlight recent feature
  - Copy-all-content button (CLAUDE.md requirement)
*/

'use client'

import { motion } from 'framer-motion'
import {
  Package, ArrowRight, Layers, Code, Sparkles, Play
} from 'lucide-react'
import CodeWithResult from '../../components/CodeWithResult'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'

export default function PluginPage() {

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 lg:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ArrowRight className="w-4 h-4" />
                <span className="text-white">Plugins</span>
              </nav>

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-purple-900/20 border border-purple-500/30 rounded-full px-4 md:px-6 py-2 md:py-3 mb-6">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  <span className="text-xs md:text-sm font-medium">NEW: Plugin System</span>
                  <Package className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-100">
                  Reusable Event Bundles
                </h1>

                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  Package event handlers into reusable plugins. A plugin is just an event list you can use across multiple agents.
                </p>
              </div>

              {/* Key Concept */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 md:p-8 mb-12">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Code className="text-purple-400 w-5 h-5" />
                  A Plugin is an Event List
                </h3>
                <div className="text-sm text-gray-300 space-y-3">
                  <p>
                    <code className="bg-gray-800 px-2 py-1 rounded">on_events</code> takes one event list → custom for this agent
                  </p>
                  <p>
                    <code className="bg-gray-800 px-2 py-1 rounded">plugins</code> takes a list of event lists → reusable across agents
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <Play className="text-purple-400 w-7 h-7" />
            Quick Start (60 seconds)
          </h2>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import reflection

# Use built-in reflection plugin
agent = Agent("assistant", tools=[search], plugins=[reflection])

agent.input("Search for Python")
`}
            result={`💭 We learned that Python is a popular programming language...
'Python is a high-level programming language...'`}
            language="python"
          />

          <p className="text-gray-400 mt-4">
            That's it! Use built-in plugins or create your own.
          </p>
        </section>

        {/* What is a Plugin */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What is a Plugin?
          </h2>

          <p className="text-gray-300 mb-6">
            A plugin is an event list:
          </p>

          <CodeWithResult
            code={`from connectonion import after_llm, after_tool

# This is a plugin (one event list)
reflection = [after_tool(add_reflection)]

# This is also a plugin (one event list with multiple events)
logger = [after_llm(log_llm), after_tool(log_tool)]

# Use them (plugins takes a list of plugins)
agent = Agent("assistant", tools=[search], plugins=[reflection, logger])
`}
            language="python"
          />

          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-6">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Just like tools:</strong>
            </p>
            <ul className="text-sm text-gray-400 mt-2 space-y-1">
              <li>• Tools: <code className="bg-gray-800 px-2 py-1 rounded">Agent(tools=[search, calculate])</code></li>
              <li>• Plugins: <code className="bg-gray-800 px-2 py-1 rounded">Agent(plugins=[reflection, logger])</code></li>
            </ul>
          </div>
        </section>

        {/* Plugin vs on_events */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Plugin vs on_events
          </h2>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <strong>on_events</strong>: Takes one event list (custom for this agent)</li>
              <li>• <strong>plugins</strong>: Takes a list of event lists (reusable across agents)</li>
            </ul>
          </div>

          <CodeWithResult
            code={`from datetime import datetime

# Reusable plugin (an event list)
logger = [after_llm(log_llm)]

# Use both
agent = Agent(
    "assistant",
    tools=[search],
    plugins=[logger],                                          # List of event lists
    on_events=[after_llm(add_timestamp), after_tool(log_tool)] # One event list
)
`}
            language="python"
          />
        </section>

        {/* Built-in Plugins */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Built-in Plugins (useful_plugins)
          </h2>

          <p className="text-gray-300 mb-6">
            ConnectOnion provides ready-to-use plugins that you can import and use immediately.
          </p>

          <h3 className="text-xl font-semibold mb-4">Reflection Plugin</h3>
          <p className="text-gray-300 mb-4">
            Reflects on tool execution results to generate insights:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import reflection

agent = Agent("assistant", tools=[search], plugins=[reflection])

agent.input("Search for Python")
# After each successful tool execution:
# 💭 We learned that Python is a popular high-level programming language known for simplicity`}
            language="python"
          />

          <h3 className="text-xl font-semibold mb-4 mt-8">ReAct Plugin</h3>
          <p className="text-gray-300 mb-4">
            Uses ReAct-style reasoning to plan next steps:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import react

agent = Agent("assistant", tools=[search], plugins=[react])

agent.input("Search for Python and explain it")
# After each tool execution:
# 🤔 We learned Python is widely used. We should next explain its key features and use cases.`}
            language="python"
          />

          <h3 className="text-xl font-semibold mb-4 mt-8">Using Both Together</h3>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import reflection, react

agent = Agent("assistant", tools=[search], plugins=[reflection, react])

# Now you get both after each tool:
# 💭 Reflection: What we learned
# 🤔 ReAct: What to do next`}
            language="python"
          />
        </section>

        {/* Writing Custom Plugins */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Writing Custom Plugins
          </h2>

          <p className="text-gray-300 mb-6">
            Learn by example - here's how the reflection plugin is implemented:
          </p>

          <h3 className="text-xl font-semibold mb-4">Step 1: Message Compression Helper</h3>

          <CodeWithResult
            code={`from typing import List, Dict

def _compress_messages(messages: List[Dict], tool_result_limit: int = 150) -> str:
    """
    Compress conversation messages with structure:
    - USER messages → Keep FULL
    - ASSISTANT tool_calls → Keep parameters FULL
    - ASSISTANT text → Keep FULL
    - TOOL results → Truncate to tool_result_limit chars
    """
    lines = []

    for msg in messages:
        role = msg['role']

        if role == 'user':
            lines.append(f"USER: {msg['content']}")

        elif role == 'assistant':
            if 'tool_calls' in msg:
                tools = [f"{tc['function']['name']}({tc['function']['arguments']})"
                         for tc in msg['tool_calls']]
                lines.append(f"ASSISTANT: {', '.join(tools)}")
            else:
                lines.append(f"ASSISTANT: {msg['content']}")

        elif role == 'tool':
            result = msg['content']
            if len(result) > tool_result_limit:
                result = result[:tool_result_limit] + '...'
            lines.append(f"TOOL: {result}")

    return "\\n".join(lines)`}
            language="python"
          />

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mt-4">
            <p className="text-sm text-white font-semibold mb-2">Why this works:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Keep user messages FULL (need to know what they asked)</li>
              <li>• Keep tool parameters FULL (exactly what actions were taken)</li>
              <li>• Keep assistant text FULL (reasoning/responses)</li>
              <li>• Truncate tool results (save tokens while maintaining overview)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4 mt-8">Step 2: Event Handler Function</h3>

          <CodeWithResult
            code={`from connectonion.events import after_tool
from connectonion.llm_do import llm_do

def _add_reflection(agent) -> None:
    """Reflect on tool execution result"""
    trace = agent.current_session['trace'][-1]

    if trace['type'] == 'tool_execution' and trace['status'] == 'success':
        # Extract current tool execution
        user_prompt = agent.current_session.get('user_prompt', '')
        tool_name = trace['tool_name']
        tool_args = trace['arguments']
        tool_result = trace['result']

        # Compress conversation messages
        conversation = _compress_messages(agent.current_session['messages'])

        # Build prompt with conversation context + current execution
        prompt = f"""CONVERSATION:
{conversation}

CURRENT EXECUTION:
User asked: {user_prompt}
Tool: {tool_name}({tool_args})
Result: {tool_result}

Reflect in 1-2 sentences on what we learned:"""

        reflection_text = llm_do(
            prompt,
            model="co/gpt-4o",
            temperature=0.3,
            system_prompt="You reflect on tool execution results to generate insights."
        )

        # Add reflection as assistant message
        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"💭 {reflection_text}"
        })

        agent.console.print(f"[dim]💭 {reflection_text}[/dim]")`}
            language="python"
          />

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mt-4">
            <p className="text-sm text-white font-semibold mb-2">Key insights:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Access agent state via <code className="bg-gray-800 px-2 py-1 rounded">agent.current_session</code></li>
              <li>• Use <code className="bg-gray-800 px-2 py-1 rounded">llm_do()</code> for AI-powered analysis</li>
              <li>• Add results back to conversation messages</li>
              <li>• Print to console for user feedback</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4 mt-8">Step 3: Create Plugin (Event List)</h3>

          <CodeWithResult
            code={`# Plugin is an event list
reflection = [after_tool(_add_reflection)]`}
            language="python"
          />

          <p className="text-gray-300 mt-4">
            <strong>That's it!</strong> A plugin is just an event list.
          </p>

          <h3 className="text-xl font-semibold mb-4 mt-8">Step 4: Use Your Plugin</h3>

          <CodeWithResult
            code={`agent = Agent("assistant", tools=[search], plugins=[reflection])`}
            language="python"
          />
        </section>

        {/* Quick Custom Plugin Example */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Quick Custom Plugin Example
          </h2>

          <p className="text-gray-300 mb-4">
            Build a simple plugin in 3 lines:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, after_tool

def log_tool(agent):
    trace = agent.current_session['trace'][-1]
    print(f"✓ {trace['tool_name']} completed in {trace['timing']}ms")

# Plugin is an event list
logger = [after_tool(log_tool)]

# Use it
agent = Agent("assistant", tools=[search], plugins=[logger])`}
            language="python"
          />
        </section>

        {/* Example: Reflection Plugin */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Example: Reflection Plugin
          </h2>

          <CodeWithResult
            code={`from connectonion import Agent, after_tool, llm_do

def add_reflection(agent):
    trace = agent.current_session['trace'][-1]

    if trace['type'] == 'tool_execution' and trace['status'] == 'success':
        result = trace['result']

        reflection = llm_do(
            f"Result: {result[:200]}\\n\\nWhat did we learn?",
            system_prompt="Be concise.",
            temperature=0.3
        )

        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"🤔 {reflection}"
        })

        print(f"💭 {reflection}")

# Plugin is an event list
reflection = [after_tool(add_reflection)]

# Use it
agent = Agent("researcher", tools=[search], plugins=[reflection])

agent.input("Search for Python")
`}
            result={`💭 We learned Python is a popular programming language...
'Python is a high-level programming language...'`}
            language="python"
          />
        </section>

        {/* Example: Todo Plugin */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Example: Todo Plugin
          </h2>

          <CodeWithResult
            code={`from connectonion import Agent, after_user_input, after_tool, llm_do
from pydantic import BaseModel
from typing import List

class TodoList(BaseModel):
    tasks: List[str]

# Store todos
todos = []

def create_todos(agent):
    prompt = agent.current_session['user_prompt']

    todo_list = llm_do(
        f"Break into 3-5 steps:\\n{prompt}",
        output=TodoList,
        temperature=0.2
    )

    todos.clear()
    todos.extend(todo_list.tasks)

    print("📝 Todos:")
    for i, task in enumerate(todos, 1):
        print(f"  {i}. {task}")

def check_todos(agent):
    trace = agent.current_session['trace'][-1]

    if trace['type'] == 'tool_execution' and trace['status'] == 'success':
        result = trace['result']

        for task in todos:
            check = llm_do(
                f"Todo: {task}\\nResult: {result[:200]}\\n\\nDone? (yes/no)",
                temperature=0
            )

            if 'yes' in check.lower():
                print(f"✅ {task}")

# Plugin is an event list
todo = [after_user_input(create_todos), after_tool(check_todos)]

# Use it
agent = Agent("assistant", tools=[search, analyze], plugins=[todo])

agent.input("Research Python and summarize")
`}
            result={`📝 Todos:
  1. Search for Python
  2. Analyze results
  3. Summarize findings
✅ Search for Python`}
            language="python"
          />
        </section>

        {/* Reusing Plugins */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Reusing Plugins
          </h2>

          <p className="text-gray-300 mb-6">
            Use the same plugin across multiple agents:
          </p>

          <CodeWithResult
            code={`# Define once
reflection = [after_tool(add_reflection)]
logger = [after_llm(log_llm), after_tool(log_tool)]

# Use in multiple agents
researcher = Agent("researcher", tools=[search], plugins=[reflection, logger])
writer = Agent("writer", tools=[generate], plugins=[reflection])
analyst = Agent("analyst", tools=[calculate], plugins=[logger])
`}
            language="python"
          />
        </section>

        {/* Summary */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Summary
          </h2>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <p className="text-lg font-semibold text-white mb-4">A plugin is an event list</p>

            <CodeWithResult
              code={`# Define a plugin (an event list)
my_plugin = [after_llm(handler1), after_tool(handler2)]

# Use it (plugins takes a list of event lists)
agent = Agent("assistant", tools=[search], plugins=[my_plugin])
`}
              language="python"
            />

            <div className="mt-6 text-sm text-gray-300 space-y-2">
              <p><strong className="text-white">on_events vs plugins:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><code className="bg-gray-800 px-2 py-1 rounded">on_events=[after_llm(h1), after_tool(h2)]</code> → one event list</li>
                <li><code className="bg-gray-800 px-2 py-1 rounded">plugins=[plugin1, plugin2]</code> → list of event lists</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            What's Next?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/on_events"
              className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Layers className="text-purple-400 w-5 h-5" />
                Event System
              </h3>
              <p className="text-sm text-gray-400">
                Learn about events that power plugins
              </p>
            </Link>

            <Link
              href="/llm_do"
              className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Code className="text-purple-400 w-5 h-5" />
                llm_do
              </h3>
              <p className="text-sm text-gray-400">
                Use llm_do in plugin handlers
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
