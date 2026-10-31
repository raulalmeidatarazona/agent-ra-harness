# Question bank

Ask only what the input leaves open. One round per section, at most 4 questions per round. Each default below is the recommended answer unless the input gives a concrete reason against it.

## 1. Mission and scope

- Problem and users: who has the problem and how they solve it today.
- Success: observable criteria (a user can..., p95 under..., cost under...).
- Constraints: deadline or time budget, mandated stack, deployment target, budget.
- Deliverables beyond code (README sections, transcript, demo) and grading criteria if any.
- Out of scope: name it now, or the agent fills the gap with features.

## 2. Architecture

- Deployables. Default: one. Split only for a different scaling or ownership need.
- Style: fixed, hexagonal with DDD, three layers (domain, application, infrastructure), dependencies pointing inwards. Ask only the bounded contexts: one per business capability, named in the domain language.
- Persistence. Default: a relational database with hand-written migrations. Another store only for a query the database cannot serve.
- Integration. Default: synchronous calls. A queue only for work that must survive a crash or outlive the request.
- Language, framework and versions. Default: what the team or brief already uses.
- Enforcement: which tool checks the dependency rules (PHPat, dependency-cruiser, go-arch-lint, ArchUnit) and which static analysis level.

## 3. Contract and testing

- Contract type: HTTP (OpenAPI), gRPC (protobuf), CLI, events, UI. Default: hand-written, the source of truth, never generated from code.
- Anchors: how tests bind the contract (see `templates/docs/foundations/contract.md`).
- Test levels: acceptance per user goal through the contract, unit tests for handlers, services and domain, integration tests for every adapter against real infrastructure, architecture tests.
- Test infrastructure. Default: the real database in a container, reset per test. No in-memory adapters; a temporary one is allowed only to unblock a port before its adapter exists, and is deleted with that step.
- External services (LLM, payment, email): real adapter behind a port, stubbed in tests, one opt-in test against the real service.

## 4. Cross-cutting concerns

Ask only those the input touches. Each answer becomes a decision and, when it applies, a contract detail.

- Idempotency of writes (idempotency key, natural key).
- Concurrency: what two simultaneous requests must not break; lock or optimistic version.
- Transactions: the boundary of each use case.
- External calls: timeout, retries with backoff, what a partial failure leaves behind.
- Load: pagination (keyset over offset), rate limits, backpressure, budgets.
- Observability: logs, metrics and traces needed to debug the first incident.
- Security: untrusted input (SQL, HTML, prompts), secrets, authentication, data protection.

## 5. Roadmap

- Slice 0: walking skeleton and nothing more: the verification command running in the repository, one trivial operation that touches the real infrastructure, the contract anchors and the architecture checks. UI polish, resilience cases and extra tooling belong to the slices that need them.
- Slices: one per user goal, each deployable alone and never leaving the system in a wrong business state. Riskiest first. A slice includes the UI, security and docs its goal needs; there is no UI, hardening or docs slice.
- What each slice decides in its own plan (algorithm, indexes, prompt): listed in the roadmap, not decided here.
- Spikes: time-boxed, before the slice that needs them.
- Budget per slice and cut list, when there is a deadline.
