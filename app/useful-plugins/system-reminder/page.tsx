'use client'

import React from 'react'
import { HiOutlineChatBubbleBottomCenterText, HiOutlineArrowRight, HiOutlineCodeBracket, HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineDocumentText } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function SystemReminderPluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'system_reminder' },
          ]}
          icon={HiOutlineChatBubbleBottomCenterText}
          iconColor="icon-ui"
          title="system_reminder"
          description="Inject contextual guidance into tool results"
          markdownPath="/useful-plugins/system_reminder.md"
          markdownFilename="system-reminder.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-gray-700 mb-6">
            The <code className="bg-gray-100 px-2 py-1 rounded">system_reminder</code> plugin injects contextual guidance into tool results to nudge agent behavior—without extra API calls.
          </p>
          <div className="p-4 bg-teal-900/20 border border-teal-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineLightBulb className="w-5 h-5 text-gray-400" />
              <h3 className="font-semibold">Example: After writing code</h3>
            </div>
            <CodeWithResult
              code={`write_file("app.py", code)
    ↓
Result: "File written successfully"
    ↓
With system reminder: "File written successfully

    <system-reminder>
    Consider running tests to verify your changes.
    This is a gentle reminder - ignore if not applicable.
    </system-reminder>"`}
              language="text"
            />
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import system_reminder

agent = Agent("assistant", tools=[write_file], plugins=[system_reminder])`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-400"><code className="bg-gray-100 px-2 py-1 rounded">co copy system_reminder</code></Link> to get an editable copy with built-in reminders.
          </p>
        </section>

        {/* How it works */}
        <section className="mb-12">
          <h2 className="heading-2">How it works</h2>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
            <pre className="text-gray-700 overflow-x-auto">{`┌─────────────────────────────────────────────┐
│          SYSTEM REMINDER FLOW                │
├─────────────────────────────────────────────┤
│                                             │
│  1. Tool executes (e.g., write_file)        │
│                 ↓                           │
│  2. after_each_tool event fires             │
│                 ↓                           │
│  3. Plugin checks triggers:                 │
│     - tool name matches?                    │
│     - path pattern matches?                 │
│                 ↓                           │
│  4. If match: append system reminder        │
│                 ↓                           │
│  5. LLM sees result + system reminder       │
│                                             │
└─────────────────────────────────────────────┘`}</pre>
          </div>
        </section>

        {/* Reminder Categories */}
        <section className="mb-12">
          <h2 className="heading-2">Reminder Categories</h2>
          <p className="text-gray-700 mb-4">Based on Claude Code patterns, system reminders fall into five categories:</p>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Category</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Purpose</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2 font-semibold text-gray-700">Workflow Nudges</td>
                  <td className="py-2 text-gray-700">Gentle best practice suggestions</td>
                  <td className="py-2 text-gray-700">&quot;Consider running tests&quot;</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2 font-semibold text-gray-700">State Notifications</td>
                  <td className="py-2 text-gray-700">Inform about state changes</td>
                  <td className="py-2 text-gray-700">&quot;You exited plan mode&quot;</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2 font-semibold text-gray-700">External Events</td>
                  <td className="py-2 text-gray-700">React to external changes</td>
                  <td className="py-2 text-gray-700">&quot;File was modified by linter&quot;</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2 font-semibold text-gray-700">Next Steps</td>
                  <td className="py-2 text-gray-700">Guide what to do next</td>
                  <td className="py-2 text-gray-700">&quot;Verify your implementation&quot;</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-gray-700">Context Injection</td>
                  <td className="py-2 text-gray-700">Provide relevant info</td>
                  <td className="py-2 text-gray-700">&quot;This file contains secrets&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* File Format */}
        <section className="mb-12">
          <h2 className="heading-2">Reminder File Format</h2>
          <p className="text-gray-700 mb-4">
            Each system reminder is a markdown file with YAML frontmatter:
          </p>
          <CodeWithResult
            code={`---
name: test-reminder
triggers:
  - tool: write_file
    path_pattern: "*.py"
---

<system-reminder>
Consider running tests to verify your changes.
This is a gentle reminder - ignore if not applicable.
</system-reminder>`}
            language="markdown"
          />
          <h3 className="heading-3 mt-6">Frontmatter Fields</h3>
          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="text-left py-2 text-gray-700">Field</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Required</th>
                  <th scope="col" className="text-left py-2 text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code className="text-gray-400">name</code></td>
                  <td className="py-2 text-gray-700">Yes</td>
                  <td className="py-2 text-gray-700">Unique identifier</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code className="text-gray-400">triggers</code></td>
                  <td className="py-2 text-gray-700">Yes</td>
                  <td className="py-2 text-gray-700">List of trigger conditions</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code className="text-gray-400">triggers[].tool</code></td>
                  <td className="py-2 text-gray-700">No</td>
                  <td className="py-2 text-gray-700">Tool name to match</td>
                </tr>
                <tr className="border-b border-gray-200/50">
                  <td className="py-2"><code className="text-gray-400">triggers[].path_pattern</code></td>
                  <td className="py-2 text-gray-700">No</td>
                  <td className="py-2 text-gray-700">Glob pattern(s) for file paths</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-gray-400">triggers[].command_pattern</code></td>
                  <td className="py-2 text-gray-700">No</td>
                  <td className="py-2 text-gray-700">Glob pattern(s) for commands</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Customizing */}
        <section className="mb-12">
          <h2 className="heading-2">Customizing</h2>
          <p className="text-gray-700 mb-4">
            Copy the plugin and built-in reminders to your project:
          </p>
          <CodeWithResult
            code={`co copy system_reminder`}
            result={`✓ Copied: ./plugins/system_reminder.py
✓ Copied: ./prompts/system-reminders/`}
            language="bash"
          />
          <p className="text-gray-700 mt-4 mb-4">
            This creates:
          </p>
          <CodeWithResult
            code={`./plugins/system_reminder.py
./prompts/system-reminders/
├── test-reminder.md
└── security-warning.md`}
            language="text"
          />
          <p className="text-gray-700 mt-4">
            Then import from your local copy and add new reminders:
          </p>
          <CodeWithResult
            code={`from plugins.system_reminder import system_reminder
agent = Agent("assistant", plugins=[system_reminder])`}
            language="python"
          />
        </section>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 className="heading-2">Design Principles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Gentle, Not Forceful</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ &quot;Consider running tests&quot;</li>
                <li>✗ &quot;You MUST run tests now&quot;</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Contextual, Not Spammy</h3>
              <p className="text-sm text-gray-700">Fire only when relevant, not after every tool call</p>
            </div>
          </div>
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
                  <td className="py-2"><code className="text-gray-400">after_each_tool</code></td>
                  <td className="py-2">inject_reminder</td>
                  <td className="py-2 text-gray-700">Append matching reminder to tool result</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-gray-700 mb-4">
            <code className="bg-gray-100 px-2 py-1 rounded">connectonion/useful_plugins/system_reminder.py</code>
          </p>
          <CodeWithResult
            code={`# The plugin is just a list of event handlers
system_reminder = [inject_reminder]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
