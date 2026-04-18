'use client'

import { useState } from 'react'
import { HiOutlineCommandLine, HiOutlineArrowRight, HiOutlineCamera, HiOutlineDevicePhoneMobile, HiOutlineDeviceTablet, HiOutlineComputerDesktop, HiOutlineExclamationCircle, HiOutlineBolt, HiOutlineClipboard, HiOutlineCheck, HiOutlineDocumentText, HiOutlineBugAnt, HiOutlineSquare3Stack3D, HiOutlineClock } from 'react-icons/hi2'
import Link from 'next/link'
import { CommandBlock } from '../../../components/CommandBlock'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'

export default function BrowserPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const pageContent = `# CLI Browser Feature

Quick browser screenshots for debugging web applications.

## Overview

The \`-b\` flag provides instant browser screenshots without writing code. Perfect for debugging, testing, and sharing visual proof of issues.

## Basic Usage

\`\`\`bash
co -b "screenshot localhost:3000"
\`\`\`

This command:
1. Opens a headless browser
2. Navigates to http://localhost:3000
3. Takes a screenshot
4. Saves as \`screenshot_[timestamp].png\`

## Command Format

\`\`\`bash
co -b "screenshot [URL] [save to PATH] [size SIZE]"
\`\`\`

All parts except URL are optional.

## Examples

### Basic Screenshot

\`\`\`bash
# Screenshot local development
co -b "screenshot localhost:3000"

# With specific port
co -b "screenshot localhost:8080"

# External site
co -b "screenshot example.com"
\`\`\`

### Save to Specific Path

\`\`\`bash
# Save to temp directory
co -b "screenshot localhost:3000 save to /tmp/debug.png"

# Save to current directory with name
co -b "screenshot localhost:3000 save to homepage.png"

# Save to subdirectory
co -b "screenshot localhost:3000 save to screenshots/test.png"
\`\`\`

### Device Sizes

\`\`\`bash
# iPhone viewport
co -b "screenshot localhost:3000 size iphone"

# Custom dimensions
co -b "screenshot localhost:3000 size 390x844"

# Common presets
co -b "screenshot localhost:3000 size ipad"
co -b "screenshot localhost:3000 size desktop"
\`\`\`

## Device Presets

| Preset | Dimensions | Device |
|--------|------------|--------|
| \`iphone\` | 390×844 | iPhone 14/15 |
| \`android\` | 360×800 | Common Android |
| \`ipad\` | 768×1024 | iPad |
| \`desktop\` | 1920×1080 | Full HD Desktop |

## URL Handling

The command intelligently handles URLs:

- \`localhost\` → \`http://localhost\`
- \`localhost:3000\` → \`http://localhost:3000\`
- \`example.com\` → \`https://example.com\`
- \`http://example.com\` → \`http://example.com\` (unchanged)

## Installation

Browser features require Playwright:

\`\`\`bash
pip install playwright
playwright install chromium
\`\`\`

Or install ConnectOnion with browser support:

\`\`\`bash
pip install connectonion[browser]
\`\`\`

## Use Cases

### Debug Local Development
\`\`\`bash
# Quick check of homepage
co -b "screenshot localhost:3000"

# Debug specific route
co -b "screenshot localhost:3000/api/status"
\`\`\`

### Document Bugs
\`\`\`bash
# Capture error state
co -b "screenshot localhost:3000/error save to bug.png"

# Mobile-specific issue
co -b "screenshot localhost:3000/mobile-bug save to mobile-issue.png size iphone"
\`\`\`

### Test Responsive Design
\`\`\`bash
# Test different viewports
for size in iphone android ipad desktop; do
  co -b "screenshot localhost:3000 save to view-$size.png size $size"
done
\`\`\`

### CI/CD Integration
\`\`\`bash
# In GitHub Actions or similar
co -b "screenshot $DEPLOY_URL save to artifacts/deployed.png"
\`\`\`
`

  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header with Copy Button */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-700 mb-4">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <HiOutlineArrowRight className="w-4 h-4" />
              <Link href="/tools" className="hover:text-gray-900 transition-colors">Tools</Link>
              <HiOutlineArrowRight className="w-4 h-4" />
              <span className="text-gray-900">Browser Screenshots</span>
            </nav>
            
            <h1 className="h1 md:"heading-1>Browser Screenshots</h1>
            <p className="text-lg md:text-xl text-gray-700">
              Quick browser screenshots for debugging web applications
            </p>
          </div>
          <CopyMarkdownButton
            markdownPath="/tools/browser/browser.md"
            filename="browser.md"
            className="flex-shrink-0"
          />
        </div>

        {/* Quick Start Card */}
        <div className="mb-12 p-6 bg-gradient-to-r from-gray-50 to-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <HiOutlineCamera className="w-6 h-6 icon-ui" />
            <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Take a screenshot in one command - no setup required:
          </p>
          <CommandBlock 
            commands={['co -b "screenshot localhost:3000"']}
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <HiOutlineBolt className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-700">Instant capture</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineClock className="w-4 h-4 text-green-400" />
              <span className="text-gray-700">Auto timestamp</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineSquare3Stack3D className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">Device presets</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineDocumentText className="w-4 h-4 text-orange-400" />
              <span className="text-gray-700">PNG format</span>
            </div>
          </div>
        </div>

        {/* Command Format */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineCommandLine className="w-6 h-6 text-green-400" />
            Command Format
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="font-mono text-lg text-gray-700 mb-4">
              co -b "screenshot <span className="text-gray-700">[URL]</span> <span className="text-gray-500">[save to PATH]</span> <span className="text-gray-500">[size SIZE]</span>"
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-yellow-600 font-mono">[URL]</span>
                <span className="text-gray-700">Required. The page to screenshot (e.g., localhost:3000)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500 font-mono">[save to PATH]</span>
                <span className="text-gray-700">Optional. Where to save the screenshot</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-500 font-mono">[size SIZE]</span>
                <span className="text-gray-700">Optional. Viewport size or device preset</span>
              </div>
            </div>
          </div>
        </section>

        {/* Examples Grid */}
        <section className="mb-16">
          <h2 className="heading-2">Examples</h2>

          <div className="grid gap-6">
            {/* Basic Screenshots */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineCamera className="w-5 h-5 text-green-400" />
                Basic Screenshots
              </h3>
              <CommandBlock 
                commands={[
                  '# Screenshot local development',
                  'co -b "screenshot localhost:3000"',
                  '',
                  '# With specific port',
                  'co -b "screenshot localhost:8080"',
                  '',
                  '# External site',
                  'co -b "screenshot example.com"'
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
                  'co -b "screenshot localhost:3000 save to /tmp/debug.png"',
                  '',
                  '# Save with custom name',
                  'co -b "screenshot localhost:3000 save to homepage.png"',
                  '',
                  '# Save to subdirectory',
                  'co -b "screenshot localhost:3000 save to screenshots/test.png"'
                ]}
              />
            </div>

            {/* Device Sizes */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineDevicePhoneMobile className="w-5 h-5 text-gray-500" />
                Device Sizes
              </h3>
              <CommandBlock 
                commands={[
                  '# iPhone viewport',
                  'co -b "screenshot localhost:3000 size iphone"',
                  '',
                  '# Custom dimensions',
                  'co -b "screenshot localhost:3000 size 390x844"',
                  '',
                  '# Common presets',
                  'co -b "screenshot localhost:3000 size ipad"',
                  'co -b "screenshot localhost:3000 size desktop"'
                ]}
              />
            </div>
          </div>
        </section>

        {/* Device Presets Table */}
        <section className="mb-16">
          <h2 className="heading-2">
            <HiOutlineSquare3Stack3D className="w-6 h-6 text-gray-500" />
            Device Presets
          </h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Preset</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Dimensions</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Device</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-medium">Icon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">iphone</td>
                  <td className="px-4 py-3 text-gray-700">390×844</td>
                  <td className="px-4 py-3 text-gray-700">iPhone 14/15</td>
                  <td className="px-4 py-3"><HiOutlineDevicePhoneMobile className="w-4 h-4 text-gray-700" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">android</td>
                  <td className="px-4 py-3 text-gray-700">360×800</td>
                  <td className="px-4 py-3 text-gray-700">Common Android</td>
                  <td className="px-4 py-3"><HiOutlineDevicePhoneMobile className="w-4 h-4 text-gray-700" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">ipad</td>
                  <td className="px-4 py-3 text-gray-700">768×1024</td>
                  <td className="px-4 py-3 text-gray-700">iPad</td>
                  <td className="px-4 py-3"><HiOutlineDeviceTablet className="w-4 h-4 text-gray-700" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">desktop</td>
                  <td className="px-4 py-3 text-gray-700">1920×1080</td>
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
            <HiOutlineBolt className="w-6 h-6 text-yellow-400" />
            Complete Examples
          </h2>

          <div className="space-y-4">
            <CommandBlock 
              title="Debug mobile checkout flow"
              commands={['co -b "screenshot localhost:3000/checkout save to /tmp/checkout-mobile.png size iphone"']}
            />

            <CommandBlock 
              title="Document bug on specific page"
              commands={['co -b "screenshot localhost:3000/xray save to bug-report.png size 1920x1080"']}
            />

            <CommandBlock 
              title="Test responsive design"
              commands={[
                'co -b "screenshot localhost:3000 save to mobile.png size 390x844"',
                'co -b "screenshot localhost:3000 save to tablet.png size 768x1024"',
                'co -b "screenshot localhost:3000 save to desktop.png size 1920x1080"'
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
              <HiOutlineBugAnt className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Debug Local Development</h3>
              <p className="text-gray-700 text-sm mb-4">
                Quick visual checks during development
              </p>
              <CommandBlock 
                commands={[
                  '# Quick check of homepage',
                  'co -b "screenshot localhost:3000"',
                  '',
                  '# Debug specific route',
                  'co -b "screenshot localhost:3000/api/status"'
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
                  'co -b "screenshot localhost:3000/error save to bug.png"',
                  '',
                  '# Mobile-specific issue',
                  'co -b "screenshot localhost:3000/mobile-bug save to mobile-issue.png size iphone"'
                ]}
              />
            </div>

            {/* Test Responsive */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <HiOutlineSquare3Stack3D className="w-8 h-8 text-gray-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Responsive Design</h3>
              <p className="text-gray-700 text-sm mb-4">
                Verify layouts across devices
              </p>
              <div className="bg-gray-100 rounded p-3 text-xs">
                <pre className="text-gray-700 font-mono">
{`for size in iphone android ipad desktop; do
  co -b "screenshot localhost:3000 save to view-$size.png size $size"
done`}
                </pre>
              </div>
            </div>

            {/* CI/CD Integration */}
            <div className="bg-gray-50 border border-orange-200 rounded-lg p-6">
              <HiOutlineBolt className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">CI/CD Integration</h3>
              <p className="text-gray-700 text-sm mb-4">
                Automated visual testing
              </p>
              <CommandBlock 
                commands={[
                  '# In GitHub Actions',
                  'co -b "screenshot $DEPLOY_URL save to artifacts/deployed.png"'
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
              <p className="text-gray-700 mb-4">Browser features require Playwright:</p>
              <CommandBlock 
                commands={[
                  'pip install playwright',
                  'playwright install chromium'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">With Browser Support</h3>
              <p className="text-gray-700 mb-4">Or install ConnectOnion with browser support:</p>
              <CommandBlock 
                commands={['pip install connectonion[browser]']}
              />
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
                  'co -b "screenshot localhost:3000"',
                  'co -b "screenshot localhost:3000/_error save to error.png"'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">FastAPI</h3>
              <CommandBlock 
                commands={[
                  'co -b "screenshot localhost:8000"',
                  'co -b "screenshot localhost:8000/docs save to api-docs.png"'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Django</h3>
              <CommandBlock 
                commands={[
                  'co -b "screenshot localhost:8000"',
                  'co -b "screenshot localhost:8000/admin save to admin.png"'
                ]}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">React Dev Server</h3>
              <CommandBlock 
                commands={[
                  'co -b "screenshot localhost:3000"',
                  'co -b "screenshot localhost:3000 size iphone"'
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
                <div className="text-red-400 mb-2">❌ Usage: co -b "screenshot [URL] [save to PATH] [size SIZE]"</div>
                <div className="text-gray-700">Missing URL in command</div>
              </div>

              <div>
                <div className="text-red-400 mb-2">❌ Browser tools not installed</div>
                <div className="text-gray-700">Run: pip install playwright && playwright install chromium</div>
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
                Just <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">co -b "screenshot localhost:3000"</code> for instant feedback
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Organize Screenshots</h3>
              <p className="text-gray-700 text-sm">
                Use descriptive paths like <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">save to bugs/issue-123.png</code>
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Test Viewports</h3>
              <p className="text-gray-700 text-sm">
                Use device names (<code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">iphone</code>, <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">ipad</code>) for common sizes
              </p>
            </div>

            <div className="bg-gray-50 border border-orange-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Timestamps</h3>
              <p className="text-gray-700 text-sm">
                Default filenames include timestamp for versioning
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
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Screenshots only (no interaction, clicking, forms)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Single page at a time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Headless browser only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>PNG format only</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700 text-sm">
                For complex browser automation, use the full ConnectOnion browser agent or Playwright directly.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-700">
              The <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded">-b</code> flag provides dead-simple browser screenshots. 
              No setup, no complexity - just describe what screenshot you want and where to save it. 
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