import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'llm_do() — One-shot LLM calls — ConnectOnion',
  description: 'llm_do() makes a single LLM call without creating a full agent. Use for classification, extraction, or generation tasks. Supports structured output, all providers, and co/ managed keys.',
  alternates: { canonical: 'https://docs.connectonion.com/llm_do' },
  openGraph: {
    title: 'llm_do() — One-shot LLM calls — ConnectOnion',
    description: 'Make a single LLM call without a full agent. Supports structured output and all providers.',
    url: 'https://docs.connectonion.com/llm_do',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
