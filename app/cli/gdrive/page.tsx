/**
 * @purpose CLI gdrive command documentation
 * @context Shows how to use `co gdrive` — list, search, download, upload, and trash Google Drive files from the terminal, plus the GDrive tool for agents
 */

'use client'

import { HiOutlineFolderOpen, HiOutlineBolt, HiOutlineKey, HiOutlineCommandLine, HiOutlineArrowsRightLeft, HiOutlineCodeBracket, HiOutlineWrench } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliGdrivePage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co gdrive' }
            ]}
            icon={HiOutlineFolderOpen}
            iconColor="icon-ui"
            title="co gdrive"
            description="List, search, download, and upload Google Drive files from the terminal — the same Drive access your agents get from the GDrive tool, as a command."
            markdownPath="/cli/gdrive.md"
            markdownFilename="gdrive.md"
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              Drive was added to the requested OAuth scopes <em>after</em> Gmail and Calendar. If you connected Google before that, run <code className="bg-gray-100 px-2 py-1 rounded">co auth google</code> once more — a token refresh cannot widen scopes.
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

# See what changed recently (the zero-arg default)
co gdrive

# Download file #3 from the listing
co gdrive get 3

# Upload something
co gdrive put report.pdf`}
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
            <code className="bg-gray-100 px-1 rounded">co gdrive</code> needs a connected Google account carrying the <code className="bg-gray-100 px-1 rounded">drive</code> scope. Because that scope shipped later than Gmail and Calendar, an older token has everything <em>except</em> Drive — and since a refresh cannot widen scopes, the only fix is to re-consent. The command tells you exactly that if it happens.
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
              <h3 className="text-xl font-semibold mb-3">co gdrive — Recent files</h3>
              <CommandBlock commands={['co gdrive', 'co gdrive list --last 50']} />
              <p className="text-gray-600 text-sm mt-3">
                With no subcommand you get your 20 most recently modified files — same as <code className="bg-gray-100 px-1 rounded">co gdrive list</code>. <code className="bg-gray-100 px-1 rounded">--last, -n</code> changes the count. Trashed files are excluded.
              </p>
              <p className="text-gray-600 text-sm mt-3">
                Files are numbered, and <strong>numbers mean your last listing</strong> — <code className="bg-gray-100 px-1 rounded">co gdrive get 3</code> downloads the third row of the table you just saw. Running <code className="bg-gray-100 px-1 rounded">co gdrive</code> again renumbers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gdrive search &lt;query&gt; — Find by name</h3>
              <CommandBlock commands={['co gdrive search report', 'co gdrive search "Q3 budget" -n 5']} />
              <p className="text-gray-600 text-sm mt-3">
                One caveat worth knowing: Drive matches <strong>word prefixes, not any substring</strong>. On a file named <code className="bg-gray-100 px-1 rounded">HelloWorld</code>, searching <code className="bg-gray-100 px-1 rounded">Hello</code> matches and <code className="bg-gray-100 px-1 rounded">World</code> does not. That&apos;s the API&apos;s behavior, not ours.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gdrive get &lt;#&gt; — Download</h3>
              <CodeWithResult
                code={`co gdrive get 3                       # into the current directory
co gdrive get 3 --to ~/Downloads      # into a directory
co gdrive get 3 --to notes.md         # to an exact path
co gdrive get 1A2b3C4d5E6f7G8h        # by full file id`}
                language="bash"
              />

              <p className="text-gray-700 text-sm mt-4 mb-4">
                Google Docs, Sheets, and Slides have <strong>no file bytes of their own</strong>, so they are exported on the way down and get the matching extension:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-700 font-semibold">In Drive</th>
                      <th className="text-left px-4 py-3 text-gray-700 font-semibold">Downloads as</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr><td className="px-4 py-3 text-gray-700">Google Doc</td><td className="px-4 py-3 font-mono text-gray-600">Markdown (.md)</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Google Sheet</td><td className="px-4 py-3 font-mono text-gray-600">CSV (.csv, first sheet only)</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Google Slides</td><td className="px-4 py-3 font-mono text-gray-600">PDF (.pdf)</td></tr>
                    <tr><td className="px-4 py-3 text-gray-700">Google Drawing</td><td className="px-4 py-3 font-mono text-gray-600">PDF (.pdf)</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-600 text-sm mt-4">
                Everything else downloads byte-for-byte. <strong>Folders and Forms have no export format at all</strong> — the command says so rather than writing a broken file. Shortcuts resolve to whatever they point at.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gdrive put &lt;path&gt; — Upload</h3>
              <CommandBlock commands={['co gdrive put report.pdf', 'co gdrive put ./out/report.pdf --name "Q3 Report.pdf"']} />
              <p className="text-gray-600 text-sm mt-3">
                Uploads to the root of your Drive and prints the link. <code className="bg-gray-100 px-1 rounded">--name</code> sets the name in Drive; without it the local filename is used.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">co gdrive rm &lt;#&gt; — Trash</h3>
              <CommandBlock commands={['co gdrive rm 3']} />
              <p className="text-gray-600 text-sm mt-3">
                Moves the file to the Drive trash. It is <strong>not</strong> permanently deleted — restore it from drive.google.com if that was a mistake.
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
            In a terminal you get a Rich table with truncated columns. When output is piped, each file is one tab-separated row of <code className="bg-gray-100 px-1 rounded">name</code>, <code className="bg-gray-100 px-1 rounded">type</code>, <code className="bg-gray-100 px-1 rounded">size</code>, and the <strong>full file id</strong>, so scripts never receive a truncated value.
          </p>

          <CodeWithResult
            code={`co gdrive list -n 100 | cut -f4      # just the ids
co gdrive search report | cut -f1    # just the names`}
            language="bash"
          />
        </section>

        {/* In your agent */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-700" />
            Same Functions, in Your Agent
          </h2>

          <p className="text-gray-700 mb-4">
            The CLI wraps the <code className="bg-gray-100 px-2 py-1 rounded">GDrive</code> tool, so hand it to any agent and it gets the same reach:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, GDrive

agent = Agent("assistant", tools=[GDrive()])
agent.input("What did I change in Drive this week?")`}
            language="python"
          />

          <p className="text-gray-700 mt-6 mb-4">Or call the methods directly:</p>

          <CodeWithResult
            code={`drive = GDrive()
drive.list_files(last=20)
drive.search_files("report")
drive.download("1A2b3C4d5E6f7G8h", dest="~/Downloads")
drive.upload("report.pdf", name="Q3 Report.pdf")
drive.delete("1A2b3C4d5E6f7G8h")`}
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
              <li>• <strong>&quot;Google Drive permission missing&quot;</strong> → your token predates Drive support; run <code className="bg-gray-100 px-1 rounded">co auth google</code> again to re-consent.</li>
              <li>• <strong>&quot;No file #N in your last listing&quot;</strong> → the number is out of range or the listing changed; run <code className="bg-gray-100 px-1 rounded">co gdrive</code> to refresh the numbering.</li>
              <li>• <strong>A search finds nothing you can see in Drive</strong> → Drive matches word prefixes, not substrings. Try the beginning of a word in the name.</li>
            </ul>
          </div>
        </section>

        {/* See also */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">See Also</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <a href="/cli/gmail" className="text-gray-700 hover:underline">co gmail</a> — the same shape for your Gmail mailbox</li>
              <li>• <a href="/cli/auth" className="text-gray-700 hover:underline">co auth</a> — connects the Google account both commands use</li>
              <li>• <a href="/google-integration" className="text-gray-700 hover:underline">Google Integration</a> — the OAuth scopes requested</li>
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
