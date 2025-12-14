# ConnectOnion CLI

The `co` command-line interface lets you create production-ready AI agent projects in seconds.

## The Problem

Setting up AI agent projects is tedious:
- Manual `.env` file configuration
- Copy-pasting boilerplate code
- Setting up authentication and API keys
- Managing cryptographic identity
- Inconsistent project structure

## The Solution

```bash
co create my-agent
cd my-agent
python agent.py
```

Done. You now have a complete, working AI agent.

## Quick Start (60 seconds)

```bash
# Install
pip install connectonion

# Create agent
co create my-agent

# Run it
cd my-agent
python agent.py
```

The CLI automatically:
1. Creates your global identity (`~/.co/`)
2. Guides you through API key setup
3. Generates complete project structure
4. Authenticates for managed keys (free credits)

## All Commands

### Project Commands

#### `co create [name]` - Create New Project

Creates a new directory with complete agent project.

**Basic usage:**
```bash
co create my-agent              # Interactive
co create my-agent --yes        # Skip prompts
co create my-agent -t playwright # Specify template
```

**Options:**
- `[name]` - Project name (creates directory)
- `--template, -t` - Template: `minimal` (default), `playwright`, `custom`
- `--key` - API key (auto-detects provider)
- `--description` - For custom templates
- `--yes, -y` - Skip all prompts
- `--ai/--no-ai` - Enable/disable AI (enabled by default)

**Templates:**
- **minimal** - Basic agent with simple tools
- **playwright** - Browser automation
- **custom** - AI-generated from description

**What it creates:**
```
my-agent/
├── agent.py                 # Main agent
├── .env                     # API keys (from ~/.co/keys.env)
├── .co/
│   ├── config.toml          # Project config
│   └── docs/                # Framework docs
├── co-vibecoding-principles-docs-contexts-all-in-one.md
└── .gitignore               # Safe defaults
```

---

#### `co init` - Add to Existing Directory

Adds ConnectOnion to existing project safely.

**Basic usage:**
```bash
cd my-existing-project
co init                      # Safe - preserves existing files
```

**What it does:**
- Preserves existing files and `.env`
- Appends only missing API keys
- Updates `.co/docs/` to latest
- Skips existing files (like `agent.py`)

---

### Authentication & Account Commands

#### `co auth` - Authenticate for Managed Keys

One-time setup for managed LLM keys (free credits included).

```bash
co auth
```

**What it does:**
1. Signs message with your Ed25519 key
2. Authenticates with OpenOnion backend
3. Saves `OPENONION_API_KEY` to `~/.co/keys.env`
4. Activates your agent email

**Using managed keys:**
```python
from connectonion import llm_do

# Use co/ prefix
response = llm_do("Hello", model="co/gpt-4o")
response = llm_do("Hello", model="co/claude-3-5-sonnet")
response = llm_do("Hello", model="co/gemini-1.5-pro")
```

**Available models:**
- OpenAI: `co/gpt-4o`, `co/gpt-4o-mini`, `co/o4-mini`
- Anthropic: `co/claude-3-5-sonnet`, `co/claude-3-5-haiku`
- Google: `co/gemini-1.5-pro`, `co/gemini-1.5-flash`

---

#### `co status` - Check Account Balance

Shows your managed keys balance and usage.

```bash
co status
```

**Example output:**
```
ConnectOnion Account Status
============================

Address:  0x7a9f3b2c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a
Email:    0x7a9f3b2c@mail.openonion.ai
Balance:  $5.00
```

---

#### `co reset` - Reset Account

**WARNING**: Destructive operation. Deletes all data and creates new account.

```bash
co reset
```

---

#### `co deploy` - Deploy to Cloud

Deploy your agent to ConnectOnion Cloud.

```bash
co deploy
```

**Requirements:**
- Git repository with committed code
- `.co/config.toml` (created by `co create` or `co init`)
- Authenticated (`co auth`)

**Example:**
```bash
$ co deploy

Deploying to ConnectOnion Cloud...

  Project: my-agent
  Secrets: 3 keys

Uploading...
Building...

Deployed!
Agent URL: https://my-agent-abc123.agents.openonion.ai
```

> **Beta**: This feature is in beta. See [Deploy Guide](../network/deploy.md) for details.

---

### Utility Commands

