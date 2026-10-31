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
| `ra-analysis` | Understand a brief before solving it: requirements, evidence checked with commands when there is any, sub-problems, options with costs, high-level design and worked examples that become acceptance fixtures |
| `ra-foundations` | Turn a brief or an existing codebase into the project foundations: mission, architecture, contract, testing, verification, decisions and a roadmap of vertical slices, plus `AGENTS.md`, `CLAUDE.md` and an env-leak hook |
| `ra-plan-create` | Contract-first, outside-in plan for one roadmap slice: diagnosis, questions first, risk spikes, contracts, cut list, deviations |
| `ra-plan-phase-implement` | Implement one plan phase outside-in with red/green steps of 3 to 5 files; propose Conventional Commits, never commit alone |
| `ra-review-independent` | Read-only review by a different model: reproducible defects and unsupported claims only |
| `ra-doc-create` | Write a convention in `docs/` with good and bad examples, from user corrections or on request |

## Method and profile

Order on a new project: `ra-analysis` → `ra-foundations` → for each slice `ra-plan-create` → `ra-plan-phase-implement` per phase → `ra-review-independent` where risk is high → `ra-doc-create` after corrections.

The skills hold the method. What depends on the stack lives in each
repository, written by `ra-foundations` and read by the other skills:

```
docs/analysis.md                   written by ra-analysis
AGENTS.md                          short map: commands, architecture, rules, docs tree
CLAUDE.md -> AGENTS.md
docs/foundations/
  mission.md  architecture.md  contract.md  testing.md
  verification.md  review-checklist.md  decisions.md  roadmap.md
```

`.agents/skills/ra-foundations/resources/examples/` has two stack profiles
(PHP/Symfony + MySQL, TypeScript/NestJS + PostgreSQL + LLM).

The `ra-plan-*` and `ra-doc-create` skills are adapted from
[CodelyTV/agent-harness](https://github.com/CodelyTV/agent-harness) (MIT).

Upstream skills are installed directly from their original repositories. The
dotfiles repository keeps the global installation list and invokes the same
command through `dot-skills`.
