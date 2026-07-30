# Models

ConnectOnion supports the latest models from OpenAI, Google Gemini, and Anthropic Claude. Prefix model names with `co/` to use managed keys — no API keys needed.

## Quick Start

```python
from connectonion import Agent

# Just change the model name — co/ prefix uses managed keys
agent = Agent("assistant", model="co/gpt-5")              # OpenAI
agent = Agent("assistant", model="co/gemini-2.5-pro")     # Google
agent = Agent("assistant", model="co/claude-opus-4-5")    # Anthropic
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

## Model Capabilities Comparison

### Latest Flagship Models

| Model | Provider | Key Strengths | Multimodal |
|-------|----------|---------------|------------|
| co/gpt-5 | OpenAI | Best for coding and agentic tasks | ✅ |
| co/gemini-2.5-pro | Google | Enhanced reasoning, supports audio/video/PDF | ✅ |
| co/claude-opus-4-5 | Anthropic | Latest and most capable Claude | ✅ |

### Context Windows

| Model | Context Window |
|-------|---------------|
| **OpenAI** | |
| co/gpt-5 | 200K tokens |
| co/gpt-5-mini | 200K tokens |
| co/gpt-5-nano | 128K tokens |
| co/gpt-4o | 128K tokens |
| co/o4-mini | 128K tokens |
| **Google** | |
| co/gemini-3.5-flash | 1M tokens |
| co/gemini-3-pro-preview | 1M tokens |
| co/gemini-3-flash-preview | 1M tokens |
| co/gemini-2.5-pro | 2M tokens |
| co/gemini-2.5-flash | 1M tokens |
| **Anthropic** | |
| co/claude-opus-4-5 | 200K tokens |
| co/claude-sonnet-4-5 | 200K tokens |
| co/claude-haiku-4-5 | 200K tokens |

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
agent_claude = Agent("assistant", model="co/claude-opus-4-5", tools=tools)
```

## API Keys

With `co/` prefixed models, no API keys are needed — credits are managed through your OpenOnion account.

To use your own API keys instead, drop the `co/` prefix and set environment variables:
```bash
export OPENAI_API_KEY="sk-..."       # For gpt-5, gpt-4o, etc.
export GEMINI_API_KEY="AIza..."      # For gemini-2.5-pro, etc.
export ANTHROPIC_API_KEY="sk-ant-..." # For claude-opus-4-5, etc.
```

## Model Selection Guide

### By Use Case

**Best Overall Performance**
```python
# Top tier models from each provider
agent = Agent("assistant", model="co/gpt-5")           # OpenAI flagship
agent = Agent("assistant", model="co/gemini-2.5-pro")  # Google flagship
agent = Agent("assistant", model="co/claude-opus-4-5") # Anthropic flagship
```

**Code Generation**
```python
# GPT-5 excels at coding and agentic tasks
agent = Agent("coder", model="co/gpt-5")

# Alternative: Claude Opus 4.5
agent = Agent("coder", model="co/claude-opus-4-5")
```

**Fast Responses**
```python
# Fastest options from each provider
agent = Agent("quick", model="co/gpt-5-nano")       # OpenAI fastest
agent = Agent("quick", model="co/gemini-2.5-flash") # Google fast
agent = Agent("quick", model="co/claude-haiku-4-5") # Anthropic fast
```

**Cost-Optimized**
```python
# Most cost-efficient options
agent = Agent("budget", model="co/gpt-5-nano")          # OpenAI cheapest
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

## Usage Examples

### Basic Usage

```python
from connectonion import Agent

# Create agents with different models
agent_openai = Agent("assistant", model="co/gpt-5")
agent_google = Agent("assistant", model="co/gemini-2.5-pro")
agent_claude = Agent("assistant", model="co/claude-opus-4-5")

# Same interface for all
response = agent_openai.input("Explain quantum computing")
response = agent_google.input("Explain quantum computing")
response = agent_claude.input("Explain quantum computing")
```

### Model Comparison

```python
# Compare responses from top models
models = ["co/gpt-5", "co/gemini-2.5-pro", "co/claude-opus-4-5"]
prompt = "Write a Python implementation of binary search"

for model in models:
    agent = Agent(f"compare_{model}", model=model)
    print(f"\n{model}:")
    print(agent.input(prompt))
```

### Smart Model Selection

```python
def select_model(task_type: str, speed_priority: bool = False) -> str:
    """Select optimal model based on requirements."""
    
    if speed_priority:
        # Fast models
        return {
            "code": "co/gpt-5-mini",
            "chat": "co/gpt-5-nano",
            "analysis": "co/gemini-2.5-flash",
            "creative": "co/claude-haiku-4-5"
        }.get(task_type, "co/gpt-5-nano")
    else:
        # Best quality models
        return {
            "code": "co/gpt-5",
            "reasoning": "co/gemini-2.5-pro",
            "analysis": "co/claude-opus-4-5",
            "multimodal": "co/gemini-2.5-pro"
        }.get(task_type, "co/gpt-5")

