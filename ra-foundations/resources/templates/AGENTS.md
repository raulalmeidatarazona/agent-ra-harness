# <Project>

<One sentence: what it does and for whom.>

## Commands

```bash
<command>   # full verification: lint, types, architecture, contract, tests
<command>   # tests only (add a filter: <example>)
<command>   # run locally
```

## Architecture

- <Style>. Contexts: <context> (`<path>`).
- Layers: domain, application, infrastructure. Dependencies point inwards, checked by `<tool>`.

## Rules

- Contract first: `<contract path>` is the source of truth; acceptance tests validate against it.
- Commits: Conventional Commits, one per step of 3 to 5 files, proposed and made only after approval.
- Never print or export environment variables.

## Documentation

Read only the docs relevant to your task:

```
docs/
├── foundations/
│   ├── mission.md           why, users, scope, out of scope
│   ├── architecture.md      layers, dependency rules, where things go
│   ├── contract.md          contract type and how tests bind it
│   ├── testing.md           test levels and what each proves
│   ├── verification.md      commands per layer
│   ├── review-checklist.md  stack-specific review items
│   ├── decisions.md         decisions, assumptions, open questions
│   └── roadmap.md           vertical slices and their status
└── <area>/<convention>.md   conventions captured from corrections
```
