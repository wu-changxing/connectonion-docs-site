# Models

ConnectOnion supports the latest models from OpenAI, Google Gemini, Anthropic Claude, and Mistral AI. The default model is `co/gemini-2.5-pro` - best price-performance for AI agents.

## Quick Start

```python
from connectonion import Agent

# Default model (gemini-2.5-pro) - recommended for most use cases
agent = Agent("assistant")

# Or specify a model explicitly
agent = Agent("assistant", model="co/gpt-5")              # OpenAI
agent = Agent("assistant", model="co/gemini-2.5-pro")     # Google (default)
agent = Agent("assistant", model="co/claude-sonnet-4-5")  # Anthropic
```

## OpenAI Models

### GPT-5 Series
```python
# Best model for coding and agentic tasks across domains
agent = Agent("assistant", model="co/gpt-5")

# Faster, cost-efficient version for well-defined tasks
agent = Agent("assistant", model="co/gpt-5-mini")

# Fastest, most cost-efficient version
agent = Agent("assistant", model="co/gpt-5-nano")
```

### GPT-4o Series (Previous Generation)
```python
# Multimodal model with vision capabilities
agent = Agent("assistant", model="co/gpt-4o")

# Affordable small model
agent = Agent("assistant", model="co/gpt-4o-mini")
```

### o4-mini Reasoning Model
```python
# OpenAI's newest reasoning model
agent = Agent("assistant", model="co/o4-mini")
```

## Google Gemini Models

### Gemini 3 (Newest - State-of-the-Art Reasoning)
```python
# Latest Gemini 3.5 Flash
agent = Agent("assistant", model="co/gemini-3.5-flash")

# Most intelligent model family with state-of-the-art reasoning
agent = Agent("assistant", model="co/gemini-3-pro-preview")

# Fastest Gemini 3 model
agent = Agent("assistant", model="co/gemini-3-flash-preview")

# Image generation model with grounded generation
agent = Agent("assistant", model="co/gemini-3-pro-image-preview")

# Ultra fast, cheapest Gemini 3
agent = Agent("assistant", model="co/gemini-3.1-flash-lite-preview")
```

### Gemini 2.5
```python
# Default model - best price-performance for agents
# Supports: Audio, images, videos, text, and PDF
agent = Agent("assistant", model="co/gemini-2.5-pro")

# Best price-performance ratio
agent = Agent("assistant", model="co/gemini-2.5-flash")

# Ultra fast, cheapest Gemini option
agent = Agent("assistant", model="co/gemini-2.5-flash-lite")
```

### Gemini 2.0
```python
# Previous gen workhorse
agent = Agent("assistant", model="co/gemini-2.0-flash")

# Previous gen lite version
agent = Agent("assistant", model="co/gemini-2.5-flash-lite")
```

## Anthropic Claude Models

### Claude 4.5 Series (Latest)
```python
# Claude Opus 4.5 - Most capable model
agent = Agent("assistant", model="co/claude-opus-4-5")

# Claude Sonnet 4.5 - Best balance of intelligence and speed
agent = Agent("assistant", model="co/claude-sonnet-4-5")

# Claude Haiku 4.5 - Fastest with near-frontier intelligence
agent = Agent("assistant", model="co/claude-haiku-4-5")
```

### Claude 4 Series (Previous Generation)
```python
# Claude Opus 4.1 - Specialized reasoning
agent = Agent("assistant", model="co/claude-opus-4-1")

# Claude Sonnet 4 - Balanced performance
agent = Agent("assistant", model="co/claude-sonnet-4-5")

# Claude Opus 4 - Legacy version
agent = Agent("assistant", model="co/claude-opus-4-5")
```

## Mistral AI Models

### Mistral Latest
```python
# Mistral Large - Most capable Mistral model
agent = Agent("assistant", model="mistral/mistral-large-latest")

# Mistral Small - Balanced performance and efficiency
agent = Agent("assistant", model="mistral/mistral-small-latest")

# Mistral Medium - Mid-tier performance
agent = Agent("assistant", model="mistral/mistral-medium-latest")
```

**Note:** Mistral models require your own API key (`MISTRAL_API_KEY`). Managed keys (`co/` prefix) are not yet available for Mistral.

## Model Capabilities Comparison

### Latest Flagship Models

| Model | Provider | Key Strengths | Multimodal |
|-------|----------|---------------|------------|
| gpt-5 | OpenAI | Best for coding and agentic tasks | Yes |
| gemini-2.5-pro | Google | **Default** - best price-performance for agents | Yes |
| gemini-3-pro-preview | Google | State-of-the-art reasoning | Yes |
| claude-sonnet-4-5 | Anthropic | Best balance of intelligence and speed | Yes |
| mistral-large-latest | Mistral | High performance European model | Yes |

### Context Windows

| Model | Context Window |
|-------|---------------|
| **OpenAI** | |
| gpt-5 | 200K tokens |
| gpt-5-mini | 200K tokens |
| gpt-5-nano | 128K tokens |
| gpt-4o | 128K tokens |
| o4-mini | 128K tokens |
| **Google** | |
| gemini-3.5-flash | 1M tokens |
| gemini-3-pro-preview | 1M tokens |
| gemini-3-flash-preview | 1M tokens |
| gemini-2.5-pro | 2M tokens |
| gemini-2.5-flash | 1M tokens |
| **Anthropic** | |
| claude-opus-4-5 | 200K tokens |
| claude-sonnet-4-5 | 200K tokens |
| claude-haiku-4-5 | 200K tokens |

