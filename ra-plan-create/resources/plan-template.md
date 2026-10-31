---
name: "<plan name>"
description: "<one sentence>"
slice: "<roadmap slice number and name>"
created_at: "<YYYY-MM-DDTHH:MM:SSZ>"
created_by:
  tool: "<Claude Code | Codex | ...>"
  model:
    name: "<model name>"
    version: "<model version>"
    reasoning_effort: "<low | medium | high>"
---

# <Plan title>

## Goal

<1-3 sentences>

## Context

- Slice: `docs/foundations/roadmap.md` #<n>
- Foundations: <the docs this plan relies on>
- Patterns to copy: <existing files>

## Decisions

- <choice> instead of <alternative> because <reason>.

**Assumptions**

- <assumption>: <how we will know it is wrong>

**Out of scope**

- <item>

## Risks and spikes

| Risk | How we find out early | Time box |
|---|---|---|
| <risk> | <spike or test> | <20 min> |

## Time budget

<!-- only when there is a deadline -->
| Phase | Budget | Running total |
|---|---|---|
| 1 | <0:45> | <0:45> |

## Phases

### Phase 1: <vertical slice>

<What the user can do at the end of this phase>

**Contracts**

```<contract format>
<operation and payloads>
```

```<language from docs/foundations/contract.md>
// Command/query + handler
// Domain
// Ports
```

**Tests**

- `<suite>`: <behaviours>

**Rollback**: <how to undo this phase>

- [ ] Specify: contract operation, pending acceptance test, entry adapter + command/query + empty handler
- [ ] Design stop: services, ports and domain model agreed with the user
- [ ] Handler unit test (red)
- [ ] Domain and services with their unit tests
- [ ] Handler green
- [ ] Adapters with integration tests (+ migration)
- [ ] Acceptance green, failures and repeated requests covered
- [ ] Docs claim only what the tests prove
- [ ] Verify with `<command from docs/foundations/verification.md>`. Fix issues if any.
- [ ] Self-review the diff against `docs/foundations/review-checklist.md`.
- [ ] STOP. Present changes, verification output and commits. Wait for the user.

## Cut list

1. <first thing to cut>
- Never cut: <...>

## Deviations

<!-- filled during implementation: what changed vs plan and why -->

## Next step

Implement Phase 1 with `/ra-plan-phase-implement`.
