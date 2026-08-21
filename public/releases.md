# Release channels

ConnectOnion keeps normal stable installs separate from opt-in release work.
More than one feature train can be public at once: 1.7 is stabilizing while
new 1.8 work remains available as the highest preview.

**Current channels:** stable is `1.6.12`; the exact candidate being stabilized
for 1.7 is `1.7.0b4`; the latest opt-in preview is `1.8.0a1`. All three have
public PyPI artifacts and GitHub releases.

## Version meanings

| Version | Meaning |
|---|---|
| `1.6.12` | Current stable 1.6 maintenance release |
| `1.7.0b4` | Exact, feature-complete 1.7 candidate under release testing |
| `1.7.0rcN` | 1.7 candidate that may become stable unchanged |
| `1.7.0` | Stable/LTS 1.7 release |
| `1.7.1` | Maintenance fix after stable 1.7 |
| `1.8.0a1` | Latest incomplete, opt-in feature preview |

Patch numbers are not progress toward the next feature version. Alpha, beta,
and RC suffixes describe confidence in one feature train.

## Install stable

```bash
python -m pip install --upgrade connectonion
```

This remains on stable even after an alpha, beta, or RC is published.

## Test the stabilizing 1.7 candidate

Use the exact pin. This is the reproducible command for the 1.7 release gates:

```bash
python -m pip install --upgrade connectonion==1.7.0b4
co --version
```

Do not replace that command with a broad `--pre` upgrade. Package resolution
chooses the highest published version, so `--pre` currently follows 1.8 rather
than the stabilizing 1.7 line.

## Join the latest preview track

```bash
python -m pip install --pre --upgrade connectonion
```

The `--pre` flag is an explicit opt-in to the latest feature train. For a
reproducible 1.8 test, use an exact pin:

```bash
python -m pip install connectonion==1.8.0a1
```

## Stabilizing 1.7.0b4

The 1.7 product path uses OIP across Core, `@connectonion/react`, and O Chat.
The beta has passed the protected Python 3.10–3.13 matrix, native Windows
browser transport, Windows and macOS installed-wheel E2E, trusted publishing,
and independent public-byte verification.

The exact public wheel also passed normal clean-index installation, shared
browser-daemon responsiveness during a model-driven task, and the coordinated
production flow. In that flow, bounded Full access created and tested a Rust
project without approval prompts; Read only and Auto mode changes then completed
in the same O Chat session. The release-control inventory and evidence remain in
[issue #792](https://github.com/openonion/connectonion/issues/792).

This is still a beta. Promotion to RC requires every remaining release blocker
to close, including documentation alignment and credential-owner confirmation
for the historical-secret alerts. Stable 1.7.0 follows only after an exercised
candidate can ship unchanged.

## Design journal policy

Release notes record what changed. A Design Journal post records the problem,
alternatives, decision, tradeoffs, evidence, and the condition that would make
us revisit it. Meaningful feature launches, phase promotions, stable releases,
and material architecture decisions receive a public entry only after the
claimed PyPI package and GitHub Release are visible.

For the OIP boundary, see [The Work Room Is a View, Not a Second Agent](/blog/workroom-is-a-view).
