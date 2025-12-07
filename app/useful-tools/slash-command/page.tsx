'use client'

import { Code } from 'lucide-react'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'

export default function SlashCommandPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'Slash Command' }
          ]}
          icon={Code}
          iconColor="text-pink-400"
          iconBgFrom="from-pink-600/20"
          iconBgTo="to-purple-600/20"
          iconBorderColor="border-pink-500/30"
          title="SlashCommand"
          description="Load and execute custom commands from markdown files."
          markdownPath="/useful-tools/slash-command.md"
          markdownFilename="slash-command.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import SlashCommand

# Load command
cmd = SlashCommand.load("today")

# Get prompt
prompt = cmd.prompt

# List all commands
commands = SlashCommand.list_all()`}
            language="python"
          />
        </section>

        {/* Command File Format */}
        <section className="mb-12">
          <h2 className="heading-2">Command File Format</h2>
          <p className="text-slate-100 mb-4">Create <code className="bg-slate-800 px-2 py-1 rounded text-pink-300">.co/commands/today.md</code>:</p>
          <CodeWithResult
            code={`---
name: today
description: Daily email briefing
tools:
  - Gmail.search_emails
  - WebFetch
---
Summarize my important emails from today.
Focus on:
- Urgent requests
- Meeting invites
- Follow-ups needed`}
            language="markdown"
          />
        </section>

        {/* YAML Frontmatter */}
        <section className="mb-12">
          <h2 className="heading-2">YAML Frontmatter</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-slate-200">Field</th>
                  <th className="px-4 py-3 text-slate-200">Required</th>
                  <th className="px-4 py-3 text-slate-200">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-pink-300">name</td>
                  <td className="px-4 py-3 text-green-400">Yes</td>
                  <td className="px-4 py-3 text-slate-100">Command name</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-pink-300">description</td>
                  <td className="px-4 py-3 text-green-400">Yes</td>
                  <td className="px-4 py-3 text-slate-100">Short description</td>
                </tr>
                <tr className="bg-slate-900/30">
                  <td className="px-4 py-3 font-mono text-pink-300">tools</td>
                  <td className="px-4 py-3 text-slate-400">No</td>
                  <td className="px-4 py-3 text-slate-100">Allowed tools (all if omitted)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tool Filtering */}
        <section className="mb-12">
          <h2 className="heading-2">Tool Filtering</h2>
          <p className="text-slate-100 mb-4">Limit which tools the command can use:</p>
          <CodeWithResult
            code={`tools:
  - Gmail.search_emails    # Specific method
  - WebFetch               # Whole class
  - my_function            # Standalone function`}
            language="yaml"
          />
        </section>

        {/* Locations */}
        <section className="mb-12">
          <h2 className="heading-2">Locations</h2>
          <p className="text-slate-100 mb-4">Commands are loaded from:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-100">
            <li><code className="bg-slate-800 px-2 py-1 rounded text-pink-300">.co/commands/*.md</code> (user commands - priority)</li>
            <li><code className="bg-slate-800 px-2 py-1 rounded text-pink-300">commands/*.md</code> (built-in commands)</li>
          </ol>
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>
          <CodeWithResult
            code={`# Load single command
cmd = SlashCommand.load("today")
cmd.name          # "today"
cmd.description   # "Daily email briefing"
cmd.prompt        # "Summarize my important..."
cmd.tools         # ["Gmail.search_emails", "WebFetch"]

# Filter tools for command
filtered = cmd.filter_tools(all_tools)

# List all available commands
commands = SlashCommand.list_all()
for cmd in commands:
    print(f"/{cmd.name} - {cmd.description}")`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
