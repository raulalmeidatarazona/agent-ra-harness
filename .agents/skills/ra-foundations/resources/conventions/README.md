# Conventions library

Copied into a project's `docs/<area>/` by `ra-foundations` when they apply to its stack. Examples are TypeScript and PostgreSQL; adapt them to the project's language when copying. Format: `ra-doc-create/resources/doc-format.md`.

| File | Rule | Applies to |
|---|---|---|
| `code-style/self-documenting-code.md` | Names and structure explain the code; no comments that repeat it | Any |
| `code-style/explicit-return-types.md` | Exported functions and public methods declare their return type | TypeScript |
| `backend/hexagonal-architecture.md` | Three layers per context, dependencies inwards, checked by a tool | Any backend |
| `backend/use-case-per-class.md` | Command or query plus one handler per use case | Any backend |
| `backend/dependency-injection.md` | Constructor injection; only infrastructure wires | Any backend |
| `backend/thin-controllers.md` | Entry adapters map input, call one handler, map output | Any backend |
| `backend/rules-in-the-domain.md` | Rules live in aggregates and value objects | Any backend |
| `database/migrations.md` | Versioned hand-written SQL, applied once, never edited | SQL databases |
| `database/new-tables.md` | Checklist for every new table | PostgreSQL |
| `database/not-null-by-default.md` | `NULL` only when absence has a meaning | SQL databases |
| `database/text-with-check-over-varchar.md` | `TEXT` with named `CHECK` constraints | PostgreSQL |
| `database/table-naming.md` | Plural entities, singular owner plus plural relation | SQL databases |
| `database/keyset-pagination.md` | Cursor over a unique sort key, no deep `OFFSET` | SQL databases |
| `database/named-columns-over-select-star.md` | Named columns, bound parameters, no N+1 | SQL databases |
| `testing/hand-written-mocks.md` | One mock class per port; no module mocking or in-memory adapters | Any |
| `testing/object-mothers.md` | Mothers fill every field; tests override what matters | Any |
| `testing/acceptance-bound-to-contract.md` | Acceptance tests validate requests and responses against the contract | HTTP APIs |
