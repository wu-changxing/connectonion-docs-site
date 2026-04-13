import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memory Tool — ConnectOnion',
  description: 'ConnectOnion Memory tool gives agents persistent memory across sessions. Store facts, preferences, and context as markdown files. Agents read and write memory automatically as a tool.',
  alternates: { canonical: 'https://docs.connectonion.com/memory' },
  openGraph: {
    title: 'Memory Tool — ConnectOnion',
    description: 'Persistent memory across agent sessions. Stored as markdown files, read/written as tools.',
    url: 'https://docs.connectonion.com/memory',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
