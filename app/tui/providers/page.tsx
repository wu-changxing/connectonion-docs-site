'use client'

import React from 'react'
import { HiOutlineCircleStack, HiOutlineDocumentText, HiOutlineListBullet, HiOutlineCodeBracket } from 'react-icons/hi2'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function ProvidersPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Providers' },
          ]}
          icon={HiOutlineCircleStack}
          iconColor="text-pink-400"
          iconBgFrom="from-pink-600/20"
          iconBgTo="to-purple-600/20"
          iconBorderColor="border-pink-500/30"
          title="Autocomplete Providers"
          description="Data providers for autocomplete in Input and CommandPalette"
          markdownPath="/tui/providers.md"
          markdownFilename="providers.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import Input, FileProvider, StaticProvider

# File autocomplete
text = Input(triggers={"@": FileProvider()}).run()

# Command autocomplete
commands = StaticProvider([
    ("/today", "/today", "Daily briefing"),
    ("/inbox", "/inbox", "Show emails"),
])
text = Input(triggers={"/": commands}).run()`}
            language="python"
          />
        </section>

        {/* StaticProvider */}
        <section className="mb-12">
          <h2 className="heading-2">StaticProvider</h2>
          <p className="text-slate-100 mb-4">
            Provider for static list of items:
          </p>

          <h3 className="heading-3">Simple (display, value)</h3>
          <CodeWithResult
            code={`from connectonion.tui import StaticProvider

provider = StaticProvider([
    ("/today", "/today"),
    ("/inbox", "/inbox"),
])`}
            language="python"
          />

          <h3 className="heading-3 mt-8">With Descriptions</h3>
          <CodeWithResult
            code={`provider = StaticProvider([
    ("/today", "/today", "Daily email briefing"),
    ("/inbox", "/inbox", "Show recent emails"),
])`}
            language="python"
          />

          <h3 className="heading-3 mt-8">With Icons</h3>
          <CodeWithResult
            code={`provider = StaticProvider([
    ("/today", "/today", "Daily briefing", "📅"),
    ("/inbox", "/inbox", "Show emails", "📥"),
])`}
            language="python"
          />
        </section>

        {/* FileProvider */}
        <section className="mb-12">
          <h2 className="heading-2">FileProvider</h2>
          <p className="text-slate-100 mb-4">
            Provider for filesystem autocomplete:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import FileProvider

# Default: current directory
provider = FileProvider()

# Custom root
provider = FileProvider(root="src/")

# Results include:
# - Folders with 📁 icon
# - Files with type-specific icons
# - Fuzzy matched against query`}
            language="python"
          />
        </section>

        {/* Custom Provider */}
        <section className="mb-12">
          <h2 className="heading-2">Custom Provider</h2>
          <p className="text-slate-100 mb-4">
            Implement the Provider protocol:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import DropdownItem

class MyProvider:
    def search(self, query: str) -> list[DropdownItem]:
        # Return matching items
        return [
            DropdownItem(display="Result", value="result"),
        ]`}
            language="python"
          />
        </section>

        {/* Provider Protocol */}
        <section className="mb-12">
          <h2 className="heading-2">Provider Protocol</h2>
          <CodeWithResult
            code={`class Provider(Protocol):
    def search(self, query: str) -> list[DropdownItem]:
        ...`}
            language="python"
          />
          <p className="text-sm text-slate-100 mt-4">
            Returns list of <code>DropdownItem</code> or tuples <code>(display, value, score, positions)</code>.
          </p>
        </section>

        {/* Built-in Providers Summary */}
        <section className="mb-12">
          <h2 className="heading-2">Built-in Providers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg hover:border-purple-400/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineDocumentText className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">FileProvider</h3>
              </div>
              <p className="text-sm text-slate-100">Browse filesystem with type-specific icons</p>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg hover:border-purple-400/50 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineListBullet className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold">StaticProvider</h3>
              </div>
              <p className="text-sm text-slate-100">Static list of options with optional metadata</p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/tui/input" className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 hover:border-purple-400/50 border border-transparent transition-all min-h-[48px]">
              <strong className="text-white">Input</strong>
              <p className="text-sm text-slate-100">Text input with trigger-based autocomplete</p>
            </Link>
            <Link href="/tui/dropdown" className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 hover:border-purple-400/50 border border-transparent transition-all min-h-[48px]">
              <strong className="text-white">Dropdown</strong>
              <p className="text-sm text-slate-100">The dropdown component that displays results</p>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
