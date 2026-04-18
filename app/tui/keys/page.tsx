'use client'

import React from 'react'
import { HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function KeysPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Keyboard Input' },
          ]}
          icon={HiOutlineCommandLine}
          iconColor="text-red-400"
          iconBgFrom="from-red-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-red-500/30"
          title="Keyboard Input"
          description="Low-level keyboard input primitives"
          markdownPath="/tui/keys.md"
          markdownFilename="keys.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import getch, read_key

# Read single character
ch = getch()  # Blocks until keypress

# Read key with arrow handling
key = read_key()  # Returns 'up', 'down', etc.`}
            language="python"
          />
        </section>

        {/* getch */}
        <section className="mb-12">
          <h2 className="heading-2">getch</h2>
          <p className="text-gray-700 mb-4">
            Read single character without waiting for Enter:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import getch

ch = getch()
# Returns: 'a', '1', '\\n', etc.`}
            language="python"
          />
          <p className="text-sm text-gray-700 mt-4">
            Works on both Unix (termios) and Windows (msvcrt).
          </p>
        </section>

        {/* read_key */}
        <section className="mb-12">
          <h2 className="heading-2">read_key</h2>
          <p className="text-gray-700 mb-4">
            Read key with arrow/escape sequence handling:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import read_key

key = read_key()`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Return Values</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-700">Input</th>
                  <th className="text-left py-2 text-gray-700">Returns</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Arrow Up</kbd></td>
                  <td className="py-2"><code className="text-red-300">'up'</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Arrow Down</kbd></td>
                  <td className="py-2"><code className="text-red-300">'down'</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Arrow Left</kbd></td>
                  <td className="py-2"><code className="text-red-300">'left'</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Arrow Right</kbd></td>
                  <td className="py-2"><code className="text-red-300">'right'</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Escape</kbd></td>
                  <td className="py-2"><code className="text-red-300">'esc'</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Enter</kbd></td>
                  <td className="py-2"><code className="text-red-300">'\\n'</code> or <code className="text-red-300">'\\r'</code></td>
                </tr>
                <tr>
                  <td className="py-2">Regular char</td>
                  <td className="py-2 text-gray-700">The character</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Example: Navigation Loop */}
        <section className="mb-12">
          <h2 className="heading-2">Example: Navigation Loop</h2>
          <CodeWithResult
            code={`from connectonion.tui import read_key

selected = 0
options = ["Option A", "Option B", "Option C"]

while True:
    key = read_key()

    if key == 'up':
        selected = max(0, selected - 1)
    elif key == 'down':
        selected = min(len(options) - 1, selected + 1)
    elif key == '\\n':
        break  # Selected
    elif key == 'esc':
        selected = -1
        break  # Cancelled`}
            language="python"
          />
        </section>

        {/* Platform Support */}
        <section className="mb-12">
          <h2 className="heading-2">Platform Support</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-900/20 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Unix/macOS</h3>
              <p className="text-sm text-gray-700">Uses <code>termios</code> + <code>tty</code></p>
            </div>
            <div className="p-4 bg-purple-900/20 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Windows</h3>
              <p className="text-sm text-gray-700">Uses <code>msvcrt</code></p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
