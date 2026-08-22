# Release channels

ConnectOnion keeps normal stable installs separate from opt-in release work.
More than one feature train can be public at once: 1.7 is stabilizing while
new 1.8 work remains available as the highest preview.

**Current channels:** stable is `1.6.12`; the exact candidate being stabilized
for 1.7 is `1.7.0b10`; the latest opt-in preview is `1.8.0a1`. All three have
public PyPI artifacts and GitHub releases.

## Version meanings

| Version | Meaning |
|---|---|
| `1.6.12` | Current stable 1.6 maintenance release |
| `1.7.0b10` | Exact, feature-complete 1.7 candidate under release testing |
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
python -m pip install --upgrade connectonion==1.7.0b10
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

## How a candidate earns promotion

Each release gate starts from the exact published package, launches its real
`co ai` Host, and connects the production O Chat build through a real browser.
The acceptance flow exercises a deterministic catalog search and attachment
download through `co browser`, C, C++, and Rust projects, native Codex
delegation, permission modes, cancellation, Host restart, and reconnect
without resending the last prompt.

The run produces screenshots, sanitized logs, and a hash-addressed manifest.
UI text alone cannot mark the gate as passed: process state, workspace output,
reconnect state, and the absence of a duplicate input are checked independently.
A failed gate stays failed and feeds the next issue and PR.

Backend promotion also collects the complete mocked `oo-api` test tree.
Integration and live-provider cases stay explicit, but a new billing or API
contract test cannot sit outside CI just because it was added in a separate
test module.

## Stabilizing 1.7.0b10

The 1.7 product path uses OIP across Core, `@connectonion/react`, and O Chat.
The beta has passed the protected Python 3.10–3.13 matrix, native Windows
browser transport, Windows and macOS installed-wheel E2E, trusted publishing,
and independent public-byte verification.

The public 1.7.0b4 gate exposed one difference between hosted and headless Auto:
without a dialog channel, an outside-workspace write could skip the classifier.
Beta 5 applied the deterministic boundary in both paths. Its exact public wheel
passed a denied outside Auto write, left the target absent, and then completed
the same outside read and write plus Todo lifecycle under explicit bounded Full
access. Beta 10 is the latest published 1.7 artifact. Its exact Core package and
O Chat build at `3eb9bbb` passed localhost first-run invite authentication, real
browser/C/C++/Rust work, native Codex delegation, Full access, Read only, Auto,
Stop, Host restart, Reconnect, conversation/composer checks, and independent
desktop/tablet/mobile UI review. The Work Room client/composer correction merged
afterward, so it is not Beta 10 artifact evidence. The next synchronized candidate
is `v1.7.0rc1`; it must include that correction and repeat the expanded gate,
including real browser catalog search and attachment download, before stable
promotion, as recorded in
[issue #792](https://github.com/openonion/connectonion/issues/792).

Work Room is the remote client for that native provider session, not a status
panel. Attributed user/provider messages and the provider-targeted composer stay
visible through running, approval, Stop, reconnect, and terminal states. A state
that cannot accept input disables the composer and explains why; it does not
delete the conversation controls.

Beta 10 is still a beta. RC1 is the next synchronization and testing candidate;
it is not stable approval. Real Codex and Claude provider smokes, upgrade and
rollback coverage, backend reconciliation, release protection, and the full
release-candidate acceptance window must all close before stable promotion.
Historical-secret alerts have been cleared. Stable 1.7.0 follows only after an
exercised RC can ship unchanged.

## Design journal policy

Release notes record what changed. A Design Journal post records the problem,
alternatives, decision, tradeoffs, evidence, and the condition that would make
us revisit it. Meaningful feature launches, phase promotions, stable releases,
and material architecture decisions receive a public entry only after the
claimed PyPI package and GitHub Release are visible.

For the OIP boundary and remote-client UI contract, see
[The Work Room Is a Client, Not a Status Panel](/blog/workroom-is-a-view).
