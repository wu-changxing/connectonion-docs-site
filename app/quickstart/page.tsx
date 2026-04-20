/**
 * @purpose Quick Start guide page showing how to get started with ConnectOnion in 60 seconds
 * @context Main onboarding page for new users, linked from homepage and navigation
 * @llm-note Uses CommandBlock for terminal commands, CodeWithResult for examples,
 *           FileTree for project structure, includes navigation and copy functionality
 */
/*
  @date: 2025-01-01
  @description: Quick Start Guide Page
  
  DESIGN ISSUES TO FIX:
  
  1. **Navigation & Wayfinding** (Priority: HIGH)
     - Missing copy-all-content button that other pages should have
     - Breadcrumb navigation inconsistent with other pages
     - No previous/next page navigation at bottom
     - Fix: Add CopyMarkdownButton component, standardize breadcrumbs, add PageNavigation
  
  NAVIGATION INCONSISTENCY FOUND (2025-01-02):
  - This page uses PageNavigation component (imported line 47)
  - Shows automatic Previous/Next based on pageNavigation.ts config
  - Other pages like examples/* use custom navigation with "Previous/Next in series"
  - Inconsistent navigation patterns across the site
  
  2. **Content Structure** (Priority: HIGH)
     - Steps numbered manually instead of using consistent step components
     - Code blocks and results not using consistent CodeWithResult component
     - FileTree component cut off in preview (line 100)
     - Fix: Create reusable StepSection component, use CodeWithResult consistently
  
  3. **Visual Consistency** (Priority: MEDIUM)
     - Step numbers use different styling than other numbered content
     - Time estimate box uses different info box style than other pages
     - Inconsistent spacing between sections (mb-16 vs mb-12)
     - Fix: Standardize component styles, create InfoBox component
  
  4. **Progressive Disclosure** (Priority: MEDIUM)
     - All content shown at once - overwhelming for beginners
     - No indication of optional vs required steps
     - Missing "what you'll learn" overview
     - Fix: Add collapsible advanced sections, mark optional content, add learning objectives
  
  5. **Mobile Responsiveness** (Priority: LOW)
     - Horizontal padding too large on mobile (px-8)
     - CommandBlock components may overflow on small screens
     - Fix: Use responsive padding (px-4 md:px-8), ensure horizontal scroll for commands
*/

'use client'

