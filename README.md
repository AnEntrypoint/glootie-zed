# Glootie for Zed

AI state machine for Zed Editor with native Claude 3.5 Sonnet support.

## Installation

1. Clone: `~/.config/zed/extensions/glootie`
2. Restart Zed
3. Auto-activates on startup

## Features

- Native Claude integration
- State machine with checkpointing
- Inline completion
- Semantic search
- Language support: JavaScript, TypeScript, Python

## Quick Start

- Cmd+Shift+P → "Activate State Machine"
- Cmd+Shift+P → "Toggle AI Assistant"
- View AI state: Cmd+Shift+P → "Show State"

## Configuration

Edit `~/.config/zed/settings.json`:

```json
{
  "glootie": {
    "enabled": true,
    "autoActivate": true,
    "llm": "claude-3-5-sonnet"
  }
}
```

## License

MIT
