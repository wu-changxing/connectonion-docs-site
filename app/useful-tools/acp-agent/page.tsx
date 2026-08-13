/**
 * @purpose Generic downward ACP child-agent tool documentation
 * @context Explains named engines, resume, bounded events, and the fail-closed permission boundary
 */

'use client'

import { HiOutlineArrowPath, HiOutlineArrowsRightLeft, HiOutlineCodeBracket, HiOutlineShieldCheck } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function AcpAgentToolPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'ACP Agent' }
          ]}
          icon={HiOutlineArrowsRightLeft}
          iconColor="icon-ui"
          title="acp_agent"
          description="Delegate one bounded task to Claude Code, Codex, Gemini CLI, or another reviewed ACP agent through one typed client."
          markdownPath="/useful-tools/acp_agent.md"
          markdownFilename="acp_agent.md"
        />

        <div className="mb-12 rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-900">
          This tool accompanies the development work in ConnectOnion PR #901. It is planned for a later 1.7 preview and is not part of the current stable package or published preview until that PR is merged and released.
        </div>

        <section className="mb-12">
          <h2 className="heading-2">One client, named engines</h2>
          <p className="text-gray-700 mb-4">
            ConnectOnion is the ACP client and the selected coding engine is the child ACP agent. The model may choose a reviewed engine name, prompt, working directory, and prior session ID. Process commands, approval policy, and the workspace root remain operator-owned.
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import acp_agent

agent = Agent("lead", tools=[acp_agent])
agent.input("Ask Claude Code over ACP to inspect the failing tests")`}
            language="python"
          />
        </section>

        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-7 h-7 text-gray-500" />
            API
          </h2>
          <CodeWithResult
            code={`acp_agent(
    prompt: str,
    engine: str = "",       # claude-code | codex | gemini
    session_id: str = "",   # exact Claude/Codex session to resume
    cwd: str = "",          # operator workspace or a descendant
    timeout: int = 600,
) -> str                    # bounded JSON envelope`}
            language="python"
          />
          <p className="text-gray-700 mt-4">
            Custom ACP commands use an operator-created <code className="bg-gray-100 px-1 rounded">ACPAgent</code> instance. They are intentionally absent from the model-facing function schema.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-7 h-7 text-gray-500" />
            Engine permission contract
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Engine</th>
                  <th className="px-4 py-3">Exact route</th>
                  <th className="px-4 py-3">Supported policy</th>
                  <th className="px-4 py-3">Cross-process resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono">claude-code</td>
                  <td className="px-4 py-3 font-mono text-xs">claude-agent-acp@0.66.0</td>
                  <td className="px-4 py-3">manual, auto, deny</td>
                  <td className="px-4 py-3">yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">codex</td>
                  <td className="px-4 py-3 font-mono text-xs">codex-acp@1.1.14</td>
                  <td className="px-4 py-3">explicit operator-selected auto only</td>
                  <td className="px-4 py-3">yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">gemini</td>
                  <td className="px-4 py-3 font-mono text-xs">@google/gemini-cli@0.55.1 --acp</td>
                  <td className="px-4 py-3">manual, auto, deny when advertised</td>
                  <td className="px-4 py-3">no</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mt-4">
            Real testing found that the pinned Codex adapter&apos;s read-only mode can run shell and outbound network work without an ACP permission request. ConnectOnion therefore rejects named Codex ACP under manual or deny before spawning it. Use the native <code className="bg-gray-100 px-1 rounded">codex</code> tool for approval-aware Codex work.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2">
            <HiOutlineArrowPath className="w-7 h-7 text-gray-500" />
            Exact resume
          </h2>
          <CodeWithResult
            code={`import json

first = json.loads(acp_agent("Inspect the tests", engine="claude-code"))
second = json.loads(acp_agent(
    "Now propose the smallest fix",
    engine="claude-code",
    session_id=first["session_id"],
))

assert second["resumed"] is True`}
            language="python"
          />
          <p className="text-gray-700 mt-4">
            A failed Claude or Codex <code className="bg-gray-100 px-1 rounded">session/load</code> never falls back to a fresh child session. Real conformance testing found that Gemini CLI 0.55.1 does not persist its advertised ACP session across these one-process-per-turn invocations. A named Gemini turn therefore returns an empty <code className="bg-gray-100 px-1 rounded">session_id</code>; supplying one fails before launch instead of pretending to resume. Authentication failures also return an explicit error, and no child may silently start a browser login flow.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="heading-2">What reaches the parent and browser</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>The bounded final child message and stable tool lifecycle IDs/titles cross the edge.</li>
            <li>If the child emits startup notices under an earlier ACP message ID, they stay separate instead of being prepended to the final result.</li>
            <li>Raw child tool inputs and outputs do not become ordinary progress events.</li>
            <li>Child thought chunks do not become persisted ConnectOnion thoughts.</li>
            <li>A child plan does not replace the parent agent&apos;s canonical TodoList.</li>
            <li>The React package owns browser protocol decoding; O Chat renders the normalized state.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="heading-2">Provider environment boundary</h2>
          <p className="text-gray-700">
            Child processes start with the ACP SDK&apos;s trimmed HOME, PATH, and shell environment instead of inheriting every ambient secret. Claude receives only an explicitly set <code className="bg-gray-100 px-1 rounded">CLAUDE_CONFIG_DIR</code> or <code className="bg-gray-100 px-1 rounded">ANTHROPIC_API_KEY</code>; Codex receives only its selected API key or <code className="bg-gray-100 px-1 rounded">CODEX_HOME</code>; Gemini receives only explicitly configured Gemini API-key or Vertex authentication variables and cannot open a browser login. Unrelated environment credentials do not cross the child boundary. <code className="bg-gray-100 px-1 rounded">engine_status()</code> reports this boundary, including <code className="bg-gray-100 px-1 rounded">supports_resume</code>, without presenting a credential-file hint as proof of valid authentication.
          </p>
        </section>

        <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Workspace boundary, not an OS sandbox</h2>
          <p className="text-gray-700">
            The child working directory must resolve inside the operator-bound workspace, including through symlinks. The convenience tool resolves that root when called instead of retaining the directory from module import. These rules limit launch-directory selection; hostile child code still requires an operator-provided container or operating-system sandbox.
          </p>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
