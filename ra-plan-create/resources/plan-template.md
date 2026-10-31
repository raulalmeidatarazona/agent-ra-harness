---
name: "<plan name>"
description: "<one sentence>"
created_at: "<YYYY-MM-DDTHH:MM:SSZ>"
created_by:
  tool: "<Claude Code | Codex>"
  model:
    name: "<e.g. Claude Opus>"
    version: "<e.g. 4.6>"
    reasoning_effort: "<low | medium | high>"
---

# <Plan title>

## Goal

<1-3 sentences>

## Context

- Brief: <path>
- Data: <path>
- Conventions: `AGENTS.md`, <docs/...>

## Decisions

- <choice> instead of <alternative> because <reason>.
- Out of scope: <...>

## Risks and spikes

| Risk | How we find out early | Time box |
|---|---|---|
| <risk> | <spike or test> | <20 min> |

## Time budget

| Phase | Budget | Running total |
|---|---|---|
| 1 | <0:45> | <0:45> |

## Phases

### Phase 1: <vertical slice>

<What the user can do at the end of this phase>

**Contracts**

```yaml
# API
GET /articles?...
```

```ts
// Handler
// Port
```

**Tests**

- `<suite>`: <behaviours>

- [ ] Acceptance test (red): <...>
- [ ] Entry adapter + command/query + handler
- [ ] Domain + port
- [ ] In-memory adapter (green)
- [ ] Concrete adapter + same contract suite
- [ ] Verify typecheck, lint and all tests with `<command>`. Fix issues if any.
- [ ] Self-review the diff against the plan guidelines checklist.
- [ ] STOP. Present changes, verification output and commit messages. Wait for the user.

## Cut list

1. <first thing to cut>
- Never cut: <...>

## Grading map

| Criterion | Weight | Phase(s) |
|---|---|---|

## Deviations

<!-- filled during implementation: what changed vs plan and why -->

## Next step

Implement Phase 1 with `/ra-plan-phase-implement`.
