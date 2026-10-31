# Self-documenting code

Code explains itself through names and structure; comments do not repeat what the code does.

## Rule

- Name variables, functions and types after the intent, not the mechanics.
- Extract a well-named function, value object or constant instead of writing a comment above a block.
- A comment is allowed only for what code cannot say: why a non-obvious choice was made, with a link to its source.
- No commented-out code and no `TODO`: delete it, or open an issue.

## Why

- Comments drift from the code they describe; names are checked by the compiler and by every reader.
- An extracted function can be tested and reused; a commented block cannot.
- Less noise for a model reading the file: every line carries behaviour.

## Good

```ts
if (this.isEveryThirdDeposit()) {
  this.bonusBalance = this.bonusBalance.add(this.bonusRate.applyTo(amount));
}
```

## Bad

```ts
// every third deposit gets a bonus
if (this.deposits % 3 === 0) {
  // bonus is a percentage of the amount
  this.bonus = this.bonus + amount * (this.rate / 100);
}
```

- The comments say what `isEveryThirdDeposit` and `applyTo` would say as names.
- The rule is buried in arithmetic that cannot be tested on its own.

## Exceptions

- A workaround for an external defect: one line with the reason and a link to the issue.
- Public documentation of a published library or API.

## Related

- [Business rules live in the domain](../backend/rules-in-the-domain.md)
- [Explicit return types](explicit-return-types.md)
