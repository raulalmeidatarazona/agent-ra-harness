# Review checklist

<!-- Example profile for a NestJS + PostgreSQL service with LLM enrichment. -->

- Every query uses parameters or whitelisted identifiers; no `SELECT *`.
- List endpoints use keyset pagination, never deep `OFFSET`; each index names the query it serves.
- Untrusted HTML is never rendered: the UI escapes article text, no `dangerouslySetInnerHTML`.
- Prompts treat article text as data inside delimiters; model output is validated against its schema.
- Every LLM call goes through the budget and cache guard; tests never call the real provider.
- Domain and application import nothing from `@nestjs/*`, `pg` or the LLM SDK.
