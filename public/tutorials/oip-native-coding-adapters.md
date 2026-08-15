# One browser protocol, native coding adapters

ConnectOnion 1.7.0a5 makes OIP 0.1 the only first-party browser protocol. The
Python Host serves the authenticated `/ws` boundary, `@connectonion/react`
owns connection and event state, and O Chat renders that state.

Codex and Claude Code are backend adapters, not browser transports. Each tool
starts its provider through the provider's native interface, preserves the
canonical provider session ID, and translates bounded activity into OIP tool
events. The browser therefore needs one parser and one lifecycle even when the
backend provider changes.

The useful lesson from Happy Coder is to bridge a provider's native session
instead of pretending every coding engine has the same internal protocol.
ConnectOnion applies that lesson with a different ownership model: `co ai` owns
the parent loop, Codex uses `codex app-server`, Claude Code uses headless
`stream-json`, and each edge adapter maps native activity into the small OIP
event waist. Provider transcripts stay local; raw provider JSON is not the
browser wire format.

## The problem

The earlier preview explored two protocol layers for overlapping jobs. That
duplicated discovery, session, approval, resume, error, and frontend state. It
also allowed a generic fallback to hide a missing executable until a user saw
`misconfigured: [Errno 2] No such file or directory`.

## Alternatives considered

- Keep both browser transports and synchronize their state machines.
- Make one generic child-agent interface the internal model for every coding
  provider.
- Keep one browser protocol and use provider-native backend adapters.

The third option has the smallest authority surface. Provider-specific
approvals, sandboxes, authentication, and resume identifiers remain explicit,
while O Chat receives one normalized event stream.

## Decision and tradeoffs

OIP owns browser connection, onboarding, messages, tool cards, cancellation,
and reconnect. `codex` and `claude_code` own provider launch, provider-native
events, and exact resume. There is no generic fallback: a missing provider is a
clear configuration error naming the executable and installation action.

The adapter output contract is deliberately small: a provider invocation owns
one stable parent tool-call ID, inner work becomes correlated `tool_call` and
`tool_result` events, provider approvals use the ordinary `approval_needed`
path, and terminal state becomes completed, failed, or cancelled. The existing
React/O Chat cards consume those OIP events without provider-specific wire
parsers.

This duplicates a small amount of translation code between adapters, but it
avoids a second public protocol and keeps provider differences visible where
they matter. New coding providers must earn a native adapter rather than enter
through an implicit base implementation.

## Evidence and rollback

The release gate covers running, completed, failed, expanded, and mobile Codex
cards; OIP Host and WebSocket contracts; exact adapter session behavior; and a
real published-package browser run. We would revisit the decision only if a
provider-neutral interface demonstrates equivalent approval, cancellation,
resume, and observability behavior across providers without weakening those
native guarantees.
