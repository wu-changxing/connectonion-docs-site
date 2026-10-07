# co rem — wake up with the context you need

co rem is named for rapid eye movement sleep. It turns mail and local coding
sessions you approve into a private notebook about people, projects and skills.
When you return, it brings forward what changed, what needs attention and the
original sources behind its claims.

Stable 1.9.0 maps the sources first, investigates every eligible mapped page
in the 90-day window concurrently, and shows the full memory and its sources
in the local reader. Skill usage says when a number is only a coding-session name match;
retained evaluation attempts are counted separately, and neither count proves
that the installed version ran or the task succeeded. The latest
[release notes](/releases/1.9.0) describe the installed-package trial and
bounded phone and desktop checks. Earlier previews remain in the
[release archive](/releases/archive).

The reader image on this page is a real product frame made with an invented
notebook. No private correspondence is in the example.
[Explore the full-size sample reader](/rem/demo) to follow a page, inspect a
source record, and reveal an older memory before installing. The
sample is frozen on 2 October 2026 and uses only invented people and sources.

## Start with the stable release

```bash
python -m pip install --upgrade connectonion
co auth google               # or: co auth microsoft
co rem init --days 90         # investigate the full selected 90-day map
co rem open                   # read a local, offline snapshot
co rem start                  # review sources and approve a schedule if init left it off
```

`co rem init` maps mail and local coding sessions, then uses the configured
model to investigate your page, every eligible person, queued projects, related
organizations and installed skills, including in scripts and JSON runs. It estimates the
work before spending tokens and checks selected-model access with a source-free
turn. The foreground first run has no REM page or weekly quota stop; a model
provider can still enforce its own limits. Progress reports how many messages,
people, projects, organisations and skills have been processed. The input
estimate includes cached tokens and is not the weekly quota meter. The first run selects projects from the map it just
showed. Session folders found afterward remain candidates and do not silently
add project pages to that count. A failed page leaves nightly upkeep off and
names the unfinished work. `co rem start` shows which sources, runner, model,
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
  Project purpose citations stay reachable beside the purpose preview.
- Skill records with openable cited run parts and local outputs when available.
  A cited lead finding has direct, phone-sized links to its numbered sources.
  Usage counts match skill names in coding sessions; separate retained eval
  attempts may differ, and neither verifies the installed version or outcome.
- Archived original excerpts and cited conversations when the source bodies
  are available locally. Long source dialogs offer Find and Next match inside
  the visible original, including a notice when the retained excerpt is truncated.
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

The default `pip install connectonion` channel is stable 1.9.0 and includes
`co rem`. Read [release channels](/releases) and the
[1.9.0 notes](/releases/1.9.0) for the tested scope and remaining limits.
