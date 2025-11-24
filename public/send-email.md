# Send Email

Send emails with one line of code. No config, no complexity.

## Quick Start

One line. That's it.

```python
from connectonion import send_email

send_email("alice@example.com", "Welcome!", "Thanks for joining us!")
```

Run it:

```python
>>> send_email("alice@example.com", "Welcome!", "Thanks for joining us!")
{'success': True, 'message_id': 'msg_123', 'from': '0x1234abcd@mail.openonion.ai'}
```

## Core Concept

**What you get:**
*   **Simple function**: `send_email(to, subject, message)`
*   **Zero configuration**: No API keys to manage
*   **Your own email**: Unique address for every agent
*   **Professional delivery**: Good reputation & reliability

The function signature:
```python
def send_email(to: str, subject: str, message: str) -> dict:
    """Send an email. Returns success/failure."""
```

## Examples

### Basic notification
```python
send_email("user@example.com", "Order shipped", "Track it: ABC123")
```

### Verification code
```python
send_email("bob@example.com", "Your code: 456789", "Verify your account")
```

### Status update
```python
send_email("team@example.com", "Build passed", "All tests green")
```

### HTML content (automatic)
```python
send_email(
    "alice@example.com",
    "Weekly Report",
    "<h1>Progress</h1><p>3 features shipped!</p>"
)
```

## Your Email Address

Every agent automatically gets an email address: `0x1234abcd@mail.openonion.ai`

*   Based on your public key (first 10 characters)
*   Professional domain with good reputation
*   Generated during `co init`
*   Activated with `co auth`

## Return Values

**Success:**
```python
{
    'success': True,
    'message_id': 'msg_123',
    'from': '0x1234abcd@mail.openonion.ai'  # Your agent's email
}
```

**Failure:**
```python
{
    'success': False,
    'error': 'Rate limit exceeded'
}
```

## Using with an Agent

Give your agent the ability to send emails:

```python
from connectonion import Agent, send_email

# Create an agent with email capability
agent = Agent(
    "customer_support",
    tools=[send_email],
    instructions="You help users and send them email confirmations"
)

# The agent can now send emails autonomously
response = agent("Send a welcome email to alice@example.com")
# Agent sends: send_email("alice@example.com", "Welcome!", "Thanks for joining...")
```

## Complete Example

```python
from connectonion import send_email

# Welcome email
result = send_email(
    "new_user@example.com",
    "Welcome to our platform!",
    "We're excited to have you. Check out our docs to get started."
)
print(f"Welcome email: {result['success']}")

# Alert notification
result = send_email(
    "admin@example.com",
    "🚨 High CPU usage detected",
    "Server CPU at 95% for the last 5 minutes"
)
print(f"Alert sent: {result['success']}")

# Daily report with HTML
result = send_email(
    "team@example.com",
    "Daily Summary",
    """
    <h2>Today's Metrics</h2>
    <ul>
        <li>Users: 1,234</li>
        <li>Revenue: $5,678</li>
        <li>Uptime: 99.9%</li>
    </ul>
    """
)
print(f"Report sent: {result['success']}")
```

## The Details

### Quotas
*   **Free tier**: 100 emails/month
*   **Plus tier**: 1,000 emails/month
*   **Pro tier**: 10,000 emails/month

### Rate Limiting
*   Returns error on limit exceeded
*   Resets monthly
*   No configuration needed

### Content Types
*   **Plain text**: Just send a string
*   **HTML**: Auto-detected from tags
*   **Mixed**: HTML with plain fallback

## Philosophy

One function, one purpose: Send an email.
No templates to learn. No configuration files. No complex APIs.
Just `send_email(to, subject, message)`.
