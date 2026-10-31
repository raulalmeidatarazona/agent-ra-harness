# Architecture

## Style

<One deployable, hexagonal, DDD. Why in one line.>

## Contexts

| Context | Owns | Path |
|---|---|---|
| <context> | <aggregates, capabilities> | `<path>` |

## Layers and dependency rules

| Layer | Contains | May depend on | Checked by |
|---|---|---|---|
| Domain | aggregates, value objects, domain errors, repository ports | domain only | `<tool/rule>` |
| Application | use cases (command/query + handler), application ports (clock, transaction) | domain | `<tool/rule>` |
| Infrastructure | entry adapters (HTTP, CLI, consumers), driven adapters (SQL, LLM, clients), wiring | everything | |

## Where things go

| New... | Goes in |
|---|---|
| Endpoint or command | `<entry adapter path>` + `<application path>/<UseCase>/` |
| Business rule | the aggregate or value object that owns the data |
| Port | the layer that uses it: domain for repositories, application for the rest |
| Adapter | `<infrastructure path>`, with its integration test |
| Migration | `<migrations path>` |

## Cross-cutting decisions

- <idempotency, concurrency, transactions, timeouts... only those that apply>
