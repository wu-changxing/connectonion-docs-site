'use client'

import React from 'react'
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineKey } from 'react-icons/hi2'
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
            { label: 'Concepts', href: '/' },
            { label: 'Permissions' },
          ]}
          icon={HiOutlineShieldCheck}
          iconColor="text-green-400"
          iconBgFrom="from-green-600/20"
          iconBgTo="to-teal-600/20"
          iconBorderColor="border-green-500/30"
          title="Permissions"
          description="Balance safety and automation with multiple permission mechanisms"
          markdownPath="/permissions.md"
          markdownFilename="permissions.md"
        />

        {/* Permission Layers */}
        <section className="mb-12">
          <h2 className="heading-2">Permission Layers</h2>
          <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
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
          <p className="text-slate-100 mt-4">
            <strong>No approval needed</strong> - these tools are always safe to execute.
          </p>

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
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <HiOutlineLockClosed className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-purple-300 mb-2">Turn-Based</h3>
              <p className="text-sm text-slate-100">Permissions tied to specific turn number</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <HiOutlineKey className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="font-semibold text-blue-300 mb-2">Auto-Cleanup</h3>
              <p className="text-sm text-slate-100">Cleared when turn completes</p>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <HiOutlineShieldCheck className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="font-semibold text-green-300 mb-2">Secure</h3>
              <p className="text-sm text-slate-100">No permission escalation across turns</p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/useful-plugins/skills" className="text-purple-400 hover:text-purple-300 underline">
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
            <Link href="/useful-plugins/skills" className="p-4 bg-gray-800/50 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all">
              <h3 className="font-semibold text-white mb-2">Skills Plugin</h3>
              <p className="text-sm text-slate-100">Pre-packaged workflows with automatic permissions</p>
            </Link>
            <Link href="/concepts/skills" className="p-4 bg-gray-800/50 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all">
              <h3 className="font-semibold text-white mb-2">Skills Concepts</h3>
              <p className="text-sm text-slate-100">Complete skills documentation</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
