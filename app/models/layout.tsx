import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Models — ConnectOnion',
  description: 'ConnectOnion supports OpenAI (GPT-4o), Anthropic (Claude), Google (Gemini), and managed co/ keys. Use co/gemini-3.7-flash with zero API key config. Compare pricing and switch models in one line.',
  alternates: { canonical: 'https://docs.connectonion.com/models' },
  openGraph: {
    title: 'Models — ConnectOnion',
    description: 'Use OpenAI, Anthropic, Gemini, or managed co/ keys — switch models in one line.',
    url: 'https://docs.connectonion.com/models',
  },
}

const techArticleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Supported Models in ConnectOnion — OpenAI, Anthropic, Gemini, Managed Keys",
  "description": "ConnectOnion supports OpenAI GPT-4o, Anthropic Claude, Google Gemini, and managed co/ keys with zero configuration. New users get $5 free credits. Switch models in a single parameter.",
  "url": "https://docs.connectonion.com/models",
  "author": { "@type": "Organization", "name": "ConnectOnion" },
  "publisher": { "@type": "Organization", "name": "ConnectOnion", "url": "https://docs.connectonion.com" },
  "programmingLanguage": "Python",
  "proficiencyLevel": "Beginner"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ConnectOnion Docs", "item": "https://docs.connectonion.com" },
    { "@type": "ListItem", "position": 2, "name": "Models", "item": "https://docs.connectonion.com/models" }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="models-tech-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleData) }} />
      <Script id="models-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  )
}
