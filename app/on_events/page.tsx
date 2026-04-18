/*
  @date: 2025-01-04
  @description: Event System (on_events) Feature Page

  Design Goals:
  - Clean, scannable single-column layout
  - Progressive disclosure from simple to advanced
  - Real working examples with clear outputs
  - NEW badge to highlight recent feature
  - Copy-all-content button (CLAUDE.md requirement)
*/

'use client'

import { motion } from 'framer-motion'
import { HiOutlineBolt, HiOutlineArrowRight, HiOutlineChartBar, HiOutlineClock, HiOutlineCodeBracket, HiOutlineSquare3Stack3D, HiOutlinePlay, HiOutlineArrowLeft, HiOutlineSparkles, HiOutlineShieldCheck } from 'react-icons/hi2'
import CodeWithResult from '../../components/CodeWithResult'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

export default function OnEventsPage() {

  const pageContent = `# Event System (on_events)

Hook into agent lifecycle to add logging, monitoring, reflection, and custom behavior at every step.

## 12 Event Types

- **after_user_input**: Fires once per turn
- **before_iteration**: Before each iteration starts (poll IO, check mode changes)
- **before_llm**: Before each LLM call
- **after_llm**: After each LLM response
- **before_each_tool**: Before each individual tool execution
- **before_tools**: Once before all tools in a batch
- **after_each_tool**: After each individual tool (logging only, don't add messages)
- **after_tools**: Once after all tools complete (safe for adding messages)
- **on_error**: When tool execution fails
- **after_iteration**: After each iteration (checkpoints, can stop loop)
- **on_stop_signal**: When stop_signal is set (cleanup interrupted operations)
- **on_complete**: Fires once after agent finishes task

## Quick Start

\`\`\`python
from connectonion import Agent, after_llm

def log_llm_calls(agent):
    """Track LLM performance"""
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'llm_call':
        duration = trace['duration_ms']
        print(f"⚡ LLM call: {duration:.0f}ms")

agent = Agent(
    "assistant",
    tools=[search],
    on_events=[after_llm(log_llm_calls)]
)

agent.input("Search for Python")
\`\`\`

**Result:**
\`\`\`
⚡ LLM call: 1204ms
⚡ LLM call: 831ms
"I found results for Python..."
\`\`\`

**Group multiple handlers:**

\`\`\`python
def check_shell(agent):
    ...

def check_email(agent):
    ...

agent = Agent(
    "assistant",
    on_events=[
        before_each_tool(check_shell, check_email),  # group handlers for same event
    ]
)
\`\`\`

> **Note: Decorator Syntax**
> You can also use \`@before_each_tool\` decorator instead of \`before_each_tool(fn)\`.
> We recommend wrapper style because it's easier for LLMs to understand.
> But if you prefer decorators, they work too.

## All Event Types

### after_user_input

Fires once per turn, after user input is added.

\`\`\`python
def add_timestamp(agent):
    from datetime import datetime
    timestamp = datetime.now().strftime("%H:%M:%S")
    agent.current_session['messages'].append({
        'role': 'system',
        'content': f'Current time: {timestamp}'
    })

agent = Agent("assistant", on_events=[
    after_user_input(add_timestamp)
])
\`\`\`

### after_llm

Fires after each LLM response (multiple times per turn).

\`\`\`python
from connectonion import llm_do

def add_reflection(agent):
    """Add AI-generated reflection after tools execute"""
    trace = agent.current_session['trace']

    # Find recent tool executions
    recent_tools = []
    llm_count = 0
    for entry in reversed(trace):
        if entry.get('type') == 'llm_call':
            llm_count += 1
            if llm_count >= 2:
                break
        elif entry.get('type') == 'tool_execution':
            recent_tools.append(entry)

    if recent_tools:
        result = recent_tools[0]['result'][:200]
        reflection = llm_do(
            f"Reflect on this result: {result}",
            model="gpt-4o-mini"
        )
        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"💭 {reflection}"
        })

agent = Agent("assistant", tools=[search], on_events=[
    after_llm(add_reflection)
])
\`\`\`

### before_each_tool

Fires before EACH individual tool execution. Access pending tool via \`agent.current_session['pending_tool']\`.

\`\`\`python
def validate_tool(agent):
    """Validate tool before execution"""
    pending = agent.current_session['pending_tool']
    print(f"About to run: {pending['name']}")
    # Raise exception to cancel execution

agent = Agent("assistant", tools=[search], on_events=[
    before_each_tool(validate_tool)
])
\`\`\`

### before_tools

Fires ONCE before ALL tools in a batch execute (when LLM returns multiple tool_calls).

\`\`\`python
def log_batch_start(agent):
    """Log start of tool execution batch"""
    print("Starting tool execution batch...")

agent = Agent("assistant", tools=[search], on_events=[
    before_tools(log_batch_start)
])
\`\`\`

### after_each_tool

Fires after EACH individual tool execution (for logging only).

⚠️ **WARNING:** Do NOT add messages to \`agent.current_session['messages']\` here! When LLM returns multiple tool_calls, adding messages between tool results breaks Anthropic Claude's API. Use \`after_tools\` instead for message injection.

\`\`\`python
def log_tool_timing(agent):
    """Log each tool's execution time"""
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'tool_execution':
        timing = trace['timing']
        print(f"🔧 {trace['tool_name']}: {timing:.0f}ms")

agent = Agent("assistant", tools=[search, analyze], on_events=[
    after_each_tool(log_tool_timing)
])
\`\`\`

### after_tools

Fires ONCE after ALL tools in a batch complete. This is the safe place to add messages.

\`\`\`python
def add_reflection(agent):
    """Add reflection after tools complete (safe for message injection)"""
    trace = agent.current_session['trace']
    recent_tools = [t for t in trace if t['type'] == 'tool_execution'][-3:]
    if recent_tools:
        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"Completed {len(recent_tools)} tools"
        })

agent = Agent("assistant", tools=[search, analyze], on_events=[
    after_tools(add_reflection)
])
\`\`\`

### on_error

Fires when tool execution fails or tool not found.

\`\`\`python
def handle_errors(agent):
    """Custom error handling"""
    trace = agent.current_session['trace'][-1]
    if trace.get('status') in ('error', 'not_found'):
        error = trace.get('error', 'Unknown error')
        print(f"❌ Error: {error}")

agent = Agent("assistant", tools=[api_call], on_events=[
    on_error(handle_errors)
])
\`\`\`

## Combining Multiple Events

\`\`\`python
from connectonion import Agent, after_user_input, after_llm, after_each_tool, after_tools, on_error, on_complete
from datetime import datetime

def log_session_start(agent):
    print(f"📝 Session started at {datetime.now()}")

def track_llm(agent):
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'llm_call':
        print(f"⚡ LLM: {trace['duration_ms']:.0f}ms")

def track_each_tool(agent):
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'tool_execution':
        print(f"🔧 Tool: {trace['tool_name']}")

def handle_errors(agent):
    trace = agent.current_session['trace'][-1]
    print(f"❌ Error: {trace.get('error')}")

def log_completion(agent):
    print(f"✅ Task complete")

agent = Agent(
    "full_monitoring",
    tools=[search, analyze],
    on_events=[
        after_user_input(log_session_start),
        after_llm(track_llm),
        after_each_tool(track_each_tool),
        on_error(handle_errors),
        on_complete(log_completion)
    ]
)

agent.input("Search and analyze Python")
\`\`\`

**Result:**
\`\`\`
📝 Session started at 2025-01-04 15:30:42
⚡ LLM: 1204ms
🔧 Tool: search
⚡ LLM: 831ms
🔧 Tool: analyze
⚡ LLM: 1142ms
✅ Task complete
"Analysis complete..."
\`\`\`

## Real-World Use Cases

### Performance Monitoring Dashboard

\`\`\`python
class PerformanceMonitor:
    def __init__(self):
        self.metrics = {
            'llm_calls': 0,
            'tool_calls': 0,
            'total_llm_time': 0,
            'total_tool_time': 0,
            'errors': 0
        }

    def track_llm(self, agent):
        trace = agent.current_session['trace'][-1]
        if trace['type'] == 'llm_call':
            self.metrics['llm_calls'] += 1
            self.metrics['total_llm_time'] += trace['duration_ms']

    def track_tool(self, agent):
        trace = agent.current_session['trace'][-1]
        if trace['type'] == 'tool_execution':
            self.metrics['tool_calls'] += 1
            self.metrics['total_tool_time'] += trace['timing']

    def track_error(self, agent):
        self.metrics['errors'] += 1

    def report(self):
        print(f"LLM calls: {self.metrics['llm_calls']}")
        print(f"Avg LLM time: {self.metrics['total_llm_time'] / max(1, self.metrics['llm_calls']):.0f}ms")
        print(f"Tool calls: {self.metrics['tool_calls']}")
        print(f"Errors: {self.metrics['errors']}")

monitor = PerformanceMonitor()
agent = Agent("monitored", tools=[search], on_events=[
    after_llm(monitor.track_llm),
    after_each_tool(monitor.track_tool),
    on_error(monitor.track_error)
])

agent.input("Complex task...")
monitor.report()
\`\`\`

**Result:**
\`\`\`
LLM calls: 3
Avg LLM time: 1245ms
Tool calls: 2
Errors: 0
\`\`\`
`

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header with Breadcrumb and Copy Button */}
        <div className="mb-12">
          <nav className="flex items-center gap-2 text-sm text-gray-700 mb-4">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <HiOutlineArrowRight className="w-4 h-4" />
            <span className="text-gray-900">Events (on_events)</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
                <HiOutlineSparkles className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-gray-700">New in v0.9</span>
              </div>

              <h1 className="heading-1">
                Hook into agent lifecycle
              </h1>

              <p className="text-xl text-gray-700">
                React to events in your agent's execution flow. Add logging, monitoring, reflection, and custom behavior at every step.
              </p>
            </div>

            <CopyMarkdownButton
              content={pageContent}
              filename="event-system.md"
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* 12 Event Types — definition list */}
        <section className="mb-12">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
              <HiOutlineCodeBracket className="text-gray-400 w-4 h-4" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">12 Event Types</span>
            </div>
            <dl className="divide-y divide-gray-100">
              {[
                { name: 'after_user_input', desc: 'Fires once per turn, after user input is added' },
                { name: 'before_iteration', desc: 'Before each iteration starts — poll IO, check mode changes' },
                { name: 'before_llm', desc: 'Before each LLM call — inject context, modify messages' },
                { name: 'after_llm', desc: 'After each LLM response — track latency, log outputs' },
                { name: 'before_each_tool', desc: 'Before each individual tool execution' },
                { name: 'before_tools', desc: 'Once before all tools in a batch fire' },
                { name: 'after_each_tool', desc: 'After each individual tool — logging only, don\'t add messages' },
                { name: 'after_tools', desc: 'Once after all tools complete — safe place to add messages' },
                { name: 'on_error', desc: 'When tool execution fails or tool is not found' },
                { name: 'after_iteration', desc: 'After each iteration — checkpoints, can stop the loop' },
                { name: 'on_stop_signal', desc: 'When stop_signal is set — cleanup interrupted operations' },
                { name: 'on_complete', desc: 'Fires once after agent finishes the task' },
              ].map(({ name, desc }) => (
                <div key={name} className="flex items-baseline gap-4 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                  <code className="font-mono text-sm text-gray-900 min-w-[10rem] flex-shrink-0">{name}</code>
                  <span className="text-sm text-gray-500">{desc}</span>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Main Content */}
        <div className="prose prose-gray max-w-none">

          {/* Quick Start */}
          <section className="mb-16">
            <h2 className="heading-2">Quick Start</h2>

            <p className="text-gray-700 mb-6">
              Add event handlers to your agent in 3 simple steps:
            </p>

            <CodeWithResult
              code={`from connectonion import Agent, after_llm

def log_llm_calls(agent):
    """Track LLM performance"""
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'llm_call':
        duration = trace['duration_ms']
        print(f"⚡ LLM call: {duration:.0f}ms")

agent = Agent(
    "assistant",
    tools=[search],
    on_events=[after_llm(log_llm_calls)]
)

agent.input("Search for Python")`}
              result={`⚡ LLM call: 1204ms
⚡ LLM call: 831ms
"I found results for Python..."`}
              language="python"
            />

            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 my-6 rounded-r">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-400">Tip:</strong> Event handlers receive the <code className="text-gray-700 bg-gray-100 px-1 rounded">agent</code> instance, giving you full access to <code className="text-gray-700 bg-gray-100 px-1 rounded">current_session</code>, messages, trace, and more.
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-100">Group multiple handlers</h3>
            <p className="text-gray-700 mb-4">
              You can pass multiple handlers to the same event type:
            </p>

            <CodeWithResult
              code={`def check_shell(agent):
    ...

def check_email(agent):
    ...

agent = Agent(
    "assistant",
    on_events=[
        before_each_tool(check_shell, check_email),  # group handlers for same event
    ]
)`}
              result={`# Both handlers fire before each tool execution
# Cleaner than listing them separately`}
              language="python"
            />

            <div className="bg-gray-100 border border-gray-200 p-4 my-6 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-700">Note: Decorator Syntax</strong><br/>
                You can also use <code className="text-gray-700 bg-gray-100 px-1 rounded">@before_each_tool</code> decorator instead of <code className="text-gray-700 bg-gray-100 px-1 rounded">before_each_tool(fn)</code>.
                We recommend wrapper style because it's easier for LLMs to understand when reading your code.
                But if you prefer decorators, they work too.
              </p>
            </div>
          </section>

          {/* Basic Usage - All 9 Events */}
          <section className="mb-16">
            <h2 className="heading-2">All Event Types</h2>

            <p className="text-gray-700 mb-6">
              Here's when each event fires and what you can do with it:
            </p>

            <div className="space-y-8">
              {/* after_user_input */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlinePlay className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">after_user_input</h3>
                    <p className="text-sm text-gray-700">Fires once per turn, after user input is added</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def add_timestamp(agent):
    from datetime import datetime
    timestamp = datetime.now().strftime("%H:%M:%S")
    agent.current_session['messages'].append({
        'role': 'system',
        'content': f'Current time: {timestamp}'
    })

agent = Agent("assistant", on_events=[
    after_user_input(add_timestamp)
])`}
                  result={`# LLM now sees timestamp in context
# Useful for: time-aware agents, logging, session metadata`}
                  language="python"
                />
              </div>

              {/* before_iteration */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineClock className="text-indigo-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">before_iteration</h3>
                    <p className="text-sm text-gray-700">Fires before each iteration starts (poll IO, check mode changes)</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def check_mode_change(agent):
    """Poll for mode changes before iteration"""
    # Check if IO has mode change request
    if hasattr(agent.io, 'poll_mode_change'):
        new_mode = agent.io.poll_mode_change()
        if new_mode:
            agent.current_session['mode'] = new_mode
            print(f"🔄 Mode changed to: {new_mode}")

agent = Agent("assistant", on_events=[
    before_iteration(check_mode_change)
])`}
                  result={`# Fires before each iteration loop starts
# Useful for: polling IO, mode changes, iteration setup`}
                  language="python"
                />
              </div>

              {/* after_llm */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                    <HiOutlineChartBar className="text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">after_llm</h3>
                    <p className="text-sm text-gray-700">Fires after each LLM response (multiple times per turn)</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`from connectonion import llm_do

def add_reflection(agent):
    """Add AI-generated reflection after tools execute"""
    trace = agent.current_session['trace']

    # Find recent tool executions
    recent_tools = []
    llm_count = 0
    for entry in reversed(trace):
        if entry.get('type') == 'llm_call':
            llm_count += 1
            if llm_count >= 2:
                break
        elif entry.get('type') == 'tool_execution':
            recent_tools.append(entry)

    if recent_tools:
        result = recent_tools[0]['result'][:200]
        reflection = llm_do(
            f"Reflect on this result: {result}",
            model="gpt-4o-mini"
        )
        # Inject as assistant message (safe timing after tools)
        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"💭 {reflection}"
        })

agent = Agent("assistant", tools=[search], on_events=[
    after_llm(add_reflection)
])`}
                  result={`💭 The search results provide comprehensive information about AI...
# Useful for: reflection, chain-of-thought, meta-cognition`}
                  language="python"
                />
              </div>

              {/* before_each_tool */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                    <HiOutlineBolt className="text-yellow-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">before_each_tool</h3>
                    <p className="text-sm text-gray-700">Fires before EACH individual tool execution</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def validate_tool(agent):
    """Validate tool before execution"""
    pending = agent.current_session['pending_tool']
    tool_name = pending['name']
    print(f"🔧 About to run: {tool_name}")
    # Raise exception to cancel execution

agent = Agent("assistant", tools=[search], on_events=[
    before_each_tool(validate_tool)
])`}
                  result={`🔧 About to run: search
# Useful for: validation, approval prompts, logging`}
                  language="python"
                />
              </div>

              {/* before_tools */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineSquare3Stack3D className="text-orange-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">before_tools</h3>
                    <p className="text-sm text-gray-700">Fires ONCE before ALL tools in a batch</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def log_batch_start(agent):
    """Log start of tool execution batch"""
    print("🔄 Starting tool execution batch...")

agent = Agent("assistant", tools=[search, analyze], on_events=[
    before_tools(log_batch_start)
])`}
                  result={`🔄 Starting tool execution batch...
# Useful for: batch validation, batch-level logging`}
                  language="python"
                />
              </div>

              {/* after_each_tool */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineClock className="text-cyan-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">after_each_tool</h3>
                    <p className="text-sm text-gray-700">Fires after EACH tool (logging only, NOT for messages)</p>
                  </div>
                </div>
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded-r">
                  <p className="text-sm text-gray-700">
                    <strong className="text-red-400">WARNING:</strong> Do NOT add messages here! This breaks Anthropic Claude's API message ordering.
                  </p>
                </div>
                <CodeWithResult
                  code={`def log_tool_timing(agent):
    """Log each tool's execution time"""
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'tool_execution':
        timing = trace['timing']
        print(f"🔧 {trace['tool_name']}: {timing:.0f}ms")

agent = Agent("assistant", tools=[search, analyze], on_events=[
    after_each_tool(log_tool_timing)
])`}
                  result={`🔧 search: 245ms
🔧 analyze: 1842ms
# Useful for: timing, performance logging`}
                  language="python"
                />
              </div>

              {/* after_tools */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineChartBar className="text-teal-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">after_tools</h3>
                    <p className="text-sm text-gray-700">Fires ONCE after ALL tools complete (safe for messages)</p>
                  </div>
                </div>
                <div className="bg-gray-50 border-l-4 border-gray-300 p-4 mb-4 rounded-r">
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-400">SAFE:</strong> This is the correct place to add reflection messages after tools.
                  </p>
                </div>
                <CodeWithResult
                  code={`def add_reflection(agent):
    """Add reflection after all tools complete"""
    trace = agent.current_session['trace']
    recent_tools = [t for t in trace if t['type'] == 'tool_execution'][-3:]
    if recent_tools:
        agent.current_session['messages'].append({
            'role': 'assistant',
            'content': f"Completed {len(recent_tools)} tools"
        })

agent = Agent("assistant", tools=[search, analyze], on_events=[
    after_tools(add_reflection)
])`}
                  result={`Completed 2 tools
# Useful for: reflection, summarization, message injection`}
                  language="python"
                />
              </div>

              {/* on_error */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                    <HiOutlineSquare3Stack3D className="text-red-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">on_error</h3>
                    <p className="text-sm text-gray-700">Fires when tool execution fails or tool not found</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def handle_errors(agent):
    """Custom error handling"""
    trace = agent.current_session['trace'][-1]
    if trace.get('status') in ('error', 'not_found'):
        error = trace.get('error', 'Unknown error')
        print(f"❌ Error: {error}")

        # Log to monitoring service
        # Add recovery instructions to messages
        # Implement retry logic

agent = Agent("assistant", tools=[api_call], on_events=[
    on_error(handle_errors)
])`}
                  result={`❌ Error: API rate limit exceeded
# Useful for: error logging, retry logic, fallback behavior`}
                  language="python"
                />
              </div>

              {/* after_iteration */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineChartBar className="text-gray-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">after_iteration</h3>
                    <p className="text-sm text-gray-700">Fires after each iteration (checkpoints, can control loop continuation)</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def save_checkpoint(agent):
    """Save checkpoint after each iteration"""
    iteration = agent.current_session['iteration']
    trace = agent.current_session['trace']

    # Save state to file
    checkpoint = {
        'iteration': iteration,
        'messages': agent.current_session['messages'],
        'trace': trace
    }
    save_to_file(f'.co/checkpoint_{iteration}.json', checkpoint)
    print(f"💾 Checkpoint saved: iteration {iteration}")

agent = Agent("assistant", tools=[search], on_events=[
    after_iteration(save_checkpoint)
])`}
                  result={`💾 Checkpoint saved: iteration 1
💾 Checkpoint saved: iteration 2
# Useful for: checkpoints, stopping loop, tracking iterations`}
                  language="python"
                />
              </div>

              {/* on_stop_signal */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineShieldCheck className="text-amber-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">on_stop_signal</h3>
                    <p className="text-sm text-gray-700">Fires when stop_signal is set (cleanup interrupted operations)</p>
                  </div>
                </div>
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded-r">
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-400">Note:</strong> Mutually exclusive with on_complete - either this fires (interrupted) OR on_complete fires (normal completion), never both.
                  </p>
                </div>
                <CodeWithResult
                  code={`def cleanup_interrupted_work(agent):
    """Cleanup when user interrupts operation"""
    trace = agent.current_session['trace']

    # Rollback files written this turn
    files_modified = [
        t['args']['file_path']
        for t in trace
        if t.get('name') == 'write' and t.get('status') == 'success'
    ]

    for file_path in files_modified:
        restore_from_backup(file_path)
        print(f"⏪ Rolled back: {file_path}")

    print("✅ Cleanup complete - ready for new input")

agent = Agent("assistant", tools=[write, read], on_events=[
    on_stop_signal(cleanup_interrupted_work)
])`}
                  result={`⏪ Rolled back: config.json
✅ Cleanup complete - ready for new input
# Useful for: rollback, cleanup, save checkpoints, notify user`}
                  language="python"
                />
              </div>

              {/* on_complete */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                    <HiOutlineClock className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">on_complete</h3>
                    <p className="text-sm text-gray-700">Fires once after agent finishes task</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def log_completion(agent):
    """Log task completion with stats"""
    trace = agent.current_session['trace']

    llm_calls = sum(1 for t in trace if t['type'] == 'llm_call')
    tool_calls = sum(1 for t in trace if t['type'] == 'tool_execution')
    errors = sum(1 for t in trace if t.get('status') == 'error')

    print(f"✅ Task complete: {llm_calls} LLM calls, {tool_calls} tools, {errors} errors")

agent = Agent("assistant", tools=[search], on_events=[
    on_complete(log_completion)
])`}
                  result={`✅ Task complete: 2 LLM calls, 1 tools, 0 errors
# Useful for: metrics, cleanup, notifications, logging`}
                  language="python"
                />
              </div>
            </div>
          </section>

          {/* Advanced Pattern: Multiple Events */}
          <section className="mb-16">
            <h2 className="heading-2">Combining Multiple Events</h2>

            <p className="text-gray-700 mb-6">
              Use multiple event handlers together for comprehensive monitoring and control:
            </p>

            <CodeWithResult
              code={`from connectonion import Agent, after_user_input, before_iteration, after_llm, after_each_tool, on_error, after_iteration, on_stop_signal, on_complete
from datetime import datetime

def log_session_start(agent):
    print(f"📝 Session started at {datetime.now()}")

def check_iteration(agent):
    iteration = agent.current_session.get('iteration', 0)
    print(f"🔄 Starting iteration {iteration}")

def track_llm(agent):
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'llm_call':
        print(f"⚡ LLM: {trace['duration_ms']:.0f}ms")

def track_tools(agent):
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'tool_execution':
        print(f"🔧 Tool: {trace['tool_name']}")

def handle_errors(agent):
    trace = agent.current_session['trace'][-1]
    print(f"❌ Error: {trace.get('error')}")

def save_checkpoint(agent):
    iteration = agent.current_session.get('iteration', 0)
    print(f"💾 Checkpoint: iteration {iteration}")

def handle_interruption(agent):
    print(f"⚠️  Operation interrupted - cleaning up")

def log_completion(agent):
    print(f"✅ Task complete")

agent = Agent(
    "full_monitoring",
    tools=[search, analyze],
    on_events=[
        after_user_input(log_session_start),
        before_iteration(check_iteration),
        after_llm(track_llm),
        after_each_tool(track_tools),
        on_error(handle_errors),
        after_iteration(save_checkpoint),
        on_stop_signal(handle_interruption),
        on_complete(log_completion)
    ]
)

agent.input("Search and analyze Python")`}
              result={`📝 Session started at 2025-01-04 15:30:42
⚡ LLM: 1204ms
🔧 Tool: search
⚡ LLM: 831ms
🔧 Tool: analyze
⚡ LLM: 1142ms
✅ Task complete
"Analysis complete..."`}
              language="python"
            />
          </section>

          {/* Key Concepts */}
          <section className="mb-16">
            <h2 className="heading-2">Key Concepts</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-100">Event Handler Signature</h3>
                <p className="text-gray-700 mb-4">
                  All event handlers receive the agent instance:
                </p>
                <CodeWithResult
                  code={`def my_event_handler(agent: Agent) -> None:
    # Access agent state
    messages = agent.current_session['messages']
    trace = agent.current_session['trace']
    user_prompt = agent.current_session['user_prompt']
    iteration = agent.current_session['iteration']

    # Modify agent state
    messages.append({'role': 'system', 'content': 'Context'})

    # Access agent attributes
    tool_names = agent.list_tools()
    model = agent.llm.model`}
                  result={`# Event handlers are regular Python functions
# Full access to agent internals
# Can read AND modify agent state`}
                  language="python"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-100">Message Injection Timing</h3>
                <p className="text-gray-700 mb-4">
                  <strong className="text-gray-900">Important:</strong> Use <code className="text-gray-700 bg-gray-100 px-1 rounded">after_tools</code> to inject messages after tool execution:
                </p>
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-4 rounded-r">
                  <p className="text-sm text-gray-700">
                    <strong className="text-red-400">❌ Don't use after_each_tool:</strong> Injecting messages during tool execution breaks Anthropic Claude's message sequence (all tool_results must follow tool_use)
                  </p>
                </div>
                <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r">
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-400">✅ Use after_tools:</strong> Fires once after ALL tool results are added to messages, safe for reflection injection
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-100">Error Handling</h3>
                <p className="text-gray-700 mb-4">
                  Event handlers follow fail-fast principle:
                </p>
                <CodeWithResult
                  code={`def failing_event(agent):
    raise RuntimeError("Event failed")

agent = Agent("test", on_events=[
    after_llm(failing_event)
])

agent.input("test")  # Raises RuntimeError`}
                  result={`RuntimeError: Event failed
# Exceptions propagate - agents stop on event errors
# Design events to be robust or handle exceptions internally`}
                  language="python"
                />
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-16">
            <h2 className="heading-2">Real-World Use Cases</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-100">1. Performance Monitoring Dashboard</h3>
                <CodeWithResult
                  code={`class PerformanceMonitor:
    def __init__(self):
        self.metrics = {
            'llm_calls': 0,
            'tool_calls': 0,
            'total_llm_time': 0,
            'total_tool_time': 0,
            'errors': 0
        }

    def track_llm(self, agent):
        trace = agent.current_session['trace'][-1]
        if trace['type'] == 'llm_call':
            self.metrics['llm_calls'] += 1
            self.metrics['total_llm_time'] += trace['duration_ms']

    def track_tool(self, agent):
        trace = agent.current_session['trace'][-1]
        if trace['type'] == 'tool_execution':
            self.metrics['tool_calls'] += 1
            self.metrics['total_tool_time'] += trace['timing']

    def track_error(self, agent):
        self.metrics['errors'] += 1

    def report(self):
        print(f"LLM calls: {self.metrics['llm_calls']}")
        print(f"Avg LLM time: {self.metrics['total_llm_time'] / max(1, self.metrics['llm_calls']):.0f}ms")
        print(f"Tool calls: {self.metrics['tool_calls']}")
        print(f"Errors: {self.metrics['errors']}")

monitor = PerformanceMonitor()
agent = Agent("monitored", tools=[search], on_events=[
    after_llm(monitor.track_llm),
    after_each_tool(monitor.track_tool),
    on_error(monitor.track_error)
])

agent.input("Complex task...")
monitor.report()`}
                  result={`LLM calls: 3
Avg LLM time: 1245ms
Tool calls: 2
Errors: 0`}
                  language="python"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-100">2. Automatic Context Injection</h3>
                <CodeWithResult
                  code={`def inject_company_context(agent):
    """Add company-specific context to every query"""
    agent.current_session['messages'].append({
        'role': 'system',
        'content': '''You are a customer support agent for Acme Corp.
        - Be friendly and professional
        - Reference our 30-day return policy
        - Escalate billing issues to finance team'''
    })

agent = Agent(
    "support_agent",
    tools=[search_knowledge_base, create_ticket],
    on_events=[after_user_input(inject_company_context)]
)`}
                  result={`# Every user query now includes company context
# LLM follows company policies automatically
# No need to repeat instructions in every prompt`}
                  language="python"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-100">3. Smart Retry Logic</h3>
                <CodeWithResult
                  code={`class RetryHandler:
    def __init__(self, max_retries=3):
        self.max_retries = max_retries
        self.retry_count = {}

    def handle_error(self, agent):
        trace = agent.current_session['trace'][-1]
        tool_name = trace.get('tool_name')

        # Track retries
        if tool_name not in self.retry_count:
            self.retry_count[tool_name] = 0

        self.retry_count[tool_name] += 1

        if self.retry_count[tool_name] < self.max_retries:
            # Add retry instruction to messages
            agent.current_session['messages'].append({
                'role': 'system',
                'content': f'Previous {tool_name} failed. Try with different parameters.'
            })
            print(f"🔄 Retry {self.retry_count[tool_name]}/{self.max_retries}")
        else:
            print(f"❌ Max retries reached for {tool_name}")

retry_handler = RetryHandler()
agent = Agent("resilient", tools=[flaky_api], on_events=[
    on_error(retry_handler.handle_error)
])`}
                  result={`🔄 Retry 1/3
🔄 Retry 2/3
✓ Success on retry 2`}
                  language="python"
                />
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-16">
            <h2 className="heading-2">API Reference</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Event Wrapper Functions</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">after_user_input(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires once per turn after user input is added to session.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">before_iteration(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires before each iteration starts (poll IO, check mode changes).</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">before_llm(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires before each LLM call.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">after_llm(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires after each LLM response.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">before_each_tool(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires before EACH individual tool execution. Access pending tool via <code className="text-gray-700 bg-gray-100 px-1 rounded">agent.current_session['pending_tool']</code>.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">before_tools(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires ONCE before ALL tools in a batch execute.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">after_each_tool(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires after EACH individual tool. <strong className="text-red-400">WARNING:</strong> Do NOT add messages here!</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">after_tools(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires ONCE after ALL tools complete. <strong className="text-green-400">SAFE</strong> for adding messages.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">on_error(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires when tool execution fails or tool is not found.</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">after_iteration(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires after each iteration (checkpoints, can control loop continuation).</p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">on_stop_signal(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires when stop_signal is set (cleanup interrupted operations). <strong className="text-yellow-400">Mutually exclusive with on_complete.</strong></p>
                </div>
                <div>
                  <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">on_complete(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-700 mt-2">Fires once after agent completes the task.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Agent Constructor</h3>
              <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded text-sm">
                Agent(name, tools, on_events: Optional[List[EventHandler]] = None, ...)
              </code>
              <p className="text-gray-700 mt-4 text-sm">
                <strong>on_events</strong>: List of event handlers wrapped with event type functions
              </p>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-16">
            <h2 className="heading-2">Best Practices</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-400">✅ Keep handlers simple:</strong> Each event handler should do one thing well. Compose multiple handlers for complex behavior.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-400">✅ Use after_tools for message injection:</strong> This is the safe time to inject reflection/context after ALL tools in a batch complete.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r">
                <p className="text-sm text-gray-700">
                  <strong className="text-green-400">✅ Handle exceptions internally:</strong> If your event handler can fail, catch exceptions to prevent stopping the agent.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-400">❌ Don't inject during tool execution:</strong> Using after_each_tool to inject messages breaks Anthropic Claude's tool_result message ordering.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded-r">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-400">❌ Don't do heavy computation:</strong> Event handlers run synchronously and block agent execution. Keep them fast.
                </p>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-16">
            <h2 className="heading-2">Next Steps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/xray" className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">@xray Debugging →</h3>
                <p className="text-sm text-gray-600">See what your agent is thinking with the @xray decorator</p>
              </Link>

              <Link href="/auto-debug" className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Auto-Debug →</h3>
                <p className="text-sm text-gray-600">Interactive debugging with breakpoints and step-through</p>
              </Link>

              <Link href="/agent" className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Agent Reference →</h3>
                <p className="text-sm text-gray-600">Complete API documentation for the Agent class</p>
              </Link>

              <Link href="/examples" className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Examples →</h3>
                <p className="text-sm text-gray-600">Browse more real-world agent examples</p>
              </Link>
            </div>
          </section>

        </div>

        {/* Content Navigation - Always visible */}
        <ContentNavigation />
      </div>
    </div>
  )
}
