# Plan guidelines

The plan covers one roadmap slice. It cites the foundations instead of repeating them and states only what is new: decisions, contracts, tests and tasks.

## Diagnose first

- Name the real problem in one sentence: a plan for the wrong problem is waste however good it is.
- Say what can be solved without code (configuration, data, a document): the cheapest change is no change.
- Prefer the smallest reversible change: it is cheaper to review and to undo.

## Principles

- **Contract first.** The contract in `docs/foundations/contract.md` is the source of truth and its anchors fail when code diverges. Tie contracts down in the plan: whatever the plan leaves open, the implementing agent decides.
- **Vertical slices.** Each phase is a user goal through every layer it needs, can go to production alone and never leaves the system in a wrong business state. Never split by layers: a backend phase without its consumer hides design errors until later.
- **Phase 1 is visible:** something the user can call, see or run, for early feedback.
- **Boring defaults.** One deployable, SQL, synchronous calls. Anything else is a decision with a concrete reason.
- **Don't gold-plate.** Anything not required goes to the cut list or Out of scope, so the agent does not invent features.

## Order inside a phase (outside-in)

1. **Specify.** The contract operation with every response a client can receive, the acceptance test marked pending, and the entry adapter + command/query + handler doing nothing. The suite stays green.
2. **Design stop.** With the skeleton in front of you, confirm or revise the services, ports and domain model (aggregates, value objects, invariants) the plan proposed. This is the most important step: present it and wait for agreement; a change is a deviation.
3. **Handler unit test, red.** It fails because the services and models do not exist yet. Ports are mocked.
4. **Domain and services.** Unit tests and implementation, one concept at a time.
5. **Handler green.** Implement the orchestration inside its transaction boundary.
6. **Adapters last.** Each port implementation with an integration test against real infrastructure, plus unit tests for its own logic. Migrations here: the schema derives from the ports, not the other way round.
7. **Acceptance green.** Remove the pending mark, then cover failures and repeated requests.
8. **Document** only what the tests prove.

No in-memory adapters. A temporary one may unblock a port before its adapter exists; delete it in the step that adds the real adapter, because a double tested only by itself drifts.

## Questions per phase

Answer only those the phase touches, as decisions or contract details: concurrency, retries, idempotency, partial failure, timeouts, transactions, backpressure, observability, security. They are cheap to decide in the contract and expensive to retrofit.

## Existing code

- Characterisation tests first: they pin today's behaviour, so a change that breaks it is visible.
- Introduce a port at the seam you need instead of rewriting: the old code keeps working behind it.
- Modernise one slice at a time, each one deployable.
- Every phase says how to roll it back.

## Public contracts per phase

Only what changes, in the language of `docs/foundations/contract.md`:

- Contract operations (endpoints, RPCs, commands, events) and payloads.
- Commands/queries and handler signatures.
- Domain: aggregates, value objects, invariants.
- Ports and the adapters that implement them.
- Domain events.
- Database schema: tables, columns, indexes, each index with the query it serves.
- Only if the slice has them: LLM (prompt version, output schema, guardrails), UI copy.

## Test strategy

Follow `docs/foundations/testing.md`. Prove each behaviour once, at the cheapest level. Name the exact fixtures and expected values when the input gives them.

## Plan sections

1. **Goal**: 1-3 sentences.
2. **Context**: roadmap slice, foundations docs used, existing code to copy patterns from.
3. **Decisions**: new ones only, `X instead of Y because Z`. Then **Assumptions** and **Out of scope**.
4. **Risks and spikes**: risk, how we find out early, time box.
5. **Time budget**: only when there is a deadline.
6. **Phases**: description, contracts, tests, tasks (checkboxes), rollback.
7. **Cut list** and **Never cut**.
8. **Deviations**: empty at creation; filled during implementation.
9. **Next step**: one sentence.

## Every phase ends with these three tasks, in this order

1. Run the full verification command from `docs/foundations/verification.md`. Fix issues if any.
2. Self-review the diff against `docs/foundations/review-checklist.md`.
3. **STOP.** Present the changes, the verification output and the proposed commits. Do not continue until the user asks.

## Writing

- The repository language from `AGENTS.md`, English if unset. Short. No em dash (U+2014). Use `:` or `-`.
- Concise: the detail lives in contracts and tests. A decision the contracts already show is not repeated in Decisions, and nothing from the foundations is restated.
- Label claims: fact, assumption, hypothesis or decision; evidence as observed, verified (a command proved it) or inferred. The reader must know what to check.
- Every `- [ ]` is a task; use checkboxes only for tasks.
- No closing slogans or mascots.
