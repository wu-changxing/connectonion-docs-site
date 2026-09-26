import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Quick Start — ConnectOnion',
  description: 'CLI is all you need. pip install connectonion, then co init: your agent gets an address, a mailbox and $5 of credit. Connect Gmail, a real browser, chat apps and Claude Code — one co command each.',
  alternates: { canonical: 'https://docs.connectonion.com/quickstart' },
  openGraph: {
    title: 'Quick Start — ConnectOnion',
    description: 'Connect your AI agent to email, Gmail, a real browser, chat apps and Claude Code from the command line.',
    url: 'https://docs.connectonion.com/quickstart',
  },
}

const howToData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to connect an AI agent to email, Gmail, a browser and chat apps from the command line",
  "description": "CLI is all you need: every step is one co command.",
  "totalTime": "PT5M",
  "tool": [
    { "@type": "HowToTool", "name": "Python 3.10+" },
    { "@type": "HowToTool", "name": "pip" }
  ],
  "step": [
    { "@type": "HowToStep", "name": "Install ConnectOnion", "text": "Run pip install connectonion. It installs the co command. Python 3.10 or newer.", "position": 1 },
    { "@type": "HowToStep", "name": "Give your agent an identity", "text": "Run co init. It creates a keypair and 0x address, signs in with $5 of credit for managed models, and gives the agent its own mailbox.", "position": 2 },
    { "@type": "HowToStep", "name": "Use its own email", "text": "Run co email inbox and co email send. No DNS records or email provider account.", "position": 3 },
    { "@type": "HowToStep", "name": "Connect Gmail", "text": "Run co auth google, then co gmail inbox. No OAuth app; credentials are saved only on your computer.", "position": 4 },
    { "@type": "HowToStep", "name": "Drive a real browser", "text": "Run co browser go_to, co browser get_text, or co browser \"…\" for an AI-driven task.", "position": 5 },
    { "@type": "HowToStep", "name": "Connect chat apps", "text": "Run co whatsapp listen or co telegram send.", "position": 6 },
    { "@type": "HowToStep", "name": "Plug into Claude Code and Codex", "text": "Run co skills link to link the bundled skills into both.", "position": 7 },
    { "@type": "HowToStep", "name": "Talk to your agent", "text": "Run co ai; it prints a chat.openonion.ai link.", "position": 8 }
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
