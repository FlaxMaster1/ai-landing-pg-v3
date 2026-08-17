# Wharton Web Prototype Framework

Reusable, static-first framework for planning, designing, building, and reviewing high-fidelity Wharton website prototypes. The implementation follows `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` and keeps the shared framework independent from any one Wharton site.

The framework is now more than a component library. It includes a documented decision system that helps Codex, Claude Code, designers, and developers determine which registered components and patterns to use, how to compose complete pages, and how to start future Wharton sites from strategy and content rather than from ad hoc visual choices.

The neutral `reference` site proves that validated site configuration, structured entities, Markdown, stable asset IDs, shared components, patterns, global elements, and canonical template types can render through the same functional framework. The reference `old-theme` preserves the observed visual language of the current Wharton CMS. The registered `new-theme` remains the redesign boundary for the evolving Wharton visual system without changing site content or functional contracts.

GitHub is the permanent source of truth for framework code, documentation, reusable elements, version history, project templates, review history, and deployment history.

## Production

The reference implementation is hosted through GitHub Pages:

`https://flaxmaster1.github.io/wharton-prototype-framework/`

`main` is the production source branch. Reviewed merges to `main` trigger `.github/workflows/pages.yml`, which validates, builds, audits, and deploys the reference site. A change is considered live only after the `Validate and deploy GitHub Pages` workflow succeeds.

ChatGPT Sites remains compatibility-only and is not the primary production workflow.

## Requirements

- Node.js 22.12 or newer
- npm 9.6.5 or newer
- Chromium installed for Playwright (`npx playwright install chromium`)

## Run locally

```sh
npm install
npm run dev:reference
```

Open `http://localhost:4321/`.

The reference development server includes a theme selector. Use it, or append `?theme=old-theme` or `?theme=new-theme`, to review identical content through either registered theme.

Build and preview the static output:

```sh
npm run build:reference
npm run preview
```

Run the full local quality gate:

```sh
npm run validate
```

For the full QA gate including the dependency audit:

```sh
npm run validate:complete
```

## Documentation stack

Use the documentation in this order when planning or building a site:

1. `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` — governing architecture and guardrails.
2. `WHARTON_DESIGN_DECISION_FRAMEWORK.md` — how user goals and content relationships map to framework choices.
3. `src/registry/framework-elements.ts` — machine-readable source of truth for what exists and its contracts.
4. `docs/component-handbook.md` — detailed use/avoid/variant/accessibility/responsive guidance for components and patterns.
5. `docs/page-recipes.md` — composition guidance for complete pages and common Wharton site types.
6. `docs/adding-a-site.md` — practical process for creating a new site root.
7. `docs/deployment.md` and `docs/testing.md` — production and QA workflows.

See `docs/README.md` for the complete documentation map.

## Site selection

The `SITE` environment variable selects a site root:

```sh
SITE=reference npm run dev
SITE=reference npm run build
```

An unknown or malformed site ID fails before rendering. A new site should be created under `sites/{site-id}` and contain configuration, navigation, footer groups, pages, content, entities, assets, and fixtures, not copies of shared framework components.

Before composing a new page, consult the Design Decision Framework, registry, Component Handbook, and Page Recipes. New shared components or variants should be created only after existing registered composition is proven insufficient.

## Architecture at a glance

```text
Site strategy + sitemap + content model
                 ↓
sites/{site}/ JSON + Markdown + assets
                 ↓
       Zod validation and reference checks
                 ↓
 Design Decision Framework + typed registry
                 ↓
   generic route → template registry → pattern registry
                 ↓
 shared Astro components + native layered CSS + local JS
                 ↓
            static HTML and assets
                 ↓
        GitHub Pages deployment
```

Important paths:

- `src/tokens`: DTCG-compatible token sources and generated CSS.
- `src/entities` and `src/schemas`: typed data contracts and build-time validation.
- `src/components`, `src/patterns`, `src/global`, `src/templates`: reusable presentation.
- `src/rendering`: selected-site loading, controlled registries, and page composition.
- `src/integrations`: provider interfaces and fixture/prototype adapters.
- `src/themes`: validated theme contract, stylesheet registry, development selector, `old-theme`, and `new-theme` boundary.
- `src/registry/framework-elements.ts`: machine-readable implementation registry.
- `sites/reference`: structured demonstration configuration and placeholder content.
- `tests`: unit, browser, accessibility, responsive, and visual regression coverage.

## Development workflow

Codex and Claude Code share the same repository instructions in `AGENTS.md`.

- Codex uses `codex/<task>` branches.
- Claude Code uses `claude/<task>` branches.
- Documentation/process work uses `docs/<task>` or `workflow/<task>` branches.
- Work reaches production through reviewed PRs into `main`.
- Cross-agent work is handed off through `docs/handoffs/current.md`.

## First validation project

Wharton Undergraduate remains the first full real-site validation target. It should be implemented through site strategy, configuration, structured content, assets, shared framework composition, and the documented selection/page-recipe system rather than by directly migrating legacy HTML.