import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '@xray Debugging — ConnectOnion',
  description: 'ConnectOnion @xray decorator injects runtime context into tools for debugging. Access xray.agent, xray.task, xray.messages, xray.iteration inside any tool. Use xray.trace() to visualize agent execution.',
  alternates: { canonical: 'https://docs.connectonion.com/xray' },
  openGraph: {
    title: '@xray Debugging — ConnectOnion',
    description: 'Runtime context injection for debugging. Access agent state inside any tool.',
    url: 'https://docs.connectonion.com/xray',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
