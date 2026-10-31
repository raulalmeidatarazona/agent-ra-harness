# Method

How work goes from a brief to a reviewed commit. Each step is a skill; skip one only for the reason in its row.

| Step | Skill | Produces | Skip when |
|---|---|---|---|
| Analyse | `/ra-analysis <brief>` | `docs/analysis.md`, phase files in `.agents/analysis/` | The change is small and its problem already understood |
| Foundations | `/ra-foundations` | `AGENTS.md` filled, `docs/foundations/`, conventions kept for the stack | They exist; rerun it to replan the roadmap |
| Plan a slice | `/ra-plan-create <slice>` | `.agents/plans/<date-name>/<date-name>-plan.md` | A one-file change with an obvious test |
| Implement a phase | `/ra-plan-phase-implement` | Code and tests in steps of 3 to 5 files | Never |
| Commit | `/ra-git-conventional-commit` | One commit per step | Never |
| Review | `/ra-review-independent`, with a different model | Reproducible defects as JSON | The phase touched no money, security, concurrency or data integrity |
| Capture | `/ra-doc-create` | A convention in `docs/<area>/` | Nobody corrected the agent |

## Principles

- Understand before solving: compute from the evidence, never guess a count or a match.
- Contract first and outside-in: the contract and a pending acceptance test come before code.
- Vertical slices: each one a user goal that can go to production alone.
- Small, reversible steps: red before green, verified in the repository.
- Flag what no longer fits the plan; never work around it silently.
- Boring defaults: one deployable, SQL, synchronous calls, unless a requirement or a number asks for more.

## Review cadence

The plan sets one per phase, agreed with the user.

| Cadence | For | Behaviour |
|---|---|---|
| `step` | Domain rules, money, security, concurrency, search | Stop after every step with the diff and the proposed commit |
| `phase` | Scaffolding, wiring, docs, simple UI | Commit every step locally; stop at the design stop, on deviations and at the end |

Nothing is pushed without the user, under either cadence.

## Where things live

| Path | Content | Changes |
|---|---|---|
| `AGENTS.md` | Commands, architecture, rules, map of `docs/` | When a rule or command changes |
| `docs/analysis.md` | The agreed understanding of the problem | Through new analysis corrections |
| `docs/foundations/` | Mission, architecture, contract, testing, verification, checklist, decisions, roadmap | Between slices, when replanning |
| `docs/<area>/` | Conventions with good and bad examples | When `/ra-doc-create` captures one |
| `.agents/analysis/` | Analysis phases, draft or agreed | Never after agreed, except by a correction entry |
| `.agents/plans/` | One plan per slice, with deviations | Checkboxes and deviations while implementing |
| `.agents/skills/` | The skills; `.claude/skills` and `.opencode/skills` link here | From the harness, never by hand in a project |

## Between slices

Update `docs/foundations/decisions.md` and `roadmap.md` with what the slice taught, and check that the next slice is still the right one.
