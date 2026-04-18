/*
  @date: 2025-10-05
  @description: Agent Documentation Page

  This page documents the Agent class - the core orchestrator of ConnectOnion.
  Structure: Simple example → Full API overview → Detailed sections

  Design follows CLAUDE.md principles:
  - Start with success (60 second example)
  - Full API overview after quick start
  - Progressive disclosure (simple → advanced)
  - Code-first, explanation second
  - Real examples with real output
*/

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineUsers, HiOutlineRocketLaunch, HiOutlineArrowRight, HiOutlineBolt, HiOutlineCodeBracket, HiOutlineCog6Tooth, HiOutlineArrowPath, HiOutlinePlay, HiOutlineChatBubbleBottomCenterText, HiOutlineDocumentText, HiOutlineCpuChip, HiOutlineSparkles, HiOutlineChartBarSquare, HiOutlinePuzzlePiece, HiOutlineGlobeAlt } from 'react-icons/hi2'
import CodeWithResult from '../../components/CodeWithResult'
import { CommandBlock } from '../../components/CommandBlock'
import { PageHeader } from '../../components/PageHeader'

export default function AgentDocsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Agent' }
          ]}
          icon={HiOutlineUsers}
          title="Agent"
          description="The heart of ConnectOnion. Give it tools, and it figures out the rest."
          markdownPath="/agent/agent.md"
          markdownFilename="agent.md"
        />

        {/* On This Page — visible on tablet/mobile only; desktop gets the sticky right-rail OnThisPage */}
        <nav className="lg:hidden mb-12 border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">On this page</span>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { href: '#quick-start', label: 'Quick Start' },
              { href: '#api-overview', label: 'Full API Overview' },
              { href: '#max-iterations', label: 'max_iterations' },
              { href: '#complete-docs', label: 'Complete Documentation' },
              { href: '#agents', label: 'Related — Agents' },
              { href: '#examples', label: 'Real-World Examples' },
              { href: '#philosophy', label: 'Philosophy' },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors group">
                <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-gray-600 transition-colors flex-shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </nav>

        {/* Quick Start Section */}
        <section className="mb-16" id="quick-start">
          <h2 className="heading-2">Quick Start (60 Seconds)</h2>

          <CodeWithResult
            code={`from connectonion import Agent

# Define what your agent can do
def calculate(expression: str) -> str:
    """Do math calculations."""
    return str(eval(expression))

# Create agent
agent = Agent("math_bot", tools=[calculate])

# Use it
result = agent.input("What is 42 * 17?")`}
            result={`To calculate 42 * 17, I'll use the calculator tool.
The result is 714.`}
            language="python"
          />

          <div className="mt-4 callout-sm">
            <p className="text-sm font-semibold text-gray-900">
              That's it. Your first AI agent in 5 lines.
            </p>
          </div>
        </section>

        {/* Full API Overview */}
        <section className="mb-16" id="api-overview">
          <h2 className="heading-2">What Agent Can Do — Full API Overview</h2>

          <p className="text-gray-700 mb-6">
            After that simple example, here's <span className="font-semibold text-gray-900">everything</span> an Agent can do:
          </p>

          {/* Creating an Agent */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Creating an Agent</h3>
            <CodeWithResult
              code={`Agent(
    name="my_bot",                        # Required: agent identifier
    tools=[func1, func2],                 # Optional: functions agent can call
    system_prompt="You are helpful",      # Optional: personality/behavior
    model="co/gemini-2.5-pro",            # Optional: LLM model (default: co/gemini-2.5-pro)
    max_iterations=10,                    # Optional: max tool calls per turn (default: 10)
    api_key="sk-...",                     # Optional: override env var
    llm=custom_llm,                       # Optional: custom LLM instance
    trust="tested",                       # Optional: security verification
    on_events=[after_llm(handler)],       # Optional: event hooks for this agent
    plugins=[re_act, logger],             # Optional: reusable event handler bundles
    quiet=False,                          # Optional: suppress console output
    log=True                              # Optional: logging config (bool or file path)
)`}
              result=""
              language="python"
            />
          </div>

          {/* Using Your Agent */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Using Your Agent</h3>
            <CodeWithResult
              code={`# Give it a task
result = agent.input("Do something")

# Execute a tool directly (for testing)
result = agent.execute_tool("tool_name", {"arg": "value"})`}
              result=""
              language="python"
            />
          </div>

          {/* Managing Tools */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Managing Tools</h3>
            <CodeWithResult
              code={`agent.add_tool(new_function)    # Add tools after creation
agent.remove_tool("name")       # Remove tools
agent.list_tools()              # See available tools`}
              result=""
              language="python"
            />
          </div>

          {/* Conversations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversations & State</h3>
            <CodeWithResult
              code={`agent.input("What is 10 + 5?")     # Turn 1: "15"
agent.input("Multiply that by 2")  # Turn 2: "30" (remembers!)

agent.reset_conversation()         # Start fresh
session = agent.current_session    # Access internal state`}
              result=""
              language="python"
            />
          </div>

          {/* Attributes */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Attributes You Can Access</h3>
            <CodeWithResult
              code={`agent.name                # str: Agent identifier
agent.tools               # ToolRegistry: All tools
agent.tools.names()       # list[str]: Tool names
agent.tools.get("name")   # Tool: Get by name
agent.system_prompt       # str: Personality
agent.current_session     # dict | None: Runtime state

# Token & cost tracking (after agent.input())
agent.context_percent     # float: Context window used (0-100)
agent.total_cost          # float: Total USD cost this session
agent.last_usage          # dict: Last call token usage`}
              result=""
              language="python"
            />
          </div>

          <div className="mt-6 callout-sm">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              That's the complete API.
            </p>
            <p className="text-gray-600 text-sm">
              Now let's dive into each feature below. Jump to any section that interests you!
            </p>
          </div>
        </section>

        {/* max_iterations Section */}
        <section className="mb-16" id="max-iterations">
          <h2 className="heading-2">max_iterations</h2>

          <div className="flex items-start gap-3 mb-8 callout-sm">
            <HiOutlineBolt className="icon-ui w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <strong className="text-gray-900">Quick Facts:</strong>{' '}
              Default is 10 iterations (works for most tasks!). Fully customizable per-agent or per-task.
            </div>
          </div>

          <div className="space-y-8">
            {/* What Are Iterations */}
            <div>
              <h3 className="heading-3">What Are Iterations?</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  Think of iterations as "attempts" - how many times your agent can use tools to complete a task.
                </p>
                <CodeWithResult
                  code={`# Your agent tries to complete the task
# Iteration 1: "I need to search for info" -> calls search tool
# Iteration 2: "Now I'll calculate something" -> calls calculate tool
# Iteration 3: "Let me save the result" -> calls save tool
# Done! Task completed in 3 iterations`}
                  result=""
                />
              </div>
            </div>

            {/* The Basics */}
            <div>
              <h3 className="heading-3">The Basics (90% of cases)</h3>
              <CodeWithResult
                code={`from connectonion import Agent

# Default: 10 iterations (works for most tasks!)
agent = Agent("my_bot", tools=[search, calculate])

# That's it! Just use it:
result = agent.input("What's 2+2?")  # Uses 1 iteration
result = agent.input("Search for Python tutorials")  # Uses 1-2 iterations`}
                result=""
              />
            </div>

            {/* When You Need More Power */}
            <div>
              <h3 className="heading-3">When You Need More Power</h3>
              <CodeWithResult
                code={`# Complex tasks need more iterations
research_agent = Agent(
    "researcher",
    tools=[search, analyze, summarize],
    max_iterations=25  # I need more attempts for complex research
)`}
                result=""
              />
            </div>

            {/* Quick Override */}
            <div>
              <h3 className="heading-3">Quick Override for One Task</h3>
              <CodeWithResult
                code={`# Override max_iterations for a specific task
agent = Agent("assistant", tools=[search])  # Default: 10

# Most tasks use default
result = agent.input("Simple question")

# But this one needs more
result = agent.input(
    "Complex multi-step task",
    max_iterations=30  # Override just for this task
)`}
                result=""
              />
            </div>

            {/* When to Adjust */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">When to Adjust max_iterations</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <strong className="text-gray-900">Increase it when:</strong>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-sm">
                    <li>Your agent runs complex, multi-step workflows</li>
                    <li>Tasks require multiple tool calls (research, analysis, etc.)</li>
                    <li>You see "reached max iterations" in logs</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-red-600">Decrease it when:</strong>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-sm">
                    <li>Agent loops unnecessarily (calls same tool repeatedly)</li>
                    <li>You want faster failures for debugging</li>
                    <li>Simple tasks that should complete quickly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Best Practices</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Start with default (10)</strong> - it works for most use cases</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Monitor your logs</strong> - check how many iterations tasks actually use</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Set per-agent</strong> for specialized agents (researcher=25, calculator=5)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Override per-task</strong> when you know a specific task needs more/less</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Full Documentation Note */}
        <section className="mb-16" id="complete-docs">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="heading-2">
              <HiOutlineCodeBracket className="w-6 h-6 icon-ui" />
              Complete Documentation
            </h2>
            <p className="text-gray-700 mb-4">
              This page provides a quick overview of the Agent class. For comprehensive documentation including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                Creating Agents
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                Managing Tools
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                Multi-Turn Conversations
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                Iteration Control
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                Common Patterns
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                Testing Strategies
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Use the "Copy" button above to get the full markdown documentation with all details, examples, and patterns.
            </p>
          </div>
        </section>

        {/* Core Concepts Section */}
        <section className="mb-16" id="agents">
          <h2 className="heading-2">Agents</h2>
          <p className="text-gray-600 mb-6">Everything the Agent class can do, in depth.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/prompts" className="card-interactive flex items-start gap-4 p-4 rounded-lg border border-gray-200 group">
              <HiOutlineChatBubbleBottomCenterText className="w-5 h-5 icon-ui flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">System Prompts</h3>
                <p className="text-xs text-gray-500">Give your agent a personality and behavior</p>
              </div>
            </Link>
            <Link href="/tools" className="card-interactive flex items-start gap-4 p-4 rounded-lg border border-gray-200 group">
              <HiOutlineCodeBracket className="w-5 h-5 icon-ui flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">Tools</h3>
                <p className="text-xs text-gray-500">Create functions your agent can call</p>
              </div>
            </Link>
            <Link href="/models" className="card-interactive flex items-start gap-4 p-4 rounded-lg border border-gray-200 group">
              <HiOutlineCpuChip className="w-5 h-5 icon-ui flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">Models</h3>
                <p className="text-xs text-gray-500">GPT-4o, Gemini, Claude, and managed co/ models</p>
              </div>
            </Link>
            <Link href="/llm_do" className="card-interactive flex items-start gap-4 p-4 rounded-lg border border-gray-200 group">
              <HiOutlineSparkles className="w-5 h-5 icon-ui flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">LLM Function</h3>
                <p className="text-xs text-gray-500">Call LLMs directly without an agent loop</p>
              </div>
            </Link>
            <Link href="/on_events" className="card-interactive flex items-start gap-4 p-4 rounded-lg border border-gray-200 group">
              <HiOutlineChartBarSquare className="w-5 h-5 icon-ui flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">Event System</h3>
                <p className="text-xs text-gray-500">Hooks into agent lifecycle: before/after LLM, tools, errors</p>
              </div>
            </Link>
            <Link href="/plugin" className="card-interactive flex items-start gap-4 p-4 rounded-lg border border-gray-200 group">
              <HiOutlinePuzzlePiece className="w-5 h-5 icon-ui flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors">Plugin System</h3>
                <p className="text-xs text-gray-500">Reusable event handler bundles for your agents</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-16" id="examples">
          <h2 className="heading-2">Real-World Examples</h2>
          <p className="text-gray-600 mb-6">Open-source agents built with ConnectOnion.</p>
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
            <a
              href="https://github.com/openonion/browser-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <HiOutlineGlobeAlt className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">browser-agent</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Stateful web automation — navigate, screenshot, scrape with Playwright</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0 ml-4">github.com/openonion ↗</span>
            </a>
            <a
              href="https://github.com/openonion/oo-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <HiOutlineChatBubbleBottomCenterText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">oo-chat</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Open-source chat UI for AI agents — self-hostable, React-based</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0 ml-4">github.com/openonion ↗</span>
            </a>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16" id="philosophy">
          <div className="p-8 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="heading-2">Philosophy</h2>
            <p className="text-xl font-semibold text-gray-900 mb-6 accent-italic">
              "Keep simple things simple, make complicated things possible"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Simple Case</h3>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <pre className="text-sm"><code className="text-gray-100">{`agent = Agent("bot", tools=[search])
agent.input("Find Python docs")`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complex Case</h3>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <pre className="text-sm"><code className="text-gray-100">{`trust_agent = Agent("verifier", ...)

agent = Agent(
    name="production",
    llm=custom_llm,
    tools=[deploy, rollback],
    system_prompt=Path("ops.md"),
    max_iterations=30,
    trust=trust_agent,
    log="/var/log/production.log"
)`}</code></pre>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mt-6 text-center">
              <span className="font-semibold text-gray-900">Both are valid.</span> Start simple, add complexity only when needed.
            </p>
          </div>
        </section>

        {/* Bottom Note */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            ConnectOnion: AI Agent = Prompt + Function
          </p>
          <p className="text-gray-700">
            That's it. That's the framework. Now go build something useful.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12">
          <ContentNavigation />
        </div>
      </div>
    </div>
  )
}
