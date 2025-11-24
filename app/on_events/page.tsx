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
import {
  Zap, ArrowRight, Activity, Clock, Code,
  GitBranch, Timer, Layers, Play, ArrowLeft, Sparkles
} from 'lucide-react'
import CodeWithResult from '../../components/CodeWithResult'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

export default function OnEventsPage() {

  const pageContent = `# Event System (on_events)

Hook into agent lifecycle to add logging, monitoring, reflection, and custom behavior at every step.

## 6 Event Types

- **after_user_input**: Fires once per turn
- **before_llm**: Before each LLM call
- **after_llm**: After each LLM response
- **before_tool**: Before tool execution
- **after_tool**: After successful tool execution
- **on_error**: When tool execution fails

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

### after_tool

Fires after each successful tool execution.

\`\`\`python
def monitor_performance(agent):
    """Log slow tool executions"""
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'tool_execution':
        timing = trace['timing']
        if timing > 1000:
            tool_name = trace['tool_name']
            print(f"⚠️ Slow: {tool_name} took {timing/1000:.1f}s")

agent = Agent("assistant", tools=[search, analyze], on_events=[
    after_tool(monitor_performance)
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
from connectonion import Agent, after_user_input, after_llm, after_tool, on_error
from datetime import datetime

def log_session_start(agent):
    print(f"📝 Session started at {datetime.now()}")

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

agent = Agent(
    "full_monitoring",
    tools=[search, analyze],
    on_events=[
        after_user_input(log_session_start),
        after_llm(track_llm),
        after_tool(track_tools),
        on_error(handle_errors)
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
    after_tool(monitor.track_tool),
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
    <div className="px-4 md:px-8 py-8 md:py-12 lg:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header with Breadcrumb and Copy Button */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Events (on_events)</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-green-900/30 to-green-800/10 border border-green-500/30 rounded-full">
                <Sparkles className="w-4 h-4 text-green-400" />
                <span className="text-xs font-medium text-green-200">NEW</span>
              </div>

              <h1 className="heading-1">
                Hook into agent lifecycle
              </h1>

              <p className="text-xl text-gray-300">
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

        {/* 6 Event Types Visual */}
        <section className="mb-12">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <GitBranch className="text-blue-400 w-5 h-5" />
              6 Event Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-900/50 border border-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Play className="text-blue-400 w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">after_user_input</div>
                  <div className="text-gray-300 text-xs">Fires once per turn</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-900/50 border border-purple-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Code className="text-purple-400 w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">before_llm</div>
                  <div className="text-gray-300 text-xs">Before each LLM call</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-900/50 border border-green-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity className="text-green-400 w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">after_llm</div>
                  <div className="text-gray-300 text-xs">After each LLM response</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-900/50 border border-yellow-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="text-yellow-400 w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">before_tool</div>
                  <div className="text-gray-300 text-xs">Before tool execution</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-cyan-900/50 border border-cyan-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Timer className="text-cyan-400 w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">after_tool</div>
                  <div className="text-gray-300 text-xs">After successful tool execution</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-900/50 border border-red-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <Layers className="text-red-400 w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-gray-200">on_error</div>
                  <div className="text-gray-300 text-xs">When tool execution fails</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="prose prose-invert max-w-none">

          {/* Quick Start */}
          <section className="mb-16">
            <h2 className="heading-2">Quick Start</h2>

            <p className="text-gray-300 mb-6">
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

            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6 rounded-r">
              <p className="text-sm text-gray-300">
                <strong className="text-blue-400">Tip:</strong> Event handlers receive the <code className="text-blue-300 bg-blue-950/50 px-1 rounded">agent</code> instance, giving you full access to <code className="text-blue-300 bg-blue-950/50 px-1 rounded">current_session</code>, messages, trace, and more.
              </p>
            </div>
          </section>

          {/* Basic Usage - All 6 Events */}
          <section className="mb-16">
            <h2 className="heading-2">All Event Types</h2>

            <p className="text-gray-300 mb-6">
              Here's when each event fires and what you can do with it:
            </p>

            <div className="space-y-8">
              {/* after_user_input */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-900/50 border border-blue-500 rounded flex items-center justify-center">
                    <Play className="text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">after_user_input</h3>
                    <p className="text-sm text-gray-300">Fires once per turn, after user input is added</p>
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

              {/* after_llm */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-900/50 border border-green-500 rounded flex items-center justify-center">
                    <Activity className="text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">after_llm</h3>
                    <p className="text-sm text-gray-300">Fires after each LLM response (multiple times per turn)</p>
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

              {/* after_tool */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-900/50 border border-cyan-500 rounded flex items-center justify-center">
                    <Timer className="text-cyan-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">after_tool</h3>
                    <p className="text-sm text-gray-300">Fires after each successful tool execution</p>
                  </div>
                </div>
                <CodeWithResult
                  code={`def monitor_performance(agent):
    """Log slow tool executions"""
    trace = agent.current_session['trace'][-1]
    if trace['type'] == 'tool_execution':
        timing = trace['timing']
        if timing > 1000:  # Over 1 second
            tool_name = trace['tool_name']
            print(f"⚠️ Slow: {tool_name} took {timing/1000:.1f}s")

agent = Agent("assistant", tools=[search, analyze], on_events=[
    after_tool(monitor_performance)
])`}
                  result={`⚠️ Slow: analyze took 2.3s
# Useful for: performance monitoring, caching, optimization`}
                  language="python"
                />
              </div>

              {/* on_error */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-900/50 border border-red-500 rounded flex items-center justify-center">
                    <Layers className="text-red-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">on_error</h3>
                    <p className="text-sm text-gray-300">Fires when tool execution fails or tool not found</p>
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
            </div>
          </section>

          {/* Advanced Pattern: Multiple Events */}
          <section className="mb-16">
            <h2 className="heading-2">Combining Multiple Events</h2>

            <p className="text-gray-300 mb-6">
              Use multiple event handlers together for comprehensive monitoring and control:
            </p>

            <CodeWithResult
              code={`from connectonion import Agent, after_user_input, after_llm, after_tool, on_error
from datetime import datetime

def log_session_start(agent):
    print(f"📝 Session started at {datetime.now()}")

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

agent = Agent(
    "full_monitoring",
    tools=[search, analyze],
    on_events=[
        after_user_input(log_session_start),
        after_llm(track_llm),
        after_tool(track_tools),
        on_error(handle_errors)
    ]
)

agent.input("Search and analyze Python")`}
              result={`📝 Session started at 2025-01-04 15:30:42
⚡ LLM: 1204ms
🔧 Tool: search
⚡ LLM: 831ms
🔧 Tool: analyze
⚡ LLM: 1142ms
"Analysis complete..."`}
              language="python"
            />
          </section>

          {/* Key Concepts */}
          <section className="mb-16">
            <h2 className="heading-2">Key Concepts</h2>

            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-100">Event Handler Signature</h3>
                <p className="text-gray-300 mb-3">
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

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-100">Message Injection Timing</h3>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Important:</strong> Use <code className="text-blue-300 bg-blue-950/50 px-1 rounded">after_llm</code> to inject messages after tool execution:
                </p>
                <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                  <p className="text-sm text-gray-300">
                    <strong className="text-red-400">❌ Don't use after_tool:</strong> Injecting messages during tool execution breaks the OpenAI message sequence (assistant → tool results)
                  </p>
                </div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
                  <p className="text-sm text-gray-300">
                    <strong className="text-green-400">✅ Use after_llm:</strong> Fires after all tool results are added to messages, safe for injection
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-100">Error Handling</h3>
                <p className="text-gray-300 mb-3">
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
    after_tool(monitor.track_tool),
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

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Event Wrapper Functions</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded">after_user_input(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-300 mt-2">Wraps a function to fire after user input is added to session.</p>
                </div>
                <div>
                  <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded">before_llm(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-300 mt-2">Wraps a function to fire before each LLM call.</p>
                </div>
                <div>
                  <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded">after_llm(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-300 mt-2">Wraps a function to fire after each LLM response.</p>
                </div>
                <div>
                  <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded">before_tool(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-300 mt-2">Wraps a function to fire before each tool execution.</p>
                </div>
                <div>
                  <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded">after_tool(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-300 mt-2">Wraps a function to fire after each successful tool execution.</p>
                </div>
                <div>
                  <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded">on_error(func: Callable[[Agent], None]) → EventHandler</code>
                  <p className="text-gray-300 mt-2">Wraps a function to fire when tool execution fails or tool is not found.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-100">Agent Constructor</h3>
              <code className="text-blue-300 bg-blue-950/50 px-2 py-1 rounded text-sm">
                Agent(name, tools, on_events: Optional[List[EventHandler]] = None, ...)
              </code>
              <p className="text-gray-300 mt-4 text-sm">
                <strong>on_events</strong>: List of event handlers wrapped with event type functions
              </p>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-16">
            <h2 className="heading-2">Best Practices</h2>

            <div className="space-y-4">
              <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">✅ Keep handlers simple:</strong> Each event handler should do one thing well. Compose multiple handlers for complex behavior.
                </p>
              </div>

              <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">✅ Use after_llm for message injection:</strong> This is the safe time to inject context after tool execution completes.
                </p>
              </div>

              <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">✅ Handle exceptions internally:</strong> If your event handler can fail, catch exceptions to prevent stopping the agent.
                </p>
              </div>

              <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r">
                <p className="text-sm text-gray-300">
                  <strong className="text-red-400">❌ Don't inject during tool execution:</strong> Using after_tool to inject messages breaks the tool calling message sequence.
                </p>
              </div>

              <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r">
                <p className="text-sm text-gray-300">
                  <strong className="text-red-400">❌ Don't do heavy computation:</strong> Event handlers run synchronously and block agent execution. Keep them fast.
                </p>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-16">
            <h2 className="heading-2">Next Steps</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/xray" className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors">
                <h3 className="text-lg font-semibold mb-2 text-gray-100">@xray Debugging →</h3>
                <p className="text-sm text-gray-300">See what your agent is thinking with the @xray decorator</p>
              </Link>

              <Link href="/auto-debug" className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors">
                <h3 className="text-lg font-semibold mb-2 text-gray-100">Auto-Debug →</h3>
                <p className="text-sm text-gray-300">Interactive debugging with breakpoints and step-through</p>
              </Link>

              <Link href="/agent" className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-colors">
                <h3 className="text-lg font-semibold mb-2 text-gray-100">Agent Reference →</h3>
                <p className="text-sm text-gray-300">Complete API documentation for the Agent class</p>
              </Link>

              <Link href="/examples" className="block p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-yellow-500 transition-colors">
                <h3 className="text-lg font-semibold mb-2 text-gray-100">Examples →</h3>
                <p className="text-sm text-gray-300">Browse more real-world agent examples</p>
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
