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
          iconColor="icon-ui"
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
            <HiOutlineBolt className="w-8 h-8 text-gray-400" />
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
                <li>hover(description)</li>
                <li>mouse_click(x, y)</li>
                <li>right_click(description)</li>
                <li>double_click(description)</li>
                <li>keyboard_type(text)</li>
                <li>keyboard_press(key)</li>
                <li>scroll(times?, description?)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Screenshot</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>take_screenshot(path?, full_page?)</li>
                <li>set_viewport(width, height)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Waiting</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>wait(seconds)</li>
                <li>wait_for_element(description)</li>
                <li>wait_for_text(text)</li>
                <li>wait_for_manual_login(site)</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Forms</h3>
              <ul className="text-sm text-gray-600 space-y-1 font-mono">
                <li>select_option(field, option)</li>
                <li>check_checkbox(description, checked?)</li>
                <li>upload_file_by_selector(selector, file_path)</li>
                <li>upload_file_after_click_by_selector(selector, file_path)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Persistent Profile */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-400" />
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
BrowserAutomation(headless=False)  # Default — opens visible window
BrowserAutomation(headless=True)   # Runs in background (faster, no window)`}
            language="python"
          />
        </section>

        {/* Hover and Advanced Mouse */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-400" />
            Hover &amp; Advanced Mouse
          </h2>
          <p className="text-gray-700 mb-6">
            Reveal hover menus, click exact pixel coordinates, or open context menus:
          </p>
          <CodeWithResult
            code={`browser.hover("the Like button")         # Hover to reveal menus/tooltips
browser.take_screenshot()                # See what appeared
browser.mouse_click(x, y)                # Click exact coordinates (for hover menus)

browser.right_click("the file icon")     # Open context menu
browser.double_click("the file name")    # Double-click to open/select`}
            language="python"
          />
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
            <code className="font-mono">mouse_click(x, y)</code> is useful after <code className="font-mono">hover()</code> — clicking by description would re-scan the DOM and dismiss the hover menu.
          </div>
        </section>

        {/* System Info */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCodeBracket className="w-8 h-8 text-gray-500" />
            System Info
          </h2>
          <p className="text-gray-700 mb-6">
            Call <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">get_system_info()</code> before using keyboard shortcuts to get the correct modifier key for the current OS:
          </p>
          <CodeWithResult
            code={`info = browser.get_system_info()
# → "OS: macOS. Use Meta for shortcuts (Meta+a select all, Meta+c copy...)"
# → "OS: Windows. Use Control for shortcuts..."`}
            language="python"
          />
        </section>

        {/* Humanized Input */}
        <section className="mb-20">
          <h2 className="heading-2">
            <HiOutlineCpuChip className="w-8 h-8 text-gray-400" />
            Humanized Input
          </h2>
          <p className="text-gray-700 mb-6">
            Every <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">click()</code>, <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">hover()</code>, <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">keyboard_type()</code>, and <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">scroll()</code> call is automatically humanized — no separate API, it's built into the tools you already use. Patchright already hides driver-level tells (<code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">navigator.webdriver</code>); this layer fixes the shape of the events themselves, which is what behavioral detectors look at:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm list-disc list-inside mb-4">
            <li>Mouse moves along a curved (Bezier) path with a human velocity profile, not a straight-line teleport</li>
            <li>The cursor remembers its last position per page, so the next action starts from there instead of reappearing on the target pixel</li>
            <li>Keystroke timing follows a log-normal cadence rather than fixed-interval typing</li>
            <li>Scroll events mimic a real wheel/trackpad device (a per-page "persona" picks one and keeps it consistent for that session)</li>
            <li>CJK text is entered via a real OS clipboard paste (with your clipboard saved and restored), falling back to CDP IME composition if paste is blocked</li>
          </ul>
          <p className="text-gray-600 text-sm">
            No tool signatures change — this happens under the hood on every call.
          </p>
        </section>

        {/* Typing */}
        <section className="mb-20">
          <h2 className="heading-2">Typing</h2>
          <CodeWithResult
            code={`browser.click("the email input")
browser.keyboard_type("user@example.com")

browser.keyboard_press("Enter")
browser.keyboard_press("Control+Enter")
browser.keyboard_press("Escape")
browser.keyboard_press("Tab")`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            After <code className="bg-gray-100 px-2 py-1 rounded font-mono">keyboard_type()</code>, call <code className="bg-gray-100 px-2 py-1 rounded font-mono">take_screenshot()</code> to verify the text landed in the right field.
          </p>
        </section>

        {/* Scrolling */}
        <section className="mb-20">
          <h2 className="heading-2">Scrolling</h2>
          <CodeWithResult
            code={`browser.scroll()                                     # 5 scrolls on main content
browser.scroll(times=3, description="the sidebar")  # Scroll a specific area`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Uses AI to pick the best scroll strategy (element scroll, page scroll, or mouse wheel).
          </p>
        </section>

        {/* Reading Page Content */}
        <section className="mb-20">
          <h2 className="heading-2">Reading Page Content</h2>
          <CodeWithResult
            code={`browser.get_text()                           # All visible text from the page
browser.get_links_from_page()                # All unique URLs
browser.get_links_from_page("github.com")   # URLs containing "github.com"`}
            language="python"
          />
        </section>

        {/* Forms */}
        <section className="mb-20">
          <h2 className="heading-2">Forms</h2>
          <CodeWithResult
            code={`browser.select_option("country dropdown", "Australia")
browser.check_checkbox("I agree to terms")
browser.check_checkbox("newsletter", checked=False)  # Uncheck`}
            language="python"
          />
        </section>

        {/* File Uploads */}
        <section className="mb-20">
          <h2 className="heading-2">File Uploads</h2>
          <CodeWithResult
            code={`# Upload to an existing file input. Hidden inputs are supported.
browser.upload_file_by_selector('input[type="file"]', "cover.png")

# Click an upload button that opens the OS file picker, then attach the file.
browser.upload_file_after_click_by_selector(
    "button",
    "cover.png",
    text="Upload from computer",
)`}
            language="python"
          />
          <p className="text-gray-700 mt-4 text-sm">
            Both upload helpers accept <code className="bg-gray-100 px-2 py-1 rounded font-mono">frame_url_contains</code> and <code className="bg-gray-100 px-2 py-1 rounded font-mono">frame_name</code> for upload controls inside iframes. Pass <code className="bg-gray-100 px-2 py-1 rounded font-mono">index</code> when a selector matches multiple controls.
          </p>
        </section>

        {/* Waiting */}
        <section className="mb-20">
          <h2 className="heading-2">Waiting</h2>
          <CodeWithResult
            code={`browser.wait(2)                              # Wait 2 seconds
browser.wait_for_element("the save button") # Wait for element to appear
browser.wait_for_text("Payment successful") # Wait for text on page
browser.wait_for_manual_login("Gmail")      # Pause for 2FA/CAPTCHA`}
            language="python"
          />
        </section>

        {/* Viewport */}
        <section className="mb-20">
          <h2 className="heading-2">Viewport</h2>
          <CodeWithResult
            code={`browser.set_viewport(1920, 1080)
browser.set_viewport(375, 812)   # iPhone`}
            language="python"
          />
        </section>

        {/* Use with Agent */}
        <section className="mb-20">
          <h2 className="heading-2">Use with Agent</h2>
          <CodeWithResult
            code={`from connectonion import Agent
from connectonion.useful_tools.browser_tools import BrowserAutomation

browser = BrowserAutomation(headless=False)  # Visible for debugging
agent = Agent("scraper", tools=[browser], model="co/gemini-2.5-pro")

agent.input("Go to news.ycombinator.com, get the top 5 story titles")
agent.input("Navigate to github.com/trending and screenshot the page")
agent.input("Fill in the contact form on example.com with test data")`}
            language="python"
          />
        </section>

        {/* Common Patterns */}
        <section className="mb-20">
          <h2 className="heading-2">Common Patterns</h2>

          <h3 className="text-xl font-semibold mb-4">Login once, reuse session</h3>
          <CodeWithResult
            code={`browser = BrowserAutomation()
browser.go_to("https://app.example.com/login")
browser.wait_for_manual_login("example.com")  # Log in once

# Every run after: session is restored from ~/.co/browser_profile/`}
            language="python"
          />

          <h3 className="text-xl font-semibold mt-8 mb-4">Screenshot workflow</h3>
          <CodeWithResult
            code={`browser.go_to("https://example.com")
browser.click("Login")
browser.keyboard_type("user@example.com")
browser.keyboard_press("Tab")
browser.keyboard_type("password123")
browser.take_screenshot("before_submit.png")
browser.keyboard_press("Enter")
browser.wait(2)
browser.take_screenshot("after_login.png")`}
            language="python"
          />

          <h3 className="text-xl font-semibold mt-8 mb-4">Data extraction</h3>
          <CodeWithResult
            code={`browser.go_to("https://example.com/products")
text = browser.get_text()
links = browser.get_links_from_page("/product/")`}
            language="python"
          />
        </section>

        {/* Notes */}
        <section className="mb-20">
          <h2 className="heading-2">Notes</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span>Uses Google Chrome if installed (better site compatibility); if no browser exists, chromium is auto-installed per-user (no admin rights, v1.2.1+)</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span>Viewport defaults to 1920×1200 for maximum content visibility</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span>Output is truncated when used as an agent tool to prevent token overflow</span></li>
            <li className="flex items-start gap-2"><span className="text-gray-400 mt-1">•</span><span>Runs natively on Windows since v1.2.1 (named-pipe transport — no WSL), plus macOS and Linux</span></li>
          </ul>
        </section>

        <ContentNavigation />
      </div>
    </div>
  )
}
