# Maintaining the harness

Rules for changing the skills, templates and conventions of agent-ra-harness itself.

## Commands

```bash
make harness-validate                    # before every commit
make harness-eval SCENARIO=<scenario>    # after changing how a skill behaves; 0.2 to 1.5 USD per run
```

## Rules

- Skill format and locations: `.agents/skills/create-agent-skill/SKILL.md`. Conventions: `.agents/skills/ra-doc-create/resources/doc-format.md`.
- Repository content in English, short, tables over prose. No em dash, emojis, mascots or closing lines.
- A change in how a skill behaves bumps its `metadata.version` and runs the evals that cover it. A failure found by hand becomes a check in an eval.
- Live copies match their templates in `ra-foundations/resources/templates/`: `AGENTS.md` while unfilled, `.claude/settings.json`, `.claude/hooks/`. Edit both or validation fails.
- Parts adapted from CodelyTV/agent-harness are listed in `NOTICE`; add new ones there.
- One commit per skill or piece, through `/ra-git-conventional-commit`.

## Evals

Each `evals/<scenario>/` holds `input/` (files copied over a fresh copy of the template), one `prompt*.md` per session run in order, an optional `check-N.mjs` after session N and `check.mjs` at the end. `scripts/eval.sh` prints every check and keeps the workspace for inspection. It exits 0 when every check passes, 1 when a check fails and 3 when a session did not finish (API or usage limit), which says nothing about the skill. Run scenarios one at a time: parallel runs exhaust the usage limit.

| Scenario | Proves |
|---|---|
| `analysis-with-data` | Atomic requirements, examples computed from the data, adversarial cases, phases agreed, final document matches the phases |
| `analysis-no-data` | Missing data becomes assumptions, hand-written examples are labelled, a synthetic adversarial case exists |
| `analysis-resume` | A session cut at the phase 2 STOP resumes from the saved files in a new session |
| `plan-skeleton` | Every task has an estimate, the plan fits the slice budget, each phase has a cadence, slice 0 stays bare |
