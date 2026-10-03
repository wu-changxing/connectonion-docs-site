---
description: A REM notebook with written pages took 42 seconds to reopen. We traced repeated relationship searches and PDF previews, then kept the same reader output with less work.
tags: [REM, Memory, Design Journal]
---

# Opening a written notebook

A first `co rem init` map could open quickly after the recent reader changes.
But a notebook that had actual written memories still left its owner waiting.
Before a browser showed the local page, `co rem open` rebuilt the private HTML
snapshot. On one 810-record notebook with 227 written pages, the tagged a25
reader took 41.92 seconds to do that. Reopening a memory should feel like
returning to context, not waiting for a new investigation.

We traced the time to two kinds of repeated work. To make relationship links,
the reader tried a boundary-aware expression for each known name against each
written page, roughly 1.5 million searches in this notebook. For a source
dialog that shows only a short PDF excerpt, it also parsed cited PDFs far
beyond the excerpt. The work was real, but most of it could not change the
visible result.

One option was to cache the generated HTML. That would make repeated opens
fast, but it would add invalidation rules around local Markdown edits and
source changes. We chose to reduce the rebuild work instead. A case-folded
literal check now rules out most impossible relationship matches before the
original expression runs; the dotted and dotless I case stays on the original
path so Unicode matching is preserved. The source preview stops reading a PDF
once it knows the excerpt and whether more text remains. Investigation still
reads the full attachment when it needs it.

An independent AI role-based founder/UI review compared the tagged a25 reader
with the candidate on the same private notebook and machine. The rebuild fell
from 41.92 to 8.78 seconds. All 810 record paths and texts, 2,504
relationship edges and 738 source contexts matched, including attachment
contexts. The output file stayed private with 0600 permissions. The reviewer
also opened sampled desktop and phone pages, Full memory, source dialogs and
a PDF-backed person; no P1/P2 regression appeared in those samples. This was
not a human founder review or a claim that every page was audited.

The tradeoff is that reopening still rebuilds the snapshot and takes several
seconds on this notebook. We will revisit caching if larger written notebooks
remain slow after targeted work, or if edits can be invalidated without making
the reader's source trail stale. The larger historical memory effort still
needs a live model batch and claim-by-claim source review. Faster opening makes
what is already written easier to use; it does not prove those memories are
correct.

Preparing the preview also exposed a distribution mistake: the previous
package's uploaded description still recommended an older alpha, even though
the docs site showed the current one. PyPI preserves the uploaded text. The
candidate build checks the README's exact install command against the package
version and inspects the wheel metadata before tagging. A command copied from
the package page should install the code this article describes.

Read the [a26 release notes](/releases/1.9.0a26) for the exact preview pin and
limits, or [explore co rem](/rem) with an invented sample notebook before
installing.
