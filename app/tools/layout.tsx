import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools — ConnectOnion',
  description: 'Any Python function becomes an AI tool in ConnectOnion. Type hints and docstrings auto-generate the tool schema. No decorators needed. Learn how to write, register, and test tools.',
  alternates: { canonical: 'https://docs.connectonion.com/tools' },
  openGraph: {
    title: 'Tools — ConnectOnion',
    description: 'Turn any Python function into an AI tool automatically with ConnectOnion.',
    url: 'https://docs.connectonion.com/tools',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
