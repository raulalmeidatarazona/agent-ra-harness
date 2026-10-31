# Personal agent skills

Skills customized for my AI agents. They follow the standard `SKILL.md`
directory layout and can be installed with the official `skills` CLI:

```bash
npx skills add raulalmeidatarazona/agent-skills --skill <name> --global --yes
```

| Skill | Purpose |
|---|---|
| `create-agent-skill` | Create and validate reusable agent skills |
| `ra-plan-create` | Contract-first, outside-in plan of vertical slices: questions first, risk spikes, extended contracts, time budget, cut list, grading map, deviations |
| `ra-plan-phase-implement` | Implement one plan phase with visible red/green steps of at most 3 files; propose commits, never commit alone |
| `ra-review-independent` | Read-only review by a different model: reproducible defects and unsupported claims only |
| `ra-convention-capture` | Turn user corrections into a documented convention in `docs/` and the `AGENTS.md` map |

The `ra-plan-*` and `ra-convention-capture` skills are adapted from
[CodelyTV/agent-harness](https://github.com/CodelyTV/agent-harness) (MIT).

Upstream skills are installed directly from their original repositories. The
dotfiles repository keeps the global installation list and invokes the same
command through `dot-skills`.
