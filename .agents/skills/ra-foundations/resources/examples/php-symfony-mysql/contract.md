# Contract

<!-- Example profile taken from a Symfony 7.4 + MySQL wallet API. -->

- Type: OpenAPI 3.1
- Source of truth: `docs/openapi/<api>_openapi.yml`, hand-written. Code never generates it.
- Signatures in plans are written in: `php`

## Anchors

1. `tests/Acceptance/AcceptanceTestCase.php` validates every request and response with `osteel/openapi-httpfoundation-testing`; an undocumented path fails the test.
2. `tests/Contract/RoutesMatchOpenApiTest.php` compares Symfony routes and OpenAPI operations in both directions.
3. `make analyse` lints the specification with Redocly CLI.
4. Opt-outs: `sendWithoutRequestValidation()` for malformed input, `sendOutsideContract()` for router behaviour outside the API.

## New operation

Describe it with every response, add the acceptance test marked incomplete, route it through a command to a handler that does nothing yet. The suite stays green.
