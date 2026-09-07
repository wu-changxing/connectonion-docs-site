'use client'

import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineArrowRight, HiOutlineMagnifyingGlass, HiOutlineRss } from 'react-icons/hi2'

export interface BlogIndexPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readMinutes: number
  href: string
}

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`))
}

export default function BlogIndex({ posts }: { posts: BlogIndexPost[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const featured = posts.slice(0, 3)
  const counts = new Map<string, number>()
  posts.flatMap((post) => post.tags).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1))
  const tags = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8)
  const needle = query.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => {
    const matchesTag = activeTag === 'All' || post.tags.includes(activeTag)
    const matchesQuery = !needle || `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase().includes(needle)
    return matchesTag && matchesQuery
  })

  return (
    <div className="px-5 py-12 sm:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-gray-200 pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">ConnectOnion design journal</p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] text-gray-950 sm:text-6xl">Engineering notes from the messy middle.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">Concrete decisions, failed assumptions, and verified lessons from building Python AI agents, remote browsers, permissions, and release systems.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="font-mono text-3xl font-semibold tracking-tight text-gray-950">{posts.length}</p>
            <p className="mt-1 text-sm text-gray-600">published field notes</p>
            <a href="/blog/feed.xml" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gray-800 underline decoration-gray-300 underline-offset-4 hover:decoration-green-600">
              <HiOutlineRss className="size-4" aria-hidden="true" /> Follow via RSS
            </a>
          </div>
        </header>

        <section className="py-12" aria-labelledby="latest-heading">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Latest</p>
            <h2 id="latest-heading" className="mt-2 text-2xl font-bold tracking-tight text-gray-950">Start with what changed recently</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featured.map((post, index) => (
              <Link key={post.slug} href={post.href} className={`group flex min-h-72 flex-col rounded-2xl border p-6 transition-colors focus-visible:outline-offset-4 ${index === 0 ? 'border-gray-900 bg-gray-950 text-white' : 'border-gray-200 bg-white hover:border-gray-400'}`}>
                <div className={`text-xs font-medium ${index === 0 ? 'text-gray-300' : 'text-gray-500'}`}><time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min</div>
                <h3 className={`mt-8 text-2xl font-semibold leading-tight tracking-tight ${index === 0 ? 'text-white' : 'text-gray-950'}`}>{post.title}</h3>
                <p className={`mt-4 line-clamp-3 text-sm leading-6 ${index === 0 ? 'text-gray-300' : 'text-gray-600'}`}>{post.description}</p>
                <span className={`mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold ${index === 0 ? 'text-white' : 'text-gray-800'}`}>Read note <HiOutlineArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-200 pt-12" aria-labelledby="archive-heading">
          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Archive</p>
              <h2 id="archive-heading" className="mt-2 text-2xl font-bold tracking-tight text-gray-950">Find the decision behind the code</h2>
              <div className="relative mt-6">
                <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3.5 top-3.5 size-5 text-gray-400" aria-hidden="true" />
                <label htmlFor="blog-search" className="sr-only">Search field notes</label>
                <input id="blog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles and topics" className="min-h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-base text-gray-950 placeholder:text-gray-400 focus:border-green-600 focus:outline-none" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Filter by topic">
                <button type="button" onClick={() => setActiveTag('All')} aria-pressed={activeTag === 'All'} className={`min-h-11 rounded-full px-4 text-sm font-medium ${activeTag === 'All' ? 'bg-gray-950 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-400'}`}>All <span className="ml-1 opacity-60">{posts.length}</span></button>
                {tags.map(([tag, count]) => (
                  <button key={tag} type="button" onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag} className={`min-h-11 rounded-full px-4 text-sm font-medium ${activeTag === tag ? 'bg-gray-950 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:border-gray-400'}`}>{tag} <span className="ml-1 opacity-60">{count}</span></button>
                ))}
              </div>
            </div>

            <div aria-live="polite">
              <p className="mb-4 text-sm text-gray-500">{filteredPosts.length} {filteredPosts.length === 1 ? 'note' : 'notes'}</p>
              {filteredPosts.length ? (
                <ol className="divide-y divide-gray-200 border-y border-gray-200">
                  {filteredPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={post.href} className="group grid min-h-28 gap-3 py-6 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6">
                        <div className="text-xs text-gray-500"><time dateTime={post.date}>{formatDate(post.date)}</time><span className="mt-1 block">{post.readMinutes} min read</span></div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold leading-snug text-gray-950 group-hover:text-green-700">{post.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">{tag}</span>)}</div>
                        </div>
                        <HiOutlineArrowRight className="hidden size-5 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-green-700 sm:block" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
                  <p className="font-semibold text-gray-900">No field notes match that search.</p>
                  <button type="button" onClick={() => { setQuery(''); setActiveTag('All') }} className="mt-4 min-h-11 px-4 text-sm font-semibold text-green-700 underline underline-offset-4">Clear filters</button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
