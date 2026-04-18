'use client'

import Link from 'next/link'
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineBookOpen, HiOutlineCalendar, HiOutlineClock, HiOutlineUsers, HiOutlineCommandLine, HiOutlineCodeBracket, HiOutlineServerStack, HiOutlineShieldCheck, HiOutlineChatBubbleLeftRight, HiOutlineSquare3Stack3D } from 'react-icons/hi2'
import { ContentNavigation } from '../../components/ContentNavigation'

const blogPosts = [
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
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-8"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Docs
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineBookOpen className="w-8 h-8 text-gray-500" />
            <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          </div>
          <p className="text-gray-700">
            Design decisions and insights from building ConnectOnion
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-4">
          {blogPosts.map((post) => {
            const Icon = post.icon
            return (
              <Link
                key={post.href}
                href={post.href}
                className="block group"
              >
                <article className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all duration-200">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-colors">
                      <Icon className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-1.5 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <HiOutlineCalendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HiOutlineClock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title — dominant */}
                      <h2 className="text-lg font-bold text-gray-900 mb-0.5 group-hover:text-gray-700 transition-colors leading-snug">
                        {post.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-sm text-gray-500 mb-3">
                        {post.subtitle}
                      </p>

                      {/* Tags and Read More */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-gray-700 transition-colors">
                          Read more
                          <HiOutlineArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-1">More Posts Coming Soon</h3>
          <p className="text-gray-500 text-sm">
            We're documenting our journey. Stay tuned for more insights.
          </p>
        </div>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}