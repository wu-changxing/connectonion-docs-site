'use client'

import Link from 'next/link'
import { Globe, Search, Link2, Mail, Share2, FileText, Brain, ArrowRight, Zap } from 'lucide-react'
import { CommandBlock } from '../../components/CommandBlock'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'

export default function WebFetchPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-100 mb-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Docs
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-white">WebFetch</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl border border-green-500/30">
                <Globe className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h1 className="heading-1">WebFetch</h1>
                <p className="text-lg text-slate-100">
                  Give your agents web scraping powers. Fetch, parse, and analyze web pages.
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/web-fetch.md" filename="web-fetch.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="heading-2">Quick Start</h2>
          </div>

          <CodeWithResult
            code={`from connectonion import Agent, WebFetch

web = WebFetch()
agent = Agent("researcher", tools=[web])

agent.input("What does stripe.com do?")
agent.input("Get contact info from acme.com")`}
            language="python"
            fileName="quickstart.py"
          />
        </section>

        {/* Low-Level Methods */}
        <section className="mb-16">
          <h2 className="heading-2">Low-Level Methods</h2>
          <p className="text-slate-100 mb-6">Direct HTTP and parsing operations</p>

          <div className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
              <h3 className="font-semibold text-green-300 font-mono mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                fetch(url)
              </h3>
              <p className="text-slate-100 text-sm mb-3">HTTP GET request, returns raw HTML</p>
              <CodeWithResult
                code={`html = web.fetch("https://example.com")
# Returns raw HTML string`}
                language="python"
                fileName="fetch.py"
              />
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
              <h3 className="font-semibold text-green-300 font-mono mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                strip_tags(html, max_chars=10000)
              </h3>
              <p className="text-slate-100 text-sm mb-3">Strip HTML tags, returns body text only</p>
              <CodeWithResult
                code={`html = web.fetch("https://example.com")
text = web.strip_tags(html)
# Returns clean plain text (body content only)`}
                language="python"
                fileName="strip_tags.py"
              />
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
              <h3 className="font-semibold text-green-300 font-mono mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                get_title(html)
              </h3>
              <p className="text-slate-100 text-sm">Get page title from HTML</p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
              <h3 className="font-semibold text-blue-300 font-mono mb-2 flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                get_links(html)
              </h3>
              <p className="text-slate-100 text-sm">Extract all links from HTML</p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
              <h3 className="font-semibold text-purple-300 font-mono mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                get_emails(html)
              </h3>
              <p className="text-slate-100 text-sm">Extract email addresses from HTML</p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-xl hover:border-purple-400/50 hover:bg-gray-800/50 transition-all p-6">
              <h3 className="font-semibold text-pink-300 font-mono mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                get_social_links(html)
              </h3>
              <p className="text-slate-100 text-sm">Extract social media links (Twitter, LinkedIn, Facebook, etc.)</p>
            </div>
          </div>
        </section>

        {/* High-Level Methods */}
        <section className="mb-16">
          <h2 className="heading-2">High-Level Methods (LLM-Powered)</h2>
          <p className="text-slate-100 mb-6">AI-powered analysis of web pages</p>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-purple-300 font-mono mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                analyze_page(url)
              </h3>
              <p className="text-slate-100 text-sm mb-3">Use LLM to understand what a page/company does</p>
              <CodeWithResult
                code={`result = web.analyze_page("https://stripe.com")
# Returns: "Stripe is a payment processing platform that..."}`}
                language="python"
                fileName="analyze_page.py"
              />
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-purple-300 font-mono mb-2 flex items-center gap-2">
                <Search className="w-4 h-4" />
                get_contact_info(url)
              </h3>
              <p className="text-slate-100 text-sm mb-3">Extract contact information (email, phone, address) using LLM</p>
              <CodeWithResult
                code={`info = web.get_contact_info("https://acme.com")
# Returns: {
#   "email": "contact@acme.com",
#   "phone": "+1-555-0123",
#   "address": "123 Main St, City"
# }`}
                language="python"
                fileName="get_contact_info.py"
              />
            </div>
          </div>
        </section>

        {/* Example Agent */}
        <section className="mb-16">
          <h2 className="heading-2">Research Agent Example</h2>

          <CodeWithResult
            code={`from connectonion import Agent, WebFetch, Memory

web = WebFetch()
memory = Memory()

agent = Agent(
    name="researcher",
    tools=[web, memory],
    system_prompt="""You are a web researcher. You can:
    - Fetch and analyze websites
    - Extract contact information
    - Find social media profiles
    - Remember findings for later"""
)

# Research a company
agent.input("Research stripe.com and tell me what they do")

# Find contact info
agent.input("Get contact information from acme.com")

# Build a lead list
agent.input("Find all email addresses on techstartup.io and save them to memory")

# Competitive analysis
agent.input("Compare what stripe.com and square.com offer")`}
            language="python"
            fileName="research_agent.py"
          />
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="heading-2">API Reference</h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Method</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr className="bg-gray-900/50">
                  <td className="px-4 py-3 font-mono text-sm text-green-300">fetch(url)</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Low-level</td>
                  <td className="px-4 py-3 text-sm text-slate-100">HTTP GET, returns raw HTML</td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-4 py-3 font-mono text-sm text-green-300">strip_tags(html)</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Low-level</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Remove HTML tags, return text</td>
                </tr>
                <tr className="bg-gray-900/50">
                  <td className="px-4 py-3 font-mono text-sm text-green-300">get_title(html)</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Low-level</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Extract page title</td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-4 py-3 font-mono text-sm text-blue-300">get_links(html)</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Low-level</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Extract all links</td>
                </tr>
                <tr className="bg-gray-900/50">
                  <td className="px-4 py-3 font-mono text-sm text-purple-300">get_emails(html)</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Low-level</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Extract email addresses</td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-4 py-3 font-mono text-sm text-pink-300">get_social_links(html)</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Low-level</td>
                  <td className="px-4 py-3 text-sm text-slate-100">Extract social media links</td>
                </tr>
                <tr className="bg-gray-900/50">
                  <td className="px-4 py-3 font-mono text-sm text-yellow-300">analyze_page(url)</td>
                  <td className="px-4 py-3 text-sm text-purple-400">LLM</td>
                  <td className="px-4 py-3 text-sm text-slate-100">AI analysis of what page/company does</td>
                </tr>
                <tr className="bg-gray-900/30">
                  <td className="px-4 py-3 font-mono text-sm text-yellow-300">get_contact_info(url)</td>
                  <td className="px-4 py-3 text-sm text-purple-400">LLM</td>
                  <td className="px-4 py-3 text-sm text-slate-100">AI extraction of contact info</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-16">
          <h2 className="heading-2">Configuration</h2>

          <CodeWithResult
            code={`# Custom timeout (default: 15 seconds)
web = WebFetch(timeout=30)

# Use with agent
agent = Agent("researcher", tools=[web])`}
            language="python"
            fileName="config.py"
          />
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
