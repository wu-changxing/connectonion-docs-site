'use client'

import React from 'react'
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineKey, HiOutlineCube, HiOutlineDocumentText } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function PermissionsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Features', href: '/' },
            { label: 'Permissions' },
          ]}
          icon={HiOutlineShieldCheck}
          iconColor="text-green-400"
          iconBgFrom="from-green-600/20"
          iconBgTo="to-teal-600/20"
          iconBorderColor="border-green-500/30"
          title="Permissions"
          description="Balance safety and automation with unified permission system"
          markdownPath="/permissions.md"
          markdownFilename="permissions.md"
        />

        {/* Permission Layers */}
        <section className="mb-12">
          <h2 className="heading-2">Permission Layers</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-sm overflow-x-auto shadow-xl">
            <pre className="text-gray-700 whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
│ 1. SAFE_TOOLS - Always auto-approved                       │
│    read_file, glob, grep (read-only operations)            │
│    Stored as: source='safe', expires='never'               │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Config Permissions - Project-level auto-approve         │
│    host.yaml: Bash(git status), write(*.md), etc.          │
│    Stored as: source='config', expires='never'             │
│    Pattern: Bash() → 'bash' with when:{command: '...'}     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Skills - Temporary scoped permissions (one turn)         │
│    /commit → auto-approve git commands for this turn only  │
│    Stored as: source='skill', expires='turn_end'           │
│    Preserves user approvals via snapshot/restore           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. User Approvals - Tool-level session memory              │
│    User approves 'bash' once → ALL bash commands allowed   │
│    Stored as: source='user', expires='session_end'         │
│    TOOL-LEVEL: Approving "bash npm" = approve ALL bash     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Tool Approval - Ask user for dangerous operations       │
│    bash, edit, write → require explicit user approval      │
│    If no permission in unified dict → ask user             │
└─────────────────────────────────────────────────────────────┘`}</pre>
          </div>
        </section>

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
    plugins=[skills, tool_approval]
)

# Safe tools - auto-approved
agent.input("Read the README")
# → read_file auto-approved ✓

# Skills - scoped permissions
# User types: /commit
# → git commands auto-approved for this turn only ✓
# → Turn ends, permissions cleared ✓`}
            language="python"
          />
        </section>

        {/* Unified Permission Structure */}
        <section className="mb-12">
          <h2 className="heading-2">Unified Permission Structure</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              All permissions use the same 4-field structure, stored in <code className="px-2 py-1 bg-gray-800 rounded text-gray-400">session['permissions']</code>
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineShieldCheck className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-300">allowed</span>
                </div>
                <p className="text-sm text-slate-300">True/False - Is this tool allowed?</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineCube className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-blue-300">source</span>
                </div>
                <p className="text-sm text-slate-300">"safe" | "skill" | "user"</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineDocumentText className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-300">reason</span>
                </div>
                <p className="text-sm text-slate-300">Human-readable explanation</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineLockClosed className="w-5 h-5 text-red-400" />
                  <span className="font-semibold text-red-300">expires</span>
                </div>
                <p className="text-sm text-slate-300">"never" | "turn_end" | "session_end"</p>
              </div>
            </div>
          </div>

          <CodeWithResult
            code={`# Unified permission format - all sources use same structure:
session['permissions'] = {
    "read_file": {
        "allowed": True,
        "source": "safe",
        "reason": "read-only operation",
        "expires": {"type": "never"}
    },
    "bash": {
        "allowed": True,
        "source": "skill",
        "reason": "commit skill (turn 5)",
        "when": {"command": "git *"},  # Granular: only git commands
        "expires": {"type": "turn_end"}
    },
    "write": {
        "allowed": True,
        "source": "user",
        "reason": "approved for session",
        # NO 'when' field → matches ALL write calls (tool-level)
        "expires": {"type": "session_end"}
    }
}`}
            language="python"
          />
        </section>

        {/* Config File Format */}
        <section className="mb-12">
          <h2 className="heading-2">Config Files Use Bash() Pattern</h2>

          <p className="text-gray-700 mb-6">
            User-facing config files (<code className="px-2 py-1 bg-gray-800 rounded text-gray-400">.co/host.yaml</code>) use a friendly <code className="px-2 py-1 bg-gray-800 rounded text-green-300">Bash()</code> pattern that automatically converts to the unified format at runtime:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">User-Facing Config (.co/host.yaml)</h3>
              <CodeWithResult
                code={`permissions:
  "Bash(git status)":  # ← Natural pattern
    allowed: true
    source: config
    reason: safe git read
    expires:
      type: never`}
                language="yaml"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Runtime Format (Internal)</h3>
              <CodeWithResult
                code={`session['permissions']['bash'] = {
    "allowed": True,
    "source": "config",
    "reason": "safe git read",
    "when": {"command": "git status"},
    "expires": {"type": "never"}
}`}
                language="python"
              />
            </div>
          </div>

          <div className="bg-gray-900/20 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">
              <strong className="text-gray-400">Automatic conversion:</strong> You write <code className="px-2 py-1 bg-gray-800 rounded text-green-300">Bash(git status)</code> in config, it becomes <code className="px-2 py-1 bg-gray-800 rounded text-gray-400">bash</code> with <code className="px-2 py-1 bg-gray-800 rounded text-blue-300">when:{'{command: "git status"}'}</code> at runtime.
            </p>
          </div>
        </section>

        {/* Tool-Level vs Granular Permissions */}
        <section className="mb-12">
          <h2 className="heading-2">Tool-Level vs Granular Permissions</h2>

          <div className="bg-yellow-900/20 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
              <HiOutlineKey className="w-5 h-5" />
              Critical Difference
            </h3>
            <p className="text-gray-700 mb-4">
              User approvals are <strong className="text-yellow-300">tool-level</strong>, not command-specific. This is different from config/skill permissions.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-300 mb-2">Config/Skill Permissions: Granular</h4>
                <CodeWithResult
                  code={`# Can use 'when' field for parameter matching
session['permissions']['bash'] = {
    "source": "config",
    "when": {"command": "git status"}  # Only "git status"
}`}
                  language="python"
                />
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-300 mb-2">User Approvals: Tool-Level</h4>
                <CodeWithResult
                  code={`# When user approves "bash npm install" → Stored as:
session['permissions']['bash'] = {
    "source": "user",
    "reason": "approved for session"
    # NO 'when' field → matches ALL bash commands
}`}
                  language="python"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-300 mb-2">Why Tool-Level?</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✅ Convenience for development workflows</li>
                <li>✅ Don't re-approve every npm/pytest/git command</li>
                <li>✅ Clear intent: "I trust bash for this session"</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2">Security</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✅ Config uses granular 'when' field</li>
                <li>✅ Skills use granular 'when' field</li>
                <li>✅ User approvals are simpler</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Snapshot/Restore Mechanism */}
        <section className="mb-12">
          <h2 className="heading-2">Snapshot/Restore - Preserving User Approvals</h2>
          <p className="text-gray-700 mb-6">
            Skills use a <strong className="text-gray-400">snapshot → grant → restore</strong> pattern to ensure user approvals are never lost:
          </p>

          <div className="space-y-6">
            {/* Visual Flow */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-700 font-semibold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Turn 3: User Approves</h3>
                    <p className="text-sm text-slate-300">User approves <code className="px-2 py-1 bg-gray-800 rounded text-green-300">write</code> for session (tool-level approval)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500/20 border border-gray-400 flex items-center justify-center text-gray-400 font-semibold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Turn 5: /commit Skill</h3>
                    <div className="text-sm text-slate-300 space-y-2">
                      <div>📸 <strong>Snapshot</strong> current permissions (write saved)</div>
                      <div>➕ <strong>Grant</strong> skill permissions (bash with when:{'{command: "git *"}'} added)</div>
                      <div>⚡ <strong>Execute</strong> tools with both user + skill permissions</div>
                      <div>🔄 <strong>Restore</strong> snapshot when turn ends</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-700 font-semibold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Turn 6: Continue</h3>
                    <div className="text-sm text-slate-300 space-y-1">
                      <div>✅ <code className="px-2 py-1 bg-gray-800 rounded text-green-300">write</code> still works (user approval preserved)</div>
                      <div>❌ <code className="px-2 py-1 bg-gray-800 rounded text-red-300">bash</code> requires approval (skill cleared)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <CodeWithResult
              code={`# Turn 3: User approved write for session (tool-level)
session['permissions'] = {
    "write": {
        "allowed": True,
        "source": "user",
        "reason": "approved for session",
        # NO 'when' field → all write calls allowed
        "expires": {"type": "session_end"}
    }
}

# Turn 5: User types /commit
# Step 1: Take snapshot
snapshot = deepcopy(session['permissions'])  # write saved ✓

# Step 2: Grant skill permissions (with 'when' field for granular matching)
session['permissions']['bash'] = {
    "allowed": True,
    "source": "skill",
    "reason": "commit skill (turn 5)",
    "when": {"command": "git *"},  # Only git commands
    "expires": {"type": "turn_end"}
}

# During turn 5:
# → git status - auto-approved ✓ (skill permission matches "git *")
# → write("foo.txt") - auto-approved ✓ (user permission, no 'when' field)
# → pytest - BLOCKED ✗ (no permission for pytest)

# Turn 5 ends
# Step 3: Restore snapshot
session['permissions'] = snapshot  # User's write preserved ✓`}
              language="python"
            />
          </div>

          <div className="mt-6 bg-green-900/20 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
              <HiOutlineShieldCheck className="w-5 h-5" />
              Security Benefits
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>✅ User approvals never overwritten by skills</li>
              <li>✅ Skills add temporary permissions, don't replace</li>
              <li>✅ Clean lifecycle - snapshot/restore is predictable</li>
              <li>✅ No permission escalation across turns</li>
            </ul>
          </div>
        </section>

        {/* SAFE_TOOLS */}
        <section className="mb-12">
          <h2 className="heading-2">1. SAFE_TOOLS - Always Auto-Approved</h2>
          <p className="text-gray-700 mb-4">Read-only operations that can't harm the system:</p>
          <CodeWithResult
            code={`SAFE_TOOLS = [
    'FileTools.read_file',
    'FileTools.glob',
    'FileTools.grep',
    'ls',
    'list_directory',
    'tree'
]`}
            language="python"
          />
          <div className="mt-4 bg-blue-900/20 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-700">
              <strong className="text-blue-300">No approval needed</strong> - these tools are always safe to execute.
            </p>
          </div>

          <h3 className="heading-3 mt-6">Example</h3>
          <CodeWithResult
            code={`agent.input("Find all Python files and read main.py")
# → FileTools.glob("**/*.py") - auto-approved ✓
# → FileTools.read_file("main.py") - auto-approved ✓`}
            language="python"
          />
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="heading-2">2. Skills - Temporary Scoped Permissions</h2>
          <p className="text-gray-700 mb-4">
            Skills provide one-turn auto-approval with automatic cleanup. Perfect for workflows like git commits, deployments, or reviews.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300/50 transition-all">
              <HiOutlineLockClosed className="w-6 h-6 text-gray-500 mb-2" />
              <h3 className="font-semibold text-gray-400 mb-2">Turn-Based</h3>
              <p className="text-sm text-slate-300">Permissions tied to specific turn number</p>
            </div>
            <div className="p-4 bg-gray-50 border border-blue-200 rounded-lg hover:border-gray-400 transition-all">
              <HiOutlineKey className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="font-semibold text-blue-300 mb-2">Auto-Cleanup</h3>
              <p className="text-sm text-slate-300">Cleared when turn completes</p>
            </div>
            <div className="p-4 bg-gray-50 border border-green-200 rounded-lg hover:border-gray-400 transition-all">
              <HiOutlineShieldCheck className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="font-semibold text-green-300 mb-2">Secure</h3>
              <p className="text-sm text-slate-300">No permission escalation across turns</p>
            </div>
          </div>
          <div>
            <Link href="/useful-plugins/skills" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-500 text-white rounded-lg transition-all">
              Learn more about Skills →
            </Link>
          </div>
        </section>

        {/* Session Memory */}
        <section className="mb-12">
          <h2 className="heading-2">4. Session Memory - Remember User Decisions</h2>
          <p className="text-gray-700 mb-4">
            When you approve a tool, you can choose to remember it for the session:
          </p>
          <CodeWithResult
            code={`agent.input("Run tests")
# → bash approval needed (first time)
# → User approves for "session"
# → Future bash calls auto-approved ✓`}
            language="python"
          />
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/useful-plugins/skills" className="p-6 bg-gray-50 border border-gray-700 hover:border-gray-400/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">Skills Plugin</h3>
              <p className="text-sm text-slate-300">Pre-packaged workflows with automatic permissions</p>
            </Link>
            <Link href="/concepts/skills" className="p-6 bg-gray-50 border border-gray-700 hover:border-gray-400 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-300 transition-colors">Skills Concepts</h3>
              <p className="text-sm text-slate-300">Complete skills documentation</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
