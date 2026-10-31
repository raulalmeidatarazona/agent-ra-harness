# Thin controllers

An entry adapter translates the request into a command, calls the handler and translates the result into a response.

## Rule

- A controller, CLI command or consumer does three things: map the input to a command or query, call one handler, map the result or the domain error to the response.
- No business rule, filter, sort or query in the controller.
- The response shape is the one in the contract, mapped explicitly.

## Why

- Rules tested once in the domain work the same from HTTP, CLI or a queue.
- The controller is trivial to read and to keep aligned with the contract.

## Good

```ts
@Controller('customers/:customerId/deposits')
export class DepositMoneyController {
  constructor(private readonly handler: DepositMoneyHandler) {}

  @Post()
  @HttpCode(201)
  async deposit(
    @Param('customerId') customerId: string,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() body: DepositRequest,
  ): Promise<OperationResponse> {
    const result = await this.handler.handle(
      new DepositMoneyCommand(customerId, toCents(body.amount), idempotencyKey),
    );

    return OperationResponse.from(result);
  }
}
```

## Bad

```ts
@Post()
async deposit(@Param('customerId') id: string, @Body() body: DepositRequest): Promise<unknown> {
  const customer = await this.repository.findForUpdate(new CustomerId(id));
  const bonus = customer.deposits % 3 === 2 ? body.amount * 0.1 : 0;
  await this.repository.save(customer);

  return { ...customer, bonus };
}
```

- The bonus rule lives in HTTP code, the repository is used without a handler or transaction, and the response leaks the aggregate.

## Related

- [One use case per class](use-case-per-class.md)
- [Acceptance tests bound to the contract](../testing/acceptance-bound-to-contract.md)
