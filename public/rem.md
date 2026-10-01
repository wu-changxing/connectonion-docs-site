# co rem — your agent's memory

In REM sleep the brain replays the day and keeps what matters. **co rem** does
the same for your work. It reads your mail and your Codex and Claude Code
sessions, and keeps a Markdown page on each person, project and tool you work
with. Your agent reads those pages, so it picks up where you left off instead
of asking you again.

> Stable 1.8.10 includes the Experimental `co wiki` command. The opt-in
> **1.9.0a10 preview** includes `co rem` with the redesigned reader, a
> sortable People sheet, cited Facts and Insight, and a local SQLite index.
> The commands below describe the stable `co wiki` route.

## Try the REM preview

```bash
python -m pip install --upgrade 'connectonion==1.9.0a10'
co rem init
co rem open
```

The first run maps your sources and starts writing your own page and the
highest-priority pages. People, Organisations and Projects open as tables; a
person page leads with what is owed and cited facts. See the
[preview notes](/releases/1.9.0a10.md) for screenshots and current limits.

## Start

```bash
pip install connectonion
co auth google            # or: co auth microsoft — the mail it reads
co wiki init              # map 90 days of mail and sessions into pages; no model, no cost
co wiki open              # read the notebook in your browser
co wiki start             # approve what it reads, then turn on the daily update
```

`init` builds the frame: a page for each person you write to, each
organisation, each coding project and each installed skill, plus your own
page. Those pages start mostly empty. To fill your own page first, run
`co wiki investigate me --quick`; it reads a bounded sample and says how much
of the material it covered.

## What it is for

It is written for the times you come back, not for daily check-ins:

- **Pick up where you left off.** A project page says why you are doing it,
  where it stands, and what is still open.
- **Hand context to someone.** Pages are plain Markdown, so a project page can
  go to a colleague or to their agent without you in the room.
- **Look back on a period.** What you actually made, and what did not work.
- **Find a fact fast.** `co wiki search "term sheet"` searches every page
  without calling a model.

The top of a page is short; the detail, and the source of each claim, is
further down. These are the design goals
([#1580](https://github.com/openonion/connectonion/issues/1580)). The feature
is experimental, and how well each one works today varies.

## What it reads

| Source | How it gets in |
|---|---|
| Gmail | `co auth google`. 90 days of headers, then a private copy of each message body |
| Outlook | `co auth microsoft`, the same way |
| Codex sessions | Your local session files, read in place |
| Claude Code sessions | Your local session files, read in place |
| WhatsApp chats | Only the ones you add: `co wiki sources add whatsapp --chat <id>` |

`co wiki sources` shows what is on. `co wiki start` shows the sources, the
model and the schedule, and asks before anything is read on a schedule. It
asks again whenever any of them change.

## Where it keeps things

- **A folder on your machine**, `~/.co/wiki`: `people/`, `projects/`, `orgs/`,
  `skills/` and a few more, all Markdown.
- **Private materials stay there.** Saved mail bodies live in the notebook's
  `.state/` folder, which only you can read (`0700` folders, `0600` files).
  A mail body never goes into a page.
- **The model reads what it needs through your own login.** With the default
  runner, your mail is read by Codex through your own Codex account, and
  nothing is billed to OpenOnion.
- **Unattended runs are confined.** Codex runs with `--sandbox workspace-write`
  and Claude Code with `--permission-mode acceptEdits`. Either can write only
  inside the notebook's task folder, with no shell commands and no network.

## What runs the model

By default, **your own Codex plan**. It spends no OpenOnion credits. The
notebook reads Codex's weekly meter before and after every run:

- Investigation has a budget of **10 points** of your Codex week by default.
- It starts no new page once your week is **70%** used, so your own coding
  comes first.
- `co wiki status` shows both numbers.

You can switch to Claude Code (`co wiki config set runner claude-code model default`)
or to a model through `co ai`, including a local Ollama model
(`co wiki config set runner coai model ollama/qwen3`).

## What it costs, measured

| Step | What we measured |
|---|---|
| `co wiki init` | About 10 minutes to map 90 days of two mailboxes. No model, no tokens |
| `co wiki investigate me --quick` | 8–9 minutes in our runs (500 s and 536 s), covering 24 of 60 gathered items |
| A very large subject | Still millions of tokens: one took 8.2 million over three and a half hours |

The last row is a known limit. Investigation is moving from summarising
everything to searching the saved material
([#1850](https://github.com/openonion/connectonion/issues/1850)).

## Keeping it current

`co wiki start` installs a schedule on macOS. By default it runs at 03:00,
04:00, 06:00, 17:00, 18:00 and 19:00 local time, and a day's model calls are
capped. On Linux and Windows the schedule is not installed yet; run
`co wiki sync` yourself. `co wiki stop` turns it off and keeps your pages.

## Coming in stable 1.9.0

The preview already uses `co rem`. Its first run and reader are being tested
before the stable 1.9.0 release
([#1943](https://github.com/openonion/connectonion/issues/1943)).

## More

- [co wiki reference](/cli/wiki): every `--help` page, verbatim from the CLI
- [1.8.9 release notes](/releases): what shipped, and the known limits
- Why the name: [#1932](https://github.com/openonion/connectonion/issues/1932)
