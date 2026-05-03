# What Hooks Can Do

Hooks turn Claude into a system with guardrails.

### Examples:
- **Auto-test** — run `npm test` after every file write
- **Auto-lint** — run ESLint and feed results back to Claude
- **Block danger** — reject `rm -rf` or `git push --force` before they execute
- **Audit log** — write every Claude action to a file
- **Notify** — send a Slack message when a long task completes

You don't ask Claude to follow rules.

**You make it structurally impossible to break them.**
