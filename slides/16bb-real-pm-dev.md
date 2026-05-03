# Brainstorming with the Developer

You type: *"We want real-time notifications — what's the best approach?"*

**`developer` skill responds as your tech lead:**

- *"WebSockets or SSE? SSE is simpler if it's one-way"*
- *"We'd need a message queue — Redis pub/sub fits what we already have"*
- *"Mobile push is a separate service — that's a bigger lift than it sounds"*

**PM scopes the feature down** → v1 is in-app only, push notifications move to v2

*You caught the complexity before it hit the sprint.*
