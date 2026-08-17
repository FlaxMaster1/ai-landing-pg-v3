# Claude Code repository instructions

This repository is developed collaboratively by Codex and Claude Code. GitHub is the source of truth for code, project documentation, task state, review, handoffs, and production deployment history.

Read `AGENTS.md`, `docs/agent-collaboration.md`, `docs/deployment.md`, and `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` before making changes. The canonical specification governs when instructions conflict.

## Production model

The production site is:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

GitHub Pages is the primary production host. `main` is the production source branch. A push to `main` triggers `.github/workflows/pages.yml`.

The deployment workflow validates content/types/tokens/unit tests, builds and audits the static reference site, builds the GitHub Pages artifact, uploads it, and deploys it. A merge is not considered live until that workflow succeeds.

Full Playwright E2E, accessibility, responsive, and visual-regression tests remain important QA tools, but platform-specific visual baselines are not part of the Pages deployment gate.

The ChatGPT Sites path remains only for compatibility or optional experimentation. Do not treat it as production or as the source of truth.

## Before starting work

1. Start from the latest `main` unless a handoff explicitly names another base.
2. Read `docs/implementation-status.md` and any task-specific handoff.
3. Inspect recent changes in files you expect to touch.
4. Use a `claude/<short-task-name>` branch for Claude-owned implementation work.
5. Never begin implementation directly on `main`.

## Working rules

- Follow every repository rule in `AGENTS.md`.
- Keep one task per branch and avoid unrelated cleanup.
- Do not overwrite another agent's active work. If a task overlaps an active branch, surface the conflict before changing shared files.
- Preserve Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations.
- Keep site-specific work in `sites/{site}` unless it passes reusability rules.
- Record architectural changes in an ADR before implementation.
- Keep content separate from shared presentation/components.
- Do not casually change shared contracts, routing, build configuration, tokens, or content schemas.
- Run focused tests for the work performed. Run `npm run validate` for the full local framework gate when practical.
- For deployment-affecting work, run `npm run build:pages` when practical.
- Leave the working tree clean and reviewable before handoff.

## Required Git workflow

For every implementation task:

1. Work on `claude/<short-task-name>`.
2. Commit the completed work with a clear message.
3. Push the branch to GitHub.
4. Open or prepare a PR into `main` when review-ready.
5. Update `docs/handoffs/current.md` using `docs/handoffs/TEMPLATE.md`.
6. Record the exact branch, final commit SHA, PR, validation state, production readiness, and next action.
7. Do not merge to `main` unless Justin explicitly approves the production change or Codex is acting under explicit merge authority from Justin.
8. Do not bypass GitHub Pages or deploy a separate production copy.

GitHub must contain the exact code state being handed back. Do not rely on uncommitted local files.

## Handoff back to Codex / ChatGPT

The handoff must include:

- task title and status
- owner handing off: Claude Code
- next owner
- branch and target branch
- base commit if known
- final commit SHA(s)
- PR URL/number
- concise work summary
- files/subsystems changed
- validation/test results
- responsive/accessibility/visual checks
- decisions made
- unresolved issues or risks
- whether the branch is ready to merge to production
- whether the Pages workflow must be monitored after merge
- exact recommended next action

Do not put transient chat history into permanent architecture documentation.

## Review and deployment sequence

1. Claude completes and validates the change.
2. Claude commits and pushes `claude/<task>`.
3. Claude opens/prepares a PR and updates `docs/handoffs/current.md`.
4. Codex/ChatGPT or Justin reviews code and visual behavior.
5. Requested fixes remain on the owning branch.
6. After approval, the PR is merged into `main`.
7. GitHub Actions runs the Pages deployment workflow.
8. Treat production as updated only after the workflow succeeds.
9. If the workflow fails, diagnose and fix the failure on a branch; do not claim the change is live.

At the end of a Claude task, Justin should normally only need to tell Codex:

`Review Claude's latest work.`

Codex should be able to determine the exact branch, commit, PR, validation state, deployment state, and next action from GitHub and `docs/handoffs/current.md`.
