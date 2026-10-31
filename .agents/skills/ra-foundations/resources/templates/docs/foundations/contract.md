# Contract

- Type: <OpenAPI | protobuf | CLI | events | UI>
- Source of truth: `<path>`, hand-written. Code never generates it.
- Signatures in plans are written in: `<language>`

## Anchors

The contract is code, not documentation: a test fails when code and contract diverge.

1. Acceptance tests validate every request and response against the contract.
2. A check compares implemented operations with the contract in both directions.
3. The contract is linted in the verification command.
4. A test that leaves the contract on purpose (malformed input) opts out explicitly.

| Contract | 1. Acceptance | 2. Both directions | 3. Lint |
|---|---|---|---|
| OpenAPI | request/response validator in the test client | routes vs operations test | Redocly or Spectral |
| protobuf | tests call generated clients | registered services vs `.proto` | `buf lint`, `buf breaking` |
| CLI | golden tests of stdout, stderr and exit codes | commands vs help or docs | n/a |
| Events | schema validation on publish and consume in tests | producers and consumers vs schemas | schema compatibility check |

## New operation

Describe it with every response a client can receive, write the acceptance test, then implement until behaviour and contract pass.
