'use client'

import React from 'react'
import { HiOutlineMinus } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function DividerPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Divider' },
          ]}
          icon={HiOutlineMinus}
          iconColor="icon-ui"
          title="Divider"
          description="Simple horizontal line separator"
          markdownPath="/tui/divider.md"
          markdownFilename="divider.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import Divider
from rich.console import Console

console = Console()

divider = Divider()
console.print(divider.render())`}
            result={`────────────────────────────────────────`}
            language="python"
          />
        </section>

        {/* Configuration */}
        <section className="mb-12">
          <h2 className="heading-2">Configuration</h2>
          <CodeWithResult
            code={`# Custom width
divider = Divider(width=20)

# Custom character
divider = Divider(char="═")

# Custom style
divider = Divider(style="bold cyan")`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>
          <CodeWithResult
            code={`Divider(
    width: int = 40,
    char: str = "─",
    style: str = "dim",
)`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Methods</h3>
          <CodeWithResult
            code={`divider.render() -> Text  # Returns Rich Text object`}
            language="python"
          />
        </section>

        {/* Usage Example */}
        <section className="mb-12">
          <h2 className="heading-2">Usage Example</h2>
          <CodeWithResult
            code={`from connectonion.tui import Divider, StatusBar
from rich.console import Console

console = Console()

console.print(Divider().render())
console.print(StatusBar([("🤖", "gpt-4", "magenta")]).render())
console.print(Divider().render())`}
            result={`────────────────────────────────────────
🤖 gpt-4
────────────────────────────────────────`}
            language="python"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
