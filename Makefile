.DEFAULT_GOAL := help
.PHONY: help symlinks harness-validate harness-eval

help: ## List the targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-18s %s\n", $$1, $$2}'

symlinks: ## Link CLAUDE.md to AGENTS.md and the agent skill folders to .agents/skills
	ln -sfn AGENTS.md CLAUDE.md
	mkdir -p .claude .opencode
	ln -sfn ../.agents/skills .claude/skills
	ln -sfn ../.agents/skills .opencode/skills

harness-validate: ## Check skills, links, symlinks and template copies
	node harness/scripts/validate.mjs

harness-eval: ## Run one skill scenario with claude -p: make harness-eval SCENARIO=analysis-no-data
	harness/scripts/eval.sh $(SCENARIO)
