/**
 * @purpose CLI AI command documentation
 * @context Shows how to use `co ai` for coding agent — web server mode and one-shot mode
 */

'use client'

import { HiOutlineCommandLine, HiOutlineSparkles, HiOutlineCodeBracket, HiOutlineGlobeAlt, HiOutlineBolt, HiOutlineFolder } from 'react-icons/hi2'
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
            description="AI coding agent that works in your project. Start with web chat, run one-shot prompts, or let another program or coding agent drive a resumable JSON session."
            markdownPath="/cli/ai.md"
            markdownFilename="ai.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> Run <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> in your project — it opens a web chat connected to a coding agent that can read and edit your files.
            </p>
          </div>
        </section>

        {/* Two Modes */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Two Modes
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Web Chat (default)</h3>
              <code className="text-sm text-gray-600">co ai</code>
              <p className="text-gray-500 text-sm mt-2">Starts a local agent server, opens <code className="text-gray-600">chat.openonion.ai</code> in your browser. Chat conversationally — best for extended sessions.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-700 mb-2">One-Shot</h3>
              <code className="text-sm text-gray-600">co ai "your prompt"</code>
              <p className="text-gray-500 text-sm mt-2">Runs the prompt, prints the result, exits. Add <code className="text-gray-600">--json</code> when another program needs a stable contract.</p>
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

        {/* Machine-readable one-shot mode */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Automate and Resume
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Scripts and coding agents should request one JSON object on stdout. Keep the returned session ID to continue the same conversation in a later process:
          </p>

          <CodeWithResult
            code={`first=$(co ai "Fix the failing tests" --json)
session=$(printf '%s' "$first" | jq -r .session_id)

co ai "Now update the docs" --resume "$session" --json`}
            result={`{"session_id":"550e8400-e29b-41d4-a716-446655440000","result":"Tests fixed.","error":null}
{"session_id":"550e8400-e29b-41d4-a716-446655440000","result":"Docs updated.","error":null}`}
            language="bash"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Stable process boundary</h3>
              <p className="text-sm text-gray-600">Stdout contains exactly <code className="bg-gray-100 px-1 rounded">session_id</code>, <code className="bg-gray-100 px-1 rounded">result</code>, and <code className="bg-gray-100 px-1 rounded">error</code>. Human progress moves to stderr. Failures use a non-zero exit code.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Fail-closed resume</h3>
              <p className="text-sm text-gray-600">A missing, corrupt, busy, or wrong-project session never becomes a fresh conversation. Sessions are private to the user and bound to the project directory.</p>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-amber-900">
            Resumable JSON mode omits background-process tools because their live process handles cannot cross CLI process boundaries. Use foreground commands when a later invocation must rely on the result.
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
                <li>• Track genuinely multi-step work with visible todos</li>
                <li>• Handle simple work directly</li>
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

        {/* Coding-agent delegation */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Delegate to Codex or Claude Code
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            When their CLIs are installed and authenticated, <code className="bg-gray-100 px-2 py-1 rounded">co ai</code> can give either provider a bounded task and resume that provider&apos;s session for follow-up fixes. Ask it to review the resulting diff and tests before reporting completion.
          </p>

          <CodeWithResult
            code={`# Safe one-shot delegation is read-only
co ai "Ask Codex to review the parser in this repository. Report findings; do not edit files"

co ai "Ask Claude Code to diagnose the failing integration test. Report the cause; do not modify files"`}
            language="bash"
          />

          <p className="text-gray-600 mt-5 text-sm">
            For delegated edits, use Web Chat and switch to <strong>Accept Edits</strong>, or explicitly choose <code className="bg-gray-100 px-1 rounded">--yolo</code> only for a trusted repository and bounded task. Default one-shot mode has no Web approval UI, so requests for additional permission fail closed.
          </p>

          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">co ai mode</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Codex boundary</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Claude Code boundary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800">Safe</td>
                  <td className="px-4 py-3 text-gray-600">Read-only; Web Chat can show concrete escalation approvals, while one-shot fails closed</td>
                  <td className="px-4 py-3 text-gray-600">Normal provider rules; actions needing an interactive prompt fail closed in headless mode</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800">Accept Edits</td>
                  <td className="px-4 py-3 text-gray-600">Workspace write; other sensitive actions still require approval</td>
                  <td className="px-4 py-3 text-gray-600">In-scope edits allowed; protected shell or network actions can still fail closed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800">YOLO / ULW</td>
                  <td className="px-4 py-3 text-gray-600">Workspace write without prompts; never danger-full-access</td>
                  <td className="px-4 py-3 text-gray-600">Provider Auto mode; no fallback if the account or organization is ineligible</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 mt-5 text-sm">
            The active mode is reapplied on resume. ConnectOnion never selects Codex <code className="bg-gray-100 px-1 rounded">danger-full-access</code> or Claude Code <code className="bg-gray-100 px-1 rounded">bypassPermissions</code>. A provider can describe a denied action in an otherwise successful result, so status alone is not proof that files changed.
          </p>
        </section>

        {/* GitHub Action */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Review a Pull Request in GitHub Actions
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            The reusable Action runs the bundled review skill against fixed, read-only pull-request evidence, then creates or updates one bounded comment. Trigger it manually from trusted default-branch workflow code and pin the audited ConnectOnion release commit.
          </p>

          <CodeWithResult
            code={`name: ConnectOnion PR review

on:
  workflow_dispatch:
    inputs:
      pr_number:
        required: true
        type: number

permissions:
  contents: read
  pull-requests: read
  checks: read
  statuses: read
  issues: write

concurrency:
  group: co-ai-review-\${{ inputs.pr_number }}
  cancel-in-progress: false

jobs:
  review:
    if: github.ref == format('refs/heads/{0}', github.event.repository.default_branch)
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: openonion/connectonion@RELEASE_COMMIT_SHA
        with:
          pr-number: \${{ inputs.pr_number }}
        env:
          OPENONION_API_KEY: \${{ secrets.OPENONION_API_KEY }}`}
            language="yaml"
          />

          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-5 text-sm text-red-900">
            Do not combine <code className="bg-red-100 px-1 rounded">pull_request_target</code>, repository secrets, and checkout of untrusted PR code. The shipped Action intentionally reads PR data through a fixed GET-only adapter and never executes the branch.
          </div>
        </section>

        {/* Options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Command Reference
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
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
                  <td className="px-4 py-3 font-mono text-gray-600">--port</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-p</td>
                  <td className="px-4 py-3 text-gray-600">8000</td>
                  <td className="px-4 py-3 text-gray-700">Web server port</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--model</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-m</td>
                  <td className="px-4 py-3 text-gray-600">co/gemini-3.6-flash</td>
                  <td className="px-4 py-3 text-gray-700">LLM model to use</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--max-iterations</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-i</td>
                  <td className="px-4 py-3 text-gray-600">100</td>
                  <td className="px-4 py-3 text-gray-700">Max tool iterations per turn</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--yolo</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">off</td>
                  <td className="px-4 py-3 text-gray-700">Skip tool approvals for a trusted autonomous task</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--yolo-turns</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">100</td>
                  <td className="px-4 py-3 text-gray-700">Positive autonomous-turn checkpoint; requires <code>--yolo</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--json</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">off</td>
                  <td className="px-4 py-3 text-gray-700">Emit one machine-readable envelope in one-shot mode</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--resume</td>
                  <td className="px-4 py-3 text-gray-500">—</td>
                  <td className="px-4 py-3 text-gray-600">—</td>
                  <td className="px-4 py-3 text-gray-700">Continue a JSON one-shot session by ID; requires <code>--json</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <CodeWithResult
              code={`# Different port
co ai --port 9000

# Different model
co ai --model co/gemini-3.6-flash

# One-shot with options (read-only by default)
co ai "review this service; do not edit files" --model co/gpt-4o --max-iterations 50

# Trusted bounded autonomy
co ai --yolo "fix the failing suite" --yolo-turns 20`}
              language="bash"
            />
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-amber-950">
            <strong>Use <code>--yolo</code> only for trusted, bounded tasks in a recoverable workspace.</strong>{' '}
            It can run shell commands and write or delete files without asking for each tool approval. Review the resulting diff and run the relevant tests before keeping the changes.
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
