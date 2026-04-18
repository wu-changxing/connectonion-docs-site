/**
 * @purpose Main sidebar navigation component with search, collapsible sections, and copy features
 * @context Primary navigation for desktop users, always visible on lg+ screens
 * @llm-note Integrates full-text search from searchIndex, markdown search from markdownLoader,
 *           manages section collapse state, highlights active page, provides copy-all-docs button
 */
'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HiOutlineMagnifyingGlass, HiOutlineChevronRight, HiOutlineChevronDown, HiOutlineClipboard, HiOutlineCheck, HiOutlineXMark, HiOutlineArrowPath } from 'react-icons/hi2'
import { FaGithub, FaDiscord, FaPython } from 'react-icons/fa'
import { copyAllDocsToClipboard } from '../lib/copyAllDocs'
import { SearchHighlight } from './SearchHighlight'
import { searchPages } from '../lib/enhancedSearch'
import { searchMarkdownDocuments, getMatchSnippet } from '../lib/markdownLoader'
import { useCopyMarkdown } from '../hooks/useCopyMarkdown'
import { hasMarkdownContent } from '../lib/markdownMapping'
import { navigation as navData } from '../lib/navigation'
import { VERSION } from '../lib/version'

interface SearchResult {
  item: typeof navData[0]
  score: number
  matches: string[]
  snippet?: string
}

