# Claude Code `.claude` Folder — Presentation

A zero-dependency browser presentation about Claude Code's `.claude` folder system.

Built with the same `.claude` setup it teaches.

## What it covers

- CLAUDE.md — permanent memory across sessions
- settings.json — permissions, behavior, and MCP connections
- Scopes — project vs user-level config
- Agents — built-in and custom autonomous workers
- Skills — reusable team workflows
- Commands — slash-triggered automations
- MCPs — external connections (GitHub, Slack, databases)
- Hooks — rules that enforce themselves
- Real-world session walkthroughs across engineering, product, and QA roles

## How to use

Open `index.html` in a browser. No server needed.

Navigate with arrow keys or click the left/right edges of the screen.

## How it works

- Each file in `slides/` is one slide
- Files are sorted alphabetically — numbering controls order (`01-`, `02-`, `10b-`, etc.)
- Run `node build.js` to regenerate `slides.js` after editing slides
- `index.html` renders everything — no dependencies, no build step for the viewer

## Live Q&A

If you have Claude Code installed, open this project and run:

```
/claude-q&a
```

Claude will read every slide and answer audience questions with full presentation context.
