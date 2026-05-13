'use client'

import Link from 'next/link'
import { HiOutlineGlobeAlt, HiOutlineMagnifyingGlass, HiOutlineLink, HiOutlineEnvelope, HiOutlineShare, HiOutlineDocumentText, HiOutlineCpuChip, HiOutlineArrowRight, HiOutlineBolt } from 'react-icons/hi2'
import { CommandBlock } from '../../components/CommandBlock'
import { ContentNavigation } from '../../components/ContentNavigation'
import CodeWithResult from '../../components/CodeWithResult'
import { PageHeader } from '../../components/PageHeader'

export default function WebFetchPage() {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'WebFetch' }
          ]}
          icon={HiOutlineGlobeAlt}
          iconColor="icon-ui"
          title="WebFetch"
          description="Give your agents web scraping powers. Fetch, parse, and analyze web pages."
          markdownPath="/web-fetch.md"
          markdownFilename="web-fetch.md"
        />

        {/* Quick Start */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HiOutlineBolt className="w-6 h-6 icon-ui" />
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

        {/* Usage */}
        <section className="mb-16">
          <h2 className="heading-2">Usage</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Option 1: Import directly</h3>
              <CodeWithResult
                code={`from connectonion import WebFetch

agent = Agent("researcher", tools=[WebFetch()])`}
                language="python"
                fileName="import_direct.py"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Option 2: Copy and customize</h3>
              <CommandBlock commands={['co copy web_fetch']} />
              <div className="mt-4">
                <CodeWithResult
                  code={`from tools.web_fetch import WebFetch  # Your local copy`}
                  language="python"
                  fileName="import_local.py"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="heading-2">Installation</h2>
          <CodeWithResult
            code={`from connectonion import WebFetch

web = WebFetch()`}
            language="python"
            fileName="install.py"
          />
        </section>

        {/* Low-Level Methods */}
        <section className="mb-16">
          <h2 className="heading-2">Low-Level Methods</h2>
          <p className="text-gray-700 mb-6">Direct HTTP and parsing operations</p>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineGlobeAlt className="w-4 h-4" />
                fetch(url)
              </h3>
              <p className="text-gray-700 text-sm mb-4">HTTP GET request, returns raw HTML</p>
              <CodeWithResult
                code={`html = web.fetch("example.com")
# Returns: "<!DOCTYPE html>..."`}
                language="python"
                fileName="fetch.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineDocumentText className="w-4 h-4" />
                strip_tags(html)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Strip HTML tags, returns body text only</p>
              <CodeWithResult
                code={`text = web.strip_tags(html)
# Returns clean text without HTML`}
                language="python"
                fileName="strip_tags.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineDocumentText className="w-4 h-4" />
                get_title(html)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Get page title</p>
              <CodeWithResult
                code={`title = web.get_title(html)
# Returns: "Example Domain"`}
                language="python"
                fileName="get_title.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineLink className="w-4 h-4" />
                get_links(html)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Extract all links from HTML</p>
              <CodeWithResult
                code={`links = web.get_links(html)
# Returns: [{'text': 'Home', 'href': '/'}, {'text': 'About', 'href': '/about'}]`}
                language="python"
                fileName="get_links.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineEnvelope className="w-4 h-4" />
                get_emails(html)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Extract email addresses from HTML</p>
              <CodeWithResult
                code={`emails = web.get_emails(html)
# Returns: ['support@example.com', 'sales@company.org']`}
                language="python"
                fileName="get_emails.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300/50 hover:bg-gray-100 transition-all p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineShare className="w-4 h-4" />
                get_social_links(html)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Extract social media links</p>
              <CodeWithResult
                code={`html = web.fetch("openai.com")
social = web.get_social_links(html)
# Returns: {'twitter': 'https://x.com/OpenAI', 'youtube': '...', 'github': '...'}`}
                language="python"
                fileName="get_social_links.py"
              />
            </div>
          </div>
        </section>

        {/* High-Level Methods */}
        <section className="mb-16">
          <h2 className="heading-2">High-Level Methods (LLM-Powered)</h2>
          <p className="text-gray-700 mb-6">AI-powered analysis of web pages</p>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineCpuChip className="w-4 h-4" />
                analyze_page(url)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Use LLM to understand what a page/company does</p>
              <CodeWithResult
                code={`result = web.analyze_page("stripe.com")
# Returns: "Stripe is a technology company that builds economic infrastructure..."`}
                language="python"
                fileName="analyze_page.py"
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-700 font-mono mb-2 flex items-center gap-2">
                <HiOutlineMagnifyingGlass className="w-4 h-4" />
                get_contact_info(url)
              </h3>
              <p className="text-gray-700 text-sm mb-4">Extract contact information using LLM</p>
              <CodeWithResult
                code={`result = web.get_contact_info("stripe.com/contact")
# Returns: "Email: support@stripe.com, Phone: ..."`}
                language="python"
                fileName="get_contact_info.py"
              />
            </div>
          </div>
        </section>

        {/* Composing Functions */}
        <section className="mb-16">
          <h2 className="heading-2">Composing Functions</h2>
          <p className="text-gray-700 mb-4">Chain low-level methods together for custom workflows:</p>
          <CodeWithResult
            code={`# Get clean text from a URL
text = web.strip_tags(web.fetch("example.com"))

# Get title and text
html = web.fetch("example.com")
title = web.get_title(html)
text = web.strip_tags(html)`}
            language="python"
            fileName="compose.py"
          />
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
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Method</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">fetch(url)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low-level</td>
                  <td className="px-4 py-3 text-sm text-gray-700">HTTP GET, returns raw HTML</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">strip_tags(html)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low-level</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Remove HTML tags, return text</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">get_title(html)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low-level</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Extract page title</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">get_links(html)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low-level</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Extract all links</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">get_emails(html)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low-level</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Extract email addresses</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">get_social_links(html)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Low-level</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Extract social media links</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">analyze_page(url)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">LLM</td>
                  <td className="px-4 py-3 text-sm text-gray-700">AI analysis of what page/company does</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-mono text-sm text-gray-800">get_contact_info(url)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">LLM</td>
                  <td className="px-4 py-3 text-sm text-gray-700">AI extraction of contact info</td>
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

        {/* Customizing */}
        <section className="mb-16">
          <h2 className="heading-2">Customizing</h2>
          <p className="text-gray-700 mb-4">
            Need to modify WebFetch&apos;s behavior? Copy the source into your project and import from there:
          </p>
          <CommandBlock commands={['co copy web_fetch']} />
          <div className="mt-6">
            <CodeWithResult
              code={`# from connectonion import WebFetch  # Before
from tools.web_fetch import WebFetch  # After — customize freely!`}
              language="python"
              fileName="custom_import.py"
            />
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
