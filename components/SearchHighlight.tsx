/**
 * @purpose Text highlighting component that marks search query matches in results
 * @llm-note
 *   Dependencies: imports from [react] | imported by [DocsSidebar.tsx]
 *   Data flow: receives {text, query, className?} → splits text by query regex → wraps matches in <mark>
 *   State/Effects: pure render component | no state | no side effects
 *   Integration: exposes SearchHighlight component
 *   UX: highlights with purple bg (bg-gray-500/30) | case-insensitive matching
 */
import React from 'react'

interface SearchHighlightProps {
  text: string
  query: string
  className?: string
}

export function SearchHighlight({ text, query, className = '' }: SearchHighlightProps) {
  if (!query.trim()) {
    return <span className={className}>{text}</span>
  }

  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  
  return (
    <span className={className}>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} className="bg-gray-500/30 text-gray-400 px-0.5 rounded font-medium">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  )
}