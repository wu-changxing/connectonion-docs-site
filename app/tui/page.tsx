'use client'

import React from 'react'
import { HiOutlineCommandLine, HiOutlineLanguage, HiOutlineChevronDown, HiOutlineChartBar, HiOutlineRectangleGroup, HiOutlineMinus, HiOutlineMagnifyingGlass, HiOutlineCircleStack, HiOutlineArrowRight, HiOutlineCodeBracket } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import CodeWithResult from '../../components/CodeWithResult'

const components = [
  { id: 'chat', name: 'Chat', title: 'Chat', description: 'Full chat interface with agent integration', icon: HiOutlineCommandLine, href: '/tui/chat', usage: 'Chat(agent=agent).run()', category: 'input' },
  { id: 'pick', name: 'pick', title: 'pick', description: 'Single-select menu with keyboard navigation', icon: HiOutlineChevronDown, href: '/tui/pick', usage: 'pick("Select model", ["gpt-4", "claude-3"])', category: 'input' },
  { id: 'input', name: 'Input', title: 'Input', description: 'Smart text input with trigger-based autocomplete', icon: HiOutlineLanguage, href: '/tui/input', usage: 'Input(triggers={"@": FileProvider()}).run()', category: 'input' },
  { id: 'dropdown', name: 'Dropdown', title: 'Dropdown', description: 'Selection list component for autocomplete menus', icon: HiOutlineChevronDown, href: '/tui/dropdown', usage: 'Dropdown(items, max_visible=5)', category: 'input' },
  { id: 'status-bar', name: 'StatusBar', title: 'StatusBar', description: 'Powerline-style status bar with colored segments', icon: HiOutlineChartBar, href: '/tui/status-bar', usage: 'StatusBar([("model", "gpt-4", "magenta")])', category: 'display' },
  { id: 'footer', name: 'Footer', title: 'Footer', description: 'Simple footer with tips/hints display', icon: HiOutlineRectangleGroup, href: '/tui/footer', usage: 'Footer(["? help", "/ commands"])', category: 'display' },
  { id: 'divider', name: 'Divider', title: 'Divider', description: 'Simple horizontal line separator', icon: HiOutlineMinus, href: '/tui/divider', usage: 'Divider(width=40)', category: 'display' },
  { id: 'fuzzy', name: 'fuzzy_match', title: 'Fuzzy Matching', description: 'Fuzzy matching utilities for autocomplete', icon: HiOutlineMagnifyingGlass, href: '/tui/fuzzy', usage: 'fuzzy_match("gp", "gpt-4")', category: 'utility' },
  { id: 'keys', name: 'getch / read_key', title: 'Keyboard Input', description: 'Low-level keyboard input primitives', icon: HiOutlineCommandLine, href: '/tui/keys', usage: 'key = read_key()  # "up", "down", etc.', category: 'utility' },
  { id: 'providers', name: 'Providers', title: 'Autocomplete Providers', description: 'Data providers for autocomplete (FileProvider, StaticProvider)', icon: HiOutlineCircleStack, href: '/tui/providers', usage: 'FileProvider(root="src/")', category: 'utility' },
]

const categories = [
  { id: 'input', title: 'Input Components', description: 'Interactive input elements' },
  { id: 'display', title: 'Display Components', description: 'Visual layout elements' },
  { id: 'utility', title: 'Utilities', description: 'Helper functions and providers' },
]