## Pricing (Managed Keys)

All prices are **per 1M tokens**:

### OpenAI Models

| Model | Input | Output | Notes |
|-------|-------|--------|-------|
| gpt-5 | $1.25 | $10.00 | Best overall |
| gpt-5-mini | $0.25 | $2.00 | Fast, cost-effective |
| gpt-5-nano | $0.05 | $0.40 | Cheapest OpenAI |
| gpt-4o | $2.50 | $10.00 | Previous gen flagship |
| gpt-4o-mini | $0.15 | $0.60 | Most cost-effective |
| o4-mini | $3.00 | $12.00 | Reasoning model |

### Google Gemini Models

| Model | Input | Output | Notes |
|-------|-------|--------|-------|
| gemini-3.5-flash | $1.50 | $9.00 | Latest Gemini 3.5 Flash |
| gemini-3-pro-preview | $2.00 | $12.00 | State-of-the-art reasoning |
| gemini-3-flash-preview | $0.50 | $3.00 | Fastest Gemini 3 |
| gemini-3.1-flash-lite-preview | $0.10 | $0.40 | Ultra fast, cheapest Gemini 3 |
| gemini-3-pro-image-preview | $2.00 | $0.134 | Image generation |
| gemini-2.5-pro | $1.25 | $10.00 | **Default model** |
| gemini-2.5-flash | $0.30 | $2.50 | Best price-performance |
| gemini-2.5-flash-lite | $0.10 | $0.40 | Ultra fast, cheapest |
| gemini-2.0-flash | $0.10 | $0.40 | Previous gen |
| gemini-2.0-flash-lite | $0.075 | $0.30 | Previous gen lite |

### Anthropic Claude Models

| Model | Input | Output | Notes |
|-------|-------|--------|-------|
| claude-opus-4-5 | $5.00 | $25.00 | Most capable |
| claude-sonnet-4-5 | $3.00 | $15.00 | Best intelligence/speed |
| claude-haiku-4-5 | $1.00 | $5.00 | Fastest Claude |
| claude-opus-4-1 | $15.00 | $75.00 | Specialized reasoning |
| claude-sonnet-4 | $3.00 | $15.00 | Previous gen |
| claude-opus-4 | $15.00 | $75.00 | Previous gen |

### Tool Use Support

All models support function calling / tool use:

```python
def search(query: str) -> str:
    """Search for information."""
    return f"Results for {query}"

def calculate(expression: str) -> float:
    """Calculate mathematical expressions."""
    return eval(expression)

# Same tools work with all providers
tools = [search, calculate]

agent_openai = Agent("assistant", model="co/gpt-5", tools=tools)
agent_google = Agent("assistant", model="co/gemini-2.5-pro", tools=tools)
agent_claude = Agent("assistant", model="co/claude-sonnet-4-5", tools=tools)
agent_mistral = Agent("assistant", model="co/mistral/mistral-large-latest", tools=tools)
```

## Model Selection Guide

### By Use Case

**Best Overall Performance**
```python
# Top tier models from each provider
agent = Agent("assistant", model="co/gpt-5")             # OpenAI flagship
agent = Agent("assistant", model="co/gemini-2.5-pro")    # Google default
agent = Agent("assistant", model="co/claude-sonnet-4-5") # Anthropic flagship
```

**Code Generation**
```python
# GPT-5 excels at coding and agentic tasks
agent = Agent("coder", model="co/gpt-5")

# Alternative: Claude Sonnet 4.5
agent = Agent("coder", model="co/claude-sonnet-4-5")
```

**Fast Responses**
```python
# Fastest options from each provider
agent = Agent("quick", model="co/gpt-5-nano")         # OpenAI fastest
agent = Agent("quick", model="co/gemini-2.5-flash")   # Google fast
agent = Agent("quick", model="co/claude-haiku-4-5")   # Anthropic fast
```

**Cost-Optimized**
```python
# Most cost-efficient options
agent = Agent("budget", model="co/gpt-5-nano")           # OpenAI cheapest
agent = Agent("budget", model="co/gemini-2.5-flash-lite") # Google cheapest
```

**Long Context (>200K tokens)**
```python
# Models with longest context windows
agent = Agent("reader", model="co/gemini-2.5-pro")  # 2M tokens
```

**Multimodal (Images, Audio, Video)**
```python
# Gemini 2.5 Pro supports the most modalities
agent = Agent("multimodal", model="co/gemini-2.5-pro")  # Audio, video, images, PDF

# Alternatives
agent = Agent("multimodal", model="co/gpt-5")           # Images, text
agent = Agent("multimodal", model="co/claude-opus-4-5") # Images, text
```

## See Also

- [Quick Start](quickstart.md) - Get started with ConnectOnion
- [Tools](tools.md) - Using tools with models
- [Authentication](auth.md) - Using managed keys
