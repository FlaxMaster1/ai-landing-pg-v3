# Codex + Claude Code Collaboration Workflow

## Purpose

Treat Codex and Claude Code as two developers working on one codebase. GitHub is the authoritative source for code, project documentation, task state, handoffs, review, and production deployment. GitHub Pages is the primary production host for the reference implementation.

## Roles

### Project owner
Justin approves scope, visual direction, major architecture decisions, and production merges.

### Codex / ChatGPT
Default lead developer and integration owner. Use Codex for implementation whenever practical, repository integration, cross-cutting framework work, validation, visual QA, and review of Claude work after it is pushed to GitHub.

### Claude Code
Overflow or specialist developer. Use when Codex capacity blocks progress, when Justin explicitly delegates a task, or when parallel implementation materially accelerates the project. Claude works through Git branches and hands completed work back through GitHub plus `docs/handoffs/current.md`.

## Source of truth

Priority order:

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`
2. Accepted ADRs in `docs/decisions/`
3. `AGENTS.md`
4. This collaboration workflow
5. Task-specific handoff/instructions
6. Conversational context

If conversational instructions conflict with committed governing documentation, resolve the conflict rather than silently changing architecture.

## Branch model

- `main`: approved production source branch; never use as an agent scratch branch.
- `codex/<task>`: Codex-owned implementation.
- `claude/<task>`: Claude-owned implementation.
- `workflow/<task>`: repository/process maintenance.
- One task per branch.
- Branch from current `main` unless a task explicitly requires another base.
- Avoid simultaneous edits to the same subsystem. If overlap is unavoidable, designate an integration owner first.

## Standard development cycle

1. Define the task and acceptance criteria.
2. Confirm owner: Codex or Claude.
3. Developer updates from `main` and creates its branch.
4. Developer reads governing docs and relevant implementation files.
5. Implement only the assigned scope.
6. Run `npm run validate`.
7. For deployment-affecting work, also run `npm run build:pages` when practical.
8. Update required docs/contracts/tests/registry/ADR together with the code.
9. Complete `docs/handoffs/current.md` if another agent will continue or review the work.
10. Push branch and open a PR into `main`.
11. Review code, validation, and visual behavior.
12. Merge approved PR.
13. The push to `main` triggers `.github/workflows/pages.yml`.
14. GitHub Actions validates, builds, and deploys the reference site to GitHub Pages.
15. Treat the change as live only after the Pages workflow succeeds.

## Production deployment

The expected production URL is:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

`main` is intentionally coupled to production. A merge is therefore a deployment approval, not merely source integration.

The deployment workflow:

1. checks out the merged `main` state;
2. installs dependencies;
3. installs the Playwright Chromium runtime needed by repository validation;
4. runs `npm run validate`;
5. runs `npm run build:pages`;
6. uploads `dist/` as the Pages artifact;
7. deploys through GitHub Pages.

If validation or build fails, production must not be considered updated. Fix the failed workflow on a branch and merge the correction through the same review path.

The existing ChatGPT Sites configuration remains available for compatibility, but it is no longer required for preview or production deployment.

## Parallel-work rules

Parallel work is encouraged only when file ownership is reasonably separable. Before assigning simultaneous tasks, identify expected files/subsystems. Do not have Codex and Claude independently solve the same implementation unless the purpose is explicitly comparative exploration.

If one agent discovers that another branch has changed a shared contract, token, component API, routing model, build configuration, or content schema that its task depends on, integrate/rebase before proceeding.

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
- exact next action
- whether the branch is ready to merge to production

Use `docs/handoffs/TEMPLATE.md`. `docs/handoffs/current.md` is the transient active handoff and may be replaced when a new cross-agent handoff begins. Durable architectural decisions belong in ADRs, not the handoff file.

## When to use Claude

Prefer Codex as the default so project reasoning and integration remain centralized. Hand a task to Claude when:

- Codex usage/capacity prevents continuation;
- Justin explicitly requests Claude;
- parallel implementation will materially accelerate the project without overlapping files;
- a bounded specialist task can be handed off cleanly.

Do not move work to Claude merely because a task is complex. Complexity is handled through scope, documentation, tests, and branches.

## Returning from Claude to Codex

Justin should normally only need to say: `Review Claude's latest work.` Codex should then read `CLAUDE.md`, `docs/handoffs/current.md`, inspect the named branch/commits and diff against the stated base, verify validation, and continue from repository evidence rather than asking Justin to reconstruct the work.
