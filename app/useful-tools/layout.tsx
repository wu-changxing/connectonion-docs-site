import type { Metadata } from 'next'
import Script from 'next/script'

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

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ConnectOnion Docs", "item": "https://docs.connectonion.com" },
    { "@type": "ListItem", "position": 2, "name": "Built-in Tools", "item": "https://docs.connectonion.com/useful-tools" }
  ]
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="useful-tools-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {children}
    </>
  )
}
