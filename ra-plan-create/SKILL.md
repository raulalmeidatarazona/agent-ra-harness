---
name: ra-plan-create
description: Create a reviewable, contract-first, outside-in plan made of vertical slices, with ports, adapters last, test strategy and cut list. Use when the user asks to plan a feature or a whole assignment.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-plan-create + codely-spec-plan (MIT)
  version: "1.0"
---

# Create a plan

Structure and rules: [`resources/plan-guidelines.md`](resources/plan-guidelines.md). Template: [`resources/plan-template.md`](resources/plan-template.md). Read both before proposing anything.

## Steps

1. **Task.** Ask for it if not given. Read `AGENTS.md` and only the `docs/` it maps that are relevant.
2. **Questions first.** List what is ambiguous or risky in the task, each with your recommended answer. Ask in a single round. Write the user's answers as one-line decisions. Do not plan around open questions.
3. **Explore** (skip when the repo is empty). Delegate to cheaper subagents, one per independent area, max 4, in parallel. Each reports file paths, existing contracts and conventions, never whole files. Facts only, no implementation proposals.
4. **Risk spikes.** If a decision depends on how a technology really behaves (search semantics, a provider API, a library edge case), propose a time-boxed throwaway spike before the phase that needs it. A spike produces findings, never production code.
5. **Granularity.** Offer: minimum (1 phase), intermediate (2-3), granular (4+), each with the phases it would contain. The user picks.
6. **Contracts.** For each phase propose the public contracts (see guidelines). Get explicit agreement on contracts and phases. **Do not write the plan file before that agreement.**
7. **Save** to `.agents/plans/{YYYY_MM_DD-name}/{YYYY_MM_DD-name}-plan.md` using the template. Plan content in English.
8. **Next step.** Offer exactly these options:
   - Nothing else.
   - Commit the plan (`docs:` type).
   - Commit the plan and implement Phase 1 only with `/ra-plan-phase-implement @plan`.

> [!IMPORTANT]
> Never implement more than Phase 1 from this skill. Never write production code while planning.
