# Hexagonal architecture

Code lives in three layers per bounded context, and dependencies only point inwards.

## Rule

| Layer | Contains | May depend on |
|---|---|---|
| `domain/` | Aggregates, value objects, domain errors, repository ports | Domain only |
| `application/<use-case>/` | Command or query, handler, application ports (clock, transaction) | Domain |
| `infrastructure/` | Controllers, SQL repositories, LLM and HTTP clients, framework wiring | Everything |

```
src/<context>/
  domain/
  application/
    deposit-money/
  infrastructure/
    http/
    persistence/
```

- Ports are abstract classes owned by the layer that uses them; adapters in `infrastructure/` implement them.
- A tool checks the rule in the verification command (dependency-cruiser, PHPat, go-arch-lint).

## Why

- Business rules are tested without a database, a framework or a network.
- Replacing an adapter (database, provider) touches only `infrastructure/`.
- The folder tells where any new piece goes.

## Good

```ts
// application/deposit-money/DepositMoneyHandler.ts
export class DepositMoneyHandler {
  constructor(
    private readonly customers: CustomerRepository,
    private readonly clock: Clock,
  ) {}
}
```

## Bad

```ts
// application/deposit-money/DepositMoneyHandler.ts
import { Pool } from 'pg';

export class DepositMoneyHandler {
  constructor(private readonly pool: Pool) {}
}
```

- The application layer imports a driver: its tests need a database and the rule check fails.

## Related

- [One use case per class](use-case-per-class.md)
- [Dependency injection](dependency-injection.md)
- [Business rules live in the domain](rules-in-the-domain.md)
