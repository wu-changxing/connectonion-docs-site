import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plugin System — ConnectOnion',
  description: 'ConnectOnion plugins are lists of event handlers that extend agent behavior. Use built-in plugins or write your own. Add with plugins=[skills, tool_approval]. Fire on 12 lifecycle hooks.',
  alternates: { canonical: 'https://docs.connectonion.com/plugin' },
  openGraph: {
    title: 'Plugin System — ConnectOnion',
    description: 'Bundle event handlers into reusable plugins. 12 lifecycle hooks available.',
    url: 'https://docs.connectonion.com/plugin',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
