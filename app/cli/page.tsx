/*
  @date: 2025-01-01
  @description: CLI Reference Page
  
  DESIGN ISSUES TO FIX:
  
  1. **Command Documentation Structure** (Priority: HIGH)
     - Commands shown without clear syntax patterns
     - Missing required vs optional parameter indicators
     - No command output examples shown
     - Fix: Add syntax diagrams, use [optional] notation, show example outputs
  
  2. **Missing Copy Button** (Priority: HIGH)
     - No copy-all-content button as required by CLAUDE.md
     - Individual command blocks lack context when copied
     - Fix: Add CopyMarkdownButton, ensure commands copy with descriptions
  
  3. **Visual Hierarchy** (Priority: MEDIUM)
     - All commands look equally important
     - No quick command reference card
     - Missing "most used commands" section
     - Fix: Highlight primary commands, add command cheat sheet, group by frequency
  
  4. **Navigation Issues** (Priority: MEDIUM)
     - Long page with no table of contents
     - No anchor links to specific commands
     - Missing search functionality
     - Fix: Add sticky TOC, implement command search, add deep linking
  
  5. **Template Examples** (Priority: LOW)
     - Template options not visually differentiated
     - Missing preview of what each template creates
     - No comparison table of templates
     - Fix: Add template preview cards, create comparison matrix, show file structure
  
  NAVIGATION INCONSISTENCY FOUND (2025-01-02):
  - Uses PageNavigation component (line 46) for automatic Previous/Next
  - Has breadcrumb navigation at top
  - Has CopyMarkdownButton component
  - Consistent with main docs but different from examples/* pages
  - Shows proper integration of standard navigation components
*/

'use client'

import { useState } from 'react'
import { HiOutlineClipboard, HiOutlineCheck, HiOutlineCommandLine, HiOutlineArrowRight, HiOutlineDocumentText, HiOutlineCube, HiOutlineCodeBracket, HiOutlineExclamationCircle, HiOutlineBolt, HiOutlineBookOpen, HiOutlineChevronRight, HiOutlineKey, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineFolderOpen, HiOutlineExclamationTriangle, HiOutlineCheckCircle, HiOutlineEnvelope } from 'react-icons/hi2'
import { FaLightbulb, FaBolt } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Link from 'next/link'
import { CommandBlock } from '../../components/CommandBlock'
import { FileTree } from '../../components/FileTree'
import { ContentNavigation } from '../../components/ContentNavigation'
import { PageHeader } from '../../components/PageHeader'

