# Personal agent skills

Skills customized for my AI agents. They follow the standard `SKILL.md`
directory layout and can be installed with the official `skills` CLI.

Per project (copies to `.agents/skills/`, which Codex reads, symlinks
`.claude/skills/` and writes `skills-lock.json`):

```bash
npx skills add raulalmeidatarazona/agent-skills --skill <name> --agent claude-code --agent codex --yes
```

| Skill | Purpose |
|---|---|
| `create-agent-skill` | Create and validate reusable agent skills for Claude Code, Codex and others |
| `ra-foundations` | Turn a brief or an existing codebase into the project foundations: mission, architecture, contract, testing, verification, decisions and a roadmap of vertical slices, plus `AGENTS.md`, `CLAUDE.md` and an env-leak hook |
| `ra-plan-create` | Contract-first, outside-in plan for one roadmap slice: diagnosis, questions first, risk spikes, contracts, cut list, deviations |
| `ra-plan-phase-implement` | Implement one plan phase outside-in with red/green steps of 3 to 5 files; propose Conventional Commits, never commit alone |
| `ra-review-independent` | Read-only review by a different model: reproducible defects and unsupported claims only |
| `ra-convention-capture` | Turn user corrections into a convention in `docs/`, the review checklist or the decisions log |

## Method and profile

The skills hold the method. What depends on the stack lives in each
repository, written by `ra-foundations` and read by the other skills:

```
AGENTS.md                          short map: commands, architecture, rules, docs tree
CLAUDE.md -> AGENTS.md
docs/foundations/
  mission.md  architecture.md  contract.md  testing.md
  verification.md  review-checklist.md  decisions.md  roadmap.md
```

`ra-foundations/resources/examples/` has two stack profiles
(PHP/Symfony + MySQL, TypeScript/NestJS + PostgreSQL + LLM).

The `ra-plan-*` and `ra-convention-capture` skills are adapted from
[CodelyTV/agent-harness](https://github.com/CodelyTV/agent-harness) (MIT).

Upstream skills are installed directly from their original repositories. The
dotfiles repository keeps the global installation list and invokes the same
command through `dot-skills`.
