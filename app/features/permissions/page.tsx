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
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 font-mono text-sm overflow-x-auto shadow-xl">
            <pre className="text-slate-100 whitespace-pre">{`┌─────────────────────────────────────────────────────────────┐
│ 1. SAFE_TOOLS - Always auto-approved                       │
│    FileTools.read_file, FileTools.glob, FileTools.grep     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Skills - Temporary scoped permissions (one turn)         │
│    /commit → auto-approve git commands for this turn only  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Plan Mode - Auto-edit in planning phase                 │
│    Edit tool auto-approved when agent.is_planning=True     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Session Memory - Remember user decisions                │
│    User approved bash once → auto-approve for session      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Tool Approval - Ask user for dangerous operations       │
│    bash, edit, write → require explicit user approval      │
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
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
            <p className="text-slate-100 mb-4">
              All permissions use the same 4-field structure, stored in <code className="px-2 py-1 bg-gray-800 rounded text-purple-300">session['permissions']</code>
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
            code={`session['permissions'] = {
    "read_file": {
        "allowed": True,
        "source": "safe",
        "reason": "read-only operation",
        "expires": {"type": "never"}
    },
    "Bash(git *)": {
        "allowed": True,
        "source": "skill",
        "reason": "commit skill (turn 5)",
        "expires": {"type": "turn_end"}
    },
    "bash:pytest": {
        "allowed": True,
        "source": "user",
        "reason": "approved for session",
        "expires": {"type": "session_end"}
    }
}`}
            language="python"
          />
        </section>

        {/* Snapshot/Restore Mechanism */}
        <section className="mb-12">
          <h2 className="heading-2">Snapshot/Restore - Preserving User Approvals</h2>
          <p className="text-slate-100 mb-6">
            Skills use a <strong className="text-purple-300">snapshot → grant → restore</strong> pattern to ensure user approvals are never lost:
          </p>

          <div className="space-y-6">
            {/* Visual Flow */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-300 font-semibold">1</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Turn 3: User Approves</h3>
                    <p className="text-sm text-slate-300">User approves <code className="px-2 py-1 bg-gray-800 rounded text-green-300">bash:pytest</code> for session</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-300 font-semibold">2</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Turn 5: /commit Skill</h3>
                    <div className="text-sm text-slate-300 space-y-2">
                      <div>📸 <strong>Snapshot</strong> current permissions (bash:pytest saved)</div>
                      <div>➕ <strong>Grant</strong> skill permissions (git commands added)</div>
                      <div>⚡ <strong>Execute</strong> tools with both user + skill permissions</div>
                      <div>🔄 <strong>Restore</strong> snapshot when turn ends</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-300 font-semibold">3</div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Turn 6: Continue</h3>
                    <div className="text-sm text-slate-300 space-y-1">
                      <div>✅ <code className="px-2 py-1 bg-gray-800 rounded text-green-300">bash:pytest</code> still works (user approval preserved)</div>
                      <div>❌ <code className="px-2 py-1 bg-gray-800 rounded text-red-300">git status</code> requires approval (skill cleared)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <CodeWithResult
              code={`# Turn 3: User approved bash:pytest for session
session['permissions'] = {
    "bash:pytest": {
        "allowed": True,
        "source": "user",
        "reason": "approved for session",
        "expires": {"type": "session_end"}
    }
}

# Turn 5: User types /commit
# Step 1: Take snapshot
snapshot = deepcopy(session['permissions'])  # bash:pytest saved ✓

# Step 2: Grant skill permissions
session['permissions']['Bash(git status)'] = {
    "allowed": True,
    "source": "skill",
    "reason": "commit skill (turn 5)",
    "expires": {"type": "turn_end"}
}

# During turn 5:
# → git status - auto-approved ✓ (skill permission)
# → bash:pytest - auto-approved ✓ (user permission)

# Turn 5 ends
# Step 3: Restore snapshot
session['permissions'] = snapshot  # User's bash:pytest preserved ✓`}
              language="python"
            />
          </div>

          <div className="mt-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
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
          <p className="text-slate-100 mb-4">Read-only operations that can't harm the system:</p>
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
          <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-slate-100">
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
          <p className="text-slate-100 mb-4">
            Skills provide one-turn auto-approval with automatic cleanup. Perfect for workflows like git commits, deployments, or reviews.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg hover:border-purple-400/50 transition-all">
              <HiOutlineLockClosed className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-purple-300 mb-2">Turn-Based</h3>
              <p className="text-sm text-slate-300">Permissions tied to specific turn number</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-lg hover:border-blue-400/50 transition-all">
              <HiOutlineKey className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="font-semibold text-blue-300 mb-2">Auto-Cleanup</h3>
              <p className="text-sm text-slate-300">Cleared when turn completes</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-lg hover:border-green-400/50 transition-all">
              <HiOutlineShieldCheck className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="font-semibold text-green-300 mb-2">Secure</h3>
              <p className="text-sm text-slate-300">No permission escalation across turns</p>
            </div>
          </div>
          <div>
            <Link href="/useful-plugins/skills" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all">
              Learn more about Skills →
            </Link>
          </div>
        </section>

        {/* Session Memory */}
        <section className="mb-12">
          <h2 className="heading-2">4. Session Memory - Remember User Decisions</h2>
          <p className="text-slate-100 mb-4">
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
            <Link href="/useful-plugins/skills" className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">Skills Plugin</h3>
              <p className="text-sm text-slate-300">Pre-packaged workflows with automatic permissions</p>
            </Link>
            <Link href="/concepts/skills" className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">Skills Concepts</h3>
              <p className="text-sm text-slate-300">Complete skills documentation</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
