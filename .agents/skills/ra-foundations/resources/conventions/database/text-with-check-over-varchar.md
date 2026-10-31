# TEXT with CHECK over VARCHAR

In PostgreSQL, strings are `TEXT` with named `CHECK` constraints, never `VARCHAR(n)` or `CHAR(n)`.

## Rule

- Use `TEXT` and express limits as `CHECK`: `length(x) <= 100`, `length(x) = 3`, `x ~ '^[A-Z]{3}$'`.
- Name each check `chk__<table>__<field>__<rule>`.

## Why

- `TEXT` and `VARCHAR` perform the same in PostgreSQL; `CHECK` also expresses ranges and patterns.
- Changing a `CHECK` does not rewrite the table, unlike changing a `VARCHAR` length.
- `CHAR(n)` pads values with spaces.

## Good

```sql
CREATE TABLE countries (
    id UUID NOT NULL,
    name TEXT NOT NULL
        CONSTRAINT chk__countries__name__max_length CHECK (length(name) <= 100),
    iso_code TEXT NOT NULL
        CONSTRAINT chk__countries__iso_code__alpha_3 CHECK (iso_code ~ '^[A-Z]{3}$'),
    CONSTRAINT pk__countries PRIMARY KEY (id)
);
```

## Bad

```sql
CREATE TABLE countries (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    iso_code CHAR(3) NOT NULL
);
```

- The length lives in the type, and `CHAR(3)` accepts `'ab '` padded instead of rejecting it.

## Exceptions

- MySQL: use `VARCHAR(n)`; `TEXT` there has storage and indexing limits.

## Related

- [New tables](new-tables.md)
