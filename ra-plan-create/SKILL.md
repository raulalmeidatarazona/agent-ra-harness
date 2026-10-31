---
name: ra-plan-create
description: Create a reviewable, contract-first, outside-in plan for one roadmap slice, made of deployable vertical phases with contracts, tests and cut list. Use when the user asks to plan a slice or a feature.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-plan-create + codely-spec-plan (MIT)
  version: "1.2"
  license: MIT
---

# Create a plan

Structure and rules: [`resources/plan-guidelines.md`](resources/plan-guidelines.md). Template: [`resources/plan-template.md`](resources/plan-template.md). Read both before proposing anything.

## Steps

1. **Task.** The roadmap slice or feature to plan; ask if not given. Read `AGENTS.md` and, from `docs/foundations/`, `roadmap.md`, `decisions.md`, `architecture.md` and `contract.md`, and the worked examples of `docs/analysis.md` that the slice covers (they are its acceptance fixtures); open the other docs only when the plan needs them. If `docs/foundations/` is missing, suggest `/ra-foundations` first; if the user declines, ask once for the contract type, the verification command and the review checklist.
2. **Diagnose.** Problem in one sentence, what needs no code, smallest reversible change. If no code is needed, say so and stop.
3. **Questions first.** List what is ambiguous or risky, each with your recommended answer. Ask in a single round. Write the answers as one-line decisions. Do not plan around open questions.
4. **Explore** (skip when the repo is empty). Delegate to cheaper subagents, one per independent area, max 4, in parallel. Each reports file paths, existing contracts and conventions, never whole files. Facts only, no proposals.
5. **Risk spikes.** If a decision depends on how a technology really behaves, propose a time-boxed throwaway spike before the phase that needs it. A spike produces findings, never production code.
6. **Granularity.** Offer: minimum (1 phase), intermediate (2-3), granular (4+), each with the phases it would contain. The user picks.
7. **Contracts.** For each phase propose the public contracts (see guidelines). Get explicit agreement on contracts and phases. **Do not write the plan file before that agreement.**
8. **Save** to `.agents/plans/{YYYY_MM_DD-name}/{YYYY_MM_DD-name}-plan.md` using the template. Plan content in English. Mark the slice `planned` in `roadmap.md`.
9. **Next step.** Offer exactly these options:
   - Nothing else.
   - Commit the plan (`docs(plan): ...`).
   - Commit the plan and implement Phase 1 only with `/ra-plan-phase-implement @plan`.

> [!IMPORTANT]
> Never implement from this skill. Never write production code while planning.
