# Codex repository instructions

The canonical specification, `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md`, governs this repository.

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
