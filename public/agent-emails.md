# Agent Emails

Send and receive emails with simple functions. No config, no complexity.

## Quick Start

```python
from connectonion import send_email, get_emails

# Send an email
send_email("alice@example.com", "Hello!", "Welcome to our platform")

# Read your emails
emails = get_emails(unread=True)
for email in emails:
    print(f"{email['from']}: {email['subject']}")
```

## Two Capabilities

### Send Email

Send emails with zero configuration. Your agent gets a unique email address automatically.

**Function**: `send_email(to, subject, message)`

**Features:**
- Simple function: `send_email(to, subject, message)`
- Works with any email provider (IMAP)
- Zero config for sending (OpenOnion)
- Best for simple automation

### Receive Emails

Read emails from any IMAP inbox. Works with Gmail, Outlook, or any provider.

**Function**: `get_emails(last=10, unread=False)`

**Features:**
- Simple functions: `get_emails`, `mark_read`
- Works with any email provider (IMAP)
- Best for simple automation

## All Functions

### Sending (via OpenOnion - zero config)

```python
send_email(to, subject, message)     # Send an email
```

### Receiving (via IMAP - any provider)

```python
get_emails(last=10, unread=False)    # Get emails from inbox
mark_read(email_id)                  # Mark as read
mark_unread(email_id)                # Mark as unread
```

## Agent Emails vs Gmail

### Agent Emails (This page)

✅ Simple functions: send_email, get_emails  
✅ Works with any email provider (IMAP)  
✅ Zero config for sending (OpenOnion)  
✅ Best for simple automation

### Gmail (OAuth)

✅ Full Gmail class with 15+ methods  
✅ Labels, archive, star, trash  
✅ Advanced search & CRM features  
✅ Best for Gmail power users

Need more features? Check out [Gmail](/gmail) for full inbox management.

## Examples

### Basic Email Workflow

```python
from connectonion import get_emails, send_email, mark_read

# Check for new emails
new_emails = get_emails(unread=True)

for email in new_emails:
    print(f"New from {email['from']}: {email['subject']}")
    
    # Process the email
    if process_email(email):
        mark_read(email['id'])  # Only mark if processed successfully
```

### Reply to Emails

```python
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

### Email Notifications

```python
from connectonion import send_email

# Send notification
send_email(
    "user@example.com",
    "Order shipped",
    "Your order has been shipped. Track it: ABC123"
)

# Alert notification
send_email(
    "admin@example.com",
    "🚨 High CPU usage detected",
    "Server CPU at 95% for the last 5 minutes"
)
```

## Philosophy

**Simple functions for everything email:**
- `send_email()` - Send emails
- `get_emails()` - Read emails
- `mark_read()` - Mark as processed

No complexity. No confusion. Just email.

Keep simple things simple.

