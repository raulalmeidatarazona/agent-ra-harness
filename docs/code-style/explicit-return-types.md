# Explicit return types

Every exported function and public method declares its return type.

## Rule

- Write the return type on exported functions and on public methods, `Promise<T>` included.
- Enforce it with `@typescript-eslint/explicit-module-boundary-types` and `strict: true` in `tsconfig.json`.

## Why

- The signature is the contract: a reader and a model see it without reading the body.
- A change in the body that alters the returned type fails at compile time instead of in a caller.

## Good

```ts
async handle(command: DepositMoneyCommand): Promise<DepositResult> {
  const customer = await this.customers.findForUpdate(new CustomerId(command.customerId));

  return customer.deposit(Money.fromCents(command.amountInCents), this.clock.now());
}
```

## Bad

```ts
async handle(command: DepositMoneyCommand) {
  const customer = await this.customers.findForUpdate(new CustomerId(command.customerId));

  return customer.deposit(Money.fromCents(command.amountInCents), this.clock.now());
}
```

- The return type is inferred; renaming a field in `deposit` silently changes what callers receive.

## Related

- [Self-documenting code](self-documenting-code.md)
