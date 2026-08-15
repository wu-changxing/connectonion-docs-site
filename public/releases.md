# Release channels

ConnectOnion has two release channels:

- **Stable** is the default `pip install connectonion` channel for production.
- **Preview** contains opt-in alpha, beta, and release-candidate builds.

Current stable is `1.6.9`. The preview target is `1.7.0a6`. Preview releases
never replace the stable recommendation; use `--pre` or an exact pin.

| Version | Meaning |
|---|---|
| `1.6.9` | Current stable 1.6 maintenance release |
| `1.7.0a6` | Current incomplete, opt-in 1.7 alpha |
| `1.7.0b1` | Feature-complete 1.7 beta |
| `1.7.0rc1` | Candidate that may become stable unchanged |
| `1.7.0` | Stable/LTS 1.7 release |
| `1.7.1` | Maintenance fix after stable 1.7 |

### Stable 1.6.9

Invited contacts can approve ordinary work in their own sessions while admin
authority stays reserved for the control plane. Remote deployments authenticate
the key the server actually retains, clear stale account metadata, and respect
the project's ignore contract so live runtime state is not overwritten by a
laptop copy. Shell append/output redirects work without reopening file-authoring
bypasses. Mail reads preserve unread state by default across ConnectOnion,
Gmail, and Outlook; `--mark-read` is the explicit consuming action. Claude Code
skills that declare only `allowed-tools` now receive a direct compatibility
warning instead of silently losing their intended approval behavior.

### Stable 1.6.8

Long-running agent commands now honor the timeout the caller supplied, even
beyond ten minutes, and an expired command is reported as a tool error instead
of success-shaped text. `co ai` runs without eval-model calls by default;
`co ai --eval` opts into scoring, while session records retain only the newest
500. Received mail now supports pages of up to 1000 messages and offsets for
older pages. A fresh `co ai` creates one private owner invite without printing
it; reveal it intentionally with `co keys --reveal`.

Design notes:

- [The Owner Needs a Door](/blog/the-owner-needs-a-door) explains why secure
  onboarding creates a private recovery path without printing its credential.
- [A Page Should Not Become a Wall](/blog/a-page-should-not-become-a-wall)

## Preview 1.7.0a6

OIP 0.1 is the only first-party browser protocol. The Python Host serves the
authenticated `/ws` connection, `@connectonion/react` owns the browser client,
and O Chat consumes the exact React prerelease. Codex and Claude Code are
native backend adapters that publish normalized activity through OIP.

The coordinated Host and React candidate advertise an OIP 0.1–0.1 rolling
window while accepting a descriptor-less stable peer as legacy OIP 0.1. An
advertised incompatible peer fails once as non-retryable; discovery is
`no-store`, so a stale descriptor cannot cause a reconnect loop.

Alpha 5 removes the abandoned alternate transport, generic coding-agent edge,
SDK dependency, CLI flags, gateway, exports, tests, fixtures, and product docs.
Alpha 6 carries the exact reviewed 1.6.9 stable line forward without changing
the OIP/native-adapter boundary.

```bash
python -m pip install --pre --upgrade connectonion
python -m pip install connectonion==1.7.0a6
```

The architecture decision is recorded in [One Browser Protocol, Native Coding
Adapters](/blog/oip-native-coding-adapters).
