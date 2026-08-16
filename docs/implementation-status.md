# Step 6 implementation status

## Scope completed

The repository now contains the reusable framework foundation and a neutral reference implementation. The reference site renders eight routes from structured configuration, exercises all canonical template resolvers, uses JSON entities behind fixture provider interfaces, renders long-form Markdown, emits local assets by stable ID, and demonstrates global navigation, mobile drill-down, search, tabs, native disclosure, cards, collections, a directory, events, a form, responsive behavior, and accessibility conventions.

The neutral reference now selects `old-theme`. Its tokens and shared presentation preserve the approved current-CMS fidelity implementation. The theme registry and development selector can render the same content through the `new-theme` scaffold without duplicating the functional system; Step 7 will supply that scaffold's Figma-derived visual rules.

Step 6C finalized the remaining measured current-CMS differences in the content boundary, responsive shell offsets, Story Tile typography, FAQ row sizing, and footer typography. The implementation is ready to be frozen as `old-theme`; no `new-theme` visual rules were added.

Undergraduate HTML and production content were not migrated.

## Architecture deviations

No approved Step 5 architecture decision was changed.

Two operational details were resolved inside the approved architecture:

- A dependency-free token generator was chosen because the architecture specifies DTCG sources and generated CSS but does not prescribe a token tool.
- Validated site assets are emitted through a static Astro endpoint because the architecture requires assets to remain under `sites/{site}/assets` while Astro normally serves `public` directly.
- Optional institutional header/footer brand assets are now configured in `site.config.json`; this keeps current-CMS shell identity out of shared component copy while retaining the approved site-configuration boundary.

The newest TypeScript 7 release was not used because the current Astro checker supports TypeScript 5 or 6. The project pins TypeScript 6.0.3; this is compatibility management, not an architecture deviation.

## ChatGPT Sites validation

The neutral reference implementation was successfully deployed as an owner-only ChatGPT Site on August 16, 2026. All eight routes, shared assets, responsive layouts, keyboard interactions, dialogs, navigation, search, prototype form behavior, design tokens, accessibility scans, and local visual baselines were exercised against the hosted result. See `sites-validation.md` for the deployment record and compatibility changes.

## Remaining gaps

- The workspace began without Git metadata. It is now connected to `FlaxMaster1/wharton-prototype-framework`; the approved Step 6 implementation is synchronized to the authoritative `main` branch, with its review history preserved in pull request 1.
- Undergraduate global navigation, real content, template reproduction, and page-by-page production comparison remain deliberately deferred to Step 7.
- Production adapters for Events HQ, Faculty Data, forms, content feeds, search, video, authentication, and analytics are interfaces only; fixtures/prototype behavior is intentional for Step 6.
- Canonical inventory items not needed for the foundation demo remain unimplemented, including Icon, Video, standalone FormLabel/FormMessage and Tab primitives, Pagination, LoadMore, FilterControl/FilterBar, carousels, comparison, calendars, course/publication/award views, newsletter/lead-generation specializations, and live search results.
- Automated accessibility checks pass, but manual assistive-technology and content review remains required.
- Visual baselines currently target Chromium on macOS; broader cross-browser behavioral coverage belongs in the next quality expansion.
- Route-aware current-page state is not yet derived automatically for the neutral primary navigation; Step 7 should bind active state to the selected route when real site navigation is introduced.
- No favicon is configured for the neutral reference fixture. The hosted framework pages and declared assets load successfully, but browsers request `/favicon.ico` and receive a non-blocking 404.
- Exact legacy tile subclasses, production photographic art direction, automatic breadcrumb ancestry, footer social/support fields, focus styling in every legacy plugin, and production-owned font/logo packaging remain unresolved; see `current-cms-visual-fidelity.md`.
