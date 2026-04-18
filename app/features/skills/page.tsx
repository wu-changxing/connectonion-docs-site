'use client'

import React from 'react'
import { HiOutlineCommandLine, HiOutlineShieldCheck, HiOutlineCodeBracket, HiOutlineCube, HiOutlineDocumentText, HiOutlineLockClosed } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function SkillsPluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Features', href: '/' },
            { label: 'Skills' },
          ]}
          icon={HiOutlineCommandLine}
          iconColor="text-gray-500"
          iconBgFrom="from-gray-700/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-gray-400/30"
          title="Skills"
          description="Pre-packaged workflows with snapshot/restore permission management"
          markdownPath="/skills.md"
          markdownFilename="skills.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import FileTools
from connectonion.useful_plugins import skills, tool_approval

file_tools = FileTools()
agent = Agent(
    "assistant",
    tools=[file_tools],
    plugins=[skills, tool_approval]  # skills must come before tool_approval
)

# User types: /commit
# → Skills plugin loads commit skill
# → Takes snapshot of current permissions
# → Grants temporary git permissions
# → Agent executes with auto-approved tools
# → Restores snapshot when turn ends`}
            language="python"
          />
        </section>

        {/* What Skills Do */}
        <section className="mb-12">
          <h2 className="heading-2">What Skills Do</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 bg-gradient-to-br from-gray-900/20 to-gray-900/10 border border-gray-200 rounded-lg hover:border-gray-300/50 transition-all">
              <HiOutlineCommandLine className="w-7 h-7 text-gray-500 mb-3" />
              <h3 className="font-semibold text-gray-400 mb-2">Instant Invocation</h3>
              <p className="text-sm text-slate-300">/command detected in @after_user_input, no LLM overhead</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-200 rounded-lg hover:border-blue-400/50 transition-all">
              <HiOutlineShieldCheck className="w-7 h-7 text-blue-400 mb-3" />
              <h3 className="font-semibold text-blue-300 mb-2">Snapshot/Restore</h3>
              <p className="text-sm text-slate-300">Preserves user approvals while granting temporary permissions</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-200 rounded-lg hover:border-green-400/50 transition-all">
              <HiOutlineLockClosed className="w-7 h-7 text-green-400 mb-3" />
              <h3 className="font-semibold text-green-300 mb-2">Security</h3>
              <p className="text-sm text-slate-300">Permissions auto-clear after turn completes</p>
            </div>
          </div>
        </section>

        {/* Unified Permission Structure */}
        <section className="mb-12">
          <h2 className="heading-2">Unified Permission Structure</h2>
          <p className="text-gray-700 mb-4">
            Skills use the same 4-field permission structure as all other permission sources:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-300">allowed</span>
              </div>
              <p className="text-sm text-slate-300">True - Tool is permitted</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCube className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-blue-300">source</span>
              </div>
              <p className="text-sm text-slate-300">"skill" - From skill invocation</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineDocumentText className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-yellow-300">reason</span>
              </div>
              <p className="text-sm text-slate-300">"commit skill (turn 5)"</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineLockClosed className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-300">expires</span>
              </div>
              <p className="text-sm text-slate-300">{`{"type": "turn_end"}`}</p>
            </div>
          </div>
          <CodeWithResult
            code={`# Skills grant permissions like this:
session['permissions']['Bash(git status)'] = {
    'allowed': True,
    'source': 'skill',
    'reason': 'commit skill (turn 5)',
    'expires': {'type': 'turn_end'}
}`}
            language="python"
          />
        </section>

        {/* Snapshot/Restore Flow */}
        <section className="mb-12">
          <h2 className="heading-2">Snapshot/Restore Flow</h2>
          <p className="text-gray-700 mb-6">
            Skills preserve user approvals using a <strong className="text-gray-400">snapshot → grant → restore</strong> pattern:
          </p>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-300 font-semibold text-lg">1</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">📸 Snapshot</h3>
                  <p className="text-sm text-slate-300 mb-2">Before granting skill permissions, save current state:</p>
                  <div className="bg-gray-950 rounded p-3 font-mono text-xs text-gray-400">
                    snapshot = deepcopy(session['permissions'])
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-500/20 border border-gray-400 flex items-center justify-center text-gray-400 font-semibold text-lg">2</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">➕ Grant</h3>
                  <p className="text-sm text-slate-300 mb-2">Add skill permissions to existing permissions:</p>
                  <div className="bg-gray-950 rounded p-3 font-mono text-xs text-green-300">
                    session['permissions']['Bash(git *)'] = {'{'}...{'}'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-300 font-semibold text-lg">3</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">⚡ Execute</h3>
                  <p className="text-sm text-slate-300">Agent runs with both user and skill permissions active</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center text-orange-300 font-semibold text-lg">4</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">🔄 Restore</h3>
                  <p className="text-sm text-slate-300 mb-2">When turn ends, restore the snapshot:</p>
                  <div className="bg-gray-950 rounded p-3 font-mono text-xs text-blue-300">
                    session['permissions'] = snapshot
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
              <HiOutlineShieldCheck className="w-6 h-6" />
              Result: User Approvals Never Lost
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✅ User's session approvals preserved across skill invocations</li>
              <li>✅ Skill permissions cleanly added and removed</li>
              <li>✅ No permission contamination between turns</li>
              <li>✅ Predictable, testable permission lifecycle</li>
            </ul>
          </div>
        </section>

        {/* Example Skill */}
        <section className="mb-12">
          <h2 className="heading-2">Example Skill</h2>
          <CodeWithResult
            code={`---
name: commit
description: Create git commits with good messages
tools:
  - Bash(git status)
  - Bash(git diff *)
  - Bash(git commit *)
  - Bash(git add *)
  - read_file
  - glob
---

Create a well-formatted git commit for staged changes.

1. Check status: \`git status\`
2. Review changes: \`git diff --staged\`
3. Create commit with descriptive message`}
            language="yaml"
          />
          <div className="mt-6 bg-gray-900/20 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">
              User types: <code className="bg-gray-800 px-2 py-1 rounded text-gray-400">/commit</code> →
              git commands auto-approved → commit created → permissions restored
            </p>
          </div>
        </section>

        {/* Permission Patterns */}
        <section className="mb-12">
          <h2 className="heading-2">Permission Patterns</h2>
          <p className="text-gray-700 mb-4">
            Skills support flexible pattern matching for tool permissions:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-300 mb-2">Exact Match</h3>
              <code className="text-sm text-slate-300">Bash(git status)</code>
              <p className="text-xs text-slate-400 mt-2">Only matches "git status"</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-400 mb-2">Wildcard Args</h3>
              <code className="text-sm text-slate-300">Bash(git diff *)</code>
              <p className="text-xs text-slate-400 mt-2">Any git diff command</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-300 mb-2">Command Prefix</h3>
              <code className="text-sm text-slate-300">Bash(git *)</code>
              <p className="text-xs text-slate-400 mt-2">All git commands</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">Tool Name</h3>
              <code className="text-sm text-slate-300">read_file</code>
              <p className="text-xs text-slate-400 mt-2">Any read_file call</p>
            </div>
          </div>
          <CodeWithResult
            code={`tools:
  - Bash(git status)         # Exact: only "git status"
  - Bash(git diff *)         # Wildcard: any git diff command
  - Bash(git *)              # Prefix: all git commands
  - read_file                # Tool name (any arguments)
  - glob                     # Tool name
  - grep                     # Tool name`}
            language="yaml"
          />
        </section>

        {/* Security Model */}
        <section className="mb-12">
          <h2 className="heading-2">Security Model - One Turn Only</h2>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <HiOutlineLockClosed className="w-6 h-6 text-red-400" />
              Turn-Based Expiration
            </h3>
            <div className="bg-gray-950 rounded-lg p-5 font-mono text-sm space-y-3">
              <div className="text-blue-300">
                <div className="text-slate-400 text-xs mb-1">Turn 3: User approves write for session (tool-level)</div>
                <div>permissions['write'] = {'{'}source: 'user', expires: 'session_end'{'}'}</div>
              </div>

              <div className="text-gray-400">
                <div className="text-slate-400 text-xs mb-1">Turn 5: /commit skill invoked</div>
                <div>→ Snapshot taken (write saved)</div>
                <div>→ Grant: permissions['bash'] = {'{'}source: 'skill', when: {'{'}command: 'git *'{'}'}, expires: 'turn_end'{'}'}</div>
              </div>

              <div className="text-green-300">
                <div className="text-slate-400 text-xs mb-1">During turn 5:</div>
                <div>→ git status ✓ (skill permission with when:{'{'}command: 'git *'{'}'})</div>
                <div>→ write("foo.txt") ✓ (user permission, tool-level)</div>
              </div>

              <div className="text-orange-300">
                <div className="text-slate-400 text-xs mb-1">Turn 5 ends (@on_complete):</div>
                <div>→ Restore snapshot</div>
                <div>→ bash permissions cleared ✓</div>
                <div>→ write preserved ✓</div>
              </div>

              <div className="text-red-300">
                <div className="text-slate-400 text-xs mb-1">Turn 6: Normal operation</div>
                <div>→ bash commands require approval ✗</div>
                <div>→ write still works ✓</div>
              </div>
            </div>
          </div>
        </section>

        {/* Creating Skills */}
        <section className="mb-12">
          <h2 className="heading-2">Creating Skills</h2>

          <h3 className="heading-3 mt-6">Project-Level (.co/skills/)</h3>
          <CodeWithResult
            code={`mkdir -p .co/skills/deploy
cat > .co/skills/deploy/SKILL.md <<'EOF'
---
name: deploy
description: Deploy to PyPI
tools:
  - Bash(pytest *)
  - Bash(python -m build)
  - Bash(python -m twine *)
---

Deploy package to PyPI after running tests.

1. Run tests to ensure quality
2. Build the package
3. Upload to PyPI
EOF`}
            language="bash"
          />

          <h3 className="heading-3 mt-8">User-Level (~/.co/skills/)</h3>
          <CodeWithResult
            code={`mkdir -p ~/.co/skills/review
cat > ~/.co/skills/review/SKILL.md <<'EOF'
---
name: review
description: Code review workflow
tools:
  - Bash(git diff *)
  - Bash(git log *)
  - read_file
  - glob
  - grep
---

Review recent code changes and provide feedback.

1. Check recent commits
2. Review diffs
3. Identify issues and suggestions
EOF`}
            language="bash"
          />
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/concepts/permissions" className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineShieldCheck className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" />
                <h3 className="font-semibold text-gray-900 group-hover:text-green-300 transition-colors">Permissions</h3>
              </div>
              <p className="text-sm text-slate-300">Complete permission system overview</p>
            </Link>
            <Link href="/concepts/skills" className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-gray-400/50 rounded-lg transition-all group">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCodeBracket className="w-6 h-6 text-gray-500 group-hover:text-gray-400 transition-colors" />
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-400 transition-colors">Skills Concepts</h3>
              </div>
              <p className="text-sm text-slate-300">Detailed skills documentation</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
