/**
 * @purpose Interactive debugging page for agent.auto_debug() feature
 * @context Shows how to debug AI agents interactively with breakpoints, REPL, and AI assistance
 * @llm-note Progressive tutorial structure: 60-second start → features → real examples → best practices
 */

'use client'

import { HiOutlineCommandLine, HiOutlineBolt, HiOutlineClock, HiOutlineCodeBracket, HiOutlineBugAnt, HiOutlineCpuChip, HiOutlineCheck, HiOutlineExclamationTriangle, HiOutlineArrowPath, HiOutlineChartBar } from 'react-icons/hi2'
import CodeWithResult from '../../components/CodeWithResult'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function AutoDebugPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'Interactive Debugging' }
            ]}
            icon={HiOutlineBugAnt}
            iconColor="icon-ui"
            title="Interactive Debugging"
            description="Debug your AI agents like code. Pause at breakpoints, inspect state, modify variables, and explore 'what if' scenarios."
            markdownPath="/debug/auto_debug.md"
            markdownFilename="auto-debug.md"
          />

          {/* Feature Status */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <HiOutlineClock className="w-5 h-5 icon-ui mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 mb-4">Feature Status (v0.3.2 - Updated Oct 20, 2025)</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <HiOutlineCheck className="w-4 h-4 icon-ui mt-0.5" />
                    <span className="text-gray-700"><strong>Available now:</strong> Continue, Edit variables (Python REPL), Quit, Source display</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HiOutlineClock className="w-4 h-4 icon-ui mt-0.5" />
                    <span className="text-gray-700"><strong>Coming Nov 2:</strong> Ask AI, View trace, Step mode, Universal commands</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Most Important Tip */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Most Important:</strong> Use arrow keys to navigate menus, or press <code className="bg-gray-100 px-2 py-1 rounded">c</code> to continue. That's all you need to know to start!
            </p>
          </div>
        </section>

        {/* 60-Second Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2 flex items-center gap-2">
            <HiOutlineBolt className="w-5 h-5 icon-ui flex-shrink-0" />
            60-Second Quick Start
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Add <code className="bg-gray-100 px-2 py-1 rounded">@xray</code> to tools you want to inspect, then call <code className="bg-gray-100 px-2 py-1 rounded">agent.auto_debug()</code>:
          </p>

          <CodeWithResult
            code={`from connectonion import Agent, xray

@xray  # Tools with @xray become breakpoints
def search_emails(query: str):
    return api.search(query)

def send_email(to: str, body: str):
    return api.send(to, body)

agent = Agent(
    name="email_assistant",
    tools=[search_emails, send_email]
)

# Launch interactive debug session
agent.auto_debug()`}
            result={`🔍 Interactive Debug Session Started
Agent: email_assistant | Tools: 2

💡 Quick Tips:
  - Tools with @xray will pause for inspection
  - Use arrow keys to navigate menus
  - Press '?' anytime for help

Type your message to the agent:
> Send email to John

────────────────────────────────────────────────────

Iteration 1/10
→ LLM Request (o4-mini)
← LLM Response (234ms): 2 tool calls

→ Tool: search_emails({"query": "John"})
← Result (123ms): Found 1 email from john@company.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
@xray BREAKPOINT: search_emails

Local Variables:
  query = "John"
  result = "Found 1 email from john@company.com"

Context:
  User: "Send email to John"
  Iteration: 1/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What do you want to do?
  → Continue execution 🚀       [c or Enter]
    Edit values 🔍             [e]
    Quit debugging 🚫          [q]

💡 Coming soon (by Nov 2): Ask AI [a], View trace [v], Step mode [s]
>`}
            className="mb-8"
          />
        </section>

        {/* The Interactive Menu */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-500" />
            The Interactive Menu
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            At every <code className="bg-gray-100 px-2 py-1 rounded">@xray</code> breakpoint, you see this menu:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <pre className="text-gray-700 font-mono text-sm">
{`What do you want to do?
  → Continue execution 🚀       [c or Enter]
    Edit values 🔍             [e]
    Quit debugging 🚫          [q]

💡 Coming soon (by Nov 2): Ask AI [a], View trace [v], Step mode [s]
>`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Method 1: Arrow Keys (Beginner-friendly)</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600">↑ ↓</span>
                  <span>Move selection up and down</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600">Enter</span>
                  <span>Select highlighted option</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Method 2: Shortcuts (Power user)</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-green-700">c</code>
                  <span>Continue execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-green-700">e</code>
                  <span>Edit variables</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-green-700">q</code>
                  <span>Quit debugging</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-900">
              <strong>Both methods do exactly the same thing</strong> - use whichever feels natural!
            </p>
          </div>
        </section>

        {/* Available Features */}
        <section className="mb-20">
          <h2 className="heading-2">Available Features</h2>

          <div className="space-y-8">
            {/* Continue Execution */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HiOutlineCheck className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="heading-3">Continue Execution</h3>
                <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full font-medium"><HiOutlineCheck className="w-3.5 h-3.5 text-green-600" />Available</span>
              </div>

              <p className="text-gray-700 mb-6">
                The most common action - just press <code className="bg-gray-100 px-2 py-1 rounded">c</code> or <code className="bg-gray-100 px-2 py-1 rounded">Enter</code> to continue:
              </p>

              <CodeWithResult
                code={`What do you want to do?
  → Continue execution       [Enter or c]
    ...

> c`}
                result={`→ Execution resumes...
→ Tool: send_email(...)
✓ Complete`}
              />
            </div>

            {/* Edit Variables */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HiOutlineCodeBracket className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="heading-3">Edit Variables (Python REPL)</h3>
                <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full font-medium"><HiOutlineCheck className="w-3.5 h-3.5 text-green-600" />Available</span>
              </div>

              <p className="text-gray-700 mb-6">
                Modify variables to test "what if" scenarios. This is a full Python REPL with access to all variables:
              </p>

              <CodeWithResult
                code={`> e

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Python Editor - Modify variables to test scenarios
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available variables: query, result, tool_args

>>> result
'Found 1 email from john@company.com'

>>> # Test: What if we found 3 emails?
>>> result = ["email1@ex.com", "email2@ex.com", "email3@ex.com"]

>>> result
['email1@ex.com', 'email2@ex.com', 'email3@ex.com']`}
                result={`>>> # Test: What if we found no emails?
>>> result = []

>>> result
[]

>>> # Continue with modified value
>>> /continue

→ Resuming with modified variables...
✓ Complete`}
              />

              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  <strong>Test any scenario:</strong> Empty results, large datasets, error cases, edge cases - just modify the variables and see how your agent handles it!
                </p>
              </div>
            </div>

            {/* Coming Soon Features */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HiOutlineCpuChip className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="heading-3">Ask AI for Help</h3>
                <span className="text-sm bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-full">🚧 Coming Nov 2</span>
              </div>

              <p className="text-gray-700 mb-6">
                Get context-aware help from AI about what's happening. The AI knows your code, execution state, and history:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <pre className="text-gray-700 font-mono text-sm">
{`> a

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI Help Mode - Ask questions about execution
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ai> why did it only find 1 email?

🤖 AI: The search used query="John" which is broad.
The API might be limiting results, or there's actually
only 1 email from someone named John.

You can test with modified results to see how the
agent handles multiple emails.

ai> how can I test with more emails?

🤖 AI: Switch to Python mode and modify:
result = ["email1@ex.com", "email2@ex.com", "email3@ex.com"]

ai> /menu    [Back to menu]
ai> /continue [Resume execution]`}
                </pre>
              </div>
            </div>

            {/* View Trace */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HiOutlineChartBar className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="heading-3">View Execution Trace</h3>
                <span className="text-sm bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-full">🚧 Coming Nov 2</span>
              </div>

              <p className="text-gray-700 mb-6">
                See the complete execution history with timeline, messages, and agent state:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <pre className="text-gray-700 font-mono text-sm">
{`Timeline:
  [0] user_input: "Send email to John"
  [1] llm_call: 234ms → 2 tool calls requested
  [2] tool: search_emails ✓ 123ms ← YOU ARE HERE
  [3] (pending) tool: send_email

Total: 323ms • 2 steps • 1 iteration`}
                </pre>
              </div>
            </div>

            {/* Step Mode */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HiOutlineArrowPath className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="heading-3">Toggle Step Mode</h3>
                <span className="text-sm bg-gray-100 text-gray-500 border border-gray-200 px-3 py-1 rounded-full">🚧 Coming Nov 2</span>
              </div>

              <p className="text-gray-700 mb-6">
                Pause at <strong>EVERY tool</strong>, not just <code className="bg-gray-100 px-2 py-1 rounded">@xray</code> tools:
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 text-sm mb-4">Press <code className="bg-gray-100 px-2 py-1 rounded">s</code> in menu to enable:</p>
                <pre className="text-gray-700 font-mono text-sm">
{`✓ Step mode enabled - will pause at EVERY tool

→ Tool: validate_input(...)    [No @xray, but pauses!]
← Result: Valid
[BREAKPOINT]

→ Tool: fetch_data(...)
← Result: 50 records
[BREAKPOINT]`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Example */}
        <section className="mb-20">
          <h2 className="heading-2">Complete User Journey</h2>

          <p className="text-gray-700 mb-6 text-lg">
            Let's walk through a full debugging session:
          </p>

          <CodeWithResult
            code={`@xray
def search_products(query: str):
    return api.search(query)

def filter_results(products: list, criteria: dict):
    return [p for p in products if matches(p, criteria)]

def rank_by_popularity(products: list):
    return sorted(products, key=lambda p: p['sales'], reverse=True)

agent = Agent(
    name="shop_assistant",
    tools=[search_products, filter_results, rank_by_popularity]
)

agent.auto_debug()`}
            result={`Type your message to the agent:
> Find popular purple shoes under $100

────────────────────────────────────────────────────

→ Tool: search_products({"query": "purple shoes"})
← Result: Found 15 products

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
@xray BREAKPOINT: search_products

Local Variables:
  query = "purple shoes"
  result = [15 product objects]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What do you want to do?
  → Continue execution 🚀       [c or Enter]
    Edit values 🔍             [e]
    Quit debugging 🚫          [q]

> e    [Test empty result scenario]

>>> result = []    [What if no products found?]

>>> /continue

→ Tool: filter_results({"products": [], "criteria": ...})
← Result: []

→ Tool: rank_by_popularity({"products": []})
← Result: []

Agent: "Sorry, no purple shoes under $100 are available."

✓ Task complete - Agent handled empty results correctly!`}
            className="mb-8"
          />
        </section>

        {/* Best Practices */}
        <section className="mb-20">
          <h2 className="heading-2">Best Practices</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Strategic @xray Placement</h3>
              <p className="text-gray-700 mb-4">Add <code className="bg-gray-100 px-2 py-1 rounded">@xray</code> to:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 icon-ui mt-1" />
                  <span>API calls and database operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 icon-ui mt-1" />
                  <span>Complex business logic</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiOutlineCheck className="w-4 h-4 icon-ui mt-1" />
                  <span>Tools that often fail or have important side effects</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 text-sm">
                Skip simple utilities and pure functions. Or use step mode to see everything!
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Test Edge Cases in Python Mode</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
{`>>> # Empty results
>>> result = []

>>> # Large dataset
>>> result = [item for item in range(10000)]

>>> # Error responses
>>> result = {"error": "API timeout", "retry_after": 60}

>>> # Unicode/special characters
>>> result = {"name": "用户名", "emoji": "🎉"}`}
              </div>
              <p className="text-gray-700 mt-4 text-sm">
                <strong>Time-travel debugging:</strong> Change one variable, see entire agent behavior change.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Use Step Mode for Complex Workflows</h3>
              <p className="text-gray-700 mb-4">When you don't know which tool is causing problems:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
{`# Normal: Only @xray breakpoints
agent.auto_debug()

# Deep dive: See every tool
agent.auto_debug(step=True)

# Or toggle during session
> s    [Enable step mode]
> s    [Disable step mode]`}
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="mb-20">
          <h2 className="heading-2">When to Use</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-500/10 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <HiOutlineCheck className="w-5 h-5" />
                Perfect For
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✓</span>
                  <span>Development - Building and testing agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✓</span>
                  <span>Debugging - Finding unexpected behavior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✓</span>
                  <span>Learning - Understanding agent decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✓</span>
                  <span>Testing edge cases - "What if" scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✓</span>
                  <span>Prompt engineering - Discover what works</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-500 flex items-center gap-2">
                <HiOutlineExclamationTriangle className="w-5 h-5" />
                Not For
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✗</span>
                  <span>Production - Requires human interaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✗</span>
                  <span>Automated tests - Use assertions instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✗</span>
                  <span>CI/CD pipelines - Not non-interactive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">✗</span>
                  <span>Simple scripts - Overkill for basic tasks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="heading-2">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "How do I continue execution?",
                a: "Press 'c' or Enter from the menu, or type '/continue' from any mode."
              },
              {
                q: "What's the difference between @xray and step mode?",
                a: "@xray breakpoints pause only at marked tools (selective). Step mode pauses at EVERY tool (comprehensive)."
              },
              {
                q: "Can I still use agent.input() directly?",
                a: "Yes - .auto_debug() is optional. Use it only when you need interactive debugging."
              },
              {
                q: "Is this slow?",
                a: "No - execution speed is the same. Pausing only happens at breakpoints."
              },
              {
                q: "Works in Jupyter notebooks?",
                a: "Yes! Works in any Python environment with terminal support."
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-500 mb-2">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-300/30 text-center">
            <h2 className="heading-2">Ready to Debug Like a Pro?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Just call <code className="bg-gray-800 px-3 py-1.5 rounded">agent.auto_debug()</code> and explore!
            </p>
            <p className="text-gray-900 text-lg">
              The tips will guide you through - no memorization needed. 🔍
            </p>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
