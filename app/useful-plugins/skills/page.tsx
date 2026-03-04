'use client'

import React from 'react'
import { HiOutlineCommandLine, HiOutlineShieldCheck, HiOutlineCodeBracket } from 'react-icons/hi2'
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
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'Skills' },
          ]}
          icon={HiOutlineCommandLine}
          iconColor="text-purple-400"
          iconBgFrom="from-purple-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-purple-500/30"
          title="Skills Plugin"
          description="Pre-packaged workflows with automatic permission management"
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

file_tools = FileTools()  # Read/edit files with safety tracking
agent = Agent(
    "assistant",
    tools=[file_tools],
    plugins=[skills, tool_approval]  # skills must come before tool_approval
)

# User types: /commit
# → Skills plugin loads .co/skills/commit/SKILL.md
# → Sets temporary permission scope for git commands
# → Agent executes with auto-approved tools
# → Scope clears after turn completes`}
            language="python"
          />
        </section>

        {/* What Skills Do */}
        <section className="mb-12">
          <h2 className="heading-2">What Skills Do</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <h3 className="font-semibold text-purple-300 mb-2">Instant Invocation</h3>
              <p className="text-sm text-slate-100">/command detected in @after_user_input, no LLM overhead</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h3 className="font-semibold text-blue-300 mb-2">Scoped Permissions</h3>
              <p className="text-sm text-slate-100">Temporary tool auto-approval for skill duration</p>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-2">Security</h3>
              <p className="text-sm text-slate-100">Permissions auto-clear after turn completes</p>
            </div>
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
  - FileTools.read_file
  - FileTools.glob
---

Create a well-formatted git commit for staged changes.

1. Check status: \`git status\`
2. Review changes: \`git diff --staged\`
3. Create commit with good message`}
            language="yaml"
          />
          <p className="text-slate-100 mt-4">
            User types: <code className="bg-gray-800 px-2 py-1 rounded">/commit</code> → git commands auto-approved → commit created → permissions cleared.
          </p>
        </section>

        {/* Permission Patterns */}
        <section className="mb-12">
          <h2 className="heading-2">Permission Patterns</h2>
          <CodeWithResult
            code={`tools:
  - Bash(git status)         # Exact: only "git status"
  - Bash(git diff *)         # Wildcard: any git diff command
  - Bash(git *)              # All git commands
  - FileTools.read_file      # FileTools method (any arguments)
  - FileTools.edit           # FileTools method
  - FileTools.glob           # FileTools method`}
            language="yaml"
          />
        </section>

        {/* Security Model */}
        <section className="mb-12">
          <h2 className="heading-2">Security Model</h2>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">One-Turn Permissions</h3>
            <p className="text-slate-100 mb-4">Scope is tied to turn number:</p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <pre className="text-slate-100">{`Turn 5: User invokes /commit
  → permission_scope set with turn=5
  → git commands auto-approved during turn 5
  → Agent creates commit, turn ends
  → permission_scope cleared

Turn 6: User types "refactor the code"
  → git permissions NO LONGER active
  → Dangerous commands require approval again`}</pre>
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
  - FileTools.read_file
  - FileTools.glob
  - FileTools.grep
---

Review recent code changes and provide feedback.
EOF`}
            language="bash"
          />
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/concepts/permissions" className="p-4 bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">Permissions</h3>
              </div>
              <p className="text-sm text-slate-100">Complete permission system overview</p>
            </Link>
            <Link href="/concepts/skills" className="p-4 bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCodeBracket className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">Skills Concepts</h3>
              </div>
              <p className="text-sm text-slate-100">Detailed skills documentation</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
