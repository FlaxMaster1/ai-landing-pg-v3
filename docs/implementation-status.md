# Current implementation status

## Scope completed

The repository contains a reusable static-first Wharton framework foundation, a neutral reference implementation, a machine-readable framework registry, a documented design-decision system, a component/pattern handbook, complete-page/site-type recipes, a shared Codex/Claude workflow, and GitHub Pages production deployment.

The reference site renders eight routes from structured configuration, exercises all canonical template resolvers, uses JSON entities behind fixture provider interfaces, renders long-form Markdown, emits local assets by stable ID, and demonstrates global navigation, mobile drill-down, search, tabs, native disclosure, cards, collections, a directory, events, a form, responsive behavior, and accessibility conventions.

The neutral reference selects `old-theme`. Its tokens and shared presentation preserve the approved current-CMS fidelity implementation. The theme registry and development selector can render the same content through the `new-theme` boundary without duplicating the functional system.

Step 6C finalized measured current-CMS differences in the content boundary, responsive shell offsets, Story Tile typography, FAQ row sizing, and footer typography. That work remains the legacy/current-CMS fidelity baseline for `old-theme`.

Undergraduate HTML and production content have not been directly migrated.

## Documentation and decision system

The framework now provides a repository-backed selection/composition stack:

1. `../WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` — governing architecture and guardrails.
2. `../WHARTON_DESIGN_DECISION_FRAMEWORK.md` — user-goal/content-relationship decision logic.
3. `../src/registry/framework-elements.ts` — machine-readable inventory/contracts.
4. `component-handbook.md` — use/avoid/variant/accessibility/responsive guidance.
5. `page-recipes.md` — complete page and common Wharton site-type composition guidance.

`../AGENTS.md` requires both Codex and Claude Code to consult this stack before creating or selecting interface elements.

## Collaboration and source control

GitHub is the source of truth for code, documentation, task state, handoffs, review history, and deployment history.

- Codex works on `codex/<task>` branches.
- Claude Code works on `claude/<task>` branches.
- Cross-agent handoffs use `handoffs/current.md`.
- Implementation changes reach `main` through pull requests.
- A production-approved merge to `main` triggers GitHub Pages deployment.

## Production hosting

GitHub Pages is the primary production host for the reference implementation:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

`.github/workflows/pages.yml` validates, builds, audits, uploads, and deploys the reference site. A merge is not considered live until the `Validate and deploy GitHub Pages` workflow succeeds.

The ChatGPT Sites build path remains compatibility-only. The historical successful Sites validation is preserved in `sites-validation.md` as evidence that the static architecture can run there, but Sites is no longer the primary development or production workflow.

## Architecture deviations

No approved architecture decision has been invalidated by the current documentation or hosting changes.

Operational details resolved inside the approved architecture include:

- a dependency-free token generator for DTCG sources/generated CSS;
- validated site assets emitted through a static Astro endpoint;
- optional institutional header/footer brand assets configured in `site.config.json`;
- GitHub Pages as the production host while preserving the static-first architecture;
- the decision/documentation layer as guidance around, not a replacement for, the typed registry and runtime contracts.

TypeScript remains pinned to the version compatible with the current Astro checker. Dependency/version changes should continue to follow `dependencies.md`.

## Remaining gaps

- Wharton Undergraduate remains the first full real-site validation target. Its strategy, IA, content, template reproduction, and page-by-page production comparison remain to be implemented through the shared framework.
- Production adapters for Events HQ, Faculty Data, forms, content feeds, search, video, authentication, and analytics are interfaces only; fixtures/prototype behavior remains intentional.
- Canonical inventory items not needed for the foundation demo remain unimplemented, including Icon, Video, standalone FormLabel/FormMessage and Tab primitives, Pagination, LoadMore, FilterControl/FilterBar, carousels, comparison, calendars, course/publication/award views, newsletter/lead-generation specializations, and live search results.
- Automated accessibility checks are evidence, not complete conformance. Manual keyboard, screen-reader, zoom/reflow, alternative-text, and content review remain required for real sites.
- Visual baselines currently target Chromium on macOS; broader cross-browser behavioral coverage remains a quality-expansion opportunity.
- Route-aware current-page state is not yet derived automatically for the neutral primary navigation.
- No favicon is configured for the neutral reference fixture.
- Exact legacy tile subclasses, production photographic art direction, automatic breadcrumb ancestry, footer social/support fields, focus styling in every legacy plugin, and production-owned font/logo packaging remain unresolved; see `current-cms-visual-fidelity.md`.
- The next major documentation/implementation opportunity is a reusable site-starter blueprint layer that converts strategy/sitemap/content plans into initial `sites/{site}` structures and planning handoffs.

## Current operating model

```text
strategy + sitemap + content + wireframes
                ↓
Design Decision Framework
                ↓
typed registry + Component Handbook
                ↓
Page Recipes
                ↓
site configuration + shared framework implementation
                ↓
Codex/Claude branch + PR
                ↓
merge to main
                ↓
GitHub Pages deployment
```
