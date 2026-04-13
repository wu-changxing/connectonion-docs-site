import type { Metadata } from 'next'
import Script from 'next/script'

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

const techArticleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "ConnectOnion Tools — Functions as AI Tools",
  "description": "Any Python function with type hints and a docstring automatically becomes an AI tool in ConnectOnion. No decorators, no wrappers. ConnectOnion reads your function signature to generate the tool schema.",
  "url": "https://docs.connectonion.com/tools",
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
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://docs.connectonion.com/tools" }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="tools-tech-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleData) }} />
      <Script id="tools-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  )
}
