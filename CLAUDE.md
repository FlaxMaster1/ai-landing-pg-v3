# Claude Code repository instructions

This repository is developed collaboratively by Codex and Claude Code. GitHub is the source of truth for code, project documentation, task state, and handoffs. ChatGPT Sites is the preview, QA, and publishing environment for the hosted prototype.

Read `AGENTS.md` and `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` before making changes. The canonical specification governs when instructions conflict.

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
- Leave the working tree in a clean, reviewable state before handoff.

## Required Git workflow

For every implementation task:

1. Work on `claude/<short-task-name>`.
2. Commit the completed work with a clear commit message.
3. Push the branch to GitHub.
4. Record the exact branch name and final commit SHA in `docs/handoffs/current.md`.
5. Do not merge the branch into `main` unless Justin or Codex explicitly instructs you to do so.
6. Do not deploy directly to production.

GitHub must contain the code state that is being handed back for review. Do not rely on uncommitted local files as the handoff.

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
- whether a ChatGPT Sites preview is required

Do not put transient chat history into permanent architecture documentation.

## ChatGPT Sites preview handoff

Claude Code does not own ChatGPT Sites deployment. A GitHub push does not, by itself, mean the hosted ChatGPT Site has been updated.

For any visual, layout, component, template, routing, styling, interaction, or site-content change that Justin is expected to review, set:

`Sites Preview Requested: YES`

The handoff must then contain this information explicitly:

```text
Sites Preview Requested: YES
Branch: claude/<task>
Commit: <exact-sha>
Validation: PASS | PARTIAL | FAIL

Action for Codex:
Load this exact branch/commit into the existing ChatGPT Sites project for visual review.
Do not merge to main or publish to production until Justin approves the preview.
```

If the change is documentation-only or otherwise does not require a hosted visual review, set:

`Sites Preview Requested: NO`

## Preview and approval sequence

When `Sites Preview Requested: YES`, the expected workflow is:

1. Claude completes and validates the change.
2. Claude commits and pushes `claude/<task>`.
3. Claude updates `docs/handoffs/current.md` with the exact branch and commit SHA.
4. Codex/ChatGPT reads the handoff and inspects the pushed branch/commit.
5. Codex loads/builds that exact source state in the existing ChatGPT Sites project for preview and QA.
6. Justin reviews the preview.
7. Any requested fixes are made on the owning branch.
8. After approval, the PR may be merged into `main`.
9. The approved `main` state is then used for final Sites review and explicit production deployment.

Never assume that preview approval, GitHub merge, and production deployment are the same action.

## Returning work cleanly

At the end of a Claude task, the repository should make it possible for Justin to tell Codex only:

`Preview Claude's latest work.`

Codex should then be able to determine the exact branch, commit, validation state, and requested next action from `docs/handoffs/current.md` without Justin reconstructing the task from conversation history.
