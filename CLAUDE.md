# Claude Code repository instructions

This repository is developed collaboratively by Codex and Claude Code. GitHub is the source of truth. Read `AGENTS.md` and `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` before making changes. The canonical specification governs when instructions conflict.

## Before starting work

1. Start from the latest `main` unless the handoff explicitly names another base.
2. Read `docs/agent-collaboration.md` and `docs/implementation-status.md`.
3. Read any task/handoff file named in the request.
4. Inspect recent changes in the files you expect to touch before editing them.
5. Use a `claude/<short-task-name>` branch for Claude-owned implementation work.

## Working rules

- Follow every repository rule in `AGENTS.md`.
- Do not commit directly to `main`.
- Keep one task per branch and avoid unrelated cleanup.
- Do not overwrite another agent's active work. If a task overlaps an active branch, stop and surface the conflict.
- Preserve the framework taxonomy: Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations.
- Treat `sites/{site}` as site-specific unless a change passes the framework reusability rules.
- Record architectural changes in an ADR before implementation.
- Keep content separate from shared presentation/components.
- Run `npm run validate` before declaring implementation complete. If validation cannot run, report exactly what was not run and why.

## Handoff back to Codex / ChatGPT

When work is complete, create or update `docs/handoffs/current.md` using `docs/handoffs/TEMPLATE.md`. Include the branch, base commit if known, commits made, files changed, validation performed, decisions made, unresolved issues, and exact recommended next action. Do not put transient chat history into permanent architecture documentation.

For work intended for ChatGPT Sites, do not assume a GitHub push deploys the site. Hand the reviewed branch/commit back so ChatGPT/Codex can build, preview, QA, and explicitly deploy through Sites.
