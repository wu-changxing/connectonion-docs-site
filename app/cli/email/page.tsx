/**
 * @purpose CLI email command documentation
 * @context Shows how to use `co email` — every agent's own email address, send and read from the terminal, paid name/upgrade options
 */

'use client'

import { HiOutlineEnvelope, HiOutlineBolt, HiOutlineCommandLine, HiOutlineCurrencyDollar, HiOutlineCodeBracket, HiOutlineWrench } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliEmailPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co email' }
            ]}
            icon={HiOutlineEnvelope}
            iconColor="icon-ui"
            title="co email"
            description="Every agent gets its own email address. Send and read from it right in the terminal — no separate mail client, no Gmail OAuth."
            markdownPath="/cli/email.md"
            markdownFilename="email.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              Your address is derived from your agent&apos;s identity, e.g. <code className="bg-gray-100 px-2 py-1 rounded">0x7a9f3b2c@mail.openonion.ai</code>. It&apos;s activated by <code className="bg-gray-100 px-2 py-1 rounded">co auth</code>.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>

          <CodeWithResult
            code={`# Check your inbox (the zero-arg default)
co email

# Send a message
co email send alice@example.com "Hello" "Thanks for trying ConnectOnion!"

# Read message #42 from the inbox list
co email read 42`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            That&apos;s the whole surface. Everything below is detail.
          </p>
        </section>

        {/* Commands */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-700" />
            Commands
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">co email inbox — List received email</h3>
              <CommandBlock
                commands={['co email inbox', 'co email inbox --last 1000 --offset 1000', 'co email inbox --unread']}
              />
              <p className="text-gray-600 text-sm mt-3">
                <code className="bg-gray-100 px-1 rounded">--last</code> accepts 1–1000; use <code className="bg-gray-100 px-1 rounded">--offset</code> to continue through older pages. Unread messages are marked with a green ●. The leftmost <code className="bg-gray-100 px-1 rounded">#</code> is the email&apos;s id — pass it to <code className="bg-gray-100 px-1 rounded">co email read</code>. Note: <code className="bg-gray-100 px-1 rounded">--unread</code> filters the fetched page locally, so <code className="bg-gray-100 px-1 rounded">--last 10 --unread</code> means &quot;unread among your 10 most recent,&quot; not &quot;your 10 most recent unread.&quot;
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co email read &lt;#&gt; — Read one message</h3>
              <CommandBlock commands={['co email read 42']} />
              <p className="text-gray-600 text-sm mt-3">
                Prints the sender, subject, date, and body, then marks the message read. Reads from your 100 most recent messages — an email older than that won&apos;t be found by id yet.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co email send &lt;to&gt; &lt;subject&gt; &lt;message&gt; — Send</h3>
              <CommandBlock
                commands={[
                  'co email send bob@example.com "Hi" "Just checking in."',
                  'co email send bob@example.com "Receipt" "<h1>Paid</h1><p>Thanks!</p>"'
                ]}
              />
              <p className="text-gray-600 text-sm mt-3">
                All three arguments are positional and required. HTML is auto-detected: if the body contains tags (<code className="bg-gray-100 px-1 rounded">&lt;...&gt;</code>), it&apos;s sent as HTML, otherwise as plain text.
              </p>
            </div>
          </div>
        </section>

        {/* Paid options */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCurrencyDollar className="w-8 h-8 text-gray-700" />
            Customizing Your Address (paid)
          </h2>

          <p className="text-gray-700 mb-6">
            The two commands below spend ConnectOnion credits. Each shows you the price or new quota first, then applies it — nothing is charged unless you opt in.
          </p>

          <h3 className="text-xl font-semibold mb-3">co email name — Claim a readable address</h3>

          <CodeWithResult
            code={`co email name aaron          # check if aaron@openonion.ai is free + its price
co email name aaron --buy    # claim it (one-time charge from your credits)`}
            result={`✓ aaron@openonion.ai is available — $5.00 one-time, from credits
Claim it: co email name aaron --buy`}
            language="bash"
          />

          <p className="text-gray-600 text-sm mt-3 mb-8">
            Without <code className="bg-gray-100 px-1 rounded">--buy</code> it only checks availability and prints the one-time price (returned live by the backend, so it&apos;s always current). Prices shown are illustrative — the real figure is whatever the check command prints.
          </p>

          <h3 className="text-xl font-semibold mb-3">co email upgrade — Raise your sending quota</h3>

          <CodeWithResult
            code={`co email upgrade plus --domain mail.acme.com                  # plus, on your domain
co email upgrade pro  --domain mail.acme.com --alias support  # pro + a mailbox alias`}
            language="bash"
          />

          <p className="text-gray-600 text-sm mt-3">
            The paid tiers (<code className="bg-gray-100 px-1 rounded">plus</code>, <code className="bg-gray-100 px-1 rounded">pro</code>) send from <strong>your own domain</strong> and lift the monthly quota, billed from your credits. A sending domain is <strong>required</strong> (<code className="bg-gray-100 px-1 rounded">--domain, -d</code>) — leave it out and the upgrade is rejected before anything is charged. <code className="bg-gray-100 px-1 rounded">--alias, -a</code> sets a mailbox alias, e.g. <code className="bg-gray-100 px-1 rounded">support</code> → <code className="bg-gray-100 px-1 rounded">support@mail.acme.com</code>.
          </p>
        </section>

        {/* In your agent */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Same Functions, in Your Agent
          </h2>

          <p className="text-gray-700 mb-4">
            The CLI is a thin wrapper over two tool functions you can hand to any agent — so anything <code className="bg-gray-100 px-2 py-1 rounded">co email</code> does, your agent can do too:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import send_email, get_emails

agent = Agent("mailer", tools=[send_email, get_emails])
agent.input("Check my inbox and reply to anything urgent.")`}
            language="python"
          />
        </section>

        {/* Limitations & Troubleshooting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineWrench className="w-8 h-8 text-gray-700" />
            Limitations &amp; Troubleshooting
          </h2>

          <ul className="space-y-2 text-gray-700 list-disc pl-6 mb-8">
            <li><strong><code className="bg-gray-100 px-1 rounded">read</code> only sees your recent 100 messages.</strong> The backend has no single-email endpoint yet.</li>
            <li><strong>No <code className="bg-gray-100 px-1 rounded">reply</code> yet.</strong> To reply, copy the sender into <code className="bg-gray-100 px-1 rounded">send</code>: <code className="bg-gray-100 px-1 rounded">co email send &lt;their-address&gt; &quot;Re: ...&quot; &quot;...&quot;</code>.</li>
            <li><strong>Long / multi-line bodies</strong> are awkward as a shell argument — quote carefully; piping a body from a file is not wired up.</li>
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>&quot;No API key found&quot;</strong> → run <code className="bg-gray-100 px-1 rounded">co auth</code>.</li>
              <li>• <strong>&quot;AGENT_EMAIL not found&quot;</strong> → run <code className="bg-gray-100 px-1 rounded">co auth</code> to activate email.</li>
              <li>• <strong>Authentication failed (401)</strong> → token expired, re-run <code className="bg-gray-100 px-1 rounded">co auth</code>.</li>
              <li>• <strong>Rate limit exceeded (429)</strong> → you&apos;ve hit your tier&apos;s send quota; check <code className="bg-gray-100 px-1 rounded">co status</code>.</li>
            </ul>
          </div>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/agent-emails" className="text-gray-700 hover:underline">Agent Emails</a> — the send_email / get_emails tools in depth</li>
              <li>• <a href="/outlook" className="text-gray-700 hover:underline">co outlook</a> — the same idea for your Outlook account</li>
              <li>• <a href="/cli/auth" className="text-gray-700 hover:underline">co auth</a> — activates your agent&apos;s address</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
