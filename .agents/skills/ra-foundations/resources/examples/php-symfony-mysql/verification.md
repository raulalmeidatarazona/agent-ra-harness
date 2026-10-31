# Verification

<!-- Example profile taken from a Symfony 7.4 + MySQL wallet API. -->

| Scope | Command | Expected |
|---|---|---|
| Everything | `make analyse && make test` | exit 0 |
| Static analysis and architecture | `make analyse` (PHPStan level 8, PHPat, PHP_CodeSniffer, Redocly) | exit 0 |
| One suite | `make test c="--testsuite Unit"` (Unit, Integration, Acceptance, Contract) | all green |
| One test | `make test c="--filter DepositMoney"` | |

Integration and acceptance suites need the MySQL container and the test database: `make up database migrate`.

Setup from a clean clone: `make setup`.
