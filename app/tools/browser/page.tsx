'use client'

import { useState } from 'react'
import { HiOutlineCommandLine, HiOutlineArrowRight, HiOutlineCamera, HiOutlineDevicePhoneMobile, HiOutlineDeviceTablet, HiOutlineComputerDesktop, HiOutlineExclamationCircle, HiOutlineBolt, HiOutlineClipboard, HiOutlineCheck, HiOutlineDocumentText, HiOutlineBugAnt, HiOutlineSquare3Stack3D, HiOutlineClock } from 'react-icons/hi2'
import Link from 'next/link'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'
import { PageHeader } from '../../../components/PageHeader'

export default function BrowserPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const pageContent = `# CLI Browser

Drive one real browser from the shell — call browser functions directly, or hand a task to the AI agent.

## Overview

\`co browser\` provides instant browser automation without writing code. The first command starts a background daemon that owns one browser; every later command drives that same browser, so navigation, cookies, and logged-in sessions persist until you close it.

## Basic Usage

\`\`\`bash
co browser go_to localhost:3000
co browser take_screenshot /tmp/shot.png
\`\`\`

This:
1. Starts a browser (headless by default) on the first command
2. Navigates to http://localhost:3000
3. Saves a screenshot and prints the path

## Command Format

\`\`\`bash
co browser <function> [args...]
co browser do "<natural language instruction>"
co browser help
\`\`\`

Two ways to drive the browser, mixable in the same session:
- **Direct function call** — \`co browser go_to x.com\`. Deterministic, instant, free (no LLM).
- **Natural language** — \`co browser do "find the cheapest flight"\`. The AI agent figures out the steps.

Run \`co browser help\` to list every callable function with its arguments — the fastest way to find the exact name before calling it.

## Examples

### Basic Navigation & Screenshot

\`\`\`bash
# Screenshot local development
co browser go_to localhost:3000
co browser take_screenshot

# With specific port
co browser go_to localhost:8080
co browser take_screenshot

# External site
co browser go_to example.com
co browser take_screenshot
\`\`\`

### Save to Specific Path

\`\`\`bash
# Save to temp directory
co browser take_screenshot /tmp/debug.png

# Save to subdirectory
co browser take_screenshot screenshots/test.png

# Full page (not just the viewport)
co browser take_screenshot /tmp/full.png --full-page
\`\`\`

> **Use absolute paths.** The daemon resolves relative paths against its own working directory (where it first started), not the directory you run each command from.

### Custom Viewport

\`\`\`bash
# Set a specific viewport size
co browser set_viewport 390 844

# Then screenshot at that size
co browser take_screenshot /tmp/mobile.png
\`\`\`

There are no named device presets — pass explicit width/height pixels.

## Common Functions

\`\`\`bash
co browser go_to <url>                     # navigate
co browser get_current_url                 # print the current URL
co browser get_text                        # print visible page text
co browser take_screenshot [path] [--full-page]
co browser click "<description>"           # click by natural-language description
co browser keyboard_type "<text>"          # type text
co browser scroll                          # scroll the main content
co browser close                           # close browser, stop daemon
\`\`\`

## Installation

Browser automation is built on [Patchright](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright), a stealth-patched Playwright fork:

\`\`\`bash
pip install patchright
patchright install chrome
\`\`\`

If no browser is found, Chromium is auto-installed per-user with no admin rights required (v1.2.1+).

## Use Cases

### Debug Local Development
\`\`\`bash
# Quick check of homepage
co browser go_to localhost:3000
co browser take_screenshot

# Debug specific route
co browser go_to localhost:3000/api/status
co browser take_screenshot
\`\`\`

### Document Bugs
\`\`\`bash
# Capture error state
co browser go_to localhost:3000/error
co browser take_screenshot bug.png

# Mobile-specific issue
co browser set_viewport 390 844
co browser go_to localhost:3000/mobile-bug
co browser take_screenshot mobile-issue.png
\`\`\`

### Test Responsive Design
\`\`\`bash
# Test different viewports
co browser set_viewport 390 844 && co browser take_screenshot view-iphone.png
co browser set_viewport 768 1024 && co browser take_screenshot view-ipad.png
co browser set_viewport 1920 1080 && co browser take_screenshot view-desktop.png
\`\`\`

### CI/CD Integration
\`\`\`bash
# In GitHub Actions or similar
co browser go_to $DEPLOY_URL
co browser take_screenshot artifacts/deployed.png
co browser close
\`\`\`
`

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Browser Screenshots' }
          ]}
          icon={HiOutlineCamera}
          iconColor="icon-ui"
          title="Browser Screenshots"
          description="Quick browser screenshots for debugging web applications"
          markdownPath="/tools/browser/browser.md"
          markdownFilename="browser.md"
        />

        {/* Quick Start Card */}
        <div className="mb-12 p-6 bg-gradient-to-r from-gray-50 to-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineCamera className="w-6 h-6 icon-ui" />
            <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Take a screenshot in two commands - no code required:
          </p>
          <CommandBlock
            commands={['co browser go_to localhost:3000', 'co browser take_screenshot']}
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <HiOutlineBolt className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Instant capture</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineClock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Persistent browser</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineSquare3Stack3D className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Custom viewports</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineDocumentText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">PNG format</span>
            </div>
          </div>
        </div>

        {/* Command Format */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-6 h-6 text-gray-400" />
            Command Format
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="font-mono text-lg text-gray-700 mb-4">
              co browser <span className="text-gray-700">&lt;function&gt;</span> <span className="text-gray-500">[args...]</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gray-700 font-mono">&lt;function&gt;</span>
                <span className="text-gray-700">Required. Any function from <code className="bg-gray-100 px-1.5 py-0.5 rounded">co browser help</code> (e.g., go_to, take_screenshot, click), or <code className="bg-gray-100 px-1.5 py-0.5 rounded">do</code> for the AI agent</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500 font-mono">[args...]</span>
                <span className="text-gray-700">Optional. Plain string arguments for that function</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              The first command starts a background daemon owning one browser; every later command drives that same browser until you run <code className="bg-gray-100 px-1.5 py-0.5 rounded">co browser close</code>.
            </p>
          </div>
        </section>

        {/* Examples Grid */}
        <section className="mb-16">
          <h2 className="heading-2">Examples</h2>

          <div className="grid gap-6">
            {/* Basic Screenshots */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineCamera className="w-5 h-5 text-gray-400" />
                Basic Screenshots
              </h3>
              <CommandBlock
                commands={[
                  '# Screenshot local development',
                  'co browser go_to localhost:3000',
                  'co browser take_screenshot',
                  '',
                  '# With specific port',
                  'co browser go_to localhost:8080',
                  'co browser take_screenshot',
                  '',
                  '# External site',
                  'co browser go_to example.com',
                  'co browser take_screenshot'
                ]}
              />
            </div>

            {/* Save Locations */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineDocumentText className="w-5 h-5 icon-ui" />
                Save to Specific Path
              </h3>
              <CommandBlock
                commands={[
                  '# Save to temp directory',
                  'co browser take_screenshot /tmp/debug.png',
                  '',
                  '# Save with custom name',
                  'co browser take_screenshot homepage.png',
                  '',
                  '# Save to subdirectory',
                  'co browser take_screenshot screenshots/test.png'
                ]}
              />
            </div>

            {/* Viewport Sizes */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineDevicePhoneMobile className="w-5 h-5 text-gray-500" />
                Custom Viewport Sizes
              </h3>
              <CommandBlock
                commands={[
                  '# Phone-sized viewport',
                  'co browser set_viewport 390 844',
                  '',
                  '# Tablet-sized viewport',
                  'co browser set_viewport 768 1024',
                  '',
                  '# Desktop-sized viewport',
                  'co browser set_viewport 1920 1080'
                ]}
              />
              <p className="text-sm text-gray-600 mt-3">There are no named device presets — pass explicit width/height pixels.</p>
            </div>
          </div>
        </section>

        {/* Common Viewport Sizes */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineSquare3Stack3D className="w-6 h-6 text-gray-500" />
            Common Viewport Sizes
          </h2>
          <p className="text-gray-700 mb-4">
            There are no named presets — pass <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">set_viewport width height</code> with the pixel dimensions you want:
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Command</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Roughly matches</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Icon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700 text-sm">set_viewport 390 844</td>
                  <td className="px-4 py-3 text-gray-700">iPhone 14/15</td>
                  <td className="px-4 py-3"><HiOutlineDevicePhoneMobile className="w-4 h-4 text-gray-700" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700 text-sm">set_viewport 360 800</td>
                  <td className="px-4 py-3 text-gray-700">Common Android</td>
                  <td className="px-4 py-3"><HiOutlineDevicePhoneMobile className="w-4 h-4 text-gray-700" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700 text-sm">set_viewport 768 1024</td>
                  <td className="px-4 py-3 text-gray-700">iPad</td>
                  <td className="px-4 py-3"><HiOutlineDeviceTablet className="w-4 h-4 text-gray-700" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700 text-sm">set_viewport 1920 1080</td>
                  <td className="px-4 py-3 text-gray-700">Full HD Desktop</td>
                  <td className="px-4 py-3"><HiOutlineComputerDesktop className="w-4 h-4 text-gray-700" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Complete Examples */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-6 h-6 text-gray-400" />
            Complete Examples
          </h2>

          <div className="space-y-4">
            <CommandBlock
              title="Debug mobile checkout flow"
              commands={[
                'co browser set_viewport 390 844',
                'co browser go_to localhost:3000/checkout',
                'co browser take_screenshot /tmp/checkout-mobile.png'
              ]}
            />

            <CommandBlock
              title="Document bug on specific page"
              commands={[
                'co browser set_viewport 1920 1080',
                'co browser go_to localhost:3000/xray',
                'co browser take_screenshot bug-report.png'
              ]}
            />

            <CommandBlock
              title="Test responsive design"
              commands={[
                'co browser go_to localhost:3000',
                'co browser set_viewport 390 844 && co browser take_screenshot mobile.png',
                'co browser set_viewport 768 1024 && co browser take_screenshot tablet.png',
                'co browser set_viewport 1920 1080 && co browser take_screenshot desktop.png'
              ]}
            />
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="heading-2">Use Cases</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Debug Development */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <HiOutlineBugAnt className="w-8 h-8 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Debug Local Development</h3>
              <p className="text-gray-700 text-sm mb-4">
                Quick visual checks during development
              </p>
              <CommandBlock
                commands={[
                  '# Quick check of homepage',
                  'co browser go_to localhost:3000',
                  'co browser take_screenshot',
                  '',
                  '# Debug specific route',
                  'co browser go_to localhost:3000/api/status',
                  'co browser take_screenshot'
                ]}
              />
            </div>

            {/* Document Bugs */}
            <div className="bg-gray-50 border border-red-200 rounded-lg p-6">
              <HiOutlineExclamationCircle className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Bugs</h3>
              <p className="text-gray-700 text-sm mb-4">
                Capture visual proof of issues
              </p>
              <CommandBlock
                commands={[
                  '# Capture error state',
                  'co browser go_to localhost:3000/error',
                  'co browser take_screenshot bug.png',
                  '',
                  '# Mobile-specific issue',
                  'co browser set_viewport 390 844',
                  'co browser go_to localhost:3000/mobile-bug',
                  'co browser take_screenshot mobile-issue.png'
                ]}
              />
            </div>

            {/* Test Responsive */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <HiOutlineSquare3Stack3D className="w-8 h-8 text-gray-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Responsive Design</h3>
              <p className="text-gray-700 text-sm mb-4">
                Verify layouts across viewport sizes
              </p>
              <div className="bg-gray-100 rounded p-3 text-xs">
                <pre className="text-gray-700 font-mono">
{`co browser go_to localhost:3000
co browser set_viewport 390 844 && co browser take_screenshot view-mobile.png
co browser set_viewport 768 1024 && co browser take_screenshot view-tablet.png
co browser set_viewport 1920 1080 && co browser take_screenshot view-desktop.png`}
                </pre>
              </div>
            </div>

            {/* CI/CD Integration */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <HiOutlineBolt className="w-8 h-8 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CI/CD Integration</h3>
              <p className="text-gray-700 text-sm mb-4">
                Automated visual testing
              </p>
              <CommandBlock
                commands={[
                  '# In GitHub Actions',
                  'co browser go_to $DEPLOY_URL',
                  'co browser take_screenshot artifacts/deployed.png',
                  'co browser close'
                ]}
              />
            </div>
          </div>
        </section>

        {/* URL Handling */}
        <section className="mb-16">
          <h2 className="heading-2">URL Handling</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">The command intelligently handles URLs:</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-gray-700">localhost</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-900">http://localhost</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-gray-700">localhost:3000</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-900">http://localhost:3000</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-gray-700">example.com</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-900">https://example.com</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-gray-700">http://example.com</span>
                <span className="text-gray-500">→</span>
                <span className="text-gray-900">http://example.com</span>
                <span className="text-gray-700 text-xs ml-2">(unchanged)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="heading-2">Installation</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Installation</h3>
              <p className="text-gray-700 mb-4">Browser automation is built on Patchright (a stealth-patched Playwright fork):</p>
              <CommandBlock
                commands={[
                  'pip install patchright',
                  'patchright install chrome'
                ]}
              />
              <p className="text-gray-600 text-sm mt-3">If no browser is found, Chromium is auto-installed per-user with no admin rights required (v1.2.1+).</p>
            </div>
          </div>
        </section>

        {/* Framework Examples */}
        <section className="mb-16">
          <h2 className="heading-2">Framework Examples</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Next.js</h3>
              <CommandBlock
                commands={[
                  'co browser go_to localhost:3000',
                  'co browser take_screenshot',
                  'co browser go_to localhost:3000/_error',
                  'co browser take_screenshot error.png'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">FastAPI</h3>
              <CommandBlock
                commands={[
                  'co browser go_to localhost:8000',
                  'co browser take_screenshot',
                  'co browser go_to localhost:8000/docs',
                  'co browser take_screenshot api-docs.png'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Django</h3>
              <CommandBlock
                commands={[
                  'co browser go_to localhost:8000',
                  'co browser take_screenshot',
                  'co browser go_to localhost:8000/admin',
                  'co browser take_screenshot admin.png'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">React Dev Server</h3>
              <CommandBlock
                commands={[
                  'co browser go_to localhost:3000',
                  'co browser take_screenshot',
                  'co browser set_viewport 390 844 && co browser take_screenshot mobile.png'
                ]}
              />
            </div>
          </div>
        </section>

        {/* Error Messages */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineExclamationCircle className="w-6 h-6 text-red-400" />
            Common Error Messages
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-6 space-y-6 font-mono text-sm">
              <div>
                <div className="text-red-400 mb-2">❌ unknown command: frobnicate</div>
                <div className="text-gray-700">Function name not found — run <span className="text-gray-500">co browser help</span> to list valid functions</div>
              </div>

              <div>
                <div className="text-red-400 mb-2">❌ Browser tools not installed</div>
                <div className="text-gray-700">Run: pip install patchright && patchright install chrome</div>
              </div>

              <div>
                <div className="text-red-400 mb-2">❌ Cannot reach http://localhost:3000</div>
                <div className="text-gray-700">Is your server running?</div>
              </div>

              <div>
                <div className="text-red-400 mb-2">❌ Cannot save to /root/test.png (permission denied)</div>
                <div className="text-gray-700">Check file permissions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="heading-2">Tips</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Quick Debug</h3>
              <p className="text-gray-700 text-sm">
                Just <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">co browser go_to localhost:3000 && co browser take_screenshot</code> for instant feedback
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Organize Screenshots</h3>
              <p className="text-gray-700 text-sm">
                Use descriptive absolute paths like <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">/tmp/bugs/issue-123.png</code> — the daemon resolves relative paths against its own working directory
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Test Viewports</h3>
              <p className="text-gray-700 text-sm">
                Use <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">set_viewport width height</code> before screenshotting — there are no named device presets
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Discover Functions</h3>
              <p className="text-gray-700 text-sm">
                Run <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">co browser help</code> to list every callable function and its arguments
              </p>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-16">
          <h2 className="heading-2">Limitations</h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>One browser window per daemon — close it before starting a differently-configured one</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Relative paths resolve against the daemon's working directory, not your shell's current directory</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Visible browser window by default (pass <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">--headless</code> to run without one)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>Screenshots save as PNG</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700 text-sm">
                For sophisticated flows, hand the browser to the AI agent with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">co browser do "..."</code>, or build an agent with the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">BrowserAutomation</code> tool directly.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-700">
              <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">co browser</code> gives you a persistent, scriptable browser from the shell.
              Call functions directly for deterministic steps, or hand the wheel to the AI agent with <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">do "..."</code>.
              Perfect for debugging during development.
            </p>
          </div>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}