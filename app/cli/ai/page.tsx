/**
 * @purpose CLI AI command documentation
 * @context Shows how to use `co ai` in web chat, one-shot, and ACP modes
 */

'use client'

import { HiOutlineArrowsRightLeft, HiOutlineCommandLine, HiOutlineSparkles, HiOutlineCodeBracket, HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineFolder } from 'react-icons/hi2'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliAiPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co ai' }
            ]}
            icon={HiOutlineSparkles}
            iconColor="icon-ui"
            title="co ai"
            description="AI coding agent that works in your project. Start a web chat, run one-shot prompts, or connect an ACP client — with full access to your files, shell, and tools."
            markdownPath="/cli/ai.md"
            markdownFilename="ai.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> Run <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> in your project — it opens a web chat connected to a coding agent that can read and edit your files.
            </p>
          </div>
        </section>

        {/* Three Modes */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Three Modes
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Web Chat (default)</h3>
              <code className="text-sm text-gray-600">co ai</code>
              <p className="text-gray-500 text-sm mt-2">Starts a local agent server, opens <code className="text-gray-600">chat.openonion.ai</code> in your browser. Chat conversationally — best for extended sessions.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-700 mb-2">ACP stdio</h3>
              <code className="text-sm text-gray-600">co ai --acp</code>
              <p className="text-gray-500 text-sm mt-2">Serves Agent Client Protocol JSON-RPC over stdin/stdout for compatible editors and clients.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-700 mb-2">One-Shot</h3>
              <code className="text-sm text-gray-600">co ai "your prompt"</code>
              <p className="text-gray-500 text-sm mt-2">Runs the prompt, prints the result, exits. Best for quick tasks and scripting.</p>
            </div>
          </div>
        </section>

        {/* Web Chat Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineGlobeAlt className="w-8 h-8 text-gray-700" />
            Web Chat Mode
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Run <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> in your project directory:
          </p>

          <CodeWithResult
            code={`co ai`}
            result={`Starting AI coding agent...
Server running at http://localhost:8000
Opening chat.openonion.ai/0x7a9f3b2c...`}
            language="bash"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-gray-700">1.</span>
                <span>Agent server starts on <code className="bg-gray-100 px-1 rounded">localhost:8000</code></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">2.</span>
                <span>Your browser opens <code className="bg-gray-100 px-1 rounded">chat.openonion.ai/{'{your-address}'}</code></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">3.</span>
                <span>The agent runs in your project directory with full tool access</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">4.</span>
                <span>Your identity comes from <code className="bg-gray-100 px-1 rounded">~/.co/</code> — same across all sessions</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Native browser ACP in Alpha.2</h3>
            <p className="text-gray-700">
              <code className="bg-gray-100 px-1 rounded">@connectonion/react@0.4.2-alpha.2</code> owns browser
              transport selection, and O Chat pins it. An exact supported discovery descriptor selects authenticated
              <code className="bg-gray-100 px-1 rounded ml-1">/acp</code>; a Host that omits it keeps the bounded
              <code className="bg-gray-100 px-1 rounded mx-1">/ws</code> compatibility path. After native ACP is selected,
              admission or transport failure fails closed instead of silently downgrading. Direct loopback or TLS/WSS
              is the preview boundary, not relay end-to-end encryption.
            </p>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Delegate to Claude Code</h3>
            <p className="text-gray-700 mb-3">
              In the 1.7 preview implementation, <code className="bg-gray-100 px-1 rounded">co ai</code> can call the
              installed Claude Code CLI as one peer tool and resume its session. O Chat receives Claude&apos;s inner
              Read, Edit, and Bash activity as live tool cards while the parent agent owns the final review.
            </p>
            <p className="text-gray-700 mb-3">
              The cards provide visibility, not extra authority. Delegated runs use Claude&apos;s safe mode, which
              disables ordinary project and user customizations while preserving authentication and admin policy.
              The launch directory stays inside the operator-bound project root; an unmatched interactive permission
              prompt cannot yet round-trip through O Chat and fails closed.
            </p>
            <Link href="/blog/stream-claude-code-tools-to-web" className="font-medium text-green-700 hover:underline">
              Read the stream-json design decision
            </Link>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Delegate through a generic ACP child</h3>
            <p className="text-gray-700 mb-3">
              The <code className="bg-gray-100 px-1 rounded">1.7.0a2</code> candidate registers <code className="bg-gray-100 px-1 rounded">acp_agent</code> for work that specifically needs the common ACP edge instead of the preferred native Claude Code or Codex tools. Engine name, prompt, working directory, and exact session ID are model-visible; command, approval, and workspace root remain operator-owned. It is not publicly available until the reviewed preview package is published.
            </p>
            <p className="text-gray-700 mb-3">
              Read only and Workspace profiles select inner manual approval. Only a valid bounded Full Access grant selects auto, and hosted non-admin requesters fail before launch. The pinned Codex ACP route is rejected in ordinary profiles because its read-only mode does not reliably ask before shell or outbound network work.
            </p>
            <p className="text-gray-700 mb-3">
              The pinned Gemini route is one-turn and requires a Gemini API key, Vertex AI, or enterprise Code Assist. Google retired individual Gemini CLI OAuth service on June 18, 2026, so an old local OAuth credential file is not a readiness signal.
            </p>
            <Link href="/useful-tools/acp-agent" className="font-medium text-green-700 hover:underline">
              Read the bounded ACP child-agent contract
            </Link>
          </div>
        </section>

        {/* ACP Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-700" />
            ACP Mode
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Start a long-lived Agent Client Protocol server for a compatible editor or client:
          </p>

          <CodeWithResult code={`co ai --acp`} language="bash" />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3 text-gray-700">
            <p>Each ACP session owns one persistent coding agent and a private snapshot, so later prompts reuse its conversation and supported tool state.</p>
            <p>Session updates preserve Agent event order: thinking, tool starts, tool results, and the final assistant answer. JSON-native tool arguments and results remain structured in <code className="bg-gray-100 px-1 rounded">rawInput</code> and <code className="bg-gray-100 px-1 rounded">rawOutput</code>.</p>
            <p>Turn usage and stop reasons come from the Agent&apos;s structured terminal record. Cancellation is cooperative, and events arriving after a turn is retired are not forwarded into the next prompt.</p>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Isolate automation state</h3>
            <CodeWithResult code={`co ai --acp --state-dir /private/tmp/co-acp-test`} language="bash" />
            <p className="text-gray-700 mt-4">
              The explicit directory owns this process&apos;s ACP snapshots, Agent logs, and eval records. It does not copy credentials or create another identity: the Agent name, provider configuration, skills, credentials, project workspace, and provider tools keep their normal locations and authority boundaries. POSIX directories are private at mode <code className="bg-gray-100 px-1 rounded">0700</code>, symlink roots are rejected, and the default remains <code className="bg-gray-100 px-1 rounded">~/.co</code> when the option is absent. Logs, usage, cost, and evaluation evidence begin at the current user-input boundary rather than counting earlier cumulative activity again. <code className="bg-gray-100 px-1 rounded">--state-dir</code> requires <code className="bg-gray-100 px-1 rounded">--acp</code>.
            </p>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Resume and ownership</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><code className="bg-gray-100 px-1 rounded">session/resume</code> restores the Agent&apos;s saved conversation and supported tool state from the same project directory.</li>
              <li>Resume does not replay historical updates; the ACP client keeps the transcript it already rendered.</li>
              <li>One runtime owns a session at a time. <code className="bg-gray-100 px-1 rounded">session/close</code> or stdio EOF releases it for another process.</li>
              <li>Only completed prompts enter the non-cancellable commit phase. Failures before commit keep the last good state; if a client disconnects during commit, resume the session before retrying.</li>
            </ul>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tool approval</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>ConnectOnion&apos;s existing Safe policy decides whether a tool is already allowed or needs approval. ACP does not maintain a second tool allowlist.</li>
              <li>When approval is required, the client receives <code className="bg-gray-100 px-1 rounded">session/request_permission</code> with choices to allow this call, allow for this session, or reject the turn.</li>
              <li>A session approval becomes durable only after that prompt commits successfully. It survives close and resume for the same session, but never becomes a project-wide grant.</li>
              <li>Cancellation, close, stdio EOF, client errors, and unknown responses all fail closed. Late replies cannot approve a later prompt or another session.</li>
            </ul>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Session modes and authority</h3>
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Safe</p>
                <p className="text-sm text-gray-600 mt-1">Ask before tools with side effects.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">Auto</p>
                <p className="text-sm text-gray-600 mt-1">Apply file edits automatically; ask before other risky tools.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">ULW</p>
                <p className="text-sm text-gray-600 mt-1">Skip approvals for a bounded number of autonomous turns.</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Safe and Auto are always available. The ACP client changes them with <code className="bg-gray-100 px-1 rounded">session/set_mode</code>, and the committed mode survives close and resume.</li>
              <li>ULW is available only when the operator starts the server with <code className="bg-gray-100 px-1 rounded">co ai --acp --yolo</code>. A client or saved session cannot grant itself that authority.</li>
              <li><code className="bg-gray-100 px-1 rounded">--yolo-turns</code> sets the launch-time ceiling. A resumed ULW session must fit within the new process&apos;s remaining-turn ceiling.</li>
              <li>Mode changes are accepted only while the session is idle. If a prompt is running, wait for it to finish and retry.</li>
            </ul>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect an ACP host</h3>
            <p className="text-gray-700 mb-4">
              ConnectOnion is the ACP agent. Editors such as Zed and JetBrains are clients that start it as a local subprocess. Make sure <code className="bg-gray-100 px-1 rounded">co</code> is on the editor&apos;s PATH and run <code className="bg-gray-100 px-1 rounded">co auth login</code> first when using managed models.
            </p>
            <h4 className="font-semibold text-gray-900 mb-2">Zed custom agent</h4>
            <CodeWithResult
              code={`{
  "agent_servers": {
    "ConnectOnion": {
      "type": "custom",
      "command": "co",
      "args": ["ai", "--acp"],
      "env": {}
    }
  }
}`}
              language="json"
            />
            <p className="text-sm text-gray-600 mt-2 mb-5">
              In Zed, open Agent Settings, add a custom agent, then replace the generated entry. This default command does not grant MCP process-launch authority, so disable every server under Settings → AI → MCP Servers. To forward configured servers deliberately, add <code className="bg-gray-100 px-1 rounded">&quot;--acp-mcp&quot;</code> to <code className="bg-gray-100 px-1 rounded">args</code>. Use <code className="bg-gray-100 px-1 rounded">dev: open acp logs</code> to inspect protocol traffic.
            </p>
            <h4 className="font-semibold text-gray-900 mb-2">JetBrains custom agent</h4>
            <CodeWithResult
              code={`{
  "default_mcp_settings": {
    "use_idea_mcp": false,
    "use_custom_mcp": false
  },
  "agent_servers": {
    "ConnectOnion": {
      "command": "co",
      "args": ["ai", "--acp"],
      "env": {}
    }
  }
}`}
              language="json"
            />
            <p className="text-sm text-gray-600 mt-2">
              In AI Chat, choose Add Custom Agent and put this entry in <code className="bg-gray-100 px-1 rounded">acp.json</code>. The safe default is to keep both MCP forwarding settings false. To enable them deliberately, add <code className="bg-gray-100 px-1 rounded">&quot;--acp-mcp&quot;</code> after <code className="bg-gray-100 px-1 rounded">&quot;--acp&quot;</code> in <code className="bg-gray-100 px-1 rounded">args</code>, then opt in to the required JetBrains MCP settings. If a desktop app cannot find your shell PATH, use the absolute path returned by <code className="bg-gray-100 px-1 rounded">which co</code> as the command.
            </p>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
              MCP forwarding is disabled by default because an ACP-provided stdio server can launch a local process. With <code className="bg-amber-100 px-1 rounded">--acp-mcp</code>, ConnectOnion accepts at most eight stdio servers whose commands are absolute paths; HTTP, SSE, and ACP-transport servers are rejected. Server tools still pass through the normal approval hook, and client-granted approvals expire when the MCP process pool closes. Resume requires the full server list again and does not restore client-granted approvals.
            </div>
          </div>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-6 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">ACP compatibility</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-700 font-semibold">Boundary</th>
                    <th className="text-left px-4 py-3 text-gray-700 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 text-gray-700 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Protocol and SDK</td>
                    <td className="px-4 py-3 text-gray-700">Tested</td>
                    <td className="px-4 py-3 text-gray-600">ACP protocolVersion 1 with Python SDK &gt;=0.12,&lt;0.13</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Local stdio</td>
                    <td className="px-4 py-3 text-gray-700">Tested in CI</td>
                    <td className="px-4 py-3 text-gray-600">Official typed client plus raw framing, EOF, cancellation, resume, modes, and approvals</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Zed / JetBrains</td>
                    <td className="px-4 py-3 text-gray-700">Custom-agent setup</td>
                    <td className="px-4 py-3 text-gray-600">Uses the local stdio command above; editor GUI binaries are not run in CI</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Claude Code / Codex</td>
                    <td className="px-4 py-3 text-gray-700">Peer agents</td>
                    <td className="px-4 py-3 text-gray-600">They are not ACP clients that launch ConnectOnion</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Extra directories</td>
                    <td className="px-4 py-3 text-gray-700">Not yet supported</td>
                    <td className="px-4 py-3 text-gray-600">Non-empty requests fail explicitly instead of being ignored</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">MCP servers</td>
                    <td className="px-4 py-3 text-gray-700">Opt-in stdio</td>
                    <td className="px-4 py-3 text-gray-600">Disabled by default; --acp-mcp accepts bounded, session-scoped stdio servers with absolute commands</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Prompt content</td>
                    <td className="px-4 py-3 text-gray-700">Text and resource links</td>
                    <td className="px-4 py-3 text-gray-600">Links are passed as labeled references, not fetched automatically; image, audio, and embedded resources are not yet accepted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-5 text-amber-900">
            ConnectOnion currently receives complete provider responses, so the final assistant answer is one ACP chunk rather than live token streaming.
          </div>
        </section>

        {/* One-Shot Mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            One-Shot Mode
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Pass a prompt directly — the agent runs, prints the result, and exits:
          </p>

          <CodeWithResult
            code={`co ai "Create a FastAPI hello world app"`}
            result={`[agent] Creating FastAPI hello world app...
[agent] Writing main.py...

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello World"}

Done! Run with: uvicorn main:app --reload`}
            language="bash"
          />

          <div className="mt-8 space-y-3">
            <CodeWithResult
              code={`# Fix a bug
co ai "fix the failing test in tests/unit/test_agent.py"

# Add a feature
co ai "add rate limiting to the /api endpoint"

# Refactor
co ai "refactor agent.py to use the new event system"

# Write tests
co ai "write pytest tests for models/user.py"`}
              language="bash"
            />
          </div>
        </section>

        {/* Project Context */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineFolder className="w-8 h-8 text-gray-700" />
            Project Context
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            When started, the agent automatically loads context from your project — no setup required:
          </p>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Source</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">.co/OO.md</td>
                  <td className="px-4 py-3 text-gray-700">Project instructions (primary)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">CLAUDE.md</td>
                  <td className="px-4 py-3 text-gray-700">Claude Code compatibility</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">README.md</td>
                  <td className="px-4 py-3 text-gray-700">Project overview</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">~/.claude/skills/</td>
                  <td className="px-4 py-3 text-gray-700">User-defined skills</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">git status</td>
                  <td className="px-4 py-3 text-gray-700">Current branch, changes, recent commits</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 mb-4">
            Give the agent persistent project rules with <code className="bg-gray-100 px-2 py-1 rounded">.co/OO.md</code>:
          </p>

          <CodeWithResult
            code={`mkdir -p .co
cat > .co/OO.md << 'EOF'
Always run tests before committing.
Use snake_case for function names.
The main entry point is src/main.py.
EOF`}
            language="bash"
          />
          <p className="text-gray-500 mt-3 text-sm">
            Loaded every session — the agent always follows your rules without being told.
          </p>
        </section>

        {/* Available Tools */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Available Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">File Operations</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Read, write, edit files</li>
                <li>• Search with glob and grep</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Shell</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Run bash commands</li>
                <li>• Approval flow for destructive ops</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Planning</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Enter plan mode, write plans</li>
                <li>• Exit plan and implement</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-500 mb-2">Tasks & Skills</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Background tasks, todo lists</li>
                <li>• Load and run user-defined skills</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Command Reference
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Option</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Short</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Default</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--acp</td>
                  <td className="px-4 py-3 font-mono text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">off</td>
                  <td className="px-4 py-3 text-gray-700">Serve ACP JSON-RPC over stdin/stdout</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--acp-mcp</td>
                  <td className="px-4 py-3 font-mono text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">off</td>
                  <td className="px-4 py-3 text-gray-700">With --acp, allow session-scoped stdio MCP launches</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--state-dir</td>
                  <td className="px-4 py-3 font-mono text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">~/.co</td>
                  <td className="px-4 py-3 text-gray-700">With --acp, isolate mutable session, log, and eval state</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--yolo</td>
                  <td className="px-4 py-3 font-mono text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">off</td>
                  <td className="px-4 py-3 text-gray-700">Authorize bounded ULW mode and skip tool approvals</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--yolo-turns</td>
                  <td className="px-4 py-3 font-mono text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">100</td>
                  <td className="px-4 py-3 text-gray-700">Autonomous-turn ceiling when --yolo is enabled</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--port</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-p</td>
                  <td className="px-4 py-3 text-gray-600">8000</td>
                  <td className="px-4 py-3 text-gray-700">Web server port</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--model</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-m</td>
                  <td className="px-4 py-3 text-gray-600">co/gemini-3-flash-preview</td>
                  <td className="px-4 py-3 text-gray-700">LLM model to use</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--max-iterations</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-i</td>
                  <td className="px-4 py-3 text-gray-600">100</td>
                  <td className="px-4 py-3 text-gray-700">Max tool iterations per turn</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <CodeWithResult
              code={`# Different port
co ai --port 9000

# Faster model
co ai --model co/gemini-2.5-pro

# ACP with ULW available for at most 20 autonomous turns
co ai --acp --yolo --yolo-turns 20

# One-shot with options
co ai "build a microservice" --model co/gpt-4o --max-iterations 50`}
              language="bash"
            />
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
