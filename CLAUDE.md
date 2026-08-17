# Claude Code repository instructions

This repository is developed collaboratively by Codex and Claude Code. GitHub is the source of truth for code, project documentation, task state, handoffs, and production deployment.

Read `AGENTS.md` and `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` before making changes. The canonical specification governs when instructions conflict.

## Production model

The production site is hosted with GitHub Pages. `main` is the production source branch. A successful push to `main` triggers `.github/workflows/pages.yml`, which validates the framework, builds the reference site with `npm run build:pages`, and deploys `dist/` to GitHub Pages.

Treat every merge to `main` as a production deployment event. Do not merge your own implementation work to `main` unless Justin or Codex explicitly approves it.

The expected production URL is:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

The existing ChatGPT Sites build path remains in the repository only for compatibility and is no longer the primary hosting workflow.

## Before starting work

1. Start from the latest `main` unless the handoff explicitly names another base.
2. Read `docs/agent-collaboration.md` and `docs/implementation-status.md`.
3. Read any task or handoff file named in the request.
4. Inspect recent changes in the files you expect to touch before editing them.
5. Use a `claude/<short-task-name>` branch for Claude-owned implementation work.
6. Do not begin implementation on `main`.

## Working rules

- Follow every repository rule in `AGENTS.md`.
- Keep one task per branch and avoid unrelated cleanup.
- Do not overwrite another agent's active work. If a task overlaps an active branch, surface the conflict before changing shared files.
- Preserve the framework taxonomy: Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations.
- Treat `sites/{site}` as site-specific unless a change passes the framework reusability rules.
- Record architectural changes in an ADR before implementation.
- Keep content separate from shared presentation/components.
- Do not change shared contracts, routing, build configuration, design tokens, or content schemas casually. If the task requires such a change, document the reason and update dependent tests/docs together.
- Run `npm run validate` before declaring implementation complete. If validation cannot run, report exactly what was not run and why.
- For deployment-affecting changes, also run `npm run build:pages` when practical.
- Leave the working tree in a clean, reviewable state before handoff.

## Required Git workflow

For every implementation task:

1. Work on `claude/<short-task-name>`.
2. Commit the completed work with a clear commit message.
3. Push the branch to GitHub.
4. Open or prepare a pull request into `main` when the work is review-ready.
5. Record the exact branch name and final commit SHA in `docs/handoffs/current.md`.
6. Do not merge the branch into `main` unless Justin or Codex explicitly instructs you to do so.
7. Do not bypass the GitHub Pages workflow or deploy a separate production copy.

GitHub must contain the exact code state being handed back for review. Do not rely on uncommitted local files as the handoff.

## Required handoff back to Codex / ChatGPT

When work is complete or ready for review, update `docs/handoffs/current.md` using `docs/handoffs/TEMPLATE.md`.

The handoff must include:

- task title and status
- owner handing off: Claude Code
- next owner: Codex or Human review
- working branch
- target branch, normally `main`
- base commit if known
- final relevant commit SHA(s)
- PR URL/number if one exists
- concise summary of work completed
- files/subsystems changed
- validation and test results
- responsive/accessibility/visual checks performed
- decisions made
- unresolved issues, risks, or merge concerns
- exact recommended next action
- whether the change is ready to merge to production

Do not put transient chat history into permanent architecture documentation.

## Review and deployment sequence

The expected workflow is:

1. Claude completes and validates the change.
2. Claude commits and pushes `claude/<task>`.
3. Claude opens or prepares a PR into `main` and updates `docs/handoffs/current.md`.
4. Codex/ChatGPT or Justin reviews the diff, validation state, and visual behavior.
5. Requested fixes stay on the owning branch.
6. After approval, the PR is merged into `main`.
7. GitHub Actions validates and builds the Pages artifact.
8. If the workflow succeeds, GitHub Pages updates production automatically.
9. If the workflow fails, do not treat the change as deployed; inspect and fix the failed workflow before proceeding.

## Returning work cleanly

At the end of a Claude task, the repository should make it possible for Justin to tell Codex only:

`Review Claude's latest work.`

Codex should then be able to determine the exact branch, commit, PR, validation state, production readiness, and requested next action from `docs/handoffs/current.md` without Justin reconstructing the task from conversation history.
