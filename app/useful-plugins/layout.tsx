import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Built-in Plugins — ConnectOnion',
  description: 'ConnectOnion built-in plugins: skills (slash commands), tool_approval (web UI), re_act (ReAct reasoning), eval, subagents, auto_compact, and more. Add to any agent with plugins=[...].',
  alternates: { canonical: 'https://docs.connectonion.com/useful-plugins' },
  openGraph: {
    title: 'Built-in Plugins — ConnectOnion',
    description: 'Extend any agent with skills, tool_approval, re_act, eval, subagents, and more.',
    url: 'https://docs.connectonion.com/useful-plugins',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
