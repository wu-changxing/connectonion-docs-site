import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Agent — ConnectOnion',
  description: 'ConnectOnion Agent class: the core orchestrator for AI agents. Pass tools as plain Python functions, configure event hooks, and run multi-turn conversations. Supports all major LLM providers.',
  alternates: { canonical: 'https://docs.connectonion.com/agent' },
  openGraph: {
    title: 'Agent — ConnectOnion',
    description: 'The Agent class: LLM calls, tool execution, and event hooks in one object.',
    url: 'https://docs.connectonion.com/agent',
  },
}

const techArticleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "ConnectOnion Agent Class — Full API Reference",
  "description": "Complete API reference for the ConnectOnion Agent class. Learn how to configure tools, system prompts, models, event hooks, plugins, and run multi-turn AI conversations.",
  "url": "https://docs.connectonion.com/agent",
  "author": { "@type": "Organization", "name": "ConnectOnion" },
  "publisher": { "@type": "Organization", "name": "ConnectOnion", "url": "https://docs.connectonion.com" },
  "programmingLanguage": "Python",
  "proficiencyLevel": "Beginner",
  "dependencies": "Python 3.9+, connectonion"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ConnectOnion Docs", "item": "https://docs.connectonion.com" },
    { "@type": "ListItem", "position": 2, "name": "Agent", "item": "https://docs.connectonion.com/agent" }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="agent-tech-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleData) }} />
      <Script id="agent-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  )
}
