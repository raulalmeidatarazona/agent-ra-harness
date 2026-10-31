# Testing

Prove each behaviour once, at the cheapest level that can prove it.

| Level | Proves | Doubles | Path |
|---|---|---|---|
| Acceptance | a user goal through the contract | none; real database | `<path>` |
| Unit: handler | orchestration: ports called, transaction boundary, errors | mocks or stubs of ports | `<path>` |
| Unit: domain and services | rules and invariants, cases by equivalence partitioning and boundary values | none | `<path>` |
| Integration | each adapter against real infrastructure | none | `<path>` |
| Architecture | dependency rules | n/a | `<path>` |

## Rules

- No in-memory adapters. A temporary one may unblock a port before its adapter exists; delete it in the step that adds the real adapter, because a double tested only by itself drifts.
- Never test the same behaviour twice at different levels.
- External services are stubbed behind their port; one opt-in test calls the real one.
- Fix the code, never weaken a test. A wrong test is explained and changed with approval.

## Test data

<fixtures, builders or object mothers; how the database is reset>
