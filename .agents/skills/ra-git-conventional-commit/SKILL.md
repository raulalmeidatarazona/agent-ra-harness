---
name: ra-git-conventional-commit
description: Create one Git commit with a Conventional Commits message, staging only the files of the current step. Use when the user asks to commit, approves a proposed commit, or a plan phase runs with phase cadence.
disable-model-invocation: false
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-git-conventional-commit (MIT)
  version: "1.0"
  license: MIT
---

# Create a conventional commit

Message format: [`resources/commit-messages.md`](resources/commit-messages.md).

## Steps

1. **Context.** Read `git status`, `git diff` and `git diff --staged`, and `git log --oneline -5` for the recent style.
2. **Approval.** Commit only if the user approved this commit or the current plan phase has cadence `phase`. Otherwise show the proposed message and wait.
3. **Stage** only the files of the step, by name. No `git add -A` or `git add .` unless the user asks for everything. Never stage secrets (`.env`, keys, credentials); stop and warn if one is in the change.
4. **Message.** Use the user's message if given; otherwise write one from the diff. Add a `Co-Authored-By` trailer only when `AGENTS.md` asks for it.
5. **Commit** with `git commit -F -` and a heredoc, so the body keeps its line breaks.
6. **Show** `git log -1 --stat`.

## Never

- Push, unless the user asks for that push.
- `--no-verify`, or amend, rebase or force anything already pushed.
- Mix unrelated changes in one commit: split them and say so.
