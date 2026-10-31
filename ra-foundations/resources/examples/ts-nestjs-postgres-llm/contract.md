# Contract

<!-- Example profile for a NestJS + PostgreSQL service with LLM enrichment. -->

- Type: OpenAPI 3.1
- Source of truth: `openapi/openapi.yaml`, hand-written. No `@nestjs/swagger` decorators generate it.
- Signatures in plans are written in: `ts`

## Anchors

1. Acceptance tests send requests with `supertest` and validate request and response with an OpenAPI validator (`openapi-response-validator` or `jest-openapi`); an undocumented path fails.
2. A contract test lists the Nest routes and compares them with the OpenAPI operations in both directions.
3. `npx @redocly/cli lint openapi/openapi.yaml` runs in the verification command.
4. Tests of malformed input opt out of request validation explicitly and still validate the response.

## LLM output contract

- Each prompt has a version and an output JSON schema; the adapter validates the model output against it and rejects what does not match.
- Guardrails: input cap in tokens, cache key, daily budget. Article text is untrusted data, never instructions.
