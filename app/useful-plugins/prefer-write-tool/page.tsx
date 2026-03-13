'use client'

import React from 'react'
import { HiOutlineShieldExclamation, HiOutlineCommandLine, HiOutlineDocumentText, HiOutlinePencil, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2'
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
          description="Block bash file operations, remind agent to use proper tools instead"
          markdownPath="/useful-plugins/prefer-write-tool.md"
          markdownFilename="prefer-write-tool.md"
        />

        {/* Problem */}
        <section className="mb-12">
          <h2 className="heading-2">Problem</h2>
          <p className="text-slate-100 mb-6">
            AI models often use bash commands for file operations:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-red-900/20 border border-red-500/30 rounded-lg">
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

            <div className="p-5 bg-red-900/20 border border-red-500/30 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                File Reading
              </h3>
              <CodeWithResult
                code={`cat config.json
head -n 10 README.md`}
                language="bash"
              />
            </div>
          </div>

          <div className="mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-5">
            <h3 className="font-semibold text-yellow-300 mb-3">Why This is an Anti-Pattern</h3>
            <ul className="space-y-2 text-slate-100">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                Bypasses proper tool UI/diffs/approval flow
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                Escaping issues with special characters
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                Harder to review and track changes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                No line numbers or formatting for reading
              </li>
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-12">
          <h2 className="heading-2">Solution</h2>
          <p className="text-slate-100 mb-6">
            This plugin detects bash file operations <strong className="text-orange-300">before execution</strong> and rejects them with a system reminder telling the agent to use the proper tools (read_file, write, edit).
          </p>
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
            <div className="p-5 bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg">
              <h3 className="font-semibold text-red-300 mb-4 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                File Creation (blocked)
              </h3>
              <div className="space-y-2 font-mono text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <code>cat &lt;&lt;EOF &gt; file.py</code> - heredoc redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <code>echo "..." &gt; file.py</code> - output redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <code>printf "..." &gt; file.py</code> - printf redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <code>cmd &gt; file</code> - any output redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <code>cmd &gt;&gt; file</code> - append redirection
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">•</span>
                  <code>tee file.py</code> - tee command
                </div>
              </div>
            </div>

            {/* File Reading */}
            <div className="p-5 bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-500/30 rounded-lg">
              <h3 className="font-semibold text-orange-300 mb-4 flex items-center gap-2">
                <HiOutlineXCircle className="w-5 h-5" />
                File Reading (blocked)
              </h3>
              <div className="space-y-2 font-mono text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">•</span>
                  <code>cat file.txt</code> - read file contents
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">•</span>
                  <code>head file.txt</code> - read first lines
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">•</span>
                  <code>tail file.log</code> - read last lines
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">•</span>
                  <code>less file.txt</code> - page through file
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400">•</span>
                  <code>more file.txt</code> - page through file
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens */}
        <section className="mb-12">
          <h2 className="heading-2">What Happens</h2>
          <p className="text-slate-100 mb-6">
            When detected, the tool is rejected and the agent receives a system reminder:
          </p>

          <div className="space-y-6">
            {/* For file creation */}
            <div>
              <h3 className="heading-3">For file creation</h3>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 font-mono text-sm">
                <pre className="text-slate-100 whitespace-pre-wrap">{`Bash file creation blocked.

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
              <h3 className="heading-3">For file reading</h3>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 font-mono text-sm">
                <pre className="text-slate-100 whitespace-pre-wrap">{`Bash file reading blocked.

<system-reminder>
You tried to read a file using bash. This is blocked.

Use the read_file tool instead:
  read_file(file_path="/path/to/file.txt")

Why: read_file provides line numbers, proper formatting, and better control.
</system-reminder>`}</pre>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-900/20 border border-green-500/30 rounded-lg p-5">
            <h3 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
              <HiOutlineCheckCircle className="w-5 h-5" />
              Result
            </h3>
            <p className="text-slate-100">
              The agent will then use the proper tools (read_file, write, edit).
            </p>
          </div>
        </section>

        {/* Combining with tool_approval */}
        <section className="mb-12">
          <h2 className="heading-2">Combining with tool_approval</h2>
          <p className="text-slate-100 mb-6">
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
          <div className="mt-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">⚠️ Order Matters</h3>
            <p className="text-slate-100">
              <code className="px-2 py-1 bg-gray-800 rounded text-orange-300">prefer_write_tool</code> should come first to block file creation before <code className="px-2 py-1 bg-gray-800 rounded text-green-300">tool_approval</code> prompts for approval.
            </p>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="heading-2">See Also</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/useful-plugins/tool-approval" className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-green-500/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">tool_approval</h3>
              <p className="text-sm text-slate-300">Web-based approval for dangerous tools</p>
            </Link>
            <Link href="/features/permissions" className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all group">
              <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">Permissions System</h3>
              <p className="text-sm text-slate-300">Complete permission system overview</p>
            </Link>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
