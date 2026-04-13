import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Built-in Tools — ConnectOnion',
  description: 'ConnectOnion built-in tools: Gmail, Shell, FileTools, BrowserAutomation, Memory, WebFetch, DiffWriter, and more. Copy any tool with co copy <name> to customize it for your project.',
  alternates: { canonical: 'https://docs.connectonion.com/useful-tools' },
  openGraph: {
    title: 'Built-in Tools — ConnectOnion',
    description: 'Gmail, Shell, FileTools, BrowserAutomation, Memory, WebFetch and more — copy and customize.',
    url: 'https://docs.connectonion.com/useful-tools',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
