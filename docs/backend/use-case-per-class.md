# One use case per class

Each use case is a command or query plus one handler, in its own folder.

## Rule

- Folder `application/<use-case>/` with `<UseCase>Command.ts` (or `Query`) and `<UseCase>Handler.ts`.
- The handler has one public method, `handle`, and orchestrates: load, call the domain, save.
- Name the use case after the action the user performs: `DepositMoney`, `SearchArticles`.
- No `<Entity>Service` classes that gather unrelated operations.

## Why

- A small class with one reason to change is easy to name, test and review.
- The folder list of `application/` reads as the list of what the system does.

## Good

```ts
export class DepositMoneyCommand {
  constructor(
    readonly customerId: string,
    readonly amountInCents: number,
    readonly idempotencyKey: string,
  ) {}
}

export class DepositMoneyHandler {
  constructor(
    private readonly customers: CustomerRepository,
    private readonly transaction: Transaction,
    private readonly clock: Clock,
  ) {}

  async handle(command: DepositMoneyCommand): Promise<DepositResult> {
    return this.transaction.run(async () => {
      const customer = await this.customers.findForUpdate(new CustomerId(command.customerId));
      const result = customer.deposit(Money.fromCents(command.amountInCents), this.clock.now());
      await this.customers.save(customer);

      return result;
    });
  }
}
```

## Bad

```ts
export class CustomerService {
  async register(...): Promise<Customer> {}
  async deposit(...): Promise<DepositResult> {}
  async withdraw(...): Promise<WithdrawalResult> {}
  async report(...): Promise<Report> {}
}
```

- Four reasons to change in one class, and its constructor grows with every dependency of every operation.

## Related

- [Hexagonal architecture](hexagonal-architecture.md)
- [Thin controllers](thin-controllers.md)
