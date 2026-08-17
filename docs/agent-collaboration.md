# Codex + Claude Code Collaboration Workflow

## Purpose

Treat Codex and Claude Code as two developers working on one codebase. GitHub is the authoritative source for code, project documentation, task state, handoffs, review, and production deployment history. GitHub Pages is the primary production host for the reference implementation.

`AGENTS.md` is the single agent instruction file for both Codex and Claude Code. Both agents use the same design/composition documentation stack and the same Git workflow.

## Required reading for interface/site work

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`
2. `WHARTON_DESIGN_DECISION_FRAMEWORK.md`
3. `src/registry/framework-elements.ts`
4. `docs/component-handbook.md`
5. `docs/page-recipes.md` when composing full pages or site sections
6. `docs/deployment.md` and `docs/testing.md` for production/QA work

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
2. accepted ADRs in `docs/decisions/`
3. `AGENTS.md`
4. `WHARTON_DESIGN_DECISION_FRAMEWORK.md` for component/pattern selection
5. `src/registry/framework-elements.ts` for what exists and its machine-readable contract
6. `docs/component-handbook.md`
7. `docs/page-recipes.md`
8. `docs/deployment.md`
9. this collaboration workflow
10. task-specific handoff/instructions
11. conversational context

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
4. Developer reads `AGENTS.md`, governing docs, and relevant implementation files.
5. For interface work, identify user goal/content relationship and select from the existing registry before implementation.
6. For full-page/site work, choose the closest Page Recipe and adapt it to the real strategy/content rather than copying a recipe mechanically.
7. Implement only the assigned scope.
8. Run focused tests; run `npm run validate` for the full local framework QA gate when practical.
9. For deployment-affecting work, also run `npm run build:pages` when practical.
10. Update required docs/contracts/tests/registry/decision guidance together with the code.
11. Complete `docs/handoffs/current.md` if another agent will continue or review the work.
12. Push branch and open a PR into `main`.
13. Review code, validation, and visual behavior.
14. Merge only after production approval.
15. The push to `main` triggers `.github/workflows/pages.yml`.
16. Treat the change as live only after the GitHub Pages workflow succeeds.

## Production deployment

Production URL:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

`main` is intentionally coupled to production. A merge is a deployment approval, not merely source integration.

The production workflow runs content validation, Astro/TypeScript/token checks, unit tests, static reference build, generated-build audit, GitHub Pages build, artifact upload, and Pages deployment.

Full Playwright E2E, accessibility, responsive, and visual-regression suites remain part of deliberate development QA, especially for visual/framework releases. They do not block production solely because CI lacks matching platform-specific screenshot baselines.

If the Pages workflow fails, production remains on the last successful deployment. Fix the failure on a branch and merge the correction through the same review path. Do not publish a separate manual production copy.

ChatGPT Sites remains compatibility-only and is not required for preview or production.

## Parallel-work rules

Parallel work is encouraged only when file ownership is reasonably separable. Before assigning simultaneous tasks, identify expected files/subsystems. Do not have Codex and Claude independently solve the same implementation unless the purpose is explicitly comparative exploration.

If one agent discovers that another branch changed a shared contract, token, component API, routing model, build configuration, content schema, registry entry, or design-decision rule that its task depends on, integrate/rebase before proceeding.

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
- design/selection decisions made and why
- known issues or risks
- whether it is ready to merge to production
- whether deployment monitoring is required after merge
- exact next action

Use `docs/handoffs/TEMPLATE.md`. `docs/handoffs/current.md` is the transient active handoff. Durable architectural decisions belong in ADRs; durable component/page-selection guidance belongs in the Design Decision Framework, Component Handbook, or Page Recipes.

## When to use Claude

Prefer Codex as the default so project reasoning and integration remain centralized. Hand a task to Claude when Codex usage/capacity prevents continuation, Justin explicitly requests Claude, parallel implementation materially accelerates work without overlapping files, or a bounded specialist task can be handed off cleanly.

Do not move work to Claude merely because a task is complex. Complexity is handled through scope, committed documentation, tests, branches, and handoffs.

## Returning from Claude to Codex

Justin should normally only need to say: `Review Claude's latest work.` Codex should read `AGENTS.md` and `docs/handoffs/current.md`, inspect the named branch/commits and PR, verify validation and deployment readiness, and continue from repository evidence rather than asking Justin to reconstruct the work.

The same rule applies in reverse when Codex hands work to Claude.