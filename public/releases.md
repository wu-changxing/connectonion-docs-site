# Release channels

ConnectOnion keeps the current stable line separate from the next feature
train. Preview releases are opt-in and do not replace the version normal users
receive from pip.

**Current channels:** stable is `1.6.11`; the current opt-in preview is
`1.7.0a18`. The preview line is published only after its exact PyPI artifact
and GitHub prerelease are visible.

## Version meanings

| Version | Meaning |
|---|---|
| `1.6.11` | Current stable 1.6 maintenance release |
| `1.7.0a18` | Current incomplete, opt-in 1.7 alpha |
| `1.7.0b1` | Feature-complete 1.7 beta |
| `1.7.0rc1` | Candidate that may become stable unchanged |
| `1.7.0` | Stable/LTS 1.7 release |
| `1.7.1` | Maintenance fix after stable 1.7 |

Patch numbers are not progress toward the next feature version. New 1.7
features are tested as `1.7.0aN`, `1.7.0bN`, and `1.7.0rcN`.

## Install stable

```bash
python -m pip install --upgrade connectonion
```

This remains on stable even after an alpha, beta, or RC is published.

## Join the preview track

```bash
python -m pip install --pre --upgrade connectonion
```

The `--pre` flag is the explicit opt-in. For reproducible testing, exact pins
do not need it:

```bash
python -m pip install connectonion==1.7.0a18
```

## Preview 1.7.0a18

The 1.7 preview is an OIP product path. `co ai` exposes only the native Codex
and Claude Code adapters. It has no ACP switch, ACP browser surface, or second
TypeScript SDK. `@connectonion/react` is the single browser protocol client,
and O Chat pins one reviewed React artifact before it deploys.

This alpha validates an honest native coding-agent Work Room: a compact parent
card, a single scrolling detail surface, a narrow approval decision, and
correlated Stop acknowledgement. A direct Codex follow-up is acknowledged only
after native `turn/steer` or resumed `turn/start` accepts it—never simply when
the Host queues a mailbox frame. The Host assigns a monotonic provider-state
revision to each native invocation, so stale reconnect state cannot revive an
older decision.

O Chat shows a thumbnail only when the provider supplies a verified raster for
that exact revision. It never turns command text, terminal output, paths, or a
session identifier into a pretend screenshot. Without real evidence, the
text-first surface is intentional.

The candidate remains opt-in while Core, `@connectonion/react`, and O Chat
acceptance runs verify multi-step Codex work, direct follow-up, approvals, Stop
handling, reconnect behavior, and mobile layout together. Native adapter
command, workspace root, sandbox, and approval ceiling remain operator-owned.

## Design journal policy

Release notes record what changed. A Design Journal post records the problem,
alternatives, decision, tradeoffs, evidence, and the condition that would make
us revisit it. Meaningful feature launches, phase promotions, stable releases,
and material architecture decisions receive a public entry only after the
claimed PyPI package and GitHub Release are visible.

For this preview, see [The Work Room Is a View, Not a Second Agent](/blog/workroom-is-a-view).
