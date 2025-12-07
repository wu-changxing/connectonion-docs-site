'use client'

import React from 'react'
import { Type, Zap, Lightbulb, Palette } from 'lucide-react'
import { ContentNavigation } from '../../../components/ContentNavigation'
import Link from 'next/link'
import CodeWithResult from '../../../components/CodeWithResult'
import { PageHeader } from '../../../components/PageHeader'

export default function InputPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'TUI', href: '/tui' },
            { label: 'Input' },
          ]}
          icon={Type}
          iconColor="text-blue-400"
          iconBgFrom="from-blue-600/20"
          iconBgTo="to-cyan-600/20"
          iconBorderColor="border-blue-500/30"
          title="Input"
          description="Smart text input with trigger-based autocomplete"
          markdownPath="/tui/input.md"
          markdownFilename="input.md"
        />

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="heading-2">Quick Start</h2>
          <CodeWithResult
            code={`from connectonion.tui import Input

# Simple input
text = Input().run()

# With file autocomplete
from connectonion.tui import FileProvider
text = Input(triggers={"@": FileProvider()}).run()`}
            language="python"
          />
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="heading-2">Features</h2>

          <h3 className="heading-3">Trigger Autocomplete</h3>
          <p className="text-slate-100 mb-4">
            Type a trigger character to activate autocomplete from a provider:
          </p>
          <CodeWithResult
            code={`from connectonion.tui import Input, FileProvider, StaticProvider

# @ triggers file browser
text = Input(triggers={"@": FileProvider()}).run()
# User types: "edit @src/" → shows file dropdown

# / triggers command palette
commands = StaticProvider([("/today", "/today"), ("/inbox", "/inbox")])
text = Input(triggers={"/": commands}).run()`}
            language="python"
          />

          <h3 className="heading-3 mt-8">Hints and Tips</h3>
          <CodeWithResult
            code={`text = Input(
    hints=["/ commands", "@ files", "Enter submit"],
    tips=["Try /today for briefing", "Join Discord!"],
    divider=True,
).run()`}
            language="python"
          />
        </section>

        {/* API */}
        <section className="mb-12">
          <h2 className="heading-2">API</h2>
          <CodeWithResult
            code={`Input(
    prompt: str = None,       # Custom prompt text
    triggers: dict = None,    # {char: Provider} for autocomplete
    hints: list[str] = None,  # Always-visible hints
    tips: list[str] = None,   # Rotating tips
    divider: bool = False,    # Add horizontal dividers
    max_visible: int = 8,     # Max dropdown items
    console: Console = None,
    style: str = "modern",    # "modern", "minimal", "classic"
).run() -> str`}
            language="python"
          />
        </section>

        {/* Styles */}
        <section className="mb-12">
          <h2 className="heading-2">Styles</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold">modern</h3>
              </div>
              <p className="text-sm text-slate-100">Magenta prompt, clean design</p>
            </div>
            <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-gray-400" />
                <h3 className="font-semibold">minimal</h3>
              </div>
              <p className="text-sm text-slate-100">Bare bones, no decorations</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold">classic</h3>
              </div>
              <p className="text-sm text-slate-100">Traditional input style</p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mb-12">
          <h2 className="heading-2">Related</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/tui/providers" className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 hover:border-purple-400/50 border border-transparent transition-all min-h-[48px]">
              <strong className="text-white">Providers</strong>
              <p className="text-sm text-slate-100">Learn about FileProvider and StaticProvider</p>
            </Link>
            <Link href="/tui/dropdown" className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 hover:border-purple-400/50 border border-transparent transition-all min-h-[48px]">
              <strong className="text-white">Dropdown</strong>
              <p className="text-sm text-slate-100">The dropdown component used by Input</p>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
