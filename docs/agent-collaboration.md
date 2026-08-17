# Codex + Claude Code Collaboration Workflow

## Purpose

Treat Codex and Claude Code as two developers working on one codebase. GitHub is the authoritative source for code, project documentation, task state, and handoffs. ChatGPT Sites is the preview, QA, and publishing environment for the hosted prototype.

## Roles

### Project owner
Justin approves scope, visual direction, major architecture decisions, and production deployment.

### Codex / ChatGPT
Default lead developer and integration owner. Use Codex for implementation whenever practical, repository integration, cross-cutting framework work, validation, visual QA, and ChatGPT Sites preview/deployment. Codex may also review or continue Claude work after it is pushed to GitHub.

### Claude Code
Overflow or specialist developer. Use when Codex capacity/credits block progress, when Justin explicitly delegates a task, or when a task benefits from Claude-specific implementation work. Claude works through Git branches and hands completed work back through GitHub plus `docs/handoffs/current.md`.

## Source of truth

Priority order:

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`
2. Accepted ADRs in `docs/decisions/`
3. `AGENTS.md`
4. This collaboration workflow
5. Task-specific handoff/instructions
6. Conversational context

If conversational instructions conflict with committed governing documentation, stop and resolve the conflict rather than silently changing architecture.

## Branch model

- `main`: approved integration branch; never use as an agent scratch branch.
- `codex/<task>`: Codex-owned implementation.
- `claude/<task>`: Claude-owned implementation.
- `workflow/<task>`: repository/process maintenance.
- One task per branch.
- Before starting, branch from current `main` unless a task explicitly requires another base.
- Avoid simultaneous edits to the same subsystem. If overlap is unavoidable, designate one branch as the integration branch first.

## Standard development cycle

1. Define the task and acceptance criteria.
2. Confirm owner: Codex or Claude.
3. Developer updates from `main` and creates its branch.
4. Developer reads governing docs and relevant implementation files.
5. Implement only the assigned scope.
6. Run `npm run validate`.
7. Update required docs/contracts/tests/registry/ADR together with the code.
8. Complete `docs/handoffs/current.md` if another agent will continue or review the work.
9. Push branch and open a PR into `main`.
10. Review code and visual behavior.
11. Merge approved PR.
12. For hosted changes, build/preview the approved state in ChatGPT Sites and explicitly deploy only after approval.

## Parallel-work rules

Parallel work is encouraged only when file ownership is reasonably separable. Before assigning simultaneous tasks, identify expected files/subsystems. Do not have Codex and Claude independently solve the same implementation unless the purpose is explicitly comparative exploration.

If one agent discovers that another branch has changed a shared contract, token, component API, routing model, build configuration, or content schema that its task depends on, pause and integrate/rebase before proceeding.

## Handoff protocol

The repository, not chat history, carries the handoff. A handoff must identify:

- task and intended outcome
- current branch and target branch
- relevant commit(s)
- what changed
- files/subsystems touched
- validation and test results
- visual QA still required
- decisions made and why
- known issues or risks
- exact next action
- whether Sites preview/deployment is requested

Use `docs/handoffs/TEMPLATE.md`. `docs/handoffs/current.md` is the transient active handoff and may be replaced when a new cross-agent handoff begins. Durable architectural decisions belong in ADRs, not the handoff file.

## ChatGPT Sites workflow

GitHub is authoritative for source. Sites is not treated as an independent development branch.

For a change produced by Claude:

1. Claude pushes `claude/<task>` and completes the handoff.
2. Codex/ChatGPT reviews the diff and validation state.
3. If pre-merge visual review is needed, load/build the candidate state for Sites without treating it as approved production.
4. Resolve defects on the owning branch.
5. Merge the approved PR to `main`.
6. Build/save the approved Sites version from the intended source state.
7. Perform visual/functional QA.
8. Explicitly deploy after Justin's approval when production deployment is requested.

Never assume pushing GitHub automatically deploys ChatGPT Sites.

## When to use Claude

Prefer Codex as the default so project reasoning and Sites work stay in one environment. Hand a task to Claude when:

- Codex usage/capacity prevents timely continuation;
- Justin explicitly requests Claude;
- parallel implementation will materially accelerate the project without overlapping files;
- a bounded specialist task can be handed off cleanly.

Do not move work to Claude merely because a task is complex. Complexity is handled through scope, documentation, tests, and branches.

## Returning from Claude to Codex

Justin should normally only need to say: `Review the current Claude handoff and continue.` Codex should then read `CLAUDE.md`, `docs/handoffs/current.md`, inspect the named branch/commits and diff against the stated base, run or verify validation, and continue from repository evidence rather than asking Justin to reconstruct the work.
