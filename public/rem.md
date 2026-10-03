# co rem — wake up with the context you need

co rem is named for rapid eye movement sleep. It works from sources you approve,
keeps a local notebook about people and projects, and brings context forward
when you return. The opt-in `co rem` 1.9.0a32 alpha investigates the full
mapped cohort concurrently, checks written Project claims against their
originals, and makes cited Skill work openable from the local reader.
The first source map shows what it found and which records still need
investigation. After a written pass, the reader begins with pages touched, open threads
and an older memory to recall. Records open as focused views of state, next
exchanges, facts and connected
context.

The reader image on this page is a real product frame made with an invented
notebook. No private correspondence is in the example.
[Explore the full-size sample reader](/rem/demo) to follow a page, inspect a
source record, and reveal an older memory before installing the alpha. The
sample is frozen on 2 October 2026 and uses only invented people and sources.

## Start the opt-in preview

```bash
python -m pip install --upgrade 'connectonion==1.9.0a32'
co auth google               # or: co auth microsoft
co rem init --days 5          # a smaller first-run trial
co rem open                   # read a local, offline snapshot
co rem start                  # review sources and approve a schedule
```

`co rem init` maps mail and local coding sessions, then uses the configured
model to investigate your page, eligible people, queued projects, related
organizations and installed skills, including in scripts and JSON runs. It estimates the
work before spending tokens. Roughly 35% of a weekly runner allowance is a
target; the selected investigation can use more to finish, subject to the
configured safety floor. The first run selects projects from the map it just
showed. Session folders found afterward remain candidates and do not silently
add project pages to that count. `co rem start` shows which sources, runner, model,
schedule and limits will be used and asks before enabling background updates.
Written project pages compare the owner's project-specific coding requests with
fixed, bounded local repository evidence. The current supported finding leads,
partial session coverage is marked, and every numbered source can be opened.
An old README documents its own snapshot, and a local commit does not prove a
passing test or public release.
Skill pages keep the mapped invocation name, distinguish the intended result
from inspected work, and link local output files beside concrete findings when
those files are available. A run report alone does not prove its output quality.
Busy Gmail weeks are split without fetching the same message headers twice;
requests now have a bounded timeout and retry.
`co rem stop` turns the schedule off without deleting the notebook. Run
`co rem open` again to render a newer snapshot.
The reader runs locally and works offline. It inherits the a12 fix for Windows
snapshot opening.

## What the morning reader can show

- Up to three pages touched by the latest pass, with their current statement
  and a route to the page and its sources. Cited Facts and Contact value changes
  are shown separately from page rewrites.
- Direct page links, unambiguous name mentions and backlinks, each labeled by
  its basis. A mention helps navigation; it does not prove a relationship.
- A question from an older page. You can pause before revealing what that page
  already says; the reveal is not a learning score.
- Open threads: what is waiting on you and what others owe you, with a complete
  action view and direct record links.
- Focused people and project records with dated activity, compact facts,
  decisions when recorded, and the full memory and sources visible on the page.
- Skill records with openable cited run parts and local outputs when available.
- Archived original excerpts and cited conversations when the source bodies
  are available locally.
- The last pass's counts and run history, available in a disclosure.

Completed nightly passes can compare cited, keyed Facts and Contact values
before and after the run. Other prose changes remain page-level, and older run
logs cannot be compared retroactively. Revealing an older answer still does
not measure retention. [Broader claim comparison](https://github.com/openonion/connectonion/issues/2096),
[durable recall](https://github.com/openonion/connectonion/issues/2097), and
[source-backed questions and approved actions](https://github.com/openonion/connectonion/issues/2071)
are open work. The [product audit](https://github.com/openonion/connectonion/blob/main/docs/design-evidence/rem-product-audit-2026-10-01.md)
tracks the ten largest design and product problems.

## Sources and storage

co rem can use connected Gmail and Outlook mail and local Codex and Claude Code
sessions. WhatsApp chats are optional and selected by chat. The notebook lives
on your machine under `~/.co/rem`; its readable pages are Markdown, and raw
source material stays in the notebook's private state. Pages link to source
records so you can inspect why co rem wrote a claim. The CLI reference describes
[the exact source, review, and budget controls](/cli/rem).

## Stable channel

The default `pip install connectonion` channel remains stable 1.8.10. Its
experimental memory command is `co wiki`. The `co rem` alpha requires the
exact version pin above. Preview releases can change before 1.9.0 is stable.
Read [release channels](/releases) and the
[1.9.0a32 notes](/releases/1.9.0a32) before installing.
