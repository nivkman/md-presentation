const SLIDES = `
# Claude Code \`.claude\` Folder

## Turning Claude into a Programmable System

Not just an AI assistant —
**a configurable engineering platform**

*Agents · Skills · Hooks · Memory · Permissions*

---

# Without \`.claude\` — Every Session Starts from Zero

You repeat yourself constantly:

- *"We use TypeScript, async/await, no callbacks"*
- *"Don't touch the auth module"*
- *"Always run tests before committing"*
- *"Our pattern is repository + service layer"*

Claude forgets. You re-explain. It makes the same mistakes.

**There is a better way.**

---

# \`.claude\` is Claude's Operating System

One folder. Everything Claude needs to work like a senior engineer.

\`\`\`
.claude/
├── CLAUDE.md              ← permanent memory
├── settings.json          ← permissions, behavior & MCPs
├── settings.local.json    ← local overrides, never committed
├── agents/                ← autonomous workers
├── skills/                ← reusable workflows
├── commands/              ← slash commands
└── hooks/                 ← automation scripts
\`\`\`

Loaded automatically. Every session.

---

# \`.claude\` Has Scopes

Not every config belongs to the project. Some belongs to *you*.

### Project scope — \`.claude/\` in the repo root
- Checked into git, shared with the whole team
- CLAUDE.md, agents, skills, commands, hooks

### User scope — \`~/.claude/\` in your home directory
- Personal preferences, never committed
- \`settings.local.json\` — your overrides, your machine only

**Team rules live in the repo. Your rules live on your machine.**

---

# CLAUDE.md — Permanent Memory

Claude reads this file at the start of every session.

Write it once. Never repeat yourself again.

### What belongs here:
- Architecture decisions and patterns
- Coding standards and conventions
- What to avoid and why
- Project-specific context

### Example:
- *"This is a Node.js microservices app using Fastify"*
- *"Use Zod for all validation — never trust raw input"*
- *"The payments service is legacy — don't refactor it"*

---

# settings.json — What Claude Can and Cannot Do

You control the blast radius.

\`\`\`
{
  "allow": ["Bash(npm run *)", "Bash(git add *)"],
  "deny":  ["Bash(rm -rf *)", "Bash(git push --force *)"]
}
\`\`\`

Claude can build and commit.

It cannot destroy or force-push.

**You set the rules. Claude follows them.**

---

# Agents — Autonomous Engineers

An agent is Claude running in a loop:

**plan → execute → observe → repeat**

It uses tools, reads files, runs commands, and iterates until the task is done — without you holding its hand.

You dispatch an agent with a task.
**It doesn't stop until the work is done.**

---

# Claude Code's Built-in Subagents

Claude Code ships with pre-built subagents out of the box.

These are general-purpose specialists Claude can dispatch automatically:

- **general-purpose** — research, multi-step tasks, codebase exploration
- **code-reviewer** — reviews changes against common best practices
- **Plan** — breaks down complex work before executing
- **Explore** — maps unfamiliar codebases quickly

They handle the *how* of execution — but they know nothing about *your* project.

**They follow best practices. Not your practices.**

---

# Without Custom Agents — You're Missing the Point

The built-in agent loop is powerful. But it's generic.

Every team ships differently. Every codebase has its own rules.

Without custom agents, Claude Code will:
- Review code against general conventions — not yours
- Structure new features how it thinks is best — not how you decided
- Fix bugs using patterns it learned from the internet — not your codebase
- Make the same wrong assumptions on every single task

**You spend half your time correcting it.**

The agent works hard. But it doesn't know your team.

---

# Custom Agents — Built for Your Team

Define agents that know *your* project, *your* patterns, *your* standards.

Each agent lives in \`.claude/agents/\` with its own instructions.

### Examples:
- \`code-reviewer\` — reviews PRs against your standards
- \`test-fixer\` — finds failing tests and fixes them
- \`backend-architect\` — designs APIs to your conventions
- \`dependency-updater\` — bumps packages, fixes breakage

Your built-ins follow best practices.
**Your custom agents follow your practices.**

---

# Skills — Claude's Playbooks

Skills teach Claude how to work *in your specific project*.

Stored in \`.claude/skills/\` — Claude picks them up automatically when relevant.

### Examples:
- \`debugging.md\` → how to debug in *this* codebase
- \`pr-review.md\` → your team's exact review checklist
- \`deploy.md\` → your deployment steps, not generic ones
- \`api-design.md\` → your REST conventions and patterns

Write it once. Claude follows it every time.

---

# Skills vs Agents — Why Both?

**Agents** are workers. They have a role and autonomy.

**Skills** are knowledge. They describe how to do something, step by step.

The difference: **agents use skills.**

- Your \`code-reviewer\` agent executes the \`pr-review\` skill
- Your \`test-fixer\` agent follows the \`debugging\` skill
- Your \`backend-architect\` agent applies the \`api-design\` skill

Without skills, you write the same procedure inside every agent that needs it.
When your process changes — you update 3 agents instead of 1 skill.

**Skills = write the procedure once. Any agent can follow it.**

---

# Commands — Your Shortcuts

Commands are slash prompts you trigger manually.

Type \`/command\` → Claude runs a full workflow.

### Examples:
- \`/commit\` → stages files, writes a good message, commits
- \`/review\` → runs your PR review checklist from top to bottom
- \`/fix-tests\` → finds failing tests and repairs them
- \`/standup\` → summarizes what changed since yesterday

**Skills** = what Claude knows automatically

**Commands** = what *you* trigger on demand

---

# MCPs — Claude's External Connections

MCP (Model Context Protocol) connects Claude to systems outside the codebase.

Configure once in \`settings.json\`. Claude uses them like native tools.

### What Claude can reach:
- **GitHub** — read PRs, issues, branches, commit history
- **Slack** — post updates, read channel messages
- **Databases** — query directly, no copy-paste
- **Jira, Linear, Figma** — whatever your team runs on

**Claude stops asking you for context. It just goes and gets it.**

---

# Hooks — Rules That Run Themselves

Hooks are scripts that fire automatically on Claude's actions.

No asking. No reminding. They just run.

### When they trigger:
- \`PreToolUse\` — before Claude touches a file or runs a command
- \`PostToolUse\` — after Claude writes, edits, or executes something
- \`UserPromptSubmit\` — the moment you send a message
- \`Stop\` — when Claude finishes a task

---

# What Hooks Can Do

Hooks turn Claude into a system with guardrails.

### Examples:
- **Auto-test** — run \`npm test\` after every file write
- **Auto-lint** — run ESLint and feed results back to Claude
- **Block danger** — reject \`rm -rf\` or \`git push --force\` before they execute
- **Audit log** — write every Claude action to a file
- **Notify** — send a Slack message when a long task completes

You don't ask Claude to follow rules.

**You make it structurally impossible to break them.**

---

# Hooks in Practice

Run tests every time Claude writes a file:

\`\`\`
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{ "type": "command", "command": "npm test" }]
  }]
}
\`\`\`

Claude writes → tests run → Claude sees results → Claude fixes failures.

**The feedback loop runs itself.**

---

# Real Session — What It Actually Looks Like

You type: *"Add rate limiting to the API"*

**Claude reads CLAUDE.md** → knows your stack is Fastify + Redis

**Agent kicks in** → plans the implementation across 3 files

**Skill activates** → follows your team's middleware pattern

**Writes the code** → PostToolUse hook runs \`npm test\` automatically

**Tests fail** → Claude reads the output, fixes the issue

**Tests pass** → Claude commits with a proper message

*You reviewed nothing. You typed one sentence.*

---

# Most Teams Just Prompt Claude Code

Most developers use Claude Code as a smarter terminal assistant.

They type a task. Claude does it. They move on.

- No persistent context — Claude forgets the project every session
- No agents — every task is a one-shot prompt
- No hooks — rules exist only in their head, not enforced
- No skills — workflows have to be re-explained each time

*It works. But it's nowhere near what the tool can actually do.*

---

# Claude Code Is Not Just for Developers

## Any role. Any workflow. Any team.

*Product managers. QA engineers. Architects. Analysts.*

**If you have a process — Claude Code can run it.**

---

# Real Session — Product Manager

You type: *"Plan the notification feature — validate it against the client brief"*

**Agent reads CLAUDE.md** → knows the product domain and stakeholder context

**\`client-brief\` skill activates** → checks feature scope against requirements doc

**\`pm-planner\` agent runs** → breaks work into epics, stories, and acceptance criteria

**Finds 2 gaps** → flags requirements missing from the original brief

**Outputs a validated plan** → ready to hand off to engineering

*You didn't write a spec. You described an outcome.*

---

# Brainstorming with the Paying Client

You type: *"We want to add bulk export for reports — thoughts?"*

**\`paying-client\` skill responds as your customer:**

- *"Will it handle 50,000 rows? Our monthly report is massive"*
- *"Can we schedule exports? We run them every Monday at 6am"*
- *"PDF only, or Excel too? Our finance team lives in Excel"*

**PM adjusts the spec on the spot** → adds pagination, scheduling, multi-format

*You stress-tested the feature before a single line was written.*

---

# Brainstorming with the Developer

You type: *"We want real-time notifications — what's the best approach?"*

**\`developer\` skill responds as your tech lead:**

- *"WebSockets or SSE? SSE is simpler if it's one-way"*
- *"We'd need a message queue — Redis pub/sub fits what we already have"*
- *"Mobile push is a separate service — that's a bigger lift than it sounds"*

**PM scopes the feature down** → v1 is in-app only, push notifications move to v2

*You caught the complexity before it hit the sprint.*

---

# Real Session — Manual QA

You type: *"Write a test plan for the new checkout flow"*

**Agent reads CLAUDE.md** → knows the product, risk areas, and test conventions

**\`qa-planner\` skill activates** → applies your team's exact test plan format

**Explores the feature** → reads implementation files, maps edge cases

**Writes the plan** → happy path, edge cases, regression risks, device coverage

*You didn't write a test plan. You got one.*

---

# \`.claude\` Changes the Relationship

You stop prompting. You start **programming the programmer**.

- **CLAUDE.md** — Claude knows your project permanently
- **Agents** — Claude works autonomously on complex tasks
- **Skills** — Claude follows your team's exact workflows
- **Hooks** — Claude cannot violate your rules
- **Commands** — You trigger full workflows with one word

You configure it once.

**It works correctly on every task, forever.**

---

# Start Today

Create \`.claude/CLAUDE.md\` and write three things:

- What your stack is
- What your coding standards are
- What Claude should never do

That's it. One file. Five minutes.

*You'll feel the difference on the next task.*

---

**Agents build. Skills guide. Hooks enforce. Memory persists.**

---

# Questions?

Ask Claude directly.

Open Claude Code in this project and type:

**/claude-q&a**

Claude will read every slide from this presentation and answer your questions with full context of what was just covered.

*This command is powered by the exact \`.claude\` system we just explained.*
`;
