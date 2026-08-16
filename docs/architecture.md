# Technical architecture

## Runtime and rendering

Astro 7 and strict TypeScript produce static HTML. `src/pages/index.astro` handles the selected site's root route; `src/pages/[...slug].astro` generates all other configured routes. Both use `PageRenderer.astro`, the template registry, and the pattern registry.

The build-time `site-loader.ts`:

1. validates the selected site ID and root;
2. parses site, navigation, footer, page, asset, and entity JSON with Zod;
3. rejects duplicate routes and IDs;
4. rejects missing local files and dangling asset/entity references;
5. exposes validated data to the renderer and fixture adapters.

Page schemas reject unknown section or template discriminants. They also enforce one H1 owner: `titleMode: default` assigns ownership to the template; `titleMode: hero` requires exactly one Hero.

## Layer boundaries

- Templates own page structure, title behavior, width, and sidebar placement. They contain no site copy.
- Patterns compose components around a purpose such as a Hero, CardGrid, FAQ, StoryCollection, or EventList.
- Components are reusable semantic units with explicit Astro/TypeScript props.
- Global elements receive site configuration and compose the shared header/footer shell.
- Integrations expose typed interfaces. Fixture adapters are the Step 6 default; shared UI never imports a production provider.
- Site roots own copy, page composition, navigation, footer links, Markdown, entities, and asset metadata.

`tests/unit/architecture-boundaries.test.ts` prevents concrete site imports from shared components, patterns, globals, and templates.

## Design tokens and CSS

DTCG-compatible JSON is organized as primitive → semantic → component tokens. `npm run generate:tokens` uses the dependency-free `scripts/generate-tokens.mjs` pipeline to produce `src/tokens/generated/tokens.css`.

Native CSS uses explicit cascade order:

```text
reset → tokens → base → utilities → components → patterns → globals → site
```

Site CSS is limited to legitimate theme-level aliases. Responsive behavior is mobile-first and uses flexible grids, fluid tokenized typography/spacing, intrinsic sizing, and content-driven transitions.

## Content and Markdown

JSON is the default for site configuration, page composition, navigation, assets, structured entities, cards, actions, and collections. Markdown is used for long narrative content and is loaded through Astro's content collection API. MDX is not enabled.

## Assets

Site assets remain under `sites/{site}/assets` and are referenced by stable IDs in `assets.json`. A static Astro endpoint emits only validated selected-site assets at `/site-assets/{site}/{file}` with long-lived immutable cache headers. Shared assets remain in `public/shared`.

## Site builds

`SITE={site-id}` selects routes, shell configuration, content, entities, assets, theme, and integration settings. The checked-in scripts provide the reference shorthand `npm run build:reference`; future sites may add equivalent convenience scripts without changing framework code.

## ChatGPT Sites compatibility

`npm run build:sites` preserves the same Astro routes and prerenders all reference pages and assets, while adding the official Astro Cloudflare adapter and Sites deployment metadata around the static output. `scripts/prepare-sites-build.mjs` supplies the conventional worker entry filename expected by Sites; it does not introduce an alternate renderer or change the normal `build:reference` output.
