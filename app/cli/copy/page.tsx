/**
 * @purpose CLI copy command documentation
 * @context Shows how to use `co copy` to copy built-in tools, plugins, and prompt templates into the user's project for customization.
 */

'use client'

import Link from 'next/link'
import {
  HiOutlineDocumentDuplicate,
  HiOutlineBolt,
  HiOutlineCommandLine,
  HiOutlineCodeBracket,
  HiOutlineFolder,
  HiOutlineSparkles,
  HiOutlinePuzzlePiece,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { PageHeader } from '../../../components/PageHeader'

export default function CliCopyPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co copy' },
            ]}
            icon={HiOutlineDocumentDuplicate}
            iconColor="icon-ui"
            title="co copy"
            description="Copy built-in tools, plugins, and prompt templates into your project so you can customize them, learn from them, or debug their behavior."
            markdownPath="/cli/copy.md"
            markdownFilename="copy.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> <code className="bg-gray-100 px-2 py-1 rounded">co copy --list</code> to see what's available, then <code className="bg-gray-100 px-2 py-1 rounded">co copy Gmail</code> to drop a tool into your project.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>

          <CommandBlock
            commands={[
              '# See what is available',
              'co copy --list',
              '# Copy a tool',
              'co copy Gmail',
              '# Copy a plugin',
              'co copy re_act',
              '# Copy a prompt template',
              'co copy coding_agent',
            ]}
          />
        </section>

        {/* Why Copy */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineLightBulb className="w-8 h-8 text-gray-700" />
            Why Copy?
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Built-in tools work great out of the box. But sometimes you need to:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Add features</h3>
              <p className="text-gray-600 text-sm">Extend functionality for your specific use case.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Modify behavior</h3>
              <p className="text-gray-600 text-sm">Change how a tool works without forking the whole package.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600 text-sm">Study the implementation patterns of well-tested tools.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Debug</h3>
              <p className="text-gray-600 text-sm">Trace issues by stepping into source you control.</p>
            </div>
          </div>

          <p className="text-gray-600 mt-6">Copying gives you full control over the source code.</p>
        </section>

        {/* Usage */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Usage
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">List Available Items</h3>
              <CodeWithResult
                code={`co copy --list`}
                result={`                    Available Items to Copy
┏━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name                   ┃ Type   ┃ Path                      ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ gmail                  │ tool   │ gmail.py                  │
│ memory                 │ tool   │ memory.py                 │
│ shell                  │ tool   │ shell.py                  │
│ ...                    │        │                           │
│ re_act                 │ plugin │ re_act.py                 │
│ shell_approval         │ plugin │ shell_approval.py         │
│ coding_agent           │ prompt │ coding_agent/             │
└────────────────────────┴────────┴───────────────────────────┘`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Copy a Tool</h3>
              <CodeWithResult
                code={`co copy Gmail`}
                result={`Creates ./tools/gmail.py in your project.`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Copy a Plugin</h3>
              <CodeWithResult
                code={`co copy re_act`}
                result={`Creates ./plugins/re_act.py in your project.`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Copy a Prompt Template</h3>
              <CodeWithResult
                code={`co copy coding_agent`}
                result={`prompts/coding_agent/
├── prompts/
│   ├── main.md           # Core agent behavior
│   └── tools/            # Per-tool guidance
│       ├── shell.md
│       ├── read.md
│       ├── write.md
│       └── todo.md
├── assembler.py          # Prompt assembly utility
└── README.md`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Copy Multiple Items</h3>
              <CommandBlock commands={['co copy Gmail Shell memory re_act']} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Custom Destination</h3>
              <CommandBlock commands={['co copy Gmail --path ./my_tools/']} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Force Overwrite</h3>
              <CommandBlock commands={['co copy Gmail --force']} />
            </div>
          </div>
        </section>

        {/* Available Tools */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Available Tools
          </h2>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">File</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['ask_user', 'ask_user.py', 'Ask user for input during agent execution'],
                  ['bash', 'bash.py', 'Bash command execution (Unix/Mac)'],
                  ['diff_writer', 'diff_writer.py', 'File editing with diffs'],
                  ['get_emails', 'get_emails.py', 'Fetch emails from inbox'],
                  ['gmail', 'gmail.py', 'Gmail integration (OAuth, send/receive)'],
                  ['google_calendar', 'google_calendar.py', 'Google Calendar events'],
                  ['memory', 'memory.py', 'Persistent agent memory'],
                  ['microsoft_calendar', 'microsoft_calendar.py', 'Microsoft Calendar'],
                  ['outlook', 'outlook.py', 'Outlook/Microsoft email'],
                  ['send_email', 'send_email.py', 'Send emails'],
                  ['shell', 'shell.py', 'Shell command execution (cross-platform)'],
                  ['slash_command', 'slash_command.py', 'Custom command extension'],
                  ['terminal', 'terminal.py', 'Interactive terminal sessions'],
                  ['todo_list', 'todo_list.py', 'Task list management'],
                  ['web_fetch', 'web_fetch.py', 'Web scraping tool'],
                ].map(([name, file, desc]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-mono text-gray-700">{name}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{file}</td>
                    <td className="px-4 py-3 text-gray-700">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Available Plugins */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlinePuzzlePiece className="w-8 h-8 text-gray-700" />
            Available Plugins
          </h2>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">File</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['auto_compact', 'auto_compact.py', 'Auto-compress context when nearing limit'],
                  ['calendar_plugin', 'calendar_plugin.py', 'Google Calendar integration'],
                  ['eval', 'eval.py', 'Task completion evaluation'],
                  ['gmail_plugin', 'gmail_plugin.py', 'Gmail OAuth flow'],
                  ['image_result_formatter', 'image_result_formatter.py', 'Base64 image handling'],
                  ['prefer_write_tool', 'prefer_write_tool.py', 'Guide agent to prefer write tool over shell'],
                  ['re_act', 're_act.py', 'ReAct prompting pattern'],
                  ['shell_approval', 'shell_approval.py', 'User confirmation for shell commands'],
                  ['skills', 'skills.py', 'Auto-discover and load skills (.co/skills/, .claude/skills/)'],
                  ['subagents', 'subagents.py', 'Sub-agent task delegation'],
                  ['system_reminder', 'system_reminder.py', 'Inject contextual reminders into tool results'],
                  ['ui_stream', 'ui_stream.py', 'Stream agent output to UI'],
                  ['ulw', 'ulw.py', 'Ultra Light Work — autonomous continuous execution'],
                ].map(([name, file, desc]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-mono text-gray-700">{name}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{file}</td>
                    <td className="px-4 py-3 text-gray-700">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plugins with Prompts</h3>
            <p className="text-gray-700 mb-4">
              Some plugins include prompt files. These are automatically copied together:
            </p>
            <CodeWithResult
              code={`co copy system_reminder`}
              result={`./plugins/system_reminder.py
./prompts/system-reminders/
├── test-reminder.md
└── security-warning.md`}
              language="bash"
            />
          </div>
        </section>

        {/* After Copying */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineFolder className="w-8 h-8 text-gray-700" />
            After Copying
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Update Your Imports</h3>
              <CodeWithResult
                code={`# Before (from package)
from connectonion import Gmail

# After (from your copy)
from tools.gmail import Gmail`}
                language="python"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Customize the Code</h3>
              <p className="text-gray-700 mb-4">Now you have full control:</p>
              <CodeWithResult
                code={`# tools/gmail.py — your copy, modify freely!

class Gmail:
    def send(self, to, subject, body):
        # Add your custom logic here
        self.log_to_my_system(to, subject)  # Your addition
        # ... rest of original code`}
                language="python"
              />
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Options
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Option</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Short</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--list</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-l</td>
                  <td className="px-4 py-3 text-gray-700">List available tools and plugins</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--path</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-p</td>
                  <td className="px-4 py-3 text-gray-700">Custom destination path</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-600">--force</td>
                  <td className="px-4 py-3 font-mono text-gray-500">-f</td>
                  <td className="px-4 py-3 text-gray-700">Overwrite existing files</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Examples
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Customize Gmail Tool</h3>
              <CodeWithResult
                code={`# Copy Gmail tool
co copy gmail

# Edit your copy at tools/gmail.py`}
                language="bash"
              />
              <div className="mt-4">
                <CodeWithResult
                  code={`# agent.py
from tools.gmail import Gmail  # Use your customized version

agent = Agent("emailer", tools=[Gmail()])`}
                  language="python"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Create Custom Plugin</h3>
              <CodeWithResult
                code={`# Copy re_act as a starting point
co copy re_act

# Modify plugins/re_act.py for your needs`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Copy All Email Tools</h3>
              <CommandBlock commands={['co copy gmail outlook']} />
            </div>
          </div>
        </section>

        {/* TUI Components */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Available TUI Components
          </h2>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">File</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['chat', 'chat.py', 'Chat interface component'],
                  ['divider', 'divider.py', 'Visual divider component'],
                  ['dropdown', 'dropdown.py', 'Dropdown selector'],
                  ['footer', 'footer.py', 'Footer bar component'],
                  ['fuzzy', 'fuzzy.py', 'Fuzzy search component'],
                  ['input', 'input.py', 'Text input component'],
                  ['keys', 'keys.py', 'Key binding handler'],
                  ['pick', 'pick.py', 'Item picker component'],
                  ['providers', 'providers.py', 'Model provider selector'],
                  ['status_bar', 'status_bar.py', 'Status bar component'],
                ].map(([name, file, desc]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-mono text-gray-700">{name}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{file}</td>
                    <td className="px-4 py-3 text-gray-700">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Available Prompts */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Available Prompts
          </h2>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Directory</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">coding_agent</td>
                  <td className="px-4 py-3 font-mono text-gray-600">coding_agent/</td>
                  <td className="px-4 py-3 text-gray-700">Modular prompt template for coding assistants</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">cc_prompt</td>
                  <td className="px-4 py-3 font-mono text-gray-600">cc_prompt/</td>
                  <td className="px-4 py-3 text-gray-700">Claude Code system prompt — 250 prompt pieces organized by category</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Trust Policies */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-700" />
            Available Trust Policies
          </h2>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">File</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">trust/open</td>
                  <td className="px-4 py-3 font-mono text-gray-600">open.md</td>
                  <td className="px-4 py-3 text-gray-700">Development — allow all requests</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">trust/careful</td>
                  <td className="px-4 py-3 font-mono text-gray-600">careful.md</td>
                  <td className="px-4 py-3 text-gray-700">Testing — whitelist + LLM for unknowns</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">trust/strict</td>
                  <td className="px-4 py-3 font-mono text-gray-600">strict.md</td>
                  <td className="px-4 py-3 text-gray-700">Production — whitelist only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Inline Prev/Next Navigation */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/cli/init"
              className="group flex flex-col gap-1.5 px-5 py-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm rounded-xl transition-all"
            >
              <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-gray-600 transition-colors">
                <HiOutlineArrowLeft className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-widest">Previous</span>
              </div>
              <div className="text-[11px] text-gray-500 font-mono">CLI</div>
              <div className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors leading-snug">co init</div>
            </Link>

            <Link
              href="/cli/browser-command"
              className="group flex flex-col gap-1.5 px-5 py-4 bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-400 hover:shadow-sm rounded-xl transition-all sm:items-end sm:text-right"
            >
              <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-gray-600 transition-colors sm:flex-row-reverse">
                <HiOutlineArrowRight className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-widest">Next</span>
              </div>
              <div className="text-[11px] text-gray-500 font-mono">CLI</div>
              <div className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors leading-snug">co browser</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