export default function CLIPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }


  return (
    <div className="px-4 md:px-8 py-16 md:py-24 doc-content--reference">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'CLI Reference' }
          ]}
          icon={HiOutlineCommandLine}
          iconColor="icon-ui"
          title="CLI Reference"
          description="Quickly scaffold and manage ConnectOnion agent projects with the CLI."
        />
      
      {/* Quick Command Cheat Sheet — tiered by daily use */}
      <div className="mb-12 border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
          <HiOutlineBookOpen className="w-4 h-4 icon-ui" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Command Reference</span>
        </div>
        {/* Daily use — bold */}
        <div className="border-b border-gray-100">
          <div className="px-4 py-2 bg-white">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Daily Use</span>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { cmd: 'co ai', desc: 'AI coding agent in your terminal', href: '#co-ai' },
              { cmd: 'co browser', desc: 'Screenshots, scraping & automation', href: '#co-browser' },
              { cmd: 'co outlook', desc: 'Send and read Outlook email', href: '#co-outlook' },
            ].map(({ cmd, desc, href }) => (
              <a key={cmd} href={href} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group">
                <code className="font-mono text-sm font-semibold text-gray-900 w-32 flex-shrink-0 group-hover:text-gray-700">{cmd}</code>
                <span className="text-sm text-gray-600 flex-1">{desc}</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
        {/* Setup — medium weight */}
        <div className="border-b border-gray-100">
          <div className="px-4 py-2 bg-white">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project Setup</span>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { cmd: 'co create [name]', desc: 'Scaffold a new agent project', href: '#co-create' },
              { cmd: 'co init', desc: 'Add ConnectOnion to current directory', href: '#co-init' },
              { cmd: 'co auth', desc: 'Get managed keys + $5 free credits', href: '#co-auth' },
            ].map(({ cmd, desc, href }) => (
              <a key={cmd} href={href} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group">
                <code className="font-mono text-sm text-gray-700 w-32 flex-shrink-0">{cmd}</code>
                <span className="text-sm text-gray-600 flex-1">{desc}</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
        {/* Utility — muted */}
        <div>
          <div className="px-4 py-2 bg-white">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Utilities</span>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { cmd: 'co status', desc: 'Check balance and deployments', href: '#co-status' },
              { cmd: 'co deploy', desc: 'Deploy agent to cloud', href: '#co-deploy' },
              { cmd: 'co doctor', desc: 'Diagnose config issues', href: '#co-doctor' },
              { cmd: 'co reset', desc: 'Reset account', href: '#co-reset' },
            ].map(({ cmd, desc, href }) => (
              <a key={cmd} href={href} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group">
                <code className="font-mono text-sm text-gray-500 w-32 flex-shrink-0">{cmd}</code>
                <span className="text-sm text-gray-500 flex-1">{desc}</span>
                <HiOutlineArrowRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-gray-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Installation */}
      <section className="mb-16">
        <h2 className="heading-2">
          <HiOutlineCube className="w-6 h-6 icon-ui" />
          Installation
        </h2>
        
        <p className="text-gray-700 mb-6">
          The CLI is automatically installed when you install ConnectOnion:
        </p>

        <CommandBlock 
          commands={['pip install connectonion']}
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
          <p className="text-gray-700">
            This provides two equivalent commands: <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co</code> (short form)
            and <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">connectonion</code> (full form)
          </p>
        </div>
      </section>

      {/* Commands Overview */}
      <section className="mb-16">
        <h2 className="heading-2">
          <HiOutlineCommandLine className="w-6 h-6 icon-ui" />
          Commands Overview
        </h2>

        <p className="text-gray-700 mb-6">
          ConnectOnion provides two main commands for project creation:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineSparkles className="w-5 h-5 icon-ui" />
              <h3 className="text-sm font-bold font-mono text-gray-900">co create [name]</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Creates a new project directory with all necessary files
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <HiOutlineFolderOpen className="w-5 h-5 text-gray-500" />
              <h3 className="text-sm font-bold font-mono text-gray-900">co init</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Initializes the current directory as a ConnectOnion project
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 mb-4">Both commands share the same interactive flow:</p>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700">1</span>
              <span>AI feature toggle (Yes/No)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700">2</span>
              <span>API key input (with auto-detection)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700">3</span>
              <span>Template selection</span>
            </li>
          </ol>
        </div>
      </section>

      {/* co create Command */}
      <section className="mb-16" id="co-create">
        <h2 className="heading-2">
          <HiOutlineSparkles className="w-6 h-6 icon-ui" />
          co create [name]
        </h2>
        
        <p className="text-gray-700 mb-6">
          Create a new ConnectOnion project in a new directory.
        </p>

        {/* Basic Usage */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Usage</h3>
          
          <div className="space-y-4">
            <CommandBlock 
              title="Interactive mode (prompts for project name)"
              commands={['co create']}
            />

            <CommandBlock 
              title="With project name (skips name prompt)"
              commands={['co create my-agent']}
            />

            <CommandBlock 
              title="With all options (no interaction)"
              commands={['co create my-agent --ai --key sk-proj-xxx --template minimal']}
            />
          </div>
        </div>

        {/* Options Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Option</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">[name]</td>
                  <td className="px-4 py-3 text-gray-700">Optional project name (creates directory)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">--ai/--no-ai</td>
                  <td className="px-4 py-3 text-gray-700">Enable or disable AI features</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">--key</td>
                  <td className="px-4 py-3 text-gray-700">API key for AI provider (auto-detects provider)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">--template</td>
                  <td className="px-4 py-3 text-gray-700">
                    Choose template: <code className="bg-gray-100 px-2 py-1 rounded text-xs">minimal</code>,
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">playwright</code>,
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">coder</code>,
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">co-ai</code>,
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">web-research</code>,
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">custom</code>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">--description</td>
                  <td className="px-4 py-3 text-gray-700">Description for custom template (requires AI)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-sm text-gray-700">--yes, -y</td>
                  <td className="px-4 py-3 text-gray-700">Skip all prompts, use defaults</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Flow Example */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Flow Example</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <div className="flex items-center justify-between bg-gray-100 px-4 py-3 border-b border-gray-200">
              <span className="text-sm text-gray-700 font-mono">Terminal Output</span>
            </div>
            <div className="p-6">
              <pre className="text-sm text-gray-700 font-mono">
{`$ co create

✔ Project name: … my-agent
✔ Enable AI features? (Y/n) … Y
✔ Paste your API key (or Enter to skip): … sk-proj-abc123
  ✓ Detected OpenAI API key
✔ Choose a template:
  ❯ Minimal - Simple starting point
    Playwright - Browser automation
    Email Agent - Email tools & OAuth
    Meta Agent - Agent that builds agents
    Web Research - Data analysis & web scraping
    Custom - AI generates based on your needs

✅ Created 'my-agent' with Minimal template

Next steps:
  cd my-agent
  python agent.py`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* co init Command */}
      <section className="mb-16" id="co-init">
        <h2 className="heading-2">
          <HiOutlineFolderOpen className="w-6 h-6 text-gray-500" />
          co init
        </h2>
        
        <p className="text-gray-700 mb-6">
          Initialize a ConnectOnion project in the current directory.
        </p>

        {/* Basic Usage */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Usage</h3>
          
          <div className="space-y-4">
            <CommandBlock 
              title="Initialize current directory interactively"
              commands={['co init']}
            />

            <CommandBlock 
              title="Skip prompts with options"
              commands={['co init --no-ai --template minimal']}
            />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-800">
            <strong>Note:</strong> Options are the same as <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co create</code>,
            except no <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">[name]</code> parameter (uses current directory name).
          </p>
        </div>
      </section>

      {/* co auth Command */}
      <section className="mb-16" id="co-auth">
        <h2 className="heading-2">
          <HiOutlineKey className="w-6 h-6 text-gray-400" />
          co auth
        </h2>

        <p className="text-gray-700 mb-6">
          Authenticate for managed LLM keys with free credits included.
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Usage</h3>
          <CommandBlock commands={['co auth']} />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What It Does</h3>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700 font-semibold">1</span>
              <span>Signs message with your Ed25519 key</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700 font-semibold">2</span>
              <span>Authenticates with OpenOnion backend</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-xs text-gray-700 font-semibold">3</span>
              <span>Saves <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">OPENONION_API_KEY</code> to <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">~/.co/keys.env</code></span>
            </li>
          </ol>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Using Managed Keys</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700">
{`from connectonion import llm_do

# Use co/ prefix for managed models
response = llm_do("Hello", model="co/gpt-5")
response = llm_do("Hello", model="co/claude-sonnet-4-5")
response = llm_do("Hello", model="co/gemini-2.5-pro")`}
          </div>
        </div>
      </section>

      {/* co status Command */}
      <section className="mb-16" id="co-status">
        <h2 className="heading-2">
          <HiOutlineDocumentText className="w-6 h-6 icon-ui" />
          co status
        </h2>

        <p className="text-gray-700 mb-6">
          Check your account balance, managed keys usage, and deployed agents.
        </p>

        <CommandBlock commands={['co status']} />

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Output</h3>
          <pre className="text-sm text-gray-700 font-mono">
{`ConnectOnion Account Status
============================

Address:  0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a
Email:    0x7a9f3b2c@mail.openonion.ai
Balance:  $5.00

Deployed Agents
Project       Status    Active  Container  URL
co-ai-agent   running   yes     running    https://co-ai-agent-0x....agents.openonion.ai`}
          </pre>
        </div>
      </section>

      {/* co reset Command */}
      <section className="mb-16" id="co-reset">
        <h2 className="heading-2">
          <HiOutlineExclamationCircle className="w-6 h-6 text-red-400" />
          co reset
        </h2>

        <p className="text-gray-700 mb-6">
          <strong className="text-red-500 inline-flex items-center gap-1"><HiOutlineExclamationTriangle className="w-4 h-4 flex-shrink-0" />Destructive:</strong> Reset your account and create a new identity.
        </p>

        <CommandBlock commands={['co reset']} />

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What It Does</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 text-red-400 mt-1" />
              <span>Deletes your account data</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 text-red-400 mt-1" />
              <span>Clears balance and usage history</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 text-red-400 mt-1" />
              <span>Creates new account with new keys</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 text-red-400 mt-1" />
              <span>Generates new address and email</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Output</h3>
          <pre className="text-sm text-gray-700 font-mono">
{`$ co reset

⚠️  WARNING: This will delete ALL your data
Including:
  - Account balance
  - Usage history
  - Current identity

Continue? (y/N): y

✓ Account reset
✓ New identity created
✓ New address: 0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0`}
          </pre>
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 text-sm">
            <strong>When to use:</strong> Starting completely fresh, testing account creation, or removing old identity.
          </p>
        </div>
      </section>

      {/* co deploy Command */}
      <section className="mb-16" id="co-deploy">
        <h2 className="heading-2">
          <HiOutlineCube className="w-6 h-6 icon-ui" />
          co deploy
        </h2>

        <p className="text-gray-700 mb-6">
          Deploy your agent to ConnectOnion Cloud.
        </p>

        <CommandBlock commands={['co deploy']} />

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 icon-ui mt-1" />
              <span>Initialized ConnectOnion project</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 text-emerald-400 mt-1" />
              <span><code className="bg-black/30 px-2 py-1 rounded">.co/host.yaml</code> (created by <code className="bg-black/30 px-2 py-1 rounded">co create</code> or <code className="bg-black/30 px-2 py-1 rounded">co init</code>)</span>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineChevronRight className="w-4 h-4 icon-ui mt-1" />
              <span>Authenticated (<code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co auth</code>)</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Output</h3>
          <pre className="text-sm text-gray-700 font-mono">
{`$ co deploy

Deploying to ConnectOnion Cloud...

  Project: my-agent
  Source: /Users/me/my-agent
  Package: 12.3 KB (8 files)
  Env: /Users/me/my-agent/.env (3 keys)

Uploading package to https://oo.openonion.ai...
Deployment: a1b2c3d4
Building container on ConnectOnion Cloud...
  [1/100] status: deploying
  [2/100] status: running

Deployed!
Agent URL: https://my-agent-0x7a9f3b2c.agents.openonion.ai
Dashboard: https://o.openonion.ai/dashboard`}
          </pre>
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 text-sm">
            <strong>Beta:</strong> This feature is in beta. See the <Link href="/deploy" className="underline hover:text-gray-900">Deploy Guide</Link> for more details.
          </p>
        </div>
      </section>

      {/* co doctor Command */}
      <section className="mb-16" id="co-doctor">
        <h2 className="heading-2">
          <HiOutlineExclamationCircle className="w-6 h-6 icon-ui" />
          co doctor
        </h2>

        <p className="text-gray-700 mb-6">
          Comprehensive diagnostics for your ConnectOnion installation.
        </p>

        <CommandBlock commands={['co doctor']} />

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What It Checks</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">System</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Version</li>
                <li>• Python</li>
                <li>• Environment</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Configuration</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Config files</li>
                <li>• Keys</li>
                <li>• API keys</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Connectivity</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Backend</li>
                <li>• Authentication</li>
                <li>• Network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* co ai Command */}
      <section className="mb-16" id="co-ai">
        <h2 className="heading-2">
          <HiOutlineSparkles className="w-6 h-6 text-gray-500" />
          co ai
        </h2>

        <p className="text-gray-700 mb-6">
          AI coding agent in your terminal. Run one-shot prompts or start an interactive agent with full tool access.
        </p>

        <div className="space-y-4 mb-6">
          <CommandBlock
            title="One-shot mode - quick code generation"
            commands={['co ai "create a FastAPI hello world app"']}
          />

          <CommandBlock
            title="Interactive mode - multi-turn conversation"
            commands={['co ai']}
          />

          <CommandBlock
            title="Web server mode - browser interface"
            commands={['co ai --port 8000']}
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-800">
            <strong>Learn more:</strong> See the complete{' '}
            <Link href="/cli/ai" className="text-gray-400 hover:text-gray-900 underline">
              co ai documentation
            </Link>{' '}
            for advanced features, model selection, and use cases.
          </p>
        </div>
      </section>

      {/* Browser Features */}
      <section className="mb-16" id="co-browser">
        <h2 className="heading-2">
          <HiOutlineBolt className="w-6 h-6 text-gray-400" />
          co browser
        </h2>

        <p className="text-gray-700 mb-6">
          Quick browser screenshots and automation. Use <code className="bg-gray-100 px-2 py-1 rounded">-b</code> (short for browser) or the full <code className="bg-gray-100 px-2 py-1 rounded">browser</code> subcommand:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold inline-flex items-center gap-1">
              <FaLightbulb className="text-gray-400 text-sm" />
              <span>Tip:</span>
            </span> <code className="bg-gray-50 px-1 rounded">co -b</code> is short for <code className="bg-gray-50 px-1 rounded">co browser</code>. Both syntaxes work the same way!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <CommandBlock 
            title="Take a screenshot (using -b shorthand)"
            commands={['co -b "screenshot example.com save to screenshot.png"']}
          />

          <CommandBlock 
            title="Same command using full syntax"
            commands={['co browser "screenshot example.com save to screenshot.png"']}
          />

          <CommandBlock 
            title="Screenshot with device preset"
            commands={['co -b "screenshot example.com save to mobile.png size iPhone"']}
          />
        </div>

        {/* Device Presets */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Presets</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-900">iPhone</span>
              <p className="text-gray-700">390×844</p>
            </div>
            <div>
              <span className="font-semibold text-gray-900">iPad</span>
              <p className="text-gray-700">768×1024</p>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Desktop</span>
              <p className="text-gray-700">1920×1080 (default)</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700">
            <strong>Learn more:</strong> See the complete{' '}
            <Link href="/cli/browser-command" className="text-gray-700 hover:text-gray-900 underline">
              co browser documentation
            </Link>{' '}
            for URL handling, framework examples, and advanced usage.
          </p>
        </div>
      </section>

      {/* Outlook Email */}
      <section className="mb-16" id="co-outlook">
        <h2 className="heading-2">
          <HiOutlineEnvelope className="w-6 h-6 text-gray-400" />
          co outlook
        </h2>

        <p className="text-gray-700 mb-6">
          Send, read, and search email from your Outlook account — straight from the terminal.
          Connect your Microsoft account once with <code className="bg-gray-100 px-2 py-1 rounded">co auth microsoft</code>, then:
        </p>

        <div className="space-y-4 mb-8">
          <CommandBlock
            title="Show your inbox (numbered table)"
            commands={['co outlook']}
          />

          <CommandBlock
            title="Read email #3 from the last listing (marks it read)"
            commands={['co outlook read 3']}
          />

          <CommandBlock
            title="Send an email"
            commands={['co outlook send alice@example.com "Quarterly report" "Draft attached, feedback welcome."']}
          />

          <CommandBlock
            title="Attach files and CC someone (repeat --attach for multiple)"
            commands={['co outlook send alice@example.com "Screenshots" "See attached" --cc bob@example.com --attach shot1.png --attach shot2.png']}
          />

          <CommandBlock
            title="Schedule delivery: +30m, +2h, or a UTC ISO time"
            commands={['co outlook send alice@example.com "Reminder" "Standup in 30" --at +30m']}
          />

          <CommandBlock
            title="Pipe a body from stdin with message '-'"
            commands={['git log --oneline -10 | co outlook send alice@example.com "This week" -']}
          />

          <CommandBlock
            title="Sent mail and search"
            commands={['co outlook sent', 'co outlook search "invoice"']}
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold inline-flex items-center gap-1">
              <FaLightbulb className="text-gray-400 text-sm" />
              <span>Tip:</span>
            </span> Scheduled sends (<code className="bg-gray-50 px-1 rounded">--at</code>) use Exchange deferred delivery — the email waits server-side, so your machine can go offline. Attachments go through Microsoft Graph, which caps the total at about 3 MB.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700">
            <strong>Learn more:</strong> See the{' '}
            <Link href="/outlook" className="text-gray-700 hover:text-gray-900 underline">
              Outlook documentation
            </Link>{' '}
            for the agent tool, all CLI options, and troubleshooting.
          </p>
        </div>
      </section>

      {/* Templates */}
      <section className="mb-16">
        <h2 className="heading-2">
          <HiOutlineCodeBracket className="w-6 h-6 text-gray-500" />
          Templates
        </h2>

        <div className="space-y-6">
          {/* Minimal Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Minimal
            </h3>
            <p className="text-gray-700 mb-4">
              Basic agent structure with essential components:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 icon-ui" />
                Simple agent.py with basic tools
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 icon-ui" />
                Minimal dependencies
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 icon-ui" />
                Quick start configuration
              </li>
            </ul>
          </div>

          {/* Web Research Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Web Research
            </h3>
            <p className="text-gray-700 mb-4">
              Advanced template for data analysis and web scraping:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Web scraping tools
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Data extraction utilities
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Browser automation support
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                API integration examples
              </li>
            </ul>
          </div>

          {/* Playwright Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Playwright
            </h3>
            <p className="text-gray-700 mb-4">
              Browser automation agent with stateful web tools:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Stateful browser (start, navigate, click, fill)
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Screenshot capture with device presets
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Content scraping and link extraction
              </li>
            </ul>
          </div>

          {/* Email Agent Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Email Agent
            </h3>
            <p className="text-gray-700 mb-4">
              Email automation with send, receive, and management:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-500" />
                SMTP sending and IMAP reading
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-500" />
                Gmail and Outlook OAuth integration
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-500" />
                Email filtering and management tools
              </li>
            </ul>
          </div>

          {/* Meta Agent Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Meta Agent
            </h3>
            <p className="text-gray-700 mb-4">
              An agent that knows ConnectOnion and helps you build agents:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Built-in framework knowledge
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Generates agent code from descriptions
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-400" />
                Includes complete docs context
              </li>
            </ul>
          </div>

          {/* Custom Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              Custom (AI-only)
            </h3>
            <p className="text-gray-700 mb-4">
              Only available when AI is enabled. Generates a complete custom template based on your description:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <pre className="text-sm text-gray-700 font-mono">
{`✔ Choose template: Custom
✔ Describe what you want to build: …
  I need an agent that monitors GitHub repos and
  sends notifications for new issues

Generating custom template with AI...
✅ Created custom GitHub monitoring agent`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Key Detection */}
      <section className="mb-16">
        <h2 className="heading-2">
          <HiOutlineKey className="w-6 h-6 text-gray-400" />
          API Key Detection
        </h2>

        <p className="text-gray-700 mb-6">
          The CLI automatically detects your API provider from the key format:
        </p>

        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Provider</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Key Format</th>
                <th className="text-left px-4 py-3 text-gray-700 font-medium">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-gray-900 font-medium">OpenAI</td>
                <td className="px-4 py-3 font-mono text-sm text-gray-700">sk-... or sk-proj-...</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">sk-proj-abc123...</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900 font-medium">Anthropic</td>
                <td className="px-4 py-3 font-mono text-sm text-gray-700">sk-ant-...</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">sk-ant-api03-xyz...</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900 font-medium">Google</td>
                <td className="px-4 py-3 font-mono text-sm text-gray-700">AIza...</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">AIzaSyAbc123...</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-900 font-medium">Groq</td>
                <td className="px-4 py-3 font-mono text-sm text-gray-700">gsk_...</td>
                <td className="px-4 py-3 font-mono text-xs text-gray-700">gsk_abc123...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
          <p className="text-gray-700 text-sm">
            The appropriate environment variables and model configurations are set automatically.
          </p>
        </div>
      </section>

      {/* What Gets Created */}
      <section className="mb-16">
        <h2 className="heading-2">
          <HiOutlineDocumentText className="w-6 h-6 icon-ui" />
          What Gets Created
        </h2>

        {/* Project Structure */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Structure</h3>
          
          <FileTree 
            structure={[
              {
                name: 'my-agent',
                type: 'folder',
                children: [
                  { name: 'agent.py', type: 'file', icon: 'python', comment: 'Main agent implementation' },
                  { 
                    name: 'tools',
                    type: 'folder',
                    comment: 'Custom tools directory',
                    children: []
                  },
                  { 
                    name: 'prompts',
                    type: 'folder',
                    comment: 'System prompts (AI-enabled)',
                    children: []
                  },
                  { name: '.env', type: 'file', icon: 'env', comment: 'Environment configuration' },
                  { 
                    name: '.co',
                    type: 'folder',
                    comment: 'ConnectOnion metadata',
                    children: [
                      { name: 'host.yaml', type: 'file', icon: 'config', comment: 'Project configuration' },
                      {
                        name: 'keys',
                        type: 'folder',
                        comment: 'Agent cryptographic keys',
                        children: [
                          { name: 'agent.key', type: 'file', comment: 'Private signing key' },
                          { name: 'recovery.txt', type: 'file', comment: '12-word recovery phrase' },
                          { name: 'DO_NOT_SHARE', type: 'file', comment: 'Security warning' }
                        ]
                      },
                      {
                        name: 'docs',
                        type: 'folder',
                        children: [
                          { name: 'co-vibecoding-principles-docs-contexts-all-in-one.md', type: 'file', icon: 'markdown', comment: 'Complete VibeCoding & framework docs' }
                        ]
                      }
                    ]
                  },
                  { name: 'README.md', type: 'file', icon: 'markdown', comment: 'Project documentation' },
                  { name: '.gitignore', type: 'file', icon: 'git', comment: 'Git ignore rules' }
                ]
              }
            ]}
          />
        </div>

        {/* Agent Identity */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HiOutlineShieldCheck className="w-5 h-5 text-gray-500" />
            Agent Identity
          </h3>
          <p className="text-gray-700 mb-4">
            Every project automatically gets:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <HiOutlineKey className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <strong className="text-gray-800">Ed25519 cryptographic keys</strong> for agent identity
              </div>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineKey className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <strong className="text-gray-800">Unique address</strong> (hex-encoded public key)
              </div>
            </li>
            <li className="flex items-start gap-2">
              <HiOutlineKey className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <strong className="text-gray-800">12-word recovery phrase</strong> for key restoration
              </div>
            </li>
          </ul>
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
            <HiOutlineExclamationCircle className="w-4 h-4 text-gray-400" />
            <p className="text-gray-700 text-sm">
              Keys are stored in <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">.co/keys/</code> and auto-added to <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">.gitignore</code>
            </p>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="mb-16">
        <h2 className="heading-2">Examples</h2>

        <div className="space-y-4">
          <CommandBlock 
            title="Minimal project without AI"
            commands={['co create simple-bot --no-ai --template minimal']}
          />

          <CommandBlock 
            title="Web research project with AI"
            commands={['co create research-agent --ai --template web-research']}
          />

          <CommandBlock 
            title="Custom AI agent with description"
            commands={['co create slack-bot --ai --template custom --description "Slack bot that answers questions"']}
          />

          <CommandBlock 
            title="Initialize existing directory"
            commands={[
              'cd my-existing-project',
              'co init --ai --template minimal'
            ]}
          />
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2 className="heading-2">Best Practices</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <HiOutlineCommandLine className="w-8 h-8 text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose the Right Command</h3>
            <p className="text-gray-700 text-sm">
              Use <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">co create</code> for new projects, 
              <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 ml-1">co init</code> for existing directories.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <HiOutlineKey className="w-8 h-8 icon-ui mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Key Security</h3>
            <p className="text-gray-700 text-sm">
              Never commit <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">.env</code> files. Store API keys securely.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Template Selection</h3>
            <p className="text-gray-700 text-sm">
              Start with Minimal for learning. Use Custom (with AI) for specific needs.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <HiOutlineShieldCheck className="w-8 h-8 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Keys</h3>
            <p className="text-gray-700 text-sm">
              Never share <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-800">.co/keys/</code> directory. Backup your recovery phrase.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-16">
        <h2 className="heading-2">Troubleshooting</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Command Not Found</h3>
            <p className="text-gray-700 mb-4">
              If <code className="bg-gray-100 px-2 py-1 rounded">co</code> command is not found after installation:
            </p>
            <CommandBlock 
              commands={[
                '# Use full command',
                'python -m connectonion.cli.main create',
                '',
                '# Or reinstall',
                'pip uninstall connectonion',
                'pip install connectonion'
              ]}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Python Version</h3>
            <p className="text-gray-700 mb-4">
              ConnectOnion requires Python 3.9 or higher. Check your version:
            </p>
            <CommandBlock 
              commands={['python --version']}
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Key Issues</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-700" />
                Check key format matches your provider
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-700" />
                Ensure key is active and has credits
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChevronRight className="w-4 h-4 text-gray-700" />
                Try pasting without quotes or spaces
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <ContentNavigation />

      </div>
    </div>
  )
}
