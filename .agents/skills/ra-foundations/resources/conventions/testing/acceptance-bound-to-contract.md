# Acceptance tests bound to the contract

Every acceptance test validates its request and response against the hand-written contract, so the contract cannot drift from the code.

## Rule

- The test client validates each request and each response (status, headers, body) against `openapi/openapi.yaml`.
- A request to an operation missing from the contract fails the test.
- A separate test compares the application's routes with the contract operations in both directions.
- A test that sends invalid input on purpose skips request validation explicitly and still validates the response.
- The contract is linted in the verification command.

## Why

- The contract is code: a change that breaks it fails a test instead of surprising a client.
- Documentation and behaviour cannot disagree, because one is checked against the other on every run.

## Good

```ts
export async function post(path: string, body: unknown, headers: Record<string, string> = {}): Promise<Response> {
  const response = await request(app.getHttpServer()).post(path).set(headers).send(body);
  contract.assertRequest('post', path, { body, headers });
  contract.assertResponse('post', path, response);

  return response;
}

it('credits the bonus on the third deposit', async () => {
  const customer = await registerCustomer();
  await deposit(customer.id, '100.00', 'deposit-1');
  await deposit(customer.id, '100.00', 'deposit-2');

  const response = await deposit(customer.id, '100.00', 'deposit-3');

  expect(response.status).toBe(201);
  expect(response.body.bonus_amount).toBe(bonusOf(customer, '100.00'));
});
```

## Bad

```ts
it('deposits', async () => {
  const response = await request(app.getHttpServer())
    .post('/customers/1/deposits')
    .send({ amount: 100 });

  expect(response.status).toBe(201);
});
```

- Nothing checks the body or the request against the contract: the API can return fields the documentation does not promise.

## Related

- [Thin controllers](../backend/thin-controllers.md)
