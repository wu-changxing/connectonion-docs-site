'use client'

import React from 'react'
import { HiOutlineShieldCheck, HiOutlineCommandLine, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineCube, HiOutlineKey } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ToolApprovalPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'tool_approval' },
          ]}
          icon={HiOutlineShieldCheck}
          iconColor="icon-ui"
          title="tool_approval"
          description="Web-based approval for dangerous tools via WebSocket"
          markdownPath="/useful-plugins/tool_approval.md"
          markdownFilename="tool-approval.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent, bash
from connectonion.useful_plugins import tool_approval

agent = Agent("assistant", tools=[bash], plugins=[tool_approval])
agent.io = my_websocket_io  # Required for web mode

agent.input("Install dependencies")
# → Client receives: {"type": "approval_needed", "tool": "bash", "arguments": {"command": "npm install"}}
# → Client responds: {"approved": true, "scope": "session"}
# ✓ bash approved (session)`}
            language="python"
          />
        </section>

        {/* Lifecycle */}
        <section className="mb-12">
          <h2 className="heading-2">Lifecycle</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-sm overflow-x-auto shadow-xl">
            <pre className="text-gray-700 whitespace-pre">{`User sends prompt
    ↓
Agent calls LLM
    ↓
LLM returns tool_calls batch: [bash("npm install"), write("config.json"), bash("npm build")]
    ↓
tool_executor iterates sequentially:
    ↓
┌─ Tool #1: bash("npm install")
│   before_each_tool fires → check_approval()
│   → Is it safe? No (bash is DANGEROUS)
│   → Already approved for session? No
│   → Send to client:
│       {
│         "type": "approval_needed",
│         "tool": "bash",
│         "arguments": {"command": "npm install"},
│         "batch_remaining": [
│           {"tool": "write", "arguments": "{...}"},
│           {"tool": "bash", "arguments": "{\\"command\\": \\"npm build\\"}"}
│         ]
│       }
│   → BLOCK — wait for client response
│   ↓
│   Client responds: {"approved": true, "scope": "session"}
│   → Execute bash("npm install")
│   → Save "bash" as session-approved
│
├─ Tool #2: write("config.json")
│   before_each_tool fires → check_approval()
│   → Is it safe? No (write is DANGEROUS)
│   → Send approval_needed (batch_remaining: [bash(...)])
│   → Client responds: {"approved": false, "mode": "reject_soft"}
│   → Skip this tool, continue to next
│
├─ Tool #3: bash("npm build")
│   before_each_tool fires → check_approval()
│   → bash is session-approved → skip approval, execute immediately
│
└─ Done. Return results to LLM.`}</pre>
          </div>
        </section>

        {/* Rejection Modes */}
        <section className="mb-12">
          <h2 className="heading-2">Rejection Modes</h2>
          <p className="text-gray-700 mb-6">
            When the client rejects a tool, the <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded">mode</code> field determines what happens next:
          </p>

          <div className="space-y-6">
            {/* reject_soft */}
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <HiOutlineCheckCircle className="w-5 h-5" />
                reject_soft (Skip)
              </h3>
              <p className="text-gray-700 mb-4">Skip this tool, agent loop continues. The LLM receives a hint to ask the user what they prefer.</p>
              <CodeWithResult
                code={`{"approved": false, "mode": "reject_soft", "feedback": "Don't write that file"}`}
                language="json"
              />
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Current tool is skipped (raises ValueError)</li>
                <li>• Next tool in the batch proceeds normally</li>
                <li>• LLM gets: "User rejected tool 'write'. Feedback: Don't write that file\n\n[System reminder: Ask the user...]"</li>
              </ul>
            </div>

            {/* reject_hard */}
            <div className="p-6 bg-gray-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                reject_hard (Stop)
              </h3>
              <p className="text-gray-700 mb-4">Skip this tool AND all remaining tools in the batch. The agent loop stops and waits for new user input.</p>
              <CodeWithResult
                code={`{"approved": false, "mode": "reject_hard", "feedback": "Wrong approach entirely"}`}
                language="json"
              />
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Current tool is skipped (raises ValueError)</li>
                <li>• <code className="px-2 py-1 bg-red-50 text-red-700 rounded">stop_signal</code> flag is set in session</li>
                <li>• All remaining tools in the batch are auto-rejected</li>
                <li>• Agent loop stops — LLM does NOT get another turn</li>
                <li>• User must send a new message to continue</li>
              </ul>
              <div className="mt-4 text-sm text-slate-400">
                Default mode when <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded">mode</code> is not provided: <code className="px-2 py-1 bg-red-50 text-red-700 rounded">reject_hard</code>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Classification */}
        <section className="mb-12">
          <h2 className="heading-2">Tool Classification</h2>

          <div className="space-y-6">
            {/* Safe Tools */}
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <HiOutlineCheckCircle className="w-5 h-5" />
                Safe Tools (No Approval)
              </h3>
              <p className="text-gray-700 mb-3">Read-only operations that never modify state:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
                read, read_file, glob, grep, search<br/>
                list_files, get_file_info, task, load_guide<br/>
                enter_plan_mode, exit_plan_mode, write_plan<br/>
                task_output, ask_user
              </div>
            </div>

            {/* Dangerous Tools */}
            <div className="p-5 bg-gray-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                Dangerous Tools (Require Approval)
              </h3>
              <p className="text-gray-700 mb-3">Operations that can modify files or have side effects:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
                bash, shell, run, run_in_dir<br/>
                write, edit, multi_edit<br/>
                run_background, kill_task<br/>
                send_email, post, delete, remove
              </div>
            </div>

            {/* Unknown Tools */}
            <div className="p-5 bg-gray-50 border border-gray-500/30 rounded-lg">
              <h3 className="font-semibold text-gray-600 mb-3">Unknown Tools</h3>
              <p className="text-gray-700">Tools not in either list are treated as safe (no approval needed).</p>
            </div>
          </div>
        </section>

        {/* Config-Based Auto-Approval */}
        <section className="mb-12">
          <h2 className="heading-2">Config-Based Auto-Approval</h2>
          <p className="text-gray-700 mb-6">
            Auto-approve safe commands permanently via <code className="px-2 py-1 bg-gray-100 text-gray-700 rounded">host.yaml</code> configuration. Config permissions never expire and apply to all sessions.
          </p>

          <h3 className="heading-3 mt-6">Configuration Example</h3>
          <CodeWithResult
            code={`# .co/host.yaml
permissions:
  # Simple tool name - matches any call
  "read_file":
    allowed: true
    source: config
    reason: safe read operation
    expires:
      type: never

  # Exact bash command
  "Bash(git status)":
    allowed: true
    source: config
    reason: safe git read
    expires:
      type: never

  # Wildcard - matches command prefix
  "Bash(git diff *)":
    allowed: true
    source: config
    reason: safe git diff
    expires:
      type: never

  # Parameter matching - file pattern
  "write":
    allowed: true
    source: config
    reason: safe doc edits
    when:
      file_path: "*.md"
    expires:
      type: never`}
            language="yaml"
          />

          <h3 className="heading-3 mt-8">Pattern Types</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Simple Tool Name</h4>
              <p className="text-sm text-gray-600 mb-3">Matches any call to the tool</p>
              <code className="text-xs text-gray-700">"read_file"</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Exact Bash Command</h4>
              <p className="text-sm text-gray-600 mb-3">Only matches exact command</p>
              <code className="text-xs text-gray-700">"Bash(git status)"</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Wildcard Bash Command</h4>
              <p className="text-sm text-gray-600 mb-3">Matches command prefix</p>
              <code className="text-xs text-gray-700">"Bash(git diff *)"</code>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-2">Parameter Matching</h4>
              <p className="text-sm text-gray-600 mb-3">Uses 'when' field for granular control</p>
              <code className="text-xs text-gray-700">when: {'{file_path: "*.md"}'}</code>
            </div>
          </div>

          <h3 className="heading-3 mt-8">Priority Order</h3>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-semibold">1.</span>
                <div>
                  <strong>Safe tools</strong> - Always approved (SAFE_TOOLS list)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="icon-ui font-semibold">2.</span>
                <div>
                  <strong>Config permissions</strong> - Loaded from host.yaml (<code className="text-xs">source: config</code>)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-500 font-semibold">3.</span>
                <div>
                  <strong>Skill permissions</strong> - Temporary, turn-scoped (<code className="text-xs">source: skill</code>)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-semibold">4.</span>
                <div>
                  <strong>Session approvals</strong> - User approved for session (<code className="text-xs">source: user</code>)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-900 font-semibold">5.</span>
                <div>
                  <strong>Runtime approval</strong> - Ask user (if none of above match)
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Bash Command Chain Permissions */}
        <section className="mb-12">
          <h2 className="heading-2">Bash Command Chain Permissions</h2>
          <p className="text-gray-700 mb-6">
            Uses <strong className="text-gray-400">bashlex</strong> to parse and validate command chains - ALL commands must be permitted.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">✅ All Permitted</h3>
              <CodeWithResult
                code={`# Config:
permissions:
  "Bash(pwd)": {allowed: true}
  "Bash(ls *)": {allowed: true}

# Command:
pwd && ls -F

# Result: Auto-approved ⚡`}
                language="yaml"
              />
            </div>

            <div className="p-5 bg-red-900/20 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">❌ Partial Permission</h3>
              <CodeWithResult
                code={`# Config:
permissions:
  "Bash(pwd)": {allowed: true}
  # rm is NOT whitelisted

# Command:
pwd && rm -rf /

# Result: Requires approval ⚠️`}
                language="yaml"
              />
            </div>
          </div>

          <h3 className="heading-3 mt-8">Supported Syntax</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 text-gray-700">Syntax</th>
                  <th className="text-left p-3 text-gray-700">Example</th>
                  <th className="text-left p-3 text-gray-700">Commands Extracted</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-800">
                  <td className="p-3"><code>&&</code></td>
                  <td className="p-3"><code>pwd && ls</code></td>
                  <td className="p-3"><code>["pwd", "ls"]</code></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3"><code>||</code></td>
                  <td className="p-3"><code>test -f file || echo no</code></td>
                  <td className="p-3"><code>["test", "echo"]</code></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3"><code>|</code></td>
                  <td className="p-3"><code>cat file | grep test</code></td>
                  <td className="p-3"><code>["cat", "grep"]</code></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3"><code>;</code></td>
                  <td className="p-3"><code>echo a; echo b</code></td>
                  <td className="p-3"><code>["echo", "echo"]</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-red-900/20 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-2">Security</h4>
            <p className="text-gray-700">
              <strong>Whitelist-first:</strong> One dangerous command = whole chain rejected.
            </p>
            <div className="mt-3 bg-red-50 border border-red-200 rounded p-3 font-mono text-sm text-red-700">
              # ❌ REJECTED even though pwd is safe<br/>
              pwd && rm -rf /
            </div>
          </div>
        </section>

        {/* Client Protocol */}
        <section className="mb-12">
          <h2 className="heading-2">Client Protocol</h2>

          <h3 className="heading-3">Server sends</h3>
          <CodeWithResult
            code={`{
  "type": "approval_needed",
  "tool": "bash",
  "arguments": {"command": "npm install"},
  "batch_remaining": [{"tool": "write", "arguments": "..."}]
}`}
            language="json"
          />

          <h3 className="heading-3 mt-6">Client responds</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <CodeWithResult
              code={`{"approved": true, "scope": "once"}`}
              language="json"
            />
            <CodeWithResult
              code={`{"approved": true, "scope": "session"}`}
              language="json"
            />
            <CodeWithResult
              code={`{"approved": false, "mode": "reject_soft", "feedback": "Use yarn instead"}`}
              language="json"
            />
            <CodeWithResult
              code={`{"approved": false, "mode": "reject_hard", "feedback": "Wrong approach"}`}
              language="json"
            />
          </div>

          <h3 className="heading-3 mt-8">Approval Scopes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 text-gray-700">Scope</th>
                  <th className="text-left p-3 text-gray-700">Behavior</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-800">
                  <td className="p-3"><code>once</code></td>
                  <td className="p-3">Approve this call only</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3"><code>session</code></td>
                  <td className="p-3">Approve for rest of session (stored in memory)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="heading-2">See Also</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/features/permissions" className="p-6 bg-gray-50 border border-gray-200 hover:border-gray-400 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">Permissions System</h3>
              <p className="text-sm text-gray-600">Complete permission system overview</p>
            </Link>
            <Link href="/useful-plugins/skills" className="p-6 bg-gray-50 border border-gray-200 hover:border-gray-400/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">Skills Plugin</h3>
              <p className="text-sm text-gray-600">Pre-packaged workflows with scoped permissions</p>
            </Link>
            <Link href="/useful-plugins/shell-approval" className="p-6 bg-gray-50 border border-gray-200 hover:border-orange-500/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">shell_approval</h3>
              <p className="text-sm text-gray-600">Terminal-based approval for shell commands</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
