# NOT NULL by default

A column is `NOT NULL` unless the business allows its value to be absent.

## Rule

- Declare `NOT NULL` on every column the business requires.
- Allow `NULL` only when absence has a meaning ("not published yet") or the data is truly optional; say which in the domain model.
- An empty value that the business accepts (an empty headline) is stored as an empty string, not as `NULL`.

## Why

- The database rejects missing data instead of letting it reach the code.
- Code handles `null` only where it is a real state, not everywhere out of caution.

## Good

```sql
CREATE TABLE customers (
    id UUID NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    phone_number TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    CONSTRAINT pk__customers PRIMARY KEY (id)
);
```

`phone_number` is nullable because the registration form does not ask for it.

## Bad

```sql
CREATE TABLE customers (
    id UUID,
    email TEXT,
    first_name TEXT,
    created_at TIMESTAMPTZ
);
```

- Every required field accepts `NULL`, so a bug in one writer corrupts every reader.

## Related

- [New tables](new-tables.md)