export default function TUIPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
          <Link href="/" className="hover:text-gray-500 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-4 h-4" />
          <span className="text-gray-900">TUI Components</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                <HiOutlineCommandLine className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h1 className="heading-1">TUI Components</h1>
                <p className="text-lg text-gray-700">
                  Terminal UI components from <code className="bg-gray-100 px-2 py-1 rounded text-gray-600">connectonion.tui</code>
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/tui.md" filename="tui.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2 flex items-center gap-2">
            <HiOutlineCodeBracket className="w-5 h-5 text-gray-500" />
            Quick Start
          </h2>
          <CodeWithResult
            code={`from connectonion.tui import pick, Input, StatusBar
from rich.console import Console

console = Console()

# Single-select menu
choice = pick("Select model:", ["gpt-4", "claude-3", "gemini-pro"])

# Text input with file autocomplete
from connectonion.tui import FileProvider
text = Input(triggers={"@": FileProvider()}).run()

# Status bar
status = StatusBar([
    ("model", "gpt-4", "magenta"),
    ("tokens", "1.2k", "green"),
])
console.print(status.render())`}
            result=""
            language="python"
          />
        </div>

        {/* Architecture */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">Architecture</h2>
          <pre className="bg-gray-100 border border-gray-200 rounded p-4 overflow-x-auto text-sm text-gray-700">
{`User Input → TUI Component → Terminal (Rich) → User
     ↑                              ↓
     └──── Keyboard Events ────────┘`}
          </pre>
          <p className="text-gray-700 mt-4">
            Components use <strong>Rich</strong> for terminal rendering, <strong>raw mode</strong> for keyboard capture, and <strong>ANSI codes</strong> for styling.
          </p>
        </div>

        {/* Components by Category */}
        {categories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="heading-2">{category.title}</h2>
            <p className="text-gray-700 mb-6">{category.description}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {components
                .filter(c => c.category === category.id)
                .map((component) => (
                  <Link
                    key={component.id}
                    href={component.href}
                    className="group block p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:border-gray-400 transition-colors">
                        <component.icon className="w-4.5 h-4.5 text-gray-500 group-hover:text-gray-700 transition-colors" style={{width:'1.125rem',height:'1.125rem'}} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                          {component.title}
                        </h3>
                        <code className="text-xs text-gray-700">{component.name}</code>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{component.description}</p>
                    <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded block overflow-x-auto">
                      {component.usage}
                    </code>
                  </Link>
                ))}
            </div>
          </div>
        ))}

        {/* Quick Reference Table */}
        <div className="mb-12">
          <h2 className="heading-2">Quick Reference</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Component</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Purpose</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Import</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/chat" className="text-gray-700 font-medium hover:text-gray-900">Chat</Link></td>
                  <td className="px-4 py-3 text-gray-600">Full chat interface with agent</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import Chat</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/input" className="text-gray-700 font-medium hover:text-gray-900">Input</Link></td>
                  <td className="px-4 py-3 text-gray-600">Text input with autocomplete</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import Input</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/pick" className="text-gray-700 font-medium hover:text-gray-900">pick</Link></td>
                  <td className="px-4 py-3 text-gray-600">Single-select menu</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import pick</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/dropdown" className="text-gray-700 font-medium hover:text-gray-900">Dropdown</Link></td>
                  <td className="px-4 py-3 text-gray-600">Dropdown menus</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import Dropdown</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/status-bar" className="text-gray-700 font-medium hover:text-gray-900">StatusBar</Link></td>
                  <td className="px-4 py-3 text-gray-600">Powerline-style status</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import StatusBar</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/footer" className="text-gray-700 font-medium hover:text-gray-900">Footer</Link></td>
                  <td className="px-4 py-3 text-gray-600">Footer with help text</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import Footer</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/divider" className="text-gray-700 font-medium hover:text-gray-900">Divider</Link></td>
                  <td className="px-4 py-3 text-gray-600">Visual dividers</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import Divider</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/fuzzy" className="text-gray-700 font-medium hover:text-gray-900">fuzzy</Link></td>
                  <td className="px-4 py-3 text-gray-600">Fuzzy matching</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import fuzzy_match</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/keys" className="text-gray-700 font-medium hover:text-gray-900">keys</Link></td>
                  <td className="px-4 py-3 text-gray-600">Keyboard input</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import getch</code></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href="/tui/providers" className="text-gray-700 font-medium hover:text-gray-900">providers</Link></td>
                  <td className="px-4 py-3 text-gray-600">Autocomplete data sources</td>
                  <td className="px-4 py-3"><code className="text-xs text-gray-600">from connectonion.tui import FileProvider</code></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
