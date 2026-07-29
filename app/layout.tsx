import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import GitHubStarBanner from "../components/GitHubStarBanner";
import Script from "next/script";
import { VERSION } from "../lib/version";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const BASE_URL = 'https://docs.connectonion.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ConnectOnion - Python AI Agent Framework | Build Agents with Functions",
    template: "%s",
  },
  description: "ConnectOnion is an open-source Python framework for building AI agents. Create production-ready agents in 2 lines of code using plain Python functions as tools. Supports OpenAI, Anthropic, and Gemini.",
  keywords: "ConnectOnion, Python agent framework, AI agents, LLM tools, OpenAI agents, build AI agents, Python AI framework, agent framework, function calling, tool use",
  authors: [{ name: "ConnectOnion Team" }],
  creator: "ConnectOnion",
  publisher: "ConnectOnion",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "ConnectOnion - Python AI Agent Framework",
    description: "Build production-ready AI agents in 2 lines of Python. Functions become tools automatically. Supports OpenAI, Anthropic, and Gemini.",
    url: BASE_URL,
    siteName: "ConnectOnion Docs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/onion-logo.png`,
        width: 1200,
        height: 630,
        alt: "ConnectOnion - Python AI Agent Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConnectOnion - Python AI Agent Framework",
    description: "Build production-ready AI agents in 2 lines of Python. Functions become tools automatically.",
    images: [`${BASE_URL}/onion-logo.png`],
    creator: "@connectonion",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/onion-logo.png',
    shortcut: '/onion-logo.png',
    apple: '/onion-logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Structured data for the software application
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ConnectOnion",
  "alternateName": "Connect Onion",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Python 3.9+",
  "description": "ConnectOnion is an open-source Python framework for building AI agents using plain functions as tools. Create production-ready agents in 2 lines of code.",
  "url": BASE_URL,
  "author": {
    "@type": "Organization",
    "name": "ConnectOnion",
    "url": BASE_URL
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "softwareVersion": VERSION,
  "softwareHelp": {
    "@type": "WebPage",
    "url": `${BASE_URL}/quickstart`
  },
  "downloadUrl": "https://pypi.org/project/connectonion/",
  "releaseNotes": "https://github.com/openonion/connectonion/releases",
  "license": "https://opensource.org/licenses/Apache-2.0",
  "programmingLanguage": "Python",
};

// Organization structured data
const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ConnectOnion",
  "alternateName": ["Connect Onion", "ConnectOnion Framework"],
  "url": BASE_URL,
  "logo": `${BASE_URL}/onion-logo.png`,
  "sameAs": [
    "https://github.com/openonion/connectonion",
    "https://pypi.org/project/connectonion/",
    "https://discord.gg/4xfD9k8AUF"
  ],
  "description": "ConnectOnion - Open-source Python framework for building AI agents"
};

// WebSite structured data for sitelinks search
const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ConnectOnion Documentation",
  "url": BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

// FAQ structured data
const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is ConnectOnion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ConnectOnion is an open-source Python framework for building AI agents. It lets you create production-ready agents using plain Python functions as tools. Install with pip install connectonion and create your first agent in 2 lines of code."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create an AI agent with ConnectOnion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Create an agent in 2 lines: (1) from connectonion import Agent, (2) agent = Agent('You are helpful', tools=[your_function]). Then call agent.input('your task'). ConnectOnion automatically converts your Python functions into tools the AI can call."
      }
    },
    {
      "@type": "Question",
      "name": "What AI models does ConnectOnion support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ConnectOnion supports OpenAI (GPT-4o, GPT-4), Anthropic (Claude), Google (Gemini), and more. Use managed keys with the co/ prefix (e.g., co/gemini-2.5-pro) for zero-config setup, or bring your own API keys."
      }
    },
    {
      "@type": "Question",
      "name": "How does ConnectOnion compare to LangChain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ConnectOnion focuses on simplicity: plain Python functions become tools automatically via type hints. No chains, no complex abstractions. A basic agent is 2 lines of code vs 50+ in LangChain. ConnectOnion includes built-in debugging (@xray), plugin system, and multi-agent networking."
      }
    },
    {
      "@type": "Question",
      "name": "Is ConnectOnion free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, ConnectOnion is open-source under the Apache-2.0 license. You get $5 free credits for managed model access (no API key needed). You can also use your own API keys at no cost from ConnectOnion."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install ConnectOnion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Install ConnectOnion with pip: pip install connectonion. Then run co auth to authenticate and get free managed API credits. No API key required to get started."
      }
    },
    {
      "@type": "Question",
      "name": "What is co/ prefix in ConnectOnion models?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The co/ prefix routes model calls through OpenOnion managed keys. For example, co/gemini-2.5-pro uses Google Gemini without you needing a Google API key. New accounts get $5 free credits. You can also use your own keys with standard model names like gpt-4o or claude-3-5-sonnet."
      }
    },
    {
      "@type": "Question",
      "name": "What are ConnectOnion Skills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills are reusable markdown workflows you invoke with /skill-name. Each skill defines instructions and auto-approved tool permissions for that task. Built-in skills include /commit and /review-pr. You can copy additional skills like /ship-feature using: co copy ship-feature."
      }
    },
    {
      "@type": "Question",
      "name": "Does ConnectOnion work with Claude Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ConnectOnion skills use the same SKILL.md format as Claude Code. You can symlink useful_skills/ into ~/.claude/skills/ so skills work in both ConnectOnion agents and Claude Code. Run the included link-to-claude.sh script to set this up."
      }
    },
    {
      "@type": "Question",
      "name": "How do I add tools to a ConnectOnion agent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pass any Python function as a tool: agent = Agent('assistant', tools=[my_function]). ConnectOnion reads the function's type hints and docstring to generate the tool schema automatically. No decorators or wrappers needed. You can also copy built-in tools with: co copy gmail, co copy shell, co copy memory."
      }
    },
    {
      "@type": "Question",
      "name": "How do ConnectOnion plugins work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plugins are lists of event handlers that extend agent behavior. Add them with: agent = Agent('name', plugins=[skills, tool_approval]). Available plugins include: skills (slash command workflows), tool_approval (approval UI), re_act (ReAct reasoning), eval (task evaluation), and more. Copy any plugin with co copy <name>."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          id="organization-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <Script
          id="website-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
        <Script
          id="faq-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
        {/* AI crawler hints */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly content index" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <GitHubStarBanner />
      </body>
    </html>
  );
}
