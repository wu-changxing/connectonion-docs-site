# WebFetch

Give your agents web scraping powers. Fetch, parse, and analyze web pages.

## Quick Start

```python
from connectonion import Agent, WebFetch

web = WebFetch()
agent = Agent("researcher", tools=[web])

agent.input("What does stripe.com do?")
agent.input("Get contact info from acme.com")
```

## Low-Level Methods

Direct HTTP and parsing operations.

### fetch(url)

HTTP GET request, returns raw HTML.

```python
html = web.fetch("https://example.com")
# Returns raw HTML string
```

### strip_tags(html, max_chars=10000)

Strip HTML tags, returns body text only.

```python
html = web.fetch("https://example.com")
text = web.strip_tags(html)
# Returns clean plain text (body content only)
```

### get_title(html)

Get page title from HTML.

### get_links(html)

Extract all links from HTML.

### get_emails(html)

Extract email addresses from HTML.

### get_social_links(html)

Extract social media links (Twitter, LinkedIn, Facebook, etc.).

## High-Level Methods (LLM-Powered)

AI-powered analysis of web pages.

### analyze_page(url)

Use LLM to understand what a page/company does.

```python
result = web.analyze_page("https://stripe.com")
# Returns: "Stripe is a payment processing platform that..."
```

### get_contact_info(url)

Extract contact information (email, phone, address) using LLM.

```python
info = web.get_contact_info("https://acme.com")
# Returns: {
#   "email": "contact@acme.com",
#   "phone": "+1-555-0123",
#   "address": "123 Main St, City"
# }
```

## Research Agent Example

```python
from connectonion import Agent, WebFetch, Memory

web = WebFetch()
memory = Memory()

agent = Agent(
    name="researcher",
    tools=[web, memory],
    system_prompt="""You are a web researcher. You can:
    - Fetch and analyze websites
    - Extract contact information
    - Find social media profiles
    - Remember findings for later"""
)

# Research a company
agent.input("Research stripe.com and tell me what they do")

# Find contact info
agent.input("Get contact information from acme.com")

# Build a lead list
agent.input("Find all email addresses on techstartup.io and save them to memory")

# Competitive analysis
agent.input("Compare what stripe.com and square.com offer")
```

## API Reference

| Method | Type | Description |
|--------|------|-------------|
| `fetch(url)` | Low-level | HTTP GET, returns raw HTML |
| `strip_tags(html)` | Low-level | Remove HTML tags, return text |
| `get_title(html)` | Low-level | Extract page title |
| `get_links(html)` | Low-level | Extract all links |
| `get_emails(html)` | Low-level | Extract email addresses |
| `get_social_links(html)` | Low-level | Extract social media links |
| `analyze_page(url)` | LLM | AI analysis of what page/company does |
| `get_contact_info(url)` | LLM | AI extraction of contact info |

## Configuration

```python
# Custom timeout (default: 15 seconds)
web = WebFetch(timeout=30)

# Use with agent
agent = Agent("researcher", tools=[web])
```
