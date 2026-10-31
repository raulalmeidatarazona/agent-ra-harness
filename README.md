# agent-ra-harness

A template for TypeScript projects built with coding agents (Claude Code, Codex, opencode). It brings a method that goes from a brief to reviewed commits, the skills that run it, and conventions with good and bad examples, so every agent works the same way on every project.

## Start a project

```bash
gh repo create <name> --template raulalmeidatarazona/agent-ra-harness --public --clone
cd <name>
```

Put the brief and any sample data in `docs/brief/`, open your agent in the repository and run:

1. `/ra-analysis docs/brief/<brief>`: understand the problem, check the data, compare options, write the expected results.
2. `/ra-foundations`: fill `AGENTS.md`, write `docs/foundations/` and keep the conventions that fit the stack.
3. `/ra-plan-create` for slice 0, then `/ra-plan-phase-implement` phase by phase.

Talk to the agent in any language; the repository stays in English unless you say otherwise. The full flow is in [`docs/method.md`](docs/method.md).

## Inside

| Path | What it is |
|---|---|
| `AGENTS.md` | The agent's entry point: commands, architecture, rules and the map of `docs/`. `CLAUDE.md` links to it |
| `docs/method.md` | How work flows from a brief to a commit |
| `docs/<area>/` | Conventions with good and bad examples: code style, backend, database, testing |
| `.agents/skills/` | The skills. Codex and opencode read them here; `.claude/skills` links here |
| `.claude/` | Settings and a hook that blocks commands printing environment variables |
| `harness/` | Validation and evals to maintain the harness; a project may delete it |

## Skills

| Skill | Purpose |
|---|---|
| `ra-analysis` | Understand a brief before solving it: requirements, evidence checked with commands, options, high-level design and worked examples. Saves each phase and resumes after a cut |
| `ra-foundations` | Turn the analysis into foundations: mission, architecture, contract, testing, verification, decisions and a roadmap of vertical slices |
| `ra-plan-create` | Plan one slice: contracts, tests, estimates that fit the budget, review cadence per phase, cut list |
| `ra-plan-phase-implement` | Implement one phase outside-in with TDD in steps of 3 to 5 files, verified in the repository |
| `ra-git-conventional-commit` | One commit per step with a Conventional Commits message |
| `ra-review-independent` | Read-only review by a different model: reproducible defects and unsupported claims |
| `ra-doc-create` | Write a convention with good and bad examples, from corrections or on request |
| `create-agent-skill` | Create and validate a new skill |

## Skills without the template

```bash
npx skills add raulalmeidatarazona/agent-ra-harness --skill <name> --agent claude-code --agent codex --agent opencode --yes
```

The conventions live in [`docs/`](docs/) of this repository; copy the ones you need.

## Maintain the harness

Read [`harness/AGENTS.md`](harness/AGENTS.md). `make harness-validate` checks skills, links, symlinks and template copies; `make harness-eval SCENARIO=<name>` runs a skill against a scenario with `claude -p`.

## License

MIT, see [`LICENSE`](LICENSE). Parts are adapted from [CodelyTV/agent-harness](https://github.com/CodelyTV/agent-harness); see [`NOTICE`](NOTICE).
