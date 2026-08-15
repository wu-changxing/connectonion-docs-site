# Release channels

ConnectOnion has two release channels:

- **Stable** is the default `pip install connectonion` channel for production.
- **Preview** contains opt-in alpha, beta, and release-candidate builds.

Current stable is `1.6.8`. The preview target is `1.7.0a5`. Preview releases
never replace the stable recommendation; use `--pre` or an exact pin.

## Stable 1.6.8

Stable 1.6.8 honors caller-supplied command timeouts, keeps evaluation scoring
opt-in, retains bounded session records, supports traversable received-mail
pages, and creates one private first-owner invite without printing it. Reveal
that invite only with `co keys --reveal`.

- [The Owner Needs a Door](/blog/the-owner-needs-a-door)
- [A Page Should Not Become a Wall](/blog/a-page-should-not-become-a-wall)

## Preview 1.7.0a5

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
It also carries the reviewed stable 1.6.8 fixes.

```bash
python -m pip install --pre --upgrade connectonion
python -m pip install connectonion==1.7.0a5
```

The architecture decision is recorded in [One Browser Protocol, Native Coding
Adapters](/blog/oip-native-coding-adapters).
