# Outlook

> Give your agents full Outlook access via Microsoft Graph API. Read, search, send, and manage emails.

---

## Quick Start

```python
from connectonion import Agent, Outlook

outlook = Outlook()
agent = Agent("assistant", tools=[outlook])

agent.input("Show me my recent emails")
agent.input("Send an email to alice@example.com saying hello")
```

---

## Setup

Authenticate with Microsoft:

```bash
co auth microsoft
```

Your agent can now read and manage Outlook emails.

---

## Agent Methods

### Reading Emails

```python
outlook.read_inbox(last=10, unread=False)  # Get recent inbox emails
outlook.get_sent_emails(max_results=10)    # Get sent emails
outlook.get_email_body(email_id)           # Get full email content
```

### Search

```python
outlook.search_emails("quarterly report", max_results=10)  # Search all emails
```

### Sending Emails

```python
outlook.send(to="alice@example.com", subject="Hello", body="Hi there!")
outlook.send(to="alice@example.com", subject="Hello", body="Hi!", cc="bob@example.com")
outlook.reply(email_id, body="Thanks for your message")
```

### Actions

```python
outlook.mark_read(email_id)     # Mark email as read
outlook.mark_unread(email_id)   # Mark email as unread
outlook.archive_email(email_id) # Move to archive folder
```

### Stats

```python
outlook.count_unread()   # Count unread emails in inbox
outlook.get_my_email()   # Get connected Microsoft email address
```

---

## Complete Example

```python
from connectonion import Agent, Outlook, Memory

outlook = Outlook()
memory = Memory()

agent = Agent(
    name="email-assistant",
    tools=[outlook, memory],
    system_prompt="You help manage Outlook emails and remember important info."
)

# Various tasks your agent can now do:
agent.input("Check unread emails and summarize them")
agent.input("Send an email to alice@example.com about the project update")
agent.input("Find all emails about the quarterly report")
agent.input("How many unread emails do I have?")
```

---

## Troubleshooting

### Missing Microsoft Mail scopes

Run `co auth microsoft`

### Credentials not found

Run `co auth microsoft`

### Token expired

Tokens auto-refresh. If issues persist, run `co auth microsoft` again.

---

## Related

- [Microsoft Integration](/microsoft-integration) - Full OAuth setup and calendar integration
- [Gmail](/gmail) - Gmail integration for Google users
