# What Makes an Agent 10x

This essay has an unusual source: an operator's written log of everything his AI agent got wrong over months of daily work. Wrong in instructive ways — work reported done that was never checked, dashboards green over broken content, a screenshot standing in for a test. The failure log turned out to be a requirements document. Here is what it asks for.

## The thesis

Model intelligence is not the lever. The labs own that race, and every framework rides the same models. What can be owned is everything *around* the model, and it compounds into one property:

> **A 10x agent is one you can safely stop watching.**

Every hour a person spends supervising an agent caps the agent's value at the supervisor's throughput. An agent that is twice as smart but still needs watching is worth a few percent more. An agent that no longer needs watching is worth whatever the work is worth. Five capabilities get there.

## 1. Verifiable beats smarter

The largest category in that failure log is not intelligence failures — it is the missing gate between *did it* and *believes it did it*. The fix is not a better model; it is an agent that delivers **result plus evidence**, natively. Wrote a file? Read it back and diff. Published a package? Install it from the registry in a clean environment and assert the version. Changed a UI? Before-and-after captures, attached.

Trust is the only multiplier there is. Everything else in this list depends on it, because nobody delegates to what they cannot verify.

## 2. Living in time

Today's agents are request-scoped: ask, answer, process exits, everything resets. But most of what makes a human colleague valuable is that they *hold timelines open* — they wait for Tuesday's reply, watch the deploy, follow up when a client goes quiet. We call this the 3am test: every decision made in advance, so the work proceeds with nobody awake.

A 100x agent is not one that answers 100x faster. It is one that holds a hundred open timelines at once.

## 3. Experience that sediments

Every run of a ConnectOnion agent already leaves a complete, replayable record. What no framework has yet closed is the loop: from *the mistake this run made* to *the mistake no future run makes*. Today that loop runs through a human — someone notices the pattern and writes the rule down.

An agent that runs a thousand times a day and learns nothing, and an agent that turns ten runs into ten rules in its own operating manual, diverge exponentially within a year. This is the next deliverable on our observability line: replay, mine the failure patterns, draft the rule, let a human approve it.

## 4. Delegation with boundaries

One agent works linearly; 100x requires teams. And the precondition for teams is not a messaging protocol — it is **authorization**: who may spend whose money, send as whose address, use whose network, touch whose production.

Looking back at a year of ConnectOnion releases, this is the strategy we were building without naming it: signed proxy grants, mailbox sharing without key handover, payment-verified onboarding, and the wallet and settlement work ahead. Others are building stronger individuals. We are building agents that can safely form teams — every delegated power signed, revocable, and attributable to exactly one identity.

## 5. Hands that reach real work

Work lives in browsers, inboxes, phone calls, and local networks — so the agent must reach them. This one needs the least argument and the most patience: one integration an operator can bet a client deliverable on is worth five that mostly work.

## Where this is going

Four of the five levers are already on the roadmap — async execution and durable triggers for time, settlement and wallets for delegation, the channel integrations for reach, replayable runs for observability. The fifth, the sedimentation loop, is the gap this essay names.

The one-line strategy, for anyone deciding what to build next: **don't compete on how smart the agent is. Compete on how safely it can be left alone.**
