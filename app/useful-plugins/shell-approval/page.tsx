'use client'

import React from 'react'
import { HiOutlineShieldCheck, HiOutlineArrowRight, HiOutlineCommandLine, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ShellApprovalPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'shell_approval' },
          ]}
          icon={HiOutlineShieldCheck}
          iconColor="icon-ui"
          title="shell_approval"
          description="Require user approval before executing shell commands"
          markdownPath="/useful-plugins/shell_approval.md"
          markdownFilename="shell-approval.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            Before executing shell commands, this plugin:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCheckCircle className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold">Auto-approves safe commands</h3>
              </div>
              <p className="text-sm text-gray-700">Read-only commands like <code>ls</code>, <code>cat</code>, <code>git status</code> execute without prompts.</p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineXCircle className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold">Asks approval for other commands</h3>
              </div>
              <p className="text-sm text-gray-700">Commands that modify files, install packages, or have side effects require user confirmation.</p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import shell_approval

def run_command(command: str) -> str:
    """Execute a shell command."""
    import subprocess
    return subprocess.check_output(command, shell=True).decode()

agent = Agent("devops", tools=[run_command], plugins=[shell_approval])

agent.input("List files then delete test.txt")`}
            result={`[Tool: run_command("ls")]  # Auto-approved (safe)
file1.txt  test.txt  readme.md

┌─ Shell Command ────────────────────┐
│ rm test.txt                        │
└────────────────────────────────────┘
Execute this command?
> Yes, execute
> Auto approve 'rm' in this session
> Skip, let agent figure it out
> Stop, tell agent what I want`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy shell_approval</code></Link> to get an editable copy.
          </p>
        </section>

        {/* Safe Commands */}
        <section className="mb-12">
          <h2 className="heading-2">Safe Commands (Auto-Approved)</h2>
          <p className="text-gray-700 mb-4">
            These read-only commands are automatically approved:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-500 mb-2">File Operations</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code>ls</code>, <code>ll</code></li>
                <li><code>cat</code>, <code>head</code>, <code>tail</code></li>
                <li><code>less</code>, <code>more</code></li>
                <li><code>find</code>, <code>fd</code></li>
                <li><code>grep</code>, <code>rg</code></li>
                <li><code>tree</code>, <code>wc</code></li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-500 mb-2">Git (Read-Only)</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code>git status</code></li>
                <li><code>git log</code></li>
                <li><code>git diff</code></li>
                <li><code>git show</code></li>
                <li><code>git branch</code></li>
                <li><code>git remote</code></li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-500 mb-2">System Info</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code>pwd</code>, <code>whoami</code></li>
                <li><code>env</code>, <code>printenv</code></li>
                <li><code>uname</code>, <code>hostname</code></li>
                <li><code>df</code>, <code>du</code>, <code>free</code></li>
                <li><code>ps</code>, <code>top</code></li>
                <li><code>which</code>, <code>file</code></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Approval Options */}
        <section className="mb-12">
          <h2 className="heading-2">Approval Options</h2>
          <p className="text-gray-700 mb-4">
            When prompted for approval, you can:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <span className="text-gray-500 font-mono">1.</span>
              <div>
                <strong className="text-gray-900">Yes, execute</strong>
                <p className="text-sm text-gray-700">Execute this specific command</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <span className="text-gray-500 font-mono">2.</span>
              <div>
                <strong className="text-gray-900">Auto approve '{'{cmd}'}'</strong>
                <p className="text-sm text-gray-700">Auto-approve all commands starting with this (e.g., all <code>rm</code> commands for this session)</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <span className="text-gray-500 font-mono">3.</span>
              <div>
                <strong className="text-gray-900">Skip, let agent figure it out</strong>
                <p className="text-sm text-gray-700">Soft reject — this tool call is skipped, the loop continues, and the agent is nudged to ask what you'd prefer</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg flex items-start gap-3">
              <span className="text-gray-500 font-mono">4.</span>
              <div>
                <strong className="text-gray-900">Stop, tell agent what I want</strong>
                <p className="text-sm text-gray-700">Hard reject — prompts you for feedback right away and halts the current tool batch</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>
          <CodeWithResult
            code={`@before_each_tool
def _check_approval(agent):
    pending = agent.current_session.get('pending_tool')
    if not pending:
        return

    # Only check bash/shell tools
    if pending['name'] not in ('bash', 'shell', 'run', 'run_in_dir'):
        return

    command = pending['arguments'].get('command', '')
    base_cmd = command.strip().split()[0] if command.strip() else ''

    # Skip if this command type was auto-approved
    approved_cmds = agent.current_session.get('shell_approved_cmds', set())
    if base_cmd in approved_cmds:
        return

    # Skip if safe read-only command
    if _is_safe(command):
        return

    # Show command and ask for approval
    choice = pick("Execute this command?", [
        "Yes, execute",
        f"Auto approve '{base_cmd}' in this session",
        "Skip, let agent figure it out",
        "Stop, tell agent what I want",
    ])

    if choice == "Yes, execute":
        return
    elif choice.startswith("Auto approve"):
        agent.current_session.setdefault('shell_approved_cmds', set()).add(base_cmd)
        return
    elif choice.startswith("Skip"):
        raise ValueError(f"User rejected command '{base_cmd}'.")  # soft reject, loop continues
    else:
        feedback = input("What do you want the agent to do instead? ")
        raise ValueError(f"User feedback: {feedback}")`}
            language="python"
          />
        </section>

        {/* Events used */}
        <section className="mb-12">
          <h2 className="heading-2">Events Used</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Event</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Handler</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2"><code className="text-gray-700">before_each_tool</code></td>
                  <td className="py-2">_check_approval</td>
                  <td className="py-2 text-gray-700">Check and prompt before shell commands</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-gray-700">
            <code className="bg-gray-100 px-2 py-1 rounded">connectonion/useful_plugins/shell_approval.py</code>
          </p>
          <CodeWithResult
            code={`# The plugin is just a list with one event handler
shell_approval = [before_each_tool(_check_approval)]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
