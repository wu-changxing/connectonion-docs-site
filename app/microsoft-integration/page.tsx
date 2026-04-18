'use client'

import Link from 'next/link'
import { HiOutlineEnvelope, HiOutlineCalendar, HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineBolt, HiOutlineLockClosed } from 'react-icons/hi2'
import { FaMicrosoft, FaStar } from 'react-icons/fa'
import { CommandBlock } from '../../components/CommandBlock'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'

export default function MicrosoftIntegrationPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-4 h-4" />
          <span className="text-gray-900">Microsoft Integration</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-200">
                <FaMicrosoft className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="heading-1">Microsoft Integration</h1>
                <p className="text-lg text-gray-700">
                  Send emails via Outlook and read calendar events from your AI agents. 30-second setup.
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/integrations/microsoft.md" filename="microsoft.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 text-yellow-400" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-8 border border-gray-700 mb-8">
            <CommandBlock commands={['co auth microsoft']} />

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">What happens:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
                <li>Opens browser to Microsoft OAuth consent screen</li>
                <li>You authorize Mail + Calendar permissions</li>
                <li>Credentials saved to <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">.env</code> (both local and global <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">~/.co/keys.env</code>)</li>
                <li>Ready to use Outlook and Calendar tools immediately</li>
              </ol>
            </div>
          </div>

          <div className="text-center">
            <p className="text-green-400 font-semibold text-xl flex items-center justify-center gap-2">
              <FaStar className="text-yellow-400" />
              That's it. Your agents can now send emails via Outlook and read your Microsoft calendar.
            </p>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="heading-2">Prerequisites</h2>
          <p className="text-gray-700 mb-6">
            Before running <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">co auth microsoft</code>, you must authenticate with OpenOnion:
          </p>
          <CommandBlock commands={['co auth']} />
          <p className="text-gray-700 mt-4">
            This creates your <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">OPENONION_API_KEY</code> which is required for Microsoft OAuth to work.
          </p>
        </section>

        {/* What Gets Saved */}
        <section className="mb-16">
          <h2 className="heading-2">What Gets Saved</h2>
          <p className="text-gray-700 mb-6">
            After successful authentication, your <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">.env</code> file contains:
          </p>

          <CodeWithResult
            code={`# Microsoft OAuth Credentials
MICROSOFT_ACCESS_TOKEN=eyJ0eXAi...
MICROSOFT_REFRESH_TOKEN=0.ATcA...
MICROSOFT_TOKEN_EXPIRES_AT=2025-12-31T23:59:59
MICROSOFT_SCOPES=Mail.Read,Mail.Send,Calendars.Read,Calendars.ReadWrite
MICROSOFT_EMAIL=your.email@outlook.com`}
            language="bash"
            fileName=".env"
          />

          <div className="mt-8 bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HiOutlineLockClosed className="w-5 h-5 text-purple-400" />
              Security notes
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Credentials are saved to both local <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">.env</code> and <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">~/.co/keys.env</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>File permissions set to <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">0600</code> (read/write for owner only) on Unix systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>Access tokens expire, but refresh tokens allow automatic renewal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                <span>You can revoke access anytime via Microsoft Account settings</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Permissions Requested */}
        <section className="mb-16">
          <h2 className="heading-2">Permissions Requested</h2>
          <p className="text-gray-700 mb-6">
            When you run <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">co auth microsoft</code>, we request these Microsoft Graph API scopes:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 font-semibold text-gray-900">Scope</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Purpose</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">What agents can do</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-purple-400">Mail.Read</td>
                  <td className="py-3 px-4">Read user emails</td>
                  <td className="py-3 px-4">Read inbox, search emails</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-purple-400">Mail.Send</td>
                  <td className="py-3 px-4">Send emails on your behalf</td>
                  <td className="py-3 px-4">Send emails via Outlook</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-purple-400">Calendars.Read</td>
                  <td className="py-3 px-4">Read calendar events</td>
                  <td className="py-3 px-4">Read your calendar to check availability</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-purple-400">Calendars.ReadWrite</td>
                  <td className="py-3 px-4">Create/modify events</td>
                  <td className="py-3 px-4">Create and update calendar events</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-purple-400">User.Read</td>
                  <td className="py-3 px-4">Get your profile</td>
                  <td className="py-3 px-4">Identify which Microsoft account is connected</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-900/20 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
              <HiOutlineShieldCheck className="w-5 h-5" />
              Privacy First
            </h3>
            <p className="text-gray-700 mb-4">We only request the permissions needed. We cannot:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                <span>Delete your emails</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                <span>Access your OneDrive or other services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                <span>Access your contacts beyond basic profile</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Using Microsoft OAuth in Agents */}
        <section className="mb-16">
          <h2 className="heading-2">Using Microsoft OAuth in Agents</h2>
          <p className="text-gray-700 mb-8">Once authenticated, your agents can use Microsoft-powered tools:</p>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineEnvelope className="w-5 h-5 text-purple-400" />
                Send Email via Outlook
              </h3>
              <CodeWithResult
                code={`from connectonion import Agent, Outlook

outlook = Outlook()

agent = Agent(
    "Outlook Assistant",
    tools=[outlook]
)

agent.input("Send an email to alice@example.com saying hello")`}
                language="python"
                fileName="outlook_agent.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineCalendar className="w-5 h-5 text-purple-400" />
                Read Calendar Events
              </h3>
              <CodeWithResult
                code={`from connectonion import Agent, MicrosoftCalendar

calendar = MicrosoftCalendar()

agent = Agent(
    "Calendar Assistant",
    tools=[calendar]
)

agent.input("What's on my calendar this week?")`}
                language="python"
                fileName="calendar_agent.py"
              />
            </div>
          </div>
        </section>

        {/* Outlook Tool Methods */}
        <section className="mb-16">
          <h2 className="heading-2">Outlook Tool Methods</h2>
          <p className="text-gray-700 mb-6">
            The <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">Outlook</code> tool provides these capabilities:
          </p>

          <CodeWithResult
            code={`from connectonion import Outlook

outlook = Outlook()

# Reading emails
outlook.read_inbox(last=10, unread=False)  # Get recent inbox emails
outlook.get_sent_emails(max_results=10)    # Get sent emails
outlook.search_emails("quarterly report")   # Search all emails
outlook.get_email_body(email_id)           # Get full email content

# Sending emails
outlook.send(to="alice@example.com", subject="Hello", body="Hi there!")
outlook.send(to="alice@example.com", subject="Hello", body="Hi!", cc="bob@example.com")
outlook.reply(email_id, body="Thanks for your message")

# Actions
outlook.mark_read(email_id)     # Mark email as read
outlook.mark_unread(email_id)   # Mark email as unread
outlook.archive_email(email_id) # Move to archive folder

# Stats
outlook.count_unread()          # Count unread emails in inbox
outlook.get_my_email()          # Get connected Microsoft email address`}
            language="python"
            fileName="outlook_methods.py"
          />
        </section>

        {/* Microsoft Calendar Tool Methods */}
        <section className="mb-16">
          <h2 className="heading-2">Microsoft Calendar Tool Methods</h2>
          <p className="text-gray-700 mb-6">
            The <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">MicrosoftCalendar</code> tool provides:
          </p>

          <CodeWithResult
            code={`from connectonion import MicrosoftCalendar

calendar = MicrosoftCalendar()

# Reading events
calendar.list_events(days_ahead=7, max_results=20)  # Get upcoming events
calendar.get_today_events()                          # Get today's events
calendar.get_event(event_id)                         # Get event details

# Creating events
calendar.create_event(
    title="Team Meeting",
    start_time="2025-01-15 14:00",
    end_time="2025-01-15 15:00",
    description="Weekly sync",
    attendees="alice@example.com,bob@example.com",
    location="Conference Room A"
)

# Create Teams meeting (with auto-generated meeting link)
calendar.create_teams_meeting(
    title="Project Sync",
    start_time="2025-01-15 14:00",
    end_time="2025-01-15 15:00",
    attendees="alice@example.com,bob@example.com"
)

# Updating & deleting
calendar.update_event(event_id, title="Updated Title")
calendar.delete_event(event_id)

# Meetings & availability
calendar.get_upcoming_meetings(days_ahead=7)   # Get events with attendees
calendar.find_free_slots("2025-01-15", duration_minutes=60)  # Find free time
calendar.check_availability("2025-01-15 14:00")  # Check if specific time is free`}
            language="python"
            fileName="calendar_methods.py"
          />
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="heading-2">Troubleshooting</h2>

          <div className="space-y-8">
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-400">"Not authenticated with OpenOnion"</h3>
              <p className="text-gray-700 mb-4">You need to run <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">co auth</code> first to get your <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm">OPENONION_API_KEY</code>:</p>
              <CommandBlock commands={['co auth', 'co auth microsoft']} />
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Authorization Timeout</h3>
              <p className="text-gray-700 mb-4">If the browser window doesn't complete authorization within 5 minutes:</p>
              <CommandBlock commands={['co auth microsoft']} />
              <p className="text-sm text-gray-400 mt-2">The command polls the backend every 5 seconds waiting for your authorization.</p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Credentials Not Working</h3>
              <p className="text-gray-700 mb-4">Check if credentials are properly saved:</p>
              <CodeWithResult
                code={`# Check local .env
cat .env | grep MICROSOFT_

# Check global keys
cat ~/.co/keys.env | grep MICROSOFT_`}
                language="bash"
                fileName="terminal"
              />
              <p className="text-gray-700 mt-4 mb-2">If credentials exist but don't work, re-authenticate:</p>
              <CommandBlock commands={['co auth microsoft']} />
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">Revoke Access</h3>
              <p className="text-gray-700 mb-4">To disconnect your Microsoft account:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  <span>Go to <a href="https://account.live.com/consent/Manage" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Account Permissions</a></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  <span>Find "OpenOnion" and click "Remove"</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-16">
          <h2 className="heading-2">Google vs Microsoft</h2>
          <p className="text-gray-700 mb-6">
            Both integrations follow the same CLI pattern:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Google</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Microsoft</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Command</td>
                  <td className="py-3 px-4 font-mono text-sm">co auth google</td>
                  <td className="py-3 px-4 font-mono text-sm">co auth microsoft</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Email</td>
                  <td className="py-3 px-4">Gmail</td>
                  <td className="py-3 px-4">Outlook</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">Calendar</td>
                  <td className="py-3 px-4">Google Calendar</td>
                  <td className="py-3 px-4">Microsoft Calendar</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4">API</td>
                  <td className="py-3 px-4">Google APIs</td>
                  <td className="py-3 px-4">Microsoft Graph API</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
