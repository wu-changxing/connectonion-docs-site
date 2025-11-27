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
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

export default function PluginPage() {

  // Markdown content for copy/download feature
  const pageContent = `# Plugin System

Package event handlers into reusable plugins. A plugin is just an event list you can use across multiple agents.

## Key Concept

**A Plugin is an Event List:**
- \`on_events\` takes one event list → custom for this agent
- \`plugins\` takes a list of event lists → reusable across agents

## Quick Start (60 seconds)

\`\`\`python
from connectonion import Agent
from connectonion.useful_plugins import reflection

def search(query: str) -> str:
    return f"Results for {query}"

# Use built-in reflection plugin
agent = Agent("assistant", tools=[search], plugins=[reflection])
agent.input("Search for Python")
\`\`\`

## Plugin vs on_events

- **on_events**: Takes one event list (custom for this agent)
- **plugins**: Takes a list of event lists (reusable across agents)

## Built-in Plugins

### 1. image_result_formatter

Converts base64 images to OpenAI vision format for multimodal LLMs.

\`\`\`python
from connectonion import Agent
from connectonion.useful_plugins import image_result_formatter

def take_screenshot(url: str) -> str:
    # Returns: "data:image/png;base64,iVBORw0KGgoAAAANS..."
    return capture_screenshot(url)

agent = Agent(
    "vision_agent",
    tools=[take_screenshot],
    plugins=[image_result_formatter],
    model="gpt-4o"
)
\`\`\`

### 2. reflection

Adds AI-powered analysis after each tool execution.

\`\`\`python
from connectonion import Agent
from connectonion.useful_plugins import reflection

agent = Agent("assistant", tools=[search], plugins=[reflection])
\`\`\`

### 3. react (ReAct Pattern)

Implements the Reason + Act pattern for better decision-making.

\`\`\`python
from connectonion import Agent
from connectonion.useful_plugins import react

agent = Agent("assistant", tools=[search], plugins=[react])
\`\`\`

### 4. token_optimizer

Truncates tool results to save tokens while keeping context.

\`\`\`python
from connectonion import Agent
from connectonion.useful_plugins import token_optimizer

agent = Agent("assistant", tools=[search], plugins=[token_optimizer])
\`\`\`

## Building Custom Plugins

A plugin is just an event list. Here's how to build your own:

### Step 1: Choose Event Hook

\`\`\`python
from connectonion.events import after_tool
\`\`\`

### Step 2: Event Handler Function

\`\`\`python
from connectonion.events import after_tool
from connectonion.llm_do import llm_do

def _add_reflection(agent) -> None:
    """Reflect on tool execution result"""
    trace = agent.current_session['trace'][-1]

    if trace['type'] == 'tool_execution' and trace['status'] == 'success':
        user_prompt = agent.current_session.get('user_prompt', '')
        tool_name = trace['tool_name']
        tool_args = trace['arguments']
        tool_result = trace['result']

        reflection_prompt = f"""
User asked: {user_prompt}
Tool used: {tool_name}({tool_args})
Result: {tool_result}

Reflection: What does this result tell us? What should we do next?
"""

        reflection_text = llm_do(reflection_prompt, model="gpt-4o-mini")

        agent.current_session['messages'].append({
            "role": "assistant",
            "content": f"💭 Reflection: {reflection_text}"
        })

        agent.console.print(f"[dim]💭 {reflection_text}[/dim]")
\`\`\`

### Step 3: Create Plugin (Event List)

\`\`\`python
reflection = [after_tool(_add_reflection)]
\`\`\`

### Step 4: Use Your Plugin

\`\`\`python
agent = Agent("assistant", tools=[search], plugins=[reflection])
\`\`\`

## Multiple Plugins Together

\`\`\`python
from connectonion import Agent
from connectonion.useful_plugins import reflection, react, image_result_formatter

agent = Agent(
    name="visual_researcher",
    tools=[take_screenshot, search, analyze],
    plugins=[image_result_formatter, reflection, react]
)
\`\`\`

## Summary

A plugin is an event list:

\`\`\`python
# Define a plugin (an event list)
my_plugin = [after_llm(handler1), after_tool(handler2)]

# Use it (plugins takes a list of event lists)
agent = Agent("assistant", tools=[search], plugins=[my_plugin])
\`\`\`

**Key Points:**
- Plugins = Reusable event lists
- Use \`plugins=[...]\` for pre-packaged functionality
- Use \`on_events=[...]\` for agent-specific behavior
- Combine multiple plugins for powerful agents

## What's Next

- **Event System**: Learn about all 6 lifecycle hooks
- **Vibe Coding**: See plugin patterns in action with visual examples
`


  return (
    <div className="px-4 md:px-8 py-8 md:py-16 md:py-24 lg:py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-100 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Plugins</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-purple-900/30 to-purple-800/10 border border-purple-500/30 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-purple-200">NEW</span>
              </div>

              <h1 className="heading-1">
                Reusable Event Bundles
              </h1>

              <p className="text-xl text-slate-100">
                Package event handlers into reusable plugins. A plugin is just an event list you can use across multiple agents.
              </p>
            </div>

            <CopyMarkdownButton
              content={pageContent}
              filename="plugin-system.md"
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Key Concept Info Box */}
        <div className="flex items-center gap-2 mb-12 p-4 bg-gradient-to-b from-purple-900/30 to-purple-800/10 border border-purple-500/30 rounded-lg">
          <Code className="text-purple-400 w-5 h-5 flex-shrink-0" />
          <div className="text-sm text-purple-200">
            <strong className="text-purple-100">A Plugin is an Event List:</strong>{' '}
            <code className="bg-purple-950/50 px-2 py-0.5 rounded text-purple-200">on_events</code> takes one event list → custom for this agent.{' '}
            <code className="bg-purple-950/50 px-2 py-0.5 rounded text-purple-200">plugins</code> takes a list of event lists → reusable across agents.
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="heading-2">
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

          <p className="text-slate-100 mt-4">
            That's it! Use built-in plugins or create your own.
          </p>
        </section>

        {/* What is a Plugin */}
        <section className="mb-16">
          <h2 className="heading-2">
            What is a Plugin?
          </h2>

          <p className="text-slate-100 mb-6">
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

          <div className="mt-6 bg-gradient-to-b from-blue-900/30 to-blue-800/10 border border-blue-500/30 rounded-lg p-6">
            <p className="text-sm text-blue-100">
              <strong className="text-blue-50">Just like tools:</strong>
            </p>
            <ul className="text-sm text-blue-100 mt-2 space-y-1">
              <li>• Tools: <code className="bg-blue-900/50 px-2 py-1 rounded">Agent(tools=[search, calculate])</code></li>
              <li>• Plugins: <code className="bg-blue-900/50 px-2 py-1 rounded">Agent(plugins=[reflection, logger])</code></li>
            </ul>
          </div>
        </section>

        {/* Plugin vs on_events */}
        <section className="mb-16">
          <h2 className="heading-2">
            Plugin vs on_events
          </h2>

          <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/10 border border-purple-500/30 rounded-lg p-6 mb-6">
            <ul className="text-sm text-purple-100 space-y-2">
              <li>• <strong className="text-purple-50">on_events</strong>: Takes one event list (custom for this agent)</li>
              <li>• <strong className="text-purple-50">plugins</strong>: Takes a list of event lists (reusable across agents)</li>
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
          <h2 className="heading-2">
            Built-in Plugins (useful_plugins)
          </h2>

          <p className="text-slate-100 mb-6">
            ConnectOnion provides ready-to-use plugins that you can import and use immediately.
          </p>

          <h3 className="text-xl font-semibold mb-4">Reflection Plugin</h3>
          <p className="text-slate-100 mb-4">
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
          <p className="text-slate-100 mb-4">
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

          <h3 className="text-xl font-semibold mb-4 mt-8">Image Result Formatter Plugin</h3>
          <p className="text-slate-100 mb-4">
            Automatically converts base64 image results to proper image message format for vision models:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import image_result_formatter

agent = Agent("assistant", tools=[take_screenshot], plugins=[image_result_formatter])

agent.input("Take a screenshot of the homepage and describe what you see")
# 🖼️  Formatted tool result as image (image/png)
# Agent can now see and analyze the actual image, not just base64 text!`}
            language="python"
          />

          <div className="bg-gradient-to-b from-green-900/30 to-green-800/10 border border-green-500/30 rounded-lg p-6 mt-4">
            <p className="text-sm text-green-50 font-semibold mb-2">When to use:</p>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• Tools that return screenshots as base64</li>
              <li>• Image generation tools</li>
              <li>• Any tool that returns visual data</li>
            </ul>
            <p className="text-sm text-green-50 font-semibold mb-2 mt-4">What it does:</p>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• Detects base64 images in tool results (data URLs or plain base64)</li>
              <li>• Converts to OpenAI vision API format</li>
              <li>• Allows multimodal LLMs to see images visually instead of as text</li>
              <li>• Supports PNG, JPEG, WebP, GIF formats</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4 mt-8">Using Multiple Plugins Together</h3>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import reflection, react, image_result_formatter

# Combine plugins for powerful agents
agent = Agent(
    name="visual_researcher",
    tools=[take_screenshot, search, analyze],
    plugins=[image_result_formatter, reflection, react]
)

# Now you get:
# 🖼️  Image formatting for screenshots
# 💭 Reflection: What we learned
# 🤔 ReAct: What to do next`}
            language="python"
          />
        </section>

        {/* Writing Custom Plugins */}
        <section className="mb-16">
          <h2 className="heading-2">
            Writing Custom Plugins
          </h2>

          <p className="text-slate-100 mb-6">
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

          <div className="bg-gradient-to-b from-amber-900/30 to-amber-800/10 border border-amber-500/30 rounded-lg p-6 mt-4">
            <p className="text-sm text-amber-50 font-semibold mb-2">Why this works:</p>
            <ul className="text-sm text-amber-100 space-y-1">
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

          <div className="bg-gradient-to-b from-cyan-900/30 to-cyan-800/10 border border-cyan-500/30 rounded-lg p-6 mt-4">
            <p className="text-sm text-cyan-50 font-semibold mb-2">Key insights:</p>
            <ul className="text-sm text-cyan-100 space-y-1">
              <li>• Access agent state via <code className="bg-cyan-900/50 px-2 py-1 rounded">agent.current_session</code></li>
              <li>• Use <code className="bg-cyan-900/50 px-2 py-1 rounded">llm_do()</code> for AI-powered analysis</li>
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

          <p className="text-slate-100 mt-4">
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
          <h2 className="heading-2">
            Quick Custom Plugin Example
          </h2>

          <p className="text-slate-100 mb-4">
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
          <h2 className="heading-2">
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
          <h2 className="heading-2">
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
          <h2 className="heading-2">
            Reusing Plugins
          </h2>

          <p className="text-slate-100 mb-6">
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
          <h2 className="heading-2">
            Summary
          </h2>

          <div className="bg-gradient-to-b from-purple-900/30 to-purple-800/10 border border-purple-500/30 rounded-lg p-6">
            <p className="text-lg font-semibold text-purple-50 mb-4">A plugin is an event list</p>

            <CodeWithResult
              code={`# Define a plugin (an event list)
my_plugin = [after_llm(handler1), after_tool(handler2)]

# Use it (plugins takes a list of event lists)
agent = Agent("assistant", tools=[search], plugins=[my_plugin])
`}
              language="python"
            />

            <div className="mt-6 text-sm text-slate-100 space-y-2">
              <p><strong className="text-white">on_events vs plugins:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-slate-100">
                <li><code className="bg-gray-800 px-2 py-1 rounded">on_events=[after_llm(h1), after_tool(h2)]</code> → one event list</li>
                <li><code className="bg-gray-800 px-2 py-1 rounded">plugins=[plugin1, plugin2]</code> → list of event lists</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="heading-2">
            <ArrowRight className="text-purple-400 w-6 h-6" />
            What's Next?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <Link
              href="/on_events"
              className="group bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Layers className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Event System
              </h3>
              <p className="text-purple-100 text-sm">
                Learn about events that power plugins
              </p>
            </Link>

            <Link
              href="/llm_do"
              className="group bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Code className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                llm_do
              </h3>
              <p className="text-blue-100 text-sm">
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
