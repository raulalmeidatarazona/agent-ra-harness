---
name: ra-review-independent
description: Read-only independent review of the current code by a different model. Reports only reproducible defects and unsupported claims. Use before closing a phase that touches search, money, security or concurrency, and before delivery.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital)
  version: "1.0"
---

# Independent review

Run this with a **different model** from the one that implemented (e.g. Codex reviewing Claude's work). A second model finds what the first one cannot see.

## Boundaries

- Read-only. Do not edit files, do not commit, do not write to databases. Running tests and read-only queries is allowed.
- Scope: the diff since `<base>` (ask if not given), or HEAD for a delivery review.

## What to report

1. **Defects**: only with a concrete reproduction (input, command, expected vs actual). Prioritise: wrong results, data loss, security, concurrency, contract drift (code vs OpenAPI).
2. **Unsupported claims**: sentences in README/docs that no test or code supports.
3. **Hypotheses**: suspicions you could not reproduce, clearly labelled.

Do not report style preferences or refactor ideas.

## Output

```json
{
  "base": "<sha>", "head": "<sha>",
  "defects": [{"title": "", "severity": "high|medium|low", "file": "path:line", "reproduction": "", "expected": "", "actual": ""}],
  "unsupported_claims": [{"file": "path:line", "claim": "", "why": ""}],
  "hypotheses": [{"title": "", "why": ""}]
}
```

## What the implementer does with it

For each defect: reproduce it first with a failing test. If it fails, fix the cause. If it does not, explain why it is a false positive. Fix or remove each unsupported claim. Record the outcome in the plan's **Deviations**.
