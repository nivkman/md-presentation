# settings.json — What Claude Can and Cannot Do

You control the blast radius.

```
{
  "allow": ["Bash(npm run *)", "Bash(git add *)"],
  "deny":  ["Bash(rm -rf *)", "Bash(git push --force *)"]
}
```

Claude can build and commit.

It cannot destroy or force-push.

**You set the rules. Claude follows them.**
