'use client'

import { HiOutlineCommandLine, HiOutlineBolt, HiOutlineCodeBracket } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function BashPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'bash' }
          ]}
          icon={HiOutlineCommandLine}
          iconColor="text-slate-400"
          iconBgFrom="from-slate-600/20"
          iconBgTo="to-gray-600/20"
          iconBorderColor="border-slate-500/30"
          title="bash"
          description="Execute bash commands from an agent. Returns stdout + stderr as a string. Unix/Mac only."
          markdownPath="/useful-tools/bash.md"
          markdownFilename="bash.md"
        />

        <div className="bg-slate-950/50 border border-slate-400/40 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-slate-100">
            The simplest way to give an agent shell access: <code className="bg-gray-800 px-2 py-1 rounded">from connectonion import bash</code> and pass it as a tool.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-yellow-400" />
            Quick Start
          </h2>
          <CodeWithResult
            code={`from connectonion import Agent, bash

agent = Agent("coder", tools=[bash])

agent.input("run the tests and show failures")
agent.input("install httpx and show the installed version")
agent.input("check git log for last 5 commits")`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-blue-400" />
            API Reference
          </h2>
          <CodeWithResult
            code={`bash(command, description, cwd=".", timeout=120)`}
            language="python"
          />

          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-100">Parameter</th>
                  <th className="text-left px-4 py-3 text-slate-100">Type</th>
                  <th className="text-left px-4 py-3 text-slate-100">Default</th>
                  <th className="text-left px-4 py-3 text-slate-100">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-300">command</td>
                  <td className="px-4 py-3 text-slate-400">str</td>
                  <td className="px-4 py-3 text-slate-400">required</td>
                  <td className="px-4 py-3 text-slate-100">Bash command to run</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-300">description</td>
                  <td className="px-4 py-3 text-slate-400">str</td>
                  <td className="px-4 py-3 text-slate-400">required</td>
                  <td className="px-4 py-3 text-slate-100">What the command does (shown to user)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-300">cwd</td>
                  <td className="px-4 py-3 text-slate-400">str</td>
                  <td className="px-4 py-3 text-slate-400">"."</td>
                  <td className="px-4 py-3 text-slate-100">Working directory</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-slate-300">timeout</td>
                  <td className="px-4 py-3 text-slate-400">int</td>
                  <td className="px-4 py-3 text-slate-400">120</td>
                  <td className="px-4 py-3 text-slate-100">Seconds before timeout (max 600)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-20">
          <h2 className="heading-2">Examples</h2>
          <CodeWithResult
            code={`from connectonion import bash

# Basic commands
bash("git status", "Check git status")
bash("python --version", "Check Python version")

# Working directory
bash("npm install", "Install packages", cwd="/path/to/project")
bash("pytest -v", "Run tests", cwd="./my-module")

# Longer timeout
bash("npm run build", "Build project", timeout=300)

# Direct call — returns output string
result = bash("git log --oneline -5", "Recent commits")
print(result)`}
            language="python"
          />
        </section>

        {/* With FileTools */}
        <section className="mb-20">
          <h2 className="heading-2">Combined with FileTools</h2>
          <p className="text-slate-100 mb-4">A common pair — FileTools for reading/editing, bash for running:</p>
          <CodeWithResult
            code={`from connectonion import Agent, bash
from connectonion.useful_tools.file_tools import FileTools

agent = Agent("coder", tools=[FileTools(), bash])

agent.input("read main.py, fix the import error, then run it to verify")`}
            language="python"
          />
        </section>

        {/* Notes */}
        <section className="mb-20">
          <div className="bg-yellow-950/50 border border-yellow-400/40 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-100 mb-3">Notes</h3>
            <div className="space-y-2 text-slate-100 text-sm">
              <p>• Output truncated at 10,000 characters to prevent token overflow</p>
              <p>• stdout and stderr are merged in the returned string</p>
              <p>• Non-zero exit codes included in output (<code className="bg-gray-800 px-1 rounded">Exit code: 1</code>)</p>
              <p>• Unix/Mac only — use <a href="/useful-tools/shell" className="text-yellow-300 hover:underline">Shell</a> for cross-platform</p>
            </div>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
