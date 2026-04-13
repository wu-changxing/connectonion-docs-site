import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent — ConnectOnion',
  description: 'ConnectOnion Agent class: the core orchestrator for AI agents. Pass tools as plain Python functions, configure event hooks, and run multi-turn conversations. Supports all major LLM providers.',
  alternates: { canonical: 'https://docs.connectonion.com/agent' },
  openGraph: {
    title: 'Agent — ConnectOnion',
    description: 'The Agent class: LLM calls, tool execution, and event hooks in one object.',
    url: 'https://docs.connectonion.com/agent',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
