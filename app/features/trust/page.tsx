'use client'

import CodeWithResult from '../../../components/CodeWithResult'
import { HiOutlineShieldCheck, HiOutlineUsers, HiOutlineCodeBracket, HiOutlineBolt, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineBookOpen, HiOutlineDocumentText, HiOutlineCpuChip } from 'react-icons/hi2'
import Link from 'next/link'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'

export default function TrustPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-900/20 to-gray-950">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        <div className="relative max-w-4xl mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="text-sm text-gray-500 font-medium mb-4">Core Feature</div>
              <h1 className="heading-1">
                Trust in ConnectOnion
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl">
                Flexible, bidirectional trust configuration for agent interactions
              </p>
            </div>
            <CopyMarkdownButton markdownPath="/trust/trust.md" filename="trust.md" className="flex-shrink-0" />
          </div>

          {/* Why Trust Blog Link */}
          <Link
            href="/blog/trust-keyword"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gray-900/30 border border-purple-800 rounded-lg hover:bg-gray-900/50 transition-colors group"
          >
            <HiOutlineBookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-400">Read: Why we chose "trust" as our keyword</span>
            <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Start */}
            <section>
              <h2 className="heading-2">
                <HiOutlineBolt className="w-7 h-7 text-yellow-400" />
                Quick Start
              </h2>
              <CodeWithResult
                code={`from connectonion import Agent, need

# Simple trust levels
translator = need("translate", trust="strict")   # Production: verified only
analyzer = need("analyze", trust="tested")       # Default: test first
scraper = need("scrape", trust="open")          # Development: trust all

# For your own agent
agent = Agent(
    name="my_service",
    tools=[process_data],
    trust="strict"  # Who can use my services
)`}
                result=""
              />
            </section>

            {/* Three Forms of Trust */}
            <section>
              <h2 className="heading-2">
                <HiOutlineCodeBracket className="w-7 h-7 text-blue-400" />
                Three Forms of Trust
              </h2>

              {/* 1. Trust Levels */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-green-900/20 to-green-900/5 border border-green-800/50 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-green-400">1.</span> Trust Levels (String)
                  </h3>
                  <p className="text-gray-700 mb-4">Simple predefined levels for common scenarios:</p>
                </div>
                <CodeWithResult
                  code={`# Development - trust everyone
agent = need("service", trust="open")

# Default - test before trusting
agent = need("service", trust="tested")

# Production - only verified/whitelisted
agent = need("service", trust="strict")`}
                  result=""
                />
              </div>

              {/* 2. Trust Policy */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-800/50 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineDocumentText className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400">2.</span> Trust Policy (Natural Language)
                  </h3>
                  <p className="text-gray-700 mb-2">Express complex requirements in plain English:</p>
                </div>
                <CodeWithResult
                  code={`# Inline policy
translator = need("translate", trust="""
    I trust agents that:
    - Pass capability tests
    - Respond within 500ms
    - Are on my whitelist OR from local network
""")

# From file
translator = need("translate", trust="./trust_policy.md")`}
                  result=""
                />
                <div className="mt-4 bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">Example trust policy file:</p>
                  <pre className="text-xs text-gray-400 overflow-x-auto"><code>{`# My Trust Requirements

I trust agents that meet ALL of these criteria:
- Successfully translate "Hello" to "Hola"
- Respond in less than 1 second
- Have processed at least 10 requests successfully

I immediately reject agents that:
- Fail basic capability tests
- Take longer than 5 seconds
- Are on my blacklist`}</code></pre>
                </div>
              </div>

              {/* 3. Trust Agent */}
              <div className="mb-8">
                <div className="bg-gradient-to-br from-gray-900/20 to-gray-900/5 border border-purple-800/50 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineCpuChip className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-500">3.</span> Trust Agent
                  </h3>
                  <p className="text-gray-700 mb-2">For maximum control, use a custom trust agent:</p>
                </div>
                <CodeWithResult
                  code={`# Create a trust agent with verification tools
trust_agent = Agent(
    name="my_guardian",
    tools=[
        check_whitelist,
        verify_capability,
        measure_response_time,
        check_reputation
    ],
    system_prompt="""
        You verify other agents before allowing interaction.
        Be strict with payment processors, relaxed with read-only services.
    """
)

# Use it for your agent
my_agent = Agent(
    name="my_service",
    tools=[process_payment],
    trust=trust_agent  # My guardian protects me
)

# And for discovering services
payment = need("payment processor", trust=trust_agent)`}
                  result=""
                />
              </div>
            </section>

            {/* Bidirectional Trust */}
            <section>
              <h2 className="heading-2">
                <HiOutlineUsers className="w-7 h-7 text-green-400" />
                Bidirectional Trust
              </h2>
              <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-800/50 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-4">
                  The same <code className="text-gray-500 bg-gray-900 px-2 py-1 rounded">trust</code> parameter works in both directions:
                </p>
              </div>
              <CodeWithResult
                code={`# As a SERVICE provider (who can use me?)
alice_agent = Agent(
    name="alice_translator",
    tools=[translate],
    trust="tested"  # Users must pass my tests
)

# As a SERVICE consumer (who do I trust?)
translator = need("translate", trust="strict")  # I only use verified services

# Both trust requirements must be satisfied for interaction!`}
                result=""
              />

              <div className="mt-6 bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Trust Flow Example</h4>
                <CodeWithResult
                  code={`# Alice creates a translation service
alice = Agent(
    name="alice_translator",
    tools=[translate],
    trust="tested"  # Test users before serving them
)
share(alice)

# Bob looks for a translator
translator = need(
    "translate to Spanish",
    trust="strict"  # Bob only uses verified services
)

# What happens:
# 1. Bob's trust agent evaluates Alice (strict check)
# 2. Alice's trust agent evaluates Bob (test required)
# 3. Both must approve for connection to succeed`}
                  result=""
                />
              </div>
            </section>

            {/* Environment-Based Defaults */}
            <section>
              <h2 className="heading-2">Environment-Based Defaults</h2>
              <p className="text-gray-700 mb-4">ConnectOnion automatically adjusts trust based on environment:</p>
              <CodeWithResult
                code={`# No trust parameter needed - auto-detected!
translator = need("translate")

# In development (localhost, Jupyter)
# → Defaults to trust="open"

# In test files (test_*.py)
# → Defaults to trust="tested"

# In production
# → Defaults to trust="strict"

# Override when needed
translator = need("translate", trust="open")  # Force open even in production`}
                result=""
              />
            </section>

            {/* Common Patterns */}
            <section>
              <h2 className="heading-2">Common Patterns</h2>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Development Mode</h4>
                  <CodeWithResult
                    code={`# Trust everyone for rapid development
connectonion.set_default_trust("open")`}
                    result=""
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Production Mode</h4>
                  <CodeWithResult
                    code={`# Strict verification for production
payment = need("payment processor", trust="strict")
sensitive = need("data processor", trust="strict")`}
                    result=""
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Mixed Trust</h4>
                  <CodeWithResult
                    code={`# Different trust for different services
scraper = need("web scraper", trust="open")      # Low risk
analyzer = need("analyze data", trust="tested")   # Medium risk
payment = need("process payment", trust="strict") # High risk`}
                    result=""
                  />
                </div>
              </div>
            </section>

            {/* Security Best Practices */}
            <section>
              <h2 className="heading-2">Security Best Practices</h2>
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Production = Strict:</span>
                      <span className="text-gray-700"> Always use <code className="text-red-400 bg-gray-900 px-2 py-1 rounded">trust="strict"</code> in production</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Test Sensitive Operations:</span>
                      <span className="text-gray-700"> Payment, data modification, etc.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Whitelist Critical Services:</span>
                      <span className="text-gray-700"> Manually verify and whitelist</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Monitor Trust Decisions:</span>
                      <span className="text-gray-700"> Log all trust evaluations</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Regular Audits:</span>
                      <span className="text-gray-700"> Review whitelist and trust policies</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="heading-2">FAQ</h2>
              <div className="space-y-4">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: What's the default trust level?</p>
                  <p className="text-gray-700 text-sm">A: <code className="text-yellow-400 bg-gray-950 px-2 py-1 rounded">"tested"</code> - agents are tested before first use</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Can I change trust after agent creation?</p>
                  <p className="text-gray-700 text-sm">A: Yes: <code className="text-gray-500 bg-gray-950 px-2 py-1 rounded">agent.trust = new_trust_agent</code></p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: How do trust agents communicate?</p>
                  <p className="text-gray-700 text-sm">A: They're regular ConnectOnion agents - they talk naturally</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: What if both agents have strict trust?</p>
                  <p className="text-gray-700 text-sm">A: Both requirements must be met - most restrictive wins</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Can I disable trust completely?</p>
                  <p className="text-gray-700 text-sm">A: Yes: <code className="text-green-400 bg-gray-950 px-2 py-1 rounded">trust="open"</code> accepts everyone without checks</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Decision Helper */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-gray-500" />
                Choose Your Trust Level
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">Development?</p>
                  <code className="text-xs text-green-400">trust="open"</code>
                  <p className="text-xs text-gray-400 mt-1">Trust everyone, iterate fast</p>
                </div>
                <div className="p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">Testing/Staging?</p>
                  <code className="text-xs text-yellow-400">trust="tested"</code>
                  <p className="text-xs text-gray-400 mt-1">Test before trusting (default)</p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <p className="text-sm font-medium text-white mb-1">Production?</p>
                  <code className="text-xs text-red-400">trust="strict"</code>
                  <p className="text-xs text-gray-400 mt-1">Verified agents only</p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HiOutlineExclamationCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">Security Note</p>
                  <p className="text-xs text-yellow-300/80">
                    Always use <code className="bg-yellow-950 px-1.5 py-0.5 rounded">trust="strict"</code> in production environments to prevent unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16">
          <ContentNavigation />
        </div>
      </div>
    </div>
  )
}
