# Codex repository instructions

The canonical specification, `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`, governs this repository.

This repository is developed by both Codex and Claude Code. GitHub is the source of truth for code, project documentation, task state, review, handoffs, and deployment history. Read `docs/agent-collaboration.md` and `docs/deployment.md` before starting or continuing cross-agent work. If Claude has handed work back, read `docs/handoffs/current.md` and inspect the named branch, commit, PR, and workflow state rather than relying on chat history.

## Production model

- Production is hosted at `https://flaxmaster1.github.io/wharton-prototype-framework/`.
- `main` is the production source branch.
- Codex implementation work uses `codex/<short-task-name>` branches.
- Claude implementation work uses `claude/<short-task-name>` branches.
- Do not use `main` as an agent scratch branch.
- A merge to `main` is a production deployment approval.
- A push to `main` triggers `.github/workflows/pages.yml`.
- The Pages workflow validates content/types/tokens/unit tests, builds and audits the static reference site, builds the Pages artifact, and deploys it.
- Treat a change as live only after the `Validate and deploy GitHub Pages` workflow succeeds.
- Full Playwright E2E/accessibility/visual QA remains a separate development gate and may be run deliberately without blocking deployment on platform-specific screenshot baselines.
- ChatGPT Sites is compatibility-only and is not the production source of truth.

## Repository rules

1. Do not place site copy in shared components.
2. Do not create a component when composition or an existing variant is sufficient.
3. Use tokens instead of arbitrary reusable design values.
4. Validate additions against Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations.
5. Preserve semantic HTML, keyboard operation, visible focus, accessible names, and exactly one H1 owner per page.
6. Keep site-specific work in `sites/{site}` unless it passes the reusability admission rules.
7. Do not add a dependency without documenting its concrete need.
8. Run the appropriate validation for the scope. Use `npm run validate` for full local framework QA when practical; deployment-critical checks are defined by `.github/workflows/pages.yml`.
9. Update contracts, the registry, tests, and documentation together.
10. Record architecture changes in an ADR before implementing them.
11. Never duplicate shared framework components into a site folder.
12. Use functional names rather than WordPress, plugin, or appearance-based names.
13. Do not add a client framework without an approved ADR and concrete need.
14. Keep external systems behind typed provider interfaces.
15. Do not introduce Undergraduate-specific framework shortcuts.
16. Preserve the static-first rendering default and opt into client JavaScript only for interaction.
17. Keep one task per branch and avoid unrelated cleanup.
18. Before editing a shared subsystem, inspect current `main` and any named handoff branch for overlapping work.
19. Do not merge implementation work to `main` unless Justin has approved the production change or the task explicitly grants merge authority.
20. When handing work to Claude Code, use `docs/handoffs/TEMPLATE.md` to populate `docs/handoffs/current.md` with branch, commit, PR, validation, risks, production readiness, and exact next action.
21. If a production workflow fails, diagnose and fix it on a branch. Do not bypass GitHub Pages with a separate manual production copy.
