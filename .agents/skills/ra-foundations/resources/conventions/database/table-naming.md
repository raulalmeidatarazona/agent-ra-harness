# Table naming

Plural for entities, singular owner plus plural for relationships, singular for uncountable concepts.

## Rule

- Entities: `customers`, `articles`, `operations`.
- Relationships: `customer_courses`, `article_topics`.
- Uncountable or abstract concepts: `llm_usage`, `system_configuration`.
- `snake_case`, no prefixes such as `tbl_`.

## Why

- The name is predictable, so nobody debates it per table and queries are guessed right.

## Good

```sql
CREATE TABLE articles (...);
CREATE TABLE article_topics (...);
CREATE TABLE llm_usage (...);
```

## Bad

```sql
CREATE TABLE article (...);
CREATE TABLE articles_topics (...);
CREATE TABLE llm_usages (...);
```

- Singular entity, both parts plural in the relationship, plural of an uncountable noun.

## Related

- [New tables](new-tables.md)
