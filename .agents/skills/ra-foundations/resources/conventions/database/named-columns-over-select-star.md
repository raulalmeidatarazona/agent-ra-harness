# Named columns over SELECT *

Queries list the columns they read, and every value from outside arrives as a bound parameter.

## Rule

- Name the columns in every `SELECT`; no `SELECT *` in application code.
- Values go as parameters (`$1`); identifiers that vary (sort column, time unit) come from a whitelist in code.
- One query per list: load related data with a join or `WHERE id = ANY($1)`, never one query per row.

## Why

- A new column cannot change a response or leak data by accident.
- Parameters make SQL injection impossible; a whitelist does the same for identifiers.
- No N+1 queries hiding inside a loop.

## Good

```ts
const units = { month: 'month', week: 'week' } as const;

const { rows } = await this.pool.query(
  `SELECT date_trunc('${units[granularity]}', published_at) AS period, count(*) AS total
   FROM articles
   WHERE language = $1
   GROUP BY period
   ORDER BY period`,
  [language],
);
```

## Bad

```ts
const { rows } = await this.pool.query(
  `SELECT * FROM articles WHERE language = '${language}'`,
);
for (const row of rows) {
  row.enrichment = (await this.pool.query(`SELECT * FROM enrichments WHERE article_id = '${row.id}'`)).rows[0];
}
```

- User input interpolated into SQL, `SELECT *`, and one query per article.

## Related

- [Keyset pagination](keyset-pagination.md)
