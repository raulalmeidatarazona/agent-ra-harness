---
name: ra-foundations
description: Turn an analysis, a brief or an existing codebase into the project foundations (mission, architecture, contract, testing, verification, decisions and a roadmap of vertical slices) through one interview with recommended answers. Use before the first plan of a project.
disable-model-invocation: true
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital)
  version: "1.3"
  license: MIT
---

# Create the project foundations

No foundations, no plan. This skill writes what every later skill reads: a short `AGENTS.md` that maps the repo, and small files in `docs/foundations/` that agents open only when the task needs them.

Questions: [`resources/question-bank.md`](resources/question-bank.md). Templates: `resources/templates/`. Stack examples: `resources/examples/`, read only the one closest to the chosen stack.

## Steps

1. **Input.** `docs/analysis.md` when it exists; otherwise a brief (file or text) for a new project, or the repository itself for existing code. For a new project without analysis, suggest `/ra-analysis` first: deciding how to build before understanding the problem invites solutions nobody needs. List what already exists: `AGENTS.md`, `CLAUDE.md`, `docs/`, `.claude/settings.json`, `.gitignore`. Never overwrite them: propose a diff.
2. **Extract** (skip with an analysis: reuse its requirements, IDs and diagnosis) every requirement into a table: requirement, source (brief line or `file:line`), label (fact, assumption or open question). Add the implicit ones and say what implies them (untrusted input implies output escaping). For existing code, also read `git log --oneline` and the tests, and mark each finding observed or inferred.
3. **Diagnose** in at most 5 lines: the real problem, what success looks like, what needs no code, what to cut first.
4. **Interview** in rounds, in the order of the question bank. Each question carries a recommended answer, its reason in one line and one alternative. Skip what the input already answers. For existing code, state observed facts as decisions and ask only where nothing is observed or code and docs disagree. Use the agent's question tool when it has one. Record each answer as a one-line decision.
5. **Write** the files from the templates in the repository language: the one recorded in the analysis or stated by the user, English if neither. Record it in `AGENTS.md`. Fill only what was decided. Anything unknown goes to `decisions.md` as an open question, with the spike or slice that answers it. Keep each file short (about 60 lines of prose, tables aside) and `AGENTS.md` under 60 lines.
6. **Trace.** Save the requirements table (from the analysis or step 2) in the Traceability section of `roadmap.md`, keeping its IDs, and give each row its slice or Out of scope. Show the gaps and close them.
7. **Harness.**
   - `ln -s AGENTS.md CLAUDE.md` when `CLAUDE.md` does not exist.
   - Copy `resources/templates/claude/hooks/block-env-leak.sh` to `.claude/hooks/` (`chmod +x`) and merge `resources/templates/claude/settings.json` into `.claude/settings.json`.
   - `.gitignore` must not ignore `*.md`, `docs/` or `.agents/`: the harness lives in the repository.
8. **Review.** Show the file list and the decisions. Apply each correction yourself in every affected file, so the documents stay consistent.
9. **Next step.** Propose one commit (`docs: add project foundations`) and offer `/ra-plan-create` for the first slice of the roadmap. Do not commit without approval.

## Rules

- Decide here only what more than one slice depends on. A choice one slice can settle (a search algorithm, an index, a prompt) goes to that slice in the roadmap as "to decide in its plan", with a spike if it is risky.
- The style is fixed: hexagonal architecture with DDD, three layers, dependencies pointing inwards. Ask only for the contexts and their names.
- With an analysis, slices follow its sub-problems and its worked examples become acceptance fixtures; a decision that contradicts the analysis says why.
- Slices are user goals, never layers. A slice named after a layer (data, API, UI, hardening, docs) is horizontal: fold it into the goals it serves. Each slice carries its own UI, security and README section.
- Default to one deployable, SQL and synchronous calls. Choose otherwise only with a concrete reason written as a decision: fashionable architecture costs more to run than it saves.
- Every architecture rule names the check that enforces it. A rule without a check is a wish.
- Slice 0 is a walking skeleton and nothing more: the verification command running in the repository, one trivial operation that touches the real infrastructure, the contract anchors and the architecture checks. UI polish, resilience cases and extra tooling belong to the slices that need them. It comes before any feature, because retrofitting the contract later is more expensive.
- No production code in this skill.
