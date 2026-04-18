'use client'

import React from 'react'
import { HiOutlineCube, HiOutlineCpuChip, HiOutlineCodeBracket, HiOutlinePhoto, HiOutlineEnvelope, HiOutlineCalendar, HiOutlineShieldCheck, HiOutlineArrowRight, HiOutlineSparkles, HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'
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
    whenToUse: 'When your agent needs to reason step-by-step before acting. Improves accuracy on multi-step tasks.',
    setup: 'zero-config',
    icon: HiOutlineCpuChip,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
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
    whenToUse: 'When your agent generates and runs Python code. Add this to safely execute LLM-generated scripts.',
    setup: 'zero-config',
    icon: HiOutlineCodeBracket,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
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
    whenToUse: 'When a tool returns a screenshot or image and you want the vision model to actually see it.',
    setup: 'zero-config',
    icon: HiOutlinePhoto,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
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
    whenToUse: 'When building an email assistant. Handles read/reply/label workflows out of the box.',
    setup: 'needs Gmail auth',
    icon: HiOutlineEnvelope,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
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
    whenToUse: 'When building a scheduling assistant. Handles event creation and availability checks.',
    setup: 'needs Google auth',
    icon: HiOutlineCalendar,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
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
    whenToUse: 'Essential when your agent runs shell commands in production. Prevents accidental destructive ops.',
    setup: 'zero-config',
    icon: HiOutlineShieldCheck,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    href: '/useful-plugins/shell-approval',
    events: ['before_each_tool'],
    usage: `from connectonion.useful_plugins import shell_approval

agent = Agent("devops", tools=[run_command], plugins=[shell_approval])`,
    status: 'available'
  },
  {
    id: 'system-reminder',
    name: 'system_reminder',
    title: 'System Reminder',
    description: 'Injects contextual guidance into tool results to nudge agent behavior',
    whenToUse: 'When the agent keeps making the same mistake. Inject a correction reminder after each tool call.',
    setup: 'zero-config',
    icon: HiOutlineChatBubbleBottomCenterText,
    color: 'text-gray-500',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    href: '/useful-plugins/system-reminder',
    events: ['after_each_tool'],
    usage: `from connectonion.useful_plugins import system_reminder

agent = Agent("assistant", tools=[write_file], plugins=[system_reminder])`,
    status: 'available'
  },
]

export default function UsefulPluginsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
          <Link href="/" className="hover:text-gray-500 transition-colors">
            Docs
          </Link>
          <HiOutlineArrowRight className="w-4 h-4" />
          <span className="text-gray-900">Useful Plugins</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-gray-100 rounded-xl border border-gray-200 flex-shrink-0">
                <HiOutlineCube className="w-8 h-8 text-gray-500" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="heading-1">Useful Plugins</h1>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    <HiOutlineSparkles className="w-3 h-3" />
                    Built-in
                  </span>
                </div>
                <p className="text-lg text-gray-700">
                  Pre-built plugins from <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 text-sm whitespace-nowrap">connectonion.useful_plugins</code>
                </p>
              </div>
            </div>
            <CopyMarkdownButton markdownPath="/useful-plugins.md" filename="useful-plugins.md" className="flex-shrink-0" />
          </div>
        </div>

        {/* What is a Plugin */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">What is a Plugin?</h2>
          <p className="text-gray-700 mb-4">
            A plugin is a reusable list of event handlers. Use <code className="bg-gray-100 px-2 py-1 rounded">plugins=[...]</code> to add pre-packaged functionality to any agent.
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
          <p className="text-sm text-gray-700 mt-4">
            Learn how to build custom plugins in the <Link href="/plugin" className="text-gray-500 hover:text-gray-700">Plugin System documentation</Link>.
          </p>
        </div>

        {/* Plugin Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plugins.map((plugin) => (
            <Link
              key={plugin.id}
              href={plugin.href}
              className={`group block p-4 sm:p-6 rounded-lg border ${plugin.borderColor} ${plugin.bgColor} hover:border-gray-400 hover:shadow-sm hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${plugin.color}`}>
                    <plugin.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{plugin.title}</h3>
                    <code className="text-xs sm:text-sm text-gray-700">{plugin.name}</code>
                  </div>
                </div>
                <HiOutlineArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors flex-shrink-0" />
              </div>

              <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                {plugin.description}
              </p>

              <p className="text-sm text-gray-900 mb-3 font-medium leading-snug">
                {plugin.whenToUse}
              </p>

              <div className="flex flex-wrap gap-2 items-center">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${plugin.setup === 'zero-config' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                  {plugin.setup}
                </span>
                {plugin.events.map((event, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-mono"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Using Multiple Plugins */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">Combining Plugins</h2>
          <p className="text-gray-700 mb-4">
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

        {/* Customizing Plugins */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">Customizing Plugins</h2>
          <p className="text-gray-700 mb-4">
            Need to modify a built-in plugin? Copy it to your project:
          </p>
          <CodeWithResult
            code={`# Copy a plugin to your project
co copy re_act

# Copy multiple plugins
co copy re_act shell_approval eval`}
            result={`✓ Copied: ./plugins/re_act.py
✓ Copied: ./plugins/shell_approval.py
✓ Copied: ./plugins/eval.py`}
            language="bash"
          />
          <p className="text-gray-700 mt-4 mb-4">
            Then import from your local copy and customize:
          </p>
          <CodeWithResult
            code={`# Before (from package)
from connectonion.useful_plugins import re_act

# After (from your copy)
from plugins.re_act import re_act  # Customize freely!`}
            result=""
            language="python"
          />
          <p className="text-sm text-gray-700 mt-4">
            See <Link href="/cli" className="text-gray-500 hover:text-gray-700">co copy</Link> for full details.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8 px-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="heading-2">Build Your Own Plugin</h2>
          <p className="text-gray-700 mb-6">
            Learn how to create custom plugins using the event system
          </p>
          <Link
            href="/plugin"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors min-h-[48px]"
          >
            Plugin System Docs
            <HiOutlineArrowRight className="w-5 h-5" />
          </Link>
        </div>

      {/* Navigation */}
      <ContentNavigation />
      </div>
    </div>
  )
}
