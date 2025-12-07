'use client'

import React from 'react'
import { Package, Brain, Code, Image, Mail, Calendar, Shield, ArrowRight, Sparkles } from 'lucide-react'
import { ContentNavigation } from '../../components/ContentNavigation'
import Link from 'next/link'
import { CopyMarkdownButton } from '../../components/CopyMarkdownButton'
import CodeWithResult from '../../components/CodeWithResult'

const plugins = [
  {
    id: 're-act',
    name: 're_act',
    title: 'ReAct Pattern',
    description: 'Implements Reason + Act pattern with planning before action and reflection after tool execution',
    icon: Brain,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-500/30',
    href: '/useful-plugins/re-act',
    events: ['after_user_input (plan)', 'after_tools (reflect)'],
    usage: `from connectonion.useful_plugins import re_act

agent = Agent("assistant", tools=[search], plugins=[re_act])`,
    status: 'available'
  },
  {
    id: 'eval',
    name: 'eval',
    title: 'Code Evaluation',
    description: 'Safe code evaluation and execution in a sandboxed environment',
    icon: Code,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-500/30',
    href: '/useful-plugins/eval',
    events: ['after_tools'],
    usage: `from connectonion.useful_plugins import eval

agent = Agent("assistant", tools=[generate_code], plugins=[eval])`,
    status: 'available'
  },
  {
    id: 'image-result-formatter',
    name: 'image_result_formatter',
    title: 'Image Result Formatter',
    description: 'Automatically formats base64 images in tool results for vision models (GPT-4o, etc.)',
    icon: Image,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-500/30',
    href: '/useful-plugins/image-result-formatter',
    events: ['after_each_tool'],
    usage: `from connectonion.useful_plugins import image_result_formatter

agent = Agent("assistant", tools=[screenshot], plugins=[image_result_formatter])`,
    status: 'available'
  },
  {
    id: 'gmail-plugin',
    name: 'gmail_plugin',
    title: 'Gmail Plugin',
    description: 'Pre-configured event handlers for Gmail integration workflows',
    icon: Mail,
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-500/30',
    href: '/useful-plugins/gmail-plugin',
    events: ['after_user_input', 'after_tools'],
    usage: `from connectonion.useful_plugins import gmail_plugin

agent = Agent("email_assistant", plugins=[gmail_plugin])`,
    status: 'available'
  },
  {
    id: 'calendar-plugin',
    name: 'calendar_plugin',
    title: 'Calendar Plugin',
    description: 'Pre-configured event handlers for calendar management workflows',
    icon: Calendar,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-500/30',
    href: '/useful-plugins/calendar-plugin',
    events: ['after_user_input', 'after_tools'],
    usage: `from connectonion.useful_plugins import calendar_plugin

agent = Agent("scheduler", plugins=[calendar_plugin])`,
    status: 'available'
  },
  {
    id: 'shell-approval',
    name: 'shell_approval',
    title: 'Shell Approval',
    description: 'Requires user confirmation before executing shell commands for safety',
    icon: Shield,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-500/30',
    href: '/useful-plugins/shell-approval',
    events: ['before_each_tool'],
    usage: `from connectonion.useful_plugins import shell_approval

agent = Agent("devops", tools=[run_command], plugins=[shell_approval])`,
    status: 'available'
  },
]

export default function UsefulPluginsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-100 mb-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Docs
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-white">Useful Plugins</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                <Package className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="heading-1">Useful Plugins</h1>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Built-in
                  </span>
                </div>
                <p className="text-lg text-slate-100">
                  Pre-built plugins from <code className="bg-gray-800 px-2 py-1 rounded text-purple-300">connectonion.useful_plugins</code>
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/useful-plugins.md" filename="useful-plugins.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* What is a Plugin */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
          <h2 className="heading-2">What is a Plugin?</h2>
          <p className="text-slate-100 mb-4">
            A plugin is a reusable list of event handlers. Use <code className="bg-gray-800 px-2 py-1 rounded">plugins=[...]</code> to add pre-packaged functionality to any agent.
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import re_act, image_result_formatter

# Combine multiple plugins
agent = Agent(
    "assistant",
    tools=[search, screenshot],
    plugins=[re_act, image_result_formatter]
)`}
            result=""
            language="python"
          />
          <p className="text-sm text-slate-100 mt-4">
            Learn how to build custom plugins in the <Link href="/plugin" className="text-purple-400 hover:text-purple-300">Plugin System documentation</Link>.
          </p>
        </div>

        {/* Plugin Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plugins.map((plugin) => (
            <Link
              key={plugin.id}
              href={plugin.href}
              className={`group block p-6 rounded-lg border ${plugin.borderColor} ${plugin.bgColor} hover:border-purple-400/50 hover:bg-gray-800/50 hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-800 ${plugin.color}`}>
                    <plugin.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{plugin.title}</h3>
                    <code className="text-sm text-slate-100">{plugin.name}</code>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-100 group-hover:text-white transition-colors" />
              </div>

              <p className="text-slate-100 mb-4">
                {plugin.description}
              </p>

              <div className="mb-4">
                <div className="text-sm font-semibold text-slate-100 mb-2">Events used:</div>
                <div className="flex flex-wrap gap-2">
                  {plugin.events.map((event, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-800 text-slate-100 rounded"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Preview */}
              <div className="bg-gray-900 rounded p-3 overflow-hidden">
                <div className="text-xs text-gray-500 mb-2">Usage</div>
                <pre className="text-xs text-slate-100 overflow-x-auto">
                  <code>{plugin.usage}</code>
                </pre>
              </div>
            </Link>
          ))}
        </div>

        {/* Using Multiple Plugins */}
        <div className="mb-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
          <h2 className="heading-2">Combining Plugins</h2>
          <p className="text-slate-100 mb-4">
            Plugins can be combined for powerful agent behaviors:
          </p>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_plugins import (
    re_act,              # Planning + Reflection
    image_result_formatter,  # Vision support
    shell_approval       # Safety for shell commands
)

agent = Agent(
    "devops_assistant",
    tools=[run_command, screenshot, analyze],
    plugins=[re_act, image_result_formatter, shell_approval]
)

# Now the agent will:
# 1. Plan before acting (re_act)
# 2. Format images for vision models (image_result_formatter)
# 3. Ask for approval before shell commands (shell_approval)
# 4. Reflect after tool execution (re_act)`}
            result=""
            language="python"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center py-8 px-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
          <h2 className="heading-2">Build Your Own Plugin</h2>
          <p className="text-slate-100 mb-6">
            Learn how to create custom plugins using the event system
          </p>
          <Link
            href="/plugin"
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[48px]"
          >
            Plugin System Docs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
