'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function FormatsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const codeExample = `# All of these work - ConnectOnion just reads the text content:

agent = Agent("bot", system_prompt="""You are helpful...""")     # Direct string
agent = Agent("bot", system_prompt="prompts/assistant.md")       # Markdown
agent = Agent("bot", system_prompt="prompts/assistant.txt")      # Plain text
agent = Agent("bot", system_prompt="prompts/assistant.yaml")     # YAML
agent = Agent("bot", system_prompt="prompts/assistant.json")     # JSON
agent = Agent("bot", system_prompt="prompts/assistant")          # No extension`

  return (
    <main className="max-w-4xl mx-auto px-8 py-16 md:py-24 lg:py-16 pt-16 lg:pt-20">
      {/* Header */}
      <header className="mb-12">
        <h1 className="heading-1 mb-4">Prompt File Formats</h1>
        <p className="text-xl text-slate-100">
          Use any text file format. ConnectOnion just reads the content.
        </p>
      </header>

      {/* Key Point */}
      <section className="mb-12">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
          <p className="text-lg text-blue-100">
            <strong className="text-blue-300">Key Point:</strong> ConnectOnion doesn't parse formats - it just reads text and passes it to the LLM. Use whatever format your team prefers.
          </p>
        </div>
      </section>

      {/* Code Example */}
      <section className="mb-12">
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3">
            <span className="text-sm text-slate-100 font-mono">Supported Formats</span>
            <button
              onClick={() => copyToClipboard(codeExample, 'code')}
              className="p-2 rounded-lg text-slate-100 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {copiedId === 'code' ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="p-6">
            <SyntaxHighlighter
              language="python"
              style={monokai}
              customStyle={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}
            >
              {codeExample}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Why This Matters</h2>
        <ul className="space-y-3 text-slate-100">
          <li className="flex items-start gap-3">
            <span className="text-green-400">&#10003;</span>
            <span><strong>No lock-in</strong> - Use any format your team prefers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400">&#10003;</span>
            <span><strong>Future-proof</strong> - New formats work automatically</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400">&#10003;</span>
            <span><strong>Simple</strong> - No complex parsing or schemas</span>
          </li>
        </ul>
      </section>
    </main>
  )
}
