'use client'

import React from 'react'
import { HiOutlineArrowRight, HiOutlineCodeBracket, HiOutlineGlobeAlt, HiOutlineEnvelope, HiOutlineCommandLine } from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa'
import { ContentNavigation } from '../../components/ContentNavigation'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'

const examples = [
  {
    id: 'browser-agent',
    repo: 'openonion/browser-agent',
    title: 'Browser Agent',
    description: 'A fully autonomous browser automation agent. Controls Chromium with natural language — navigate, click, type, extract, and screenshot.',
    icon: HiOutlineGlobeAlt,
    tags: ['Playwright', 'Web Scraping', 'Screenshots', 'Automation'],
    github: 'https://github.com/openonion/browser-agent',
    usage: `from connectonion import Agent
from connectonion.useful_tools.browser_tools import BrowserAutomation

agent = Agent("browser", tools=[BrowserAutomation()])
agent.input("Go to github.com and screenshot the trending page")`
  },
  {
    id: 'email-agent',
    repo: 'openonion/email-agent',
    title: 'Email Agent',
    description: 'An intelligent email management agent. Reads, replies, categorises and drafts emails via Gmail or IMAP — fully autonomous inbox handling.',
    icon: HiOutlineEnvelope,
    tags: ['Gmail', 'IMAP', 'Inbox', 'Drafts'],
    github: 'https://github.com/openonion/email-agent',
    usage: `from connectonion import Agent, Gmail

agent = Agent("email", tools=[Gmail()])
agent.input("Summarise my unread emails from today")`
  },
  {
    id: 'co-ai',
    repo: 'openonion/co_ai',
    title: 'co ai',
    description: 'The AI coding assistant that ships inside the ConnectOnion CLI. One-shot code generation, interactive debugging, and web server scaffolding from the terminal.',
    icon: HiOutlineCommandLine,
    tags: ['CLI', 'Code Generation', 'Debugging', 'Interactive'],
    github: 'https://github.com/openonion/co_ai',
    usage: `# From your terminal
co ai "write a FastAPI server with auth"
co ai --interactive   # start a conversation
co ai --server        # spin up a dev server`
  },
]

export default function ExamplesPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-100 rounded-xl border border-gray-200">
                <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h1 className="heading-1">Examples</h1>
                <p className="text-lg text-gray-700">
                  Real agents built with ConnectOnion — open source and ready to clone.
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/examples.md" filename="examples.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* Example Cards */}
        <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden mb-12">
          {examples.map((example) => {
            const Icon = example.icon
            return (
              <div key={example.id} className="bg-white px-6 py-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h2 className="text-base font-semibold text-gray-900">{example.title}</h2>
                        <code className="text-xs text-gray-500 font-mono">{example.repo}</code>
                      </div>
                      <a
                        href={example.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-lg px-3 py-1.5 transition-all"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        View on GitHub
                      </a>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{example.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {example.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-mono">{tag}</span>
                      ))}
                    </div>

                    <pre className="bg-gray-900 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
                      <code>{example.usage}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Build Your Own Agent</h3>
          <p className="text-gray-500 text-sm mb-6">Start from the Quick Start guide or browse the full API reference.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quickstart"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Quick Start
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/agent"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
            >
              Agent API Reference
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
