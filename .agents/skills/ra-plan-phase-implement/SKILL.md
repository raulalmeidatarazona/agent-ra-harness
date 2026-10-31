---
name: ra-plan-phase-implement
description: Implement exactly one phase of a plan outside-in with TDD, in steps of 3 to 5 files, verifying each step and stopping for review at the cadence the plan sets. Never pushes.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-plan-phase-implement (MIT)
  version: "1.3"
  license: MIT
---

# Implement one plan phase

> [!CRITICAL]
> ONE phase per invocation. Then STOP.
> Never push. Commit only a step the user approved, or any step of a phase whose cadence in the plan is `phase`.

## Before starting

- The plan: the one given, or the latest in `.agents/plans/`. The current phase is the first with an unchecked `- [ ]`. If none, say the plan is complete and stop.
- Read `AGENTS.md`, `docs/foundations/verification.md`, `testing.md` and `review-checklist.md`. If they are missing, ask once for the verification command and the checklist.
- Run the full verification command. If it is not green before you start, stop and report: you cannot prove your change otherwise. In a walking skeleton nothing exists yet: the first step builds the verification command in the repository and runs it.

## Order

Outside-in, in this order, whatever the plan's task list looks like:

1. **Specify**: the contract operation with every response, the acceptance test marked pending, and the entry adapter wired to a command/query and a handler that does nothing. One step; the suite stays green.
2. **Design stop**: present the services, ports and domain model the handler needs, as the plan proposed or revised, and wait for agreement.
3. **Handler unit test, red**: ports mocked; it fails because services and models do not exist.
4. **Domain and services**: unit tests and code, one concept per step.
5. **Handler green**, inside its transaction boundary.
6. **Adapters last**: each with an integration test against real infrastructure, migrations included.
7. **Acceptance green**: remove the pending mark, then cover failures and repeated requests.
8. **Docs** that claim only what the tests prove.

In existing code, write characterisation tests before changing behaviour.

## Loop for each step

1. **Say the step** in one line: goal, files you will touch (3 to 5), command that proves it.
2. **Red first.** Write the test. Run it. Show it fails for the right reason (paste the failing line). Specify steps keep the acceptance test pending instead, so the suite stays green.
3. **Green.** Minimum code to pass. Tests and implementation may share the step. Touch only the announced files; if you need more, stop and say why.
4. **Prove it.** Run the narrow test, then the suite of that layer. Paste the summary lines, not whole logs.
5. **Commit** following the phase cadence in the plan (`step` when unset):
   - `step`: show `git diff --stat` and the proposed message, and wait for "commit" or for corrections; then commit with `/ra-git-conventional-commit`.
   - `phase`: commit with `/ra-git-conventional-commit` and continue. Still stop at the design stop, on any deviation and at the end of the phase.
6. **Check the task** in the plan.

## Rules while implementing

- Fix the code, never weaken a test to make it pass. If a test is wrong, explain why and ask.
- If something no longer fits the plan, **flag it**: stop, show the evidence, propose a plan change and record it under **Deviations** once agreed. Do not work around it silently.
- Domain and application import nothing from infrastructure. SQL, prompts and HTTP clients live in adapters.
- No in-memory adapters beyond a temporary one the plan allows; delete it in the step that adds the real adapter.
- No secrets in code, logs or output. Never run `export`, `env` or `printenv`.
- Do not add dependencies, operations or features the phase does not list.
- Verification runs inside the repository with its own dependencies. A check run in a temporary workspace or against borrowed declarations proves nothing about this repository.
- Independent review belongs to the end of a phase that touched money, security, concurrency or data integrity, not to intermediate steps.
- Report evidence as observed, verified (a command proved it) or inferred.

## End of phase

1. Run the full verification command. Paste the summary. With cadence `phase`, list the phase commits (`git log --oneline <first>^..HEAD`) so the user reviews them one by one.
2. Self-review the diff against `docs/foundations/review-checklist.md`.
3. Update the plan: checkboxes, **Deviations**, **Next step**, and frontmatter:

   ```yaml
   implemented_by:
     tool: "<tool>"
     model: { name: "<name>", version: "<version>", reasoning_effort: "<effort>" }
   last_implementation_at: "<YYYY-MM-DDTHH:MM:SSZ>"
   has_completed_all_phases: <true|false>
   ```

4. If the phase changed a decision or the slice status, update `docs/foundations/decisions.md` and `roadmap.md`.
5. **STOP.** Summarise in 3 lines: what the user can do now, verification result, open risks. Suggest `/ra-review-independent` if the phase touched money, security, concurrency or data integrity.
6. If `AGENTS.md` asks for transcripts and this was the last phase, remind the user to export the threads unedited to the path it names.
