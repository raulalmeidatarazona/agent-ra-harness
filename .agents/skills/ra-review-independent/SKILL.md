---
name: ra-review-independent
description: Read-only independent review of the current code by a different model. Reports only reproducible defects and unsupported claims. Use before closing a phase that touches money, security, concurrency or data integrity, and before delivery.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital)
  version: "1.1"
  license: MIT
---

# Independent review

Run this with a **different model** from the one that implemented (e.g. Codex reviewing Claude's work). A second model finds what the first one cannot see.

## Boundaries

- Read-only. Do not edit files, do not commit, do not write to databases. Running tests and read-only queries is allowed.
- Scope: the diff since `<base>` (ask if not given), or HEAD for a delivery review.
- Read `AGENTS.md`, `docs/foundations/contract.md`, `review-checklist.md` and the plan of the slice when they exist.

## What to report

1. **Defects**: only with a concrete reproduction (input, command, expected vs actual). Look first for:
   - wrong results and data loss;
   - security: injection, untrusted output, secrets;
   - concurrency, idempotency, partial failure, transactions, timeouts;
   - contract drift: code vs the contract in `contract.md`, or an anchor that does not really check;
   - items of `review-checklist.md`.
2. **Unsupported claims**: sentences in README, docs or the plan that no test or code supports.
3. **Hypotheses**: suspicions you could not reproduce, clearly labelled.

Do not report style preferences or refactor ideas.

## Output

```json
{
  "base": "<sha>", "head": "<sha>",
  "defects": [{"title": "", "severity": "high|medium|low", "file": "path:line", "reproduction": "", "expected": "", "actual": "", "evidence": "verified|observed"}],
  "unsupported_claims": [{"file": "path:line", "claim": "", "why": ""}],
  "hypotheses": [{"title": "", "why": ""}]
}
```

`verified`: you ran the reproduction and saw the failure. `observed`: you read it in the code but could not run it.

## What the implementer does with it

For each defect: reproduce it first with a failing test. If it fails, fix the cause. If it does not, explain why it is a false positive. Fix or remove each unsupported claim. Record the outcome in the plan's **Deviations**.
