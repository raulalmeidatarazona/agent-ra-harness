# Dependency injection

Classes receive their dependencies through the constructor, and only infrastructure knows how to build them.

## Rule

- Constructor injection only; no `new` of an adapter inside domain or application code.
- Ports are abstract classes, so they also serve as runtime tokens for the container.
- Domain and application classes carry no framework decorators. The framework module in `infrastructure/` wires them with factories.

## Why

- Application code stays framework-free and is built in tests with plain `new` and hand-written mocks.
- The wiring of the whole context is visible in one module.

## Good

```ts
// domain/CustomerRepository.ts
export abstract class CustomerRepository {
  abstract findForUpdate(id: CustomerId): Promise<Customer>;
  abstract save(customer: Customer): Promise<void>;
}

// infrastructure/CustomerModule.ts
@Module({
  controllers: [DepositMoneyController],
  providers: [
    { provide: CustomerRepository, useClass: PostgresCustomerRepository },
    { provide: Clock, useClass: SystemClock },
    {
      provide: DepositMoneyHandler,
      useFactory: (customers: CustomerRepository, transaction: Transaction, clock: Clock) =>
        new DepositMoneyHandler(customers, transaction, clock),
      inject: [CustomerRepository, Transaction, Clock],
    },
  ],
})
export class CustomerModule {}
```

## Bad

```ts
@Injectable()
export class DepositMoneyHandler {
  private readonly customers = new PostgresCustomerRepository(new Pool());
}
```

- The application layer imports the framework and builds its own adapter: it cannot be tested without a database.

## Related

- [Hexagonal architecture](hexagonal-architecture.md)
- [Hand-written mocks](../testing/hand-written-mocks.md)
