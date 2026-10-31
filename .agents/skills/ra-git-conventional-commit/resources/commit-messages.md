# Commit messages

```
type(scope): summary          at most 50 characters in total

Body: what changed and why, wrapped at 72 columns.
```

## Subject

- `type(scope): summary`, scope optional. Drop the scope when the subject would exceed 50 characters.
- Summary in the imperative ("add", not "added" or "adds"), lowercase first letter, no period.
- Breaking change: `type!: summary`, explained in the body.

## Types

Prefer the most specific type.

| Type | For |
|---|---|
| `feat` | A new behaviour for users |
| `fix` | A bug fix |
| `refactor` | A code change that adds no behaviour and fixes no bug |
| `perf` | A performance improvement |
| `test` | Adding or correcting tests only |
| `docs` | Documentation only |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Anything else outside source and tests |
| `revert` | Reverting a previous commit |

## Body

- What changed and why, not how: the diff shows how.
- Wrapped at 72 columns, separated from the subject by a blank line.
- Omit it when the subject says everything.

## Good

```
feat(deposits): credit bonus every third deposit

Customers asked why their bonus balance did not grow. The rule existed
in the spec but no use case applied it; the Customer aggregate now
credits it on the third deposit.
```

## Bad

```
Added bonus logic.
```

- No type, past tense, capital letter, period, and nothing about why.
