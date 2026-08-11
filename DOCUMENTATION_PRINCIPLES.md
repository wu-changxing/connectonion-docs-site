# Documentation Principles & Tutorial Writing Guide

## Core Philosophy: Simple → Possible → Powerful

ConnectOnion follows the principle: **"Keep simple things simple, make complicated things possible"**

This guides how we structure documentation, order tutorials, and present concepts.

## 📚 Documentation Ordering Principles

### 1. The Learning Journey (Current Sidebar Order)

```
1. Getting Started
   - Introduction (Why)
   - Quick Start (How to begin)
   - CLI Reference (Tools)

2. Core Concepts (The Foundation)
   - System Prompts (Define behavior - WHAT)
   - Tools (Add capabilities - HOW)  
   - max_iterations (Control execution - SAFETY)
   - LLM Function (Direct usage - FLEXIBILITY)
   - Trust Parameter (Multi-agent - SCALING)
   - @xray Decorator (Debugging - TROUBLESHOOTING)

3. Advanced Features
   - trace() Visual Flow
   - Prompt Formats

4. Security
   - Threat Model

5. Examples (Theory → Practice)
   - Hello World (Simplest)
   - Calculator (Basic tools)
   - Weather Bot (External APIs)
   - Advanced Examples

6. Blog (Deep Dives)
   - Design decisions
   - Architecture insights
```

### 2. The "2-5-10" Rule

Each concept should be learnable in:
- **2 lines**: Minimal working example
- **5 lines**: Practical usage
- **10 lines**: Production-ready

Example:
```python
# 2 lines - It works!
agent = Agent("helper", tools=[greet])
agent.run("Say hello")

# 5 lines - It's useful!
agent = Agent("helper", 
              tools=[greet, calculate],
              system_prompt="Be helpful")
result = agent.run("Greet John and calculate 2+2")
print(result)

# 10 lines - It's production-ready!
agent = Agent("helper",
              tools=[greet, calculate, search],
              system_prompt=load_prompt("assistant.md"),
              max_iterations=5,
              trust="prompt")
              
with xray.trace():
    result = agent.run(user_input)
    save_to_history(result)
```

## 🎯 Tutorial Progression Pattern

### Level 1: Recognition (They can identify it)
**Goal**: User recognizes the concept exists
- Show the simplest possible example
- One concept at a time
- Copy-paste ready

### Level 2: Understanding (They know why)
**Goal**: User understands when to use it
- Explain the problem it solves
- Compare with alternatives
- Show common patterns

### Level 3: Application (They can use it)
**Goal**: User can apply it to their needs
- Multiple examples
- Edge cases
- Integration with other features

### Level 4: Mastery (They can teach it)
**Goal**: User can adapt and extend
- Advanced patterns
- Performance considerations
- Best practices

## 📝 Writing Principles

### 1. Start with Success
```markdown
BAD:  "Before you can use agents, you need to understand..."
GOOD: "Here's your first agent in 2 lines:"
```

### 2. Show, Then Explain
```markdown
BAD:  "Agents use tools which are functions that..."
GOOD: [Show working code] → "This works because..."
```

### 3. Progressive Disclosure
```python
# First introduction
agent = Agent("assistant")

# Later, add complexity
agent = Agent("assistant", tools=[...])

# Even later
agent = Agent("assistant", 
              tools=[...],
              system_prompt="...",
              max_iterations=10)
```

### 4. Real Problems, Real Solutions
```markdown
BAD:  "You can use foo() to process data"
GOOD: "When users ask for calculations, here's how to handle it:"
```

## Release Design Journal

Release notes and design journal posts are different artifacts:

- **Release notes** answer: What changed, and how does a user upgrade?
- **Design journal posts** answer: Why did we choose this shape, what did we
  reject, what evidence supports it, and when should we reconsider it?

Create or substantially update a journal post for a feature-train launch, first
beta, first release candidate, stable release, or material architecture and
workflow decision. A maintenance-only patch stays in release notes unless it
contains a reusable lesson.

Use this structure:

```markdown
# Searchable title that states the decision

One-paragraph outcome.

## The problem
## Alternatives we considered
## The decision
## Tradeoffs and user impact
## Evidence and current limitations
## What would make us revisit it
## Follow the work
```

Publication checklist:

- [ ] Canonical Markdown source and rendered blog route agree
- [ ] Unique title, description, canonical URL, Open Graph, and Twitter metadata
- [ ] `TechArticle` or `BlogPosting` structured data uses the real publication date
- [ ] Blog index, internal navigation, site search, and relevant docs link the post
- [ ] Dynamic and static sitemaps include the canonical URL
- [ ] `llms.txt` and relevant AI-readable indexes include the article
- [ ] Mobile and desktop layouts have no page-level horizontal overflow
- [ ] Claims about published packages are verified against PyPI and GitHub

