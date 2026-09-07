import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import GitHubStarBanner from "../components/GitHubStarBanner";
import { STABLE_VERSION } from "../lib/version";

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
  alternates: { canonical: BASE_URL },
  title: {
    default: "ConnectOnion - Python AI Agents from a Working Template",
    template: "%s",
  },
  description: "ConnectOnion is an open-source Python toolkit for AI agents. `co create` scaffolds a project that already runs — shell, file editing, search and a model wired in — and you edit it from there. Supports OpenAI, Anthropic, and Gemini.",
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
    title: "ConnectOnion - Python AI Agents from a Working Template",
    description: "One command scaffolds an agent that already runs. Plain Python functions become tools automatically. Supports OpenAI, Anthropic, and Gemini.",
    url: BASE_URL,
    siteName: "ConnectOnion Docs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ConnectOnion - Python AI Agents from a Working Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConnectOnion - Python AI Agents from a Working Template",
    description: "One command scaffolds an agent that already runs. Plain Python functions become tools automatically.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@connectonion",
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
  "description": "ConnectOnion is an open-source Python toolkit for AI agents. The co CLI scaffolds a project that already runs, with shell, file editing, search and a model wired in, and plain Python functions become tools automatically.",
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
  "softwareVersion": STABLE_VERSION,
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
  "@id": `${BASE_URL}/#organization`,
  "name": "ConnectOnion",
  "alternateName": ["Connect Onion", "ConnectOnion Framework"],
  "url": BASE_URL,
  "logo": `${BASE_URL}/onion-logo.png`,
  "sameAs": [
    "https://github.com/openonion/connectonion",
    "https://pypi.org/project/connectonion/",
    "https://discord.gg/4xfD9k8AUF"
  ],
  "description": "ConnectOnion - Open-source Python toolkit for building AI agents from a working template"
};

// Describe the documentation collection without advertising a nonexistent search endpoint.
const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "ConnectOnion Documentation",
  "url": BASE_URL,
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": "en"
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
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          id="organization-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          id="website-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
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
