'use client'

import { HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'
import Link from 'next/link'

export default function TerminalPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'Terminal' }
          ]}
          icon={HiOutlineCommandLine}
          iconColor="icon-ui"
          title="Terminal"
          description="Interactive terminal utilities: selection menus, file browser, and input with autocomplete."
          markdownPath="/useful-tools/terminal.md"
          markdownFilename="terminal.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import pick, yes_no, browse_files, input_with_at

# Selection menu
choice = pick("Pick a color", ["Red", "Green", "Blue"])

# Yes/No confirmation
ok = yes_no("Are you sure?")

# File browser
path = browse_files()

# Input with @ file autocomplete
cmd = input_with_at("> ")`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Want to customize? Run <Link href="/cli" className="text-gray-500 hover:text-gray-700"><code className="bg-gray-100 px-2 py-1 rounded">co copy terminal</code></Link> to get an editable copy.
          </p>
        </section>

        {/* pick() */}
        <section className="mb-12">
          <h2 className="heading-2">pick()</h2>
          <p className="text-gray-700 mb-4">Single-select menu with keyboard navigation.</p>
          <CodeWithResult
            code={`# List options (press 1, 2, 3 or arrow keys)
choice = pick("Apply this command?", [
    "Yes, apply",
    "Yes for same command",
    "No, tell agent how"
])

# Dict options (returns key)
choice = pick("Continue?", {
    "y": "Yes, continue",
    "n": "No, cancel",
})`}
            language="python"
          />
        </section>

        {/* yes_no() */}
        <section className="mb-12">
          <h2 className="heading-2">yes_no()</h2>
          <p className="text-gray-700 mb-4">Simple binary confirmation.</p>
          <CodeWithResult
            code={`ok = yes_no("Delete this file?")
# Press y → True, n → False`}
            language="python"
          />
        </section>

        {/* browse_files() */}
        <section className="mb-12">
          <h2 className="heading-2">browse_files()</h2>
          <p className="text-gray-700 mb-4">Navigate and select files.</p>
          <CodeWithResult
            code={`path = browse_files()
# Arrow keys to navigate
# Enter on folder to open
# Enter on file to select
# Returns: "src/agent.py"`}
            language="python"
          />
        </section>

        {/* input_with_at() */}
        <section className="mb-12">
          <h2 className="heading-2">input_with_at()</h2>
          <p className="text-gray-700 mb-4">Text input with @ file autocomplete.</p>
          <CodeWithResult
            code={`cmd = input_with_at("> ")
# User types: "edit @"
# File browser opens automatically
# Returns: "edit src/agent.py"`}
            language="python"
          />
        </section>

        {/* Keyboard Controls */}
        <section className="mb-12">
          <h2 className="heading-2">Keyboard Controls</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-gray-700">Key</th>
                  <th className="px-4 py-3 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">↑/↓</td>
                  <td className="px-4 py-3 text-gray-700">Navigate options</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">1-9</td>
                  <td className="px-4 py-3 text-gray-700">Quick select by number</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">Enter</td>
                  <td className="px-4 py-3 text-gray-700">Confirm selection</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">Esc</td>
                  <td className="px-4 py-3 text-gray-700">Cancel</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">@</td>
                  <td className="px-4 py-3 text-gray-700">Trigger file autocomplete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