#### `co doctor` - Diagnose Issues

Comprehensive diagnostics for your ConnectOnion installation.

```bash
co doctor
```

**What it checks:**
- System Info (version, Python, environment)
- Configuration (config files, keys, API keys)
- Connectivity (backend, authentication)

**Example output:**
```
🔍 ConnectOnion Diagnostics

┌─ System ─────────────────────────────────┐
│ Version        ✓ 0.0.7                   │
│ Python         ✓ 3.11.5                  │
│ Environment    ✓ Virtual environment     │
└──────────────────────────────────────────┘

┌─ Configuration ──────────────────────────┐
│ Config         ✓ .co/config.toml         │
│ Keys           ✓ .co/keys/agent.key      │
│ API Key        ✓ Found in environment    │
└──────────────────────────────────────────┘

┌─ Connectivity ───────────────────────────┐
│ Backend        ✓ https://oo.openonion.ai │
│ Authentication ✓ Valid credentials       │
└──────────────────────────────────────────┘

✅ Diagnostics complete!
```

---

#### `co browser <command>` - Browser Automation

Execute browser commands quickly.

```bash
co browser "screenshot localhost:3000"
co browser "click on login button"

# Shortcut
co -b "screenshot localhost:3000"
```

---

## Global Configuration

### The `~/.co/` Directory

On first use, ConnectOnion creates global configuration:

```
~/.co/
├── config.toml          # Global identity and settings
├── keys.env             # Shared API keys
├── keys/                # Master Ed25519 keypair
│   ├── agent.key        # Private key (NEVER share)
│   ├── agent.pub        # Public key
│   └── recovery.txt     # 12-word recovery phrase
└── logs/                # CLI activity logs
```

**Your Global Identity:**
- **Address**: Hex-encoded Ed25519 public key (`0x7a9f3b2c...`)
- **Email**: Derived address (`0x7a9f3b2c@mail.openonion.ai`)
- **Keys**: For authentication and signing

All projects share this identity by default.

---

## API Key Management

### Auto-Detection

The CLI automatically detects providers:

| Provider | Format | Env Variable |
|----------|--------|--------------|
| OpenAI | `sk-...` / `sk-proj-...` | `OPENAI_API_KEY` |
| Anthropic | `sk-ant-...` | `ANTHROPIC_API_KEY` |
| Google | `AIza...` | `GEMINI_API_KEY` |
| Groq | `gsk_...` | `GROQ_API_KEY` |
| OpenOnion | JWT token | `OPENONION_API_KEY` |

### Priority Order

1. `--key` flag
2. Environment variables
3. `~/.co/keys.env` (global)
4. Interactive prompt
5. Skip (add later)

---

## Command Reference Summary

| Command | Purpose | Interactive | Safe for Existing |
|---------|---------|-------------|-------------------|
| `co create` | New project | Yes | N/A (creates new dir) |
| `co init` | Add to existing | Yes | ✅ Yes |
| `co auth` | Get managed keys | No | ✅ Yes |
| `co status` | Check balance | No | ✅ Yes |
| `co deploy` | Deploy to cloud | No | ✅ Yes |
| `co reset` | Reset account | Yes | ⚠️ Destructive |
| `co doctor` | Diagnose issues | No | ✅ Yes |
| `co browser` | Browser command | No | ✅ Yes |

---

## Security & Identity

### Ed25519 Cryptographic Identity

Every installation generates master Ed25519 keypair:

**Used for:**
1. Agent addressing (unique identifier)
2. Authentication (passwordless)
3. Message signing (cryptographic proof)
4. Secure communication (encryption)

**Security:**
- Never share `.co/keys/` directory
- Never commit `.env` files
- Backup 12-word recovery phrase
- Keys auto-added to `.gitignore`

---

## Troubleshooting

### Command Not Found

```bash
# Check installation
pip show connectonion

# Reinstall
pip uninstall connectonion
pip install connectonion

# Use full path
python -m connectonion.cli.main create my-agent
```

### Permission Denied

```bash
# Fix global
chmod 700 ~/.co
chmod 600 ~/.co/keys.env

# Fix project
chmod 700 my-agent/.co
chmod 600 my-agent/.env
```

### API Key Issues

```bash
# Check format
cat ~/.co/keys.env

# Test auth
co auth

# Diagnose
co doctor
```
