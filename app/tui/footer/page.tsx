'use client'

import React from 'react'
import { HiOutlineRectangleGroup } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function FooterPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Footer' },
          ]}
          icon={HiOutlineRectangleGroup}
          iconColor="icon-ui"
          title="Footer"
          description="Simple footer with tips/hints display"
          markdownPath="/tui/footer.md"
          markdownFilename="footer.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import Footer
from rich.console import Console

console = Console()

footer = Footer(["? help", "/ commands", "@ contacts"])
console.print(footer.render())`}
            result={`? help  / commands  @ contacts`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>
          <CodeWithResult
            code={`Footer(tips: list[str])`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Methods</h3>
          <CodeWithResult
            code={`footer.render() -> Text  # Returns Rich Text object`}
            language="python"
          />
        </section>

        {/* Usage with Input */}
        <section className="mb-12">
          <h2 className="heading-2">Usage with Input</h2>
          <CodeWithResult
            code={`from connectonion.tui import Input, Footer

# Footer tips shown below input
text = Input(
    hints=["? help", "/ commands", "Enter submit"]
).run()`}
            language="python"
          />
        </section>

        {/* Example Output */}
        <section className="mb-12">
          <h2 className="heading-2">Example Output</h2>
          <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
{`? help  / commands  @ contacts`}
          </pre>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
