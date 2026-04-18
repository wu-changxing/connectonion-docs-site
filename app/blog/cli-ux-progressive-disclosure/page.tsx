'use client'

import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { ContentNavigation } from '../../../components/ContentNavigation'

export default function CLIProgressiveDisclosurePage() {

  const content = `# Why We Choose Progressive Disclosure Over Configuration Questionnaires

*September 2025 • Design Decision #006*

Most framework CLIs bombard users with questions that don't matter yet. We chose progressive disclosure: start fast, decide later, respect intelligence.

## The Problem with Traditional CLIs

Typical framework initialization:
- What's your project description? *(I don't know, I just started)*
- Choose your testing framework? *(Let me build something first)*
- Configure your linter settings? *(Please, just let me code)*
- Set up CI/CD pipeline? *(It's my first 5 seconds with this tool)*

This approach assumes users know everything upfront. Reality: they don't, and they shouldn't have to.

## Our Philosophy: Progressive Disclosure

- **< 30s** to working code
- **3** questions maximum
- **0** required configs

## The Two-Command Strategy

\`\`\`bash
# Outside a project
co create my-agent  # Creates new directory

# Inside a project
co init             # Uses current directory
\`\`\`

Why both? Because **context matters**:
- Outside: Users want to create a new space
- Inside: Users have already decided where to work

This isn't redundancy; it's respecting user intent. Django does this, Rails does this, and for good reason.

## Minimal Questions, Maximum Intelligence

Our setup asks only what matters RIGHT NOW:
1. **Enable AI?** - Determines available templates
2. **API key** - Only if AI enabled, with auto-detection
3. **Template** - With previews so users know what they get

That's it. Three decisions max.

## Smart API Key Detection

\`\`\`python
if api_key.startswith('sk-proj-'):
    # OpenAI project key
elif api_key.startswith('sk-ant-'):
    # Anthropic
elif api_key.startswith('gsk_'):
    # Groq
\`\`\`

The key format already tells us the provider. Why make users answer what we can infer?

## What We Don't Ask

**We Skip:** Project description, Author name, License type, Version number, Test framework, Package manager

**We Do:** Create working code immediately, Use sensible defaults, Show clear next steps, Get out of the way

## Beautiful by Default

We use colors and emojis for **clarity**, not decoration:
- ✅ Green = Success
- ⚠️ Yellow = Warning
- ❌ Red = Error
- 📁 Icons = Visual scanning

## Results: User Delight

- **30s** to running agent
- **3** questions max
- **0** required configs
- **1** command to start

## Conclusion

Good CLI UX isn't about asking fewer questions - it's about asking the **RIGHT** questions at the **RIGHT** time. Everything else should be invisible, automatic, or optional.

The best tool is one you forget you're using. That's what we built.`

  return (
    <div className="w-full">
      <main className="p-4 lg:p-8 lg:px-16 pb-20">
        <article className="prose prose-gray max-w-none">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="heading-1">
                Why We Choose Progressive Disclosure Over Configuration Questionnaires
              </h1>
              <p className="text-gray-700 text-lg">September 2025 • Design Decision #006</p>
            </div>
            <CopyMarkdownButton content={content} />
          </div>

          <div className="mt-8 space-y-6 text-gray-700">
            <p className="text-xl leading-relaxed text-gray-600 italic">
              Most framework CLIs bombard users with questions that don't matter yet.
              We chose progressive disclosure: start fast, decide later, respect intelligence.
            </p>

            <h2 className="heading-2">The Problem with Traditional CLIs</h2>

            <div className="bg-red-900/20 border border-red-200 rounded-lg p-6 my-6">
              <p className="text-gray-700 mb-4">Typical framework initialization:</p>
              <ul className="space-y-3 text-gray-700">
                <li>What's your project description? <span className="text-gray-500 italic">(I don't know, I just started)</span></li>
                <li>Choose your testing framework? <span className="text-gray-500 italic">(Let me build something first)</span></li>
                <li>Configure your linter settings? <span className="text-gray-500 italic">(Please, just let me code)</span></li>
                <li>Set up CI/CD pipeline? <span className="text-gray-500 italic">(It's my first 5 seconds with this tool)</span></li>
              </ul>
            </div>

            <p>
              This approach assumes users know everything upfront. Reality: they don't, and they shouldn't have to.
            </p>

            <h2 className="heading-2">Our Philosophy: Progressive Disclosure</h2>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gray-500 mb-2">&lt; 30s</div>
                <p className="text-gray-700">To working code</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gray-500 mb-2">3</div>
                <p className="text-gray-700">Questions maximum</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-gray-500 mb-2">0</div>
                <p className="text-gray-700">Required configs</p>
              </div>
            </div>

            <h2 className="heading-2">The Two-Command Strategy</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden my-6">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700 font-mono">terminal</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-gray-400">{`# Outside a project
co create my-agent  # Creates new directory

# Inside a project
co init             # Uses current directory`}</code>
              </pre>
            </div>

            <p>
              Why both? Because <strong className="text-gray-900">context matters</strong>:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
              <li>Outside: Users want to create a new space</li>
              <li>Inside: Users have already decided where to work</li>
            </ul>

            <p>
              This isn't redundancy; it's respecting user intent. Django does this, Rails does this,
              and for good reason.
            </p>

            <h2 className="heading-2">Minimal Questions, Maximum Intelligence</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
              <p className="text-gray-400 font-semibold mb-4">Our setup asks only what matters RIGHT NOW:</p>
              <ol className="space-y-3 text-gray-700">
                <li><span className="text-gray-500 font-bold">1.</span> <strong className="text-gray-900">Enable AI?</strong> - Determines available templates</li>
                <li><span className="text-gray-500 font-bold">2.</span> <strong className="text-gray-900">API key</strong> - Only if AI enabled, with auto-detection</li>
                <li><span className="text-gray-500 font-bold">3.</span> <strong className="text-gray-900">Template</strong> - With previews so users know what they get</li>
              </ol>
              <p className="text-gray-700 text-sm mt-4 italic">That's it. Three decisions max.</p>
            </div>

            <p>
              Compare to typical CLIs: Create-react-app (5+ questions), Vue CLI (10+ questions),
              Yeoman generators (often 15+ questions).
            </p>

            <h2 className="heading-2">Smart API Key Detection</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden my-6">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <span className="text-sm text-gray-700 font-mono">api_detection.py</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-gray-400">{`if api_key.startswith('sk-proj-'):
    # OpenAI project key
elif api_key.startswith('sk-ant-'):
    # Anthropic
elif api_key.startswith('gsk_'):
    # Groq`}</code>
              </pre>
            </div>

            <p>
              The key format already tells us the provider. Why make users answer what we can infer?
            </p>

            <h2 className="heading-2">Template Preview, Not Template Guessing</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 font-mono text-sm">
              <pre className="text-gray-700">{`📦 Minimal - Simple starting point
  ├── agent.py (50 lines) - Basic agent with example tool
  ├── .env - API key configuration
  └── .co/ - Agent identity & metadata`}</pre>
            </div>

            <p>
              Users shouldn't have to guess. Show them, let them choose, move on.
            </p>

            <h2 className="heading-2">What We Don't Ask</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-red-400 font-semibold mb-4">We Skip</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Project description</li>
                  <li>Author name</li>
                  <li>License type</li>
                  <li>Version number</li>
                  <li>Test framework</li>
                  <li>Package manager</li>
                </ul>
              </div>

              <div className="bg-gray-500/10 border border-gray-200 rounded-lg p-6">
                <h3 className="text-green-400 font-semibold mb-4">We Do</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Create working code immediately</li>
                  <li>Use sensible defaults everywhere</li>
                  <li>Show clear next steps</li>
                  <li>Get out of the way</li>
                </ul>
              </div>
            </div>

            <h2 className="heading-2">Beautiful by Default</h2>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
              <p className="text-gray-700 mb-4">We use colors and emojis for <strong className="text-gray-900">clarity</strong>, not decoration:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <span className="text-gray-700">Green = Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-xl">⚠️</span>
                  <span className="text-gray-700">Yellow = Warning</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-400 text-xl">❌</span>
                  <span className="text-gray-700">Red = Error</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📁</span>
                  <span className="text-gray-700">Icons = Visual scanning</span>
                </div>
              </div>
            </div>

            <p>
              But we respect terminal preferences: works in non-color terminals, copy-paste friendly,
              no ASCII art or unnecessary flair.
            </p>

            <h2 className="heading-2">Results: User Delight</h2>

            <div className="bg-gradient-to-r from-gray-500/10 to-gray-500/10 rounded-lg p-8 border border-gray-200 my-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-500">30s</div>
                  <p className="text-gray-700 text-sm">to running agent</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-500">3</div>
                  <p className="text-gray-700 text-sm">questions max</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-500">0</div>
                  <p className="text-gray-700 text-sm">required configs</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-500">1</div>
                  <p className="text-gray-700 text-sm">command to start</p>
                </div>
              </div>
            </div>

            <h2 className="heading-2">Conclusion</h2>

            <div className="bg-gradient-to-r from-gray-500/10 to-gray-500/10 rounded-lg p-6 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Good CLI UX isn't about asking fewer questions - it's about asking the
                <strong className="text-gray-900"> RIGHT </strong> questions at the
                <strong className="text-gray-900"> RIGHT </strong> time. Everything else should be
                invisible, automatic, or optional.
              </p>
              <p className="text-gray-700">
                The best tool is one you forget you're using. That's what we built.
              </p>
            </div>

            <div className="border-t border-gray-800 mt-16 pt-8">
              <p className="text-gray-700 italic text-lg">
                Simplicity is the ultimate sophistication in CLI design.
              </p>
            </div>

            {/* Navigation */}
            <ContentNavigation />
          </div>
        </article>
      </main>
    </div>
  )
}
