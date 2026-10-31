---
name: create-agent-skill
description: Create and validate reusable agent skills in the standard SKILL.md format for Claude Code, Codex and other agents. Use when the user asks to create or fix a skill.
disable-model-invocation: false
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital)
  version: "1.1"
  license: MIT
---

# Create an agent skill

A skill is a folder with a `SKILL.md` and optional `resources/`. The agent loads only the `name` and `description` of every skill into context; the body and resources load when the skill runs. Keep the body short and move detail to `resources/`.

## Structure

```
<skill-name>/
├── SKILL.md             frontmatter + steps, under ~60 lines
└── resources/           read on demand, linked from SKILL.md
    ├── <guidelines>.md
    └── templates/       files the skill copies into a repo
```

Name hidden files in `resources/` without the leading dot (`templates/claude/settings.json`) and let the skill copy them to their final path.

## Frontmatter

```yaml
---
name: ra-skill-name
description: What it does and when to use it, in one sentence.
disable-model-invocation: true
user-invocable: true
metadata:
  author: <name>
  version: "1.0"
  license: MIT
---
```

- `name`: equal to the folder name; lowercase letters, digits and single hyphens, 1 to 64 characters (`^[a-z0-9]+(-[a-z0-9]+)*$`). Invoked as `/<name>`.
- `description`: one sentence. If the model may invoke it, say when ("Use when...").
- `disable-model-invocation`: `true` for skills with side effects the user must trigger (planning, implementing); `false` lets the model run it when the description matches.
- `user-invocable`: `true` to allow `/<name>`.
- `metadata.version`: quoted, bumped when behaviour changes.

## Locations

| Agent | Project | Global |
|---|---|---|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex | `.agents/skills/` | `~/.agents/skills/` (legacy `~/.codex/skills/`) |
| opencode | | `~/.config/opencode/skills/` or `~/.agents/skills/` |
| Qwen Code | `.qwen/skills/` | `~/.qwen/skills/` or `~/.agents/skills/` |
| Zed | `.zed/skills/` | `~/.config/zed/skills/` or `~/.agents/skills/` |

`~/.agents/skills/` is the shared global directory; agents that do not read it get a symlink from the skills CLI.

## Install with the skills CLI

```bash
npx skills add <owner>/<repo> --list                    # what the repo offers
npx skills add <owner>/<repo> --skill <name> \
  --agent claude-code --agent codex --yes               # project: .agents/skills/ + .claude/skills/ symlink + skills-lock.json
npx skills add <owner>/<repo> --skill <name> --global --yes
```

Install from GitHub, not from a local path: the lock file would store a path of your disk.

## Validate

1. `name` matches the folder and the regex; `description` is one sentence.
2. `npx skills add . --list` lists the skill.
3. Install it in a throwaway repo and check the copied tree, the symlink and the lock.
4. Run it once (`claude -p "/<name> ..."`, `codex exec "$<name> ..."`) and read what it does.
