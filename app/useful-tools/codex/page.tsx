/**
 * @purpose Codex tool documentation
 * @context Shows how to use the `codex` tool — drives OpenAI's Codex CLI via its native app-server (JSON-RPC 2.0), with session resume, live streaming, and per-action approval
 */

'use client'

import { HiOutlineCodeBracket, HiOutlineBolt, HiOutlineArrowPath, HiOutlineShieldCheck } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'

export default function CodexToolPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'Codex' }
          ]}
          icon={HiOutlineCodeBracket}
          iconColor="icon-ui"
          title="codex"
          description="Drive OpenAI's Codex CLI via its native app-server protocol — session resume, live step streaming, and per-action approval."
          markdownPath="/useful-tools/codex.md"
          markdownFilename="codex.md"
        />

        {/* Installation */}
        <section className="mb-12">
          <h2 className="heading-2">Installation</h2>
          <p className="text-gray-700 mb-4">
            Requires the <code className="bg-gray-100 px-2 py-1 rounded text-sm">codex</code> CLI and Codex auth:
          </p>
          <CodeWithResult
            code={`npm install -g @openai/codex
codex login   # or your usual Codex auth flow`}
            language="bash"
          />
          <p className="text-gray-700 mt-3 text-sm">
            Set <code className="bg-gray-100 px-1.5 py-0.5 rounded">$CODEX_CMD</code> to override the binary path/command if needed.
          </p>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-7 h-7 text-gray-400" />
            Quick Start
          </h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import codex

agent = Agent("architect", tools=[codex])
agent.input("Ask Codex to fix the failing tests in ./myrepo")`}
            language="python"
          />
        </section>

        {/* Why app-server */}
        <section className="mb-12">
          <h2 className="heading-2">Why app-server</h2>
          <p className="text-gray-700 mb-4">
            ConnectOnion drives Codex's built-in <code className="bg-gray-100 px-2 py-1 rounded text-sm">app-server</code> (OpenAI's native JSON-RPC 2.0 protocol) directly from Python — our own client is the adapter, so the only dependency is the <code className="bg-gray-100 px-2 py-1 rounded text-sm">codex</code> binary itself, no external Node adapter.
          </p>
          <p className="text-gray-700">
            This gets you session + resume (<code className="bg-gray-100 px-1.5 py-0.5 rounded">thread/start</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded">thread/resume</code>), live streaming of Codex's inner steps, and <strong>per-action approval</strong> — the server asks before each sensitive step, which maps onto <code className="bg-gray-100 px-1.5 py-0.5 rounded">agent.io.request_approval</code>.
          </p>
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-7 h-7 text-gray-500" />
            API
          </h2>
          <CodeWithResult
            code={`codex(
    prompt: str = "",                # Omit to open a thread without submitting a turn
    session_id: str = "",            # Thread id from a previous call, to resume it
    cwd: str = "",                   # Directory Codex works in (default: cwd)
    sandbox: str = "workspace-write",  # "read-only" | "workspace-write" | "danger-full-access"
    model: str = "",                 # Codex model override (e.g. "gpt-5-codex"); empty = default
    timeout: int = 600,              # Seconds before timeout
    approval: str = "manual",        # "manual" (ask via agent.io) or "auto" (approve automatically)
) -> str  # JSON envelope`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            With no frontend to ask, <code className="bg-gray-100 px-1.5 py-0.5 rounded">manual</code> approval <strong>denies</strong> each request rather than escalating.
          </p>
          <p className="text-gray-700 mt-3 text-sm">
            With an empty prompt, the adapter initializes and creates or resumes the native thread, returns its
            session ID with <code className="bg-gray-100 px-1.5 py-0.5 rounded">opened: true</code>, and does not
            call <code className="bg-gray-100 px-1.5 py-0.5 rounded">account/read</code> or
            <code className="bg-gray-100 px-1.5 py-0.5 rounded">turn/start</code>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2">Native Route and Work Room</h2>
          <p className="text-gray-700 mb-4">
            In <code className="bg-gray-100 px-1.5 py-0.5 rounded">co ai</code>, an explicit request to run,
            use, start, open, or ask Codex always targets this adapter. Executable Codex commands hidden in shell
            chains, command substitutions, package runners, or background wrappers are rejected before approval
            and process creation. Searches and prose that only mention Codex are not blocked.
          </p>
          <p className="text-gray-700">
            O Chat renders the parent invocation immediately. Open Work Room shows the provider conversation,
            correlated activity, and files; approvals, Stop, failure, completion, reconnect, and return-to-parent
            all use the same authenticated OIP session.
          </p>
        </section>

        {/* Return value */}
        <section className="mb-12">
          <h2 className="heading-2">Return Value</h2>
          <p className="text-gray-700 mb-4">A JSON string envelope:</p>
          <CodeWithResult
            code={`{
  "provider": "codex",
  "session_id": "<thread id>",
  "resumed": false,
  "last_message": "...",
  "usage": { /* token/cost info, if reported */ },
  "exit_code": 0
  // "error": "..." — present only when something went wrong
}`}
            language="json"
          />
        </section>

        {/* Resume a session */}
        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-7 h-7 text-gray-400" />
            Resuming a Session
          </h2>
          <CodeWithResult
            code={`import json
from connectonion.useful_tools import codex

result = json.loads(codex("Start refactoring the auth module"))
session_id = result["session_id"]

# Later, continue the same Codex thread
result2 = json.loads(codex("Now add tests for it", session_id=session_id))
print(result2["resumed"])  # True`}
            language="python"
          />
        </section>

        {/* Approval */}
        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-7 h-7 text-gray-400" />
            Approval Modes
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-gray-700">Mode</th>
                  <th className="px-4 py-3 text-gray-700">Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">manual</td>
                  <td className="px-4 py-3 text-gray-700">Default. Asks the human via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">agent.io</code>, rendered as an approval card. With no frontend attached, requests are denied rather than escalated.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">auto</td>
                  <td className="px-4 py-3 text-gray-700">Approves every request automatically — no human in the loop.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sandbox levels */}
        <section className="mb-12">
          <h2 className="heading-2">Sandbox Levels</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-gray-700">Value</th>
                  <th className="px-4 py-3 text-gray-700">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">read-only</td>
                  <td className="px-4 py-3 text-gray-700">Codex can inspect the codebase but not write to it</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">workspace-write</td>
                  <td className="px-4 py-3 text-gray-700">Default. Codex can edit files inside the working directory</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">danger-full-access</td>
                  <td className="px-4 py-3 text-gray-700">No sandbox restrictions — use with caution</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Frontend contract */}
        <section className="mb-12">
          <h2 className="heading-2">Frontend Contract</h2>
          <p className="text-gray-700">
            Codex's inner steps are streamed as the <strong>same OIP events</strong> the connection layer bundled in <code className="bg-gray-100 px-1.5 py-0.5 rounded">@connectonion/react</code> maps to chat items — a parent <code className="bg-gray-100 px-1.5 py-0.5 rounded">provider_invocation</code> plus correlated <code className="bg-gray-100 px-1.5 py-0.5 rounded">tool_call</code> and <code className="bg-gray-100 px-1.5 py-0.5 rounded">tool_result</code> activity. Older clients retain the generic tool-card fallback.
          </p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
