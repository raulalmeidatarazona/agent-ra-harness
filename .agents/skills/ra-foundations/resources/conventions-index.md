# Conventions index

The agent-ra-harness template ships these conventions in `docs/<area>/`. `ra-foundations` keeps the ones that apply to the project's stack and deletes the rest. A project not created from the template copies them from https://github.com/raulalmeidatarazona/agent-ra-harness/tree/main/docs. Examples are TypeScript and PostgreSQL. Format: `ra-doc-create/resources/doc-format.md`.

| File | Rule | Applies to |
|---|---|---|
| `docs/code-style/self-documenting-code.md` | Names and structure explain the code; no comments that repeat it | Any |
| `docs/code-style/explicit-return-types.md` | Exported functions and public methods declare their return type | TypeScript |
| `docs/backend/hexagonal-architecture.md` | Three layers per context, dependencies inwards, checked by a tool | Any backend |
| `docs/backend/use-case-per-class.md` | Command or query plus one handler per use case | Any backend |
| `docs/backend/dependency-injection.md` | Constructor injection; only infrastructure wires | Any backend |
| `docs/backend/thin-controllers.md` | Entry adapters map input, call one handler, map output | Any backend |
| `docs/backend/rules-in-the-domain.md` | Rules live in aggregates and value objects | Any backend |
| `docs/database/migrations.md` | Versioned hand-written SQL, applied once, never edited | SQL databases |
| `docs/database/new-tables.md` | Checklist for every new table | PostgreSQL |
| `docs/database/not-null-by-default.md` | `NULL` only when absence has a meaning | SQL databases |
| `docs/database/text-with-check-over-varchar.md` | `TEXT` with named `CHECK` constraints | PostgreSQL |
| `docs/database/table-naming.md` | Plural entities, singular owner plus plural relation | SQL databases |
| `docs/database/keyset-pagination.md` | Cursor over a unique sort key, no deep `OFFSET` | SQL databases |
| `docs/database/named-columns-over-select-star.md` | Named columns, bound parameters, no N+1 | SQL databases |
| `docs/testing/hand-written-mocks.md` | One mock class per port; no module mocking or in-memory adapters | Any |
| `docs/testing/object-mothers.md` | Mothers fill every field; tests override what matters | Any |
| `docs/testing/acceptance-bound-to-contract.md` | Acceptance tests validate requests and responses against the contract | HTTP APIs |
