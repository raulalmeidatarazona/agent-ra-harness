---
name: ra-analysis
description: Understand a problem before solving it, in conversation with the user, by restating it, studying the sample data, decomposing it into sub-problems, comparing solution options and sketching a high-level design. Use first when starting from a brief, before foundations and plans.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital)
  version: "1.0"
  license: MIT
---

# Analyse the problem

Understand first, solve second. A tool chosen before the problem is understood answers a question nobody asked. This skill picks no stack or framework: `/ra-foundations` does, from what the analysis shows.

Output: `docs/analysis.md` from [`resources/analysis-template.md`](resources/analysis-template.md), in English. Talk to the user in their language.

## Phases

Each phase ends with a summary of at most 10 lines and a **STOP**: wait for agreement, corrections or questions before the next phase. Ask only what blocks the phase, each question with your recommended answer.

1. **Understand.**
   - Read the brief and every data file it mentions. Restate the problem in at most 5 sentences: who needs what, why, and what done looks like.
   - Requirements table: ID, requirement, source line, label (explicit; implicit, saying what implies it; assumption; open question).
   - Evaluation criteria and weights, if any: they decide where the effort goes.
   - Data: inspect it with commands, not by eye. Counts, fields, empty values, ranges, languages, dates, duplicates, planted edge cases. Each finding is verified (command shown) or observed.
2. **Decompose** into sub-problems by what a user needs, never by layer. For each: goal, requirements, weight, difficulty, risk, unknowns. Order by value and risk, and say what to cut first.
3. **Solutions.** For each sub-problem with a real choice: 2 or 3 options with what each costs (correctness, complexity, time, operations, cost to change later) and a recommendation. The boring option wins unless a requirement or the data gives a concrete reason against it. Mark what needs a spike.
4. **Design at high level.** Components and responsibilities, the flow of each user goal, the main data model and where untrusted input enters. At most one Mermaid diagram.
5. **Worked examples.** Run every example of the brief (queries, filters, aggregates) against the sample data with a throwaway command and record the expected result. Every ambiguity they expose (does `AI` match `AI-generated`?) becomes an open question. These results are the future acceptance fixtures.
6. **Close.** Write `docs/analysis.md`, show it, apply corrections and propose a `docs:` commit. Next step: `/ra-foundations`.

## Rules

- Never guess a count, a match or a date: compute it.
- No production code; throwaway commands only, kept out of the repository.
- A heavy option (queue, search engine, second store, microservice) needs a requirement or a number from the data that demands it. If it is wanted for another reason (team stack, demonstration), record that reason as a decision and its cost in time.
- Label claims fact, assumption, hypothesis or decision.
- Writing: English, short, tables over prose, no em dash (U+2014), no slogans.
