# Repository instructions for Codex and Claude Code

The canonical specification, `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`, governs this repository.

This repository is developed collaboratively by Codex and Claude Code. `AGENTS.md` is the single agent instruction file for both. GitHub is the source of truth for code, project documentation, task state, review, handoffs, and deployment history.

Before making changes, read:

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`
2. `WHARTON_DESIGN_DECISION_FRAMEWORK.md` when selecting, composing, modifying, or creating interface elements
3. `docs/agent-collaboration.md`
4. `docs/deployment.md`
5. `docs/implementation-status.md`
6. `docs/handoffs/current.md` when continuing or reviewing another agent's work

If instructions conflict, use this priority order:

1. canonical specification
2. accepted ADRs in `docs/decisions/`
3. this file
4. `WHARTON_DESIGN_DECISION_FRAMEWORK.md` for component/pattern selection decisions
5. `docs/deployment.md`
6. `docs/agent-collaboration.md`
7. task-specific handoff/instructions
8. conversational context

## Production model

- Production URL: `https://flaxmaster1.github.io/wharton-prototype-framework/`
- GitHub Pages is the primary production host.
- `main` is the production source branch.
- A merge to `main` is a production deployment approval.
- A push to `main` triggers `.github/workflows/pages.yml`.
- The Pages workflow validates content/types/tokens/unit tests, builds and audits the static reference site, builds the Pages artifact, and deploys it.
- Treat a change as live only after the `Validate and deploy GitHub Pages` workflow succeeds.
- Full Playwright E2E/accessibility/responsive/visual QA remains a deliberate development gate and is separate from the narrower production deployment gate.
- ChatGPT Sites is compatibility-only and is not the production source of truth.
- If the Pages workflow fails, production remains on the last successful deployment. Fix the failure on a branch and merge the correction through the normal review path.

## Agent branch ownership

- Codex implementation work: `codex/<short-task-name>`
- Claude Code implementation work: `claude/<short-task-name>`
- Process/documentation work: `workflow/<task>` or `docs/<task>`
- Never use `main` as an agent scratch branch.
- One task per branch.
- Branch from current `main` unless the task or handoff explicitly names another base.
- Avoid simultaneous edits to the same subsystem. If overlap is unavoidable, designate an integration owner first.

## Before starting implementation

1. Update from the latest `main` unless the handoff specifies another base.
2. Read the governing documentation listed above.
3. Inspect recent changes in the files/subsystems you expect to touch.
4. Check `docs/handoffs/current.md` for active cross-agent work.
5. Create the appropriate agent-owned branch before implementation.
6. Do not begin implementation directly on `main`.

## Repository rules

1. Do not place site copy in shared components.
2. Before selecting or creating an interface element, inspect `src/registry/framework-elements.ts` and apply `WHARTON_DESIGN_DECISION_FRAMEWORK.md`. Prefer an existing registered component, pattern, or composition before introducing a new element or variant.
3. Do not create a component when composition or an existing variant is sufficient.
4. Use tokens instead of arbitrary reusable design values.
5. Validate additions against Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations.
6. Preserve semantic HTML, keyboard operation, visible focus, accessible names, and exactly one H1 owner per page.
7. Keep site-specific work in `sites/{site}` unless it passes the reusability admission rules.
8. Do not add a dependency without documenting its concrete need.
9. Run the appropriate validation for the scope. Use `npm run validate` for full local framework QA when practical; deployment-critical checks are defined by `.github/workflows/pages.yml`.
10. For deployment-affecting work, run `npm run build:pages` when practical.
11. Update contracts, the registry, tests, and documentation together.
12. Record architecture changes in an ADR before implementing them.
13. Never duplicate shared framework components into a site folder.
14. Use functional names rather than WordPress, plugin, or appearance-based names.
15. Do not add a client framework without an approved ADR and concrete need.
16. Keep external systems behind typed provider interfaces.
17. Do not introduce Undergraduate-specific framework shortcuts.
18. Preserve the static-first rendering default and opt into client JavaScript only for interaction.
19. Keep one task per branch and avoid unrelated cleanup.
20. Before editing a shared subsystem, inspect current `main` and any named handoff branch for overlapping work.
21. Do not casually change shared contracts, routing, build configuration, design tokens, or content schemas. If required, document the reason and update dependent tests/docs together.
22. Leave the working tree clean and reviewable before handoff.
23. Do not bypass GitHub Pages with a separate manual production copy.

## Required Git workflow

For every implementation task:

1. Work on the appropriate `codex/<task>` or `claude/<task>` branch.
2. Commit completed work with a clear commit message.
3. Push the branch to GitHub.
4. Open or prepare a PR into `main` when review-ready.
5. If another agent will review or continue the work, update `docs/handoffs/current.md` using `docs/handoffs/TEMPLATE.md`.
6. Record the exact branch, base commit if known, final commit SHA(s), PR, validation state, production readiness, risks, and exact next action.
7. Do not merge implementation work to `main` unless Justin has approved the production change or the task explicitly grants merge authority.
8. GitHub must contain the exact code state being handed off. Do not rely on uncommitted local files.

## Cross-agent handoff

The repository, not chat history, carries the handoff.

A complete handoff must include:

- task title and status
- owner handing off and next owner
- working branch and target branch
- base commit if known
- final relevant commit SHA(s)
- PR URL/number
- concise summary of work completed
- files/subsystems changed
- validation/test results
- responsive/accessibility/visual checks performed or still required
- decisions made
- unresolved issues, risks, or merge concerns
- whether the branch is ready to merge to production
- whether the Pages workflow must be monitored after merge
- exact recommended next action

Use `docs/handoffs/TEMPLATE.md`. Durable architectural decisions belong in ADRs, not handoff files.

When Claude hands work back, Justin should normally only need to tell Codex: `Review Claude's latest work.` Codex should inspect `docs/handoffs/current.md`, the named branch/commits, PR, validation state, and GitHub Actions state rather than asking Justin to reconstruct the work from conversation history.

The same rule applies in reverse when Codex hands work to Claude.

## Review and deployment sequence

1. Agent completes and validates the change.
2. Agent commits and pushes its branch.
3. Agent opens/prepares a PR and updates the handoff if cross-agent review is needed.
4. Codex/Claude/Justin reviews the diff, validation state, and visual behavior as appropriate.
5. Requested fixes remain on the owning branch.
6. After production approval, the PR is merged into `main`.
7. GitHub Actions runs the Pages deployment workflow.
8. Treat production as updated only after the workflow succeeds.
9. If deployment fails, diagnose and fix the failure on a branch. Do not claim the change is live until a successful deployment completes.
