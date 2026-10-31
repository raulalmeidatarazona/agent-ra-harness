# Keyset pagination

Lists page with a cursor over a unique sort key, never with a deep `OFFSET`.

## Rule

- Sort by a total order: the business column plus the id as tie-breaker, `(published_at DESC, id DESC)`.
- The next page starts after the last row seen: `WHERE (published_at, id) < ($1, $2)`.
- Ask for `limit + 1` rows; the extra row says whether a next page exists.
- The cursor is opaque to clients (encoded) and validated on input; an invalid cursor is a client error.
- An index matches the sort order and the usual filters.

## Why

- `OFFSET n` reads and discards `n` rows, so page 1000 costs a thousand pages.
- Rows inserted while a client pages cannot shift results into duplicates or gaps.

## Good

```sql
SELECT id, headline, source, published_at
FROM articles
WHERE language = $1
  AND (published_at, id) < ($2, $3)
ORDER BY published_at DESC, id DESC
LIMIT $4;
```

## Bad

```sql
SELECT *
FROM articles
WHERE language = $1
ORDER BY published_at DESC
LIMIT 20 OFFSET 2000;
```

- Deep offset, no tie-breaker for equal dates, and `SELECT *`.

## Related

- [Named columns over SELECT *](named-columns-over-select-star.md)
