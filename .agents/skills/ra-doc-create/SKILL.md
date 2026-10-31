---
name: ra-doc-create
description: Write a project convention as a short document in docs/ with good and bad examples, either from the corrections the user made in this conversation or on request for a topic, and add it to the AGENTS.md map. Use after a phase where the user corrected the agent, or when asked to document a convention.
disable-model-invocation: false
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-doc-create (MIT)
  version: "2.0"
  license: MIT
---

# Create a convention document

Format: [`resources/doc-format.md`](resources/doc-format.md). One convention per file.

## Modes

- **From corrections** (no topic given): extract each correction of this conversation: the rule, why it matters, the user's version (Good), your original version (Bad), exceptions.
- **On request** (`/ra-doc-create <topic>`): ask what the rule is if the user has not said it. Take the Good example from the repository when one exists; otherwise write the smallest example that shows the rule.

## Steps

1. Place each rule:
   - a one-line check for a review (no `float` for money) → a bullet in `docs/foundations/review-checklist.md`;
   - a project-wide decision (no in-memory adapters) → a line in `docs/foundations/decisions.md`;
   - a rule that needs examples → `docs/<area>/<kebab-name>.md`.

   Read `ls docs/` for the areas. Ask only if the rule is ambiguous or its place unclear.
2. Before writing a new file, check that no existing doc covers the rule: update that one instead.
3. Write the document in the repository language from `AGENTS.md`. Examples in the project's language and style, real code when the repository has it.
4. Add new files to the docs map in `AGENTS.md`, one line each. The map points, the doc explains. Never reference docs with `@`: that loads them into every request.
5. Link related documents both ways under Related.
6. Show the diff and propose one `docs:` Conventional Commit for the whole session. Wait for the user.
