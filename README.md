# Wharton Web Prototype Framework

Reusable, static-first framework for high-fidelity Wharton website prototypes. The implementation follows `WHARTON_WEB_PROTOTYPE_FRAMEWORK_CANONICAL_SPEC.md` and keeps the shared framework independent from any one Wharton site.

Step 6 includes a neutral `reference` site—not an Undergraduate migration—to prove that validated site configuration, structured entities, Markdown, and stable asset IDs can render shared components, patterns, global elements, and all eight canonical template types.

The reference site’s `current` theme implements the observed visual language of the live Wharton CMS: the institutional/program shell, Acumin and Minion typography, current blue/red palette, 1,225px content grid, square controls, media-overlay heroes, tiles, tabs, disclosures, forms, and footer treatment. It remains neutral framework content, not an Undergraduate site.

This repository is the permanent source of truth for framework code, documentation, reusable elements, version history, and project templates. It is intended to reflect the current Wharton CMS as accurately as practical, evolve with approved UX/Figma work, support realistic stakeholder review, and preserve traceability for eventual WordPress handoff.

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

Build and preview the static output:

```sh
npm run build:reference
npm run preview
```

Run the complete local quality gate:

```sh
npm run validate
```

Visual baselines are checked by `npm run validate`; update them intentionally with `npm run test:visual:update` after reviewing the rendered change.

## Site selection

The `SITE` environment variable selects a site root:

```sh
SITE=reference npm run dev
SITE=reference npm run build
```

An unknown or malformed site ID fails before rendering. A new site should be created under `sites/{site-id}` and should contain configuration, navigation, footer groups, pages, content, entities, assets, and fixtures—not copies of shared framework components.

## Architecture at a glance

```text
sites/{site}/ JSON + Markdown + assets
                 ↓
       Zod validation and reference checks
                 ↓
   generic route → template registry → pattern registry
                 ↓
 shared Astro components + native layered CSS + local JS
                 ↓
            static HTML and assets
```

Important paths:

- `src/tokens`: DTCG-compatible token sources and generated CSS.
- `src/entities` and `src/schemas`: typed data contracts and build-time validation.
- `src/components`, `src/patterns`, `src/global`, `src/templates`: reusable presentation.
- `src/rendering`: selected-site loading, controlled registries, and page composition.
- `src/integrations`: provider interfaces and fixture/prototype adapters.
- `src/registry/framework-elements.ts`: machine-readable implementation registry.
- `sites/reference`: structured demonstration configuration and placeholder content.
- `tests`: unit, browser, accessibility, responsive, and visual regression coverage.

See `docs/architecture.md`, `docs/component-model.md`, `docs/current-cms-visual-fidelity.md`, `docs/testing.md`, `docs/sites-validation.md`, and `docs/implementation-status.md` for detailed guidance.

## First validation project

Wharton Undergraduate remains the first full real-site validation. Step 7 should implement it through site configuration, structured content, assets, and shared framework composition rather than by combining or directly migrating legacy HTML.
