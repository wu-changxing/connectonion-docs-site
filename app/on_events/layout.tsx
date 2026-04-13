import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Event System — ConnectOnion',
  description: 'ConnectOnion has 12 lifecycle event hooks: after_user_input, before_llm, after_llm, before_tools, after_tools, before_each_tool, after_each_tool, on_error, on_complete, on_stop_signal, on_agent_ready. Use them to inject logic at any point.',
  alternates: { canonical: 'https://docs.connectonion.com/on_events' },
  openGraph: {
    title: 'Event System — ConnectOnion',
    description: '12 lifecycle hooks to inject logic at any point in agent execution.',
    url: 'https://docs.connectonion.com/on_events',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
