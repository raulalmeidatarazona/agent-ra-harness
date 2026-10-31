# Architecture

One deployable: NestJS API plus PostgreSQL, TypeScript strict. Hexagonal with DDD, one context `tickets` in `src/tickets/{domain,application,infrastructure}`. dependency-cruiser checks that domain and application import nothing from infrastructure, NestJS or `pg`.
