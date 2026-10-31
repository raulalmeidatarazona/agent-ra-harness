#!/usr/bin/env bash
# PreToolUse hook for Bash: block commands that print or export environment
# variables, which would leak secrets into the transcript.

input="$(cat)"
if command -v jq >/dev/null 2>&1; then
  command="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"
else
  command="$input"
fi

start='(^|[;&|(`]|\$\()[[:space:]]*'
if printf '%s' "$command" | grep -Eq "${start}export([[:space:]]|\$)|${start}env[[:space:]]*(\$|[;&|)])|(^|[^[:alnum:]_-])printenv([^[:alnum:]_-]|\$)"; then
  echo "Blocked: printing or exporting environment variables can leak secrets." >&2
  exit 2
fi
exit 0
