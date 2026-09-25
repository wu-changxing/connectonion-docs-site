# Every co command

ConnectOnion is the agent CLI harness: 42 top-level commands, one `co` prefix. This page is generated from `co commands` on 1.8.8, the summaries verbatim. Run `co commands` for the same list in your terminal, or add `--help` to any command.

```bash
pip install connectonion
co init          # your agent's keypair and 0x address
co auth          # sign in; $5 of model credit, no API key
co commands      # this page, in your terminal
```

## Identity & account

| Command | What it does | Subcommands |
|---|---|---|
| [`co init`](/cli/init) | Initialize global ~/.co/keys.env, or use co init ./ for a project. | — |
| [`co setup`](/cli/setup) | Set up your global ~/.co/ — identity, agent.json, and skill library. | — |
| [`co auth`](/cli/auth) | Sign in to OpenOnion (login, status, logout) or connect a service. | login · status · logout · google · microsoft · feishu · lark |
| `co keys` | Show agent keys and credentials. | — |
| [`co env`](/cli/env) | Show, set and remove settings in the selected env file (global ~/.co/keys.env unless --env-file was given). | show · path · get · set · rotate · unset |
| `co status` | Check credential sources, account status, and deployments. | — |
| `co trust` | Manage trust lists (contacts, whitelist, blocklist, admins) | list · level · add · remove · block · unblock · admin |
| `co transfer` | Send credits to another agent address (irreversible, confirms first), or list transfers. | — |
| `co doctor` | Diagnose installation. | — |
| `co commands` | List every command, including subcommands, one per line with its summary. | — |
| `co reset` | Reset account (destructive). | — |

## Mail & calendar

| Command | What it does | Subcommands |
|---|---|---|
| [`co email`](/cli/email) | Send and read email from the agent's address | send · inbox · read · addresses · default · name · share · unshare · upgrade · sent |
| [`co gmail`](/cli/gmail) | Send and read email from your Gmail account. | inbox · read · reply · send · sent · search · mark · archive · star · attachments · download · unanswered · draft · label |
| [`co outlook`](/cli/outlook) | Your Outlook account: mail, scheduled sends, contacts and calendar. | send · inbox · read · download · reply · scheduled · cancel · sent · search · contact · calendar |
| [`co gcalendar`](/cli/gcalendar) | Google Calendar events and Meet links. | list · today · read · meetings · free · create · meet · update · delete |

## Chat apps

| Command | What it does | Subcommands |
|---|---|---|
| [`co whatsapp`](/cli/whatsapp) | WhatsApp as an inbox: listen, receive, send, reply. | listen · receive · send · reply · edit · delete · react · done · check · ls · chats · log · consume · group |
| [`co telegram`](/cli/telegram) | Telegram bot: send, plus experimental listen, receive and reply. | send · listen · receive · reply · done · check · ls · chats · log · consume |
| [`co discord`](/cli/discord) | Experimental: Discord bot as an inbox: listen, receive, send, reply. | listen · receive · send · reply · done · check · ls · chats · log · consume |
| [`co feishu`](/cli/feishu) | Feishu bot as an inbox: listen, receive, send, reply. | listen · receive · send · reply · done · check · ls · chats · log · consume |
| [`co lark`](/cli/feishu) | Lark (global Feishu) bot as an inbox: listen, receive, send, reply. | listen · receive · send · reply · done · check · ls · chats · log · consume |
| [`co sms`](/cli/sms) | Pair a phone and read the Agent's encrypted SMS inbox | pair · inbox · devices |

## Browser & network

| Command | What it does | Subcommands |
|---|---|---|
| [`co browser`](/cli/browser-command) | Drive one persistent browser. | do · tab · network · cookies · status · close · config · help |
| `co remote-browser` | Manage an owner-bound browser session on a remote agent over OIP. | config · start · status · sessions · stop · diagnose |
| [`co proxy`](/cli/proxy) | Share this computer's internet connection with an authorized agent. | share · status · stop · diagnose |
| [`co call`](/cli/call) | Run one command on a remote agent and print the result (no LLM). | — |

## Files & media

| Command | What it does | Subcommands |
|---|---|---|
| [`co gdrive`](/cli/gdrive) | List, search, download, and upload Google Drive files. | list · search · info · get · put · rm |
| [`co syno`](/cli/synology) | Connect to a Synology NAS, inspect its state and manage everyday files. | login · logout · status · ls · info · search · download · upload · mkdir · copy · move · get · put · shares · nas · network · storage · service · share |
| [`co youtube`](/cli/youtube) | YouTube Data API using your saved Google login. | channel · list · video · put · update |
| [`co tiktok`](/cli/tiktok) | Experimental: TikTok post plans and read-only readiness. Nothing is uploaded. | post · inspect |

## Coding agents & memory

| Command | What it does | Subcommands |
|---|---|---|
| `co claude` | Experimental: Run Claude Code through the ConnectOnion session connector. | run |
| [`co skills`](/cli/skills) | Discover, copy, list and link existing SKILL.md files; does not author or benchmark them. | discover · copy · manifest · list · link |
| [`co sub`](/cli/sub) | Follow public skills: co sub sync <0xaddress> once; co sub refreshes all saved publishers | sync · list · remove |
| `co announce` | Publish ~/.co/agent.json + SKILL.md bodies (publish:true) to the relay. | — |
| [`co wiki`](/cli/wiki) | Experimental: Personal Wiki — map first, investigate next. Targets 1.9.0. | init · investigate · open · list · show · search · start · stop · status · sync · logs · doctor · advanced · scan · map-skills · stub · reflect · reflections · propose · review · abstract · capture · sources · config |

## Build & test

| Command | What it does | Subcommands |
|---|---|---|
| [`co ai`](/cli/ai) | Start AI coding agent or run one-shot prompt. | — |
| [`co create`](/cli/create) | Create new project. | — |
| [`co copy`](/cli/copy) | Copy built-in tools/plugins to customize. | — |
| [`co benchmark`](/cli/benchmark) | Author the standard BEFORE editing a skill. | list · check |
| [`co eval`](/cli/benchmark) | Run a benchmark with the real Agent and inspect scored reports. | run · report · legacy |

## Run & ship

| Command | What it does | Subcommands |
|---|---|---|
| [`co deploy`](/deploy) | Deploy to ConnectOnion Cloud, or with --to onto a server you own. | — |
| [`co server`](/cli/server) | Register, list and preflight the servers you can deploy to | add · ls · check · new · ssh · fix-key · forget · destroy |
| [`co schedule`](/cli/schedule) | This agent's own recurring work, from .co/schedule.yaml: see it, check it, run an entry now, pause or resume one. | list · check · run · pause · resume |

Commands without a link have no guide yet; their `--help` is the reference.
