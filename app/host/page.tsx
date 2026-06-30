/**
 * @purpose Agent hosting page - make agents network-accessible with host()
 * @context Shows how to host agents over network with host() function
 * @llm-note Progressive tutorial: 60s start → HTTP/WS API → trust → deployment
 */

'use client'

import { HiOutlineWifi, HiOutlineBolt, HiOutlineKey, HiOutlineShieldCheck, HiOutlineServerStack, HiOutlineCheck, HiOutlineCommandLine, HiOutlineCodeBracket, HiOutlineSquare3Stack3D, HiOutlineGlobeAlt, HiOutlineDocumentText } from 'react-icons/hi2'
import Link from 'next/link'
import CodeWithResult from '../../components/CodeWithResult'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function HostPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'host()' }
            ]}
            icon={HiOutlineWifi}
            title="host()"
            description="Make your agent accessible over the network. One function call. HTTP, WebSocket, and P2P relay."
            markdownPath="/network/host.md"
            markdownFilename="host.md"
          />

          {/* Key Benefit */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Why host()?</strong> Turn local agents into network services. HTTP API, WebSocket, P2P relay - all with one function call.
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
            Create an agent and call <code className="bg-gray-100 px-2 py-1 rounded">host(agent)</code> - that's it:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, host

agent = Agent("translator", tools=[translate])

# Make it network-accessible
host(agent)`}
            result={`╭─────────────────────────────────────────────────────────╮
│  Agent 'translator' is now hosted                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Address:  0x3d4017c3e843895a92b70aa74d1b7ebc9c98...   │
│                                                         │
│  HTTP Endpoints:                                        │
│    POST http://localhost:8000/input                     │
│    GET  http://localhost:8000/sessions/{session_id}     │
│    GET  http://localhost:8000/health                    │
│    WS   ws://localhost:8000/ws                          │
│                                                         │
│  Interactive UI:                                        │
│    http://localhost:8000/docs                           │
│                                                         │
│  P2P Relay:                                             │
│    wss://oo.openonion.ai/ws/announce                    │
│                                                         │
╰─────────────────────────────────────────────────────────╯

Waiting for tasks...`}
            language="python"
            fileName="host_agent.py"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You Get</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>HTTP API</strong> → POST /input, GET /sessions, GET /health</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>WebSocket</strong> → Real-time streaming at /ws</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>Interactive UI</strong> → Test your agent at /docs</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>P2P Relay</strong> → Connect from anywhere via relay (auto-reconnect with backoff on drop)</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>Mid-execution input</strong> → Users can send messages while the agent is still working — server queues them and the agent picks them up at the next iteration boundary</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>Reconnect replay</strong> → Client passes <code className="bg-gray-100 px-1 rounded text-sm">last_msg_id</code> on CONNECT and gets back any events it missed during a WS drop</span>
              </div>
            </div>
          </div>

          {/* Worker Isolation */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Worker Isolation</h3>
            <p className="text-gray-700 mb-4">
              Each request gets a <strong>fresh deep copy</strong> of your agent:
            </p>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>No shared state</strong> between concurrent requests</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>Stateful tools work correctly</strong> (browser, file handles)</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <span><strong>Complete isolation</strong> - one request can't affect another</span>
              </div>
            </div>
          </div>
        </section>

        {/* HTTP API */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineServerStack className="w-8 h-8 icon-ui" />
            HTTP API
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">POST /input - Submit a Task</h3>
              <CodeWithResult
                code={`curl -X POST http://localhost:8000/input \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Translate hello to Spanish"}'`}
                result={`{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "done",
  "result": "Hola",
  "duration_ms": 1250,
  "session": {...}
}`}
                language="bash"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-turn Conversations</h3>
              <p className="text-gray-700 mb-4">
                Pass the <code className="bg-gray-100 px-2 py-1 rounded">session</code> from the response to continue:
              </p>
              <CodeWithResult
                code={`# First request
response = requests.post("http://localhost:8000/input", json={
    "prompt": "My name is John"
})
session = response.json()["session"]

# Second request - pass session back
response = requests.post("http://localhost:8000/input", json={
    "prompt": "What is my name?",
    "session": session  # Agent remembers!
})
print(response.json()["result"])  # "Your name is John"`}
                language="python"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sending Images & Files</h3>
              <p className="text-gray-700 mb-4">
                Both HTTP and WebSocket accept images and files alongside text prompts:
              </p>
              <CodeWithResult
                code={`# Send with files
curl -X POST http://localhost:8000/input \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Summarize this document",
    "files": [
      {"name": "report.pdf", "data": "data:application/pdf;base64,JVBERi..."}
    ]
  }'

# Send with images
curl -X POST http://localhost:8000/input \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "What do you see?",
    "images": ["data:image/png;base64,iVBORw0KGgo..."]
  }'`}
                language="bash"
              />
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p><strong className="text-gray-700 font-semibold">Images</strong> are passed directly to the LLM as visual content (multimodal).</p>
                <p><strong className="text-gray-700 font-semibold">Files</strong> are decoded from base64, saved to <code className="bg-gray-100 px-1 rounded">.co/uploads/</code>, and the agent reads them via tools like <code className="bg-gray-100 px-1 rounded">read_file</code>.</p>
                <p><strong className="text-gray-700 font-semibold">Limits:</strong> Default 10MB per file, 10 files per request. Configure in <code className="bg-gray-100 px-1 rounded">.co/host.yaml</code> or via <code className="bg-gray-100 px-1 rounded">host()</code> params.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">GET /sessions/{'{session_id}'} - Fetch Results</h3>
              <CodeWithResult
                code={`curl http://localhost:8000/sessions/550e8400-e29b-41d4-a716-446655440000`}
                result={`{
  "session_id": "550e8400-...",
  "status": "done",
  "result": "Hola",
  "duration_ms": 1250
}`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">GET /sessions - List Sessions</h3>
              <CodeWithResult
                code={`curl http://localhost:8000/sessions`}
                result={`{
  "sessions": [
    {"session_id": "abc-123", "status": "done", "created": 1702234567},
    {"session_id": "def-456", "status": "running", "created": 1702234570}
  ]
}`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">GET /health - Health Check</h3>
              <CodeWithResult
                code={`curl http://localhost:8000/health`}
                result={`{
  "status": "healthy",
  "agent": "translator",
  "uptime": 3600
}`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">GET /info - Agent Info</h3>
              <CodeWithResult
                code={`curl http://localhost:8000/info`}
                result={`{
  "name": "translator",
  "address": "0x3d4017c3...",
  "tools": ["translate", "detect_language"],
  "trust": "careful",
  "version": "0.5.10",
  "accepted_inputs": {
    "text": true,
    "images": true,
    "files": {
      "max_file_size_mb": 10,
      "max_files_per_request": 10
    }
  }
}`}
                language="bash"
              />
              <p className="text-sm text-gray-500 mt-2">
                The <code className="bg-gray-100 px-1 rounded">accepted_inputs</code> field tells clients what input types the agent supports and file size limits.
              </p>
            </div>
          </div>
        </section>

        {/* WebSocket */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineGlobeAlt className="w-8 h-8 icon-ui" />
            WebSocket API
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Real-time communication with streaming support:
          </p>

          <CodeWithResult
            code={`const ws = new WebSocket("ws://localhost:8000/ws");

// Step 1: CONNECT — authenticate + find/create session
ws.send(JSON.stringify({
  type: "CONNECT",
  payload: { to: "0xAgent...", timestamp: Date.now() / 1000 },
  from: "0xYourKey", signature: "0x...",
  session_id: savedId  // optional — omit for new session
}));
// → { type: "CONNECTED", session_id: "...", status: "new" }

// Step 2: INPUT — send prompts (after CONNECT)
ws.send(JSON.stringify({
  type: "INPUT",
  prompt: "Translate hello to Spanish"
}));

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "CONNECTED") console.log("Session:", msg.session_id);
  else if (msg.type === "OUTPUT") console.log("Result:", msg.result);
  else if (msg.type === "PING") ws.send(JSON.stringify({ type: "PONG" }));
};`}
            language="javascript"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">CONNECT → Server</h4>
              <p className="text-sm text-gray-600">Authenticate + find/create session (one message for new and resume)</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">INPUT → Agent</h4>
              <p className="text-sm text-gray-600">Send prompts (after CONNECT)</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">OUTPUT ← Agent</h4>
              <p className="text-sm text-gray-600">Receive final results</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">STREAM ← Agent</h4>
              <p className="text-sm text-gray-600">Streaming chunks</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">ERROR ← Agent</h4>
              <p className="text-sm text-gray-600">Error messages</p>
            </div>
          </div>
        </section>

        {/* Trust Parameter */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 icon-ui" />
            Trust & Access Control
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Control who can access your agent:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Trust Levels</h3>
              <CodeWithResult
                code={`host(agent, trust="open")      # Accept all (development)
host(agent, trust="careful")   # Recommend signature (default)
host(agent, trust="strict")    # Require signature (production)`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Access Lists</h3>
              <CodeWithResult
                code={`host(agent,
    blacklist=["0xbad..."],   # Always reject
    whitelist=["0xgood..."]   # Always accept
)`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Natural Language Policy</h3>
              <CodeWithResult
                code={`host(agent, trust="""
I trust requests that:
- Come from known contacts with good history
- Have valid signatures
- Are on my whitelist OR from local network
""")`}
                language="python"
              />
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSquare3Stack3D className="w-8 h-8 text-gray-500" />
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">All Parameters</h3>
              <CodeWithResult
                code={`host(
    agent,
    trust="careful",           # Trust level/policy/agent
    blacklist=None,            # Addresses to reject
    whitelist=None,            # Addresses to accept
    port=8000,                 # HTTP port
    workers=1,                 # Worker processes
    result_ttl=86400,          # Result storage (24h)
    relay_url="wss://...",     # P2P relay
    reload=False               # Auto-reload on changes
)`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Development vs Production</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Development</h4>
                  <CodeWithResult
                    code={`host(agent, reload=True, trust="open")`}
                    language="python"
                  />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Production</h4>
                  <CodeWithResult
                    code={`host(agent, workers=4, trust="strict")`}
                    language="python"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* host.yaml Configuration */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 icon-ui" />
            host.yaml Configuration
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Store configuration in a YAML file instead of code parameters. Generated by <code className="bg-gray-100 px-2 py-1 rounded">co init</code> or <code className="bg-gray-100 px-2 py-1 rounded">co create</code>.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Setup</h3>
              <CodeWithResult
                code={`# .co/host.yaml
summary: I translate text between 100+ languages
examples:
  - "Translate 'hello' to Spanish"
  - "What language is '你好' in?"

trust: careful
port: 8000`}
                language="yaml"
                fileName=".co/host.yaml"
              />
              <CodeWithResult
                code={`from connectonion import Agent, host

def create_agent():
    return Agent("translator", tools=[translate])

host(create_agent)  # Reads .co/host.yaml automatically`}
                language="python"
                fileName="agent.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Configuration Priority</h3>
              <p className="text-gray-700 mb-4">
                Settings are loaded in order (highest priority first):
              </p>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-gray-700 font-semibold">1.</span>
                  <span><strong>Code parameters</strong> - <code className="bg-gray-100 px-2 py-1 rounded">host(agent, port=9000)</code></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-700 font-semibold">2.</span>
                  <span><strong>Config file</strong> - <code className="bg-gray-100 px-2 py-1 rounded">.co/host.yaml</code></span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Agent Metadata</h3>
              <p className="text-gray-700 mb-4">
                Used by <code className="bg-gray-100 px-2 py-1 rounded">/info</code> endpoint and ANNOUNCE messages for agent discovery:
              </p>
              <CodeWithResult
                code={`# Natural language description
summary: I translate text between 100+ languages with cultural context

# 2-5 example prompts
examples:
  - "Translate 'hello' to Spanish"
  - "What language is '你好' in?"
  - "Translate this paragraph to French"`}
                language="yaml"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Trust Levels</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-700 font-semibold">Level</th>
                      <th className="text-left px-4 py-3 text-gray-700 font-semibold">Behavior</th>
                      <th className="text-left px-4 py-3 text-gray-700 font-semibold">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono text-gray-900">open</td>
                      <td className="px-4 py-3 text-gray-700">Accept all requests</td>
                      <td className="px-4 py-3 text-gray-600">Development</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-gray-700">careful</td>
                      <td className="px-4 py-3 text-gray-700">Recommend signature, accept unsigned</td>
                      <td className="px-4 py-3 text-gray-600">Staging/Default</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-gray-700">strict</td>
                      <td className="px-4 py-3 text-gray-700">Require valid signature</td>
                      <td className="px-4 py-3 text-gray-600">Production</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <CodeWithResult
                code={`# Simple trust level
trust: careful  # "open", "careful", or "strict"`}
                language="yaml"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Advanced Trust Configuration</h3>
              <CodeWithResult
                code={`trust:
  # Who has access (checked in order)
  allow:
    - whitelisted  # Addresses in whitelist.txt
    - contact      # Previously promoted contacts

  # Who is blocked
  deny:
    - blocked      # Addresses in blacklist.txt

  # How strangers become contacts (onboarding)
  onboard:
    invite_code:
      - OpenOnion
      - BETA2024
    payment: 10  # Minimum credits required

  # What to do with strangers without credentials
  # Options: "allow", "deny", "ask" (ask = use LLM to evaluate)
  default: ask`}
                language="yaml"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Access Control Lists</h3>
              <CodeWithResult
                code={`# .co/host.yaml - Custom paths
whitelist: ./security/allowed-addresses.txt
blacklist: ./security/blocked-users.txt`}
                language="yaml"
              />
              <CodeWithResult
                code={`# .co/whitelist.txt - One address per line
# Trusted partners

0xgood123abc...  # Partner company
0xtrusted456def...
0xfriend789ghi...`}
                language="txt"
                fileName=".co/whitelist.txt"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Server Settings</h3>
              <CodeWithResult
                code={`# HTTP port (default: 8000)
port: 8000

# Number of worker processes (default: 1)
workers: 1

# Result storage TTL in seconds (default: 86400 = 24 hours)
result_ttl: 86400

# P2P relay for agent discovery
relay_url: wss://oo.openonion.ai/ws/announce

# Auto-reload on code changes - development only (default: false)
reload: false

# Path to .co directory for agent identity (default: ~/.co/)
co_dir: null`}
                language="yaml"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">File Upload Limits</h3>
              <p className="text-gray-700 mb-4">
                Control file upload sizes for <code className="bg-gray-100 px-2 py-1 rounded">/input</code> endpoint and <code className="bg-gray-100 px-2 py-1 rounded">/ws</code> WebSocket:
              </p>
              <CodeWithResult
                code={`# Maximum file size in MB (default: 10)
# Good for screenshots, docs, images
max_file_size: 10

# Maximum number of files in one request (default: 10)
max_files_per_request: 10`}
                language="yaml"
              />

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Image Processing</h4>
                  <CodeWithResult
                    code={`max_file_size: 5
max_files_per_request: 20`}
                    language="yaml"
                  />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Video Analysis</h4>
                  <CodeWithResult
                    code={`max_file_size: 500
max_files_per_request: 5`}
                    language="yaml"
                  />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Document Processing</h4>
                  <CodeWithResult
                    code={`max_file_size: 10
max_files_per_request: 50`}
                    language="yaml"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Complete Example</h3>
              <CodeWithResult
                code={`# .co/host.yaml - Production configuration

summary: Production translation service with 100+ languages
examples:
  - "Translate 'hello' to Spanish"
  - "What language is '你好' in?"
  - "Translate this document to French"

trust:
  allow:
    - whitelisted
    - contact
  deny:
    - blocked
  onboard:
    invite_code: [OpenOnion, BETA2024]
    payment: 10
  default: ask

port: 8000
workers: 4
result_ttl: 3600  # 1 hour
relay_url: wss://oo.openonion.ai/ws/announce
max_file_size: 10
max_files_per_request: 10

whitelist: whitelist.txt
blacklist: blacklist.txt`}
                language="yaml"
                fileName=".co/host.yaml"
              />
            </div>

            <div className="callout">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Best Practices</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <div><strong className="text-gray-900">✓ DO:</strong> Commit <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">host.yaml</code> to version control</div>
                <div><strong className="text-gray-900">✗ DON'T:</strong> Put secrets in <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">host.yaml</code> — use <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">.env</code> instead</div>
                <div><strong className="text-gray-900">✓ DO:</strong> Start simple, add complexity as needed</div>
                <div><strong className="text-gray-900">✗ DON'T:</strong> Commit <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">whitelist.txt</code> or <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">blacklist.txt</code> to git</div>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-400" />
            API Reference
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Parameter</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Default</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">agent</td>
                  <td className="px-4 py-3 text-gray-600">Agent</td>
                  <td className="px-4 py-3 text-red-400">required</td>
                  <td className="px-4 py-3 text-gray-700">The agent to host</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">trust</td>
                  <td className="px-4 py-3 text-gray-600">str | Agent</td>
                  <td className="px-4 py-3 text-gray-600">{'"careful"'}</td>
                  <td className="px-4 py-3 text-gray-700">Trust level, policy, or agent</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">blacklist</td>
                  <td className="px-4 py-3 text-gray-600">list</td>
                  <td className="px-4 py-3 text-gray-600">None</td>
                  <td className="px-4 py-3 text-gray-700">Addresses to always reject</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">whitelist</td>
                  <td className="px-4 py-3 text-gray-600">list</td>
                  <td className="px-4 py-3 text-gray-600">None</td>
                  <td className="px-4 py-3 text-gray-700">Addresses to always accept</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">port</td>
                  <td className="px-4 py-3 text-gray-600">int</td>
                  <td className="px-4 py-3 text-gray-600">8000</td>
                  <td className="px-4 py-3 text-gray-700">HTTP server port</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">workers</td>
                  <td className="px-4 py-3 text-gray-600">int</td>
                  <td className="px-4 py-3 text-gray-600">1</td>
                  <td className="px-4 py-3 text-gray-700">Number of worker processes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">result_ttl</td>
                  <td className="px-4 py-3 text-gray-600">int</td>
                  <td className="px-4 py-3 text-gray-600">86400</td>
                  <td className="px-4 py-3 text-gray-700">Result storage TTL (24h default)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">relay_url</td>
                  <td className="px-4 py-3 text-gray-600">str</td>
                  <td className="px-4 py-3 text-gray-600">production</td>
                  <td className="px-4 py-3 text-gray-700">P2P relay server URL</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">reload</td>
                  <td className="px-4 py-3 text-gray-600">bool</td>
                  <td className="px-4 py-3 text-gray-600">False</td>
                  <td className="px-4 py-3 text-gray-700">Auto-reload on code changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 text-gray-400" />
            Deployment
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">With Uvicorn/Gunicorn</h3>
              <CodeWithResult
                code={`# myagent.py
from connectonion import Agent, host

agent = Agent("translator", tools=[translate])
app = host.app(agent)  # Export ASGI app

if __name__ == "__main__":
    host(agent)`}
                language="python"
              />
              <CodeWithResult
                code={`# Run with uvicorn
uvicorn myagent:app --workers 4

# Or gunicorn
gunicorn myagent:app -w 4 -k uvicorn.workers.UvicornWorker`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Docker</h3>
              <CodeWithResult
                code={`FROM python:3.11-slim
RUN pip install connectonion
COPY myagent.py .
CMD ["python", "myagent.py"]`}
                language="dockerfile"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Docker Compose</h3>
              <CodeWithResult
                code={`# docker-compose.yml
services:
  agent:
    build: .
    ports:
      - "8000:8000"
    environment:
      - CONNECTONION_ENV=production
      - OPENAI_API_KEY=\${OPENAI_API_KEY}`}
                language="yaml"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">systemd Service</h3>
              <CodeWithResult
                code={`# /etc/systemd/system/myagent.service
[Unit]
Description=My ConnectOnion Agent
After=network.target

[Service]
User=app
WorkingDirectory=/app
ExecStart=/usr/bin/python myagent.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target`}
                language="ini"
              />
              <CodeWithResult
                code={`sudo systemctl enable myagent
sudo systemctl start myagent`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-xl p-10 border border-gray-200 text-center">
            <h2 className="heading-2">Ready to Host Your Agents?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Just call <code className="bg-gray-200 px-2 py-1 rounded text-gray-800">host(agent)</code> and your agent goes live.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <HiOutlineServerStack className="w-5 h-5" />
                Connect to Agents
              </Link>
              <Link
                href="/agent"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 transition-colors"
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
