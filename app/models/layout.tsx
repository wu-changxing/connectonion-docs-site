import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Models — ConnectOnion',
  description: 'ConnectOnion supports OpenAI (GPT-4o), Anthropic (Claude), Google (Gemini), and managed co/ keys. Use co/gemini-2.5-pro with zero API key config. Compare pricing and switch models in one line.',
  alternates: { canonical: 'https://docs.connectonion.com/models' },
  openGraph: {
    title: 'Models — ConnectOnion',
    description: 'Use OpenAI, Anthropic, Gemini, or managed co/ keys — switch models in one line.',
    url: 'https://docs.connectonion.com/models',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
