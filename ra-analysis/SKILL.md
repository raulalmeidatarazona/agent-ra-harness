---
name: ra-analysis
description: Understand a problem before solving it, in conversation with the user, by restating it, studying the evidence it comes with, decomposing it into sub-problems, comparing solution options and sketching a high-level design. Use first when starting from a brief, before foundations and plans.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital)
  version: "1.1"
  license: MIT
---

# Analyse the problem

Understand first, solve second. A tool chosen before the problem is understood answers a question nobody asked. This skill picks no stack or framework: `/ra-foundations` does, from what the analysis shows.

Output: `docs/analysis.md` from [`resources/analysis-template.md`](resources/analysis-template.md), written in the repository language: the one the user states, English if they state none. Record it in the file. Talk to the user in the language they use.

## Phases

Each phase ends with a summary of at most 10 lines and a **STOP**: wait for agreement, corrections or questions before the next phase. Ask only what blocks the phase, each question with your recommended answer.

1. **Understand.**
   - Read the brief and every artifact it comes with: data samples, schemas, API examples, logs, screenshots, existing code. Restate the problem in at most 5 sentences: who needs what, why, and what done looks like.
   - Requirements table: ID, requirement, source line, label (explicit; implicit, saying what implies it; assumption; open question).
   - Evaluation criteria and weights, if any: they decide where the effort goes.
   - Evidence: when there is data or examples, inspect them with commands, not by eye (counts, fields, empty values, ranges, duplicates, edge cases); each finding is verified (command shown) or observed. When there is none, list the data the solution will need (shape, volume, sources) as assumptions to confirm.
2. **Decompose** into sub-problems by what a user needs, never by layer. For each: goal, requirements, weight, difficulty, risk, unknowns. Order by value and risk, and say what to cut first.
3. **Solutions.** For each sub-problem with a real choice: 2 or 3 options with what each costs (correctness, complexity, time, operations, cost to change later) and a recommendation. The boring option wins unless a requirement or the evidence gives a concrete reason against it. Mark what needs a spike.
4. **Design at high level.** Components and responsibilities, the flow of each user goal, the main data model and where untrusted input enters. At most one Mermaid diagram.
5. **Worked examples.** Turn each example of the brief, and each user goal without one, into a concrete case: input and expected output. When there is data to run it on, compute the result with a throwaway command; otherwise write it by hand, label it assumption and confirm it with the user. Every ambiguity a case exposes becomes an open question. These cases are the future acceptance fixtures.
6. **Close.** Write `docs/analysis.md`, show it, apply corrections and propose a `docs:` commit. Next step: `/ra-foundations`.

## Rules

- Never guess a count, a match or a date the evidence can compute.
- No production code; throwaway commands only, kept out of the repository.
- A heavy option (queue, search engine, second store, microservice) needs a requirement or a number (measured, or an agreed estimate) that demands it. If it is wanted for another reason (team stack, demonstration), record that reason as a decision and its cost in time.
- Label claims fact, assumption, hypothesis or decision.
- Writing: the repository language, short, tables over prose, no em dash (U+2014), no slogans.
