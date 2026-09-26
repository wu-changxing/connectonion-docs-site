import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '../../lib/guides'

export const metadata: Metadata = {
  title: { absolute: 'Guides: connect an AI agent to Gmail, WhatsApp, a browser | ConnectOnion' },
  description:
    'Answers to the questions people ask about giving an AI agent real access: Gmail and Outlook for Claude Code or Codex, an email address, a logged-in browser, WhatsApp, Telegram, Discord, Feishu and SMS.',
  alternates: { canonical: 'https://docs.connectonion.com/guides' },
}

/** Every guide, question first, with its one-paragraph answer. */
export default function GuidesPage() {
  return (
    <main className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto min-w-0">
        <h1 className="heading-1 mb-4">Guides</h1>
        <p className="text-lg text-gray-600 mb-12">
          Each guide answers one question about connecting an AI agent to a real service, then shows the
          commands. All of them use the <code className="font-mono">co</code> command line.
        </p>
        <div className="space-y-4">
          {GUIDES.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="block rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{g.answer.replace(/`/g, '')}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
