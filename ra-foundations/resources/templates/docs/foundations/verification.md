# Verification

| Scope | Command | Expected |
|---|---|---|
| Everything | `<command>` | exit 0 |
| Static analysis and architecture | `<command>` | exit 0 |
| Contract lint | `<command>` | exit 0 |
| Unit | `<command>` | all green |
| Integration | `<command>` | all green, needs `<service>` |
| Acceptance | `<command>` | all green, needs `<service>` |
| One test | `<command with filter>` | |

Setup from a clean clone: `<command>`.
