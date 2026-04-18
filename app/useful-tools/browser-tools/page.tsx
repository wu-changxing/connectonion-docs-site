'use client'

import { FaChrome } from 'react-icons/fa'
import { HiOutlineBolt, HiOutlineCpuChip, HiOutlineCamera, HiOutlineCodeBracket } from 'react-icons/hi2'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { PageHeader } from '../../../components/PageHeader'

export default function BrowserToolsPage() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          breadcrumbs={[
            { label: 'Docs', href: '/' },
            { label: 'Useful Tools', href: '/useful-tools' },
            { label: 'BrowserAutomation' }
          ]}
          icon={FaChrome}
          iconColor="text-blue-400"
          iconBgFrom="from-blue-600/20"
          iconBgTo="to-cyan-600/20"
          iconBorderColor="border-gray-200"
          title="BrowserAutomation"
          description="Natural language browser automation via Playwright. Navigate, click, type, screenshot — describe what you want, no CSS selectors needed."
          markdownPath="/useful-tools/browser_tools.md"
          markdownFilename="browser_tools.md"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-16">
          <p className="text-lg font-semibold text-gray-900">
            Log in once, sessions persist in <code className="bg-gray-100 px-2 py-1 rounded">~/.co/browser_profile/</code>. Uses a vision LLM to find elements by description.
          </p>
        </div>

        {/* Installation */}
        <section className="mb-20">
          <h2 className="heading-2">Installation</h2>
          <CodeWithResult
            code={`pip install playwright
playwright install chromium`}
            language="bash"
          />
        </section>

        {/* Quick Start */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineBolt className="w-8 h-8 text-yellow-400" />
            Quick Start
          </h2>

          <h3 className="text-xl font-semibold mb-4">With an agent</h3>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools.browser_tools import BrowserAutomation

browser = BrowserAutomation()
agent = Agent("web", tools=[browser], model="co/gemini-2.5-pro")

agent.input("go to news.ycombinator.com and get the top 5 story titles")`}
            language="python"
          />

          <h3 className="text-xl font-semibold mt-8 mb-4">Direct usage</h3>
          <CodeWithResult
            code={`from connectonion.useful_tools.browser_tools import BrowserAutomation

with BrowserAutomation() as browser:
    browser.go_to("https://example.com")
    browser.click("the contact button")
    browser.keyboard_type("hello@example.com")
    browser.keyboard_press("Enter")
    browser.take_screenshot("result.png")`}
            language="python"
          />
        </section>

        {/* API Reference */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            API Reference
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Navigation</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>go_to(url)</li>
                <li>get_current_url()</li>
                <li>get_text()</li>
                <li>get_links_from_page(filter?)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Interaction</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>click(description)</li>
                <li>keyboard_type(text)</li>
                <li>keyboard_press(key)</li>
                <li>scroll(times?, description?)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-cyan-300 mb-2">Screenshot</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>take_screenshot(path?, full_page?)</li>
                <li>set_viewport(width, height)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-300 mb-2">Waiting</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>wait(seconds)</li>
                <li>wait_for_element(description)</li>
                <li>wait_for_text(text)</li>
                <li>wait_for_manual_login(site)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Persistent Profile */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-indigo-400" />
            Persistent Sessions
          </h2>
          <p className="text-gray-700 mb-6">
            Log in once — cookies and sessions persist to <code className="bg-gray-100 px-2 py-1 rounded">~/.co/browser_profile/</code> automatically:
          </p>
          <CodeWithResult
            code={`# First run — log in manually
browser = BrowserAutomation()
browser.go_to("https://x.com")
browser.wait_for_manual_login("X.com")  # You handle 2FA/CAPTCHA
# Session saved automatically

# Every run after — already logged in
browser = BrowserAutomation()
browser.go_to("https://x.com")  # Session restored`}
            language="python"
          />
        </section>

        {/* Screenshot */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCamera className="w-8 h-8 text-gray-500" />
            Screenshots
          </h2>
          <CodeWithResult
            code={`# Returns base64 image (saved to .tmp/ automatically)
browser.take_screenshot()

# Custom filename
browser.take_screenshot("login_page.png")

# Full page capture
browser.take_screenshot(full_page=True)

# Headless vs visible
BrowserAutomation(headless=True)   # Default — runs in background
BrowserAutomation(headless=False)  # Open visible window`}
            language="python"
          />
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
