'use client'

import React from 'react'
import { HiOutlineShieldExclamation, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineBell } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function PreferWriteToolPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'prefer_write_tool' },
          ]}
          icon={HiOutlineShieldExclamation}
          iconColor="text-orange-400"
          iconBgFrom="from-orange-600/20"
          iconBgTo="to-yellow-600/20"
          iconBorderColor="border-orange-500/30"
          title="prefer_write_tool"
          description="Block bash file creation, soft-remind for file reading"
          markdownPath="/useful-plugins/prefer_write_tool.md"
          markdownFilename="prefer-write-tool.md"
        />

        {/* Problem */}
        <section className="mb-12">
          <h2 className="heading-2">Problem</h2>
          <p className="text-gray-700 mb-6">
            AI models often use bash commands for file operations:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-red-900/20 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                File Creation
              </h3>
              <CodeWithResult
                code={`cat <<EOF > /tmp/my_script.py
import os
print("hello")
EOF`}
                language="bash"
              />
            </div>

            <div className="p-5 bg-yellow-900/20 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                <HiOutlineBell className="w-5 h-5" />
                File Reading
              </h3>
              <CodeWithResult
                code={`cat config.json
head -n 10 README.md`}
                language="bash"
              />
            </div>
          </div>

          <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-lg p-5">
            <p className="text-gray-700">
              File creation via bash bypasses tool UI/diffs/approval flow and has escaping issues.
              File reading via bash works but misses line numbers, formatting, and control that <code className="px-2 py-1 bg-gray-800 rounded text-green-300">read_file</code> provides.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-12">
          <h2 className="heading-2">Solution</h2>
          <p className="text-gray-700 mb-6">
            This plugin uses two strategies:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-red-900/20 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-2">File Creation</h3>
              <p className="text-sm text-slate-300"><strong className="text-red-300">Hard block</strong> — raises ValueError, agent must use Write or Edit tool</p>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-300 mb-2">File Reading</h3>
              <p className="text-sm text-slate-300"><strong className="text-yellow-300">Soft reminder</strong> — command runs, system reminder appended suggesting read_file</p>
            </div>
          </div>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import prefer_write_tool

agent = Agent(
    "assistant",
    tools=[bash, read_file, write, edit],
    plugins=[prefer_write_tool]
)`}
            language="python"
          />
        </section>

        {/* Detected Patterns */}
        <section className="mb-12">
          <h2 className="heading-2">Detected Patterns</h2>

          <div className="space-y-6">
            {/* File Creation */}
            <div className="p-5 bg-gray-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                File Creation (hard blocked)
              </h3>
              <div className="space-y-2 font-mono text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">&bull;</span>
                  <code>cat &lt;&lt;EOF &gt; file.py</code> - heredoc redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">&bull;</span>
                  <code>echo &quot;...&quot; &gt; file.py</code> - output redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">&bull;</span>
                  <code>printf &quot;...&quot; &gt; file.py</code> - printf redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">&bull;</span>
                  <code>cmd &gt; ./file</code> - output redirection to path
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">&bull;</span>
                  <code>cmd &gt;&gt; ./file</code> - append redirection to path
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">&bull;</span>
                  <code>tee file.py</code> - tee command
                </div>
              </div>
            </div>

            {/* File Reading */}
            <div className="p-5 bg-gray-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-300 mb-4 flex items-center gap-2">
                <HiOutlineBell className="w-5 h-5" />
                File Reading (soft reminder)
              </h3>
              <div className="space-y-2 font-mono text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">&bull;</span>
                  <code>cat file.txt</code> - standalone cat (not piped)
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">&bull;</span>
                  <code>head file.txt</code> - read first lines
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">&bull;</span>
                  <code>tail file.log</code> - read last lines
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">&bull;</span>
                  <code>less file.txt</code> - page through file
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">&bull;</span>
                  <code>more file.txt</code> - page through file
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Note: <code>cat file | grep pattern</code> (piped cat) is not detected — piping is legitimate bash usage.
              </p>
            </div>
          </div>
        </section>

        {/* What Happens */}
        <section className="mb-12">
          <h2 className="heading-2">What Happens</h2>

          <div className="space-y-6">
            {/* For file creation */}
            <div>
              <h3 className="heading-3">For file creation (blocked)</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-sm">
                <pre className="text-gray-700 whitespace-pre-wrap">{`Bash file creation blocked.

<system-reminder>
You tried to create a file using bash. This is blocked.

Use the Write tool instead:
  Write(file_path="/path/to/file.py", content="...")

For editing existing files:
  Edit(file_path="/path/to/file.py", old_string="...", new_string="...")
</system-reminder>`}</pre>
              </div>
            </div>

            {/* For file reading */}
            <div>
              <h3 className="heading-3">For file reading (soft reminder)</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 font-mono text-sm">
                <pre className="text-gray-700 whitespace-pre-wrap">{`[actual command output here]

<system-reminder>
You used bash to read a file. Consider using the read_file tool instead:
  read_file(file_path="/path/to/file.txt")

Why: read_file provides line numbers, proper formatting, and better control.
</system-reminder>`}</pre>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-900/20 border border-green-200 rounded-lg p-5">
            <h3 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
              <HiOutlineCheckCircle className="w-5 h-5" />
              Result
            </h3>
            <p className="text-gray-700">
              File creation is stopped before execution. File reading runs normally with a gentle nudge toward <code className="px-2 py-1 bg-gray-800 rounded text-green-300">read_file</code>.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="heading-2">How It Works</h2>
          <p className="text-gray-700 mb-4">
            The plugin exports two event handlers:
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <p className="text-gray-700">
                <code className="px-2 py-1 bg-gray-800 rounded text-orange-300">block_bash_file_creation</code> (<code className="text-slate-400">before_each_tool</code>) — detects file creation patterns and raises ValueError. For file reading, sets a session flag.
              </p>
            </div>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <p className="text-gray-700">
                <code className="px-2 py-1 bg-gray-800 rounded text-orange-300">remind_read_file</code> (<code className="text-slate-400">after_each_tool</code>) — if the flag is set, appends a system reminder to the tool result message.
              </p>
            </div>
          </div>
        </section>

        {/* Combining with tool_approval */}
        <section className="mb-12">
          <h2 className="heading-2">Combining with tool_approval</h2>
          <p className="text-gray-700 mb-6">
            You can use both plugins together:
          </p>
          <CodeWithResult
            code={`from connectonion.useful_plugins import tool_approval, prefer_write_tool

agent = Agent(
    "assistant",
    tools=[bash, read_file, write, edit],
    plugins=[prefer_write_tool, tool_approval]  # prefer_write_tool first
)`}
            language="python"
          />
          <div className="mt-4 bg-yellow-900/20 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Order Matters</h3>
            <p className="text-gray-700">
              <code className="px-2 py-1 bg-gray-800 rounded text-orange-300">prefer_write_tool</code> should come first to block file creation before <code className="px-2 py-1 bg-gray-800 rounded text-green-300">tool_approval</code> prompts for approval.
            </p>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="heading-2">See Also</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/useful-plugins/tool-approval" className="p-6 bg-gray-50 border border-gray-700 hover:border-gray-400 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-300 transition-colors">tool_approval</h3>
              <p className="text-sm text-slate-300">Web-based approval for dangerous tools</p>
            </Link>
            <Link href="/features/permissions" className="p-6 bg-gray-50 border border-gray-700 hover:border-gray-400/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">Permissions System</h3>
              <p className="text-sm text-slate-300">Complete permission system overview</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
