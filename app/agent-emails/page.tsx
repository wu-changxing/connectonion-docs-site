'use client'

import Link from 'next/link'
import { HiOutlineEnvelope, HiOutlinePaperAirplane, HiOutlineInbox, HiOutlineArrowRight, HiOutlineBolt, HiOutlineCheck } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'
import { PageHeader } from '../../components/PageHeader'

export default function AgentEmailsPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Agent Emails' }
          ]}
          icon={HiOutlineEnvelope}
          iconColor="text-gray-500"
          iconBgFrom="from-gray-700/20"
          iconBgTo="to-blue-600/20"
          iconBorderColor="border-gray-400/30"
          title="Agent Emails"
          description="Send and receive emails with simple functions. No config, no complexity."
          badge={<span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-200">New</span>}
          markdownPath="/agent-emails.md"
          markdownFilename="agent-emails.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 text-yellow-400" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <CodeWithResult
            code={`from connectonion import send_email, get_emails

# Send an email
send_email("alice@example.com", "Hello!", "Welcome to our platform")

# Read your emails
emails = get_emails(unread=True)
for email in emails:
    print(f"{email['from']}: {email['subject']}")`}
            language="python"
            fileName="quickstart.py"
          />
        </section>

        {/* Two Capabilities */}
        <section className="mb-16">
          <h2 className="heading-2">Two Capabilities</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/agent-emails/send"
              className="bg-gradient-to-br from-gray-500/10 to-gray-500/10 rounded-xl p-6 border border-gray-200 hover:border-gray-300/50 hover:bg-gray-500/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <HiOutlinePaperAirplane className="w-6 h-6 text-gray-500" />
                <h3 className="text-2xl font-semibold group-hover:text-gray-400 transition-colors">Send Email</h3>
                <HiOutlineArrowRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-gray-700 mb-4">Send emails with zero configuration. Your agent gets a unique email address automatically.</p>
              <code className="text-sm bg-gray-800 px-3 py-1.5 rounded text-gray-400">send_email(to, subject, message)</code>
            </Link>

            <Link
              href="/agent-emails/receive"
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/50 hover:bg-blue-500/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <HiOutlineInbox className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-semibold group-hover:text-blue-300 transition-colors">Receive Emails</h3>
                <HiOutlineArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </div>
              <p className="text-gray-700 mb-4">Read emails from any IMAP inbox. Works with Gmail, Outlook, or any provider.</p>
              <code className="text-sm bg-gray-800 px-3 py-1.5 rounded text-blue-300">get_emails(last=10, unread=False)</code>
            </Link>
          </div>
        </section>

        {/* The Functions */}
        <section className="mb-16">
          <h2 className="heading-2">All Functions</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-8">
            <CodeWithResult
              code={`# Sending (via OpenOnion - zero config)
send_email(to, subject, message)     # Send an email

# Receiving (via IMAP - any provider)
get_emails(last=10, unread=False)    # Get emails from inbox
mark_read(email_id)                  # Mark as read
mark_unread(email_id)                # Mark as unread`}
              language="python"
              fileName="functions.py"
            />
          </div>
        </section>

        {/* vs Gmail */}
        <section className="mb-16">
          <h2 className="heading-2">Agent Emails vs Gmail</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/20 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-gray-400">Agent Emails (This page)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Simple functions: send_email, get_emails</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Works with any email provider (IMAP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Zero config for sending (OpenOnion)</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Best for simple automation</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-900/20 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-green-300">Gmail (OAuth)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Full Gmail class with 15+ methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Labels, archive, star, trash</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Advanced search &amp; CRM features</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Best for Gmail power users</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-700">
            Need more features? Check out <Link href="/gmail" className="text-gray-500 hover:text-gray-400 underline">Gmail</Link> for full inbox management.
          </p>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
