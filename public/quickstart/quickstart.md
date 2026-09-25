# Quick Start

CLI is all you need. Every step here is one `co` command in your terminal:
no Python file, no OAuth app, no API key. Output shown is what the CLI prints;
addresses are shortened.

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

## 3. Its own email — no DNS

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

There is no SendGrid account and no SPF, DKIM or MX records to add.
→ [co email](/cli/email)

## 4. Connect your Gmail — no OAuth app

```bash
co auth google
```

```text
Opening Google consent. Credentials will be saved only on this computer.
Google connected. Actual granted scopes saved locally. Next: co status
```

Consent runs through OpenOnion's Google app, so you create no cloud project and
no consent screen. The credentials come back encrypted to a one-time key your
CLI generated. Then:

```bash
co gmail inbox                 # numbered list of recent mail
co gmail read 1                # one email's full body
co gmail reply 1 "Thanks, on it."
co gcalendar today             # today's events
co gdrive list                 # recent Drive files
```

Outlook works the same way: `co auth microsoft`, then `co outlook inbox`.
→ [co gmail](/cli/gmail) · [co outlook](/cli/outlook) · [co gcalendar](/cli/gcalendar) · [co gdrive](/cli/gdrive)

## 5. A real browser — no Playwright script

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

## 7. Plug it into Claude Code and Codex

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

## 8. Talk to your own agent

```bash
co ai
```

`co ai` starts the ConnectOnion AI coding agent and prints a
`chat.openonion.ai` link. Open it in a browser, or send it to someone: they
install nothing. `co ai "summarise my unread mail"` runs one prompt and exits.
→ [co ai](/cli/ai)

## 9. See everything

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
