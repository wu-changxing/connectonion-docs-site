# Quick Start

Get your first AI agent running in 60 seconds.

## Install

```bash
pip install connectonion
```

## Your First Agent (3 lines)

```python
from connectonion import Agent

agent = Agent("You are a helpful assistant")
print(agent.input("Hello!"))
```

That's it. No API key setup needed - ConnectOnion provides free credits to get started.

## Add Tools (Functions = Tools)

```python
from connectonion import Agent

def calculate(expression: str) -> str:
    """Evaluate a math expression"""
    return str(eval(expression))

def search(query: str) -> str:
    """Search the web"""
    return f"Results for: {query}"

agent = Agent("You are helpful", tools=[calculate, search])
result = agent.input("What's 42 * 17?")
```

Regular Python functions become agent tools automatically. No decorators, no schemas, no boilerplate.

## Built-in Tools

ConnectOnion comes with powerful tools ready to use:

```python
from connectonion import Agent, Gmail, GoogleCalendar, WebFetch

gmail = Gmail()
calendar = GoogleCalendar()

agent = Agent(
    "You are an email assistant",
    tools=[gmail, calendar, WebFetch()]
)

# Now your agent can read emails, create events, fetch web pages
agent.input("Check my inbox and summarize today's emails")
```

**Available tools:**
- `Gmail` - Read, send, search emails
- `GoogleCalendar` - Create events, schedule meetings
- `WebFetch` - Fetch and parse web pages
- `Shell` - Run shell commands (with approval)
- `Memory` - Persistent key-value storage

## Human Approval (Plugins)

For sensitive actions, add approval plugins:

```python
from connectonion import Agent, Gmail
from connectonion.useful_plugins import gmail_plugin

gmail = Gmail()
agent = Agent(
    "You are an email assistant",
    tools=[gmail],
    plugins=[gmail_plugin]  # Asks before sending emails
)
```

The agent will pause and ask for your approval before sending any email.

## Choose Your Model

```python
# Free credits (default)
agent = Agent("prompt", model="co/gemini-2.5-pro")

# Or use your own API keys
agent = Agent("prompt", model="gpt-5")              # OpenAI
agent = Agent("prompt", model="claude-sonnet-4-5")  # Anthropic
agent = Agent("prompt", model="gemini-2.5-pro")     # Google
```

Check your free credits: `co status`

## Project Templates

```bash
# Create a new project
co init                      # Basic agent
co init --template playwright  # Browser automation
co init --template email-agent # Email assistant
```

## What's Next?

- [Tools Guide](/tools) - Create custom tools
- [Gmail Integration](/gmail) - Email automation
- [Plugins](/plugins) - Add behaviors to agents
- [Multi-Agent](/connect) - Connect agents together

## Philosophy

**Keep simple things simple, make complicated things possible.**

- 3 lines for basic agent
- Functions are tools (no decorators)
- Free credits to start
- Production features when you need them
