---
name: ra-convention-capture
description: Turn the corrections the user made in this conversation into documented conventions in docs/, and add them to the AGENTS.md map. Use after a phase where the user corrected the agent.
disable-model-invocation: false
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-doc-create (MIT)
  version: "1.1"
  license: MIT
---

# Capture a convention

1. From this conversation, extract each correction: the rule, why it matters, the user's corrected version (Good) and your original version (Bad), real files that follow it, exceptions.
2. Place each one:
   - a one-line check for a review (no `float` for money) → a bullet in `docs/foundations/review-checklist.md`;
   - a project-wide decision (no in-memory adapters) → a line in `docs/foundations/decisions.md`;
   - anything that needs examples → its own `docs/<area>/<kebab-name>.md`.

   Ask only if the rule is ambiguous or its place is unclear (`ls docs/` to see areas).
3. A convention file:

   ```markdown
   # <Convention>
   ## Convention
   ## Benefits
   ## Examples
   ### Good: <...>
   ### Bad: <...>
   ## Real world examples
   ## Related agreements
   ```

4. Add new files to the docs map in `AGENTS.md`. Keep `AGENTS.md` short: the map points, the doc explains. Never reference docs with `@`: that loads them into every request.
5. Show the diff and propose one `docs:` Conventional Commit for all the conventions of the session (the 3 to 5 file limit is for implementation steps). Wait for the user.

One convention per file. No closing slogans.
