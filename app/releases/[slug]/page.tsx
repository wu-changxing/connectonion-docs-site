import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { makeMetadata } from '../../metadata'
import { renderBlogMarkdown } from '../../../lib/blog-content.mjs'

const releases = path.join(process.cwd(), 'public', 'releases')
const slugs = fs.readdirSync(releases).filter(name => /^\d+\.\d+\.\d+(?:a\d+|b\d+|rc\d+)?\.md$/.test(name))
  .map(name => name.slice(0, -3))

const releaseSummaries: Record<string, string> = {
  '1.8.4': 'Global settings use the selected env source; co env redacts values; Gmail account-bound drafts and Synology transfers get safer.',
  '1.8.8': 'One conversation streams across laptop and phone; co benchmark scores skills; browser network and cookies plus co schedule are added.',
  '1.8.8b1': 'Wiki moves to the 1.8.8 preview line; sync --all --dry-run stays inspection-only, and prompt-free initialization and page maps carry over.',
  '1.8.8b6': 'co wiki init fills the owner page with cited map facts: name, mail counts, top correspondents, coding sessions and candidate self-addresses.',
  '1.8.8b7': 'co benchmark checks at least five cases before a skill edit; co eval run scores outcomes PASS, FAIL or UNVERIFIED and compares runs.',
  '1.8.8b11': 'co browser commands now stop at their deadline, hosted devices receive turns after joining, and co trust and co create report invalid inputs with non-zero exits.',
  '1.8.9': 'co auth microsoft adds one consent for mail, calendar, files and OneNote; co onenote, co search, co fetch, task watches and WhatsApp files arrive.',
  '1.8.9b1': 'An upgraded Wiki notebook rebuilds the owner’s untouched page; malformed nightly review suggestions no longer fail the entire update.',
  '1.8.9b14': 'Nightly Wiki upkeep updates one page per model turn, archives obsolete uninvestigated map pages, and raises the daily model-call cap to 30.',
  '1.8.9b17': 'Gemini 3.8 Flash returns as the default model; co status names free options at zero balance, and co wiki init improves page remapping and Gmail scans.',
  '1.8.9b19': 'Chat turns refuse ungranted commands; co auth microsoft adds OneNote consent; co ai watches tasks, and co search and co fetch read the web.',
  '1.8.9b20': 'co auth microsoft requests Notes.ReadWrite for personal Outlook accounts; OneNote accepts it, and experimental co slack joins inbox via Socket Mode.',
  '1.8.9b22': 'co audit keeps Python’s user-package base while isolating HOME, so user-installed co onenote help pages remain reachable without credential exposure.',
  '1.8.9b8': 'co audit walks a CLI’s --help pages in an empty home, checks examples and options, and offers model review after rule checks.',
  '1.9.0a11': 'REM home starts with source-backed pages from the latest pass; older pages become keyboard-accessible recall questions, with counts in a disclosure.',
  '1.9.0a3': 'co rem init maps without a model and writes recent project pages; this release also fixes cited handles in Gmail lookups and daily-cap messaging.',
  '1.9.0a4': 'REM skips empty investigations, drops only lines with bad citations, keeps services off people pages, and restores Codex Desktop messages.',
}

export const dynamicParams = false

export function generateStaticParams() {
  return [...slugs, 'archive'].map(slug => ({ slug }))
}

function releaseDescription(markdown: string) {
  const paragraphs = markdown.split(/\n\s*\n/).slice(1)
    .filter(paragraph => !/^\s*(?:#|```|!\[)/.test(paragraph))
  const lead = paragraphs[0] || ''
  const detail = paragraphs.find(paragraph => paragraph.length > 120 &&
    !/^(?:An opt-in preview|The stable release after|\d+\.\d+\.\d+ is a fix line)/.test(paragraph)) || lead
  const source = /Never published/i.test(lead) ? lead : detail
  const plain = source.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#]/g, '').replace(/^\s*[-*]\s+/gm, '')
    .replace(/\s+/g, ' ').trim()
  return plain.length > 240 ? `${plain.slice(0, 240).replace(/\s+\S*$/, '')}…` : plain
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const description = slug === 'archive'
    ? 'Compare 1.8.10 stable with opt-in 1.9.0a27, use exact pip pins, and browse earlier ConnectOnion release notes and channel policy.'
    : releaseSummaries[slug] || releaseDescription(fs.readFileSync(path.join(releases, `${slug}.md`), 'utf8'))
  return makeMetadata(
    slug === 'archive' ? 'ConnectOnion release archive' : `ConnectOnion ${slug} release notes`,
    description,
    `/releases/${slug}`,
  )
}

export default async function ReleaseNotes({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug !== 'archive' && !slugs.includes(slug)) notFound()
  const source = slug === 'archive' ? '/releases.md' : `/releases/${slug}.md`
  const file = slug === 'archive' ? path.join(process.cwd(), 'public', 'releases.md') : path.join(releases, `${slug}.md`)
  const markdown = fs.readFileSync(file, 'utf8').replace(/\]\((?:releases\/)?(\d+\.\d+\.\d+(?:a\d+|b\d+|rc\d+)?)\.md\)/g, '](/releases/$1)')

  return (
    <div className="px-4 py-12 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl min-w-0">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600">
          <Link href="/releases" className="inline-flex min-h-11 items-center font-semibold text-green-800 underline underline-offset-4">Release channels</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span>{slug === 'archive' ? 'Archive' : slug}</span>
        </nav>
        <div className="blog-prose break-words [&_h1]:mb-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_pre]:whitespace-pre-wrap [&_pre]:break-normal md:[&_h1]:text-4xl" dangerouslySetInnerHTML={{ __html: renderBlogMarkdown(markdown) }} />
        <p className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <a href={source} className="inline-flex min-h-11 items-center underline underline-offset-4">View Markdown source</a>
        </p>
      </article>
    </div>
  )
}
