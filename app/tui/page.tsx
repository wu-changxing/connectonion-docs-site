'use client'

import React from 'react'
import { HiOutlineCommandLine, HiOutlineLanguage, HiOutlineChevronDown, HiOutlineChartBar, HiOutlineRectangleGroup, HiOutlineMinus, HiOutlineMagnifyingGlass, HiOutlineCircleStack, HiOutlineArrowRight, HiOutlineCodeBracket } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import CodeWithResult from '../../components/CodeWithResult'

const components = [
  {
    id: 'chat',
    name: 'Chat',
    title: 'Chat',
    description: 'Full chat interface with agent integration',
    icon: HiOutlineCommandLine,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-900/20',
    borderColor: 'border-emerald-500/30',
    href: '/tui/chat',
    usage: 'Chat(agent=agent).run()',
    category: 'input'
  },
  {
    id: 'pick',
    name: 'pick',
    title: 'pick',
    description: 'Single-select menu with keyboard navigation',
    icon: HiOutlineChevronDown,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-500/30',
    href: '/tui/pick',
    usage: 'pick("Select model", ["gpt-4", "claude-3"])',
    category: 'input'
  },
  {
    id: 'input',
    name: 'Input',
    title: 'Input',
    description: 'Smart text input with trigger-based autocomplete',
    icon: HiOutlineLanguage,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-500/30',
    href: '/tui/input',
    usage: 'Input(triggers={"@": FileProvider()}).run()',
    category: 'input'
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    title: 'Dropdown',
    description: 'Selection list component for autocomplete menus',
    icon: HiOutlineChevronDown,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-500/30',
    href: '/tui/dropdown',
    usage: 'Dropdown(items, max_visible=5)',
    category: 'input'
  },
  {
    id: 'status-bar',
    name: 'StatusBar',
    title: 'StatusBar',
    description: 'Powerline-style status bar with colored segments',
    icon: HiOutlineChartBar,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-500/30',
    href: '/tui/status-bar',
    usage: 'StatusBar([("model", "gpt-4", "magenta")])',
    category: 'display'
  },
  {
    id: 'footer',
    name: 'Footer',
    title: 'Footer',
    description: 'Simple footer with tips/hints display',
    icon: HiOutlineRectangleGroup,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/30',
    href: '/tui/footer',
    usage: 'Footer(["? help", "/ commands"])',
    category: 'display'
  },
  {
    id: 'divider',
    name: 'Divider',
    title: 'Divider',
    description: 'Simple horizontal line separator',
    icon: HiOutlineMinus,
    color: 'text-slate-400',
    bgColor: 'bg-slate-900/20',
    borderColor: 'border-slate-500/30',
    href: '/tui/divider',
    usage: 'Divider(width=40)',
    category: 'display'
  },
  {
    id: 'fuzzy',
    name: 'fuzzy_match',
    title: 'Fuzzy Matching',
    description: 'Fuzzy matching utilities for autocomplete',
    icon: HiOutlineMagnifyingGlass,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-500/30',
    href: '/tui/fuzzy',
    usage: 'fuzzy_match("gp", "gpt-4")',
    category: 'utility'
  },
  {
    id: 'keys',
    name: 'getch / read_key',
    title: 'Keyboard Input',
    description: 'Low-level keyboard input primitives',
    icon: HiOutlineCommandLine,
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500/30',
    href: '/tui/keys',
    usage: 'key = read_key()  # "up", "down", etc.',
    category: 'utility'
  },
  {
    id: 'providers',
    name: 'Providers',
    title: 'Autocomplete Providers',
    description: 'Data providers for autocomplete (FileProvider, StaticProvider)',
    icon: HiOutlineCircleStack,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20',
    borderColor: 'border-pink-500/30',
    href: '/tui/providers',
    usage: 'FileProvider(root="src/")',
    category: 'utility'
  },
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
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-4 h-4" />
          <span className="text-gray-900">TUI Components</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl border border-purple-200">
                <HiOutlineCommandLine className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="heading-1">TUI Components</h1>
                <p className="text-lg text-gray-700">
                  Terminal UI components from <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">connectonion.tui</code>
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/tui.md" filename="tui.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg border border-purple-200">
          <h2 className="heading-2 flex items-center gap-2">
            <HiOutlineCodeBracket className="w-5 h-5 text-purple-400" />
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
        <div className="mb-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h2 className="heading-2">Architecture</h2>
          <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-gray-700">
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
                    className={`group block p-4 rounded-lg border ${component.borderColor} ${component.bgColor} hover:border-purple-400/50 hover:bg-gray-100 transition-all min-h-[48px]`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gray-800 ${component.color}`}>
                        <component.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-300 transition-colors">
                          {component.title}
                        </h3>
                        <code className="text-xs text-gray-700">{component.name}</code>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{component.description}</p>
                    <code className="text-xs text-purple-300 bg-gray-900 px-2 py-1 rounded block overflow-x-auto">
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
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-700">Component</th>
                  <th className="text-left py-2 text-gray-700">Purpose</th>
                  <th className="text-left py-2 text-gray-700">Import</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/chat" className="text-purple-400 hover:text-purple-300">Chat</Link></td>
                  <td className="py-2 text-gray-700">Full chat interface with agent</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import Chat</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/input" className="text-purple-400 hover:text-purple-300">Input</Link></td>
                  <td className="py-2 text-gray-700">Text input with autocomplete</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import Input</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/pick" className="text-purple-400 hover:text-purple-300">pick</Link></td>
                  <td className="py-2 text-gray-700">Single-select menu</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import pick</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/dropdown" className="text-purple-400 hover:text-purple-300">Dropdown</Link></td>
                  <td className="py-2 text-gray-700">Dropdown menus</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import Dropdown</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/status-bar" className="text-purple-400 hover:text-purple-300">StatusBar</Link></td>
                  <td className="py-2 text-gray-700">Powerline-style status</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import StatusBar</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/footer" className="text-purple-400 hover:text-purple-300">Footer</Link></td>
                  <td className="py-2 text-gray-700">Footer with help text</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import Footer</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/divider" className="text-purple-400 hover:text-purple-300">Divider</Link></td>
                  <td className="py-2 text-gray-700">Visual dividers</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import Divider</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/fuzzy" className="text-purple-400 hover:text-purple-300">fuzzy</Link></td>
                  <td className="py-2 text-gray-700">Fuzzy matching</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import fuzzy_match</code></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2"><Link href="/tui/keys" className="text-purple-400 hover:text-purple-300">keys</Link></td>
                  <td className="py-2 text-gray-700">Keyboard input</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import getch</code></td>
                </tr>
                <tr>
                  <td className="py-2"><Link href="/tui/providers" className="text-purple-400 hover:text-purple-300">providers</Link></td>
                  <td className="py-2 text-gray-700">Autocomplete data sources</td>
                  <td className="py-2"><code className="text-xs">from connectonion.tui import FileProvider</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
