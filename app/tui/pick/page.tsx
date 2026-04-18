'use client'

import React from 'react'
import { HiOutlineChevronDown, HiOutlineCommandLine } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function PickPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'pick' },
          ]}
          icon={HiOutlineChevronDown}
          iconColor="text-purple-400"
          iconBgFrom="from-purple-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-purple-500/30"
          title="pick"
          description="Single-select menu with keyboard navigation"
          markdownPath="/tui/pick.md"
          markdownFilename="pick.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import pick

choice = pick("Pick a color", ["Red", "Green", "Blue"])
# Press 1 → "Red", 2 → "Green", 3 → "Blue"
# Or use arrow keys + Enter`}
            result={`Pick a color

  ❯ 1  Red
    2  Green
    3  Blue

↑↓ navigate  1-9 jump  Enter select`}
            language="python"
          />
        </section>

        {/* Options */}
        <section className="mb-12">
          <h2 className="heading-2">Options</h2>

          <h3 className="heading-3">Simple List</h3>
          <CodeWithResult
            code={`choice = pick("Select model", ["gpt-4", "claude-3", "gemini"])
# Returns: "gpt-4" (selected string)`}
            language="python"
          />

          <h3 className="heading-3 mt-8">With Descriptions</h3>
          <CodeWithResult
            code={`choice = pick("Send email?", [
    ("Yes, send it", "Send immediately"),
    ("Auto approve", "Skip approval for this recipient"),
    ("No", "Cancel"),
])`}
            language="python"
          />

          <h3 className="heading-3 mt-8">With "Other" Option</h3>
          <CodeWithResult
            code={`choice = pick("Continue?", ["Yes", "No"], other=True)
# Adds "Other..." option for custom text input`}
            language="python"
          />
        </section>

        {/* Keyboard Controls */}
        <section className="mb-12">
          <h2 className="heading-2">Keyboard Controls</h2>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-700">Key</th>
                  <th className="text-left py-2 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">↑/↓</kbd></td>
                  <td className="py-2 text-gray-700">Navigate up/down</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">1-9</kbd></td>
                  <td className="py-2 text-gray-700">Jump to option</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Enter</kbd></td>
                  <td className="py-2 text-gray-700">Confirm selection</td>
                </tr>
                <tr>
                  <td className="py-2"><kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Esc</kbd></td>
                  <td className="py-2 text-gray-700">Cancel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>
          <CodeWithResult
            code={`pick(
    title: str,           # Question to display
    options: list,        # Strings or (label, description) tuples
    other: bool = False,  # Add "Other..." option
    console: Console = None
) -> str                  # Returns selected label`}
            language="python"
          />
        </section>

        {/* Example Output */}
        <section className="mb-12">
          <h2 className="heading-2">Example Output</h2>
          <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-700 overflow-x-auto">
{`Pick a color

  ❯ 1  Red
    2  Green
    3  Blue

↑↓ navigate  1-9 jump  Enter select`}
          </pre>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
