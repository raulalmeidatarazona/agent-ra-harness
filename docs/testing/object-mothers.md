# Object mothers

Tests build aggregates, value objects and commands through mothers that fill every field and let the test override only what matters.

## Rule

- One mother per aggregate, value object or command: `CustomerMother`, `MoneyMother`, `DepositMoneyCommandMother`, under `tests/<context>/domain/` or next to the use case tests.
- `create(overrides?: Partial<Primitives>)` fills every field with valid random data and applies the overrides.
- Named constructors for states the tests need: `CustomerMother.withDeposits(2)`.
- Mothers build through the domain (`fromPrimitives` or the factory), so they cannot produce an invalid object.

## Why

- A test shows only the values that matter to it; the rest is noise.
- Random valid data exposes hidden dependencies on specific values.
- A change in the aggregate is fixed in one mother instead of in every test.

## Good

```ts
export class CustomerMother {
  static create(overrides?: Partial<CustomerPrimitives>): Customer {
    return Customer.fromPrimitives({
      id: CustomerIdMother.create().value,
      email: faker.internet.email(),
      country: faker.location.countryCode('alpha-2'),
      bonusRate: faker.number.int({ min: 5, max: 20 }),
      deposits: 0,
      realBalanceInCents: 0,
      bonusBalanceInCents: 0,
      ...overrides,
    });
  }

  static withDeposits(deposits: number, overrides?: Partial<CustomerPrimitives>): Customer {
    return CustomerMother.create({ deposits, ...overrides });
  }
}
```

## Bad

```ts
const customer = Customer.fromPrimitives({
  id: '0190c4c4-0000-7000-8000-000000000001',
  email: 'ada@example.com',
  country: 'MT',
  bonusRate: 10,
  deposits: 2,
  realBalanceInCents: 0,
  bonusBalanceInCents: 0,
});
```

- Every test repeats seven fields, only `deposits` and `bonusRate` matter, and a new field breaks them all.

## Exceptions

- Acceptance fixtures computed from real sample data keep their exact values: the expected result depends on them.

## Related

- [Hand-written mocks](hand-written-mocks.md)