## 🔄 The Learning Loop

```
1. Minimal Example (Works immediately)
   ↓
2. Practical Example (Solves real problem)
   ↓
3. Production Example (Ready to deploy)
   ↓
4. Deep Dive (Understanding internals)
```

## 📊 Complexity Ladder

Each page should follow this structure:

```markdown
## Quick Start (30 seconds)
[Minimal working example]

## Basic Usage (2 minutes)
[Common patterns]

## Advanced Usage (5 minutes)
[Production patterns]

## Reference (As needed)
[Complete API details]
```

## 🎨 Visual Hierarchy

1. **Hero Example**: The one example that shows the essence
2. **Comparison Table**: When to use what
3. **Decision Tree**: If X then Y
4. **Progressive Examples**: Building complexity
5. **Gotchas Box**: Common mistakes

## ✅ Documentation Checklist

For each documentation page:

- [ ] Starts with working code (< 5 lines)
- [ ] Includes "When to use this"
- [ ] Has progressive examples (simple → complex)
- [ ] Shows common mistakes
- [ ] Links to related concepts
- [ ] Includes performance notes (if relevant)
- [ ] Has debug/troubleshooting section

## 🚀 The "ConnectOnion Way"

### Good Documentation:
```python
# ✅ Start simple
def greet(name: str) -> str:
    return f"Hello {name}!"

agent = Agent("assistant", tools=[greet])

# ✅ Show progression
# Add more tools as needed...
agent = Agent("assistant", tools=[greet, calculate, search])

# ✅ Show production usage
agent = Agent("assistant",
              tools=load_tools(),
              system_prompt=load_prompt("assistant.md"),
              max_iterations=10)
```

### Poor Documentation:
```python
# ❌ Start complex
class AbstractAgentFactory(BaseAgent):
    def __init__(self, config: AgentConfig, 
                 registry: ToolRegistry,
                 executor: ExecutionEngine):
        # ... 50 lines of setup
```

## 📖 Tutorial Templates

### Concept Introduction Template
```markdown
# [Concept Name]

**What**: [One sentence explanation]
**When**: [When to use it]
**Why**: [Problem it solves]

## Simplest Example
[2-3 lines of code]

## Common Usage
[5-10 lines with explanation]

## Production Ready
[Complete example with error handling]

## Common Mistakes
- Mistake 1: [Explanation]
- Mistake 2: [Explanation]

## Next Steps
- Link to related concept
- Link to advanced usage
```

### Feature Tutorial Template
```markdown
# Building [Feature]

## You'll Learn
- Point 1 (2 min)
- Point 2 (3 min)
- Point 3 (5 min)

## Prerequisites
- Required: [Concept 1]
- Helpful: [Concept 2]

## Step 1: Minimal Implementation
[Working code in < 5 lines]

## Step 2: Adding [Feature]
[Build on step 1]

## Step 3: Production Considerations
[Error handling, performance, etc.]

## Complete Example
[Full working code]

## Exercises
1. Try: [Simple modification]
2. Challenge: [Extension]
```

## 🎓 Learning Path Design

### Beginner Path (Day 1)
1. Introduction → Quick Start
2. System Prompts → Tools
3. Hello World Example

### Intermediate Path (Week 1)
1. max_iterations → LLM Function
2. Calculator → Weather Bot
3. @xray Decorator

### Advanced Path (Month 1)
1. Trust Parameter → Threat Model
2. trace() Visual Flow
3. Multi-agent Systems

## 📚 README Structure

The main README should follow:

```markdown
# ConnectOnion

[One-line description]
[Philosophy statement]

## Install (30 seconds)
pip install connectonion

## First Agent (1 minute)
[2-line example]

## Real Example (2 minutes)
[Practical example]

## Core Concepts
- Prompts: [One line]
- Tools: [One line]
- Iterations: [One line]

## Learn More
- [Quick Start Guide](./quickstart)
- [Examples](./examples)
- [API Reference](./api)

## Community
- GitHub: [Link]
- Discord: [Link]
```

## 🎯 Success Metrics

Good documentation achieves:
1. **Time to First Success**: < 60 seconds
2. **Concept to Code**: < 5 minutes
3. **Understanding to Production**: < 30 minutes

## Remember

> "If it takes more than 2 lines to start, we've failed at simplicity"
> "If it takes more than 10 lines for production, we've failed at practicality"
> "Documentation is UX for developers"
