---
name: ra-convention-capture
description: Turn the corrections the user made in this conversation into a documented convention in docs/, and add it to the AGENTS.md map. Use after a phase where the user corrected the agent.
disable-model-invocation: false
user-invocable: true
metadata:
  author: Raúl Almeida (AR Solución Digital), adapted from CodelyTV/agent-harness codely-doc-create (MIT)
  version: "1.0"
---

# Capture a convention

1. From this conversation, extract each correction: the rule, why it matters, the user's corrected version (Good) and your original version (Bad), real files that follow it, exceptions.
2. Ask only if the rule is ambiguous or its category is unclear (`ls docs/` to see categories).
3. Write `docs/<area>/<kebab-name>.md`:

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

4. Add the file to the docs map in `AGENTS.md`. Keep `AGENTS.md` short: the map points, the doc explains.
5. Show the diff and propose a `docs:` commit message. Wait for the user.

One convention per file. No closing slogans.
