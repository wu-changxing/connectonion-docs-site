# ConnectOnion Templates

There is one template. `co create` scaffolds the same agent `co ai` runs, and
you specialise it with skills.

```bash
co create my-agent                                          # the co-ai template
co create my-agent --template custom --description "..."    # AI writes agent.py
```

## Why one

There used to be several — `minimal`, `coder`, `browser`, `hosted-browser`,
`web-research`. They differed mostly by their prompt, drifted apart as the SDK
moved, and most of them never called `host()`, so `co create` followed by
`co deploy` dead-stopped.

Starting from a different skeleton is the wrong axis to vary. The agent is the
same in every case: files, shell, browser, planning, todos, sub-agents. What
differs between a coding assistant and a LinkedIn poster is *what it knows how
to do* — and that is a skill, not a scaffold.

## What you get

```
my-agent/
├── agent.py           # create_agent() + host(), ~5 lines
├── Dockerfile         # Chrome under Xvfb, so browser skills work deployed
├── requirements.txt
├── .env               # API keys
└── .co/
    ├── host.yaml      # name, entrypoint, trust, summary, examples
    ├── docs/          # full documentation, for vibe coding
    └── skills/        # ← where your agent becomes yours
```

`agent.py` is deliberately short:

```python
from connectonion import host
from connectonion.cli.co_ai.agent import create_agent

agent = create_agent(role="coding")

host(agent)
```

You do not add tools here to make it useful — it already has files, shell,
browser, planning, todos, and sub-agents.

## Specialising it

### Skills — what it knows how to do

A skill is a procedure the agent follows on demand. Drop one in
`.co/skills/<name>/SKILL.md` and it is discovered automatically:

```bash
co skills copy commit                               # from the bundled library
co deploy --skills ~/skills/linkedin-post-submit    # or bring your own
```

A skill is markdown with frontmatter:

```markdown
---
name: linkedin-post-submit
description: Post a draft to LinkedIn. Use when asked to publish or share on LinkedIn.
---

# Posting to LinkedIn

1. Open the composer with `co browser go_to https://www.linkedin.com/feed/`
2. ...
```

The `description` is what the agent matches against, so write it as *when to
use this*, not *what this is*.

### Roles — what kind of agent it is

`role="coding"` adds the software-engineering doctrine: read before editing,
match the surrounding style, don't over-engineer, `file:line` references, git.
An agent that posts to LinkedIn or answers support tickets wants none of that:

```python
agent = create_agent(role=None)     # no domain, behaviour only
```

Everything else — how it plans, asks, reports, and handles actions it cannot
take back — is shared, so it improves when the SDK does.

## Writing your own agent instead

If you want something structurally different, write it directly — the template
is a convenience, not a requirement:

```python
"""My own agent."""

from connectonion import Agent


def tool_one(param: str) -> str:
    """Tool description — this is what the LLM reads."""
    return result


agent = Agent(
    name="agent_name",
    system_prompt="prompt.md",   # markdown file, or a plain string
    tools=[tool_one],
)

if __name__ == "__main__":
    print(agent.input("Your query"))
```

`--template custom` does this for you from a description:

```bash
co create my-agent --template custom \
  --description "watches an RSS feed and files issues"
```

## Retired templates

`minimal`, `coder`, `browser`, `hosted-browser`, and `web-research` were
removed. Passing one exits 1 and says so:

```
❌ Template 'minimal' not found.
   Available: co-ai, custom
   That template was retired: co-ai is the same agent with more tools.
   Specialise it with skills in .co/skills/ instead of a separate starting point.
```

A project you already created from one of them keeps working — nothing was
removed from the SDK. Only the scaffolding shortcut is gone.

## Tips

1. **Tools are just functions**: any Python function with type hints can be a tool
2. **Skills are just markdown**: no code, no registration — a file in `.co/skills/`
3. **`description` drives matching**: write it as "use when…", not "this is…"
4. **Clear docstrings**: tool descriptions are what guide the LLM
5. **Embedded docs**: `.co/docs/` helps AI coding tools understand ConnectOnion

## Next Steps

- Read the [CLI Documentation](cli.md) to learn about `co create` and `co init`
- See [Tools Documentation](tools.md) for creating custom tools
- Check [Prompts Documentation](prompts.md) for prompt engineering
