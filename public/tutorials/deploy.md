# Agent Deployment

Deploy your ConnectOnion agents to the cloud for production use.

## Quick Start

```bash
# In your agent project directory
co deploy
```

Your agent will be deployed and accessible at `https://<project-name>-<id>.agents.openonion.ai`.

## Prerequisites

### 1. ConnectOnion Project

Your project must be initialized with ConnectOnion:

```bash
co init
```

This creates a `.co/` folder with project configuration.

### 2. Git Repository

Your code must be in a git repository with committed changes:

```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. API Key

Set your OpenOnion API key:

```bash
# Option 1: Environment variable
export OPENONION_API_KEY=your-key-here

# Option 2: .env file
echo "OPENONION_API_KEY=your-key-here" >> .env
```

Get your API key at [o.openonion.ai](https://o.openonion.ai).

## Deployment Commands

### Deploy

```bash
# Basic deployment
co deploy

# With custom entrypoint
co deploy --entrypoint main.py

# With env file
co deploy
```

### List Deployments

```bash
co deploy list
```

Output:
```
ID              Project         Status    URL
abc123          my-agent        running   https://my-agent-abc123.agents.openonion.ai
def456          email-bot       running   https://email-bot-def456.agents.openonion.ai
```

### Get Status

```bash
co deploy status abc123
```

### View Logs

```bash
co deploy logs abc123

# Follow logs in real-time
co deploy logs abc123 --follow
```

### Delete Deployment

```bash
co deploy delete abc123
```

## Project Structure

A deployable agent project looks like:

```
my-agent/
├── agent.py              # Main entrypoint (or custom via --entrypoint)
├── requirements.txt      # Python dependencies (optional)
├── prompt.md             # System prompt
├── .env                  # Environment variables (deployed securely)
├── .co/
│   └── host.yaml         # Deployment configuration
└── .git/                 # Git repository
```

## Configuration

The `.co/host.yaml` contains deployment configuration:

```yaml
name: my-agent
entrypoint: agent.py
env: .env
```

## Environment Variables

Variables from your `.env` file are securely passed during deployment and injected as environment variables in your deployed container.

```bash
# .env
OPENAI_API_KEY=sk-...
DATABASE_URL=postgres://...
```

**Important**: Never commit `.env` to git. Use it for local development and deployment.

## API Endpoints

Your deployed agent exposes REST endpoints:

### Run Agent

```bash
POST https://<agent-url>/run
Content-Type: application/json

{
  "input": "Hello, agent!"
}
```

Response:
```json
{
  "result": "Agent response here",
  "trace": [...]
}
```

### Health Check

```bash
GET https://<agent-url>/health
```

### Status

```bash
GET https://<agent-url>/status
```

## Architecture

```
┌──────────────┐      ┌─────────────────┐      ┌──────────────┐
│   CLI        │ ───> │ OpenOnion API   │ ───> │ GCP Compute  │
│ (co deploy)  │      │ (oo.openonion)  │      │ (Docker)     │
└──────────────┘      └─────────────────┘      └──────────────┘
                              │
                              ▼
                      ┌───────────────────┐
                      │  Caddy Reverse    │
                      │  Proxy (HTTPS)    │
                      └───────────────────┘
                              │
                              ▼
                      *.agents.openonion.ai
```

## Troubleshooting

### "Not a git repository"

Initialize git and commit your changes:

```bash
git init
git add .
git commit -m "Initial commit"
```

### "Not a ConnectOnion project"

Initialize your project:

```bash
co init
```

### "No API key"

Set your API key:

```bash
export OPENONION_API_KEY=your-key-here
```

### "Deploy failed"

Check the error message. Common issues:

- Missing `requirements.txt` for dependencies
- Syntax errors in your agent code
- Invalid entrypoint file

### Viewing Logs

If your agent fails to start:

```bash
co deploy logs <deployment_id>
```

## Next Steps

- [CLI Reference](/cli) - All CLI commands
- [Agent Guide](/agent) - Building agents
- [Tools Documentation](/tools) - Adding tools to agents
