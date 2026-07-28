/**
 * @purpose Connect to remote agents page
 * @context Shows how to use remote agents with connect()
 * @llm-note Progressive tutorial: 60s start → explanation → patterns → examples
 */

'use client'

import { HiOutlineServerStack, HiOutlineBolt, HiOutlineArrowPath, HiOutlineSquare3Stack3D, HiOutlineCheck, HiOutlineCommandLine, HiOutlineCodeBracket, HiOutlineUsers, HiOutlineGlobeAlt, HiOutlineCpuChip, HiOutlineWindow, HiOutlinePuzzlePiece, HiOutlineDocumentText } from 'react-icons/hi2'
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
            icon={HiOutlineServerStack}
            iconColor="icon-ui"
            title="Connect to Agents"
            description="Use any agent, anywhere, as if local. Create a proxy to a remote agent with the same interface."
            markdownPath="/network/connect.md"
            markdownFilename="connect.md"
          />

          {/* Key Benefit */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Why connect?</strong> Access specialized agents from anywhere, build distributed workflows, scale horizontally across multiple machines.
            </p>
          </div>
        </section>

        {/* 60-Second Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 icon-ui" />
            60-Second Quick Start
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
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

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-green-900 mb-4">What Just Happened?</p>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Created proxy agent</strong> → Acts like a local Agent instance</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Connected to relay</strong> → WebSocket at <code className="bg-gray-100 px-2 py-1 rounded">wss://oo.openonion.ai/ws/announce</code></span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Sent INPUT message</strong> → Routed to the remote agent</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
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
                <HiOutlineCommandLine className="w-5 h-5 text-gray-400" />
                Terminal 1: Host an Agent
              </h3>
              <CodeWithResult
                code={`# host_agent.py
from connectonion import Agent, host

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
host(agent)`}
                result={`Starting agent...
Agent 'assistant' hosted at: http://localhost:8000
Address: 0x7a8f9d4c2b1e3f5a6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
P2P Relay: wss://oo.openonion.ai/ws/announce
Waiting for tasks...`}
                language="python"
                fileName="host_agent.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineCodeBracket className="w-5 h-5 text-gray-400" />
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
            <HiOutlineSquare3Stack3D className="w-8 h-8 text-gray-500" />
            Common Patterns
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Connect to Multiple Agents</h3>
              <p className="text-gray-700 mb-4">
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

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Retry on Connection Failure</h3>
              <p className="text-gray-700 mb-4">
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

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">3. Agent Pool (Load Balancing)</h3>
              <p className="text-gray-700 mb-4">
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
            <HiOutlineUsers className="w-8 h-8 text-gray-400" />
            Multi-Turn Conversations
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Remote agents maintain conversation state across multiple <code className="bg-gray-100 px-2 py-1 rounded">input()</code> calls:
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

        {/* Direct Tool Execution */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-400" />
            Direct Tool Execution: remote.call()
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            <code className="bg-gray-100 px-2 py-1 rounded">input(prompt)</code> sends a task to the remote agent&apos;s <strong>LLM</strong> — it reasons, picks tools, and comes back when the whole task is done. When you already know the exact tool and arguments and just want the result, <code className="bg-gray-100 px-2 py-1 rounded">call(tool, **args)</code> is the fast path: no reasoning, no session, no conversation history.
          </p>

          <CodeWithResult
            code={`remote = connect("0x3d4017c3...")

# Text out
print(remote.call("bash", command="co status").text)

# Image out — screenshots come back as base64 in .text; .images extracts them
shot = remote.call("bash", command="co browser take_screenshot")
if shot.images:
    import base64
    png = base64.b64decode(shot.images[0].split(",", 1)[1])
    open("page.png", "wb").write(png)`}
            language="python"
          />

          <p className="text-gray-700 mt-6 mb-4">
            The result is an <code className="bg-gray-100 px-2 py-1 rounded">ExecResult</code>: <code className="bg-gray-100 px-2 py-1 rounded">.text</code>, <code className="bg-gray-100 px-2 py-1 rounded">.status</code> (<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&quot;success&quot;</code>/<code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&quot;error&quot;</code>), <code className="bg-gray-100 px-2 py-1 rounded">.ok</code>, <code className="bg-gray-100 px-2 py-1 rounded">.error</code>, <code className="bg-gray-100 px-2 py-1 rounded">.duration_ms</code>, and <code className="bg-gray-100 px-2 py-1 rounded">.images</code>. It never raises for a tool failure — a crash inside the tool comes back as <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">status=&quot;error&quot;</code>, same as how the LLM loop reports tool errors for retry.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Gated by the remote&apos;s whitelist.</strong> What may run via <code className="bg-gray-100 px-1.5 py-0.5 rounded">call()</code> is the same <code className="bg-gray-100 px-1.5 py-0.5 rounded">permissions:</code> whitelist in the remote&apos;s <code className="bg-gray-100 px-1.5 py-0.5 rounded">.co/host.yaml</code> that its own LLM approval flow uses — one list, same meaning either way. Not on the list → refused with an error result, never executed.
            </p>
          </div>

          <p className="text-gray-700 text-sm">
            From the shell, without writing Python: <code className="bg-gray-100 px-1.5 py-0.5 rounded">co call 0x3d40... co status</code> — see <a href="/cli/call" className="text-gray-700 hover:underline">co call</a>.
          </p>
        </section>

        {/* Real-World Example */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 icon-ui" />
            Real-World: Distributed Workflow
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
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
            <HiOutlineArrowPath className="w-8 h-8 text-gray-400" />
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
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Agent</h3>
              <CodeWithResult
                code={`from connectonion import Agent

agent = Agent("local",
    tools=[search, calculate])

result = agent.input("task")`}
                language="python"
              />
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-green-600 flex items-start gap-2">
                  <span>+</span> No network latency
                </p>
                <p className="text-green-600 flex items-start gap-2">
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

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Remote Agent</h3>
              <CodeWithResult
                code={`from connectonion import connect

agent = connect("0x7a8f...")

result = agent.input("task")`}
                language="python"
              />
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-green-600 flex items-start gap-2">
                  <span>+</span> Access from anywhere
                </p>
                <p className="text-green-600 flex items-start gap-2">
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

        {/* TypeScript SDK */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-400" />
            TypeScript SDK
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            The <code className="bg-gray-100 px-2 py-1 rounded">connectonion</code> npm package provides the same <code className="bg-gray-100 px-2 py-1 rounded">connect()</code> interface for TypeScript and JavaScript:
          </p>

          <CodeWithResult
            code={`npm install connectonion`}
            language="bash"
            fileName="terminal"
          />

          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
              <CodeWithResult
                code={`import { connect } from 'connectonion'

// Connect to a hosted agent
const agent = connect("0x3d4017c3e843...")

// Send a message and get a response
const response = await agent.input("What is Python?")
console.log(response.text)`}
                language="typescript"
                fileName="app.ts"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Direct Connection (Deployed Agents)</h3>
              <CodeWithResult
                code={`import { connect } from 'connectonion'

// Connect directly to a deployed agent (bypasses relay)
const agent = connect("my-agent", {
  directUrl: "https://my-agent.example.com"
})

const response = await agent.input("Hello!")
console.log(response.text)`}
                language="typescript"
                fileName="direct.ts"
              />
            </div>
          </div>
        </section>

        {/* Streaming Events */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSquare3Stack3D className="w-8 h-8 text-gray-400" />
            Streaming Events
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            While the agent works, events stream in real-time via the <code className="bg-gray-100 px-2 py-1 rounded">ui</code> property. Each event is a <code className="bg-gray-100 px-2 py-1 rounded">ChatItem</code>:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-500">Event Type</th>
                  <th className="text-left px-4 py-3 text-gray-500">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">user</td>
                  <td className="px-4 py-3 text-gray-600">User message</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">agent</td>
                  <td className="px-4 py-3 text-gray-600">Agent response text</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-500">thinking</td>
                  <td className="px-4 py-3 text-gray-600">LLM thinking/reasoning</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">tool_call</td>
                  <td className="px-4 py-3 text-gray-600">Tool execution with name, args, result</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">ask_user</td>
                  <td className="px-4 py-3 text-gray-600">Agent asking a question (with options)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-red-700">approval_needed</td>
                  <td className="px-4 py-3 text-gray-600">Tool requires user approval before running</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">plan_review</td>
                  <td className="px-4 py-3 text-gray-600">Agent presenting a plan for review</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* React Hook */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlinePuzzlePiece className="w-8 h-8 text-gray-400" />
            React Hook: useAgentForHuman()
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            The <code className="bg-gray-100 px-2 py-1 rounded">@connectonion/react</code> package adds a React hook that wraps <code className="bg-gray-100 px-2 py-1 rounded">connect()</code> with state management and localStorage persistence. Before SDK 0.2.0 it shipped inside <code className="bg-gray-100 px-2 py-1 rounded">connectonion</code> at the <code className="bg-gray-100 px-2 py-1 rounded">connectonion/react</code> subpath:
          </p>

          <CodeWithResult
            code={`npm install @connectonion/react connectonion`}
            language="bash"
            fileName="terminal"
          />

          <CodeWithResult
            code={`import { useAgentForHuman } from '@connectonion/react'

function ChatPage() {
  const {
    ui,              // ChatItem[] — streaming events
    status,          // 'idle' | 'working' | 'waiting'
    isProcessing,    // true while agent is working
    mode,            // approval mode
    input,           // send a message
    respond,         // answer ask_user
    respondToApproval,
    reset,           // clear conversation
  } = useAgentForHuman("0x3d4017c3e843...", {
    sessionId: "my-session-123"  // auto-persisted to localStorage
  })

  return (
    <div>
      {/* Render streaming events */}
      {ui.map(item => {
        if (item.type === 'user') return <UserMsg key={item.id}>{item.content}</UserMsg>
        if (item.type === 'agent') return <AgentMsg key={item.id}>{item.content}</AgentMsg>
        if (item.type === 'thinking') return <Thinking key={item.id} />
        if (item.type === 'tool_call') return <ToolCall key={item.id} name={item.name} />
        if (item.type === 'ask_user') return (
          <AskUser
            key={item.id}
            question={item.text}
            options={item.options}
            onAnswer={(answer) => respond(answer)}
          />
        )
        return null
      })}

      {/* Input */}
      <input onSubmit={(msg) => input(msg)} disabled={isProcessing} />
    </div>
  )
}`}
            language="tsx"
            fileName="ChatPage.tsx"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-900">
              <strong>Session persistence:</strong> The hook automatically saves conversation state to <code className="bg-gray-100 px-1 rounded">localStorage</code> using the sessionId. Page refreshes restore the full conversation.
            </p>
          </div>
        </section>

        {/* Interactive Features */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineUsers className="w-8 h-8 icon-ui" />
            Interactive Features
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Agents can ask questions, request approval for dangerous tools, and present plans for review. Here{"'"}s how to handle each:
          </p>

          <div className="space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ask User</h3>
              <p className="text-sm text-gray-600 mb-4">Agent needs information from the user:</p>
              <CodeWithResult
                code={`// Agent sends: { type: 'ask_user', text: 'Which city?', options: ['Sydney', 'Tokyo'] }

// Respond with:
respond("Sydney")

// Or multiple selections:
respond(["Sydney", "Tokyo"])`}
                language="typescript"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Approval</h3>
              <p className="text-sm text-gray-600 mb-4">Agent wants to run a tool that needs permission:</p>
              <CodeWithResult
                code={`// Agent sends: { type: 'approval_needed', tool: 'shell', arguments: { cmd: 'rm -rf /tmp' } }

// Approve once:
respondToApproval(true, 'once')

// Approve for entire session:
respondToApproval(true, 'session')

// Reject with feedback:
respondToApproval(false, 'once', 'reject_explain', 'Too dangerous')`}
                language="typescript"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Review</h3>
              <p className="text-sm text-gray-600 mb-4">Agent presenting a plan before executing:</p>
              <CodeWithResult
                code={`// Agent sends: { type: 'plan_review', plan_content: '1. Research\\n2. Analyze\\n3. Report' }

// Approve and continue:
respondToPlanReview("Looks good, proceed")

// Request changes:
respondToPlanReview("Skip step 2, go straight to report")`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Sending Files */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 text-gray-400" />
            Sending Files
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            All SDKs support sending files alongside prompts. Files are base64-encoded and sent inline as data URLs.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Python</h3>
              <CodeWithResult
                code={`import base64
from connectonion import connect

agent = connect("0x...")

# Read file and convert to data URL
with open("report.pdf", "rb") as f:
    data_url = f"data:application/pdf;base64,{base64.b64encode(f.read()).decode()}"

response = agent.input("Summarize this document", files=[
    {"name": "report.pdf", "data": data_url}
])`}
                language="python"
                fileName="send_file.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">TypeScript</h3>
              <CodeWithResult
                code={`import { connect, FileAttachment } from 'connectonion'

const agent = connect('0x...')

// From a File object (browser)
const file = fileInput.files[0]
const reader = new FileReader()
reader.onload = async () => {
  const attachment: FileAttachment = {
    name: file.name,
    type: file.type,
    size: file.size,
    dataUrl: reader.result as string,
  }
  const response = await agent.input('Summarize this', { files: [attachment] })
}
reader.readAsDataURL(file)`}
                language="typescript"
                fileName="send_file.ts"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">React (useAgentForHuman)</h3>
              <CodeWithResult
                code={`import { useAgentForHuman, FileAttachment } from '@connectonion/react'

function Chat() {
  const { input } = useAgentForHuman('0x...', { sessionId: 'my-session' })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const attachment: FileAttachment = {
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: reader.result as string,
      }
      input('Analyze this file', { files: [attachment] })
    }
    reader.readAsDataURL(file)
  }

  return <input type="file" onChange={handleFileUpload} />
}`}
                language="tsx"
                fileName="FileUpload.tsx"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">FileAttachment Type</h3>
            <CodeWithResult
              code={`interface FileAttachment {
  name: string      // Filename (e.g. "report.pdf")
  type: string      // MIME type (e.g. "application/pdf")
  size: number      // File size in bytes
  dataUrl: string   // Base64 data URL: "data:<mime>;base64,..."
}`}
              language="typescript"
              fileName="types.ts"
            />
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold mb-3">How It Works</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-700 whitespace-pre leading-relaxed">{`Client                              Server
  │                                    │
  │  Convert file to base64 data URL   │
  │                                    │
  │── INPUT ──────────────────────────►│
  │  { prompt, files: [               │
  │    { name, data: "data:...;base64,│
  │      ..." }                        │
  │  ]}                                │
  │                                    │
  │                 Validate file limits│
  │                 Decode base64      │
  │                 Save to .co/uploads│
  │                 Tell agent paths   │
  │                                    │
  │                 Agent reads files  │
  │                 via read_file tool │
  │                                    │
  │◄── OUTPUT ────────────────────────│
  │  { result }                        │`}</pre>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-sm text-gray-900">
              <strong>File limits:</strong> Default 10MB per file, 10 files per request. Check agent limits via <code className="bg-gray-100 px-1 rounded">GET /info</code> → <code className="bg-gray-100 px-1 rounded">accepted_inputs.files</code>. Server-side, files are saved to <code className="bg-gray-100 px-1 rounded">.co/uploads/</code> and the agent reads them via tools. See <Link href="/host" className="text-gray-700 hover:text-gray-900 underline">host()</Link> for server-side details.
            </p>
          </div>
        </section>

        {/* oo-chat Reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineWindow className="w-8 h-8 text-gray-400" />
            oo-chat: Open-Source Reference Client
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            <Link href="https://github.com/openonion/oo-chat" className="text-gray-700 hover:text-gray-900 underline">oo-chat</Link> is an open-source Next.js chat client built on the TypeScript SDK. It{"'"}s a complete working example of how to build a chat UI for ConnectOnion agents.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 overflow-x-auto mb-6">
            <pre className="text-sm font-mono text-gray-700 whitespace-pre leading-relaxed">{`oo-chat/
├── app/[address]/[sessionId]/page.tsx   ← session page (uses useAgentForHumanSDK)
├── components/chat/
│   ├── chat.tsx                         ← main Chat component
│   ├── chat-input.tsx                   ← message input
│   ├── chat-messages.tsx                ← message list
│   ├── use-agent-sdk.ts                 ← wrapper hook around useAgentForHuman()
│   └── messages/
│       ├── tool-call.tsx                ← tool call rendering
│       └── tools/plan-card.tsx          ← plan review UI
└── package.json                         ← depends on connectonion`}</pre>
          </div>

          <h3 className="text-xl font-semibold mb-4">How oo-chat Connects</h3>

          <CodeWithResult
            code={`// app/[address]/[sessionId]/page.tsx
import { useAgentForHumanSDK } from '@/components/chat/use-agent-sdk'

export default function ChatSession({ params }) {
  const { address, sessionId } = params

  const {
    ui,
    isLoading,
    elapsedTime,
    pendingAskUser,
    pendingApproval,
    pendingPlanReview,
    mode,
    send,
    respondToAskUser,
    respondToApproval,
    respondToPlanReview,
    setMode,
    clear,
  } = useAgentForHumanSDK({ agentAddress: address, sessionId })

  return (
    <Chat
      ui={ui}
      isLoading={isLoading}
      elapsedTime={elapsedTime}
      onSend={(msg, images) => send(msg, images)}
      pendingAskUser={pendingAskUser}
      onAskUserResponse={respondToAskUser}
      pendingApproval={pendingApproval}
      onApprovalResponse={respondToApproval}
      pendingPlanReview={pendingPlanReview}
      onPlanReviewResponse={respondToPlanReview}
      mode={mode}
      onModeChange={setMode}
    />
  )
}`}
            language="tsx"
            fileName="app/[address]/[sessionId]/page.tsx"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900 mb-4">Architecture</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-700 whitespace-pre leading-relaxed">{`┌──────────────────────────────────────────────────┐
│  oo-chat (Next.js)                               │
│                                                   │
│  page.tsx                                         │
│    └─ useAgentForHumanSDK()     ← elapsed time, pending   │
│         └─ useAgentForHuman()   ← @connectonion/react     │
│              └─ connect()  ← WebSocket to agent   │
│                                                   │
│  <Chat />                                         │
│    ├─ <ChatMessages />  ← renders ui: ChatItem[]  │
│    ├─ <AskUser />       ← from pendingAskUser     │
│    ├─ <Approval />      ← from pendingApproval    │
│    └─ <ChatInput />     ← calls send()            │
└──────────────────────────────────────────────────┘
         │ WebSocket
         ▼
┌──────────────────────────────────────────────────┐
│  Hosted Agent (Python)                            │
│  host(agent)                                      │
└──────────────────────────────────────────────────┘`}</pre>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200 text-center">
            <h2 className="heading-2">Ready to Use Remote Agents?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Python, TypeScript, or React — connect to any agent with one function call.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/host"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <HiOutlineGlobeAlt className="w-5 h-5" />
                Host Your Agents
              </Link>
              <Link
                href="/agent"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <HiOutlineCodeBracket className="w-5 h-5" />
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
