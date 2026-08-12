'use client'

import { useState } from 'react'
import { HiOutlineDocumentText, HiOutlineClipboard, HiOutlineCheck, HiOutlineSparkles, HiOutlineArrowRight, HiOutlineBolt, HiOutlineBookOpen, HiOutlineCursorArrowRays, HiOutlineRocketLaunch, HiOutlineCodeBracket, HiOutlineCommandLine, HiOutlineArrowDownTray, HiOutlineChevronRight, HiOutlineViewfinderCircle } from 'react-icons/hi2'
import { FaBullseye, FaRocket, FaEnvelope, FaLightbulb, FaGift } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function VibeCodingPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const markdownContent = `# Vibe-Coding Support

Build AI Agents Correctly with Claude Code Plugin

## Overview

Code review and agent builder powered by actual ConnectOnion documentation. No hallucinations, no wrong patterns - every recommendation is documentation-grounded.

## Claude Code Plugin

### Quick Install

\`\`\`bash
# 1. Add plugin marketplace
/plugin marketplace add openonion/connectonion-claude-plugin

# 2. Install the plugin
/plugin install connectonion
\`\`\`

###Features

- **Documentation-Grounded**: Every recommendation based on actual ConnectOnion docs
- **Two Powerful Commands**:
  - \`/co-review\` - Code review against documentation
  - \`/co-build\` - Agent builder with best practices

### Usage

1. **Code Review**: Use \`/co-review\` to check your ConnectOnion code against official patterns
2. **Agent Builder**: Use \`/co-build\` to generate agents following documentation
3. **Ship**: Get correct code the first time

### Links

- GitHub: https://github.com/openonion/connectonion-claude-plugin
- Documentation: https://docs.connectonion.com

## For Other IDEs

The same vibe-coding approach works with Cursor, Copilot, or any AI coding assistant - just provide the ConnectOnion documentation context.
`

  // Add CSS for gradient animation
  const gradientStyle = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
  `

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language = 'python', id }: { code: string; language?: string; id: string }) => (
    <div className="relative group">
      <button
        onClick={() => handleCopyCode(code, id)}
        className="absolute right-2 top-2 p-2.5 min-w-[44px] min-h-[44px] bg-gray-700 hover:bg-gray-600 active:bg-gray-500 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 rounded-lg opacity-60 hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-10"
        aria-label="Copy code"
      >
        {copiedCode === id ? (
          <HiOutlineCheck className="w-4 h-4 text-gray-500" />
        ) : (
          <HiOutlineClipboard className="w-4 h-4 text-gray-200" />
        )}
      </button>
      <SyntaxHighlighter 
        language={language} 
        style={okaidia}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1.25rem',
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: '1.5',
          overflowX: 'auto'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <style jsx>{gradientStyle}</style>
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Getting Started', href: '/' },
            { label: 'Vibe-Coding Support' },
          ]}
          icon={HiOutlineCodeBracket}
          iconColor="icon-ui"
          title="Vibe-Coding Support"
          description="Build AI Agents Correctly with Claude Code Plugin"
          markdownPath="/tutorials/vibe-coding.md"
          markdownFilename="vibe-coding.md"
        />

        {/* Hero Section */}
        <section className="mb-24 md:mb-42 lg:mb-40">
          <div className="bg-gradient-to-br from-gray-500/10 to-transparent rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200 mb-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 rounded-full border border-gray-200 mb-6">
                <HiOutlineCommandLine className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Documentation-Grounded Development</span>
              </div>
              <h2 className="heading-2">
                Build ConnectOnion Agents <span className="text-gray-500">The Right Way</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                Code review and agent builder powered by actual ConnectOnion documentation. No hallucinations, no wrong patterns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 bg-white hover:bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-400 transition-all cursor-pointer">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <HiOutlineCommandLine className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">1. Install Plugin</p>
                  <p className="text-sm text-gray-600">2 simple commands</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white hover:bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-400 transition-all">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <HiOutlineCheck className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">2. Review or Build</p>
                  <p className="text-sm text-gray-600">Use /co commands</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white hover:bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-400 transition-all">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <HiOutlineRocketLaunch className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">3. Ship</p>
                  <p className="text-sm text-gray-600">Correct code, first time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claude Code Plugin - Installation */}
        <section className="mb-24 md:mb-42 lg:mb-40">
          <div className="relative bg-gradient-to-br from-gray-500/10 to-transparent rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                <HiOutlineCommandLine className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h2 className="heading-2">Claude Code Plugin</h2>
                <p className="text-gray-600 text-base md:text-lg">Code review & agent builder directly in Claude Code</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineCheck className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">Documentation-Grounded</h3>
                </div>
                <p className="text-sm text-gray-600">Every recommendation based on actual ConnectOnion docs. No hallucinations.</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineBolt className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">Two Powerful Commands</h3>
                </div>
                <p className="text-sm text-gray-600"><code className="bg-gray-800 text-gray-100 px-1 rounded">/co-review</code> for code review & <code className="bg-gray-800 text-gray-100 px-1 rounded">/co-build</code> for agent builder</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-4">
              <p className="text-sm text-gray-700 mb-4 font-semibold">Quick Install:</p>
              <div className="space-y-2">
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 select-none">1. </span>
                    <span className="text-gray-600">/plugin marketplace add openonion/connectonion-claude-plugin</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode('/plugin marketplace add openonion/connectonion-claude-plugin', 'plugin-marketplace')}
                    className="p-2.5 min-w-[44px] min-h-[44px] bg-gray-700 hover:bg-gray-600 active:bg-gray-500 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 rounded transition-all"
                  >
                    {copiedCode === 'plugin-marketplace' ? (
                      <HiOutlineCheck className="w-3.5 h-3.5 text-gray-500" />
                    ) : (
                      <HiOutlineClipboard className="w-3.5 h-3.5 text-gray-200" />
                    )}
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 select-none">2. </span>
                    <span className="text-gray-600">/plugin install connectonion</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode('/plugin install connectonion', 'plugin-install')}
                    className="p-2.5 min-w-[44px] min-h-[44px] bg-gray-700 hover:bg-gray-600 active:bg-gray-500 focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2 rounded transition-all"
                  >
                    {copiedCode === 'plugin-install' ? (
                      <HiOutlineCheck className="w-3.5 h-3.5 text-gray-500" />
                    ) : (
                      <HiOutlineClipboard className="w-3.5 h-3.5 text-gray-200" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/openonion/connectonion-claude-plugin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg transition-all text-sm font-medium text-gray-700"
              >
                <HiOutlineCodeBracket className="w-4 h-4" />
                <span>View on GitHub</span>
                <HiOutlineChevronRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('plugin-usage-examples')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-all text-sm text-gray-700"
              >
                <HiOutlineBookOpen className="w-4 h-4" />
                <span>See Examples</span>
              </button>
            </div>
          </div>
        </section>


        {/* Note: For Cursor/Copilot users, the same approach applies - drag the co-vibecoding documentation into your IDE */}

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
