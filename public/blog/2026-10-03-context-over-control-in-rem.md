---
description: The a28 REM investigation now searches supplied archives and live project files, with source trails that make its claims checkable.
tags: [REM, Memory, Design Journal]
---

# Give the investigator the sources it needs

A project memory needs to say what changed and why it matters, with a way to
check each claim. The earlier REM investigation path handed a model sampled
excerpts and a prewritten repository snapshot. A quick pass kept at most 24
items and clipped each to 2,500 characters. This bounded the input, but it
also hid older messages and prevented a direct check of current project files.

We considered continuing to enlarge the prebuilt prompt. That would move the
limit without letting the investigator follow a lead. The 1.9.0a28 preview
instead gives tool-capable investigations the evidence index, local archives,
live repository paths and authorized shell tools. A project turn can inspect
relevant files and Git history before writing, then cite source IDs and dated
revisions. The run record preserves what was supplied and what the model says
it actually inspected. A supplied path alone never proves a claim.

This choice gives the model broad local access during an investigation. The
source material can include untrusted incoming mail, so the resulting page
still needs a source check. Traceability is a way to inspect and reject weak
claims; it does not guarantee that every claim is right. Summary-tier models
also cannot follow live file leads in the same way, and we have no measured
speed or token saving to claim yet.

The next real `co rem init` run is the decision test: check whether its pages
contain useful findings from original sources, whether citations actually
support those findings, and whether the broader search spends the intended
budget without making the first run impractically slow. If it does not, the
prompt and source selection need another round before the architecture earns
its place.

Read the [a28 preview notes](/releases/1.9.0a28) for the exact change and
[explore co rem](/rem) before trying a current preview.
