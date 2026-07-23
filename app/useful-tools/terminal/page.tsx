'use client'

import { HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'
import CodeWithResult from '../../../components/CodeWithResult'
import Link from 'next/link'

export default function TerminalPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24 doc-content--reference">
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
          description="Interactive terminal utilities: selection menus, yes/no prompts, and inline autocomplete."
          markdownPath="/useful-tools/terminal.md"
          markdownFilename="terminal.md"
        />

        {/* Usage */}
        <section className="mb-12">
          <h2 className="heading-2">Usage</h2>
          <p className="text-gray-700 mb-3 font-semibold">Option 1: Import directly</p>
          <CodeWithResult
            code={`from connectonion import pick, yes_no, autocomplete`}
            language="python"
          />
          <p className="text-gray-700 mb-3 mt-6 font-semibold">Option 2: Copy and customize</p>
          <CodeWithResult code={`co copy terminal`} language="bash" />
          <div className="mt-3">
            <CodeWithResult
              code={`from tools.terminal import pick, yes_no, autocomplete  # Your local copy`}
              language="python"
            />
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion import pick, yes_no, autocomplete

# Selection menu
choice = pick("Pick a color", ["Red", "Green", "Blue"])

# Yes/No confirmation
ok = yes_no("Are you sure?")

# Inline autocomplete dropdown (you supply the candidates)
files = ["agent.py", "main.py", "utils.py"]
selected = autocomplete(files)
if selected:
    print(f"Selected: {selected}")`}
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

        {/* autocomplete() */}
        <section className="mb-12">
          <h2 className="heading-2">autocomplete()</h2>
          <p className="text-gray-700 mb-4">
            Inline dropdown with arrow-key navigation over a list you provide. It's a pure UI component — filtering/search is up to the caller.
          </p>
          <CodeWithResult
            code={`selected = autocomplete(["agent.py", "main.py", "utils.py"], max_visible=5)
# Arrow keys to navigate, Enter to select
# Returns the chosen string, or None if cancelled (Esc)`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Pair it with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">connectonion.tui.Input</code> for a text field with built-in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">@</code>-triggered file autocomplete.
          </p>
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
                  <td className="px-4 py-3 text-gray-700">Navigate options (pick, autocomplete)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">1-9 / letters</td>
                  <td className="px-4 py-3 text-gray-700">Quick select by key (pick, list or dict options)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">Enter</td>
                  <td className="px-4 py-3 text-gray-700">Confirm selection</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">Esc</td>
                  <td className="px-4 py-3 text-gray-700">Cancel (autocomplete only — pick() has no Esc handler, use Ctrl+C)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">Ctrl+C / Ctrl+D</td>
                  <td className="px-4 py-3 text-gray-700">Cancel with KeyboardInterrupt (pick, yes_no)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-700">y / n</td>
                  <td className="px-4 py-3 text-gray-700">Answer directly (yes_no)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Customizing */}
        <section className="mb-12">
          <h2 className="heading-2">Customizing</h2>
          <p className="text-gray-700 mb-4">Need to modify terminal utilities? Copy the source to your project:</p>
          <CodeWithResult code={`co copy terminal`} language="bash" />
          <p className="text-gray-700 mb-4 mt-6">Then import from your local copy:</p>
          <CodeWithResult
            code={`# from connectonion import pick, yes_no  # Before
from tools.terminal import pick, yes_no   # After - customize freely!`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
