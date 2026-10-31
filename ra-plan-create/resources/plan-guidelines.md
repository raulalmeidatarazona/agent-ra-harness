# Plan guidelines

## Principles

- **Contract first.** The HTTP contract is a hand-written OpenAPI file and the source of truth. No framework decorators generate it. Tests validate responses against it.
- **Outside-in.** Inside each phase the order is: acceptance test (red) → entry adapter + command/query + handler → domain (aggregates, value objects) + ports → in-memory adapter (green) → concrete adapters (SQL, LLM, HTTP clients) → same contract tests against the concrete adapter.
- **Ports are born from use cases**, not from tables. The schema is derived from the ports, at the end of the phase.
- **Vertical slices.** Each phase delivers a goal a user can complete through every layer it needs, builds, passes verification alone, and never leaves the system in a wrong business state. Never split a feature by layers across phases.
- **Phase 1 is visible:** something the user can call, see or run.
- **Don't gold-plate.** Anything not required goes to the cut list or "With more time".

## Public contracts per phase

Only the types that change, grouped:

- API endpoints and payloads (OpenAPI paths and schemas).
- Commands/queries and handler signatures.
- Domain: aggregates, value objects and their invariants.
- Ports (driven interfaces) and which adapters implement them.
- Domain events and attributes.
- Database schema: tables, columns, indexes, each index with the query it serves.
- LLM: prompt version, output schema, guardrails (input cap, cache key, budget).
- Test suites and the behaviours each one covers.
- UI copy.

## Test strategy (prove each behaviour once, at the cheapest level)

- One acceptance test per user goal, through the public API or UI.
- Domain and handler unit tests for the rules, cases picked by equivalence partitioning and boundary values.
- One adapter contract suite per port, run against the in-memory and the concrete adapter.
- A few browser tests only for what only a browser proves (XSS, stale responses).
- Never test the same behaviour twice at different levels.
- Name the exact fixtures and expected IDs when the task gives them.

## Plan sections

1. **Goal**: 1-3 sentences.
2. **Context**: linked files, docs from `AGENTS.md`, inputs (brief, sample data).
3. **Decisions**: one line each, `X instead of Y because Z`. End with **Out of scope**.
4. **Risks and spikes**: risk, how we find out early, time box.
5. **Time budget**: per phase, and the running total.
6. **Phases**: description, contracts, tests, tasks (checkboxes). Tasks cite existing code to copy patterns from.
7. **Cut list**: what to cut first if behind schedule, in order. And **Never cut**.
8. **Grading map** (assignments only): which phase earns each grading criterion.
9. **Deviations**: empty at creation; filled during implementation.
10. **Next step**: one sentence.

## Every phase ends with these three tasks, in this order

1. Verify typecheck, lint and all tests with the project's verification command. Fix issues if any.
2. Self-review the diff: architecture boundaries (domain imports no infrastructure), no secrets, no `SELECT *`, no `OFFSET` pagination, no rendering of untrusted HTML, docs claim only what tests prove.
3. **STOP.** Present the changes, the verification output and suggested commit messages. Do not continue until the user asks.

## Writing

- English. Short. No `—` character. Use `:` or `-`.
- Every `- [ ]` is a task; use checkboxes only for tasks.
- No closing slogans or mascots.
