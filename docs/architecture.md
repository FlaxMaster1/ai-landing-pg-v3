# Technical architecture

## Architecture overview

The framework separates site strategy/content from reusable design and implementation decisions.

```text
site strategy + sitemap + content model
                ↓
site configuration + entities + Markdown + assets
                ↓
Design Decision Framework + typed registry + Component Handbook + Page Recipes
                ↓
validation + generic renderer
                ↓
templates → patterns → components → globals
                ↓
theme + tokens + native CSS + local interaction JavaScript
                ↓
static HTML/assets
                ↓
GitHub Pages production deployment
```

The documentation decision layer does not replace runtime contracts. `src/registry/framework-elements.ts`, schemas, source code, and tests remain the technical source of truth for implemented behavior.

## Runtime and rendering

Astro 7 and strict TypeScript produce static HTML. `src/pages/index.astro` handles the selected site's root route; `src/pages/[...slug].astro` generates all other configured routes. Both use `PageRenderer.astro`, the template registry, and the pattern registry.

The build-time `site-loader.ts`:

1. validates the selected site ID and root;
2. parses site, navigation, footer, page, asset, and entity JSON with Zod;
3. rejects duplicate routes and IDs;
4. rejects missing local files and dangling asset/entity references;
5. exposes validated data to the renderer and fixture adapters.

Page schemas reject unknown section or template discriminants. They also enforce one H1 owner: `titleMode: default` assigns ownership to the template; `titleMode: hero` requires exactly one Hero.

## Design-decision layer

The framework intentionally separates **what exists** from **how to choose it**:

- `WHARTON_DESIGN_DECISION_FRAMEWORK.md` defines selection logic from user goal/content relationship to pattern/component.
- `src/registry/framework-elements.ts` defines the machine-readable inventory and contracts.
- `docs/component-handbook.md` defines detailed use/avoid/variant/accessibility/responsive guidance.
- `docs/page-recipes.md` defines complete page and site-type composition guidance.

Codex, Claude Code, and human developers should consult these documents before creating new interface elements. Runtime source and schemas remain authoritative when prose and implementation diverge.

## Layer boundaries

- Templates own page structure, title behavior, width, and sidebar placement. They contain no site copy.
- Patterns compose components around a purpose such as Hero, CardGrid, FAQ, StoryCollection, or EventList.
- Components are reusable semantic units with explicit Astro/TypeScript props.
- Global elements receive site configuration and compose the shared header/footer shell.
- Integrations expose typed interfaces. Fixture adapters are the default prototype boundary; shared UI never imports a production provider directly.
- Site roots own copy, page composition, navigation, footer links, Markdown, entities, asset metadata, and optional institutional-brand configuration used by the global shell.
- Themes own visual implementation behind a registered stylesheet entry. They do not fork the functional component, pattern, global, template, entity, content, utility, or integration contracts.

`tests/unit/architecture-boundaries.test.ts` prevents concrete site imports from shared components, patterns, globals, and templates.

## Design tokens and CSS

DTCG-compatible JSON is organized as primitive → semantic → component tokens. `npm run generate:tokens` uses the dependency-free `scripts/generate-tokens.mjs` pipeline to produce `src/tokens/generated/tokens.css`.

Native CSS uses explicit cascade order:

```text
reset → tokens → base → utilities → components → patterns → globals → site
```

The reference site selects `old-theme`, whose token and CSS layers preserve the observed current Wharton CMS. `new-theme` is the visual-system boundary for redesigned styles. Only the resolved theme stylesheet is loaded; `old-theme` is the default and fallback. Responsive behavior is mobile-first and uses flexible grids, fluid tokenized typography/spacing, intrinsic sizing, and content-driven transitions. The complete theme contract is in `themes.md`; ADR 009 records the theme-boundary decision.

## Content and Markdown

JSON is the default for site configuration, page composition, navigation, assets, structured entities, cards, actions, and collections. Markdown is used for long narrative content and is loaded through Astro's content collection API. MDX is not enabled.

Site strategy, sitemap, content plans, and wireframes may be developed before implementation. When implementation begins, those decisions are mapped into registered entities, templates, patterns, and components through the Design Decision Framework and Page Recipes rather than by inventing a site-specific visual system.

## Assets

Site assets remain under `sites/{site}/assets` and are referenced by stable IDs in `assets.json`. A static Astro endpoint emits only validated selected-site assets at `/site-assets/{site}/{file}` with long-lived immutable cache headers. Shared assets remain in `public/shared`.

## Site builds

`SITE={site-id}` selects routes, shell configuration, content, entities, assets, theme, and integration settings. The checked-in scripts provide the reference shorthand `npm run build:reference`; future sites may add equivalent convenience scripts without changing framework code.

## Production hosting

GitHub Pages is the primary production host for the reference implementation. `main` is the production source branch. A reviewed merge to `main` triggers `.github/workflows/pages.yml`, which runs the production validation/build/audit gate and deploys the Pages artifact. See `deployment.md` and ADR 010.

## ChatGPT Sites compatibility

`npm run build:sites` preserves the same Astro routes and prerenders the reference pages/assets while adding the Cloudflare adapter and Sites deployment metadata around the static output. `scripts/prepare-sites-build.mjs` supplies the worker entry filename expected by the compatibility build. This path is maintained for optional compatibility/experimentation only and is not the primary source-control, preview, or production deployment model.