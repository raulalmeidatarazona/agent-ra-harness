#!/usr/bin/env bash
# Runs one scenario of harness/evals on a fresh copy of the template with claude -p.
set -euo pipefail

scenario="${1:?usage: harness/scripts/eval.sh <scenario>}"
root="$(cd "$(dirname "$0")/../.." && pwd)"
dir="$root/harness/evals/$scenario"
[[ -f "$dir/check.mjs" ]] || { echo "unknown scenario: $scenario" >&2; exit 2; }

work="$(mktemp -d "${TMPDIR:-/tmp}/ra-eval-$scenario-XXXX")"
logs="$work.logs"
mkdir -p "$logs"

rsync -a --exclude .git --exclude harness --exclude .github --exclude node_modules "$root/" "$work/"
cp -RL "$dir/input/." "$work/" 2>/dev/null || true
git -C "$work" init -q
git -C "$work" add -A
git -C "$work" -c commit.gpgsign=false commit -qm "chore: start from the template"

tools=(Read Write Edit Glob Grep Task
  "Bash(python3:*)" "Bash(jq:*)" "Bash(ls:*)" "Bash(mkdir -p:*)" "Bash(date:*)"
  "Bash(git log:*)" "Bash(git status:*)")

status=0
infrastructure_error=0
session=0
for prompt in "$dir"/prompt*.md; do
  session=$((session + 1))
  echo "Session $session: $(basename "$prompt")"
  (cd "$work" && claude -p "$(cat "$prompt")" --permission-mode acceptEdits \
    --allowedTools "${tools[@]}" --output-format stream-json --verbose) > "$logs/session-$session.jsonl" || true
  api_error="$(jq -r 'select(.type == "result" and .is_error == true) | .result' "$logs/session-$session.jsonl" 2>/dev/null || true)"
  if [[ -n "$api_error" ]]; then
    echo "Session $session did not finish, so the checks say nothing about the skill: $api_error" >&2
    infrastructure_error=1
  fi
  if [[ -f "$dir/check-$session.mjs" ]]; then
    node "$dir/check-$session.mjs" "$work" || status=1
  fi
done

node "$dir/check.mjs" "$work" || status=1

cost="$(cat "$logs"/session-*.jsonl | jq -s '[.[] | select(.type == "result") | .total_cost_usd] | add' 2>/dev/null || echo "?")"
echo "Workspace: $work"
echo "Logs: $logs"
echo "Cost: $cost USD"
if [[ "$infrastructure_error" == 1 ]]; then exit 3; fi
exit "$status"
