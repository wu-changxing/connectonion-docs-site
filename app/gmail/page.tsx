'use client'

import Link from 'next/link'
import { HiOutlineEnvelope, HiOutlineInbox, HiOutlineMagnifyingGlass, HiOutlineArchiveBox, HiOutlineUsers, HiOutlineChartBar, HiOutlineArrowRight, HiOutlineBolt, HiOutlineTag } from 'react-icons/hi2'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'
import { PageHeader } from '../../components/PageHeader'

export default function GmailPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Gmail' }
          ]}
          icon={HiOutlineEnvelope}
          iconColor="icon-ui"
          title="Gmail"
          description="Give your agents full Gmail access. Read, search, organize, and analyze emails."
          markdownPath="/useful_tools/gmail.md"
          markdownFilename="gmail.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 text-amber-600" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <CodeWithResult
            code={`from connectonion import Agent, Gmail

gmail = Gmail()
agent = Agent("assistant", tools=[gmail])

agent.input("Show me my recent emails")
agent.input("Find emails from alice@example.com")`}
            language="python"
            fileName="quickstart.py"
          />
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="heading-2">Setup</h2>

          <p className="text-gray-700 mb-4">Authenticate with Google:</p>
          <CommandBlock commands={['co auth google']} />

          <p className="text-gray-700 mt-4">Your agent can now read and manage Gmail.</p>
        </section>

        {/* Agent Methods - Reading */}
        <section className="mb-16">
          <h2 className="heading-2">Agent Methods</h2>

          <div className="space-y-12">
            {/* Reading */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineInbox className="w-5 h-5 text-gray-400" />
                Reading Emails
              </h3>

              <div className="space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-blue-700 font-mono mb-2">read_inbox(last=10, unread=False)</h4>
                  <p className="text-gray-700 text-sm mb-4">Read emails from inbox</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li><code className="bg-gray-100 px-1 rounded">last</code> - Number of emails (default: 10)</li>
                    <li><code className="bg-gray-100 px-1 rounded">unread</code> - Only unread emails (default: False)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-blue-700 font-mono mb-2">get_sent_emails(max_results=10)</h4>
                  <p className="text-gray-700 text-sm">Get emails you sent</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-blue-700 font-mono mb-2">get_all_emails(max_results=50)</h4>
                  <p className="text-gray-700 text-sm">Get emails from all folders (inbox, sent, archive)</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-blue-700 font-mono mb-2">get_email_body(email_id)</h4>
                  <p className="text-gray-700 text-sm">Get full email content</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-blue-700 font-mono mb-2">get_email_attachments(email_id)</h4>
                  <p className="text-gray-700 text-sm">List attachments (filename, size)</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineMagnifyingGlass className="w-5 h-5 text-green-400" />
                Search
              </h3>

              <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                <h4 className="font-semibold text-green-700 font-mono mb-2">search_emails(query, max_results=10)</h4>
                <p className="text-gray-700 text-sm mb-4">Search using Gmail query syntax</p>
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">Example queries:</p>
                  <ul className="text-sm text-gray-700 space-y-1 font-mono">
                    <li>"from:alice@example.com"</li>
                    <li>"subject:meeting"</li>
                    <li>"is:unread has:attachment"</li>
                    <li>"after:2024/01/01 before:2024/06/01"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineArchiveBox className="w-5 h-5 text-gray-500" />
                Actions
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-gray-400 font-mono text-sm mb-1">mark_read(email_id)</h4>
                  <p className="text-gray-700 text-xs">Mark email as read</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-gray-400 font-mono text-sm mb-1">mark_unread(email_id)</h4>
                  <p className="text-gray-700 text-xs">Mark email as unread</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-gray-400 font-mono text-sm mb-1">archive_email(email_id)</h4>
                  <p className="text-gray-700 text-xs">Archive email (remove from inbox)</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-gray-400 font-mono text-sm mb-1">star_email(email_id)</h4>
                  <p className="text-gray-700 text-xs">Add star to email</p>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineTag className="w-5 h-5 text-amber-600" />
                Labels
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-amber-700 font-mono text-sm mb-1">get_labels()</h4>
                  <p className="text-gray-700 text-xs">List all Gmail labels</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-amber-700 font-mono text-sm mb-1">add_label(email_id, label)</h4>
                  <p className="text-gray-700 text-xs">Add label to email</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                  <h4 className="font-semibold text-amber-700 font-mono text-sm mb-1">get_emails_with_label(label, max_results=10)</h4>
                  <p className="text-gray-700 text-xs">Get emails with specific label</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineChartBar className="w-5 h-5 text-cyan-700" />
                Stats
              </h3>

              <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-4">
                <h4 className="font-semibold text-cyan-700 font-mono text-sm mb-1">count_unread()</h4>
                <p className="text-gray-700 text-xs">Count unread emails</p>
              </div>
            </div>

            {/* CRM */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineUsers className="w-5 h-5 text-gray-500" />
                CRM Features
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-gray-500 font-mono mb-2">get_all_contacts(max_emails=500)</h4>
                  <p className="text-gray-700 text-sm mb-2">Extract all unique contacts from emails</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Fast regex-based extraction</li>
                    <li>Returns list of contacts with email and name</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
                  <h4 className="font-semibold text-gray-500 font-mono mb-2">analyze_contact(email, max_emails=50)</h4>
                  <p className="text-gray-700 text-sm mb-2">Analyze specific contact using LLM</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Provides relationship context, topics, patterns, tags</li>
                    <li>Example: <code className="bg-gray-100 px-1 rounded">gmail.analyze_contact("alice@example.com")</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="mb-16">
          <h2 className="heading-2">Complete Example</h2>

          <CodeWithResult
            code={`from connectonion import Agent, Gmail, Memory

gmail = Gmail()
memory = Memory()

agent = Agent(
    name="email-assistant",
    tools=[gmail, memory],
    system_prompt="You help manage emails and remember important info."
)

# Various tasks your agent can now do:
agent.input("Check unread emails and save important deadlines to memory")
agent.input("Archive all newsletter emails from this week")
agent.input("Find all emails from alice@example.com about the project")
agent.input("Who are my top 10 most frequent contacts?")
agent.input("Analyze my relationship with bob@company.com")`}
            language="python"
            fileName="complete_example.py"
          />
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="heading-2">Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Missing gmail.readonly scope</h4>
              <p className="text-gray-700 text-sm">Run <code className="bg-gray-900 text-green-400 px-2 py-0.5 rounded font-mono text-xs">co auth google</code></p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Credentials not found</h4>
              <p className="text-gray-700 text-sm">Run <code className="bg-gray-900 text-green-400 px-2 py-0.5 rounded font-mono text-xs">co auth google</code></p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
