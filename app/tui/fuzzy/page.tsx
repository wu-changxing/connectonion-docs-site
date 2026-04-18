'use client'

import React from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function FuzzyPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24 doc-content--reference">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Fuzzy Matching' },
          ]}
          icon={HiOutlineMagnifyingGlass}
          iconColor="icon-ui"
          title="Fuzzy Matching"
          description="Fuzzy matching utilities for autocomplete"
          markdownPath="/tui/fuzzy.md"
          markdownFilename="fuzzy.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import fuzzy_match, highlight_match

# Check if query matches text
matched, score, positions = fuzzy_match("gp", "gpt-4")
# matched: True
# score: 16 (higher = better)
# positions: [0, 1] (matched char indices)`}
            language="python"
          />
        </section>

        {/* fuzzy_match */}
        <section className="mb-12">
          <h2 className="heading-2">fuzzy_match</h2>
          <p className="text-gray-700 mb-4">
            Match query against text with scoring:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import fuzzy_match

matched, score, positions = fuzzy_match(query, text)`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Scoring</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-700">Bonus</th>
                  <th className="text-left py-2 text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">+1</td>
                  <td className="py-2 text-gray-700">Per matched character</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-700">+10</td>
                  <td className="py-2 text-gray-700">Consecutive character bonus</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">+5</td>
                  <td className="py-2 text-gray-700">Word boundary bonus (after <code>/_-. </code>)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="heading-3 mt-8">Examples</h3>
          <CodeWithResult
            code={`fuzzy_match("gp", "gpt-4")     # (True, 16, [0, 1])
fuzzy_match("g4", "gpt-4")     # (True, 7, [0, 4])
fuzzy_match("xyz", "gpt-4")    # (False, 0, [])
fuzzy_match("", "anything")    # (True, 0, [])`}
            language="python"
          />
        </section>

        {/* highlight_match */}
        <section className="mb-12">
          <h2 className="heading-2">highlight_match</h2>
          <p className="text-gray-700 mb-4">
            Highlight matched characters in Rich Text:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import highlight_match
from rich.console import Console

console = Console()

# Get match positions
matched, score, positions = fuzzy_match("gp", "gpt-4")

# Create highlighted text
text = highlight_match("gpt-4", positions)
console.print(text)  # "gp" highlighted in magenta`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>
          <CodeWithResult
            code={`fuzzy_match(query: str, text: str) -> tuple[bool, int, list[int]]
# Returns: (matched, score, positions)

highlight_match(text: str, positions: list[int]) -> Text
# Returns: Rich Text with matched chars highlighted`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
