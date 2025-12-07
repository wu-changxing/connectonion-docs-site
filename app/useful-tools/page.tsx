'use client'

import React from 'react'
import { Wrench, Mail, Calendar, Brain, Globe, ArrowRight, Terminal, ListTodo, Code } from 'lucide-react'
import { ContentNavigation } from '../../components/ContentNavigation'
import Link from 'next/link'
import { PageHeader } from '../../components/PageHeader'
import CodeWithResult from '../../components/CodeWithResult'

const toolCategories = [
  {
    id: 'email',
    title: 'Email',
    description: 'Send and receive emails through various providers',
    icon: Mail,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-500/30',
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
    icon: Calendar,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-500/30',
    tools: [
      { name: 'Google Calendar', href: '/google-integration', description: 'Google Calendar integration', status: 'available' },
      { name: 'Microsoft Calendar', href: '/microsoft-integration', description: 'Outlook Calendar integration', status: 'available' },
    ]
  },
  {
    id: 'memory',
    title: 'Memory & Storage',
    description: 'Persistent memory and knowledge storage',
    icon: Brain,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-500/30',
    tools: [
      { name: 'Memory', href: '/memory', description: 'RAG-powered persistent memory', status: 'available' },
    ]
  },
  {
    id: 'web',
    title: 'Web',
    description: 'Fetch and interact with web content',
    icon: Globe,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-500/30',
    tools: [
      { name: 'WebFetch', href: '/web-fetch', description: 'Fetch and parse web pages', status: 'available' },
    ]
  },
  {
    id: 'system',
    title: 'System',
    description: 'System and terminal operations',
    icon: Terminal,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/30',
    tools: [
      { name: 'Shell', href: '/useful-tools/shell', description: 'Execute shell commands', status: 'coming-soon' },
      { name: 'Terminal', href: '/useful-tools/terminal', description: 'Interactive terminal sessions', status: 'coming-soon' },
    ]
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Task management and productivity tools',
    icon: ListTodo,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-500/30',
    tools: [
      { name: 'Todo List', href: '/useful-tools/todo-list', description: 'Task management for agents', status: 'coming-soon' },
    ]
  },
  {
    id: 'dev',
    title: 'Developer',
    description: 'Development and code tools',
    icon: Code,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20',
    borderColor: 'border-pink-500/30',
    tools: [
      { name: 'Diff Writer', href: '/useful-tools/diff-writer', description: 'Write code diffs', status: 'coming-soon' },
      { name: 'Slash Command', href: '/useful-tools/slash-command', description: 'Custom CLI commands', status: 'coming-soon' },
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
          icon={Wrench}
          iconColor="text-purple-400"
          iconBgFrom="from-purple-600/20"
          iconBgTo="to-pink-600/20"
          iconBorderColor="border-purple-500/30"
          title="Useful Tools"
          description="Pre-built tools from connectonion.useful_tools"
          markdownPath="/useful-tools.md"
          markdownFilename="useful-tools.md"
        />

        {/* Quick Usage */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
          <h2 className="heading-2 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-400" />
            Quick Usage
          </h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools import gmail, memory, web_fetch

agent = Agent(
    "assistant",
    tools=[gmail.search, gmail.send, memory.remember, web_fetch.fetch]
)

agent.input("Search my emails for invoices from last week")`}
            result=""
            language="python"
          />
        </div>

        {/* Tool Categories */}
        <div className="space-y-8 mb-12">
          {toolCategories.map((category) => (
            <div key={category.id} className={`p-6 rounded-lg border ${category.borderColor} ${category.bgColor} hover:border-purple-400/30 transition-all`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-gray-800 ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <p className="text-sm text-slate-100">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className={`group block p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 hover:border-purple-400/30 border border-transparent transition-all min-h-[48px] ${
                      tool.status === 'coming-soon' ? 'opacity-60 pointer-events-none' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {tool.name}
                      </h3>
                      {tool.status === 'coming-soon' ? (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded-full">
                          Coming Soon
                        </span>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-100 group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <p className="text-sm text-slate-100">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Building Custom Tools */}
        <div className="mb-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
          <h2 className="heading-2">Building Custom Tools</h2>
          <p className="text-slate-100 mb-4">
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
          <p className="text-sm text-slate-100 mt-4">
            Learn more in the <Link href="/tools" className="text-purple-400 hover:text-purple-300">Tools documentation</Link>.
          </p>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
