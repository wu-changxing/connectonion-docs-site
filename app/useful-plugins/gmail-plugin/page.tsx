'use client'

import React from 'react'
import { HiOutlineEnvelope, HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineUsers, HiOutlinePaperAirplane } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function GmailPluginPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Plugins', href: '/useful-plugins' },
            { label: 'gmail_plugin' },
          ]}
          icon={HiOutlineEnvelope}
          iconColor="text-red-400"
          iconBgFrom="from-red-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-red-500/30"
          title="gmail_plugin"
          description="Email approval and CRM sync for Gmail operations"
          markdownPath="/useful-plugins/gmail-plugin.md"
          markdownFilename="gmail-plugin.md"
        />

        {/* What it does */}
        <section className="mb-12">
          <h2 className="heading-2">What it does</h2>
          <p className="text-slate-100 mb-6">
            The gmail_plugin provides two features for Gmail-powered agents:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineCheckCircle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold">Email Approval (before_each_tool)</h3>
              </div>
              <p className="text-sm text-slate-100">Shows a preview and asks for confirmation before sending any email.</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineUsers className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">CRM Sync (after_each_tool)</h3>
              </div>
              <p className="text-sm text-slate-100">After sending, updates contact's <code>last_contact</code> date in the CRM.</p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import Agent, Gmail
from connectonion.useful_plugins import gmail_plugin

gmail = Gmail()  # Requires OAuth setup: co auth google

agent = Agent("email_assistant", tools=[gmail], plugins=[gmail_plugin])

agent.input("Send an email to john@example.com about the meeting tomorrow")`}
            result={`┌─ Email to Send ────────────────────────┐
│ To: john@example.com                   │
│ Subject: Meeting Tomorrow              │
│                                        │
│ Hi John,                               │
│                                        │
│ This is a reminder about our meeting   │
│ scheduled for tomorrow...              │
└────────────────────────────────────────┘
Send this email?
> Yes, send it
> Auto approve emails to 'john@example.com'
> Auto approve all emails this session

[Sending...]
CRM updated: john@example.com`}
            language="python"
          />
          <p className="text-slate-100 mt-4 text-sm">
            Want to customize? Run <code className="bg-gray-800 px-2 py-1 rounded">co copy gmail_plugin</code> to get an editable copy.
          </p>
        </section>

        {/* Approval Options */}
        <section className="mb-12">
          <h2 className="heading-2">Approval Options</h2>

          <h3 className="heading-3">For New Emails</h3>
          <div className="space-y-3 mb-6">
            <div className="p-3 bg-gray-800/50 rounded-lg flex items-start gap-3">
              <HiOutlinePaperAirplane className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Yes, send it</strong>
                <p className="text-sm text-slate-100">Send this specific email</p>
              </div>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg flex items-start gap-3">
              <HiOutlinePaperAirplane className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Auto approve emails to '{'{recipient}'}'</strong>
                <p className="text-sm text-slate-100">Auto-approve all emails to this recipient for this session</p>
              </div>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg flex items-start gap-3">
              <HiOutlinePaperAirplane className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Auto approve all emails this session</strong>
                <p className="text-sm text-slate-100">Skip approval for all emails (use with caution)</p>
              </div>
            </div>
          </div>

          <h3 className="heading-3">For Replies</h3>
          <p className="text-slate-100 mb-4">
            When replying to threads, you get similar options plus "Auto approve all replies this session".
          </p>
        </section>

        {/* CRM Integration */}
        <section className="mb-12">
          <h2 className="heading-2">CRM Integration</h2>
          <p className="text-slate-100 mb-4">
            After each successful email send, the plugin automatically updates the contact's CRM data:
          </p>
          <CodeWithResult
            code={`@after_each_tool
def sync_crm_after_send(agent):
    trace = agent.current_session['trace'][-1]

    # Only after successful email sends
    if trace['tool_name'] not in ('send', 'reply'):
        return
    if trace['status'] != 'success':
        return

    to = trace['arguments'].get('to', '')
    if not to:
        return

    # Access Gmail instance via agent.tools.gmail
    gmail = agent.tools.gmail
    today = datetime.now().strftime('%Y-%m-%d')

    # Update last_contact date, clear next_contact_date
    gmail.update_contact(to, last_contact=today, next_contact_date='')`}
            language="python"
          />
        </section>

        {/* Events used */}
        <section className="mb-12">
          <h2 className="heading-2">Events Used</h2>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-slate-100">Event</th>
                  <th className="text-left py-2 text-slate-100">Handler</th>
                  <th className="text-left py-2 text-slate-100">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><code className="text-red-300">before_each_tool</code></td>
                  <td className="py-2">check_email_approval</td>
                  <td className="py-2 text-slate-100">Preview and approve emails</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-red-300">after_each_tool</code></td>
                  <td className="py-2">sync_crm_after_send</td>
                  <td className="py-2 text-slate-100">Update CRM after send</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/gmail" className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
              <strong className="text-white">Gmail Tool</strong>
              <p className="text-sm text-slate-100">Learn about the Gmail tool itself</p>
            </Link>
            <Link href="/useful-plugins/calendar-plugin" className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
              <strong className="text-white">Calendar Plugin</strong>
              <p className="text-sm text-slate-100">Similar approval flow for calendar events</p>
            </Link>
          </div>
        </section>

        {/* Source */}
        <section className="mb-12">
          <h2 className="heading-2">Source</h2>
          <p className="text-slate-100">
            <code className="bg-gray-800 px-2 py-1 rounded">connectonion/useful_plugins/gmail_plugin.py</code>
          </p>
          <CodeWithResult
            code={`# Bundle both handlers as plugin
gmail_plugin = [
    check_email_approval,
    sync_crm_after_send,
]`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
