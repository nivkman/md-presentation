# Hooks in Practice

Run tests every time Claude writes a file:

```
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{ "type": "command", "command": "npm test" }]
  }]
}
```

Claude writes → tests run → Claude sees results → Claude fixes failures.

**The feedback loop runs itself.**
