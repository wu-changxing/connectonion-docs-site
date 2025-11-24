# Browser Automation

Control web browsers with natural language commands using Playwright.

## Quick Start

```python
from connectonion import Agent
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
agent.input("Fill the search box with 'AI agents' and click search")
```

## Complete Browser Agent

```python
#!/usr/bin/env python3
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
    print(f"✅ {result}")
```

## Interactive Demo Script

```python
#!/usr/bin/env python3
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
print("  - examples_full.png")
```

## Common Use Cases

### Website Monitoring
```python
# Monitor website changes
agent.input("Navigate to status.example.com")
agent.input("Take a screenshot and save with timestamp")
agent.input("Extract the status text and check if all systems operational")
```

### Data Extraction
```python
# Scrape product information
agent.input("Navigate to shop.example.com/products")
agent.input("Extract all product names and prices")
agent.input("Save the data to products.json")
```

### Form Automation
```python
# Fill and submit forms
agent.input("Navigate to example.com/contact")
agent.input("Fill the name field with 'John Doe'")
agent.input("Fill the email field with 'john@example.com'")
agent.input("Click the submit button")
```

## Installation

```bash
pip install connectonion
pip install playwright
playwright install
```

## Pro Tips

*   Use headless mode for production to save resources
*   Add waits for dynamic content: `page.wait_for_selector()`
*   Handle errors gracefully with try-except blocks
*   Use specific selectors for reliable element targeting
*   Clean up resources with `browser.close()`
