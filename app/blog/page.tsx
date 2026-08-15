import type { Metadata } from 'next'
import Link from 'next/link'
import { HiOutlineArrowPath, HiOutlineArrowRight, HiOutlineUsers, HiOutlineCommandLine, HiOutlineCodeBracket, HiOutlineServerStack, HiOutlineShieldCheck, HiOutlineChatBubbleLeftRight, HiOutlineSquare3Stack3D } from 'react-icons/hi2'

export const metadata: Metadata = {
  title: 'ConnectOnion Design Journal | AI Agent Architecture and Release Decisions',
  description: 'Read ConnectOnion design decisions, release engineering lessons, protocol architecture, API rationale, and the thinking behind the Python AI agent framework.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Building ConnectOnion — Design Journal',
    description: 'Design decisions, release engineering lessons, and architecture notes from the ConnectOnion AI agent framework.',
    url: '/blog',
    type: 'website',
  },
}

const blogPosts = [
  {
    title: 'Changing the Default Model Is a Backend Decision First',
    subtitle: 'Gemini 3.7 Flash by default, and why the client shipped second',
    date: 'August 2026',
    readTime: '5 min read',
    href: '/blog/gemini-37-default',
    icon: HiOutlineArrowPath,
    tags: ['Design Journal', 'Release', 'Models'],
    excerpt: 'ConnectOnion 1.6.6 makes Gemini 3.7 Flash the default. A backend that supports a model nobody requests is invisible; a client that requests a model nobody supports is an outage.'
  },
  {
    title: 'The Agent That Was Itself, and Billed Someone Else',
    subtitle: 'What a deployed process should inherit, and what it must not',
    date: 'August 2026',
    readTime: '6 min read',
    href: '/blog/deployed-agent-identity',
    icon: HiOutlineShieldCheck,
    tags: ['Design Journal', 'Release', 'Agent Identity'],
    excerpt: 'ConnectOnion 1.6.5 stops co deploy --to from shipping the operator identity to the server — and why a bug where every signal agreed with itself survived nine days.'
  },
  {
    title: 'One Browser Protocol, Native Coding Adapters',
    subtitle: 'Why OIP owns the web boundary while Codex and Claude Code stay native',
    date: 'August 2026',
    readTime: '6 min read',
    href: '/blog/oip-native-coding-adapters',
    icon: HiOutlineCommandLine,
    tags: ['Design Decision', 'OIP', 'Coding Adapters'],
    excerpt: 'Why co ai uses one OIP browser connection and translates native Codex and Claude Code events into live O Chat cards.'
  },
  {
    title: 'ConnectOnion 1.6.0',
    subtitle: 'Safer remote agents and a cleaner credential boundary',
    date: 'August 2026',
    readTime: '4 min read',
    href: '/blog/connectonion-1-6',
    icon: HiOutlineShieldCheck,
    tags: ['Release', 'Security', 'Email'],
    excerpt: 'Signed remote-agent control, CLI-local Microsoft credentials, safer email retries, private invite credentials, and verified release artifacts.'
  },
  {
    title: 'Designing the Network Protocol',
    subtitle: 'From Complexity to Clarity',
    date: 'December 2024',
    readTime: '12 min read',
    href: '/blog/network-protocol-design',
    icon: HiOutlineServerStack,
    tags: ['Design Decision', 'Network', 'Protocol'],
    excerpt: 'How we evolved from complex architectures to a simple, powerful protocol. Learn why we chose messages over sessions, public keys as addresses, and simplicity over sophistication.'
  },
  {
    title: 'Why We Chose "Trust"',
    subtitle: 'The Story Behind ConnectOnion\'s Authentication Keyword',
    date: 'December 2024',
    readTime: '5 min read',
    href: '/blog/trust-keyword',
    icon: HiOutlineUsers,
    tags: ['Design Decision', 'Authentication', 'Trust'],
    excerpt: 'After evaluating 15+ options, we settled on "trust" as our authentication keyword. Learn why this bidirectional term perfectly captures our behavioral verification approach.'
  },
  {
    title: 'Why We Chose `llm_do()` Over `llm()`',
    subtitle: 'Functions Need Verbs',
    date: 'December 2024',
    readTime: '7 min read',
    href: '/blog/llm-do',
    icon: HiOutlineCodeBracket,
    tags: ['Design Decision', 'API Design', 'Naming'],
    excerpt: 'Functions should be verbs, not nouns. Discover why we added three characters to transform the entire developer experience with one-shot LLM calls.'
  },
  {
    title: 'Why We Chose `input()` Over `run()`',
    subtitle: 'The Power of User Mental Models',
    date: 'December 2024',
    readTime: '8 min read',
    href: '/blog/input-method',
    icon: HiOutlineCommandLine,
    tags: ['Design Decision', 'API Design', 'UX'],
    excerpt: '40% of users naturally tried `input()` first. Learn how aligning with user mental models increased our first-time success rate from 67% to 89%.'
  },
  {
    title: 'Agent Address Format',
    subtitle: 'Why Hex-Encoded Public Keys',
    date: 'December 2024',
    readTime: '10 min read',
    href: '/blog/agent-address-format',
    icon: HiOutlineShieldCheck,
    tags: ['Design Decision', 'Security', 'Identity'],
    excerpt: 'How we designed agent addresses using Ed25519 public keys, why we chose hex encoding over Base58, and how this enables secure, decentralized agent communication.'
  },
  {
    title: 'Why "Address" Over "Identity"',
    subtitle: 'The Power of Precise Naming',
    date: 'December 2024',
    readTime: '6 min read',
    href: '/blog/naming-is-hard',
    icon: HiOutlineChatBubbleLeftRight,
    tags: ['Design Decision', 'Naming', 'UX'],
    excerpt: 'Words shape thinking. Learn why we chose "address" over "identity" for agent public keys, and how this single word change simplified our entire mental model.'
  },
  {
    title: 'Progressive Disclosure in CLI Design',
    subtitle: 'Simplicity First, Power When Needed',
    date: 'December 2024',
    readTime: '7 min read',
    href: '/blog/cli-ux-progressive-disclosure',
    icon: HiOutlineSquare3Stack3D,
    tags: ['Design Decision', 'CLI', 'UX'],
    excerpt: 'How we designed the ConnectOnion CLI to be approachable for beginners while maintaining power for experts through progressive disclosure and smart defaults.'
  }
]

