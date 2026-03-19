'use client'

import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineSquares2X2, HiOutlineCommandLine, HiOutlineWrench, HiOutlineGlobeAlt, HiOutlineUsers } from 'react-icons/hi2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia as monokai } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Advantage {
  icon: React.ComponentType<{ className?: string }>
  title: string
  tagline: string
  description: string
  code?: string
  color: string
  borderColor: string
  bgColor: string
}

const advantages: Advantage[] = [
  {
    icon: HiOutlineSparkles,
    title: 'Built-in AI Programmer',
    tagline: 'An AI that knows the framework inside out',
    description: 'Run co ai — an AI coding assistant built with ConnectOnion that writes working agent code. Fully open-source.',
    code: `co ai   # Opens chat with AI that deeply understands ConnectOnion`,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'from-purple-900/30 to-purple-900/10',
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'Built-in Frontend & Backend',
    tagline: 'Just write prompt and tools — deploy',
    description: 'No FastAPI backend. No React frontend. No API wiring. Framework handles it all. chat.openonion.ai ready to use.',
    code: `# Other frameworks:
# write agent → build FastAPI → build React → wire APIs → deploy

# ConnectOnion:
agent = Agent("support", tools=[search, reply])
host(agent)  # Done. Frontend + backend included.`,
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bgColor: 'from-blue-900/30 to-blue-900/10',
  },
  {
    icon: HiOutlineWrench,
    title: 'Ready-to-Use Tool Ecosystem',
    tagline: 'Import and use — no schema, no wiring',
    description: 'bash, Shell, FileTools, BrowserAutomation, Gmail, Outlook, Calendar, Memory, TodoList — all built-in. Need to customize? co copy takes the source.',
    code: `from connectonion import bash, Gmail, Memory, TodoList
from connectonion.useful_tools import FileTools
from connectonion.useful_tools.browser_tools import BrowserAutomation

agent = Agent("assistant", tools=[bash, Gmail(), Memory(), FileTools()])

co copy Gmail   # Copies source to your project for customization`,
    color: 'text-green-400',
    borderColor: 'border-green-500/30',
    bgColor: 'from-green-900/30 to-green-900/10',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Built-in Approval System',
    tagline: 'Safety by default, not by effort',
    description: 'Dangerous operations automatically trigger approval. Plugin-based — turn it off, customize it, or replace it entirely.',
    code: `from connectonion.useful_plugins import shell_approval, tool_approval

agent = Agent("assistant", tools=[bash], plugins=[shell_approval])
# Shell commands now require approval before execution
# No permission logic needed from you`,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    bgColor: 'from-yellow-900/30 to-yellow-900/10',
  },
  {
    icon: HiOutlineCommandLine,
    title: 'Skills System',
    tagline: 'Reusable workflows with auto permission scoping',
    description: 'User types /commit — skill loads, git commands auto-approved, permission cleared after execution. Auto-discovers Claude Code skills.',
    code: `from connectonion.useful_plugins import skills

agent = Agent("assistant", tools=[bash], plugins=[skills])

# Three-level auto-discovery:
# .co/skills/       — project-level (highest priority)
# ~/.co/skills/     — user-level
# builtin/skills/   — built-in
# .claude/skills/   — Claude Code compatible (auto-loaded)`,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bgColor: 'from-cyan-900/30 to-cyan-900/10',
  },
  {
    icon: HiOutlineSquares2X2,
    title: 'Claude Code-Equivalent Plugins',
    tagline: 'Same capabilities, open to any agent',
    description: 'auto_compact, subagents, ulw, tool_approval — these mirror Claude Code\'s internal capabilities. ConnectOnion makes them available to every agent you build.',
    code: `from connectonion.useful_plugins import auto_compact, subagents, ulw

agent = Agent("researcher", tools=[search], plugins=[
    auto_compact,   # Auto-compress context at 90% capacity
    subagents,      # Spawn sub-agents with independent tools
    ulw,            # Ultra Light Work — fully autonomous mode
])`,
    color: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    bgColor: 'from-pink-900/30 to-pink-900/10',
  },
  {
    icon: HiOutlineUsers,
    title: 'Multi-Agent Trust System',
    tagline: 'Zero token cost for 90% of trust decisions',
    description: 'Fast Rules handle trust before LLM involvement. Blocklist, whitelist, invite codes — all resolved instantly. Only edge cases go to LLM.',
    code: `agent = Agent("production", trust="careful")
# careful: whitelist → allow, unknown → ask LLM, blocked → deny

# Three presets for different stages:
# "open"     — development (allow all)
# "careful"  — staging (whitelist + LLM fallback)
# "strict"   — production (whitelist only)`,
    color: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    bgColor: 'from-orange-900/30 to-orange-900/10',
  },
]

export function NonObviousAdvantages() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-900/20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-500" />
            <span className="text-green-400 text-sm font-mono uppercase tracking-wider">Beyond Code Comparison</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-green-500" />
          </div>
          <h2 className="heading-2 mb-4">
            What Other Frameworks <span className="text-green-400">Don't Have</span>
          </h2>
          <p className="text-slate-100 text-lg max-w-2xl mx-auto">
            These aren't about writing less code. They're capabilities other frameworks haven't built at all.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="space-y-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon
            return (
              <div
                key={idx}
                className={`rounded-xl border ${adv.borderColor} bg-gradient-to-br ${adv.bgColor} overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Icon className={`w-8 h-8 ${adv.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="text-lg font-bold text-white">{adv.title}</h3>
                      <p className="text-sm text-slate-300">{adv.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-200 mb-4 ml-12">{adv.description}</p>
                  {adv.code && (
                    <div className="ml-12 rounded-lg overflow-hidden border border-gray-700/50">
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          language="python"
                          style={monokai}
                          customStyle={{
                            margin: 0,
                            padding: '0.75rem',
                            background: 'rgba(0,0,0,0.3)',
                            fontSize: '0.75rem',
                            lineHeight: '1.5'
                          }}
                          wrapLongLines={false}
                        >
                          {adv.code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
