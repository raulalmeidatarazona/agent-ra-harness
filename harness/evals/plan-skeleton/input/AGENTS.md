# Ticket Search

Lets support agents find tickets with boolean queries and see monthly counts.

## Commands

```bash
make verify   # lint, types, architecture, contract, tests
make test     # tests only
make up       # run locally
```

Slice 0 builds these commands; until then they do not exist.

## Architecture

- Hexagonal architecture with DDD. Contexts: tickets (`src/tickets/`). NestJS for HTTP, PostgreSQL, npm workspaces.
- Layers: domain, application, infrastructure. Dependencies point inwards, checked by dependency-cruiser.

## Rules

- Repository language: English, whatever language the conversation uses.
- Contract first: `openapi/openapi.yaml` is the source of truth; acceptance tests validate against it.
- Commits: Conventional Commits through `/ra-git-conventional-commit`, subject at most 50 characters.
- Review cadence: `step` unless the plan sets `phase` for a phase (see `docs/method.md`).
- Never print or export environment variables.

## Documentation

Read only the docs relevant to your task:

```
docs/
├── method.md                              how work flows from brief to commit
├── analysis.md                            problem, evidence, options, worked examples
├── foundations/                           mission, architecture, contract, testing,
│                                          verification, review checklist, decisions, roadmap
├── code-style/
│   ├── self-documenting-code.md           names explain; no comments that repeat code
│   └── explicit-return-types.md           exported functions declare their return type
├── backend/
│   ├── hexagonal-architecture.md          layers, dependency rule, folders
│   ├── use-case-per-class.md              command or query plus one handler
│   ├── dependency-injection.md            constructor injection, wiring in infrastructure
│   ├── thin-controllers.md                map input, call one handler, map output
│   └── rules-in-the-domain.md             rules in aggregates and value objects
├── database/
│   ├── migrations.md                      versioned SQL, applied once, never edited
│   ├── new-tables.md                      checklist for every table
│   ├── not-null-by-default.md             NULL only when absence means something
│   ├── text-with-check-over-varchar.md    TEXT with named CHECK constraints
│   ├── table-naming.md                    plural entities, owner_related relations
│   ├── keyset-pagination.md               cursor over a unique key, no deep OFFSET
│   └── named-columns-over-select-star.md  named columns, bound parameters, no N+1
└── testing/
    ├── hand-written-mocks.md              one mock class per port
    ├── object-mothers.md                  valid defaults, override what matters
    └── acceptance-bound-to-contract.md    requests and responses checked against the contract
```

`harness/` holds the tools that maintain the skills; a project may delete it.
