/**
 * @purpose CLI auth command documentation
 * @context Shows how to use `co auth` for one-time setup of managed models, and `co auth google` for Gmail/Calendar OAuth
 */

'use client'

import { HiOutlineKey, HiOutlineLockClosed, HiOutlineSparkles, HiOutlineCpuChip, HiOutlineWrenchScrewdriver, HiOutlineEnvelope } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliAuthPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co auth' }
            ]}
            icon={HiOutlineKey}
            iconColor="icon-ui"
            title="co auth"
            description="One-time setup for managed models — no provider keys needed. Authenticates your agent with OpenOnion and unlocks the co/ model prefix across providers."
            markdownPath="/cli/auth.md"
            markdownFilename="auth.md"
          />

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> Run <code className="bg-white px-2 py-1 rounded border border-green-200">co auth</code> once and start using <code className="bg-white px-2 py-1 rounded border border-green-200">co/gpt-5</code>, <code className="bg-white px-2 py-1 rounded border border-green-200">co/claude-sonnet-4-5</code>, or <code className="bg-white px-2 py-1 rounded border border-green-200">co/gemini-3.7-flash</code> — no API keys to manage.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
            Quick Start
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Two commands cover the full setup:
          </p>

          <CodeWithResult
            code={`# Authenticate with OpenOnion (required first)
co auth

# Optional: Connect your Google account for Gmail & Calendar
co auth google`}
            language="bash"
          />

          <p className="text-gray-500 text-sm mt-3">
            <code className="bg-gray-100 px-2 py-1 rounded">co auth</code> is required before you can use any <code className="bg-gray-100 px-2 py-1 rounded">co/</code> models. <code className="bg-gray-100 px-2 py-1 rounded">co auth google</code> is optional — only needed for Gmail/Calendar tools.
          </p>
        </section>

        {/* What co auth does */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineLockClosed className="w-8 h-8 text-gray-700" />
            What <code className="text-gray-900">co auth</code> does
          </h2>

          <CodeWithResult
            code={`co auth`}
            result={`Authenticating with OpenOnion...
✓ Token saved to ~/.co/keys.env
✓ AGENT_EMAIL set
✓ IS_EMAIL_ACTIVE=true

You can now use co/ prefixed models.`}
            language="bash"
          />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Behind the scenes</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-gray-700">1.</span>
                <span>Authenticates your agent and saves a secure token</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">2.</span>
                <span>Token is saved to <code className="bg-gray-100 px-1 rounded">~/.co/keys.env</code> as <code className="bg-gray-100 px-1 rounded">OPENONION_API_KEY</code></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">3.</span>
                <span>If your project has a <code className="bg-gray-100 px-1 rounded">.env</code>, it's updated too</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">4.</span>
                <span><code className="bg-gray-100 px-1 rounded">~/.co/keys.env</code> gains <code className="bg-gray-100 px-1 rounded">AGENT_EMAIL</code> and <code className="bg-gray-100 px-1 rounded">IS_EMAIL_ACTIVE=true</code></span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mt-6 mb-3">
            After running, your <code className="bg-gray-100 px-2 py-1 rounded">~/.co/keys.env</code> looks like:
          </p>

          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`OPENONION_API_KEY=oo_live_abcd1234...
AGENT_EMAIL=0x7a9f3b2c@mail.openonion.ai
IS_EMAIL_ACTIVE=true`}
          </pre>
        </section>

        {/* What co auth google does */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineEnvelope className="w-8 h-8 text-gray-700" />
            What <code className="text-gray-900">co auth google</code> does
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Connect a Google account so your agents can send Gmail and read Calendar:
          </p>

          <CommandBlock commands={["co auth google"]} />

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-2 text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-gray-700">•</span>
                <span>Connects your Google account for <strong>Gmail Send</strong> and <strong>Calendar Read</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">•</span>
                <span>Opens your browser for OAuth authorization</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">•</span>
                <span>Saves credentials to <code className="bg-gray-100 px-1 rounded">.env</code> for your agents to use</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">•</span>
                <span>Running again will switch to a different Google account</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-700">•</span>
                <span>See <a href="/integrations/google" className="text-gray-900 underline">Google Integration</a> for details</span>
              </div>
            </div>
          </div>
        </section>

        {/* Managed Models */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-700" />
            Use Managed Models (<code className="text-gray-900">co/</code> prefix)
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Once authenticated, use any <code className="bg-gray-100 px-2 py-1 rounded">co/</code> model — no provider API keys required:
          </p>

          <CodeWithResult
            code={`from connectonion import llm_do

response = llm_do("Hello", model="co/gpt-4o")`}
            language="python"
          />

          <p className="text-gray-700 mt-8 mb-4">
            Works across providers:
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">OpenAI</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>co/gpt-5</li>
                <li>co/gpt-5-mini</li>
                <li>co/o4-mini</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Anthropic</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>co/claude-opus-4-5</li>
                <li>co/claude-sonnet-4-5</li>
                <li>co/claude-haiku-4-5</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Google</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>co/gemini-3.7-flash (default)</li>
                <li>co/gemini-3-pro-preview</li>
                <li>co/gemini-2.5-pro</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineWrenchScrewdriver className="w-8 h-8 text-gray-700" />
            Troubleshooting
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Missing token?</h3>
              <p className="text-gray-700 text-sm">
                Run <code className="bg-white px-2 py-1 rounded border border-gray-200">co auth</code> again — it will refresh your <code className="bg-white px-2 py-1 rounded border border-gray-200">OPENONION_API_KEY</code> in <code className="bg-white px-2 py-1 rounded border border-gray-200">~/.co/keys.env</code>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Network issue?</h3>
              <p className="text-gray-700 text-sm">
                Try again or check your connection. <code className="bg-white px-2 py-1 rounded border border-gray-200">co auth</code> needs to reach <code className="bg-white px-2 py-1 rounded border border-gray-200">oo.openonion.ai</code>.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Global vs project</h3>
              <p className="text-gray-700 text-sm">
                <code className="bg-white px-2 py-1 rounded border border-gray-200">co auth</code> prefers a local <code className="bg-white px-2 py-1 rounded border border-gray-200">.co</code> directory if keys exist there, otherwise falls back to <code className="bg-white px-2 py-1 rounded border border-gray-200">~/.co</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
