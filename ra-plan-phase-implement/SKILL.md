---
name: ra-plan-phase-implement
description: Implement exactly one phase of a plan outside-in with TDD, in steps of at most 3 files, verifying each step and stopping for review. Never commits without the user's go-ahead.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-plan-phase-implement (MIT)
  version: "1.0"
---

# Implement one plan phase

> [!CRITICAL]
> ONE phase per invocation. Then STOP.
> Never commit or push unless the user says so for that step.

## Current phase

The first phase with an unchecked `- [ ]`. If none, say the plan is complete and stop.

## Loop for each task of the phase

1. **Say the step** in one line: goal, files you will touch (max 3), command that proves it.
2. **Red first.** Write the test. Run it. Show it fails for the right reason (paste the failing line).
3. **Green.** Minimum code to pass. Touch only the announced files. If you need a 4th file, stop and say why.
4. **Prove it.** Run the narrow test, then the suite of that layer. Paste the summary lines, not whole logs.
5. **Show** `git diff --stat` and propose one commit message (imperative, Conventional Commits). Wait for "commit" or for corrections.
6. **Check the task** in the plan.

Commit cadence: entry adapter + command/query + handler → commit; domain + port → commit; adapter → commit.

## Rules while implementing

- Fix the code, never weaken a test to make it pass. If a test is wrong, explain why and ask.
- If something no longer fits the plan, **flag it**: stop, explain the evidence, propose a plan change, and record it under **Deviations** once agreed. Do not silently work around it.
- Domain imports nothing from infrastructure. Prompts, SQL and HTTP clients live in adapters.
- No secrets in code, logs or output. Never run `export` or print environment variables.
- Do not add dependencies, endpoints or features the phase does not list.

## End of phase

1. Run the full verification command. Paste the summary.
2. Self-review the diff with the checklist of the plan guidelines.
3. Update the plan: checkboxes, **Deviations**, **Next step**, and frontmatter:

   ```yaml
   implemented_by:
     tool: "<tool>"
     model: { name: "<name>", version: "<version>", reasoning_effort: "<effort>" }
   last_implementation_at: "<YYYY-MM-DDTHH:MM:SSZ>"
   has_completed_all_phases: <true|false>
   ```

4. **STOP.** Summarise in 3 lines: what the user can do now, verification result, open risks. Suggest `/ra-review-independent` if the phase touched search, money, security or concurrency.
5. If it was the last phase, remind the user to export every thread (Zed: `agent: open active thread as markdown`) into `transcripts/`, unedited.
