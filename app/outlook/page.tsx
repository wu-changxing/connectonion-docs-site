'use client'

import Link from 'next/link'
import { HiOutlineEnvelope, HiOutlineInbox, HiOutlineMagnifyingGlass, HiOutlineArchiveBox, HiOutlineChartBar, HiOutlineArrowRight, HiOutlineBolt, HiOutlinePaperAirplane, HiOutlineArrowUturnLeft } from 'react-icons/hi2'
import { FaMicrosoft } from 'react-icons/fa'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'
import { PageHeader } from '../../components/PageHeader'

export default function OutlookPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Outlook' }
          ]}
          icon={HiOutlineEnvelope}
          iconColor="text-blue-400"
          iconBgFrom="from-blue-600/20"
          iconBgTo="to-cyan-600/20"
          iconBorderColor="border-blue-500/30"
          title="Outlook"
          description="Give your agents full Outlook access via Microsoft Graph API. Read, search, send, and manage emails."
          markdownPath="/outlook.md"
          markdownFilename="outlook.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 text-yellow-400" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <CodeWithResult
            code={`from connectonion import Agent, Outlook

outlook = Outlook()
agent = Agent("assistant", tools=[outlook])

agent.input("Show me my recent emails")
agent.input("Send an email to alice@example.com saying hello")`}
            language="python"
            fileName="quickstart.py"
          />
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="heading-2">Setup</h2>

          <p className="text-slate-100 mb-4">Authenticate with Microsoft:</p>
          <CommandBlock commands={['co auth microsoft']} />

          <p className="text-slate-100 mt-4">Your agent can now read and manage Outlook emails.</p>
        </section>

        {/* Agent Methods - Reading */}
        <section className="mb-16">
          <h2 className="heading-2">Agent Methods</h2>

          <div className="space-y-12">
            {/* Reading */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineInbox className="w-5 h-5 text-blue-400" />
                Reading Emails
              </h3>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
                  <h4 className="font-semibold text-blue-300 font-mono mb-2">read_inbox(last=10, unread=False)</h4>
                  <p className="text-slate-100 text-sm mb-4">Read emails from inbox</p>
                  <ul className="text-sm text-slate-100 space-y-1">
                    <li><code className="bg-gray-800 px-1 rounded">last</code> - Number of emails (default: 10)</li>
                    <li><code className="bg-gray-800 px-1 rounded">unread</code> - Only unread emails (default: False)</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
                  <h4 className="font-semibold text-blue-300 font-mono mb-2">get_sent_emails(max_results=10)</h4>
                  <p className="text-slate-100 text-sm">Get emails you sent</p>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
                  <h4 className="font-semibold text-blue-300 font-mono mb-2">get_email_body(email_id)</h4>
                  <p className="text-slate-100 text-sm">Get full email content with headers</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineMagnifyingGlass className="w-5 h-5 text-green-400" />
                Search
              </h3>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
                <h4 className="font-semibold text-green-300 font-mono mb-2">search_emails(query, max_results=10)</h4>
                <p className="text-slate-100 text-sm mb-4">Search emails using Microsoft Graph search</p>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-slate-100 mb-2">Example queries:</p>
                  <ul className="text-sm text-slate-100 space-y-1 font-mono">
                    <li>"quarterly report"</li>
                    <li>"meeting notes"</li>
                    <li>"invoice"</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sending */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlinePaperAirplane className="w-5 h-5 text-emerald-400" />
                Sending Emails
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
                  <h4 className="font-semibold text-emerald-300 font-mono mb-2">send(to, subject, body, cc=None, bcc=None)</h4>
                  <p className="text-slate-100 text-sm mb-4">Send email via Microsoft Graph API</p>
                  <ul className="text-sm text-slate-100 space-y-1">
                    <li><code className="bg-gray-800 px-1 rounded">to</code> - Recipient email (comma-separated for multiple)</li>
                    <li><code className="bg-gray-800 px-1 rounded">subject</code> - Email subject</li>
                    <li><code className="bg-gray-800 px-1 rounded">body</code> - Email body (plain text)</li>
                    <li><code className="bg-gray-800 px-1 rounded">cc</code> - Optional CC recipients</li>
                    <li><code className="bg-gray-800 px-1 rounded">bcc</code> - Optional BCC recipients</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
                  <h4 className="font-semibold text-emerald-300 font-mono mb-2">reply(email_id, body)</h4>
                  <p className="text-slate-100 text-sm">Reply to an existing email</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineArchiveBox className="w-5 h-5 text-purple-400" />
                Actions
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-4">
                  <h4 className="font-semibold text-purple-300 font-mono text-sm mb-1">mark_read(email_id)</h4>
                  <p className="text-slate-100 text-xs">Mark email as read</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-4">
                  <h4 className="font-semibold text-purple-300 font-mono text-sm mb-1">mark_unread(email_id)</h4>
                  <p className="text-slate-100 text-xs">Mark email as unread</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-4">
                  <h4 className="font-semibold text-purple-300 font-mono text-sm mb-1">archive_email(email_id)</h4>
                  <p className="text-slate-100 text-xs">Move email to archive folder</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <HiOutlineChartBar className="w-5 h-5 text-cyan-400" />
                Stats
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-4">
                  <h4 className="font-semibold text-cyan-300 font-mono text-sm mb-1">count_unread()</h4>
                  <p className="text-slate-100 text-xs">Count unread emails in inbox</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-4">
                  <h4 className="font-semibold text-cyan-300 font-mono text-sm mb-1">get_my_email()</h4>
                  <p className="text-slate-100 text-xs">Get connected Microsoft email address</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example */}
        <section className="mb-16">
          <h2 className="heading-2">Complete Example</h2>

          <CodeWithResult
            code={`from connectonion import Agent, Outlook, Memory

outlook = Outlook()
memory = Memory()

agent = Agent(
    name="email-assistant",
    tools=[outlook, memory],
    system_prompt="You help manage Outlook emails and remember important info."
)

# Various tasks your agent can now do:
agent.input("Check unread emails and summarize them")
agent.input("Send an email to alice@example.com about the project update")
agent.input("Find all emails about the quarterly report")
agent.input("How many unread emails do I have?")`}
            language="python"
            fileName="complete_example.py"
          />
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="heading-2">Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-red-300 mb-2">Missing Microsoft Mail scopes</h4>
              <p className="text-slate-100 text-sm">Run <code className="bg-gray-800 px-2 py-0.5 rounded">co auth microsoft</code></p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-red-300 mb-2">Credentials not found</h4>
              <p className="text-slate-100 text-sm">Run <code className="bg-gray-800 px-2 py-0.5 rounded">co auth microsoft</code></p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-red-300 mb-2">Token expired</h4>
              <p className="text-slate-100 text-sm">Tokens auto-refresh. If issues persist, run <code className="bg-gray-800 px-2 py-0.5 rounded">co auth microsoft</code> again.</p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="heading-2">Related</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/microsoft-integration" className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-blue-500/50 transition-all">
              <h4 className="font-semibold text-blue-300 mb-1">Microsoft Integration</h4>
              <p className="text-slate-100 text-sm">Full OAuth setup and calendar integration</p>
            </Link>
            <Link href="/gmail" className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 hover:border-red-500/50 transition-all">
              <h4 className="font-semibold text-red-300 mb-1">Gmail</h4>
              <p className="text-slate-100 text-sm">Gmail integration for Google users</p>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
