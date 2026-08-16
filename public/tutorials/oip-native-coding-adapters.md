# One browser protocol, native coding adapters

ConnectOnion 1.7.0a5 introduced OIP 0.1 as the only first-party browser protocol,
1.7.0a6 carries the complete 1.6.9 stable line forward, 1.7.0a7 closes the
raw-provider escape hatch, 1.7.0a8 preserves an open-only Codex thread through
its first real Work Room task, 1.7.0a10 makes an authenticated relay
reattach republish that same OIP session without a second authorization pass or
forwarder, and 1.7.0a11 gives Host and frontend a bounded rolling window. The
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

Provider intent is an execution boundary. Explicit run/use/start/open Codex
requests call `codex()`. An interceptor rejects executable Codex commands inside
shell chains, command substitutions, background wrappers, and package runners
before approval or process creation. Searches and prose that merely contain the
word remain allowed.

An open request with no task creates or resumes the native thread but sends no
`account/read` or `turn/start`. O Chat can open the interactive Work Room before
work begins without spending a model turn or inventing a prompt.

Codex writes its durable rollout only after the first turn. For a brand-new
open-only thread, the Host therefore keeps the initialized app-server alive in
a bounded, fifteen-minute registry. The first Work Room message claims the
same thread ID, runs the turn, persists the rollout, and closes the process.

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

Host and frontend do not deploy atomically. OIP therefore uses
reader-before-writer: release R reads both forms, R+1 may write the new form
after R is publicly pinned, and removal waits for R+2 and 30 days. A
descriptor-less OIP 0.1 peer remains accepted through 1.7.x and cannot be
removed before 1.8.0a1, September 15, 2026, and two previews after content-free
compatibility telemetry stops observing it. Authority-bearing identity,
session, permission, approval, cancellation, terminal, and version values are
rejected rather than guessed.

The Host records only Direct/Relay/unknown, legacy/OIP 0.1/unsupported, and
accepted/rejected. Peer strings, prompts, credentials, addresses, session IDs,
and private paths never enter that record.

The release gate covers running, completed, failed, expanded, and mobile Codex
cards; old/new and rollback pairs over Direct and Relay; OIP Host and WebSocket
contracts; exact adapter session behavior; and a
real published-package browser run. Routing and false-positive evaluations plus
open-without-turn, same-thread first-follow-up, relay reattach, and cross-bundle
React ownership are part of the alpha.10 gate; exact old/new and rollback pairs
over Direct and Relay join them for alpha.11.
We would revisit the decision only if a
provider-neutral interface demonstrates equivalent approval, cancellation,
resume, and observability behavior across providers without weakening those
native guarantees.
