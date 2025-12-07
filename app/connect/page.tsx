/**
 * @purpose Connect to remote agents page
 * @context Shows how to use remote agents with connect()
 * @llm-note Progressive tutorial: 60s start → explanation → patterns → examples
 */

'use client'

import { Network, Zap, Cpu, RefreshCw, Layers, Check, Terminal, Code, Users, Globe } from 'lucide-react'
import Link from 'next/link'
import CodeWithResult from '../../components/CodeWithResult'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function ConnectPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'Connect to Agents' }
            ]}
            icon={Network}
            iconColor="text-blue-400"
            iconBgFrom="from-blue-600/20"
            iconBgTo="to-cyan-600/20"
            iconBorderColor="border-blue-500/30"
            title="Connect to Agents"
            description="Use any agent, anywhere, as if local. Create a proxy to a remote agent with the same interface."
            markdownPath="/connect.md"
            markdownFilename="connect.md"
          />

          {/* Key Benefit */}
          <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
            <p className="text-lg font-semibold text-blue-100">
              <strong>Why connect?</strong> Access specialized agents from anywhere, build distributed workflows, scale horizontally across multiple machines.
            </p>
          </div>
        </section>

        {/* 60-Second Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            60-Second Quick Start
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Connect to a remote agent with one function call:
          </p>

          <CodeWithResult
            code={`from connectonion import connect

# Connect to a remote agent
remote_agent = connect("0x3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c")

# Use it like a local agent
result = remote_agent.input("Search for Python documentation")
print(result)`}
            result={`I found extensive Python documentation at docs.python.org covering tutorials,
library reference, and language specifications.`}
            language="python"
            fileName="use_remote.py"
          />

          <div className="mt-6 bg-green-950/50 border border-green-400/40 rounded-lg p-6">
            <p className="text-lg font-semibold text-green-100 mb-4">What Just Happened?</p>
            <div className="space-y-2 text-slate-100">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Created proxy agent</strong> → Acts like a local Agent instance</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Connected to relay</strong> → WebSocket at <code className="bg-gray-800 px-2 py-1 rounded">wss://oo.openonion.ai/ws/announce</code></span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Sent INPUT message</strong> → Routed to the remote agent</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Received OUTPUT</strong> → Got the result back</span>
              </div>
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-20">
          <h2 className="heading-2">Complete Example: Two Terminals</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Terminal 1: Start a Serving Agent
              </h3>
              <CodeWithResult
                code={`# serve_agent.py
from connectonion import Agent

def calculate(expression: str) -> str:
    """Perform calculations."""
    return str(eval(expression))

def get_weather(city: str) -> str:
    """Get weather information."""
    return f"Weather in {city}: Sunny, 72°F"

agent = Agent(
    "assistant",
    tools=[calculate, get_weather],
    system_prompt="You are a helpful assistant."
)

print("Starting agent...")
agent.serve()`}
                result={`Starting agent...
Agent 'assistant' serving at: 0x7a8f9d4c2b1e3f5a6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
Connected to relay: wss://oo.openonion.ai/ws/announce
Waiting for connections...`}
                language="python"
                fileName="serve_agent.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Terminal 2: Connect and Use
              </h3>
              <CodeWithResult
                code={`# use_agent.py
from connectonion import connect

# Connect using the agent's address
assistant = connect("0x7a8f9d4c2b1e3f5a6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b")

# Use it
result1 = assistant.input("What is 42 * 17?")
print(result1)

result2 = assistant.input("What's the weather in Seattle?")
print(result2)`}
                result={`The result of 42 * 17 is 714.

Weather in Seattle: Sunny, 72°F`}
                language="python"
                fileName="use_agent.py"
              />
            </div>
          </div>
        </section>

        {/* Common Patterns */}
        <section className="mb-20">
          <h2 className="heading-2">
            <Layers className="w-8 h-8 text-purple-400" />
            Common Patterns
          </h2>

          <div className="space-y-8">
            <div className="bg-purple-950/50 border border-purple-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-100 mb-4">1. Connect to Multiple Agents</h3>
              <p className="text-slate-100 mb-4">
                Build workflows with specialized remote agents:
              </p>
              <CodeWithResult
                code={`from connectonion import connect

# Connect to specialized agents
searcher = connect("0xaaa...")
writer = connect("0xbbb...")
reviewer = connect("0xccc...")

# Use them together
research = searcher.input("Research AI trends")
draft = writer.input(f"Write article about: {research}")
final = reviewer.input(f"Review and improve: {draft}")

print(final)`}
                language="python"
              />
            </div>

            <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-100 mb-4">2. Retry on Connection Failure</h3>
              <p className="text-slate-100 mb-4">
                Handle network failures gracefully:
              </p>
              <CodeWithResult
                code={`import time
from connectonion import connect

def connect_with_retry(address, max_retries=3):
    for attempt in range(max_retries):
        try:
            return connect(address)
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Retrying... ({attempt + 1}/{max_retries})")
                time.sleep(2)
            else:
                raise

agent = connect_with_retry("0x7a8f...")`}
                language="python"
              />
            </div>

            <div className="bg-green-950/50 border border-green-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-100 mb-4">3. Agent Pool (Load Balancing)</h3>
              <p className="text-slate-100 mb-4">
                Distribute load across multiple identical agents:
              </p>
              <CodeWithResult
                code={`from connectonion import connect

# Pool of identical agents
agent_addresses = [
    "0xaaa...",
    "0xbbb...",
    "0xccc..."
]

agents = [connect(addr) for addr in agent_addresses]

# Simple round-robin
def get_agent():
    agent = agents.pop(0)
    agents.append(agent)
    return agent

# Use different agent each time
result1 = get_agent().input("Task 1")
result2 = get_agent().input("Task 2")
result3 = get_agent().input("Task 3")`}
                language="python"
              />
            </div>
          </div>
        </section>

        {/* Multi-Turn Conversations */}
        <section className="mb-20">
          <h2 className="heading-2">
            <Users className="w-8 h-8 text-cyan-400" />
            Multi-Turn Conversations
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Remote agents maintain conversation state across multiple <code className="bg-gray-800 px-2 py-1 rounded">input()</code> calls:
          </p>

          <CodeWithResult
            code={`remote = connect("0x7a8f...")

# Turn 1
response1 = remote.input("Calculate 100 + 50")
print(response1)

# Turn 2 - remembers context
response2 = remote.input("Multiply that by 2")
print(response2)`}
            result={`The result is 150

The result is 300`}
            language="python"
          />
        </section>

        {/* Real-World Example */}
        <section className="mb-20">
          <h2 className="heading-2">
            <Cpu className="w-8 h-8 text-orange-400" />
            Real-World: Distributed Workflow
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Local orchestrator using remote specialized agents:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, connect

