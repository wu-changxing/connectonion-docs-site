# The Work Room is a client, not a status panel

ConnectOnion Work Room is the remote client for one native Codex or Claude Code
session running on a user-owned computer or server. It is not a second agent
runtime, but it is also not a read-only execution summary.

## The mistake

The first interface placed conversation, status, preview, activity, and input
next to one another. The first simplification correctly removed raw command
noise and duplicate panels, but then went too far: some lifecycle states removed
the provider conversation and composer entirely.

That changed the product in the middle of a session. A person opened what looked
like a coding client, then saw it become an approval or status page with no
obvious way to talk to Codex or Claude Code.

## The decision

Use one shared remote-client shell:

- a compact parent card opens Work Room;
- the header names the task, provider, and authoritative lifecycle;
- user and provider messages remain attributed and readable;
- current work and bounded semantic activity remain visible without exposing
  private commands, paths, raw provider frames, or hidden reasoning;
- provider-native permission and approval controls retain their real meaning;
- one provider-targeted composer stays fixed at the bottom.

Approval, Stop, reconnect, provider-busy, terminal, and older-client states can
change whether the composer accepts input. They do not remove it. A disabled
composer explains the authoritative reason and becomes usable again only after
the Host or provider acknowledges the relevant state change.

## Ownership

ConnectOnion Core remains the sole writer of provider authority. Codex and
Claude Code adapters preserve provider-native session identity and translate
bounded messages, lifecycle, work, plans, approvals, and artifacts into typed
OIP. `@connectonion/react` validates, correlates, and replays that state. O Chat
renders the shared shell plus provider-specific controls when a generic mapping
would lose meaning.

The browser never invents messages, phases, plan items, or permission. It also
never calls a message delivered merely because it was queued: the draft clears
only after the matching Host/provider acknowledgement.

## Evidence

The acceptance gate covers Codex and Claude Code conversation, direct provider
follow-up, running and completed states, approval, Stop, reconnect, desktop,
tablet, 390px, 375px, and 320px layouts. The release candidate must repeat the
same checks against exact installed Core, React, and O Chat artifacts.

We would revisit the shared shell only if a provider requires a fundamentally
different interaction model. In that case the provider receives its own control
component inside Work Room; it does not lose conversation or input to fit a
false common enum.