# Use appropriate model
model = select_model("code", speed_priority=False)
agent = Agent("coder", model=model)
```

### Fallback Chain

```python
import os

def create_agent_with_fallback(name: str):
    """Try multiple models if one fails."""
    
    # Priority order
    model_chain = [
        "co/gpt-5",              # Best overall
        "co/claude-opus-4-5",    # Strong alternative
        "co/gemini-2.5-pro",     # Multimodal option
        "co/gpt-5-mini",         # Faster fallback
        "co/gpt-4o"              # Legacy fallback
    ]
    
    for model in model_chain:
        try:
            # Check if API key exists for provider
            if model.startswith("gpt") and not os.getenv("OPENAI_API_KEY"):
                continue
            if model.startswith("claude") and not os.getenv("ANTHROPIC_API_KEY"):
                continue
            if model.startswith("gemini") and not os.getenv("GEMINI_API_KEY"):
                continue
                
            return Agent(name, model=model)
        except Exception as e:
            print(f"Failed with {model}: {e}")
            continue
    
    raise Exception("No models available. Please set at least one API key.")

# Will use best available model
agent = create_agent_with_fallback("assistant")
```

### Using with Tools

```python
def analyze_data(data: str) -> str:
    """Analyze provided data."""
    return f"Analysis of: {data}"

def generate_report(analysis: str) -> str:
    """Generate a report from analysis."""
    return f"Report: {analysis}"

# Tools work identically across all models
tools = [analyze_data, generate_report]

# High-performance agent
agent_performance = Agent("analyst",
                          model="co/gpt-5",
                          tools=tools)

# Cost-optimized agent
agent_budget = Agent("analyst_budget",
                    model="co/gpt-5-nano",
                    tools=tools)

# Both can use the same tools
result1 = agent_performance.input("Analyze sales data and generate report")
result2 = agent_budget.input("Analyze sales data and generate report")
```

## Error Handling

```python
from connectonion import Agent
import time

def create_robust_agent(name: str, model: str, max_retries: int = 3):
    """Create agent with automatic error handling."""
    
    for attempt in range(max_retries):
        try:
            agent = Agent(name, model=model)
            # Test the agent works
            agent.input("test")
            return agent
            
        except Exception as e:
            error = str(e).lower()
            
            if "api key" in error:
                raise ValueError(f"Missing API key for {model}. "
                               f"Please set the appropriate environment variable.")
            
            if "rate limit" in error:
                wait = 2 ** attempt
                print(f"Rate limited. Waiting {wait}s...")
                time.sleep(wait)
                continue
            
            if "model not found" in error:
                # Try alternative model
                alternatives = {
                    "co/gpt-5": "co/gpt-5-mini",
                    "co/gemini-2.5-pro": "co/gemini-2.5-flash",
                    "co/claude-opus-4-5": "co/claude-sonnet-4-5"
                }
                alt_model = alternatives.get(model)
                if alt_model and attempt == 0:
                    print(f"Model {model} not available, trying {alt_model}")
                    model = alt_model
                    continue
                    
            if attempt < max_retries - 1:
                print(f"Attempt {attempt + 1} failed: {e}")
                continue
            else:
                raise
    
    raise Exception(f"Failed to create agent with {model}")

# Usage
agent = create_robust_agent("assistant", "co/gpt-5")
```

## Migration Guide

### From Single Model to Multi-Model

**Before (ConnectOnion 0.0.1)**
```python
# Only OpenAI GPT models supported
agent = Agent("assistant", model="co/gpt-4o-mini")
```

**After (ConnectOnion 0.0.2)**
```python
# Any provider, any model
agent = Agent("assistant", model="co/gpt-5")
agent = Agent("assistant", model="co/gemini-2.5-pro")
agent = Agent("assistant", model="co/claude-opus-4-5")
```

### From Direct SDK Usage

**Before (Using provider SDKs)**
```python
# Different code for each provider
import openai
client = openai.OpenAI()
response = client.chat.completions.create(model="gpt-4", ...)

import anthropic
client = anthropic.Anthropic()
response = client.messages.create(model="claude-3", ...)
```

**After (Unified with ConnectOnion)**
```python
# Same interface for all providers
agent = Agent("assistant", model="co/gpt-5")
response = agent.input(prompt)

agent = Agent("assistant", model="co/claude-opus-4-5")
response = agent.input(prompt)
```

## See Also

- [Quick Start](quickstart.md) - Get started with ConnectOnion
- [Tools](tools.md) - Using tools with models
- [API Setup](setup.md) - Configuring API keys