# Quick Start

Every step here is a `co` command you run in your terminal. You won't write
any Python or need an API key. The output shown is what the CLI prints, with
addresses shortened.

## 1. Install

```bash
pip install connectonion
```

Python 3.10 or newer. This installs the `co` command.

## 2. Give your agent an identity

```bash
co init
```

```text
🚀 Welcome to ConnectOnion!
✨ Setting up global configuration...
  ✓ Generated master keypair
  ✓ Your address: 0xcbef...3318
  ✓ Created ~/.co/keys.env
✓ Saved to ~/.co/keys.env
✓ Authenticated (Balance: $5.00)
✓ Global configuration: ~/.co/keys.env
```

That one command gives your agent three things:

- a keypair and a `0x` address, which is its identity everywhere
- an OpenOnion account with **$5 of credit** for managed models, so no OpenAI,
  Anthropic or Google key is needed to start
- its own mailbox at `0x…@mail.openonion.ai`

See it all with `co status`:

```text
│ Agent Address:
│ 0xcbef…3318
│ Email: 0xcbef…@mail.openonion.ai
│ Balance: $5.0000
```

`co status` also lists every credential it can see (OpenAI, Anthropic, Gemini,
Telegram, Discord …) and keeps the values hidden.

## 3. Send and read email

```bash
co email inbox
```

```text
Inbox: no emails
Send one: co email send <to> "<subject>" "<body>"
```

```bash
co email send you@example.com "Hello" "Sent by my agent."
```

The mailbox is hosted by OpenOnion, so you don't need an email provider or
any DNS records.
→ [co email](/cli/email)

## 4. Connect Gmail

```bash
co auth google
```

```text
Opening Google consent. Credentials will be saved only on this computer.
Google connected. Actual granted scopes saved locally. Next: co status
```

Consent runs through OpenOnion's Google app, so you don't create a Google Cloud
project or a consent screen. The credentials come back encrypted to a one-time key your
CLI generated. Then:

```bash
co gmail inbox                 # recent mail, numbered, with a listing ID
co gmail read 1 --listing <id> # one email's full body
co gmail reply 1 "Thanks, on it." --listing <id>
co gcalendar today             # today's events
co gdrive list                 # recent Drive files
```

Outlook works the same way: `co auth microsoft`, then `co outlook inbox`.
→ [co gmail](/cli/gmail) · [co outlook](/cli/outlook) · [co gcalendar](/cli/gcalendar) · [co gdrive](/cli/gdrive)

## 5. Drive a browser

```bash
co browser go_to https://example.com
co browser get_text
co browser do "find the pricing page and summarise the plans"
```

`co browser` keeps one real browser open, so a login you finish by hand,
2FA included, stays valid for every later command. `co browser help` lists
every function. → [co browser](/cli/browser-command)

## 6. Chat apps

```bash
co whatsapp listen             # scan the QR once; every message becomes a file
co whatsapp receive            # the next message, as one JSON line
co telegram send <chat> "Deploy finished."
```

Feishu, Lark and Discord use the same verbs (`listen`, `receive`, `send`,
`reply`). SMS is `co sms pair`.
→ [co whatsapp](/cli/whatsapp) · [co telegram](/cli/telegram) · [co discord](/cli/discord) · [co feishu](/cli/feishu) · [co sms](/cli/sms)

## 7. Use it from Claude Code and Codex

```bash
co skills link
```

```text
            Linking 30 bundled skill(s)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━┓
┃ Skill                          ┃ claude ┃ codex  ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━┩
│ agent-identity                 │ linked │ linked │
│ co-browser                     │ linked │ linked │
│ co-google                      │ linked │ linked │
│ co-inbox                       │ linked │ linked │
│ …                              │        │        │
Next: What is linked now:  co skills list
```

Everything above is a shell command, so a coding agent needs only its shell
and these skills. Ask Claude Code or Codex to "check my Gmail" and it can run
`co gmail inbox` itself. → [co skills](/cli/skills)

## 8. Chat with your agent

```bash
co ai
```

`co ai` starts the ConnectOnion AI coding agent and prints a
`chat.openonion.ai` link. Open it in a browser, or send it to someone: they
install nothing. `co ai "summarise my unread mail"` runs one prompt and exits.
→ [co ai](/cli/ai)

## 9. Find other commands

```bash
co commands                    # every command and subcommand, one per line
co <command> --help            # the reference for any of them
co doctor                      # if something is off
```

There are 42 top-level commands: memory (`co wiki`), your own servers
(`co deploy --to`, `co server ssh`), schedules (`co schedule`), remote agents
(`co call`) and more. → [All co commands](/cli)

## Next

- **Use a different model.** Put your own OpenAI, Anthropic or Google key in
  `~/.co/keys.env` with `co env set`; managed `co/` models keep working.
- **Build your own agent in Python.** The same capabilities are Python tools:
  `co create my-agent`, then read the [Python SDK](/agent).
