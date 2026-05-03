# `.claude` is Claude's Operating System

One folder. Everything Claude needs to work like a senior engineer.

```
.claude/
├── CLAUDE.md              ← permanent memory
├── settings.json          ← permissions, behavior & MCPs
├── settings.local.json    ← local overrides, never committed
├── agents/                ← autonomous workers
├── skills/                ← reusable workflows
├── commands/              ← slash commands
└── hooks/                 ← automation scripts
```

Loaded automatically. Every session.
