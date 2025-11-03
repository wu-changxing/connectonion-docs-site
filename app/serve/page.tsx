/**
 * @purpose Agent serving page - make agents network-accessible
 * @context Shows how to serve agents over network with agent.serve()
 * @llm-note Progressive tutorial: 60s start → explanation → examples → security
 */

'use client'

import { Wifi, ArrowRight, Zap, Key, Shield, Network, Check, Terminal, Code, Layers, Globe } from 'lucide-react'
import Link from 'next/link'
import { CommandBlock } from '../../components/CommandBlock'
import CodeWithResult from '../../components/CodeWithResult'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'

export default function ServePage() {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12 lg:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-white">Agent Serving</span>
          </nav>

          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-emerald-900/20 border border-emerald-500/30 rounded-full px-6 py-3 mb-6">
              <Wifi className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">Make Agents Network-Accessible</span>
              <Globe className="w-5 h-5 text-emerald-300" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
              Share Your AI Agents Over the Network
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mb-6">
              Call <code className="bg-gray-800 px-2 py-1 rounded">agent.serve()</code> to make your agent accessible from anywhere. One line of code, cryptographic identity, zero configuration.
            </p>

            <CopyMarkdownButton />
          </div>

          {/* Key Benefit */}
          <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-lg p-6">
            <p className="text-lg font-semibold text-emerald-100">
              <strong>Why serve?</strong> Turn local agents into network services. Access specialized agents from anywhere, build distributed workflows, scale horizontally.
            </p>
          </div>
        </section>

        {/* 60-Second Quick Start */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            60-Second Quick Start
          </h2>

          <p className="text-gray-300 mb-6 text-lg">
            Create an agent and call <code className="bg-gray-800 px-2 py-1 rounded">.serve()</code> - that's it:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent

def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

agent = Agent("helper", tools=[search])

# Make it network-accessible
agent.serve()`}
            result={`Agent 'helper' serving at: 0x3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c
Connected to relay: wss://oo.openonion.ai/ws/announce
Waiting for connections...`}
            language="python"
            fileName="serve_agent.py"
          />

          <div className="mt-6 bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-100 mb-3">What Just Happened?</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Generated Ed25519 keys</strong> → Saved to <code className="bg-gray-800 px-2 py-1 rounded">.co/keys/helper/</code></span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Connected to relay</strong> → WebSocket at <code className="bg-gray-800 px-2 py-1 rounded">wss://oo.openonion.ai/ws/announce</code></span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Announced presence</strong> → Published public key to relay</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Started listening</strong> → Waiting for INPUT messages</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Your Agent */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Testing Your Served Agent</h2>

          <p className="text-gray-300 mb-6 text-lg">
            From another Python script, connect using the agent's address:
          </p>

          <CodeWithResult
            code={`from connectonion import connect

# Connect using the agent's address
remote = connect("0x3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c")

# Use it like a local agent
result = remote.input("Search for Python docs")
print(result)`}
            result={`Results for: Python docs`}
            language="python"
            fileName="use_agent.py"
          />

          <div className="mt-6 bg-purple-950/50 border border-purple-400/40 rounded-lg p-6">
            <p className="text-purple-100">
              <strong>Or from terminal:</strong> Start serving in Terminal 1, connect from Terminal 2. Your agent is now a network service!
            </p>
          </div>
        </section>

        {/* Message Flow */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Network className="w-8 h-8 text-cyan-400" />
            How It Works
          </h2>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
            <div className="font-mono text-sm text-gray-300 whitespace-pre">
{`Client                  Relay Server              Your Agent
  |                          |                          |
  |--- INPUT message ------->|                          |
  |                          |--- INPUT message ------->|
  |                          |                          |
  |                          |                 [Process task]
  |                          |                          |
  |                          |<-- OUTPUT message -------|
  |<-- OUTPUT message -------|                          |
  |                          |                          |`}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-100 mb-3 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                INPUT Message
              </h3>
              <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300">
{`{
  "type": "INPUT",
  "from": "0xclient...",
  "task": "Search for Python docs"
}`}
              </div>
            </div>

            <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-emerald-100 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5" />
                OUTPUT Message
              </h3>
              <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300">
{`{
  "type": "OUTPUT",
  "to": "0xclient...",
  "result": "Results for: ..."
}`}
              </div>
            </div>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            All messages are automatically signed with your agent's private key and verified by the relay.
          </p>
        </section>

        {/* Configuration */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Layers className="w-8 h-8 text-purple-400" />
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Default Relay (Production)</h3>
              <CodeWithResult
                code={`# Uses wss://oo.openonion.ai/ws/announce by default
agent.serve()`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Custom Relay (Development)</h3>
              <CodeWithResult
                code={`# Connect to local relay server
agent.serve(relay_url="ws://localhost:8000/ws/announce")`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Environment-Based</h3>
              <CodeWithResult
                code={`import os

relay_url = os.getenv(
    "RELAY_URL",
    "wss://oo.openonion.ai/ws/announce"
)

agent.serve(relay_url=relay_url)`}
                language="python"
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-400" />
            Security
          </h2>

          <div className="space-y-6">
            <div className="bg-amber-950/50 border border-amber-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-amber-100 mb-3 flex items-center gap-2">
                <Key className="w-5 h-5" />
                Ed25519 Cryptography
              </h3>
              <p className="text-gray-300 mb-4">
                Every message is signed with your agent's private key. The relay verifies signatures to ensure authenticity.
              </p>
              <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300">
{`# Automatic signing
message = {"type": "OUTPUT", "result": "..."}
signature = signing_key.sign(json.dumps(message))

# Relay verifies with public key
verify_key.verify(signature)  # Raises if invalid`}
              </div>
            </div>

            <div className="bg-red-950/50 border border-red-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-100 mb-3">Key Storage</h3>
              <p className="text-gray-300 mb-4">
                Keys are stored in <code className="bg-gray-800 px-2 py-1 rounded">.co/keys/{'{agent_name}'}/':</code>
              </p>
              <ul className="space-y-2 text-gray-300 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><code className="bg-gray-800 px-2 py-1 rounded">private_key.pem</code> - Keep this secret! Never commit to git.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">•</span>
                  <span><code className="bg-gray-800 px-2 py-1 rounded">public_key.pem</code> - Your agent's address, safe to share.</span>
                </li>
              </ul>
              <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300">
{`# Add to .gitignore
.co/`}
              </div>
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Complete Example</h2>

          <CodeWithResult
            code={`from connectonion import Agent

# Tool 1: Web search
def search(query: str) -> str:
    """Search the web."""
    import requests
    # Actual search implementation
    return f"Search results for {query}"

# Tool 2: Save to file
def save_file(filename: str, content: str) -> str:
    """Save content to a file."""
    with open(filename, 'w') as f:
        f.write(content)
    return f"Saved to {filename}"

# Create agent
agent = Agent(
    name="research_assistant",
    tools=[search, save_file],
    system_prompt="You are a research assistant."
)

# Serve it
print(f"Starting {agent.name}...")
agent.serve()`}
            result={`Starting research_assistant...
Agent 'research_assistant' serving at: 0x7a8f9d4c2b1e3f5a6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9b2c
Connected to relay: wss://oo.openonion.ai/ws/announce

Keys saved to: .co/keys/research_assistant/
  - private_key.pem
  - public_key.pem

Waiting for connections...`}
            language="python"
            fileName="research_assistant.py"
          />
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-emerald-950/30 rounded-2xl p-10 border border-emerald-400/30 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Share Your Agents?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Just call <code className="bg-gray-800 px-3 py-1.5 rounded">agent.serve()</code> and your agent goes live!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Network className="w-5 h-5" />
                Connect to Agents
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
