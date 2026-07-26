/**
 * @purpose CLI gmail command documentation
 * @context Shows how to use `co gmail` — read, reply, send, and search your own Gmail account from the terminal after `co auth google`
 */

'use client'

import { HiOutlineEnvelope, HiOutlineBolt, HiOutlineKey, HiOutlineCommandLine, HiOutlineArrowsRightLeft, HiOutlineCodeBracket, HiOutlineWrench } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliGmailPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co gmail' }
            ]}
            icon={HiOutlineEnvelope}
            iconColor="icon-ui"
            title="co gmail"
            description="Read, reply, send, and search your own Gmail account right in the terminal — the same Gmail API your agents use, as a command."
            markdownPath="/cli/gmail.md"
            markdownFilename="gmail.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              This is <em>your</em> mailbox, not the agent&apos;s. It needs <code className="bg-gray-100 px-2 py-1 rounded">co auth google</code> once, and it mirrors <a href="/outlook" className="underline">co outlook</a> command for command.
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
            code={`# Connect your Google account (one-time)
co auth google

# Check your inbox (the zero-arg default)
co gmail

# Read message #3 from the inbox list
co gmail read 3

# Send a message
co gmail send alice@example.com "Hello" "Thanks for the meeting today!"`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            That&apos;s the whole surface. Everything below is detail.
          </p>
        </section>

        {/* Setup */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineKey className="w-8 h-8 text-gray-700" />
            Setup
          </h2>

          <CommandBlock commands={['co auth google']} />

          <p className="text-gray-600 text-sm mt-3">
            Opens the Google OAuth flow and saves <code className="bg-gray-100 px-1 rounded">GOOGLE_*</code> credentials (access token, refresh token, scopes, email) to your project <code className="bg-gray-100 px-1 rounded">.env</code> and <code className="bg-gray-100 px-1 rounded">~/.co/keys.env</code>. Tokens auto-refresh at the start of every command, so you authorize once.
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
              <h3 className="text-xl font-semibold mb-3">co gmail — Show the inbox</h3>
              <CommandBlock
                commands={['co gmail', 'co gmail inbox --last 25', 'co gmail inbox --unread']}
              />
              <p className="text-gray-600 text-sm mt-3">
                With no subcommand you get your 10 most recent emails — same as <code className="bg-gray-100 px-1 rounded">co gmail inbox</code>. A green ● marks unread. <code className="bg-gray-100 px-1 rounded">--last, -n</code> changes the count, <code className="bg-gray-100 px-1 rounded">--unread, -u</code> filters to unread only.
              </p>
              <p className="text-gray-600 text-sm mt-3">
                Emails are numbered, and <strong>numbers mean your last listing</strong> — <code className="bg-gray-100 px-1 rounded">co gmail read 3</code> opens the third row of the table you just saw. Running <code className="bg-gray-100 px-1 rounded">co gmail</code> again renumbers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gmail read &lt;#&gt; — Read one email</h3>
              <CommandBlock commands={['co gmail read 3', 'co gmail read 18f2c9d0a1b2c3d4']} />
              <p className="text-gray-600 text-sm mt-3">
                Takes a listing number or a full message id. Prints the headers in a panel and the body below it, then marks the email read — only when your token carries <code className="bg-gray-100 px-1 rounded">gmail.modify</code>; a read-only token skips that step.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gmail reply &lt;#&gt; &lt;message&gt; — Reply</h3>
              <CodeWithResult
                code={`co gmail reply 3 "Sounds good, see you then."
cat reply.txt | co gmail reply 3 -`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-3">
                Threaded — the reply goes back on the original conversation. A message of <code className="bg-gray-100 px-1 rounded">-</code> reads the body from stdin.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gmail send &lt;to&gt; &lt;subject&gt; &lt;message&gt; — Send</h3>
              <CodeWithResult
                code={`co gmail send alice@example.com "Report" "See notes below."
co gmail send alice@example.com "Report" - < body.txt
co gmail send a@x.com,b@y.com "Update" "Shipping today" --cc lead@x.com`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-3">
                Recipients are comma-separated; <code className="bg-gray-100 px-1 rounded">--cc</code> and <code className="bg-gray-100 px-1 rounded">--bcc</code> take the same form. A message of <code className="bg-gray-100 px-1 rounded">-</code> reads the body from stdin, which is how you send anything long or multi-line without fighting shell quoting.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gmail sent — Recently sent</h3>
              <CommandBlock commands={['co gmail sent', 'co gmail sent -n 25']} />
              <p className="text-gray-600 text-sm mt-3">
                A read-only listing — it does <strong>not</strong> touch the numbering used by <code className="bg-gray-100 px-1 rounded">read</code> and <code className="bg-gray-100 px-1 rounded">reply</code>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gmail search &lt;query&gt; — Search</h3>
              <CodeWithResult
                code={`co gmail search "invoice"
co gmail search "from:alice@example.com is:unread"
co gmail search "subject:meeting after:2026/07/01" -n 25`}
                language="bash"
              />
              <p className="text-gray-600 text-sm mt-3">
                Takes <strong>full Gmail query syntax</strong>, not just plain words. Matches are numbered exactly like the inbox, so <code className="bg-gray-100 px-1 rounded">co gmail read &lt;#&gt;</code> works on search results too.
              </p>
            </div>
          </div>
        </section>

        {/* Piping */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineArrowsRightLeft className="w-8 h-8 text-gray-700" />
            Piping
          </h2>

          <p className="text-gray-700 mb-4">
            In a terminal you get a Rich table with truncated columns. When the output is piped, you get the plain listing with <strong>full message ids</strong> instead, so scripts and agents never receive a truncated value.
          </p>

          <CommandBlock commands={['co gmail inbox -n 50 | grep "ID:"']} />
        </section>

        {/* In your agent */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Same Functions, in Your Agent
          </h2>

          <p className="text-gray-700 mb-4">
            The CLI is a thin wrapper over the <a href="/gmail" className="underline">Gmail tool</a> — anything <code className="bg-gray-100 px-2 py-1 rounded">co gmail</code> does, your agent can do too:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, Gmail

agent = Agent("assistant", tools=[Gmail()])
agent.input("Any unread mail from Alice?")`}
            language="python"
          />

          <p className="text-gray-700 mt-6 mb-4">Or call the same methods directly:</p>

          <CodeWithResult
            code={`gmail = Gmail()
gmail.list_inbox(last=10, unread=True)
gmail.list_search("from:alice@example.com")
gmail.send("alice@example.com", "Report", "See attached.")`}
            language="python"
          />
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineWrench className="w-8 h-8 text-gray-700" />
            Troubleshooting
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• <strong>&quot;Google account not connected&quot;</strong> → run <code className="bg-gray-100 px-1 rounded">co auth google</code>.</li>
              <li>• <strong>Missing Gmail scopes</strong> → run <code className="bg-gray-100 px-1 rounded">co auth google</code> again to re-consent.</li>
              <li>• <strong>&quot;No email #N in your last listing&quot;</strong> → the number is out of range or the listing changed; run <code className="bg-gray-100 px-1 rounded">co gmail</code> to refresh the numbering.</li>
              <li>• <strong>Credentials found in one project but not another</strong> → fixed in 1.3.1; older versions read either the project <code className="bg-gray-100 px-1 rounded">.env</code> or <code className="bg-gray-100 px-1 rounded">~/.co/keys.env</code>, never both.</li>
            </ul>
          </div>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/cli/gdrive" className="text-gray-700 hover:underline">co gdrive</a> — the same shape for Google Drive</li>
              <li>• <a href="/outlook" className="text-gray-700 hover:underline">co outlook</a> — the same surface for an Outlook mailbox</li>
              <li>• <a href="/cli/email" className="text-gray-700 hover:underline">co email</a> — your agent&apos;s own address, no OAuth needed</li>
              <li>• <a href="/gmail" className="text-gray-700 hover:underline">Gmail tool</a> — the full method list for agents</li>
              <li>• <a href="/cli/auth" className="text-gray-700 hover:underline">co auth</a> — connects the Google account</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
