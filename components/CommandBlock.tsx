/**
 * @purpose Terminal-style component for displaying shell commands with syntax highlighting
 * @llm-note
 *   Dependencies: imports from [react, lucide-react] | imported by [app/page.tsx, app/quickstart/page.tsx, app/cli/page.tsx, +11 more]
 *   Data flow: receives commands: string[] → colorizes each command → displays with $ prompt → copy button writes to navigator.clipboard
 *   State/Effects: manages copied state (2s timeout) | writes to clipboard | no external API calls
 *   Integration: exposes CommandBlock component | accepts {title?: string, commands: string[], id?: string}
 *   Performance: inline colorization per command | no memoization needed (fast)
 *   UX: $ prompt is select-none | command hover highlighting | 44px touch target | green checkmark on copy
 */
/*
  DESIGN IMPROVEMENTS IMPLEMENTED:

  ✓ Accessibility
    - Copy button is 44x44px (WCAG touch target minimum)
    - Visible keyboard focus states with ring-2 ring-blue-500
    - Proper aria-label for screen readers
    - Consistent focus and hover states

  ✓ Visual Feedback
    - Larger icons (w-5 h-5) for better visibility
    - Clear hover states (bg-gray-700)
    - Consistent button styling across components
    - Command hover highlighting

  FUTURE ENHANCEMENTS:
  - Toast notification for copy feedback
  - Command output preview support
  - Per-line copy buttons
  - Comment syntax support
*/

'use client'

import { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck } from 'react-icons/hi2'

interface CommandBlockProps {
  title?: string
  commands: string[]
  id?: string
}

export function CommandBlock({ title, commands, id }: CommandBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Function to colorize terminal commands
  const colorizeCommand = (cmd: string) => {
    // Check for common command patterns
    if (cmd.startsWith('pip install')) {
      return (
        <>
          <span className="text-green-400">pip</span>
          <span className="text-gray-100"> install</span>
          <span className="text-blue-400"> {cmd.slice(12)}</span>
        </>
      )
    }
    if (cmd.startsWith('mkdir')) {
      return (
        <>
          <span className="text-yellow-400">mkdir</span>
          <span className="text-gray-100"> {cmd.slice(6)}</span>
        </>
      )
    }
    if (cmd.startsWith('cd')) {
      return (
        <>
          <span className="text-yellow-400">cd</span>
          <span className="text-gray-100"> {cmd.slice(3)}</span>
        </>
      )
    }
    if (cmd.startsWith('co init')) {
      return (
        <>
          <span className="text-gray-500">co</span>
          <span className="text-gray-100"> init</span>
          {cmd.length > 7 && <span className="text-blue-400"> {cmd.slice(8)}</span>}
        </>
      )
    }
    if (cmd.startsWith('co')) {
      return (
        <>
          <span className="text-gray-500">co</span>
          <span className="text-gray-100"> {cmd.slice(3)}</span>
        </>
      )
    }
    if (cmd.startsWith('cp')) {
      return (
        <>
          <span className="text-yellow-400">cp</span>
          <span className="text-gray-100"> {cmd.slice(3)}</span>
        </>
      )
    }
    if (cmd.startsWith('python')) {
      return (
        <>
          <span className="text-blue-400">python</span>
          <span className="text-gray-100"> {cmd.slice(7)}</span>
        </>
      )
    }
    if (cmd.startsWith('npm')) {
      return (
        <>
          <span className="text-red-400">npm</span>
          <span className="text-gray-100"> {cmd.slice(4)}</span>
        </>
      )
    }
    
    // Default: return as is
    return <span className="text-gray-100">{cmd}</span>
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden shadow-lg shadow-black/30">
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2.5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          {/* Terminal dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
          </div>
          <div className="w-px h-4 bg-gray-700" />
          <span className="text-xs text-gray-500 font-mono">{title || 'Terminal'}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-800 text-gray-500 rounded border border-gray-700 select-none">bash</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-gray-500 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-1 focus:ring-offset-gray-900 transition-colors p-2 rounded hover:bg-gray-800 min-h-[40px] min-w-[40px] flex items-center justify-center"
          title="Copy commands"
          aria-label={copied ? 'Copied to clipboard' : 'Copy all commands'}
        >
          {copied ? (
            <HiOutlineCheck className="w-4 h-4 text-green-400" />
          ) : (
            <HiOutlineClipboard className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="relative">
        <div className="bg-gray-950 p-4 md:p-5 font-mono text-sm overflow-x-auto custom-scrollbar">
          {commands.map((cmd, index) => (
            <div key={index} className="group hover:bg-white/3 -mx-4 md:-mx-5 px-4 md:px-5 py-0.5 transition-colors whitespace-nowrap">
              <span className="select-none text-green-500 mr-2 opacity-60">$</span>
              {colorizeCommand(cmd)}
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none sm:hidden" />
      </div>
    </div>
  )
}