# Local orchestrator agent
def run_workflow(task: str) -> str:
    """Run distributed workflow."""

    # Connect to remote specialized agents
    researcher = connect("0xaaa...")
    analyst = connect("0xbbb...")
    writer = connect("0xccc...")

    # Step 1: Research
    research = researcher.input(f"Research: {task}")

    # Step 2: Analyze
    analysis = analyst.input(f"Analyze this data: {research}")

    # Step 3: Write report
    report = writer.input(f"Write report based on: {analysis}")

    return report

# Local agent with access to remote agents via tool
orchestrator = Agent("orchestrator", tools=[run_workflow])

# User just talks to local agent
result = orchestrator.input("Create a report on AI market trends")
print(result)`}
            language="python"
          />
        </section>

        {/* Configuration */}
        <section className="mb-20">
          <h2 className="heading-2">
            <RefreshCw className="w-8 h-8 text-indigo-400" />
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Default Relay (Production)</h3>
              <CodeWithResult
                code={`# Uses wss://oo.openonion.ai/ws/announce by default
agent = connect("0x7a8f...")`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Local Relay (Development)</h3>
              <CodeWithResult
                code={`# Connect to local relay server
agent = connect("0x7a8f...", relay_url="ws://localhost:8000/ws/announce")`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Environment-Based</h3>
              <CodeWithResult
                code={`import os

relay_url = os.getenv(
    "RELAY_URL",
    "wss://oo.openonion.ai/ws/announce"
)

agent = connect("0x7a8f...", relay_url=relay_url)`}
                language="python"
              />
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-20">
          <h2 className="heading-2">Local vs Remote Agents</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-emerald-100 mb-4">Local Agent</h3>
              <CodeWithResult
                code={`from connectonion import Agent

agent = Agent("local",
    tools=[search, calculate])

result = agent.input("task")`}
                language="python"
              />
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-green-400 flex items-start gap-2">
                  <span>+</span> No network latency
                </p>
                <p className="text-green-400 flex items-start gap-2">
                  <span>+</span> Works offline
                </p>
                <p className="text-red-400 flex items-start gap-2">
                  <span>−</span> Limited to one machine
                </p>
                <p className="text-red-400 flex items-start gap-2">
                  <span>−</span> No sharing
                </p>
              </div>
            </div>

            <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-100 mb-4">Remote Agent</h3>
              <CodeWithResult
                code={`from connectonion import connect

agent = connect("0x7a8f...")

result = agent.input("task")`}
                language="python"
              />
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-green-400 flex items-start gap-2">
                  <span>+</span> Access from anywhere
                </p>
                <p className="text-green-400 flex items-start gap-2">
                  <span>+</span> Share across team
                </p>
                <p className="text-red-400 flex items-start gap-2">
                  <span>−</span> Network latency
                </p>
                <p className="text-red-400 flex items-start gap-2">
                  <span>−</span> Requires connectivity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-blue-950/30 rounded-2xl p-10 border border-blue-400/30 text-center">
            <h2 className="heading-2">Ready to Use Remote Agents?</h2>
            <p className="text-xl text-slate-100 mb-8">
              Just call <code className="bg-gray-800 px-3 py-1.5 rounded">connect(address)</code> and start building distributed workflows!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/serve"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Globe className="w-5 h-5" />
                Serve Your Agents
              </Link>
              <Link
                href="/agent"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Code className="w-5 h-5" />
                Learn About Agents
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
