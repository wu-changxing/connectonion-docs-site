'use client'

import React from 'react'
import { HiOutlineChevronDown, HiOutlineDocumentText, HiOutlineUser } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function DropdownPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Dropdown' },
          ]}
          icon={HiOutlineChevronDown}
          iconColor="text-green-400"
          iconBgFrom="from-gray-100"
          iconBgTo="to-emerald-600/20"
          iconBorderColor="border-gray-200"
          title="Dropdown"
          description="Selection list component for autocomplete menus"
          markdownPath="/tui/dropdown.md"
          markdownFilename="dropdown.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import Dropdown, DropdownItem

# Create items
items = [
    DropdownItem(display="/today", value="/today", description="Daily briefing"),
    DropdownItem(display="/inbox", value="/inbox", description="Show emails"),
]

# Create dropdown
dropdown = Dropdown(items, max_visible=5, style="modern")`}
            language="python"
          />
        </section>

        {/* DropdownItem */}
        <section className="mb-12">
          <h2 className="heading-2">DropdownItem</h2>
          <p className="text-gray-700 mb-4">
            Structured item with rich metadata:
          </p>

          <h3 className="heading-3">Simple Item</h3>
          <CodeWithResult
            code={`from connectonion.tui import DropdownItem

# Simple item
item = DropdownItem(display="/today", value="/today")`}
            language="python"
          />

          <h3 className="heading-3 mt-8">With Description</h3>
          <CodeWithResult
            code={`item = DropdownItem(
    display="/today",
    value="/today",
    description="Daily email briefing",
    icon="📅"
)`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Contact Style</h3>
          <CodeWithResult
            code={`item = DropdownItem(
    display="Davis Baer",
    value="davis@oneupapp.io",
    description="davis@oneupapp.io",
    subtitle="OneUp · founder",
    icon="👤"
)`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>

          <h3 className="heading-3">DropdownItem</h3>
          <CodeWithResult
            code={`DropdownItem(
    display: str,          # Main text to show
    value: Any,            # Value returned when selected
    score: int = 0,        # Match score for sorting
    positions: list = [],  # Matched char positions (for highlighting)
    description: str = "", # Secondary text
    subtitle: str = "",    # Third line
    icon: str = "",        # Left icon (emoji)
    style: str = "",       # Rich style
)`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Dropdown</h3>
          <CodeWithResult
            code={`Dropdown(
    items: list[DropdownItem],
    max_visible: int = 8,
    selected: int = 0,
    style: str = "modern",
)`}
            language="python"
          />
        </section>

        {/* File Icons */}
        <section className="mb-12">
          <h2 className="heading-2">File Icons</h2>
          <p className="text-gray-700 mb-4">
            Built-in icons for common file types:
          </p>
          <div className="bg-gray-100 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-700">Icon</th>
                  <th className="text-left py-2 text-gray-700">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 text-2xl">📁</td>
                  <td className="py-2 text-gray-700">folder</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 text-2xl">📄</td>
                  <td className="py-2 text-gray-700">file (default)</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 text-2xl">🐍</td>
                  <td className="py-2 text-gray-700">.py</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 text-2xl">📜</td>
                  <td className="py-2 text-gray-700">.js, .ts</td>
                </tr>
                <tr>
                  <td className="py-2 text-2xl">⚙️</td>
                  <td className="py-2 text-gray-700">.json, .yaml</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
