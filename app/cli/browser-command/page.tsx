/**
 * @purpose CLI browser command documentation
 * @context Shows how to use `co browser` for screenshots and automation
 */

'use client'

import { HiOutlineCamera, HiOutlineDevicePhoneMobile, HiOutlineComputerDesktop, HiOutlineBolt, HiOutlineCodeBracket } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function CliBrowserCommandPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <PageHeader
            breadcrumbs={[
              { label: 'Docs', href: '/' },
              { label: 'CLI', href: '/cli' },
              { label: 'co browser' }
            ]}
            icon={HiOutlineCamera}
            iconColor="icon-ui"
            title="co browser"
            description="Quick browser screenshots and automation with one command. Perfect for debugging, testing, and visual proof."
          />

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-lg font-semibold text-gray-900">
              <strong>Quick Start:</strong> <code className="bg-gray-100 px-2 py-1 rounded">co browser "screenshot localhost:3000"</code> - instant screenshot, no code required.
            </p>
          </div>
        </section>

        {/* Basic Usage */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Basic Usage
          </h2>

          <CodeWithResult
            code={`co browser "screenshot localhost:3000"`}
            result={`[browser] Taking screenshot of http://localhost:3000
[browser] Saved to .tmp/screenshot_20260310_143022.png

✓ Screenshot saved successfully`}
            language="bash"
          />

          <p className="text-gray-600 mt-4">
            Saves to <code className="bg-gray-100 px-2 py-1 rounded">.tmp/screenshot_YYYYMMDD_HHMMSS.png</code> by default.
          </p>
        </section>

        {/* Command Format */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Command Format
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <code className="text-lg text-gray-700">
              co browser "screenshot [URL] [save to PATH] [size SIZE]"
            </code>
          </div>

          <p className="text-gray-700 mb-4">All parts except URL are optional.</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Screenshots</h3>
              <CodeWithResult
                code={`# Local development
co browser "screenshot localhost:3000"

# Specific port
co browser "screenshot localhost:8080"

# External site
co browser "screenshot example.com"

# Full URL
co browser "screenshot https://docs.connectonion.com"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Save to Specific Path</h3>
              <CodeWithResult
                code={`# Save to temp directory
co browser "screenshot localhost:3000 save to /tmp/debug.png"

# Save to current directory
co browser "screenshot localhost:3000 save to homepage.png"

# Save to subdirectory
co browser "screenshot localhost:3000 save to screenshots/test.png"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Device Sizes</h3>
              <CodeWithResult
                code={`# iPhone viewport
co browser "screenshot localhost:3000 size iphone"

# Custom dimensions
co browser "screenshot localhost:3000 size 390x844"

# Common presets
co browser "screenshot localhost:3000 size ipad"
co browser "screenshot localhost:3000 size desktop"`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Device Presets */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineDevicePhoneMobile className="w-8 h-8 text-gray-700" />
            Device Presets
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Preset</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Dimensions</th>
                  <th className="text-left px-4 py-3 text-gray-700 font-semibold">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">iphone</td>
                  <td className="px-4 py-3 text-gray-700">390x844</td>
                  <td className="px-4 py-3 text-gray-600">iPhone 14/15</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">android</td>
                  <td className="px-4 py-3 text-gray-700">360x800</td>
                  <td className="px-4 py-3 text-gray-600">Common Android</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">ipad</td>
                  <td className="px-4 py-3 text-gray-700">768x1024</td>
                  <td className="px-4 py-3 text-gray-600">iPad</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-gray-700">desktop</td>
                  <td className="px-4 py-3 text-gray-700">1920x1080</td>
                  <td className="px-4 py-3 text-gray-600">Full HD Desktop</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Complete Examples */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineComputerDesktop className="w-8 h-8 text-gray-700" />
            Complete Examples
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Debug Mobile Checkout</h3>
              <CodeWithResult
                code={`co browser "screenshot localhost:3000/checkout save to /tmp/checkout-mobile.png size iphone"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Document Bug</h3>
              <CodeWithResult
                code={`co browser "screenshot localhost:3000/xray save to bug-report.png size 1920x1080"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Test Responsive Design</h3>
              <CodeWithResult
                code={`# Test multiple viewports
co browser "screenshot localhost:3000 save to mobile.png size 390x844"
co browser "screenshot localhost:3000 save to tablet.png size 768x1024"
co browser "screenshot localhost:3000 save to desktop.png size 1920x1080"`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* URL Handling */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-indigo-400" />
            URL Handling
          </h2>

          <p className="text-gray-700 mb-6">
            The command intelligently handles URLs:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">localhost</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">http://localhost</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">localhost:3000</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">http://localhost:3000</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">example.com</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">https://example.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">http://example.com</span>
                <span className="text-slate-600">→</span>
                <span className="text-gray-700">http://example.com</span>
                <span className="text-slate-500">(unchanged)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Use Cases
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Debug Local Development</h3>
              <CodeWithResult
                code={`# Quick check of homepage
co browser "screenshot localhost:3000"

# Debug specific route
co browser "screenshot localhost:3000/api/status"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2. Document Bugs</h3>
              <CodeWithResult
                code={`# Capture error state
co browser "screenshot localhost:3000/error save to bug.png"

# Mobile-specific issue
co browser "screenshot localhost:3000/mobile-bug save to mobile-issue.png size iphone"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">3. Test Responsive Design</h3>
              <CodeWithResult
                code={`# Test different viewports
for size in iphone android ipad desktop; do
  co browser "screenshot localhost:3000 save to view-$size.png size $size"
done`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">4. CI/CD Integration</h3>
              <CodeWithResult
                code={`# In GitHub Actions or similar
co browser "screenshot $DEPLOY_URL save to artifacts/deployed.png"`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Framework Examples */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Framework Examples
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Next.js</h3>
              <CodeWithResult
                code={`co browser "screenshot localhost:3000"
co browser "screenshot localhost:3000/_error save to error.png"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">FastAPI</h3>
              <CodeWithResult
                code={`co browser "screenshot localhost:8000"
co browser "screenshot localhost:8000/docs save to api-docs.png"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Django</h3>
              <CodeWithResult
                code={`co browser "screenshot localhost:8000"
co browser "screenshot localhost:8000/admin save to admin.png"`}
                language="bash"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">React Dev Server</h3>
              <CodeWithResult
                code={`co browser "screenshot localhost:3000"
co browser "screenshot localhost:3000 size iphone"`}
                language="bash"
              />
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-gray-700" />
            Installation
          </h2>

          <p className="text-gray-700 mb-6">
            Browser features require Playwright:
          </p>

          <CodeWithResult
            code={`# Install Playwright
pip install playwright
playwright install chromium

# Or install ConnectOnion with browser support
pip install connectonion[browser]`}
            language="bash"
          />
        </section>

        {/* Error Messages */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 icon-ui" />
            Common Errors
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-mono text-sm text-red-700 mb-2">
                ❌ Browser tools not installed
              </p>
              <p className="text-gray-600 text-sm">
                Run: <code className="bg-gray-100 px-2 py-1 rounded">pip install playwright && playwright install chromium</code>
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-mono text-sm text-red-700 mb-2">
                ❌ Cannot reach http://localhost:3000
              </p>
              <p className="text-gray-600 text-sm">
                Is your server running? Start it first.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-mono text-sm text-red-700 mb-2">
                ❌ Natural language browser agent unavailable. Set OPENAI_API_KEY
              </p>
              <p className="text-gray-600 text-sm">
                Set your OpenAI API key for natural language commands
              </p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Tips & Best Practices</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-gray-700">Quick Debug:</strong> Just <code className="bg-gray-100 px-2 py-1 rounded">co browser "screenshot localhost:3000"</code> for instant feedback
              </div>
              <div>
                <strong className="text-gray-700">Organize Screenshots:</strong> Use descriptive paths like <code className="bg-gray-100 px-2 py-1 rounded">save to bugs/issue-123.png</code>
              </div>
              <div>
                <strong className="text-gray-700">Test Viewports:</strong> Use device names (iphone, ipad) for common sizes
              </div>
              <div>
                <strong className="text-gray-700">Timestamps:</strong> Default filenames include timestamp for versioning
              </div>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            Limitations
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-2 text-gray-600">
              <li>• Screenshots only (no interaction, clicking, forms)</li>
              <li>• Single page at a time</li>
              <li>• Headless browser only</li>
              <li>• PNG format only</li>
            </ul>
          </div>

          <p className="text-gray-600 mt-4">
            For complex browser automation, use the full{' '}
            <a href="/tools/browser" className="text-gray-700 hover:underline">
              ConnectOnion browser agent
            </a>{' '}
            or Playwright directly.
          </p>
        </section>

        {/* Navigation */}
        <ContentNavigation />
      </div>
    </div>
  )
}
