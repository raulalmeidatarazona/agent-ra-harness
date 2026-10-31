# Versioned SQL migrations

Every schema change is a hand-written SQL migration, applied once and never edited after it runs.

## Rule

- One file per change in `migrations/`, named `<UTC timestamp>_<what>.sql`: `20261031120000_create_customers.sql`.
- Plain SQL written by hand; no schema generated from an ORM or from entities.
- A runner records each applied version and its checksum in `schema_migrations` and applies each file once, inside a transaction.
- No `IF NOT EXISTS` or `IF EXISTS`: the runner guarantees a single run, so a guard can only hide a schema that differs from the expected one.
- An applied migration is never edited; a fix is a new migration. A `down` script is for local development only; production fixes forward.
- The same migrations build the application and the test databases.

## Why

- The schema history is reviewable and reproducible on any machine.
- A failing migration leaves nothing half applied (PostgreSQL runs DDL inside transactions).
- A checksum mismatch reveals an edited migration before it causes drift between environments.

## Good

```sql
-- migrations/20261031120000_create_customers.sql
CREATE TABLE customers (
    id UUID NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT pk__customers PRIMARY KEY (id),
    CONSTRAINT uq__customers__email UNIQUE (email)
);
```

## Bad

```sql
-- databases/init.sql, edited again to add a column
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY,
    email TEXT,
    country TEXT
);
```

- Editing an init script only reaches empty databases; existing ones never get `country`.
- `IF NOT EXISTS` skips the statement when the table exists with other columns, so the drift goes unnoticed.

## Exceptions

- MySQL commits DDL implicitly: keep one DDL statement per migration so a failure cannot leave it half applied.

## Related

- [New tables](new-tables.md)
- [NOT NULL by default](not-null-by-default.md)
