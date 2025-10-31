/**
 * @purpose Side-by-side code and output display component for interactive examples
 * @context Used throughout docs to show Python/JavaScript code with expected results
 * @llm-note Supports syntax highlighting via Prism, copy functionality per pane,
 *           REPL output formatting, responsive grid layout (stacks on mobile)
 */
/*
  DESIGN IMPROVEMENTS IMPLEMENTED:

  ✓ Mobile Responsiveness
    - Changed breakpoint from lg (1024px) to xl (1280px) for two-column layout
    - Improved font sizes with responsive scaling (0.8125rem on mobile, 0.875rem on desktop)
    - Better padding on mobile (p-4) and desktop (p-6)
    - Touch-friendly copy buttons (44x44px minimum)
    - Keyboard focus indicators with visible focus rings

  ✓ Accessibility
    - Copy buttons now 44x44px (WCAG touch target minimum)
    - Added aria-label for screen readers
    - Visible focus states with ring-2 ring-blue-500
    - Proper keyboard navigation

  ✓ Visual Hierarchy
    - Simplified headers (removed gradients)
    - Consistent spacing and sizing
    - Better prominence for interactive status indicator
*/

'use client'

import { useState } from 'react'
import { Copy, Check, Play, Terminal, FileCode, ChevronRight } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeWithResultProps {
  code: string
  result?: string
  language?: string
  className?: string
  showRunButton?: boolean
  fileName?: string
}

export default function CodeWithResult({ 
  code, 
  result, 
  language = 'python',
  className = '',
  showRunButton = false,
  fileName
}: CodeWithResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Function to render Python REPL output with syntax highlighting
  const renderPythonRepl = (text: string) => {
    const lines = text.split('\n')
    
    return lines.map((line, index) => {
      const trimmedLine = line.trimStart()
      const indent = line.length - trimmedLine.length
      
      // Python prompt lines
      if (trimmedLine.startsWith('>>>') || trimmedLine.startsWith('...')) {
        const prompt = trimmedLine.substring(0, 3)
        const code = trimmedLine.substring(3)

        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-emerald-400 select-none">{' '.repeat(indent)}{prompt}</span>
            <span className="text-gray-100">{code}</span>
          </div>
        )
      }
      
      // Comments (both in prompts and outputs)
      if (trimmedLine.includes('#')) {
        const parts = line.split('#')
        const beforeComment = parts[0]
        const comment = parts.slice(1).join('#')

        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-gray-100">{beforeComment}</span>
            <span className="text-gray-500">#{comment}</span>
          </div>
        )
      }

      // String outputs (in quotes)
      if (trimmedLine.match(/^["'].*["']$/)) {
        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-amber-400">{line}</span>
          </div>
        )
      }

      // Numbers
      if (trimmedLine.match(/^\d+(\.\d+)?$/)) {
        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-cyan-400">{line}</span>
          </div>
        )
      }

      // Boolean values
      if (trimmedLine === 'True' || trimmedLine === 'False' || trimmedLine === 'None') {
        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-purple-400">{line}</span>
          </div>
        )
      }

      // Dict/List representations
      if (trimmedLine.startsWith('{') || trimmedLine.startsWith('[') || trimmedLine.startsWith('(')) {
        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-blue-400">{line}</span>
          </div>
        )
      }

      // Object representations like <ClassName>
      if (trimmedLine.match(/^<.*>$/)) {
        return (
          <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6">
            <span className="text-violet-400">{line}</span>
          </div>
        )
      }

      // Default output
      return (
        <div key={index} className="font-mono text-[0.8125rem] md:text-sm leading-6 text-gray-200">
          {line || '\u00A0'}
        </div>
      )
    })
  }

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden shadow-xl shadow-black/50 border border-gray-800 ${className}`}>
      <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-gray-800">
        {/* Code Section */}
        <div className="relative">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              {language === 'python' ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.914 0zM8.708 1.85c.578 0 1.049.47 1.049 1.048s-.47 1.049-1.049 1.049-1.049-.47-1.049-1.049.47-1.048 1.049-1.048z" fill="#3776AB"/>
                      <path d="M12.087 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121s3.9.445 3.9-5.735c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.452s-3.24-.052-3.24 3.148v5.292S5.72 24 12.087 24zm3.206-1.85c-.578 0-1.049-.47-1.049-1.048s.47-1.049 1.049-1.049 1.049.47 1.049 1.049-.47 1.048-1.049 1.048z" fill="#FFD43B"/>
                    </svg>
                  </div>
                  <span className="text-sm text-gray-100 font-mono">{fileName || 'main.py'}</span>
                </div>
              ) : language === 'typescript' || language === 'javascript' ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{language === 'typescript' ? 'TS' : 'JS'}</span>
                  </div>
                  <span className="text-sm text-gray-100 font-mono">{fileName || `app.${language === 'typescript' ? 'ts' : 'js'}`}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-100 font-mono">{fileName || 'code'}</span>
                </div>
              )}
            </div>
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors p-2.5 rounded hover:bg-gray-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className="p-4 md:p-6 overflow-x-auto custom-scrollbar">
            <SyntaxHighlighter
              language={language}
              style={monokai}
              customStyle={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                fontSize: '0.8125rem',
                lineHeight: '1.7',
                overflow: 'visible',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
              }}
              showLineNumbers={true}
              wrapLines={false}
              wrapLongLines={false}
              PreTag="div"
              codeTagProps={{
                style: {
                  fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)'
                }
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <div className="relative">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <ChevronRight className="w-3 h-3 text-gray-500" />
                </div>
                <span className="text-sm text-gray-100 font-mono">Python REPL</span>
                <div className="flex items-center gap-1.5 ml-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Interactive</span>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6 overflow-x-auto custom-scrollbar bg-gray-950">
              <div className="space-y-0.5">
                {renderPythonRepl(result)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}