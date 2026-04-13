import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills — ConnectOnion',
  description: 'ConnectOnion Skills: reusable /slash-command workflows with automatic tool permission scoping. Compatible with Claude Code. Copy skills with co copy ship-feature. Invoke with /skill-name.',
  alternates: { canonical: 'https://docs.connectonion.com/features/skills' },
  openGraph: {
    title: 'Skills — ConnectOnion',
    description: 'Reusable /command workflows with scoped tool permissions. Claude Code compatible.',
    url: 'https://docs.connectonion.com/features/skills',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
