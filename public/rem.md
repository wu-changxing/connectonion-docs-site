# REM — wake up with the context you need

REM is named for rapid eye movement sleep. It works from sources you approve,
keeps a local notebook about people and projects, and brings context forward
when you return. The opt-in `co rem` 1.9.0a14 alpha begins the reader with pages
touched by the latest pass, an existing link between pages, open threads, and
an older memory to recall before revealing it.

The reader image on this page is a real product frame made with an invented
notebook. No private correspondence is in the example.
[Explore the full-size sample reader](/rem/demo) to follow a page, inspect a
source record, and reveal an older memory before installing the alpha. The
sample is frozen on 1 October 2026 and uses only invented people and sources.

## Start the opt-in preview

```bash
python -m pip install --upgrade 'connectonion==1.9.0a14'
co auth google               # or: co auth microsoft
co rem init --days 5          # a smaller first-run trial
co rem open                   # read a local, offline snapshot
co rem start                  # review sources and approve a schedule
```

`co rem init` maps mail and local coding sessions, then uses the configured
model to investigate your page, recent important people, active projects and
related organizations, including in scripts and JSON runs. It estimates the
work before spending tokens. Roughly 20% of a weekly runner allowance is a
target; the selected investigation can use more to finish, subject to the
configured safety floor. `co rem start` shows which sources, runner, model,
schedule and limits will be used and asks before enabling background updates.
`co rem stop` turns the schedule off without deleting the notebook. Run
`co rem open` again to render a newer snapshot.

## What the morning reader can show

- Up to three pages touched by the latest pass, with their current statement
  and a route to the page and its sources.
- A connection already written as a link between two pages. Proposed links
  remain questions for review.
- A question from an older page. You can pause before revealing what that page
  already says; the reveal is not a learning score.
- Open threads: what is waiting on you and what others owe you.
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

REM can use connected Gmail and Outlook mail and local Codex and Claude Code
sessions. WhatsApp chats are optional and selected by chat. The notebook lives
on your machine under `~/.co/rem`; its readable pages are Markdown, and raw
source material stays in the notebook's private state. Pages link to source
records so you can inspect why REM wrote a claim. The CLI reference describes
[the exact source, review, and budget controls](/cli/rem).

## Stable channel

The default `pip install connectonion` channel remains stable 1.8.10. Its
experimental memory command is `co wiki`. The `co rem` alpha requires the
exact version pin above. Preview releases can change before 1.9.0 is stable.
Read [release channels](/releases) and the
[1.9.0a14 notes](/releases/1.9.0a14.md) before installing.