export function DocsSidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [openSections, setOpenSections] = useState<string[]>([])
  const [isClientMounted, setIsClientMounted] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success'>('idle')
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const activeItemRef = useRef<HTMLLIElement>(null)
  const { copyMarkdown, status: itemCopyStatus, copiedPath } = useCopyMarkdown()

  const navigationSections = useMemo(() => {
    const sections: Record<string, typeof navData> = {}
    const childItems = new Set<string>()

    navData.forEach(item => {
      if ((item as any).parent) childItems.add(item.href)
    })

    navData.forEach(item => {
      if (item.section === 'Admin') return
      if (item.section === 'Blog') return
      if ((item as any).hidden) return
      if (childItems.has(item.href)) return

      if (!sections[item.section]) sections[item.section] = []
      sections[item.section].push(item)
    })
    return sections
  }, [])

  const getChildren = (parentHref: string) =>
    navData.filter(item => (item as any).parent === parentHref && !(item as any).hidden)

  // On mount: open only the current section
  useEffect(() => {
    const currentPage = navData.find(page => page.href === pathname)
    setOpenSections(currentPage ? [currentPage.section] : ['Getting Started'])
    setIsClientMounted(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On navigation: always collapse all, expand only current section
  useEffect(() => {
    if (!isClientMounted) return
    const currentPage = navData.find(page => page.href === pathname)
    if (currentPage) {
      setOpenSections([currentPage.section])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isClientMounted])

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) { setSearchResults([]); return }

    const markdownResults = await searchMarkdownDocuments(query)
    const enhancedResults = searchPages(query)
    const results: SearchResult[] = []
    const processedHrefs = new Set<string>()

    markdownResults.forEach(docResult => {
      const navItem = navData.find(item => item.href === docResult.href)
      if (navItem && !processedHrefs.has(navItem.href)) {
        processedHrefs.add(navItem.href)
        results.push({ item: navItem, score: 150, matches: ['documentation'], snippet: getMatchSnippet(docResult.content, query, 100) })
      }
    })

    enhancedResults.forEach(pageResult => {
      const navItem = navData.find(item => item.href === pageResult.href)
      if (navItem && !processedHrefs.has(navItem.href)) {
        processedHrefs.add(navItem.href)
        results.push({ item: navItem, score: 100, matches: ['content'] })
      }
    })

    if (results.length < 5) {
      const q = query.toLowerCase()
      navData.forEach(item => {
        if (processedHrefs.has(item.href)) return
        let score = 0
        const matches: string[] = []
        if (item.title.toLowerCase().includes(q)) { score += 10; matches.push('title') }
        if (item.keywords?.some(k => k.includes(q))) { score += 5; matches.push('keywords') }
        if (score > 0 && results.length < 10) results.push({ item, score, matches })
      })
    }

    results.sort((a, b) => b.score - a.score)
    setSearchResults(results.slice(0, 5))
    setSelectedIndex(0)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
        return
      }
      const isSearchFocused = document.activeElement === searchInputRef.current
      if (!searchQuery || !isSearchFocused) return

      switch(e.key) {
        case 'ArrowDown': e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, searchResults.length - 1)); break
        case 'ArrowUp':   e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); break
        case 'Enter':
          e.preventDefault()
          if (searchResults[selectedIndex]) {
            router.push(searchResults[selectedIndex].item.href)
            setSearchQuery('')
            setSearchResults([])
          }
          break
        case 'Escape':
          setSearchQuery('')
          setSearchResults([])
          searchInputRef.current?.blur()
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchQuery, searchResults, selectedIndex, router])

  useEffect(() => {
    const timer = setTimeout(() => performSearch(searchQuery), 150)
    return () => clearTimeout(timer)
  }, [searchQuery, performSearch])

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [pathname])

  const handleCopyAllDocs = async () => {
    setCopyStatus('copying')
    const success = await copyAllDocsToClipboard()
    if (success) {
      setCopyStatus('success')
      setTimeout(() => setCopyStatus('idle'), 3000)
    } else {
      setCopyStatus('idle')
    }
  }

  return (
    <div className="w-full sm:w-64 lg:w-64 xl:w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 lg:top-10 z-40 lg:h-[calc(100vh-2.5rem)]">
      {/* Header — only shown in mobile drawer; desktop has top bar */}
      <div className="lg:hidden px-4 py-3 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img src="/onion-logo.png" alt="ConnectOnion Logo" className="w-7 h-7 rounded-md object-cover" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 leading-tight">ConnectOnion</div>
            <div className="text-[11px] text-gray-400 leading-tight">Docs</div>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5 border-b border-gray-100">
        <div className="relative group">
          <HiOutlineMagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 transition-colors group-focus-within:text-green-600" aria-hidden="true" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search docs..."
            aria-label="Search documentation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/10 focus:outline-none transition-all text-sm"
          />
          {searchQuery ? (
            <button
              onClick={() => { setSearchQuery(''); setSearchResults([]) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Clear search"
            >
              <HiOutlineXMark className="w-3 h-3 text-gray-400" />
            </button>
          ) : (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 font-mono px-1 py-0.5 bg-white rounded border border-gray-200">
              ⌘K
            </div>
          )}
        </div>
        {searchQuery && (
          <div className="mt-1 text-[10px] text-gray-400 px-0.5">
            {searchResults.length === 0 ? 'No results' : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} · ↑↓ navigate`}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 custom-scrollbar bg-white">
        {/* Search Results */}
        {searchQuery && searchResults.length > 0 && (
          <div className="mb-3 mx-1">
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="text-xs font-semibold text-green-700 mb-2">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              <div className="space-y-1">
                {searchResults.map((result, idx) => (
                  <Link
                    key={result.item.href}
                    href={result.item.href}
                    className={`block px-3 py-2 rounded-md text-sm transition-all ${
                      idx === selectedIndex
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-green-100 text-gray-700 hover:text-green-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {result.item.icon && (
                        <result.item.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${idx === selectedIndex ? 'text-white' : 'text-gray-400'}`} />
                      )}
                      <div className="flex-1 min-w-0">
                        <SearchHighlight text={result.item.title} query={searchQuery} />
                        {result.snippet && (
                          <p className="text-search-snippet mt-1 line-clamp-2">
                            <SearchHighlight text={result.snippet} query={searchQuery} />
                          </p>
                        )}
                        <div className="text-[10px] text-gray-400 mt-1">{result.item.section}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regular Navigation */}
        {Object.entries(navigationSections).map(([section, items]) => (
          <div key={section} className="mb-0.5">
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex items-center justify-between px-2 py-1.5 mb-0.5 text-left text-xs font-semibold text-gray-500 tracking-wide hover:text-gray-800 transition-colors"
            >
              <span className="flex-1 truncate">
                <SearchHighlight text={section} query={searchQuery} />
              </span>
              {openSections.includes(section)
                ? <HiOutlineChevronDown className="w-3 h-3 flex-shrink-0 opacity-60" />
                : <HiOutlineChevronRight className="w-3 h-3 flex-shrink-0 opacity-60" />
              }
            </button>

            {openSections.includes(section) && (
              <ul className="space-y-px" role="list">
                {items.map((item) => {
                  const isActive = pathname === item.href
                  const IconComponent = item.icon
                  const children = getChildren(item.href)

                  return (
                    <li key={item.href} role="listitem" ref={isActive ? activeItemRef : undefined}>
                      <div className="relative group">
                        <Link
                          href={item.href}
                          className={`block px-2.5 py-1.5 text-sm rounded-md mx-0.5 transition-all ${
                            isActive
                              ? 'bg-green-50 text-green-900 font-semibold border-l-2 border-green-600 pl-2'
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 pl-2.5'
                          }`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <div className="flex items-center gap-2">
                            {IconComponent && (
                              <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-green-700' : 'text-gray-400'}`} />
                            )}
                            <SearchHighlight text={item.title} query={searchQuery} className="truncate flex-1 text-[13px]" />
                            {item.difficulty && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${
                                item.difficulty === 'Start Here'   ? 'bg-green-100 text-green-700'
                                : item.difficulty === 'Beginner'  ? 'bg-gray-100 text-gray-600'
                                : item.difficulty === 'Intermediate' ? 'bg-gray-100 text-gray-600'
                                : 'bg-gray-100 text-gray-500'
                              }`}>
                                {item.difficulty}
                              </span>
                            )}
                          </div>
                        </Link>

                        {hasMarkdownContent(item.href) && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyMarkdown(item.href) }}
                            className="absolute right-2 top-1/2 -translate-y-1/2
                                       opacity-0 group-hover:opacity-100
                                       transition-opacity duration-200
                                       min-h-[44px] min-w-[44px] p-2 rounded-md hover:bg-gray-100
                                       hidden lg:block"
                            aria-label={`Copy ${item.title} as markdown`}
                          >
                            {itemCopyStatus === 'loading' && copiedPath === item.href ? (
                              <HiOutlineArrowPath className="w-4 h-4 text-gray-400 animate-spin" />
                            ) : itemCopyStatus === 'success' && copiedPath === item.href ? (
                              <HiOutlineCheck className="w-4 h-4 text-green-600" />
                            ) : (
                              <HiOutlineClipboard className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        )}
                      </div>

                      {children.length > 0 && (
                        <ul className="ml-3.5 mt-px space-y-px border-l border-gray-100 pl-2.5" role="list">
                          {children.map((child) => {
                            const isChildActive = pathname === child.href
                            const ChildIcon = child.icon
                            return (
                              <li key={child.href} role="listitem" className="relative group">
                                <Link
                                  href={child.href}
                                  className={`block px-2.5 py-1 text-[12px] rounded-md transition-all ${
                                    isChildActive
                                      ? 'bg-green-50 text-green-900 font-semibold'
                                      : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                                  }`}
                                  aria-current={isChildActive ? 'page' : undefined}
                                >
                                  <div className="flex items-center gap-1.5">
                                    {ChildIcon && (
                                      <ChildIcon className={`w-3 h-3 flex-shrink-0 ${isChildActive ? 'text-gray-600' : 'text-gray-300'}`} />
                                    )}
                                    <SearchHighlight text={child.title} query={searchQuery} className="truncate flex-1" />
                                  </div>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}

        {searchQuery && searchResults.length === 0 && (
          <div className="px-4 py-8 text-center">
            <div className="text-gray-400 mb-1">No results found</div>
            <div className="text-xs text-gray-300">Try different keywords</div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 px-2 py-2">
        <div className="flex items-center gap-1">
          <a href="https://github.com/openonion/connectonion" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all" title="GitHub">
            <FaGithub className="w-3.5 h-3.5" />
          </a>
          <a href="https://pypi.org/project/connectonion/" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all" title="PyPI">
            <FaPython className="w-3.5 h-3.5" />
          </a>
          <a href="https://discord.gg/4xfD9k8AUF" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all" title="Discord">
            <FaDiscord className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleCopyAllDocs}
            disabled={copyStatus === 'copying'}
            className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50"
            title={copyStatus === 'success' ? 'Copied!' : 'Copy all docs to clipboard'}
            aria-label={copyStatus === 'copying' ? 'Copying documentation' : copyStatus === 'success' ? 'Copied!' : 'Copy all docs to clipboard'}
          >
            {copyStatus === 'copying' ? (
              <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : copyStatus === 'success' ? (
              <HiOutlineCheck className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <HiOutlineClipboard className="w-3.5 h-3.5" />
            )}
          </button>
          <div className="ml-auto flex items-center gap-1 pr-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-[10px] text-gray-400 font-mono">v{VERSION}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
