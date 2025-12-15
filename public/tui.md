# TUI Components

Terminal UI components from `connectonion.tui`

## Quick Start

```python
from connectonion.tui import pick, Input, StatusBar
from rich.console import Console

console = Console()

# Single-select menu
choice = pick("Select model:", ["gpt-4", "claude-3", "gemini-pro"])

# Text input with file autocomplete
from connectonion.tui import FileProvider
text = Input(triggers={"@": FileProvider()}).run()

# Status bar
status = StatusBar([
    ("model", "gpt-4", "magenta"),
    ("tokens", "1.2k", "green"),
])
console.print(status.render())
```

## Architecture

```
User Input → TUI Component → Terminal (Rich) → User
     ↑                              ↓
     └──── Keyboard Events ────────┘
```

Components use **Rich** for terminal rendering, **raw mode** for keyboard capture, and **ANSI codes** for styling.

## Input Components

Interactive input elements

### pick

Single-select menu with keyboard navigation

**Usage**: `pick("Select model", ["gpt-4", "claude-3"])`

**Import**: `from connectonion.tui import pick`

### Input

Smart text input with trigger-based autocomplete

**Usage**: `Input(triggers={"@": FileProvider()}).run()`

**Import**: `from connectonion.tui import Input`

### Dropdown

Selection list component for autocomplete menus

**Usage**: `Dropdown(items, max_visible=5)`

**Import**: `from connectonion.tui import Dropdown`

## Display Components

Visual layout elements

### StatusBar

Powerline-style status bar with colored segments

**Usage**: `StatusBar([("model", "gpt-4", "magenta")])`

**Import**: `from connectonion.tui import StatusBar`

### Footer

Simple footer with tips/hints display

**Usage**: `Footer(["? help", "/ commands"])`

**Import**: `from connectonion.tui import Footer`

### Divider

Simple horizontal line separator

**Usage**: `Divider(width=40)`

**Import**: `from connectonion.tui import Divider`

## Utilities

Helper functions and providers

### fuzzy_match

Fuzzy matching utilities for autocomplete

**Usage**: `fuzzy_match("gp", "gpt-4")`

**Import**: `from connectonion.tui import fuzzy_match`

### getch / read_key

Low-level keyboard input primitives

**Usage**: `key = read_key()  # "up", "down", etc.`

**Import**: `from connectonion.tui import getch, read_key`

### Providers

Autocomplete providers for autocomplete (FileProvider, StaticProvider)

**Usage**: `FileProvider(root="src/")`

**Import**: `from connectonion.tui import FileProvider, StaticProvider`

## Quick Reference

| Component | Purpose | Import |
|-----------|---------|--------|
| [Input](/tui/input) | Text input with autocomplete | `from connectonion.tui import Input` |
| [pick](/tui/pick) | Single-select menu | `from connectonion.tui import pick` |
| [Dropdown](/tui/dropdown) | Dropdown menus | `from connectonion.tui import Dropdown` |
| [StatusBar](/tui/status-bar) | Powerline-style status | `from connectonion.tui import StatusBar` |
| [Footer](/tui/footer) | Footer with help text | `from connectonion.tui import Footer` |
| [Divider](/tui/divider) | Visual dividers | `from connectonion.tui import Divider` |
| [fuzzy](/tui/fuzzy) | Fuzzy matching | `from connectonion.tui import fuzzy_match` |
| [keys](/tui/keys) | Keyboard input | `from connectonion.tui import getch` |
| [providers](/tui/providers) | Autocomplete data sources | `from connectonion.tui import FileProvider` |

