# Business rules live in the domain

A rule lives in the aggregate or value object that owns the data it checks.

## Rule

- Invariants are enforced in constructors and methods of aggregates and value objects; an invalid object cannot exist.
- Handlers orchestrate and never decide: no `if` on business data in a handler.
- Primitives that carry rules become value objects: `Money`, `Email`, `CustomerId`, `BonusRate`.

## Why

- The rule is written and tested once, wherever the use case is called from.
- Value objects remove whole classes of bugs: no negative money, no malformed email, no `float` arithmetic.

## Good

```ts
export class Customer {
  deposit(amount: Money, at: Date): DepositResult {
    this.deposits += 1;
    const bonus = this.isEveryThirdDeposit() ? this.bonusRate.applyTo(amount) : Money.zero();
    this.realBalance = this.realBalance.add(amount);
    this.bonusBalance = this.bonusBalance.add(bonus);

    return new DepositResult(amount, bonus, this.realBalance, this.bonusBalance, at);
  }

  private isEveryThirdDeposit(): boolean {
    return this.deposits % 3 === 0;
  }
}
```

## Bad

```ts
async handle(command: DepositMoneyCommand): Promise<void> {
  const customer = await this.customers.findForUpdate(new CustomerId(command.customerId));
  if (customer.deposits % 3 === 2) {
    customer.bonusBalance += command.amount * customer.bonusRate / 100;
  }
  customer.realBalance += command.amount;
  await this.customers.save(customer);
}
```

- The handler owns the rule and mutates public fields: another use case can break the invariant.
- Money is a `number`, so rounding errors reach the balance.

## Related

- [One use case per class](use-case-per-class.md)
- [Self-documenting code](../code-style/self-documenting-code.md)
