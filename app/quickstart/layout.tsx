import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Quick Start — ConnectOnion',
  description: 'Install ConnectOnion and have a working AI agent in 60 seconds. pip install connectonion, then co create — the project is scaffolded for you. Supports OpenAI, Anthropic, Gemini, and managed keys.',
  alternates: { canonical: 'https://docs.connectonion.com/quickstart' },
  openGraph: {
    title: 'Quick Start — ConnectOnion',
    description: 'Build your first AI agent in 60 seconds with ConnectOnion.',
    url: 'https://docs.connectonion.com/quickstart',
  },
}

const howToData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Build an AI Agent with ConnectOnion",
  "description": "Install ConnectOnion and create a working AI agent in under 60 seconds. The co create command scaffolds the whole project; you edit the generated files.",
  "totalTime": "PT1M",
  "tool": [
    { "@type": "HowToTool", "name": "Python 3.9+" },
    { "@type": "HowToTool", "name": "pip" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Install ConnectOnion",
      "text": "Run pip install connectonion in your terminal to install the package.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Authenticate for managed keys",
      "text": "Run co auth to authenticate and receive $5 free managed API credits. No API key required.",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Write your tool function",
      "text": "Write a Python function with type hints and a docstring. ConnectOnion automatically converts it into an AI tool.",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "Create an agent and run it",
      "text": "Create an Agent with your tool: agent = Agent('assistant', tools=[my_function]). Then call agent.input('Do the task') to run it.",
      "position": 4
    }
  ]
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ConnectOnion Docs", "item": "https://docs.connectonion.com" },
    { "@type": "ListItem", "position": 2, "name": "Quick Start", "item": "https://docs.connectonion.com/quickstart" }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="quickstart-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }} />
      <Script id="quickstart-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  )
}
