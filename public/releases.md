# Release channels

ConnectOnion has two release channels:

- **Stable** is the default `pip install connectonion` channel for production.
- **Preview** contains opt-in alpha, beta, and release-candidate builds.

Current stable is `1.6.9`. The preview target is `1.7.0a6`. Preview releases
never replace the stable recommendation; use `--pre` or an exact pin.

## Stable 1.6.9

Stable 1.6.9 lets authenticated contacts approve their own work while keeping
admin paths protected, makes deploy identity and runtime-state preservation
consistent, permits safe redirects, keeps mail reads non-mutating by default,
and reports ignored Claude Code grants explicitly. It includes the 1.6.8 owner
invite, timeout, evaluation, and inbox fixes.

- [The Owner Needs a Door](/blog/the-owner-needs-a-door)
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
