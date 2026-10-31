# Verification

<!-- Example profile for a NestJS + PostgreSQL service with LLM enrichment. -->

| Scope | Command | Expected |
|---|---|---|
| Everything | `npm run verify` (lint, typecheck, architecture, contract lint, tests) | exit 0 |
| Static analysis and architecture | `npm run lint && npm run typecheck && npx depcruise src` | exit 0 |
| Unit | `npm run test:unit` | all green |
| Integration | `npm run test:integration` | all green, needs `docker compose up -d postgres` |
| Acceptance | `npm run test:acceptance` | all green, needs Postgres |
| One test | `npm run test:unit -- -t "<name>"` | |

The real LLM test runs only with `LLM_LIVE=1`; it is excluded from `verify`.

Setup from a clean clone: `docker compose up -d && npm ci && npm run migrate`.
