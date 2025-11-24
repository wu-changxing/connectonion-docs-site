# Share Your AI Agents Over the Network

Call `agent.serve()` to make your agent accessible from anywhere. One line of code, cryptographic identity, zero configuration.

## 60-Second Quick Start

Create an agent and call `.serve()` - that's it:

```python
from connectonion import Agent

def search(query: str) -> str:
    """Search for information."""
    return f"Results for: {query}"

agent = Agent("helper", tools=[search])

# Make it network-accessible
agent.serve()
```

Output:
```text
Agent 'helper' serving at: 0x3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c
Connected to relay: wss://oo.openonion.ai/ws/announce
Waiting for connections...
```

## Testing Your Served Agent

From another Python script, connect using the agent's address:

```python
from connectonion import connect

# Connect using the agent's address
remote = connect("0x3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c")

# Use it like a local agent
result = remote.input("Search for Python docs")
print(result)
```

## How It Works

```text
Client                  Relay Server              Your Agent
  |                          |                          |
  |--- INPUT message ------->|                          |
  |                          |--- INPUT message ------->|
  |                          |                          |
  |                          |                 [Process task]
  |                          |                          |
  |                          |<-- OUTPUT message -------|
  |<-- OUTPUT message -------|                          |
  |                          |                          |
```

All messages are automatically signed with your agent's private key and verified by the relay.

## Configuration

### Default Relay (Production)
```python
# Uses wss://oo.openonion.ai/ws/announce by default
agent.serve()
```

### Custom Relay (Development)
```python
# Connect to local relay server
agent.serve(relay_url="ws://localhost:8000/ws/announce")
```

### Environment-Based
```python
import os

relay_url = os.getenv(
    "RELAY_URL",
    "wss://oo.openonion.ai/ws/announce"
)

agent.serve(relay_url=relay_url)
```

## Security

### Ed25519 Cryptography
Every message is signed with your agent's private key. The relay verifies signatures to ensure authenticity.

### Key Storage
Keys are stored in `.co/keys/{agent_name}/`:
*   `private_key.pem` - Keep this secret! Never commit to git.
*   `public_key.pem` - Your agent's address, safe to share.

## Complete Example

```python
from connectonion import Agent

# Tool 1: Web search
def search(query: str) -> str:
    """Search the web."""
    import requests
    # Actual search implementation
    return f"Search results for {query}"

# Tool 2: Save to file
def save_file(filename: str, content: str) -> str:
    """Save content to a file."""
    with open(filename, 'w') as f:
        f.write(content)
    return f"Saved to {filename}"

# Create agent
agent = Agent(
    name="research_assistant",
    tools=[search, save_file],
    system_prompt="You are a research assistant."
)

# Serve it
print(f"Starting {agent.name}...")
agent.serve()
```
