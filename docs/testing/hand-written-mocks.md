# Hand-written mocks

Unit tests replace each port with a hand-written mock that implements it, never with module mocking or an in-memory adapter.

## Rule

- One mock class per port, implementing it, next to the tests: `tests/<context>/infrastructure/MockCustomerRepository.ts`.
- The mock exposes `should*` methods to declare what the test expects; the port method checks the call itself.
- `jest.fn()` (or `vi.fn()`) only inside a mock, or for a trivial callback.
- No `jest.mock()` of modules and no `{ save: jest.fn() } as unknown as Port` casts.
- No in-memory adapters standing in for real infrastructure. Adapters are tested against the real thing in integration tests.

## Why

- Tests read as a specification: "the repository should save this customer".
- A mock that implements the port breaks at compile time when the port changes; a cast does not.
- An in-memory adapter tested only by itself drifts from the real one and hides its bugs.

## Good

```ts
export class MockCustomerRepository extends CustomerRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindForUpdate = jest.fn();

  async findForUpdate(id: CustomerId): Promise<Customer> {
    return this.mockFindForUpdate(id) as Customer;
  }

  async save(customer: Customer): Promise<void> {
    expect(this.mockSave).toHaveBeenCalledWith(customer.toPrimitives());
  }

  shouldFind(customer: Customer): void {
    this.mockFindForUpdate.mockReturnValue(customer);
  }

  shouldSave(customer: Customer): void {
    this.mockSave(customer.toPrimitives());
  }
}
```

```ts
it('credits the bonus on the third deposit', async () => {
  const customer = CustomerMother.withDeposits(2, { bonusRate: 10 });
  repository.shouldFind(customer);
  repository.shouldSave(CustomerMother.afterDeposit(customer, Money.fromCents(10_000)));

  await handler.handle(DepositMoneyCommandMother.create({ amountInCents: 10_000 }));
});
```

## Bad

```ts
jest.mock('../infrastructure/PostgresCustomerRepository');

it('deposits', async () => {
  const repository = { findForUpdate: jest.fn(), save: jest.fn() } as unknown as CustomerRepository;
  const handler = new DepositMoneyHandler(repository, transaction, clock);

  await handler.handle(new DepositMoneyCommand('id', 100, 'key'));

  expect(repository.save).toHaveBeenCalled();
});
```

- Module mocking couples the test to a file path, the cast hides port changes, and the assertion checks only that something was saved.

## Related

- [Object mothers](object-mothers.md)
- [Dependency injection](../backend/dependency-injection.md)
