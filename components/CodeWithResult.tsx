/**
 * @purpose Vertical code and output display component for interactive examples
 * @llm-note
 *   Dependencies: imports from [react, lucide-react, react-syntax-highlighter] | imported by [app/page.tsx, app/quickstart/page.tsx, app/agent/page.tsx, +8 more]
 *   Data flow: receives {code: string, result?: string, language?: string} → syntax highlights code via Prism → colorizes REPL output → vertical stack (code on top, output below)
 *   State/Effects: manages copied state (2s timeout) | writes to clipboard | no external API calls
 *   Integration: exposes CodeWithResult component | supports python/typescript/javascript syntax | Python REPL formatting (>>>, ..., colored outputs)
 *   Performance: uses react-syntax-highlighter with monokai theme | inline REPL colorization (regex pattern matching) | responsive clamp() font sizing
 *   UX: 44px copy button | vertical layout for full-width code display | interactive status indicator | language icons (Python/TS/JS)
 */
/*
  DESIGN IMPROVEMENTS IMPLEMENTED:

  ✓ Layout
    - Vertical stacked layout (code top, output bottom) for full-width code display
    - No horizontal scrolling for typical code lines
    - Consistent layout across all screen sizes
    - Better readability for longer code examples

  ✓ Mobile Responsiveness
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
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineCommandLine, HiOutlineCodeBracket } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
// ⚠️ DO NOT replace `okaidia` with a custom theme object.
// okaidia is the canonical monokai palette — all tokens have calibrated
// colors and there are no problematic per-token backgrounds. The container
// bg `#272822` below is monokai's native pre background; matching them
// means no stripping, no CSS hacks, no invisible identifiers.

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
            <span className="text-gray-500">{line}</span>
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
    <div className={`code-block bg-[#272822] rounded-lg overflow-hidden shadow-lg shadow-black/40 border border-[#3e3d32] ${className}`}>
      <div className="flex flex-col divide-y divide-[#3e3d32]">
        {/* Code Section */}
        <div className="relative">
          <div className="flex items-center justify-between bg-[#1e1f1c] px-4 py-3 border-b border-[#3e3d32]">
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
                  <HiOutlineCodeBracket className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-100 font-mono">{fileName || 'code'}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-gray-500 select-none hidden sm:block">{language}</span>
              <button
                onClick={handleCopy}
                className="text-gray-500 hover:text-gray-200 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#3e3d32] focus:ring-offset-2 focus:ring-offset-[#1e1f1c] transition-colors p-2.5 rounded hover:bg-[#3e3d32] min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Copy code"
                aria-label="Copy code to clipboard"
              >
                {copied ? <HiOutlineCheck className="w-5 h-5 text-green-400" /> : <HiOutlineClipboard className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="relative bg-[#272822]">
            <div className="p-4 md:p-6 overflow-x-auto custom-scrollbar">
              <SyntaxHighlighter
                language={language}
                style={okaidia}
                customStyle={{
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  overflow: 'visible'
                }}
                showLineNumbers={false}
                wrapLines={false}
                wrapLongLines={false}
                PreTag="div"
              >
                {code}
              </SyntaxHighlighter>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#272822] to-transparent pointer-events-none lg:hidden" />
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <div>
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#3e3d32]">
              <HiOutlineCommandLine className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs font-mono text-gray-400">output</span>
            </div>
            <div className="p-4 md:p-6 overflow-x-auto custom-scrollbar bg-[#272822]">
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
