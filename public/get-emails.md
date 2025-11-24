# Get Emails

> Check your inbox with one line. Process emails safely. Keep it simple.

## Quick Start (10 seconds)

```python
from connectonion import get_emails

# Get your emails
emails = get_emails()
```

**That's it.** You have your emails.

## Core Concept

Three functions. That's all:

```python
get_emails(last=10, unread=False)  # Get emails
send_email(to, subject, message)   # Send email
mark_read(email_id)                # Mark as read after processing
```

**Important**: Emails are NOT auto-marked as read. You control when to mark them.

## Setup

Set your email credentials:

```bash
export EMAIL_ADDRESS="you@example.com"
export EMAIL_PASSWORD="your-app-password"
export IMAP_SERVER="imap.gmail.com"  # Optional, defaults to Gmail
```

**Gmail users:** Use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

## Common Patterns

### Check for new emails

```python
from connectonion import get_emails, mark_read

# Get unread emails
new_emails = get_emails(unread=True)

for email in new_emails:
    print(f"New from {email['from']}: {email['subject']}")

    # Process the email
    if process_email(email):
        mark_read(email['id'])  # Only mark if processed successfully
```

### Get latest email

```python
# Get just the most recent email
emails = get_emails(last=1)
if emails:
    latest = emails[0]
    print(f"Latest: {latest['subject']}")
```

### Reply to emails

```python
from connectonion import get_emails, send_email, mark_read

# Check and reply pattern
for email in get_emails(unread=True):
    if "urgent" in email["subject"].lower():
        # Send reply
        send_email(
            email["from"],
            f"Re: {email['subject']}",
            "I'm on it!"
        )
        # Mark as handled
        mark_read(email['id'])
```

## API Reference

### get_emails(last=10, unread=False)

Fetch emails from your inbox.

- `last` - Number of emails to fetch (default: 10)
- `unread` - Only fetch unread emails (default: False)

Returns list of email dicts with: id, from, subject, date, body

### mark_read(email_id)

Mark an email as read.

- `email_id` - The email ID from get_emails()

### mark_unread(email_id)

Mark an email as unread.

- `email_id` - The email ID from get_emails()

## Email Agent Example

```python
from connectonion import Agent, get_emails, send_email, mark_read

def check_inbox() -> str:
    """Check inbox for new emails."""
    emails = get_emails(unread=True)
    if not emails:
        return "No new emails"
    return f"Found {len(emails)} unread emails:\n" + "\n".join(
        f"- {e['from']}: {e['subject']}" for e in emails
    )

def reply_to_email(email_id: str, message: str) -> str:
    """Reply to an email by ID."""
    emails = get_emails(last=50)
    email = next((e for e in emails if e['id'] == email_id), None)
    if not email:
        return "Email not found"

    send_email(email['from'], f"Re: {email['subject']}", message)
    mark_read(email_id)
    return f"Replied to {email['from']}"

agent = Agent(
    name="email-assistant",
    tools=[check_inbox, reply_to_email],
    system_prompt="You help manage emails. Check inbox and reply as needed."
)

agent.input("Check my inbox and summarize what's there")
```

## get_emails vs Gmail

| Feature | get_emails (IMAP) | Gmail (OAuth) |
|---------|-------------------|---------------|
| Setup | EMAIL_PASSWORD env var | `co auth google` |
| Provider | Any email provider | Gmail only |
| Features | Basic read/mark | Full inbox management |
| Best for | Simple automation | Advanced Gmail features |

Need more features? Check out [Gmail](/gmail) for full inbox management with labels, archive, search, and CRM features.
