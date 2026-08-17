# Codex repository instructions

The canonical specification, `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`, governs this repository.

This repository may be developed by both Codex and Claude Code. GitHub is the source of truth. Read `docs/agent-collaboration.md` before starting or continuing cross-agent work. If Claude has handed work back, read `docs/handoffs/current.md` and inspect the named branch/commits rather than relying on chat history. Codex-owned implementation should use `codex/<short-task-name>` branches; do not commit implementation work directly to `main`.

Production hosting is GitHub Pages. `main` is the production source branch. A successful push to `main` triggers `.github/workflows/pages.yml`, which validates the framework, builds the reference site with `npm run build:pages`, and deploys the resulting `dist/` artifact to GitHub Pages. Do not bypass pull-request review for implementation changes unless Justin explicitly instructs otherwise.

1. Do not place site copy in shared components.
2. Do not create a component when composition or an existing variant is sufficient.
3. Use tokens instead of arbitrary reusable design values.
4. Validate additions against Tokens → Entities → Components → Patterns → Global Elements → Templates → Utilities → Integrations.
5. Preserve semantic HTML, keyboard operation, visible focus, accessible names, and exactly one H1 owner per page.
6. Keep site-specific work in `sites/{site}` unless it passes the reusability admission rules.
7. Do not add a dependency without documenting its concrete need.
8. Run `npm run validate` before completion.
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
19. Treat merge to `main` as a production deployment event because GitHub Pages deploys automatically after the workflow succeeds.
20. When handing work to Claude Code, use `docs/handoffs/TEMPLATE.md` to populate `docs/handoffs/current.md` with branch, commits, validation, risks, and the exact next action.
21. Preserve the existing ChatGPT Sites build path only for compatibility; it is no longer the primary production workflow.
