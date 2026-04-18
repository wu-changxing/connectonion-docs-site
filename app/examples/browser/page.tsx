'use client'

import React from 'react'
import { HiOutlinePlay, HiOutlineCommandLine, HiOutlineCamera, HiOutlineGlobeAlt, HiOutlineMagnifyingGlass, HiOutlineArrowRight, HiOutlineCodeBracket, HiOutlineShieldCheck, HiOutlineBolt, HiOutlineArrowDownTray } from 'react-icons/hi2'
import { FaChrome } from 'react-icons/fa'
import Link from 'next/link'
import { CommandBlock } from '../../../components/CommandBlock'
import CodeWithResult from '../../../components/CodeWithResult'
import { ContentNavigation } from '../../../components/ContentNavigation'
import { CopyMarkdownButton } from '../../../components/CopyMarkdownButton'

export default function BrowserAutomationExample() {
  return (
    <div className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-8">
        <Link href="/" className="hover:text-gray-500 transition-colors">
          Docs
        </Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <Link href="/examples" className="hover:text-gray-500 transition-colors">
          Examples
        </Link>
        <HiOutlineArrowRight className="w-4 h-4" />
        <span className="text-gray-900">Browser Automation</span>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-gray-700/20 to-pink-600/20 rounded-xl border border-gray-200">
              <FaChrome className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h1 className="heading-1 text-3xl md:text-4xl font-bold text-gray-900 mb-2">Browser Automation</h1>
              <p className="text-lg text-gray-700">
                Control web browsers with natural language commands using Playwright.
              </p>
            </div>
          </div>
          <CopyMarkdownButton markdownPath="/examples/browser.md" filename="browser.md" className="flex-shrink-0" />
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="mb-12 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HiOutlineGlobeAlt className="w-5 h-5 text-gray-500" />
          What You'll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <HiOutlineArrowRight className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Navigate websites and interact with elements</span>
          </div>
          <div className="flex items-start gap-2">
            <HiOutlineArrowRight className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Take screenshots (full page or viewport)</span>
          </div>
          <div className="flex items-start gap-2">
            <HiOutlineArrowRight className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Extract content and scrape data</span>
          </div>
          <div className="flex items-start gap-2">
            <HiOutlineArrowRight className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Control browser with natural language</span>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="heading-2">
          <HiOutlineBolt className="w-6 h-6 text-yellow-400" />
          Quick Start
        </h2>
        
        <CodeWithResult
          fileName="browser_example.py"
          language="python"
          code={`from connectonion import Agent
from connectonion.tools import BrowserTool

# Initialize browser tool
browser = BrowserTool()

# Create agent with browser capabilities
agent = Agent("browser-bot", tools=[browser])

# Control browser with natural language
result = agent.input("Navigate to example.com and take a screenshot")
print(result)

# Extract content
content = agent.input("Extract all the links from the page")
print(content)

# Complex interactions
agent.input("Fill the search box with 'AI agents' and click search")`}
          result={`Screenshot saved to example_screenshot.png
[{text: 'About', href: '/about'}, {text: 'Contact', href: '/contact'}]
Search completed successfully`}
        />
      </section>

      {/* Full Implementation */}
      <section className="mb-12">
        <h2 className="heading-2">
          <HiOutlineCodeBracket className="w-6 h-6 text-green-400" />
          Complete Browser Agent
        </h2>

        <CodeWithResult
          fileName="agent.py"
          language="python"
          code={`#!/usr/bin/env python3
"""Browser automation agent with Playwright integration"""

import os
from connectonion import Agent
from playwright.sync_api import sync_playwright
from typing import Optional, Dict, Any

class BrowserTool:
    """Tool for browser automation using Playwright"""
    
    def __init__(self):
        self.playwright = None
        self.browser = None
        self.page = None
        
    def start_browser(self, headless: bool = False) -> str:
        """Start a new browser instance"""
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=headless)
        self.page = self.browser.new_page()
        return "Browser started successfully"
    
    def navigate(self, url: str) -> str:
        """Navigate to a URL"""
        if not self.page:
            return "Browser not started. Please start browser first."
        self.page.goto(url)
        return f"Navigated to {url}"
    
    def screenshot(self, filename: str = "screenshot.png", full_page: bool = False) -> str:
        """Take a screenshot of the current page"""
        if not self.page:
            return "Browser not started. Please start browser first."
        self.page.screenshot(path=filename, full_page=full_page)
        return f"Screenshot saved to {filename}"
    
    def extract_text(self, selector: str = "body") -> str:
        """Extract text content from the page"""
        if not self.page:
            return "Browser not started. Please start browser first."
        element = self.page.query_selector(selector)
        if element:
            return element.text_content()
        return "No content found"
    
    def click(self, selector: str) -> str:
        """Click an element on the page"""
        if not self.page:
            return "Browser not started. Please start browser first."
        self.page.click(selector)
        return f"Clicked element: {selector}"
    
    def fill(self, selector: str, text: str) -> str:
        """Fill a form field with text"""
        if not self.page:
            return "Browser not started. Please start browser first."
        self.page.fill(selector, text)
        return f"Filled {selector} with text"
    
    def extract_links(self) -> list:
        """Extract all links from the current page"""
        if not self.page:
            return []
        links = self.page.eval_on_selector_all(
            "a[href]", 
            "elements => elements.map(e => ({text: e.textContent, href: e.href}))"
        )
        return links
    
    def close_browser(self) -> str:
        """Close the browser and clean up"""
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
        return "Browser closed"

# Create the browser tool instance
browser = BrowserTool()

# Create agent with browser tool
agent = Agent(
    "browser-agent",
    tools=[browser],
    system_prompt=\"\"\"You are a browser automation assistant.
    Help users navigate websites, take screenshots, and extract content.
    Always start the browser before performing actions.
    Be helpful and explain what you're doing.\"\"\"
)

if __name__ == "__main__":
    # Example usage
    print("🌐 Browser Automation Agent")
    print("=" * 50)
    
    # Start browser
    result = agent.input("Start the browser in headless mode")
    print(f"✅ {result}")
    
    # Navigate to a website
    result = agent.input("Navigate to https://example.com")
    print(f"✅ {result}")
    
    # Take screenshot
    result = agent.input("Take a full page screenshot and save as example.png")
    print(f"✅ {result}")
    
    # Extract content
    result = agent.input("Extract all the links from the page")
    print(f"📋 Links found: {result}")
    
    # Clean up
    result = agent.input("Close the browser")
    print(f"✅ {result}")`}
        />
      </section>

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 className="heading-2">
          <HiOutlinePlay className="w-6 h-6 text-orange-400" />
          Interactive Demo Script
        </h2>

        <CodeWithResult
          fileName="demo.py"
          language="python"
          code={`#!/usr/bin/env python3
"""Interactive demo of the browser agent"""

from agent import agent, browser

print("🌐 Browser Automation Demo")
print("=" * 50)

# Step 1: Start browser
print("Step 1: Starting browser...")
result = agent.input("Start the browser (not headless so we can see it)")
print(f"✅ {result}\\n")

# Step 2: Navigate to documentation
print("Step 2: Navigating to ConnectOnion docs...")
result = agent.input(
    "Navigate to https://docs.connectonion.com and tell me the page title"
)
print(f"✅ {result}\\n")

# Step 3: Take screenshot
print("Step 3: Taking a screenshot...")
result = agent.input("Take a screenshot and save it as docs_homepage.png")
print(f"✅ {result}\\n")

# Step 4: Extract navigation links
print("Step 4: Extracting navigation links...")
result = agent.input(
    "Extract all navigation links and tell me what sections are available"
)
print(f"📋 {result}\\n")

# Step 5: Navigate to examples
print("Step 5: Going to examples section...")
result = agent.input(
    "Click on the Examples link if available and tell me what you see"
)
print(f"✅ {result}\\n")

# Step 6: Full page screenshot
print("Step 6: Taking full page screenshot...")
result = agent.input(
    "Take a full page screenshot of the examples and save as examples_full.png"
)
print(f"✅ {result}\\n")

# Clean up
print("Cleaning up...")
result = agent.input("Close the browser")
print(f"✅ {result}")

print("\\n" + "=" * 50)
print("Demo complete! Check out:")
print("  - docs_homepage.png")
print("  - examples_full.png")`}
          result={`🌐 Browser Automation Demo
==================================================
Step 1: Starting browser...
✅ Browser started successfully

Step 2: Navigating to ConnectOnion docs...
✅ Navigated to https://docs.connectonion.com - Title: "ConnectOnion Documentation"

Step 3: Taking a screenshot...
✅ Screenshot saved to docs_homepage.png

Step 4: Extracting navigation links...
📋 Found 12 sections: Getting Started, Core Concepts, Advanced Features, Examples, Blog, Roadmap

Step 5: Going to examples section...
✅ Clicked Examples link - Now viewing example projects

Step 6: Taking full page screenshot...
✅ Full page screenshot saved to examples_full.png

Cleaning up...
✅ Browser closed

==================================================
Demo complete! Check out:
  - docs_homepage.png
  - examples_full.png`}
        />
      </section>

      {/* Common Use Cases */}
      <section className="mb-12">
        <h2 className="heading-2">
          <HiOutlineMagnifyingGlass className="w-6 h-6 text-blue-400" />
          Common Use Cases
        </h2>
        
        <div className="grid gap-4">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <HiOutlineCamera className="w-5 h-5 text-blue-400" />
              Website Monitoring
            </h3>
            <CodeWithResult
              language="python"
              code={`# Monitor website changes
agent.input("Navigate to status.example.com")
agent.input("Take a screenshot and save with timestamp")
agent.input("Extract the status text and check if all systems operational")`}
              result={`Navigated to status.example.com
Screenshot saved: status_20250906_150000.png
Status: All systems operational ✅`}
            />
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <HiOutlineGlobeAlt className="w-5 h-5 text-green-400" />
              Data Extraction
            </h3>
            <CodeWithResult
              language="python"
              code={`# Scrape product information
agent.input("Navigate to shop.example.com/products")
agent.input("Extract all product names and prices")
agent.input("Save the data to products.json")`}
              result={`Navigated to shop.example.com/products
Extracted 25 products with prices
Data saved to products.json`}
            />
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <HiOutlineCommandLine className="w-5 h-5 text-gray-500" />
              Form Automation
            </h3>
            <CodeWithResult
              language="python"
              code={`# Fill and submit forms
agent.input("Navigate to example.com/contact")
agent.input("Fill the name field with 'John Doe'")
agent.input("Fill the email field with 'john@example.com'")
agent.input("Click the submit button")`}
              result={`Navigated to example.com/contact
Filled name field
Filled email field
Form submitted successfully`}
            />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="heading-2">
          <HiOutlineArrowDownTray className="w-6 h-6 text-green-400" />
          Installation
        </h2>
        
        <CommandBlock
          title="Install dependencies"
          commands={[
            'pip install connectonion',
            'pip install playwright',
            'playwright install'
          ]}
        />
      </section>

      {/* Pro Tips */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HiOutlineShieldCheck className="w-5 h-5 text-blue-400" />
          Pro Tips
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Use headless mode for production to save resources</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Add waits for dynamic content: <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">page.wait_for_selector()</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Handle errors gracefully with try-except blocks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Use specific selectors for reliable element targeting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400">•</span>
            <span>Clean up resources with <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">browser.close()</code></span>
          </li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-gray-900/30 to-blue-900/30 border border-gray-200 rounded-lg p-8 text-center mb-12">
        <h2 className="heading-2">Ready to Automate the Web?</h2>
        <p className="text-gray-700 mb-6">
          Start building your own browser automation agents with ConnectOnion
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/examples"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Examples
          </a>
          <a
            href="https://github.com/wu-changxing/connectonion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Navigation */}
      <ContentNavigation />
      </div>
    </div>
  )
}