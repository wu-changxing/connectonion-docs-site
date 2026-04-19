'use client'

import { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineArrowRight, HiOutlineInformationCircle } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function FormatsPage() {
  const [copied, setCopied] = useState(false)

  const codeExample = `# All of these work - ConnectOnion just reads the text content:

agent = Agent("bot", system_prompt="""You are helpful...""")     # Direct string
agent = Agent("bot", system_prompt="prompts/assistant.md")       # Markdown
agent = Agent("bot", system_prompt="prompts/assistant.txt")      # Plain text
agent = Agent("bot", system_prompt="prompts/assistant.yaml")     # YAML
agent = Agent("bot", system_prompt="prompts/assistant.json")     # JSON
agent = Agent("bot", system_prompt="prompts/assistant")          # No extension`

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-700 transition-colors">Docs</Link>
          <HiOutlineArrowRight className="w-3 h-3" />
          <Link href="/prompts" className="hover:text-gray-700 transition-colors">System Prompts</Link>
          <HiOutlineArrowRight className="w-3 h-3" />
          <span className="text-gray-700">Prompt Formats</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-1">Prompt File Formats</h1>
          <p className="text-lg text-gray-600 mt-2">
            Use any text file format. ConnectOnion just reads the content.
          </p>
        </div>

        {/* Key Point */}
        <div className="callout mb-10">
          <div className="flex items-start gap-3">
            <HiOutlineInformationCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Key Point</p>
              <p className="text-gray-600 text-sm">
                ConnectOnion doesn't parse formats — it just reads text and passes it to the LLM.
                Use whatever format your team prefers.
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <section className="mb-12">
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <span className="text-sm text-gray-300 font-mono">Supported Formats</span>
              <button
                onClick={copyCode}
                className="text-gray-400 hover:text-gray-200 transition-colors p-1"
              >
                {copied ? (
                  <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                ) : (
                  <HiOutlineClipboard className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="p-4">
              <SyntaxHighlighter
                language="python"
                style={okaidia}
                customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.875rem', lineHeight: '1.6' }}
              >
                {codeExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="mb-12">
          <h2 className="heading-2">Why This Matters</h2>
          <ul className="space-y-3">
            {[
              { title: 'No lock-in', desc: 'Use any format your team already prefers' },
              { title: 'Future-proof', desc: 'New formats work automatically without code changes' },
              { title: 'Simple', desc: 'No complex parsing, schemas, or converters needed' },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm"><strong className="text-gray-900">{item.title}</strong> — {item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Format Details */}
        <section className="mb-12">
          <h2 className="heading-2">Format Details</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { ext: '.md', note: 'Markdown — most readable, supports headers and lists' },
              { ext: '.txt', note: 'Plain text — simple and universal' },
              { ext: '.yaml', note: 'YAML — good for structured metadata alongside prompt text' },
              { ext: '.json', note: 'JSON — machine-readable, easy to generate programmatically' },
              { ext: '(none)', note: 'No extension — any text file works' },
            ].map((f) => (
              <div key={f.ext} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="font-mono text-sm text-gray-700 w-20 flex-shrink-0">{f.ext}</span>
                <span className="text-gray-600 text-sm">{f.note}</span>
              </div>
            ))}
          </div>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