export default function BlogPage() {
  return (
    <div className="px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Design Journal</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Building ConnectOnion</h1>
          <p className="text-gray-500 text-base">
            Design decisions, lessons learned, and the thinking behind the framework.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
          {blogPosts.map((post, idx) => {
            const Icon = post.icon
            const num = String(idx + 1).padStart(2, '0')
            return (
              <Link
                key={post.href}
                href={post.href}
                className="block group"
              >
                <article className="px-5 py-4 bg-white hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start gap-4">
                    {/* Ordinal + Icon stacked */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
                      <span className="text-[10px] font-bold text-gray-500 tracking-widest font-mono">{num}</span>
                      <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:border-gray-400 group-hover:bg-white transition-all">
                        <Icon className="w-4.5 h-4.5 text-gray-500 group-hover:text-gray-700 transition-colors" style={{width: '1.125rem', height: '1.125rem'}} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-1 text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title — dominant */}
                      <h2 className="text-base font-semibold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors leading-snug">
                        {post.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-sm text-gray-500">
                        {post.subtitle}
                      </p>
                    </div>

                    {/* Read More arrow */}
                    <div className="flex-shrink-0 self-center">
                      <HiOutlineArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* Writing in public — topics we're covering next */}
        <div className="mt-10 border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Writing in public</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            {[
              'How we built the eval system — session replay without adding a line of user code',
              'The trust model — why agent-to-agent auth is harder than you think',
              'Plugin architecture internals — hooks, lifecycle, and the 9 event types',
            ].map((topic) => (
              <div key={topic} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                <p className="text-sm text-gray-600">{topic}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://discord.gg/4xfD9k8AUF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Get notified on Discord
            </a>
            <a
              href="https://github.com/openonion/connectonion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors"
            >
              Star on GitHub
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
