'use client'

import React from 'react'
import { HiOutlineWrench, HiOutlineEnvelope, HiOutlineCalendar, HiOutlineCpuChip, HiOutlineGlobeAlt, HiOutlineArrowRight, HiOutlineCommandLine, HiOutlineClipboardDocumentList, HiOutlineCodeBracket, HiOutlineDocumentText } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'
import Link from 'next/link'
import { PageHeader } from '../../components/PageHeader'
import CodeWithResult from '../../components/CodeWithResult'

const toolCategories = [
  {
    id: 'email',
    title: 'Email',
    description: 'Send and receive emails through various providers',
    icon: HiOutlineEnvelope,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'Gmail', href: '/gmail', description: 'Full Gmail integration with OAuth', status: 'available' },
      { name: 'Outlook', href: '/outlook', description: 'Microsoft 365 email integration', status: 'available' },
      { name: 'Agent Emails', href: '/agent-emails', description: 'Generic SMTP/IMAP email', status: 'available' },
    ]
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'Schedule meetings and manage calendars',
    icon: HiOutlineCalendar,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'Google Calendar', href: '/google-integration', description: 'Google Calendar integration', status: 'available' },
      { name: 'Microsoft Calendar', href: '/microsoft-integration', description: 'Outlook Calendar integration', status: 'available' },
    ]
  },
  {
    id: 'memory',
    title: 'Memory & Storage',
    description: 'Persistent memory and knowledge storage',
    icon: HiOutlineCpuChip,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'Memory', href: '/memory', description: 'RAG-powered persistent memory', status: 'available' },
    ]
  },
  {
    id: 'web',
    title: 'Web',
    description: 'Fetch and interact with web content',
    icon: HiOutlineGlobeAlt,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'WebFetch', href: '/web-fetch', description: 'Fetch and parse web pages', status: 'available' },
    ]
  },
  {
    id: 'system',
    title: 'System',
    description: 'System and terminal operations',
    icon: HiOutlineCommandLine,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'Shell', href: '/useful-tools/shell', description: 'Execute shell commands', status: 'available' },
      { name: 'Terminal', href: '/useful-tools/terminal', description: 'Interactive terminal sessions', status: 'available' },
    ]
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Task management and productivity tools',
    icon: HiOutlineClipboardDocumentList,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'Todo List', href: '/useful-tools/todo-list', description: 'Task management for agents', status: 'available' },
    ]
  },
  {
    id: 'dev',
    title: 'Developer',
    description: 'Development and code tools',
    icon: HiOutlineCodeBracket,
    color: 'icon-ui',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    tools: [
      { name: 'FileTools', href: '/useful-tools/file-tools', description: 'Read/edit files with safety tracking', status: 'available' },
      { name: 'Diff Writer', href: '/useful-tools/diff-writer', description: 'Write code diffs', status: 'available' },
      { name: 'Slash Command', href: '/useful-tools/slash-command', description: 'Custom CLI commands', status: 'available' },
    ]
  },
]

export default function UsefulToolsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools' }
          ]}
          icon={HiOutlineWrench}
          iconColor="icon-ui"
          title="Useful Tools"
          description="Pre-built tools from connectonion.useful_tools"
          markdownPath="/useful-tools.md"
          markdownFilename="useful-tools.md"
        />

        {/* Quick Usage */}
        <div className="mb-12 section-featured">
          <h2 className="heading-2 mb-4">Quick Usage</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import Gmail, Memory, WebFetch

gmail = Gmail()
memory = Memory()
web_fetch = WebFetch()

agent = Agent(
    "assistant",
    tools=[gmail, memory, web_fetch]
)

agent.input("Search my emails for invoices from last week")`}
            result=""
            language="python"
          />
        </div>

        {/* Tool Categories */}
        <div className="space-y-8 mb-12">
          {toolCategories.map((category) => (
            <div key={category.id} className={`p-6 rounded-lg border ${category.borderColor} ${category.bgColor} hover:border-gray-300/30 transition-all`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gray-100 border border-gray-200 ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-700">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className={`group block p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all min-h-[48px] ${
                      tool.status === 'coming-soon' ? 'opacity-60 pointer-events-none' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {tool.name}
                      </h3>
                      {tool.status === 'coming-soon' ? (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          Coming Soon
                        </span>
                      ) : (
                        <HiOutlineArrowRight className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Customizing Built-in Tools */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">Customizing Built-in Tools</h2>
          <p className="text-gray-700 mb-4">
            Need to modify a built-in tool? Copy it to your project:
          </p>
          <CodeWithResult
            code={`# Copy a tool to your project
co copy shell

# Copy multiple tools
co copy shell memory gmail`}
            result={`✓ Copied: ./tools/shell.py
✓ Copied: ./tools/memory.py
✓ Copied: ./tools/gmail.py`}
            language="bash"
          />
          <p className="text-gray-700 mt-4 mb-4">
            Then import from your local copy and customize:
          </p>
          <CodeWithResult
            code={`# Before (from package)
from connectonion import Shell

# After (from your copy)
from tools.shell import Shell  # Customize freely!`}
            result=""
            language="python"
          />
          <p className="text-sm text-gray-700 mt-4">
            See <Link href="/cli" className="text-gray-500 hover:text-gray-700">co copy</Link> for full details.
          </p>
        </div>

        {/* Building Custom Tools */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">Building Custom Tools</h2>
          <p className="text-gray-700 mb-4">
            Any Python function can be a tool. Just pass it to the Agent:
          </p>
          <CodeWithResult
            code={`def my_custom_tool(query: str) -> str:
    """Search my database for relevant information."""
    return database.search(query)

agent = Agent("assistant", tools=[my_custom_tool])`}
            result=""
            language="python"
          />
          <p className="text-sm text-gray-700 mt-4">
            Learn more in the <Link href="/tools" className="text-gray-500 hover:text-gray-700">Tools documentation</Link>.
          </p>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
