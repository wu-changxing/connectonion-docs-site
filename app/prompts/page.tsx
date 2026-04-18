'use client'

import { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineDocumentText, HiOutlineArrowRight, HiOutlineInformationCircle, HiOutlineExclamationTriangle, HiOutlineFolderOpen, HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Link from 'next/link'
import { ContentNavigation } from '../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

export default function PromptsOverviewPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const quickStartCode = `from connectonion import Agent

# Method 1 (Recommended): Load from Markdown file
agent = Agent(
    name="expert",
    system_prompt="prompts/expert.md",  # Versioned prompt content
    tools=[...]
)

# Method 2: Path object
from pathlib import Path
agent = Agent(
    name="specialist",
    system_prompt=Path("prompts/specialist.txt"),
    tools=[...]
)`

  const recommendedMarkdown = `# Assistant
You are a helpful, concise assistant. When answering:

- Be direct and use simple language
- Prefer bullet points over long paragraphs
- Ask one clarifying question if necessary before acting

Output format:
- Start with a one-sentence summary
- Then provide numbered steps if applicable
`

  const loadFromMarkdown = `from connectonion import Agent

agent = Agent(
    name="assistant",
    system_prompt="prompts/assistant.md",  # Recommended: Markdown file
    tools=[...]
)

print(agent.input("Summarize the key points of our meeting notes."))`

  const folderTree = `prompts/
  assistant.md
  expert/
    researcher.md
`

  const iterationCode = `from connectonion import Agent

# Set a global limit for this agent
agent = Agent(
    name="helper",
    system_prompt="You are precise and concise.",
    tools=[...],
    max_iterations=15  # default limit for this agent
)

# For one-off complex tasks, override per call
result = agent.input(
    "Plan a 3-step workflow using the available tools",
    max_iterations=25
)`

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-3 h-3" />
          <span className="text-gray-900">System Prompts</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                <HiOutlineChatBubbleOvalLeft className="w-8 h-8 icon-ui" />
              </div>
              <div>
                <h1 className="heading-1">System Prompts</h1>
                <p className="text-lg text-gray-700">
                  Define your agent's personality, behavior, and approach to tasks.
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/prompts/prompts.md" filename="prompts.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Recommended: Markdown Files */}
        <section className="mb-16">
          <div className="callout mb-6">
            <div className="flex items-start gap-3">
              <HiOutlineInformationCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">Recommended: Keep prompts in Markdown files</h2>
                <p className="text-gray-600 text-sm mb-3">
                  Store prompts in versioned <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">.md</code> files. This keeps code clean, enables easy edits and reviews, and works across tools.
                </p>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Readable and diff-friendly</li>
                  <li>Reusable across multiple agents</li>
                  <li>Simple to test and iterate</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Folder tree */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span className="text-sm text-gray-300 font-mono flex items-center gap-2">
                  <HiOutlineFolderOpen className="w-4 h-4 text-gray-400" />
                  project structure
                </span>
                <button
                  onClick={() => copyToClipboard(folderTree, 'folderTree')}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                >
                  {copiedId === 'folderTree' ? (
                    <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                  ) : (
                    <HiOutlineClipboard className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <SyntaxHighlighter
                  language="bash"
                  style={monokai}
                  customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
                >
                  {folderTree}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Markdown prompt example */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span className="text-sm text-gray-300 font-mono">prompts/assistant.md</span>
                <button
                  onClick={() => copyToClipboard(recommendedMarkdown, 'recommendedMarkdown')}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                >
                  {copiedId === 'recommendedMarkdown' ? (
                    <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                  ) : (
                    <HiOutlineClipboard className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <SyntaxHighlighter
                  language="markdown"
                  style={monokai}
                  customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
                >
                  {recommendedMarkdown}
                </SyntaxHighlighter>
              </div>
            </div>

            {/* Load from markdown */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span className="text-sm text-gray-300 font-mono">load_markdown.py</span>
                <button
                  onClick={() => copyToClipboard(loadFromMarkdown, 'loadFromMarkdown')}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                >
                  {copiedId === 'loadFromMarkdown' ? (
                    <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                  ) : (
                    <HiOutlineClipboard className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <SyntaxHighlighter
                  language="python"
                  style={monokai}
                  customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
                >
                  {loadFromMarkdown}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="callout-sm mt-6 border-l-2 border-gray-300">
            <div className="flex items-start gap-3">
              <HiOutlineExclamationTriangle className="w-4 h-4 icon-ui mt-0.5 flex-shrink-0" />
              <p className="text-gray-600 text-sm">
                Avoid embedding large prompt strings directly in code. It makes diffs noisy and complicates collaboration. Prefer <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800">.md</code> files and reference them from your agent.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="heading-2">Quick Start</h2>

          <p className="text-gray-700 mb-8">
            ConnectOnion offers three ways to provide system prompts. We recommend Markdown files.
          </p>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="space-y-3">
              {[
                { n: '1', label: 'Markdown File', sublabel: 'Recommended', desc: 'Store prompts in prompts/*.md and reference by path. Best for collaboration, reviews, and reuse.' },
                { n: '2', label: 'Path Object', sublabel: null, desc: 'Use pathlib.Path when you need explicit file existence checks.' },
                { n: '3', label: 'Direct String', sublabel: 'for quick demos', desc: 'Acceptable for tiny demos or notebooks, but keep production prompts in Markdown files.' },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="step-badge flex-shrink-0">{step.n}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {step.label}
                      {step.sublabel && <span className="ml-2 text-xs font-normal text-gray-500">({step.sublabel})</span>}
                    </h4>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <span className="text-sm text-gray-300 font-mono">quick_start.py</span>
                <button
                  onClick={() => copyToClipboard(quickStartCode, 'quick-start')}
                  className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                >
                  {copiedId === 'quick-start' ? (
                    <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                  ) : (
                    <HiOutlineClipboard className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <SyntaxHighlighter
                  language="python"
                  style={monokai}
                  customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}
                >
                  {quickStartCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </section>

        {/* Iteration Control */}
        <section className="mb-16">
          <h2 className="heading-2">Iteration Control (max_iterations)</h2>
          <p className="text-gray-700 mb-6">
            You can set a default iteration limit on the agent, and still override it for specific tasks.
          </p>

          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <span className="text-sm text-gray-300 font-mono">iterations.py</span>
              <button
                onClick={() => copyToClipboard(iterationCode, 'iterations')}
                className="text-gray-400 hover:text-gray-200 transition-colors p-1"
              >
                {copiedId === 'iterations' ? (
                  <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                ) : (
                  <HiOutlineClipboard className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="p-4">
              <SyntaxHighlighter
                language="python"
                style={monokai}
                customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}
              >
                {iterationCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section className="mb-16">
          <h2 className="heading-2">Supported File Formats</h2>

          <div className="grid grid-cols-1 gap-3">
            {[
              { ext: '.md', name: 'Markdown', desc: 'Human-readable, structured prompts' },
              { ext: '.yaml', name: 'YAML', desc: 'Structured data with metadata' },
              { ext: '.json', name: 'JSON', desc: 'Machine-readable with schemas' },
              { ext: '.txt', name: 'Plain Text', desc: 'Simple text prompts' },
              { ext: '(none)', name: 'No Extension', desc: 'Any text file works' },
            ].map((format) => (
              <div key={format.ext} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors flex items-center gap-4">
                <HiOutlineDocumentText className="w-5 h-5 icon-ui flex-shrink-0" />
                <span className="font-mono text-sm text-gray-700 w-16 flex-shrink-0">{format.ext}</span>
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{format.name}</span>
                  <span className="text-gray-500 text-sm ml-2">— {format.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-16">
          <h2 className="heading-2">What's Next</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/prompts/examples"
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Prompt Examples</h3>
                <HiOutlineArrowRight className="w-4 h-4 icon-ui group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-gray-600 text-sm">
                Explore real-world prompt examples for different roles and domains.
              </p>
            </Link>

            <Link
              href="/prompts/examples"
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Examples</h3>
                <HiOutlineArrowRight className="w-4 h-4 icon-ui group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-gray-600 text-sm">
                Browse real-world prompt examples for different roles and domains.
              </p>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
