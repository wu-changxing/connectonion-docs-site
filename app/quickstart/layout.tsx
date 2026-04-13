import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Start — ConnectOnion',
  description: 'Install ConnectOnion and build your first AI agent in 60 seconds. pip install connectonion, then 2 lines of Python. Supports OpenAI, Anthropic, Gemini, and managed keys.',
  alternates: { canonical: 'https://docs.connectonion.com/quickstart' },
  openGraph: {
    title: 'Quick Start — ConnectOnion',
    description: 'Build your first AI agent in 60 seconds with ConnectOnion.',
    url: 'https://docs.connectonion.com/quickstart',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
