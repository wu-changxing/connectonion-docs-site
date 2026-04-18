'use client'

import React from 'react'
import { HiOutlineChartBar } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function StatusBarPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'StatusBar' },
          ]}
          icon={HiOutlineChartBar}
          iconColor="icon-ui"
          title="StatusBar"
          description="Powerline-style status bar with colored segments"
          markdownPath="/tui/status-bar.md"
          markdownFilename="status-bar.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import StatusBar
from rich.console import Console

console = Console()

status = StatusBar([
    ("🤖", "co/gemini-2.5-pro", "magenta"),
    ("📊", "50%", "green"),
    ("", "main", "blue"),
])
console.print(status.render())`}
            result={`🤖 co/gemini-2.5-pro  📊 50%   main`}
            language="python"
          />
        </section>

        {/* Segments */}
        <section className="mb-12">
          <h2 className="heading-2">Segments</h2>

          <h3 className="heading-3">Text Segments</h3>
          <CodeWithResult
            code={`# (icon, text, color)
segments = [
    ("🤖", "gpt-4", "magenta"),
    ("💰", "$0.02", "yellow"),
    ("", "main", "blue"),
]`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Progress Segments</h3>
          <CodeWithResult
            code={`from connectonion.tui import StatusBar, ProgressSegment

status = StatusBar([
    ("🤖", "gpt-4", "magenta"),
    ProgressSegment(percent=78, bg_color="green"),
])
# Output: 🤖 gpt-4  ████████░░ 78%`}
            language="python"
          />
        </section>

        {/* ProgressSegment API */}
        <section className="mb-12">
          <h2 className="heading-2">ProgressSegment</h2>
          <CodeWithResult
            code={`ProgressSegment(
    percent: float,        # 0-100, how much used
    bg_color: str = "green",
    width: int = 10,
    show_percent: bool = True,
)`}
            language="python"
          />
        </section>

        {/* Styles */}
        <section className="mb-12">
          <h2 className="heading-2">Styles</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Uses powerline arrows for segment transitions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Falls back to unicode on terminals without powerline fonts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Works on both light and dark terminals</span>
            </li>
          </ul>
        </section>

        {/* Example Output */}
        <section className="mb-12">
          <h2 className="heading-2">Example Output</h2>
          <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
{`🤖 co/gemini-2.5-pro  📊 50%   main`}
          </pre>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
