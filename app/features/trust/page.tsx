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
      <div className="relative overflow-hidden bg-gray-50 border-b border-gray-200">
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
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all group"
          >
            <HiOutlineBookOpen className="w-4 h-4 icon-ui" />
            <span className="text-sm text-gray-600">Read: Why we chose "trust" as our keyword</span>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
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
                <HiOutlineBolt className="w-7 h-7 text-gray-400" />
                Quick Start
              </h2>
              <CodeWithResult
                code={`from connectonion import Agent, host, connect

# Trust is enforced at the host boundary, not on the Agent itself
def create_agent():
    return Agent(name="my_service", tools=[process_data])

host(create_agent, trust="strict")  # Who can reach my service

# Consumers connect to a remote agent by address
remote = connect("0x3d4017c3...")
response = remote.input("Process this data")
print(response.text)`}
                result=""
              />
            </section>

            {/* Three Forms of Trust */}
            <section>
              <h2 className="heading-2">
                <HiOutlineCodeBracket className="w-7 h-7 text-gray-400" />
                Three Forms of Trust
              </h2>

              {/* 1. Trust Levels */}
              <div className="mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-gray-500">1.</span> Trust Levels (String)
                  </h3>
                  <p className="text-gray-700 mb-4">Simple predefined levels for common scenarios:</p>
                </div>
                <CodeWithResult
                  code={`# Development - trust everyone
host(create_agent, trust="open")

# Staging - moderate verification (the default)
host(create_agent, trust="careful")

# Production - only verified/whitelisted
host(create_agent, trust="strict")`}
                  result=""
                />
              </div>

              {/* 2. Trust Policy */}
              <div className="mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineDocumentText className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-500">2.</span> Trust Policy (Natural Language)
                  </h3>
                  <p className="text-gray-700 mb-2">Express complex requirements in plain English:</p>
                </div>
                <CodeWithResult
                  code={`# Inline policy
host(create_agent, trust="""
---
allow: [whitelisted, contact]
deny: [blocked]
default: ask
---
I trust agents that:
- Pass capability tests
- Are on my whitelist OR from a known contact
""")

# From file
host(create_agent, trust="./trust_policy.md")`}
                  result=""
                />
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2 font-semibold">Example trust policy file:</p>
                  <pre className="text-xs text-gray-600 overflow-x-auto"><code>{`# My Trust Requirements

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
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineCpuChip className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-500">3.</span> Trust Agent
                  </h3>
                  <p className="text-gray-700 mb-2">For maximum control, use a custom trust agent:</p>
                </div>
                <CodeWithResult
                  code={`from connectonion.network.trust.tools import check_whitelist, verify_agent, test_capability

# Create a trust agent with verification tools
trust_agent = Agent(
    name="my_guardian",
    tools=[
        check_whitelist,
        verify_agent,
        test_capability
    ],
    system_prompt="""
        You verify other agents before allowing interaction.
        Be strict with payment processors, relaxed with read-only services.
    """
)

# Use it to guard your own service
def create_agent():
    return Agent(name="my_service", tools=[process_payment])

host(create_agent, trust=trust_agent)  # My guardian protects me`}
                  result=""
                />
                <p className="text-sm text-gray-600 mt-3">
                  For most cases, prefer the built-in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">TrustAgent</code> class over a raw <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Agent</code> — it already implements <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">should_allow()</code>, whitelisting, and onboarding (invite codes, payment verification) out of the box: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">from connectonion.network.trust import TrustAgent</code>.
                </p>
              </div>
            </section>

            {/* Where Trust Lives */}
            <section>
              <h2 className="heading-2">
                <HiOutlineUsers className="w-7 h-7 text-gray-500" />
                Where Trust Lives
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                <p className="text-gray-700 mb-4">
                  Trust enforcement happens on the <strong>service provider's</strong> side, at the <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">host()</code> boundary — not on the <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">Agent</code> itself. This keeps the split clean: the agent does the work, the host controls who can reach it.
                </p>
              </div>
              <CodeWithResult
                code={`# Alice hosts a translation service
def create_agent():
    return Agent(name="alice_translator", tools=[translate])

host(create_agent, trust="strict")  # Only verified callers get through

# Bob connects to Alice's agent by address
from connectonion import connect
translator = connect("0x_alice_address...")
result = translator.input("Translate 'hello' to Spanish")

# What happens:
# 1. Alice's host receives Bob's request
# 2. Her trust policy evaluates Bob's identity (strict check)
# 3. If approved, the request reaches alice_translator; otherwise it's rejected`}
                result=""
              />
            </section>

            {/* Environment-Based Defaults */}
            <section>
              <h2 className="heading-2">Environment-Based Defaults</h2>
              <p className="text-gray-700 mb-4">Set <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">CONNECTONION_ENV</code> and skip the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">trust</code> argument — the level is picked up automatically:</p>
              <CodeWithResult
                code={`# No trust parameter needed - auto-detected from CONNECTONION_ENV
host(create_agent)

# CONNECTONION_ENV=development → trust="open"
# CONNECTONION_ENV=staging or test → trust="careful"
# CONNECTONION_ENV=production → trust="strict"
# unset → defaults to "careful"

# Override when needed
host(create_agent, trust="open")  # Force open even if CONNECTONION_ENV=production`}
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
host(create_agent, trust="open")`}
                    result=""
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Production Mode</h4>
                  <CodeWithResult
                    code={`# Strict verification for production
host(create_payment_agent, trust="strict")
host(create_data_agent, trust="strict")`}
                    result=""
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Mixed Trust</h4>
                  <CodeWithResult
                    code={`# Different trust for different services (run as separate hosts)
host(create_scraper, trust="open")       # Low risk
host(create_analyzer, trust="careful")   # Medium risk
host(create_payment_agent, trust="strict") # High risk`}
                    result=""
                  />
                </div>
              </div>
            </section>

            {/* Security Best Practices */}
            <section>
              <h2 className="heading-2">Security Best Practices</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Production = Strict:</span>
                      <span className="text-gray-700"> Always use <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">trust="strict"</code> in production</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Test Sensitive Operations:</span>
                      <span className="text-gray-700"> Payment, data modification, etc.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Whitelist Critical Services:</span>
                      <span className="text-gray-700"> Manually verify and whitelist</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">Monitor Trust Decisions:</span>
                      <span className="text-gray-700"> Log all trust evaluations</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HiOutlineCheckCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
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
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: What's the default trust level?</p>
                  <p className="text-gray-700 text-sm">A: <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">"careful"</code> if you don't pass <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">trust=</code> and <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">CONNECTONION_ENV</code> isn't set</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Where does trust get configured?</p>
                  <p className="text-gray-700 text-sm">A: On <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">host()</code>, not on <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">Agent()</code> — trust enforcement moved to the host boundary so the agent itself stays free of access-control logic</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: What can a custom trust Agent do?</p>
                  <p className="text-gray-700 text-sm">A: It's a regular ConnectOnion agent given verification tools (<code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">check_whitelist</code>, <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">verify_agent</code>, etc.) — or use the built-in <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">TrustAgent</code> class for whitelisting and onboarding out of the box</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-gray-900 mb-2">Q: Can I disable trust completely?</p>
                  <p className="text-gray-700 text-sm">A: Yes: <code className="text-gray-700 bg-gray-100 px-2 py-1 rounded">host(create_agent, trust="open")</code> accepts everyone without checks</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Decision Helper */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 icon-ui" />
                Choose Your Trust Level
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Development?</p>
                  <code className="text-xs text-gray-700 font-mono">trust="open"</code>
                  <p className="text-xs text-gray-500 mt-1">Trust everyone, iterate fast</p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Testing/Staging?</p>
                  <code className="text-xs text-gray-700 font-mono">trust="careful"</code>
                  <p className="text-xs text-gray-500 mt-1">Moderate verification (the default)</p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Production?</p>
                  <code className="text-xs text-gray-700 font-mono">trust="strict"</code>
                  <p className="text-xs text-gray-500 mt-1">Verified agents only</p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HiOutlineExclamationCircle className="w-5 h-5 icon-ui mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Security Note</p>
                  <p className="text-xs text-gray-600">
                    Always use <code className="bg-gray-100 px-1.5 py-0.5 rounded">trust="strict"</code> in production environments to prevent unauthorized access.
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
