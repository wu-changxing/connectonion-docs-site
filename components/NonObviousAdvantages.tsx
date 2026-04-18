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
}

const advantages: Advantage[] = [
  {
    icon: HiOutlineSparkles,
    title: 'Built-in AI Programmer',
    tagline: 'An AI that knows the framework inside out',
    description: 'Run co ai — an AI coding assistant built with ConnectOnion that writes working agent code. Fully open-source.',
    code: `co ai   # Opens chat with AI that deeply understands ConnectOnion`,
  },
  {
    icon: HiOutlineGlobeAlt,
    title: 'Built-in Frontend & Backend',
    tagline: 'Just write prompt and tools — deploy',
    description: 'No FastAPI backend. No React frontend. No API wiring. Framework handles it all.',
    code: `# ConnectOnion:
agent = Agent("support", tools=[search, reply])
host(agent)  # Done. Frontend + backend included.`,
  },
  {
    icon: HiOutlineWrench,
    title: 'Ready-to-Use Tool Ecosystem',
    tagline: 'Import and use — no schema, no wiring',
    description: 'bash, Shell, FileTools, BrowserAutomation, Gmail, Outlook, Calendar, Memory, TodoList — all built-in. Need to customize? co copy takes the source.',
    code: `from connectonion import bash, Gmail, Memory, TodoList
from connectonion.useful_tools import FileTools

agent = Agent("assistant", tools=[bash, Gmail(), Memory(), FileTools()])

co copy Gmail   # Copies source to your project for customization`,
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Built-in Approval System',
    tagline: 'Safety by default, not by effort',
    description: 'Dangerous operations automatically trigger approval. Plugin-based — turn it off, customize it, or replace it entirely.',
    code: `from connectonion.useful_plugins import shell_approval, tool_approval

agent = Agent("assistant", tools=[bash], plugins=[shell_approval])
# Shell commands now require approval before execution`,
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
# .claude/skills/   — Claude Code compatible (auto-loaded)`,
  },
  {
    icon: HiOutlineSquares2X2,
    title: 'Claude Code-Equivalent Plugins',
    tagline: 'Same capabilities, open to any agent',
    description: "auto_compact, subagents, ulw, tool_approval — these mirror Claude Code's internal capabilities. ConnectOnion makes them available to every agent you build.",
    code: `from connectonion.useful_plugins import auto_compact, subagents, ulw

agent = Agent("researcher", tools=[search], plugins=[
    auto_compact,   # Auto-compress context at 90% capacity
    subagents,      # Spawn sub-agents with independent tools
    ulw,            # Ultra Light Work — fully autonomous mode
])`,
  },
  {
    icon: HiOutlineUsers,
    title: 'Multi-Agent Trust System',
    tagline: 'Zero token cost for 90% of trust decisions',
    description: 'Fast Rules handle trust before LLM involvement. Blocklist, whitelist, invite codes — all resolved instantly.',
    code: `agent = Agent("production", trust="careful")
# careful: whitelist → allow, unknown → ask LLM, blocked → deny

# Three presets:
# "open"    — development (allow all)
# "careful" — staging (whitelist + LLM fallback)
# "strict"  — production (whitelist only)`,
  },
]

export function NonObviousAdvantages() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gray-300" />
            <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">Beyond Code Comparison</span>
            <div className="h-px w-12 bg-gray-300" />
          </div>
          <h2 className="heading-2 mb-4">
            What Other Frameworks <span className="accent-italic text-[1.05em]">Don&apos;t Have</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            These aren&apos;t about writing less code. They&apos;re capabilities other frameworks haven&apos;t built at all.
          </p>
        </div>

        <div className="space-y-4">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <Icon className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{adv.title}</h3>
                      <p className="text-sm text-gray-500">{adv.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 ml-11">{adv.description}</p>
                  {adv.code && (
                    <div className="ml-11 rounded-lg overflow-hidden border border-gray-700">
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          language="python"
                          style={monokai}
                          customStyle={{
                            margin: 0,
                            padding: '0.75rem',
                            background: '#1a1a2e',
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
