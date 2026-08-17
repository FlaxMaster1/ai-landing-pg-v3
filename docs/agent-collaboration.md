# Codex + Claude Code Collaboration Workflow

## Purpose

Treat Codex and Claude Code as two developers working on one codebase. GitHub is the authoritative source for code, project documentation, task state, handoffs, review, and production deployment history. GitHub Pages is the primary production host for the reference implementation.

Read `docs/deployment.md` for the canonical production workflow.

## Roles

### Project owner
Justin approves scope, visual direction, major architecture decisions, and production merges.

### Codex / ChatGPT
Default lead developer and integration owner. Use Codex for implementation whenever practical, repository integration, cross-cutting framework work, validation, visual QA, review of Claude work, and diagnosis of failed GitHub Actions deployments.

### Claude Code
Overflow or specialist developer. Use when Codex capacity blocks progress, when Justin explicitly delegates a task, or when parallel implementation materially accelerates the project. Claude works through Git branches and hands completed work back through GitHub plus `docs/handoffs/current.md`.

## Source of truth

Priority order:

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`
2. Accepted ADRs in `docs/decisions/`
3. `AGENTS.md`
4. `docs/deployment.md`
5. This collaboration workflow
6. Task-specific handoff/instructions
7. Conversational context

If conversational instructions conflict with committed governing documentation, resolve the conflict rather than silently changing architecture.

## Branch model

- `main`: approved production source branch; never use as an agent scratch branch.
- `codex/<task>`: Codex-owned implementation.
- `claude/<task>`: Claude-owned implementation.
- `workflow/<task>` or `docs/<task>`: process/documentation work.
- One task per branch.
- Branch from current `main` unless a task explicitly requires another base.
- Avoid simultaneous edits to the same subsystem. If overlap is unavoidable, designate an integration owner first.

## Standard development cycle

1. Define the task and acceptance criteria.
2. Confirm owner: Codex or Claude.
3. Developer updates from `main` and creates its branch.
4. Developer reads governing docs and relevant implementation files.
5. Implement only the assigned scope.
6. Run focused tests for the work performed; run `npm run validate` for the full local framework QA gate when practical.
7. For deployment-affecting work, also run `npm run build:pages` when practical.
8. Update required docs/contracts/tests/registry/ADR together with the code.
9. Complete `docs/handoffs/current.md` if another agent will continue or review the work.
10. Push branch and open a PR into `main`.
11. Review code, validation, and visual behavior.
12. Merge only after production approval.
13. The push to `main` triggers `.github/workflows/pages.yml`.
14. Treat the change as live only after the GitHub Pages workflow succeeds.

## Production deployment

Production URL:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

`main` is intentionally coupled to production. A merge is a deployment approval, not merely source integration.

The production workflow runs:

1. content validation;
2. token and Astro/TypeScript checks;
3. unit tests;
4. static reference build;
5. generated-build audit;
6. GitHub Pages build;
7. Pages artifact upload;
8. Pages deployment.

Full Playwright E2E, accessibility, responsive, and visual-regression suites remain part of deliberate development QA, especially for visual/framework releases. They are not allowed to block production solely because CI runs on a platform without matching screenshot baselines.

If the Pages workflow fails, production remains on the last successful deployment. Fix the failure on a branch and merge the correction through the same review path. Do not publish a separate manual production copy.

ChatGPT Sites remains compatibility-only and is not required for preview or production.

## Parallel-work rules

Parallel work is encouraged only when file ownership is reasonably separable. Before assigning simultaneous tasks, identify expected files/subsystems. Do not have Codex and Claude independently solve the same implementation unless the purpose is explicitly comparative exploration.

If one agent discovers that another branch changed a shared contract, token, component API, routing model, build configuration, or content schema that its task depends on, integrate/rebase before proceeding.

## Handoff protocol

The repository, not chat history, carries the handoff. A handoff must identify:

- task and intended outcome
- current branch and target branch
- relevant commit(s)
- PR if available
- what changed
- files/subsystems touched
- validation and test results
- visual QA still required
- decisions made and why
- known issues or risks
- whether it is ready to merge to production
- whether deployment monitoring is required after merge
- exact next action

Use `docs/handoffs/TEMPLATE.md`. `docs/handoffs/current.md` is the transient active handoff and may be replaced when a new cross-agent handoff begins. Durable architectural decisions belong in ADRs.

## When to use Claude

Prefer Codex as the default so project reasoning and integration remain centralized. Hand a task to Claude when:

- Codex usage/capacity prevents continuation;
- Justin explicitly requests Claude;
- parallel implementation will materially accelerate the project without overlapping files;
- a bounded specialist task can be handed off cleanly.

Do not move work to Claude merely because a task is complex. Complexity is handled through scope, documentation, tests, and branches.

## Returning from Claude to Codex

Justin should normally only need to say: `Review Claude's latest work.` Codex should then read `CLAUDE.md`, `docs/handoffs/current.md`, inspect the named branch/commits and PR, verify validation and deployment readiness, and continue from repository evidence rather than asking Justin to reconstruct the work.
