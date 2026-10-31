# Convention document format

Short, for a model and a person to read in one pass. No emojis, mascots or closing lines.

~~~markdown
# <Convention as a short noun phrase>

<The rule in one sentence.>

## Rule

<What to do, in at most 5 bullets or a short paragraph.>

## Why

- <What the rule prevents or makes possible, one line each.>

## Good

```<language>
<smallest example that follows the rule>
```

## Bad

```<language>
<the same example breaking the rule>
```

- <One line per problem in the bad example.>

## Exceptions

<Only when there are any: when the rule does not apply and what to do instead.>

## In this repository

<Only in a project: files that follow the rule.>

## Related

- [<Convention>](<relative path>)
~~~

## Rules

- File name: `docs/<area>/<kebab-name>.md`. Areas: `code-style`, `backend`, `frontend`, `database`, `testing`, or the project's own.
- Title and file name name the rule, not the topic: `not-null-by-default.md`, not `database-fields.md`.
- Good and Bad show the same case, so the difference is the rule.
- Omit a section rather than fill it with filler.