import { useState } from 'react'
import { HiOutlinePlay, HiOutlineCommandLine, HiOutlineArrowRight, HiOutlineBolt, HiOutlineDocumentText, HiOutlineClock, HiOutlineCodeBracket, HiOutlineWrench, HiOutlineClipboard, HiOutlineCheck, HiOutlineBugAnt } from 'react-icons/hi2'
import { FaSearch, FaBullseye } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Link from 'next/link'
import { CommandBlock } from '../../components/CommandBlock'
import CodeWithResult from '../../components/CodeWithResult'
import { FileTree } from '../../components/FileTree'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function QuickStartPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Quick Start' }
          ]}
          icon={HiOutlinePlay}
          iconColor="icon-ui"
          title="Quick Start Guide"
          description="Get up and running with ConnectOnion in under 2 minutes."
          markdownPath="/quickstart/quickstart.md"
          markdownFilename="quickstart.md"
        />

        {/* Step Overview */}
        <div className="mb-12 border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
            <HiOutlineClock className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">7 steps · ~2 minutes</span>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { n: 1, label: 'Install ConnectOnion', href: '#install', time: '10s' },
              { n: 2, label: 'Create Your First Agent', href: '#create-agent', time: '20s' },
              { n: 3, label: 'Run Your Agent', href: '#run', time: '10s' },
              { n: 4, label: 'Customize Your Agent', href: '#customize', time: '5 min' },
              { n: 5, label: 'Playwright Web Automation', href: '#playwright', time: '5 min' },
              { n: 6, label: 'Create a Custom Tool Agent', href: '#custom-tool', time: '5 min' },
              { n: 7, label: 'Debugging with @xray', href: '#xray', time: '2 min' },
            ].map(({ n, label, href, time }) => (
              <a key={n} href={href} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:border-gray-400 group-hover:text-gray-700 transition-colors">{n}</span>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1 transition-colors">{label}</span>
                <span className="text-xs text-gray-500">{time}</span>
              </a>
            ))}
          </div>
        </div>

      {/* Installation */}
      <section className="mb-16 pt-4" id="install">
        <h2 id="install" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">1</span>
          Install ConnectOnion
        </h2>
        
        <CommandBlock 
          commands={['pip install connectonion']}
        />
      </section>

      {/* Create Agent */}
      <hr className="border-dashed border-gray-300 mb-16" />
      <section className="mb-16 pt-4" id="create-agent">
        <h2 id="create-agent" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">2</span>
          Create Your First Agent
        </h2>

        <p className="text-gray-600 mb-6">
          Create a new agent project with automatic setup:
        </p>

        <div className="mb-6">
          <CommandBlock
            commands={[
              'co create my-agent',
              'cd my-agent'
            ]}
          />
        </div>

        <FileTree
          structure={[
            {
              name: 'my-agent',
              type: 'folder',
              children: [
                { name: 'agent.py', type: 'file', comment: 'Ready-to-run agent with example tools', icon: 'python' },
                { name: '.env', type: 'file', comment: 'API keys (auto-configured)', icon: 'env' },
                { name: 'co-vibecoding-principles-docs-contexts-all-in-one.md', type: 'file', comment: 'Complete framework docs', icon: 'markdown' },
                { name: '.gitignore', type: 'file', comment: 'Git config', icon: 'git' },
                {
                  name: '.co',
                  type: 'folder',
                  comment: 'ConnectOnion config',
                  children: [
                    { name: 'host.yaml', type: 'file', icon: 'config' },
                    {
                      name: 'docs',
                      type: 'folder',
                      children: [
                        { name: 'co-vibecoding-principles-docs-contexts-all-in-one.md', type: 'file', icon: 'markdown' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]}
          className="mb-8"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">The CLI handles:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>API key setup</strong> - Automatic detection from environment or interactive input</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Project structure</strong> - All files created and configured</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Documentation</strong> - Complete framework docs included</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Git configuration</strong> - .gitignore ready for version control</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Run Your Agent */}
      <hr className="border-dashed border-gray-300 mb-16" />
      <section className="mb-16 pt-4" id="run">
        <h2 id="run" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">3</span>
          Run Your Agent
        </h2>

        <div className="mb-6">
          <CommandBlock
            commands={['python agent.py']}
          />
        </div>

        <p className="text-gray-600 mb-4">
          Your agent is ready to use! The minimal template includes example tools to get you started.
        </p>
      </section>

      {/* Customize */}
      <hr className="border-dashed border-gray-300 mb-16" />
      <section className="mb-16 pt-4" id="customize">
        <h2 id="customize" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">4</span>
          Customize Your Agent
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your meta-agent can help you build ConnectOnion projects:
        </p>

        <div className="space-y-6">
          {/* Learn about ConnectOnion */}
          <CodeWithResult 
            code={`# Learn about ConnectOnion
result = agent.input("What is ConnectOnion and how do tools work?")
print(result)`}
            result={`>>> result = agent.input("What is ConnectOnion and how do tools work?")
>>> print(result)
ConnectOnion is a Python framework for building AI agents with a focus on simplicity.
Here's how it works:

1. **Agent Creation**: Create agents with a name, tools, and optional system prompt
2. **Tools**: Functions that agents can call. Any Python function can be a tool!
3. **Automatic Schema Generation**: Type hints are converted to OpenAI function schemas
4. **Iteration Control**: Use max_iterations to prevent infinite loops
5. **Built-in Logging**: All agent interactions are automatically logged to \`.co/logs/\`

Tools work by:
- Converting Python functions to OpenAI-compatible schemas
- The agent decides when to call tools based on the task
- Tool results are fed back to the agent for further processing
- Multiple tools can be called in sequence to complete complex tasks`}
            className="mb-4"
          />

          {/* Generate agent code */}
          <CodeWithResult 
            code={`# Generate agent code
result = agent.input("Create a web scraper agent")
print(result[:500] + "...")  # Show first 500 chars`}
            result={`>>> result = agent.input("Create a web scraper agent")
>>> print(result[:500] + "...")
Here's a complete web scraper agent using ConnectOnion:

\`\`\`python
from connectonion import Agent
import requests
from bs4 import BeautifulSoup

def scrape_url(url: str) -> str:
    """Scrape content from a URL."""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup.get_text()[:1000]

def extract_links(url: str) -> list[str]:
    """Extract all links from a webpage."""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return [a['href'] for a in soup.find_all('a', href=True)]...`}
            className="mb-4"
          />

          {/* Create tool functions */}
          <CodeWithResult 
            code={`# Create tool functions
result = agent.input("Generate a tool for sending emails")
print(result)`}
            result={`>>> result = agent.input("Generate a tool for sending emails")
>>> print(result)
Here's an email sending tool for your agent:

\`\`\`python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to: str, subject: str, body: str, from_email: str = "agent@example.com") -> str:
    """Send an email to the specified recipient.
    
    Args:
        to: Recipient email address
        subject: Email subject line
        body: Email body content
        from_email: Sender email address
        
    Returns:
        Status message indicating success or failure
    """
    try:
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        
        # Configure your SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(from_email, 'your_app_password')
        server.send_message(msg)
        server.quit()
        
        return f"Email sent successfully to {to}"
    except Exception as e:
        return f"Failed to send email: {str(e)}"
\`\`\`

Usage: agent = Agent("mailer", tools=[send_email])`}
            className="mb-4"
          />
        </div>
      </section>

      {/* Going Further divider */}
      <div className="my-16 flex items-center gap-4">
        <div className="flex-1 border-t border-dashed border-gray-200" />
        <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Going Further</span>
        </div>
        <div className="flex-1 border-t border-dashed border-gray-200" />
      </div>
      <p className="text-sm text-gray-500 mb-12 -mt-8 text-center">
        Steps 5–7 are optional specialization paths — pick what matches your use case.
      </p>

      {/* Playwright Template */}
      <section className="mb-16 pt-4" id="playwright">
        <h2 id="playwright" className="heading-2 flex items-center gap-3 mb-5">
          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-mono rounded border border-gray-200 flex-shrink-0">alt</span>
          Playwright Web Automation
        </h2>

        <p className="text-gray-600 mb-6">
          For web automation tasks, use the Playwright template:
        </p>

        <div className="mb-6">
          <CommandBlock
            commands={[
              'co create my-browser-bot --template playwright',
              'cd my-browser-bot'
            ]}
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stateful browser tools included:</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>start_browser()</strong> - Launch browser</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>navigate()</strong> - Go to URLs</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>scrape_content()</strong> - Extract content</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>fill_form()</strong> - Complete forms</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>take_screenshot()</strong> - Capture pages</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>extract_links()</strong> - Get all links</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>click()</strong> - Click elements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>execute_javascript()</strong> - Run JS</span>
            </div>
          </div>
          <p className="text-gray-700 mt-4 text-sm">
            <strong>Note:</strong> Requires <code className="bg-gray-100 px-2 py-1 rounded font-mono">pip install playwright && playwright install</code>
          </p>
        </div>
      </section>

      {/* Custom Tool Example */}
      <hr className="border-dashed border-gray-300 mb-16" />
      <section className="mb-16 pt-4" id="custom-tool">
        <h2 id="custom-tool" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">5</span>
          Create a Custom Tool Agent
        </h2>
        
        <p className="text-gray-600 mb-6">
          You can also create agents from scratch with custom tools:
        </p>

        <CodeWithResult 
          code={`from connectonion import Agent

def calculate(expression: str) -> str:
    """Safely evaluate mathematical expressions."""
    try:
        allowed_chars = set('0123456789+-*/()., ')
        if all(c in allowed_chars for c in expression):
            result = eval(expression)
            return f"Result: {result}"
        else:
            return "Error: Invalid characters"
    except Exception as e:
        return f"Error: {str(e)}"

# Create agent with the tool
agent = Agent(
    name="calculator", 
    tools=[calculate],
    system_prompt="You are a helpful math tutor.",
    max_iterations=5  # Simple calculations need few iterations
)

# Use the agent
response = agent.input("What is 42 * 17 + 25?")
print(response)`}
          result={`Let me calculate that for you.

42 * 17 = 714
714 + 25 = 739

The answer is 739.`}
          className="mb-8"
        />

      </section>

      {/* Debugging with @xray */}
      <hr className="border-dashed border-gray-300 mb-16" />
      <section className="mb-16 pt-4" id="xray">
        <h2 id="xray" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">6</span>
          Debugging with @xray
        </h2>

        <p className="text-gray-600 mb-6">
          Use the @xray decorator to see what your agent is thinking:
        </p>

        <CodeWithResult
          code={`from connectonion import Agent
from connectonion import xray

@xray
def calculate(expression: str) -> str:
    """Math tool with debugging enabled."""
    print(f"[SEARCH] Agent '{xray.agent.name}' is calculating: {expression}")
    print(f"[SEARCH] User's original request: {xray.task}")
    print(f"[SEARCH] This is iteration #{xray.iteration}"

    result = eval(expression)
    return f"Result: {result}"

agent = Agent("debug_calc", tools=[calculate], max_iterations=5)
response = agent.input("What's 50 + 30?")
print(response)`}
          result={`[SEARCH] Agent 'debug_calc' is calculating: 50 + 30
[SEARCH] User's original request: What's 50 + 30?
[SEARCH] This is iteration #1
Result: 80

The result is 80.`}
          className="mb-8"
        />
      </section>

      <hr className="border-dashed border-gray-300 mb-16" />
      {/* Interactive Debugging */}
      <section className="mb-16 pt-4" id="interactive-debug">
        <h2 id="interactive-debug" className="heading-2 flex items-center gap-3 mb-5">
          <span className="w-8 h-8 bg-white border-2 border-gray-900 rounded-lg flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">7</span>
          Interactive Debugging
        </h2>

        <p className="text-gray-600 mb-6">
          Debug your agents interactively - pause at breakpoints, inspect state, and test "what if" scenarios:
        </p>

        <CodeWithResult
          code={`from connectonion import Agent, xray

@xray  # Breakpoint: pause here for inspection
def search_database(query: str) -> str:
    results = db.search(query)
    return f"Found {len(results)} results"

agent = Agent(
    name="search_bot",
    tools=[search_database],
    system_prompt="You are a helpful search assistant"
)

# Launch interactive debug session
agent.auto_debug()`}
          result={`🔍 Interactive Debug Session Started
Agent: search_bot | Tools: 1

💡 Quick Tips:
  - Tools with @xray will pause for inspection
  - Use arrow keys to navigate menus
  - Press 'c' to continue

Type your message to the agent:
> Find recent Python tutorials

→ Tool: search_database({"query": "Python tutorials"})
← Result: Found 5 results

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
@xray BREAKPOINT: search_database

Local Variables:
  query = "Python tutorials"
  result = "Found 5 results"

What do you want to do?
  → Continue execution 🚀       [c or Enter]
    Edit values 🔍             [e]  ← Test "what if" scenarios
    Quit debugging 🚫          [q]

> c

✓ Task complete`}
          className="mb-8"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why use interactive debugging?</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Pause at breakpoints</strong> - Inspect state at any tool</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Test edge cases</strong> - Modify variables to explore "what if"</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Python REPL access</strong> - Full runtime inspection</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-400 mt-1">•</span>
              <span><strong>Step through execution</strong> - See every tool call</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/auto-debug"
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              Learn more about interactive debugging
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <hr className="border-dashed border-gray-300 mb-16" />
      <section className="mb-16 pt-4" id="whats-next">
        <h2 id="whats-next" className="heading-2 flex items-center gap-3 mb-5">
          <FaBullseye className="text-gray-400 flex-shrink-0" />
          <span>What's Next?</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="/auto-debug"
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <HiOutlineBugAnt className="w-6 h-6 text-gray-700" />
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Interactive Debugging</h3>
            <p className="text-gray-500 text-sm">
              Master breakpoints, Python REPL, and "what if" scenario testing for your agents.
            </p>
          </Link>

          <Link
            href="/prompts"
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <HiOutlineDocumentText className="w-6 h-6 text-gray-700" />
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Master System Prompts</h3>
            <p className="text-gray-500 text-sm">
              Learn advanced prompting techniques to create expert agents for any domain.
            </p>
          </Link>

          <Link
            href="/xray"
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <HiOutlineBolt className="w-6 h-6 text-gray-700" />
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Deep Dive into @xray</h3>
            <p className="text-gray-500 text-sm">
              Master debugging and get complete visibility into your agent's decision-making.
            </p>
          </Link>

          <Link
            href="/examples"
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <HiOutlineCodeBracket className="w-6 h-6 text-gray-700" />
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Real-World Examples</h3>
            <p className="text-gray-500 text-sm">
              See complete agent implementations for various use cases.
            </p>
          </Link>

          <Link
            href="/tools"
            className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <HiOutlineWrench className="w-6 h-6 text-gray-700" />
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Build Custom Tools</h3>
            <p className="text-gray-500 text-sm">
              Learn how to create powerful tools for your agents.
            </p>
          </Link>
        </div>
      </section>

      {/* Unified Navigation */}
      <ContentNavigation />
      </div>
    </div>
  )
}
