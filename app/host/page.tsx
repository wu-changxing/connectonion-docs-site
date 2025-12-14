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
            iconColor="text-emerald-400"
            iconBgFrom="from-emerald-600/20"
            iconBgTo="to-cyan-600/20"
            iconBorderColor="border-emerald-500/30"
            title="host()"
            description="Make your agent accessible over the network. One function call. HTTP, WebSocket, and P2P relay."
            markdownPath="/host.md"
            markdownFilename="host.md"
          />

          {/* Key Benefit */}
          <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-lg p-6">
            <p className="text-lg font-semibold text-emerald-100">
              <strong>Why host()?</strong> Turn local agents into network services. HTTP API, WebSocket, P2P relay - all with one function call.
            </p>
          </div>
        </section>

        {/* 60-Second Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-yellow-400" />
            60-Second Quick Start
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Create an agent and call <code className="bg-gray-800 px-2 py-1 rounded">host(agent)</code> - that's it:
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

          <div className="mt-6 bg-blue-950/50 border border-blue-400/40 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-100 mb-4">What You Get</h3>
            <div className="space-y-2 text-slate-100">
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>HTTP API</strong> → POST /input, GET /sessions, GET /health</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>WebSocket</strong> → Real-time streaming at /ws</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>Interactive UI</strong> → Test your agent at /docs</span>
              </div>
              <div className="flex items-start gap-2">
                <HiOutlineCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span><strong>P2P Relay</strong> → Connect from anywhere via relay</span>
              </div>
            </div>
          </div>
        </section>

        {/* HTTP API */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineServerStack className="w-8 h-8 text-cyan-400" />
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

            <div className="bg-purple-950/50 border border-purple-400/40 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-100 mb-4">Multi-turn Conversations</h3>
              <p className="text-slate-100 mb-4">
                Pass the <code className="bg-gray-800 px-2 py-1 rounded">session</code> from the response to continue:
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
          </div>
        </section>

        {/* WebSocket */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineGlobeAlt className="w-8 h-8 text-blue-400" />
            WebSocket API
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
            Real-time communication with streaming support:
          </p>

          <CodeWithResult
            code={`const ws = new WebSocket("ws://localhost:8000/ws");

ws.send(JSON.stringify({
  type: "INPUT",
  prompt: "Translate hello to Spanish"
}));

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === "OUTPUT") {
    console.log("Result:", msg.result);
  } else if (msg.type === "STREAM") {
    process.stdout.write(msg.chunk);
  }
};`}
            language="javascript"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-4">
              <h4 className="font-semibold text-blue-100 mb-2">INPUT → Agent</h4>
              <p className="text-sm text-slate-300">Send prompts to the agent</p>
            </div>
            <div className="bg-emerald-950/50 border border-emerald-400/40 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-100 mb-2">OUTPUT ← Agent</h4>
              <p className="text-sm text-slate-300">Receive final results</p>
            </div>
            <div className="bg-purple-950/50 border border-purple-400/40 rounded-lg p-4">
              <h4 className="font-semibold text-purple-100 mb-2">STREAM ← Agent</h4>
              <p className="text-sm text-slate-300">Streaming chunks</p>
            </div>
            <div className="bg-red-950/50 border border-red-400/40 rounded-lg p-4">
              <h4 className="font-semibold text-red-100 mb-2">ERROR ← Agent</h4>
              <p className="text-sm text-slate-300">Error messages</p>
            </div>
          </div>
        </section>

        {/* Trust Parameter */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-amber-400" />
            Trust & Access Control
          </h2>

          <p className="text-slate-100 mb-6 text-lg">
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
            <HiOutlineSquare3Stack3D className="w-8 h-8 text-purple-400" />
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
                <div className="bg-green-950/50 border border-green-400/40 rounded-lg p-4">
                  <h4 className="font-semibold text-green-100 mb-2">Development</h4>
                  <CodeWithResult
                    code={`host(agent, reload=True, trust="open")`}
                    language="python"
                  />
                </div>
                <div className="bg-blue-950/50 border border-blue-400/40 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-100 mb-2">Production</h4>
                  <CodeWithResult
                    code={`host(agent, workers=4, trust="strict")`}
                    language="python"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDocumentText className="w-8 h-8 text-orange-400" />
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-emerald-950/30 rounded-2xl p-10 border border-emerald-400/30 text-center">
            <h2 className="heading-2">Ready to Host Your Agents?</h2>
            <p className="text-xl text-slate-100 mb-8">
              Just call <code className="bg-gray-800 px-3 py-1.5 rounded">host(agent)</code> and your agent goes live!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/connect"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <HiOutlineServerStack className="w-5 h-5" />
                Connect to Agents
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
