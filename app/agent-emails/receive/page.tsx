'use client'

import Link from 'next/link'
import { HiOutlineInbox, HiOutlineEye, HiOutlineClock, HiOutlineEnvelope, HiOutlineBolt } from 'react-icons/hi2'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ReceiveEmailsPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Agent Emails', href: '/agent-emails' },
            { label: 'Receive' }
          ]}
          icon={HiOutlineInbox}
          iconColor="icon-ui"
          title="Receive Emails"
          description="Check your inbox with one line. Process emails safely. Keep it simple."
          markdownPath="/agent-emails/receive.md"
          markdownFilename="receive-emails.md"
        />

        {/* Usage */}
        <section className="mb-16">
          <h2 className="heading-2">Usage</h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 mb-3 font-semibold">Option 1: Import directly</p>
              <CodeWithResult
                code={`from connectonion import get_emails, mark_read

agent = Agent("assistant", tools=[get_emails, mark_read])`}
                language="python"
                fileName="import.py"
              />
            </div>
            <div>
              <p className="text-gray-700 mb-3 font-semibold">Option 2: Copy and customize</p>
              <CommandBlock commands={['co copy get_emails']} />
              <div className="mt-3">
                <CodeWithResult
                  code={`from tools.get_emails import get_emails, mark_read  # Your local copy`}
                  language="python"
                  fileName="copy.py"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 text-gray-400" />
            <h2 className="heading-2">Quick Start</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">10 seconds</span>
          </div>

          <CodeWithResult
            code={`from connectonion import get_emails, send_email, mark_read

# Get your emails
emails = get_emails()`}
            language="python"
            fileName="quickstart.py"
          />

          <p className="text-gray-700 font-semibold text-center mt-4">That's it. You have your emails.</p>
        </section>

        {/* Core Concept */}
        <section className="mb-16">
          <h2 className="heading-2">Core Concept</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-8 mb-8">
            <p className="text-lg text-gray-700 mb-6">Three functions. That's all:</p>
            <CodeWithResult
              code={`get_emails(last=10, unread=False)  # Get emails
send_email(to, subject, message)   # Send email (already done)
mark_read(email_id)                # Mark as read after processing`}
              language="python"
              fileName="core.py"
            />
            <div className="mt-6 p-4 bg-gray-500/10 border border-gray-200 rounded-lg">
              <p className="text-gray-700 font-medium">
                Important: Emails are NOT auto-marked as read. You control when to mark them.
              </p>
            </div>
          </div>
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="heading-2">Setup</h2>

          <p className="text-gray-700 mb-4">No configuration needed. Your agent's email is provisioned automatically:</p>
          <CommandBlock commands={['co init', 'co auth']} />

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-600 text-sm">
              Your agent receives emails at <code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">0x{'{your_key}'}@mail.openonion.ai</code>, stored in <code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">~/.co/keys.env</code> as <code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">AGENT_EMAIL</code>.
            </p>
          </div>
        </section>

        {/* Common Patterns */}
        <section className="mb-16">
          <h2 className="heading-2">Common Patterns</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineEye className="w-5 h-5 text-gray-400" />
                Check for new emails
              </h3>
              <CodeWithResult
                code={`from connectonion import get_emails, mark_read

# Get unread emails
new_emails = get_emails(unread=True)

for email in new_emails:
    print(f"New from {email['from']}: {email['subject']}")

    # Process the email
    if process_email(email):
        mark_read(email['id'])  # Only mark if processed successfully`}
                language="python"
                fileName="check_new.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineClock className="w-5 h-5 text-gray-500" />
                Get latest email
              </h3>
              <CodeWithResult
                code={`# Get just the most recent email
emails = get_emails(last=1)
if emails:
    latest = emails[0]
    print(f"Latest: {latest['subject']}")`}
                language="python"
                fileName="latest.py"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiOutlineEnvelope className="w-5 h-5 text-gray-500" />
                Reply to emails
              </h3>
              <CodeWithResult
                code={`from connectonion import get_emails, send_email, mark_read

# Check and reply pattern
for email in get_emails(unread=True):
    if "urgent" in email["subject"].lower():
        # Send reply
        send_email(
            email["from"],
            f"Re: {email['subject']}",
            "I'm on it!"
        )
        # Mark as handled
        mark_read(email['id'])`}
                language="python"
                fileName="reply.py"
              />
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="heading-2">API Reference</h2>

          <div className="space-y-8">
            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 font-mono">get_emails(last=10, unread=False)</h3>
              <p className="text-gray-700 mb-4">Fetch emails from your inbox.</p>
              <div className="space-y-2 text-sm">
                <p><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">last</code> - Number of emails to fetch (default: 10)</p>
                <p><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">unread</code> - Only fetch unread emails (default: False)</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">Returns list of email dicts:</p>
                <CodeWithResult
                  code={`[
    {
        'id': 'msg_123',
        'from': 'alice@example.com',
        'subject': 'Project Update',
        'message': 'The new feature is ready...',
        'timestamp': '2024-01-15T10:30:00Z',
        'read': False
    }
]`}
                  language="python"
                  fileName="email_dict.py"
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 font-mono">mark_read(email_id)</h3>
              <p className="text-gray-700 mb-4">Mark an email as read.</p>
              <div className="space-y-2 text-sm">
                <p><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">email_id</code> - The email ID from get_emails()</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700 font-mono">mark_unread(email_id)</h3>
              <p className="text-gray-700 mb-4">Mark an email as unread.</p>
              <div className="space-y-2 text-sm">
                <p><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">email_id</code> - The email ID from get_emails()</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agent Example */}
        <section className="mb-16">
          <h2 className="heading-2">Email Agent Example</h2>

          <CodeWithResult
            code={`from connectonion import Agent, get_emails, send_email, mark_read

def check_inbox() -> str:
    """Check inbox for new emails."""
    emails = get_emails(unread=True)
    if not emails:
        return "No new emails"
    return f"Found {len(emails)} unread emails:\\n" + "\\n".join(
        f"- {e['from']}: {e['subject']}" for e in emails
    )

def reply_to_email(email_id: str, message: str) -> str:
    """Reply to an email by ID."""
    emails = get_emails(last=50)
    email = next((e for e in emails if e['id'] == email_id), None)
    if not email:
        return "Email not found"

    send_email(email['from'], f"Re: {email['subject']}", message)
    mark_read(email_id)
    return f"Replied to {email['from']}"

agent = Agent(
    name="email-assistant",
    tools=[check_inbox, reply_to_email],
    system_prompt="You help manage emails. Check inbox and reply as needed."
)

agent.input("Check my inbox and summarize what's there")`}
            language="python"
            fileName="email_agent.py"
          />
        </section>

        {/* Why No Auto-Mark */}
        <section className="mb-16">
          <h2 className="heading-2">Why No Auto-Mark?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-gray-900">The problem with auto-marking</h3>
              <CodeWithResult
                code={`# BAD: Auto-mark on fetch
emails = get_emails(unread=True)  # Server marks as read
process_emails(emails)            # Crashes!
# Emails lost forever - marked read but not processed!`}
                language="python"
                fileName="bad.py"
              />
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-gray-900">Our safe approach</h3>
              <CodeWithResult
                code={`# GOOD: Explicit marking
emails = get_emails(unread=True)  # Stays unread
process_emails(emails)            # Process them
mark_read([e['id'] for e in emails])  # Mark only after success`}
                language="python"
                fileName="good.py"
              />
            </div>
          </div>

          <p className="text-center mt-6 text-gray-700">
            Need full Gmail features (labels, search, CRM)? Check out <Link href="/gmail" className="text-gray-500 hover:text-gray-700 underline">Gmail</Link>.
          </p>
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
            <h2 className="heading-2">Philosophy</h2>
            <p className="text-xl font-semibold text-gray-900 mb-4">Three functions for everything email:</p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">get_emails()</code> - Read emails</li>
              <li><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">send_email()</code> - Send emails</li>
              <li><code className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">mark_read()</code> - Mark as processed</li>
            </ul>
            <p className="text-gray-700 mb-6">No complexity. No confusion. Just email.</p>
            <p className="text-center text-xl font-bold text-gray-900">Keep simple things simple.</p>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
