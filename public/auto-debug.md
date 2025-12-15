# Debug Your AI Agents Like Code

Pause at breakpoints, inspect state, modify variables, and explore "what if" scenarios. Just like debugging regular code, but for AI agents.

## 60-Second Quick Start

Add `@xray` to tools you want to inspect, then call `agent.auto_debug()`:

```python
from connectonion import Agent, xray

@xray  # Tools with @xray become breakpoints
def search_emails(query: str):
    return api.search(query)

def send_email(to: str, body: str):
    return api.send(to, body)

agent = Agent(
    name="email_assistant",
    tools=[search_emails, send_email]
)

# Launch interactive debug session
agent.auto_debug()
```

## The Interactive Menu

At every `@xray` breakpoint, you see this menu:

```text
What do you want to do?
  → Continue execution 🚀       [c or Enter]
    Edit values 🔍             [e]
    Quit debugging 🚫          [q]

💡 Coming soon (by Nov 2): Ask AI [a], View trace [v], Step mode [s]
>
```

### Method 1: Arrow Keys (Beginner-friendly)
*   **↑ ↓**: Move selection up and down
*   **Enter**: Select highlighted option

### Method 2: Shortcuts (Power user)
*   `c`: Continue execution
*   `e`: Edit variables
*   `q`: Quit debugging

## Available Features

### Continue Execution
The most common action - just press `c` or `Enter` to continue.

### Edit Variables (Python REPL)
Modify variables to test "what if" scenarios. This is a full Python REPL with access to all variables.

```python
> e

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Python Editor - Modify variables to test scenarios
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Available variables: query, result, tool_args

>>> result
'Found 1 email from john@company.com'

>>> # Test: What if we found 3 emails?
>>> result = ["email1@ex.com", "email2@ex.com", "email3@ex.com"]

>>> result
['email1@ex.com', 'email2@ex.com', 'email3@ex.com']
```

## Complete User Journey

Let's walk through a full debugging session:

```python
@xray
def search_products(query: str):
    return api.search(query)

def filter_results(products: list, criteria: dict):
    return [p for p in products if matches(p, criteria)]

def rank_by_popularity(products: list):
    return sorted(products, key=lambda p: p['sales'], reverse=True)

agent = Agent(
    name="shop_assistant",
    tools=[search_products, filter_results, rank_by_popularity]
)

agent.auto_debug()
```

## Best Practices

1.  **Strategic @xray Placement**: Add `@xray` to API calls, complex logic, and tools that often fail.
2.  **Test Edge Cases in Python Mode**: Test empty results, large datasets, error responses, etc.
3.  **Use Step Mode for Complex Workflows**: When you don't know which tool is causing problems.

## When to Use

**Perfect For:**
*   Development - Building and testing agents
*   Debugging - Finding unexpected behavior
*   Learning - Understanding agent decisions
*   Testing edge cases - "What if" scenarios
*   Prompt engineering - Discover what works

**Not For:**
*   Production - Requires human interaction
*   Automated tests - Use assertions instead
*   CI/CD pipelines - Not non-interactive
*   Simple scripts - Overkill for basic tasks

## Frequently Asked Questions

**How do I continue execution?**
Press 'c' or Enter from the menu, or type '/continue' from any mode.

**What's the difference between @xray and step mode?**
@xray breakpoints pause only at marked tools (selective). Step mode pauses at EVERY tool (comprehensive).

**Can I still use agent.input() directly?**
Yes - .auto_debug() is optional. Use it only when you need interactive debugging.

**Is this slow?**
No - execution speed is the same. Pausing only happens at breakpoints.

**Works in Jupyter notebooks?**
Yes! Works in any Python environment with terminal support.
