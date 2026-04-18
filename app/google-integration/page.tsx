'use client'

import Link from 'next/link'
import { HiOutlineEnvelope, HiOutlineCalendar, HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineBolt, HiOutlineLockClosed } from 'react-icons/hi2'
import { FaGoogle, FaStar } from 'react-icons/fa'
import { CommandBlock } from '../../components/CommandBlock'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'

export default function GoogleIntegrationPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
          <Link href="/" className="hover:text-gray-500 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-4 h-4" />
          <span className="text-gray-900">Google Integration</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                <FaGoogle className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h1 className="heading-1">Google Integration</h1>
                <p className="text-lg text-gray-700">
                  Send emails via Gmail and read calendar events from your AI agents. 30-second setup.
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/integrations/google.md" filename="google.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 text-gray-500" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-xl p-8 border border-gray-200 mb-8">
            <CommandBlock commands={['co auth google']} />
            
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">What happens:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
                <li>Opens browser to Google OAuth consent screen</li>
                <li>You authorize Gmail Send + Calendar Read permissions</li>
                <li>Credentials saved to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.env</code> (both local and global <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~/.co/keys.env</code>)</li>
                <li>Ready to use Gmail and Calendar tools immediately</li>
              </ol>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 font-semibold text-xl flex items-center justify-center gap-2">
              <FaStar className="text-gray-500" />
              That's it. Your agents can now send emails and read your calendar.
            </p>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="heading-2">Prerequisites</h2>
          <p className="text-gray-700 mb-6">
            Before running <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">co auth google</code>, you must authenticate with OpenOnion:
          </p>
          <CommandBlock commands={['co auth']} />
          <p className="text-gray-700 mt-4">
            This creates your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">OPENONION_API_KEY</code> which is required for Google OAuth to work.
          </p>
        </section>

        {/* What Gets Saved */}
        <section className="mb-16">
          <h2 className="heading-2">What Gets Saved</h2>
          <p className="text-gray-700 mb-6">
            After successful authentication, your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.env</code> file contains:
          </p>

          <CodeWithResult 
            code={`# Google OAuth Credentials
GOOGLE_ACCESS_TOKEN=ya29.a0A...
GOOGLE_REFRESH_TOKEN=1//0g...
GOOGLE_TOKEN_EXPIRES_AT=2025-12-31T23:59:59
GOOGLE_SCOPES=gmail.send,calendar.readonly
GOOGLE_EMAIL=your.email@gmail.com`}
            language="bash"
            fileName=".env"
          />

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HiOutlineLockClosed className="w-5 h-5 text-gray-500" />
              Security notes
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>Credentials are saved to both local <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.env</code> and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~/.co/keys.env</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>File permissions set to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">0600</code> (read/write for owner only) on Unix systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>Access tokens expire, but refresh tokens allow automatic renewal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                <span>You can revoke access anytime via Google Account settings or the dashboard</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Permissions Requested */}
        <section className="mb-16">
          <h2 className="heading-2">Permissions Requested</h2>
          <p className="text-gray-700 mb-6">
            When you run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">co auth google</code>, we request these Google scopes:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900">Scope</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Purpose</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">What agents can do</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-gray-500">gmail.send</td>
                  <td className="py-3 px-4">Send emails on your behalf</td>
                  <td className="py-3 px-4">Use <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">send_email()</code> tool to send emails</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-gray-500">calendar.readonly</td>
                  <td className="py-3 px-4">Read calendar events</td>
                  <td className="py-3 px-4">Read your calendar to check availability</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-sm text-gray-500">userinfo.email</td>
                  <td className="py-3 px-4">Get your email address</td>
                  <td className="py-3 px-4">Identify which Google account is connected</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-500">
              <HiOutlineShieldCheck className="w-5 h-5" />
              Privacy First
            </h3>
            <p className="text-gray-700 mb-4">We only request the minimum permissions needed. We cannot:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                <span>Read your inbox (use built-in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">get_emails()</code> for that)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                <span>Delete or modify calendar events</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✕</span>
                <span>Access your Google Drive or other services</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Using Google OAuth in Agents */}
        <section className="mb-16">
          <h2 className="heading-2">Using Google OAuth in Agents</h2>
          <p className="text-gray-700 mb-8">Once authenticated, your agents can use Google-powered tools:</p>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineEnvelope className="w-5 h-5 text-gray-500" />
                Send Email via Gmail
              </h3>
              <CodeWithResult 
                code={`from connectonion import Agent, send_email

def send_gmail(to: str, subject: str, body: str) -> str:
    """Send email via your Gmail account."""
    result = send_email(to, subject, body)
    return f"Email sent to {to}: {result}"

agent = Agent(
    "Gmail Assistant",
    tools=[send_gmail]
)

agent.input("Send an email to alice@example.com saying hello")`}
                language="python"
                fileName="gmail_agent.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineCalendar className="w-5 h-5 text-gray-500" />
                Read Calendar Events
              </h3>
              <CodeWithResult 
                code={`from connectonion import Agent
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from datetime import datetime, timedelta

def check_calendar(days_ahead: int = 7) -> str:
    """Check Google Calendar for upcoming events."""
    # Load credentials from environment
    creds = Credentials(
        token=os.getenv("GOOGLE_ACCESS_TOKEN"),
        refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),  # From backend
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        scopes=["https://www.googleapis.com/auth/calendar.readonly"]
    )

    service = build('calendar', 'v3', credentials=creds)

    # Get events from now to days_ahead
    now = datetime.utcnow().isoformat() + 'Z'
    end = (datetime.utcnow() + timedelta(days=days_ahead)).isoformat() + 'Z'

    events_result = service.events().list(
        calendarId='primary',
        timeMin=now,
        timeMax=end,
        maxResults=10,
        singleEvents=True,
        orderBy='startTime'
    ).execute()

    events = events_result.get('items', [])

    if not events:
        return f"No events in the next {days_ahead} days"

    summary = f"Upcoming events ({len(events)}):\\n"
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        summary += f"- {start}: {event['summary']}\\n"

    return summary

agent = Agent(
    "Calendar Assistant",
    tools=[check_calendar]
)

agent.input("What's on my calendar this week?")`}
                language="python"
                fileName="calendar_agent.py"
              />
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section className="mb-16">
          <h2 className="heading-2">Complete Example: Scheduling Agent</h2>
          <p className="text-gray-700 mb-6">
            Here's a full agent that can check your calendar and send meeting invites:
          </p>

          <CodeWithResult 
            code={`from connectonion import Agent, send_email
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from datetime import datetime, timedelta

class SchedulingAssistant:
    """AI assistant that manages your calendar and sends meeting emails."""

    def __init__(self):
        # Initialize Google Calendar API
        creds = Credentials(
            token=os.getenv("GOOGLE_ACCESS_TOKEN"),
            refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
            token_uri="https://oauth2.googleapis.com/token",
            client_id=os.getenv("GOOGLE_CLIENT_ID"),
            client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
            scopes=["https://www.googleapis.com/auth/calendar.readonly"]
        )
        self.calendar = build('calendar', 'v3', credentials=creds)

    def check_availability(self, date_str: str) -> str:
        """Check if a specific date/time is free on calendar."""
        # Parse date and check calendar
        target_date = datetime.fromisoformat(date_str)

        events_result = self.calendar.events().list(
            calendarId='primary',
            timeMin=target_date.isoformat() + 'Z',
            timeMax=(target_date + timedelta(hours=1)).isoformat() + 'Z',
            singleEvents=True
        ).execute()

        events = events_result.get('items', [])

        if events:
            return f"Not available - {len(events)} event(s) scheduled"
        return "Available"

    def send_meeting_invite(
        self,
        to: str,
        subject: str,
        datetime_str: str,
        duration_hours: int = 1
    ) -> str:
        """Send meeting invitation email."""
        meeting_time = datetime.fromisoformat(datetime_str)

        body = f"""
Hi,

I'd like to schedule a meeting with you.

Date & Time: {meeting_time.strftime('%A, %B %d, %Y at %I:%M %p')}
Duration: {duration_hours} hour(s)

Please let me know if this works for you.

Best regards
"""

        result = send_email(to, subject, body)
        return f"Meeting invite sent to {to}"

# Create tools from methods
assistant = SchedulingAssistant()

agent = Agent(
    "Scheduling Agent",
    tools=[
        assistant.check_availability,
        assistant.send_meeting_invite
    ],
    system_prompt="""You are a scheduling assistant.

You can:
1. Check calendar availability
2. Send meeting invitations via Gmail

When asked to schedule a meeting:
1. First check if the proposed time is available
2. If available, send the meeting invite
3. Report back to the user
"""
)

# Use it
agent.input("""
Schedule a 1-hour meeting with bob@example.com
for tomorrow at 2pm. Subject: Q4 Planning Discussion
""")`}
            language="python"
            fileName="scheduling_agent.py"
          />
        </section>

        {/* Troubleshooting */}
        <section className="mb-16">
          <h2 className="heading-2">Troubleshooting</h2>

          <div className="space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">"Not authenticated with OpenOnion"</h3>
              <p className="text-gray-700 mb-4">You need to run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">co auth</code> first to get your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">OPENONION_API_KEY</code>:</p>
              <CommandBlock commands={['co auth', 'co auth google']} />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-500">Authorization Timeout</h3>
              <p className="text-gray-700 mb-4">If the browser window doesn't complete authorization within 5 minutes:</p>
              <CommandBlock commands={['co auth google']} />
              <p className="text-sm text-gray-400 mt-2">The command polls the backend every 2 seconds waiting for your authorization.</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-500">Credentials Not Working</h3>
              <p className="text-gray-700 mb-4">Check if credentials are properly saved:</p>
              <CodeWithResult 
                code={`# Check local .env
cat .env | grep GOOGLE_

# Check global keys
cat ~/.co/keys.env | grep GOOGLE_`}
                language="bash"
                fileName="terminal"
              />
              <p className="text-gray-700 mt-4 mb-2">If credentials exist but don't work, re-authenticate:</p>
              <CommandBlock commands={['co auth google']} />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
